---
title: "FFmpeg cookbook"
description: "Here are examples of what is possible with FFmpeg support in liquidsoap:"
---
Here are examples of what is possible with FFmpeg support in liquidsoap:

## Relaying without re-encoding {#relaying-without-re-encoding}

With FFmpeg support, liquidsoap can relay encoded streams without re-encoding them, enabling delivery to multiple destinations. Here is an example:

```liquidsoap title="ffmpeg-relay.liq"
# Input the stream,
# from an Icecast server or any other source
encoded_source = input.http("https://icecast.radiofrance.fr/fip-hifi.aac")

# Send to one server here:
output.icecast(
 %ffmpeg(format = "adts", %audio.copy),
 fallible=true,
 mount="/restream",
 host="streaming.example.com",
 port=8000,
 password="xxx",
 encoded_source
)

# An another one here:
output.icecast(
 %ffmpeg(format = "adts", %audio.copy),
 fallible=true,
 mount="/restream",
 host="streaming2.example.com",
 port=8000,
 password="xxx",
 encoded_source
)
```

`mksafe` cannot be used here because the content is not plain PCM samples, which that operator is designed to produce. To make the source infallible, either provide a `single(...)` source with matching encoded content, or create an infallible source using `ffmpeg.encode.audio`.

## On-demand relaying without re-encoding {#on-demand-relaying-without-re-encoding}

This extends the previous example to relay a stream only when listeners are connected, without re-encoding.

The format must be one that `ffmpeg` can handle; `mp3` is a good choice.

In the script below, the encoded format of the stream must match a blank file (or any other file). `output.harbor` serves data from the file when no listeners are connected and starts or stops the underlying input as listeners come and go:

```liquidsoap title="ffmpeg-relay-ondemand.liq"
stream = input.http(start=false, "https://wwoz-sc.streamguys1.com/wwoz-hi.mp3")

listeners_count = ref(0)

def on_connect(_) =
 listeners_count := listeners_count() + 1
 if
 listeners_count() > 0 and not stream.is_started()
 then
 log(
 "Starting input"
 )
 stream.start()
 end
end

def on_disconnect(_) =
 listeners_count := listeners_count() - 1
 if
 listeners_count() == 0 and stream.is_started()
 then
 log(
 "Stopping input"
 )
 stream.stop()
 end
end

blank = single("/tmp/blank.mp3")

stream = fallback(track_sensitive=false, [stream, blank])

o =
 output.harbor(
 %ffmpeg(format = "mp3", %audio.copy),
 format="audio/mpeg",
 mount="relay",
 stream
 )

o.on_connect(synchronous=true, on_connect)
o.on_disconnect(synchronous=true, on_disconnect)
```

## Shared encoding {#shared-encoding}

Liquidsoap can encode once and share the result across multiple outputs, minimizing CPU usage. Here is an example adapted from the previous one:

```liquidsoap title="ffmpeg-shared-encoding.liq"
# Input the stream, from an Icecast server or any other source
source = input.http("https://icecast.radiofrance.fr/fip-hifi.aac")

# Make it infallible:
source = mksafe(source)

# Encode it in mp3:
source = ffmpeg.encode.audio(%ffmpeg(%audio(codec = "libmp3lame")), source)

# Send to one server here:
output.icecast(
 %ffmpeg(format = "mp3", %audio.copy),
 mount="/restream",
 host="streaming.example.com",
 port=8000,
 password="xxx",
 source
)

# An another one here:
output.icecast(
 %ffmpeg(format = "mp3", %audio.copy),
 mount="/restream",
 host="streaming2.example.com",
 port=8000,
 password="xxx",
 source
)
```

Shared encoding is especially useful for video, which is computationally expensive. Here is an example sharing audio and video encoding across multiple destinations — both Icecast and YouTube/Facebook via RTMP:

```liquidsoap title="ffmpeg-shared-encoding-rtmp.liq"
# An audio source...
audio = sine()

# Encode it in mp3
audio = ffmpeg.encode.audio(%ffmpeg(%audio(codec = "libmp3lame")), audio)

# Send it to icecast
output.icecast(
 %ffmpeg(format = "mp3", %audio.copy),
 host="...",
 password="...",
 mount="/stream",
 audio
)

# A video source, for instance a static image
video = single("image.png")

# Encode it in h264 format
video = ffmpeg.encode.video(%ffmpeg(%video(codec = "libx264")), video)

# Mux it with the audio
stream = source.mux.video(video=video, audio)

# Copy encoder for the rtmp stream
enc = %ffmpeg(format = "flv", %audio.copy, %video.copy)

# Send to YouTube
key = "..."
url = "rtmp://a.rtmp.youtube.com/live2/#{key}"
output.url(url=url, enc, stream)

# Send to Facebook
key = "..."
url = "rtmps://live-api-s.facebook.com:443/rtmp/#{key}"
output.url(self_sync=true, url=url, enc, stream)
```

## Add transparent logo and video {#add-transparent-logo-and-video}

See: https://github.com/savonet/liquidsoap/discussions/1862

## Live switch between encoded content {#live-switch-between-encoded-content}

_This is an ongoing development effort. If you encounter issues, please reach out via the online support channels._

Starting with liquidsoap `2.1.x`, live switching on encoded content with delivery to multiple outputs is gradually becoming possible.

This requires solid knowledge of media codecs, containers, and ffmpeg bitstream filters. Different containers store codec binary data in incompatible ways, requiring bitstream filters to adapt the data. Additional filters may need to be written to support more input/output and codec combinations.

Here is a tested use case: live switch between a playlist of MP4 files and an RTMP FLV input:

```liquidsoap title="live-switch.liq"
s1 = input.rtmp(listen=false, "rtmp://....")
s1 = ffmpeg.filter.bitstream.h264_mp4toannexb(s1)

s2 = playlist("/path/to/playlist")
s2 = ffmpeg.filter.bitstream.h264_mp4toannexb(s2)

s = fallback(track_sensitive=false, [s1, s2])

mpegts =
 %ffmpeg(format = "mpegts", fflags = "-autobsf", %audio.copy, %video.copy)

streams = [("mpegts", mpegts)]

output_dir = "/tmp/hls"

output.file.hls(
 playlist="live.m3u8",
 fallible=true,
 segment_duration=5.,
 output_dir,
 streams,
 s
)
```

- The `h264_mp4toannexb` filter is needed on each stream to ensure the MP4 data conforms to what the MPEG-TS container expects.
- FFmpeg's automatic bitstream filter insertion must be disabled via `-autobsf`. FFmpeg does not support this kind of live switch natively and its auto-inserted filters will not work.

Future work includes extending this to also support RTMP output from the same data.
