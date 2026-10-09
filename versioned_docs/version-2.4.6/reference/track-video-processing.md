---
title: "Track / Video processing"
description: "Return a video track from a filter's output"
---
### `ffmpeg.filter.video.output` {#ffmpeg.filter.video.output}

Return a video track from a filter's output

Type:

```
(?id : string?, ?pass_metadata : bool, ffmpeg.filter.graph,
 ffmpeg.filter.video) -> ffmpeg.video.raw('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `pass_metadata` (of type `bool`, which defaults to `true`): Pass ffmpeg stream metadata to liquidsoap
- `(unlabeled)` (of type `ffmpeg.filter.graph`)
- `(unlabeled)` (of type `ffmpeg.filter.video`)

### `track.video.add` {#track.video.add}

Merge video tracks.

Type:

```
(?id : string?, [canvas('a)]) -> canvas('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `[canvas('a)]`)

### `track.video.add_image` {#track.video.add_image}

Add a static image on the given video track.

Type:

```
(?id : string?, ?fallible : bool, ?width : {int}?, ?height : {int}?,
 ?x : {int}, ?y : {int}, file : {string}, canvas('a)) -> canvas('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `"track.video.add_image"`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `false`): Whether we are allowed to fail (in case the file is non-existent or invalid).
- `width` (of type `{int}?`, which defaults to `null`): Scale to width
- `height` (of type `{int}?`, which defaults to `null`): Scale to height
- `x` (of type `{int}`, which defaults to `0`): x position.
- `y` (of type `{int}`, which defaults to `0`): y position.
- `file` (of type `{string}`): Path to the image file.
- `(unlabeled)` (of type `canvas('a)`)

### `track.video.add_request` {#track.video.add_request}

Add a static request on the given video track.

Type:

```
(?id : string?, ?fallible : bool, ?width : {int}?, ?height : {int}?,
 ?x : {int}, ?y : {int}, request : {request}, canvas('a)) -> canvas('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `"track.video.add_request"`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `false`): Whether we are allowed to fail (in case the file is non-existent or invalid).
- `width` (of type `{int}?`, which defaults to `null`): Scale to width
- `height` (of type `{int}?`, which defaults to `null`): Scale to height
- `x` (of type `{int}`, which defaults to `0`): x position.
- `y` (of type `{int}`, which defaults to `0`): y position.
- `request` (of type `{request}`): Request to add to the video track
- `(unlabeled)` (of type `canvas('a)`)

### `track.video.tile` {#track.video.tile}

Tile video tracks.

Type:

```
(?id : string?, ?proportional : bool, [canvas('a)]) -> canvas('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `proportional` (of type `bool`, which defaults to `true`): Scale preserving the proportions.
- `(unlabeled)` (of type `[canvas('a)]`)

