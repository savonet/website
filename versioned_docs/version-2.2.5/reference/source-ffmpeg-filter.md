---
title: "Source / FFmpeg filter"
description: "Attach an audio track to a filter's input"
---
### `ffmpeg.filter.audio.input` {#ffmpeg.filter.audio.input}

Attach an audio track to a filter's input

Type:

```
(?id : string?, ?pass_metadata : bool, ffmpeg.filter.graph,
 ffmpeg.audio.raw('a)) -> ffmpeg.filter.audio
```

Arguments:

- `id` (of type `string?`, which defaults to `null`)
- `pass_metadata` (of type `bool`, which defaults to `true`): Pass liquidsoap's metadata to this stream
- `(unlabeled)` (of type `ffmpeg.filter.graph`)
- `(unlabeled)` (of type `ffmpeg.audio.raw('a)`)

### `ffmpeg.filter.create` {#ffmpeg.filter.create}

Configure and launch a filter graph

Type:

```
(((ffmpeg.filter.graph) -> 'a)) -> 'a
```

Arguments:

- `(unlabeled)` (of type `(ffmpeg.filter.graph) -> 'a`)

### `ffmpeg.filter.video.input` {#ffmpeg.filter.video.input}

Attach a video track to a filter's input

Type:

```
(?id : string?, ?pass_metadata : bool, ffmpeg.filter.graph,
 ffmpeg.video.raw('a)) -> ffmpeg.filter.video
```

Arguments:

- `id` (of type `string?`, which defaults to `null`)
- `pass_metadata` (of type `bool`, which defaults to `true`): Pass liquidsoap's metadata to this stream
- `(unlabeled)` (of type `ffmpeg.filter.graph`)
- `(unlabeled)` (of type `ffmpeg.video.raw('a)`)
