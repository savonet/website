---
title: "Track / Track processing"
description: "Defer an audio track by a given amount of time. Track will be available when the given delay has been fully buffered. Use this operator instead of…"
---
### `track.audio.defer` {#track.audio.defer}

Defer an audio track by a given amount of time. Track will be available when the given `delay` has been fully buffered. Use this operator instead of `buffer` when buffering large amount of data as initial delay.

Type:

```
(?id : string?, delay : float, ?overhead : float?, pcm_s16('a)) ->
pcm_s16('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `delay` (of type `float`): Duration of the delay, in seconds.
- `overhead` (of type `float?`, which defaults to `null`): Duration of the delay overhead, in seconds. Defaults to frame size.
- `(unlabeled)` (of type `pcm_s16('a)`): Track to delay.

### `track.metadata` {#track.metadata}

Return the metadata associated with the given track

Type:

```
(?id : string?, 'a) -> metadata where 'a is a track
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `anything that is a track`)

### `track.metadata.map` {#track.metadata.map}

Rewrite metadata on the fly using a function.

Type:

```
(?id : string?, (([string * string]) -> [string * string]), ?update : bool,
 ?strip : bool, ?insert_missing : bool, metadata) -> metadata
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `([string * string]) -> [string * string]`): A function that returns new metadata.
- `update` (of type `bool`, which defaults to `true`): Update metadata. If false, existing metadata are cleared and only returned values are set as new metadata.
- `strip` (of type `bool`, which defaults to `false`): Completely remove empty metadata. Operates on both empty values and empty metadata chunk.
- `insert_missing` (of type `bool`, which defaults to `true`): Treat track beginnings without metadata as having empty ones. The operational order is: create empty if needed, map and strip if enabled.
- `(unlabeled)` (of type `metadata`)

### `track.metadata.merge` {#track.metadata.merge}

Merge metadata from all given tracks. If two sources have metadata with the same label at the same time, the one from the last source in the list takes precedence.

Type:

```
(?id : string?, [metadata]) -> metadata
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `[metadata]`)

### `track.track_marks` {#track.track_marks}

Return the track marks associated with the given track

Type:

```
(?id : string?, 'a) -> track_marks where 'a is a track
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `anything that is a track`)
