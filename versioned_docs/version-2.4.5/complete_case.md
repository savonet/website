---
title: "A complete case analysis"
description: "We will develop here a more complex example, according to the following specifications:"
sidebar_label: "A complete case"
---
We will develop here a more complex example, according to the following specifications:

- play different playlists during the day;
- play user requests -- done via the telnet server;
- insert about 1 jingle every 5 songs;
- add one special jingle at the beginning of every hour, mixed on top of the normal stream;
- relay live shows as soon as one is available;
- and set up several outputs.

Once you can describe what you want in such a modular way, you're halfway there. Think of the diagram below as a graph through which the audio stream flows, following the arrows. The nodes modify the stream using basic operators — switching and mixing in our case. The final nodes are outputs: they pull data out of the graph and send it to the world. In our case, we have two Icecast outputs using different formats.

![Graph for 'radio.liq'](/assets/img/liqgraph.png)

Now here is how to write that in [Liquidsoap](./index.md).

```liquidsoap title="complete-case.liq"
#!/usr/bin/liquidsoap

# Lines starting with # are comments, they are ignored.

# Put the log file in some directory where you have permission to write.
log.file.path := "/tmp/<script>.log"

# Print log messages to the console, can also be done by passing the -v option
# to Liquidsoap.
log.stdout := true

# Use the telnet server for requests
settings.server.telnet := true

# A bunch of files and playlists, supposedly all located in the same base dir.
default = single("~/radio/default.ogg")

day = playlist("~/radio/day.pls")
night = playlist("~/radio/night.pls")
jingles = playlist("~/radio/jingles.pls")
clock = single("~/radio/clock.ogg")

# Play user requests if there are any, otherwise one of our playlists, and the
# default file if anything goes wrong.
radio =
 fallback(
 [
 request.queue(id="request"),
 switch([({6h-22h}, day), ({22h-6h}, night)]),
 default
 ]
 )

# Add the normal jingles
radio = random(weights=[1, 5], [jingles, radio])

# And the clock jingle
radio = add([radio, switch([({0m0s}, clock)])])

radio = mksafe(radio)

# Add the ability to relay live shows
full =
 fallback(
 track_sensitive=false,
 [input.http("http://localhost:8000/live.ogg"), radio]
 )

# Output the full stream in OGG and MP3
output.icecast(
 %mp3,
 host="localhost",
 port=8000,
 password="hackme",
 mount="radio",
 full
)
output.icecast(
 %vorbis,
 host="localhost",
 port=8000,
 password="hackme",
 mount="radio.ogg",
 full
)

# Output the stream without live in OGG
output.icecast(
 %vorbis,
 host="localhost",
 port=8000,
 password="hackme",
 mount="radio_nolive.ogg",
 radio
)
```

To try this example, you'll need to edit the file names. To see the playlist switch in action, adjust the time intervals — if it's currently 16:42, try `0h-16h45` and `16h45-24h` instead of `6h-22h` and `22h-6h`. To test the hourly jingle, you can trigger it every minute by using the `0s` interval instead of `0m0s`.

To test the transition to a live show, start a new stream on the `live.ogg` mount of your server. You can use the examples from the [quickstart](./quick_start.md) to stream a playlist to it. To start a real live show from soundcard input, use `darkice`, or simply liquidsoap if you have a working ALSA input:

```liquidsoap
liquidsoap 'output.icecast(%vorbis, \
 mount="live.ogg",host="...",password="...",input.alsa())'
```
