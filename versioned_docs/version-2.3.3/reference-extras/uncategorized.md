---
title: "Uncategorized"
description: "Plot the first crossfade transition. Used for visualizing and testing crossfade transitions."
---
### `cross.plot` {#cross.plot}

Plot the first crossfade transition. Used for visualizing and testing crossfade transitions.

Type:

```
(?png : string?, ?dir : string?, source(audio=pcm('a), 'b)) ->
source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks
```

Arguments:

- `png` (of type `string?`, which defaults to `null`)
- `dir` (of type `string?`, which defaults to `null`)
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks`)

Methods:

- `buffered` (of type `() -> [string * float]`): 
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): 
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `end_duration` (of type `() -> float`): 
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `on_metadata` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on metadata packets.
- `on_shutdown` (of type `((() -> unit)) -> unit`): Register a function to be called when source shuts down.
- `on_track` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on new tracks.
- `on_wake_up` (of type `((() -> unit)) -> unit`): Register a function to be called after the source is asked to get ready. This is when, for instance, the source's final ID is set.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start_duration` (of type `() -> float`): 
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

