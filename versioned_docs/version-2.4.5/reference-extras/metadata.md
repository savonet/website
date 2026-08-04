---
title: "Metadata"
description: "Store and retrieve file covers using metadata. This returns a set of getter/setter methods that can be used to store and retrieve cover art. Typical…"
---
### `file.cover.manager` {#file.cover.manager}

Store and retrieve file covers using metadata. This returns a set of getter/setter methods that can be used to store and retrieve cover art. Typical usage is to set cover art in a `on_metadata` handler and retrieve it in a `video.add_image` operator. See `video.add_cover` for an implementation example.

Type:

```
(?id : string?, ?mime_types : [string * string], default : string) ->
() -> request
```

Arguments:

- `id` (of type `string?`, which defaults to `null`)
- `mime_types` (of type `[string * string]`, which defaults to `[("image/gif", "gif"), ("image/jpg", "jpeg"), ("image/jpeg", "jpeg"), ("image/png", "png"), ("image/webp", "webp")]`): Recognized mime types and their corresponding file extensions.
- `default` (of type `string`): Default cover file when no cover is available

Methods:

- `set` (of type `([string * string]) -> unit`): 

### `source.say_metadata` {#source.say_metadata}

Append speech-synthesized tracks reading the metadata.

Type:

```
(?id : string?, ?pattern : (([string * string]) -> string), source('a)) ->
source('a) where 'a is an orderable type
```

Arguments:

- `id` (of type `string?`, which defaults to `"source.say_metadata"`)
- `pattern` (of type `([string * string]) -> string`, which defaults to `<fun>`): Pattern to use
- `(unlabeled)` (of type `source('a) where 'a is an orderable type`): The source to use

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `cancel_pending` (of type `() -> unit`): 
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `pending` (of type `() -> source('A)? where 'A is an orderable type`): 
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `selected` (of type `() -> source('A)? where 'A is an orderable type`): Currently selected source.
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): 
- `set_pending` (of type `(source('A)?) -> unit where 'A is an orderable type`): 
- `skip` (of type `(?cancel_pending : bool) -> unit`): 
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready
