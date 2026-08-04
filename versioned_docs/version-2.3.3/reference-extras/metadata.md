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
- `pending` (of type `() -> source('A)? where 'A is an orderable type`): 
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `selected` (of type `() -> source('A)? where 'A is an orderable type`): Currently selected source.
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `set_pending` (of type `(source('A)?) -> unit where 'A is an orderable type`): 
- `skip` (of type `(?cancel_pending : bool) -> unit`): 
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.
