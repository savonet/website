---
title: "Track / FFmpeg filter"
description: "Return an audio track from a filter's output"
---
### `ffmpeg.filter.audio.output` {#ffmpeg.filter.audio.output}

Return an audio track from a filter's output

Type:

```
(?id : string?, ?pass_metadata : bool, ffmpeg.filter.graph,
 ffmpeg.filter.audio) -> ffmpeg.audio.raw('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `pass_metadata` (of type `bool`, which defaults to `true`): Pass ffmpeg stream metadata to liquidsoap
- `(unlabeled)` (of type `ffmpeg.filter.graph`)
- `(unlabeled)` (of type `ffmpeg.filter.audio`)
