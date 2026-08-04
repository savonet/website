---
title: "Track / Conversion"
description: "Produce mono audio by taking the mean of all audio channels."
---
### `track.audio.mean` {#track.audio.mean}

Produce mono audio by taking the mean of all audio channels.

Type:

```
(?id : string?, ?normalize : bool, pcm('a)) -> pcm(mono)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `normalize` (of type `bool`, which defaults to `true`): Divide the output volume by the number of channels.
- `(unlabeled)` (of type `pcm('a)`): Track whose mean should be computed.

### `track.audio.stereo` {#track.audio.stereo}

Convert any pcm audio track into a stereo track.

Type:

```
(?id : string?, pcm('a)) -> pcm(stereo)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `pcm('a)`)

### `track.audio.swap` {#track.audio.swap}

Swap two channels of a stereo track.

Type:

```
(?id : string?, pcm(stereo)) -> pcm(stereo)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `pcm(stereo)`)

### `track.ffmpeg.decode.audio` {#track.ffmpeg.decode.audio}

Decode a track content

Type:

```
(?id : string?, ffmpeg.copy('a)) -> pcm('b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `ffmpeg.copy('a)`)

### `track.ffmpeg.decode.video` {#track.ffmpeg.decode.video}

Decode a track content

Type:

```
(?id : string?, ffmpeg.copy('a)) -> canvas('b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `ffmpeg.copy('a)`)

### `track.ffmpeg.encode.audio` {#track.ffmpeg.encode.audio}

Convert a track's content

Type:

```
(?id : string?, format(audio=pcm('a), 'b), pcm('a)) -> ffmpeg.copy('c)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `format(audio=pcm('a), 'b)`): Encoding format.
- `(unlabeled)` (of type `pcm('a)`)

### `track.ffmpeg.encode.video` {#track.ffmpeg.encode.video}

Convert a track's content

Type:

```
(?id : string?, format(video=canvas('a), 'b), canvas('a)) -> ffmpeg.copy('c)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `format(video=canvas('a), 'b)`): Encoding format.
- `(unlabeled)` (of type `canvas('a)`)

### `track.ffmpeg.raw.decode.audio` {#track.ffmpeg.raw.decode.audio}

Decode a track content

Type:

```
(?id : string?, ffmpeg.audio.raw('a)) -> pcm('b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `ffmpeg.audio.raw('a)`)

### `track.ffmpeg.raw.decode.video` {#track.ffmpeg.raw.decode.video}

Decode a track content

Type:

```
(?id : string?, ffmpeg.video.raw('a)) -> canvas('b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `ffmpeg.video.raw('a)`)

### `track.ffmpeg.raw.encode.audio` {#track.ffmpeg.raw.encode.audio}

Convert a track's content

Type:

```
(?id : string?, format(audio=ffmpeg.audio.raw('a), 'b), pcm('c)) ->
ffmpeg.audio.raw('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `format(audio=ffmpeg.audio.raw('a), 'b)`): Encoding format.
- `(unlabeled)` (of type `pcm('c)`)

### `track.ffmpeg.raw.encode.video` {#track.ffmpeg.raw.encode.video}

Convert a track's content

Type:

```
(?id : string?, format(video=ffmpeg.video.raw('a), 'b), canvas('c)) ->
ffmpeg.video.raw('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `format(video=ffmpeg.video.raw('a), 'b)`): Encoding format.
- `(unlabeled)` (of type `canvas('c)`)
