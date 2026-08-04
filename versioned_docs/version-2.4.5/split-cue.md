---
title: "Split and re-encode a CUE sheet."
description: "CUE sheets are sometimes distributed along with a single audio file containing a whole CD. Liquidsoap can parse CUE sheets as playlists and use them in…"
sidebar_label: "Split a CUE sheet"
---
CUE sheets are sometimes distributed along with a single audio file containing a whole CD.
Liquidsoap can parse CUE sheets as playlists and use them in your request-based sources.

Here's for instance an example of a simple code to split a CUE sheet into several mp3 files
with `id3v2` tags:

```liquidsoap title="split-cue.liq"
# Log to stdout
log.file := false
log.stdout := true
log.level := 4

# Initial playlist
cue = "/path/to/sheet.cue"

# Create a playlist with this CUE sheet and tell Liquidsoap to shutdown when we
# are done.
s = playlist(cue, on_done=shutdown)

# Shove all that to a output.file operator.
output.file(
  %mp3(id3v2 = true, bitrate = 320),
  fallible=true,
  reopen_on_metadata=fun (_) -> true,
  "/path/to/$(track) - $(title).mp3",
  s
)
```
