---
title: "Source / Input"
description: "Produce silence and blank images."
---
### `blank` {#blank}

Produce silence and blank images.

Type:

```
(?id : string?, ?duration : {float}) -> source('a)
where 'a is a set of internal tracks
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `duration` (of type `{float}`, which defaults to `-1.0`): Duration of blank tracks in seconds, Negative value means forever.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `debug.is_ready` {#debug.is_ready}

A source that always produces an empty frame when the underlying source is not ready, used for testing and debugging.

Type:

```
(?id : string?, source('a)) -> source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

This function is experimental.

### `input` {#input}

Input an audio stream using the default operator.

Type:

```
(?id : string?, ?start : bool, ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?fallible : bool) -> source(audio=pcm('A))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `start` (of type `bool`, which defaults to `true`): Automatically start outputting whenever possible. If `true`, an infallible (normal) output will start outputting as soon as it is created, and a fallible output will (re)start as soon as its source becomes available for streaming.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting stops.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be (temporarily) stopped.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `input.alsa` {#input.alsa}

Stream from an ALSA input device.

Type:

```
(?id : string?, ?buffer_size : float?, ?device : string, ?fallible : bool,
 ?on_start : (() -> unit), ?on_stop : (() -> unit), ?self_sync : bool,
 ?start : bool) -> source(audio=pcm('a))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `buffer_size` (of type `float?`, which defaults to `null`): ALSA buffer size in seconds. Defaults to frame duration when `null`.
- `device` (of type `string`, which defaults to `"default"`): Alsa device to use
- `fallible` (of type `bool`, which defaults to `false`): Allow the source to fail. If set to `false`, `start` must be `true` and `stop` method raises an error.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input stops.
- `self_sync` (of type `bool`, which defaults to `true`): Mark the source as being synchronized by the ALSA driver.
- `start` (of type `bool`, which defaults to `true`): Start input as soon as it is available.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `input.external.avi` {#input.external.avi}

Stream data from an external application.

Type:

```
(?id : string?, ?buffer : float, ?max : float, ?restart : bool,
 ?restart_on_error : bool, {string}) -> source(audio=pcm('a),
video=canvas('b))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `buffer` (of type `float`, which defaults to `1.0`): Duration of the pre-buffered data.
- `max` (of type `float`, which defaults to `10.0`): Maximum duration of the buffered data.
- `restart` (of type `bool`, which defaults to `true`): Restart process when exited.
- `restart_on_error` (of type `bool`, which defaults to `false`): Restart process when exited with error.
- `(unlabeled)` (of type `{string}`): Command to execute.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

This function is experimental.

### `input.external.rawaudio` {#input.external.rawaudio}

Stream raw PCM data (interleaved signed 16 bits little endian integers) from an external application.

Type:

```
(?id : string?, ?buffer : float, ?channels : int, ?max : float,
 ?restart : bool, ?restart_on_error : bool, ?samplerate : int, {string}) ->
source(audio=pcm('a))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `buffer` (of type `float`, which defaults to `2.0`): Duration of the pre-buffered data.
- `channels` (of type `int`, which defaults to `2`): Number of channels.
- `max` (of type `float`, which defaults to `10.0`): Maximum duration of the buffered data.
- `restart` (of type `bool`, which defaults to `true`): Restart process when exited.
- `restart_on_error` (of type `bool`, which defaults to `false`): Restart process when exited with error.
- `samplerate` (of type `int`, which defaults to `44100`): Samplerate.
- `(unlabeled)` (of type `{string}`): Command to execute.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `input.external.rawvideo` {#input.external.rawvideo}

Stream data from an external application.

Type:

```
(?id : string?, ?buffer : float, ?max : float, ?restart : bool,
 ?restart_on_error : bool, {string}) -> source(video=canvas('a))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `buffer` (of type `float`, which defaults to `1.0`): Duration of the pre-buffered data.
- `max` (of type `float`, which defaults to `10.0`): Maximum duration of the buffered data.
- `restart` (of type `bool`, which defaults to `true`): Restart process when exited.
- `restart_on_error` (of type `bool`, which defaults to `false`): Restart process when exited with error.
- `(unlabeled)` (of type `{string}`): Command to execute.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

This function is experimental.

### `input.external.wav` {#input.external.wav}

Stream WAV data from an external application.

Type:

```
(?id : string?, ?buffer : float, ?max : float, ?restart : bool,
 ?restart_on_error : bool, {string}) -> source(audio=pcm('a))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `buffer` (of type `float`, which defaults to `2.0`): Duration of the pre-buffered data.
- `max` (of type `float`, which defaults to `10.0`): Maximum duration of the buffered data.
- `restart` (of type `bool`, which defaults to `true`): Restart process when exited.
- `restart_on_error` (of type `bool`, which defaults to `false`): Restart process when exited with error.
- `(unlabeled)` (of type `{string}`): Command to execute.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `input.ffmpeg` {#input.ffmpeg}

Create a stream using ffmpeg

Type:

```
(?id : string?, ?debug : bool, ?deduplicate_metadata : bool,
 ?float_args : [string * float], ?format : string?,
 ?int_args : [string * int], ?max_buffer : float,
 ?metadata_filter : (([string * string]) -> [string * string])?,
 ?new_track_on_metadata : bool, ?on_connect : (() -> unit),
 ?on_disconnect : (() -> unit),
 ?on_error : ((error
               .{
                 kind : string,
                 message : string,
                 trace : [
                          {
                            cstart : int,
                            cstop : int,
                            filename : string,
                            lstart : int,
                            lstop : int,
                            to_string : (?prefix : string) -> string
                          }]
               }) -> unit),
 ?on_start : (() -> unit), ?on_stop : (() -> unit), ?poll_delay : float,
 ?self_sync : {bool}, ?start : bool, ?string_args : [string * string],
 ?trim_url : bool, {string}) -> source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `debug` (of type `bool`, which defaults to `false`): Run in debugging mode, not catching some exceptions.
- `deduplicate_metadata` (of type `bool`, which defaults to `true`): Prevent duplicated metadata.
- `float_args` (of type `[string * float]`, which defaults to `[]`)
- `format` (of type `string?`, which defaults to `null`): Force a specific input format. Autodetected when passed a null argument
- `int_args` (of type `[string * int]`, which defaults to `[]`)
- `max_buffer` (of type `float`, which defaults to `5.0`): Maximum uration of buffered data
- `metadata_filter` (of type `(([string * string]) -> [string * string])?`, which defaults to `null`): Metadata filter function. Returned metadata are set a metadata. Default: filter `id3v2_priv` metadata.
- `new_track_on_metadata` (of type `bool`, which defaults to `true`): Treat new metadata as new track.
- `on_connect` (of type `() -> unit`, which defaults to `{()}`): Function to execute when a source is connected.
- `on_disconnect` (of type `() -> unit`, which defaults to `{()}`): Function to execute when a source is disconnected
- `on_error` (of type `(error
 .{
   kind : string,
   message : string,
   trace : [
            {
              cstart : int,
              cstop : int,
              filename : string,
              lstart : int,
              lstop : int,
              to_string : (?prefix : string) -> string
            }]
 }) -> unit`, which defaults to `fun (_) -> ()`): Callback executed when an error occurs.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input stops.
- `poll_delay` (of type `float`, which defaults to `2.0`): Polling delay when trying to connect to the stream.
- `self_sync` (of type `{bool}`, which defaults to `false`): Should the source control its own timing? Set to `true` if you are having synchronization issues. Should be `false` for most typical cases.
- `start` (of type `bool`, which defaults to `true`): Start input as soon as it is available.
- `string_args` (of type `[string * string]`, which defaults to `[]`)
- `trim_url` (of type `bool`, which defaults to `true`): Trim input URL.
- `(unlabeled)` (of type `{string}`): URL to decode.

Methods:

- `buffer_length` (of type `() -> float`): Get the buffer's length in seconds.
- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `set_url` (of type `({string}) -> unit`): Set the source's url.
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `status` (of type `() -> string`): Return the current status of the source, either "stopped" (the source isn't trying to relay the HTTP stream), "starting" (polling task is about to begin) "polling" (attempting to connect to the HTTP stream), "connected <url>" (connected to <url>, buffering or playing back the stream) or "stopping" (source is stopping).
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.
- `url` (of type `() -> string`): Return the source's current url.

### `input.harbor` {#input.harbor}

Create a source that receives a http/icecast stream and forwards it as a stream.

Type:

```
(?id : string?,
 ?auth : (({address : string, password : string, user : string}) -> bool)?,
 ?buffer : float, ?debug : bool, ?dumpfile : string?, ?icy : bool,
 ?icy_metadata_charset : string?, ?logfile : string?, ?max : float,
 ?metadata_charset : string?, ?on_connect : (([string * string]) -> unit),
 ?on_disconnect : (() -> unit), ?password : string, ?port : int,
 ?replay_metadata : bool, ?timeout : float, ?transport : http_transport,
 ?user : string, string) -> source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `auth` (of type `(({address : string, password : string, user : string}) -> bool)?`, which defaults to `null`): Authentication function. Receives a record with: `user`, `password` and `address` (client network address) and returns `true` if the user should be granted access for this login. Override any other method if used.
- `buffer` (of type `float`, which defaults to `12.0`): Duration of the pre-buffered data (in seconds). Default value is set to make it possible to use `crossfade` transitions with `input.harbor`. You might be able to reduce it but, in this case, make sure to not use the operator with `crossfade` or make sure that it has enough buffered data for it.
- `debug` (of type `bool`, which defaults to `false`): Run in debugging mode by not catching some exceptions.
- `dumpfile` (of type `string?`, which defaults to `null`): Dump stream to file, for debugging purpose. Disabled if null.
- `icy` (of type `bool`, which defaults to `false`): Enable ICY (shoutcast) protocol.
- `icy_metadata_charset` (of type `string?`, which defaults to `null`): ICY (shoutcast) metadata charset. Guessed if null. Default for shoutcast is ISO-8859-1. Set to that value if all your clients send metadata using this charset and automatic detection is not working for you.
- `logfile` (of type `string?`, which defaults to `null`): Log buffer status to file, for debugging purpose. Disabled if null.
- `max` (of type `float`, which defaults to `20.0`): Maximum duration of the buffered data (in seconds).
- `metadata_charset` (of type `string?`, which defaults to `null`): Metadata charset for non-ICY (shoutcast) source protocols. Guessed if null.
- `on_connect` (of type `([string * string]) -> unit`, which defaults to `fun (_) -> ()`): Function to execute when a source is connected. Its receives the list of headers, of the form: (<label>,<value>). All labels are lowercase.
- `on_disconnect` (of type `() -> unit`, which defaults to `{()}`): Functions to execute when a source is disconnected
- `password` (of type `string`, which defaults to `"hackme"`): Source password.
- `port` (of type `int`, which defaults to `8005`): Port used to connect to the source.
- `replay_metadata` (of type `bool`, which defaults to `false`): Replay last known metadata when switching back to this source. This helps when source has dropped due to temporary connection issues.
- `timeout` (of type `float`, which defaults to `30.0`): Timeout for source connectionn.
- `transport` (of type `http_transport`, which defaults to `<unix_transport>`): Http transport. Use `http.transport.ssl` or `http.transport.secure_transport`, when available, to enable HTTPS output
- `user` (of type `string`, which defaults to `"source"`): Source user.
- `(unlabeled)` (of type `string`): Mountpoint to look for.

Methods:

- `buffer_length` (of type `() -> float`): Length of the buffer (in seconds).
- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `connected_client` (of type `() -> string?`): Returns the address of the client currently connected, if there is one.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `status` (of type `() -> string`): Current status of the input.
- `stop` (of type `() -> unit`): Disconnect the client currently connected to the harbor. Does nothing if no client is connected.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `input.hls` {#input.hls}

Play an HLS stream.

Type:

```
(?id : string?, {string}) -> source('A)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `{string}`): Playlist URI.

Methods:

- `buffer_length` (of type `() -> float`): Get the buffer's length in seconds.
- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `set_url` (of type `({string}) -> unit`): Set the source's url.
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `status` (of type `() -> string`): Return the current status of the source, either "stopped" (the source isn't trying to relay the HTTP stream), "starting" (polling task is about to begin) "polling" (attempting to connect to the HTTP stream), "connected <url>" (connected to <url>, buffering or playing back the stream) or "stopping" (source is stopping).
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.
- `url` (of type `() -> string`): Return the source's current url.

### `input.hls.native` {#input.hls.native}

Play an HLS stream.

Type:

```
(?id : string?, ?reload : float, string) -> source('a)
where 'a is a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `reload` (of type `float`, which defaults to `10.0`): How often (in seconds) the playlist should be reloaded.
- `(unlabeled)` (of type `string`): Playlist URI.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

This function is experimental.

### `input.http` {#input.http}

Create a http stream using ffmpeg

Type:

```
(?id : string?, ?debug : bool, ?deduplicate_metadata : bool,
 ?float_args : [string * float], ?format : string?,
 ?int_args : [string * int], ?max_buffer : float,
 ?metadata_filter : (([string * string]) -> [string * string])?,
 ?new_track_on_metadata : bool, ?on_connect : (([string * string]) -> unit),
 ?on_disconnect : (() -> unit),
 ?on_error : ((error
               .{
                 kind : string,
                 message : string,
                 trace : [
                          {
                            cstart : int,
                            cstop : int,
                            filename : string,
                            lstart : int,
                            lstop : int,
                            to_string : (?prefix : string) -> string
                          }]
               }) -> unit),
 ?on_start : (() -> unit), ?on_stop : (() -> unit), ?poll_delay : float,
 ?self_sync : {bool?}, ?start : bool, ?string_args : [string * string],
 ?timeout : float, ?trim_url : bool, ?user_agent : string, {string}) ->
source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `debug` (of type `bool`, which defaults to `false`): Run in debugging mode, not catching some exceptions.
- `deduplicate_metadata` (of type `bool`, which defaults to `true`): Prevent duplicated metadata.
- `float_args` (of type `[string * float]`, which defaults to `[]`)
- `format` (of type `string?`, which defaults to `null`): Force a specific input format. Autodetected when passed a null argument
- `int_args` (of type `[string * int]`, which defaults to `[]`)
- `max_buffer` (of type `float`, which defaults to `5.0`): Maximum uration of buffered data
- `metadata_filter` (of type `(([string * string]) -> [string * string])?`, which defaults to `null`): Metadata filter function. Returned metadata are set a metadata. Default: filter `id3v2_priv` metadata.
- `new_track_on_metadata` (of type `bool`, which defaults to `true`): Treat new metadata as new track.
- `on_connect` (of type `([string * string]) -> unit`, which defaults to `fun (_) -> ()`): Function to execute when a source is connected. Its receives the list of ICY-specific headers, if available.
- `on_disconnect` (of type `() -> unit`, which defaults to `{()}`): Function to execute when a source is disconnected
- `on_error` (of type `(error
 .{
   kind : string,
   message : string,
   trace : [
            {
              cstart : int,
              cstop : int,
              filename : string,
              lstart : int,
              lstop : int,
              to_string : (?prefix : string) -> string
            }]
 }) -> unit`, which defaults to `fun (_) -> ()`): Callback executed when an error occurs.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input stops.
- `poll_delay` (of type `float`, which defaults to `2.0`): Polling delay when trying to connect to the stream.
- `self_sync` (of type `{bool?}`, which defaults to `null`): Should the source control its own timing? If `null`, the source will control its latency if it can be detected that it is connecting to an `icecast` or `shoutcast` server. Otherwise, see `input.ffmpeg` for more details about this option.
- `start` (of type `bool`, which defaults to `true`): Start input as soon as it is available.
- `string_args` (of type `[string * string]`, which defaults to `[]`)
- `timeout` (of type `float`, which defaults to `10.0`): Timeout for source connection.
- `trim_url` (of type `bool`, which defaults to `true`): Trim input URL.
- `user_agent` (of type `string`, which defaults to `"Liquidsoap/2.3.3 (Unix; OCaml 4.14.2)"`): User agent.
- `(unlabeled)` (of type `{string}`): URL to decode.

Methods:

- `buffer_length` (of type `() -> float`): Get the buffer's length in seconds.
- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `set_url` (of type `({string}) -> unit`): Set the source's url.
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `status` (of type `() -> string`): Return the current status of the source, either "stopped" (the source isn't trying to relay the HTTP stream), "starting" (polling task is about to begin) "polling" (attempting to connect to the HTTP stream), "connected <url>" (connected to <url>, buffering or playing back the stream) or "stopping" (source is stopping).
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.
- `url` (of type `() -> string`): Return the source's current url.

### `input.jack` {#input.jack}

Get stream from jack.

Type:

```
(?id : string?, ?fallible : bool, ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?self_sync : bool, ?server : string, ?start : bool) ->
source(audio=pcm('a))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `false`): Allow the source to fail. If set to `false`, `start` must be `true` and `stop` method raises an error.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input stops.
- `self_sync` (of type `bool`, which defaults to `true`): Mark the source as being synchronized by the jack server.
- `server` (of type `string`, which defaults to `""`): Jack server to connect to.
- `start` (of type `bool`, which defaults to `true`): Start input as soon as it is available.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `input.keyboard.sdl` {#input.keyboard.sdl}

Play notes from the keyboard.

Type:

```
(?id : string?, ?velocity : float) -> source(midi=midi('a))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `velocity` (of type `float`, which defaults to `0.8`): Velocity of notes.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

This function is experimental.

### `input.oss` {#input.oss}

Stream from an OSS input device.

Type:

```
(?id : string?, ?device : string, ?fallible : bool, ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?self_sync : bool, ?start : bool) ->
source(audio=pcm('a))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `device` (of type `string`, which defaults to `"/dev/dsp"`): OSS device to use.
- `fallible` (of type `bool`, which defaults to `false`): Allow the source to fail. If set to `false`, `start` must be `true` and `stop` method raises an error.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input stops.
- `self_sync` (of type `bool`, which defaults to `true`): Mark the source as being synchronized by the OSS driver.
- `start` (of type `bool`, which defaults to `true`): Start input as soon as it is available.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `input.portaudio` {#input.portaudio}

Stream from a portaudio input device.

Type:

```
(?id : string?, ?buflen : int, ?device_id : int?, ?fallible : bool,
 ?latency : float?, ?on_start : (() -> unit), ?on_stop : (() -> unit),
 ?self_sync : bool, ?start : bool) -> source(audio=pcm('a))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `buflen` (of type `int`, which defaults to `256`): Length of a buffer in samples.
- `device_id` (of type `int?`, which defaults to `null`): Device ID. Uses default device if `null`.
- `fallible` (of type `bool`, which defaults to `false`): Allow the source to fail. If set to `false`, `start` must be `true` and `stop` method raises an error.
- `latency` (of type `float?`, which defaults to `null`): Device latency. Only used when specifying device ID.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input stops.
- `self_sync` (of type `bool`, which defaults to `true`): Mark the source as being synchronized by the portaudio driver.
- `start` (of type `bool`, which defaults to `true`): Start input as soon as it is available.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `input.pulseaudio` {#input.pulseaudio}

Stream from a pulseaudio input device.

Type:

```
(?id : string?, ?client : string, ?device : string?, ?fallible : bool,
 ?on_error : ((string) -> unit), ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?retry_delay : float, ?self_sync : bool,
 ?start : bool) -> source(audio=pcm('a))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `client` (of type `string`, which defaults to `"liquidsoap"`)
- `device` (of type `string?`, which defaults to `null`): Device to use. Uses default if set to `null`.
- `fallible` (of type `bool`, which defaults to `true`): Allow the source to fail. If set to `false`, `start` must be `true` and `stop` method raises an error.
- `on_error` (of type `(string) -> unit`, which defaults to `fun (_) -> ()`): Function executed when an operation with the pulseaudio server returns an error.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input stops.
- `retry_delay` (of type `float`, which defaults to `1.0`): When fallible, time to wait before trying to connect again.
- `self_sync` (of type `bool`, which defaults to `true`): Mark the source as being synchronized by the pulseaudio driver.
- `start` (of type `bool`, which defaults to `true`): Start input as soon as it is available.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `input.rtmp` {#input.rtmp}

Read an RTMP stream.

Type:

```
(?id : string?, ?max_buffer : float, ?listen : bool, {string}) -> source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`)
- `max_buffer` (of type `float`, which defaults to `5.0`): Maximum data buffer in seconds
- `listen` (of type `bool`, which defaults to `true`): Act as a RTMP server and wait for incoming connection
- `(unlabeled)` (of type `{string}`): URL to read RTMP from, in the form `rtmp://IP:PORT/ENDPOINT`

Methods:

- `buffer_length` (of type `() -> float`): Get the buffer's length in seconds.
- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `set_url` (of type `({string}) -> unit`): Set the source's url.
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `status` (of type `() -> string`): Return the current status of the source, either "stopped" (the source isn't trying to relay the HTTP stream), "starting" (polling task is about to begin) "polling" (attempting to connect to the HTTP stream), "connected <url>" (connected to <url>, buffering or playing back the stream) or "stopping" (source is stopping).
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.
- `url` (of type `() -> string`): Return the source's current url.

### `input.srt` {#input.srt}

Receive a SRT stream from a distant agent.

Type:

```
(?id : string?, ?bind_address : string, ?connection_timeout : float?,
 ?content_type : string, ?dump : string, ?enforced_encryption : bool?,
 ?host : string, ?ipv6only : bool?,
 ?listen_callback : ((hs_version : int, peeraddr : string,
                      streamid : string?, srt_socket) -> bool)?,
 ?max : float, ?messageapi : bool, ?mode : string,
 ?on_connect : (() -> unit), ?on_disconnect : (() -> unit),
 ?on_socket : ((mode : string, srt_socket) -> unit)?,
 ?on_start : (() -> unit), ?on_stop : (() -> unit), ?passphrase : string?,
 ?payload_size : int, ?pbkeylen : int?, ?polling_delay : float, ?port : int,
 ?prefer_address : string?, ?read_timeout : float?, ?self_sync : bool,
 ?start : bool, ?streamid : string?, ?write_timeout : float?) -> source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `bind_address` (of type `string`, which defaults to `"0.0.0.0"`): Address to bind on the local machine. Used only in listener mode
- `connection_timeout` (of type `float?`, which defaults to `null`): Timeout, in seconds, after which initial connection operations are aborted if no data was received. Uses library's default if `null`. Used only in `client` mode.
- `content_type` (of type `string`, which defaults to `"application/ffmpeg"`): Content-Type (mime type) used to find a decoder for the input stream.
- `dump` (of type `string`, which defaults to `""`): Dump received data to the given file for debugging. Unused is empty.
- `enforced_encryption` (of type `bool?`, which defaults to `null`): Enforces that both connection parties have the same passphrase set, or both do not set the passphrase, otherwise the connection is rejected.
- `host` (of type `string`, which defaults to `"localhost"`): Address to connect to. Used only in caller mode.
- `ipv6only` (of type `bool?`, which defaults to `null`): If `true` and `mode` is set to `listen`, only ipv6 connections are accepted. When `null`, defaults to `true` when the `bind_address` is a ipv6 address and system defaults otherwise.
- `listen_callback` (of type `((hs_version : int, peeraddr : string, streamid : string?, srt_socket) ->
 bool)?`, which defaults to `null`): Callback used to decide whether to accept new incoming connections. Used in listener mode only.
- `max` (of type `float`, which defaults to `10.0`): Maximum duration of the buffered data.
- `messageapi` (of type `bool`, which defaults to `true`): Use message api
- `mode` (of type `string`, which defaults to `"listener"`): Mode to operate on. One of: `"listener"` (waits for connection to come in) or `"caller"` (initiate connection to a remote server)
- `on_connect` (of type `() -> unit`, which defaults to `{()}`): Function to execute when connected.
- `on_disconnect` (of type `() -> unit`, which defaults to `{()}`): Function to execute when disconnected
- `on_socket` (of type `((mode : string, srt_socket) -> unit)?`, which defaults to `null`): Callback executed when a new SRT socket is created to set additional options, add monitoring, etc. `mode` should be one of: `"connect"` (socket created before connecting to a remote address), `"listen"` (socket created before binding for receiving new incoming connections), `"incoming"` (socket received as incoming connection) or `"close"` (socket is about to closed).
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when input stops.
- `passphrase` (of type `string?`, which defaults to `null`): When set to a non-empty string, this option enables encryption and sets the passphrase for it. See `libsrt` documentation for more details.
- `payload_size` (of type `int`, which defaults to `1316`): Payload size.
- `pbkeylen` (of type `int?`, which defaults to `null`): Set encryption key length. See `libsrt` documentation for more details.
- `polling_delay` (of type `float`, which defaults to `2.0`): Delay between connection attempts. Used only in caller mode.
- `port` (of type `int`, which defaults to `8000`): Port to bind on the local machine (listener mode) or to connect to (caller mode). The term `port` as used in SRT is occasionally identical to the term `UDP port`. However SRT offers more flexibility than UDP because it manages ports as its own resources. For example, one port may be shared between various services.
- `prefer_address` (of type `string?`, which defaults to `null`): Preferred address type when resolving hostnames. One of: `"system"`, `"ipv4"` or `"ipv6"`. Defaults to global `srt.prefer_connection` settings when `null`.
- `read_timeout` (of type `float?`, which defaults to `1.0`): Timeout, in seconds, after which read operations are aborted if no data was received, indefinite if `null`.
- `self_sync` (of type `bool`, which defaults to `true`): `true` if the source controls its own latency (i.e. the SRT stream is in `live` mode), `false` otherwise (i.e. the stream is in `file` mode.
- `start` (of type `bool`, which defaults to `true`): Start input as soon as it is available.
- `streamid` (of type `string?`, which defaults to `null`): Set `streamid`. This value can be retrieved by the listener side when connecting to it. Used in caller mode only.
- `write_timeout` (of type `float?`, which defaults to `1.0`): Timeout, in seconds, after which write operations are aborted if no data was received, indefinite if `null`.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `connect` (of type `() -> unit`): In sender mode, connect to remote server. In listener mode, setup listening socket.
- `disconnect` (of type `() -> unit`): Disconnect all connected socket.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `sockets` (of type `() -> [string * srt_socket]`): List of `(connected_address, connected_socket)`
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `input.v4l2` {#input.v4l2}

Stream from a video4linux2 input device, such as a webcam.

Type:

```
(?id : string?, ?max_buffer : float, ?device : string) ->
source(video=canvas('a))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `max_buffer` (of type `float`, which defaults to `0.5`): Maximum data buffer in seconds
- `device` (of type `string`, which defaults to `"/dev/video0"`): V4L2 device to use.

### `native.request.dynamic` {#native.request.dynamic}

Play request dynamically created by a given function.

Type:

```
(?id : string?, ?available : {bool}, ?prefetch : int?,
 ?retry_delay : {float}, ?synchronous : bool, ?timeout : float?,
 ?native : bool, (() -> request?)) -> source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `available` (of type `{bool}`, which defaults to `true`): Whether some new requests are available (when set to false, it stops after current playing request).
- `prefetch` (of type `int?`, which defaults to `null`): How many requests should be queued in advance.
- `retry_delay` (of type `{float}`, which defaults to `0.1`): Retry after a given time (in seconds) when callback returns `null` or an error occurs while resolving a returned request.
- `synchronous` (of type `bool`, which defaults to `false`): If `true`, new requests are prepared as needed instead of using an asynchronous queue.
- `timeout` (of type `float?`, which defaults to `null`): Timeout (in sec.) to resolve the request. Defaults to `settings.request.timeout` when `null`.
- `native` (of type `bool`, which defaults to `false`)
- `(unlabeled)` (of type `() -> request?`)

Methods:

- `add` (of type `(request) -> bool`): 
- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `current` (of type `() -> request?`): 
- `current_source` (of type `() -> source('A)?`): Return the source currently selected.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `fetch` (of type `() -> bool`): 
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
- `prepare` (of type `(source('A)) -> unit`): Prepare a source that will be returned later.
- `queue` (of type `() -> [request]`): 
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `set_queue` (of type `([request]) -> unit`): 
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `noise` {#noise}

Generate audio/video noise source.

Type:

```
(?id : string?, ?duration : float?) -> source('a)
where 'a is a set of internal tracks
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `duration` (of type `float?`, which defaults to `null`): Duration in seconds (`null` means infinite).

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `playlist` {#playlist}

Read a playlist or a directory and play all files.

Type:

```
(?id : string?, ?check_next : ((request) -> bool)?, ?prefetch : int?,
 ?loop : bool, ?max_fail : int, ?mime_type : string?, ?mode : string,
 ?native : bool, ?on_done : (() -> unit), ?on_fail : (() -> [string])?,
 ?on_reload : ((string) -> unit), ?prefix : string, ?reload : int,
 ?reload_mode : string, ?timeout : float?, ?cue_in_metadata : string?,
 ?cue_out_metadata : string?, ?register_server_commands : bool, string) ->
source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `check_next` (of type `((request) -> bool)?`, which defaults to `null`): Function used to filter next tracks. A candidate track is only validated if the function returns true on it. The function is called before resolution, hence metadata will only be available for requests corresponding to local files. This is typically used to avoid repetitions, but be careful: if the function rejects all attempts, the playlist will enter into a consuming loop and stop playing anything.
- `prefetch` (of type `int?`, which defaults to `null`): How many requests should be queued in advance.
- `loop` (of type `bool`, which defaults to `true`): Loop on the playlist.
- `max_fail` (of type `int`, which defaults to `10`): When this number of requests fail to resolve, the whole playlists is considered as failed and `on_fail` is called.
- `mime_type` (of type `string?`, which defaults to `null`): Default MIME type for the playlist. `null` means automatic detection.
- `mode` (of type `string`, which defaults to `"randomize"`): Play the files in the playlist either in the order ("normal" mode), or shuffle the playlist each time it is loaded, and play it in this order for a whole round ("randomize" mode), or pick a random file in the playlist each time ("random" mode).
- `native` (of type `bool`, which defaults to `false`): Use native implementation.
- `on_done` (of type `() -> unit`, which defaults to `{()}`): Function executed when the playlist is finished.
- `on_fail` (of type `(() -> [string])?`, which defaults to `null`): Function executed when too many requests failed and returning the contents of a fixed playlist.
- `on_reload` (of type `(string) -> unit`, which defaults to `fun (_) -> ()`): Callback called after playlist has reloaded.
- `prefix` (of type `string`, which defaults to `""`): Add a constant prefix to all requests. Useful for passing extra information using annotate, or for resolution through a particular protocol, such as replaygain.
- `reload` (of type `int`, which defaults to `0`): Amount of time (in seconds or rounds), when applicable, before which the playlist is reloaded; 0 means never.
- `reload_mode` (of type `string`, which defaults to `"seconds"`): Unit of the reload parameter, either "never" (never reload the playlist), "rounds", "seconds" or "watch" (reload the file whenever it is changed).
- `timeout` (of type `float?`, which defaults to `null`): Timeout (in sec.) to resolve the request. Defaults to `settings.request.timeout` when `null`.
- `cue_in_metadata` (of type `string?`, which defaults to `"liq_cue_in"`): Metadata for cue in points. Disabled if `null`.
- `cue_out_metadata` (of type `string?`, which defaults to `"liq_cue_out"`): Metadata for cue out points. Disabled if `null`.
- `register_server_commands` (of type `bool`, which defaults to `true`): Register corresponding server commands
- `(unlabeled)` (of type `string`): Playlist URI.

Methods:

- `add` (of type `(request) -> bool`): Add a request to the queue. Requests are resolved before being added. Returns `true` if the request was successfully added.
- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `current` (of type `() -> request?`): Get the request currently being played.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `fetch` (of type `() -> bool`): Try feeding the queue with a new request. Returns `true` if successful. This method can take long to return and should usually be run in a separate thread.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `length` (of type `() -> int`): Length of the of the playlist (the number of songs it contains).
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `on_metadata` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on metadata packets.
- `on_shutdown` (of type `((() -> unit)) -> unit`): Register a function to be called when source shuts down.
- `on_track` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on new tracks.
- `on_wake_up` (of type `((() -> unit)) -> unit`): Register a function to be called after the source is asked to get ready. This is when, for instance, the source's final ID is set.
- `queue` (of type `() -> [request]`): Get the requests currently in the queue.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `reload` (of type `(?empty_queue : bool, ?uri : string?) -> unit`): Reload the playlist.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `remaining_files` (of type `() -> [string]`): Songs remaining to be played.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `set_queue` (of type `([request]) -> unit`): Set the queue of requests. Requests are resolved before being added to the queue. You are responsible for destroying the requests currently in the queue.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `playlist.list` {#playlist.list}

Play a list of files.

Type:

```
(?id : string?, ?check_next : ((request) -> bool)?, ?prefetch : int?,
 ?loop : bool, ?mode : string, ?native : bool, ?on_loop : (() -> unit),
 ?on_done : (() -> unit), ?max_fail : int, ?on_fail : (() -> [string])?,
 ?timeout : float?, ?cue_in_metadata : string?, ?cue_out_metadata : string?,
 [string]) -> source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `check_next` (of type `((request) -> bool)?`, which defaults to `null`): Function used to filter next tracks. A candidate track is only validated if the function returns true on it. The function is called before resolution, hence metadata will only be available for requests corresponding to local files. This is typically used to avoid repetitions, but be careful: if the function rejects all attempts, the playlist will enter into a consuming loop and stop playing anything.
- `prefetch` (of type `int?`, which defaults to `null`): How many requests should be queued in advance.
- `loop` (of type `bool`, which defaults to `true`): Loop on the playlist.
- `mode` (of type `string`, which defaults to `"normal"`): Play the files in the playlist either in the order ("normal" mode), or shuffle the playlist each time it is loaded, and play it in this order for a whole round ("randomize" mode), or pick a random file in the playlist each time ("random" mode).
- `native` (of type `bool`, which defaults to `false`): Use native implementation, when available.
- `on_loop` (of type `() -> unit`, which defaults to `{()}`): Function executed when the playlist is about to loop.
- `on_done` (of type `() -> unit`, which defaults to `{()}`): Function executed when the playlist is finished.
- `max_fail` (of type `int`, which defaults to `10`): When this number of requests fail to resolve, the whole playlists is considered as failed and `on_fail` is called.
- `on_fail` (of type `(() -> [string])?`, which defaults to `null`): Function executed when too many requests failed and returning the contents of a fixed playlist.
- `timeout` (of type `float?`, which defaults to `null`): Timeout (in sec.) to resolve the request. Defaults to `settings.request.timeout` when `null`.
- `cue_in_metadata` (of type `string?`, which defaults to `"liq_cue_in"`): Metadata for cue in points. Disabled if `null`.
- `cue_out_metadata` (of type `string?`, which defaults to `"liq_cue_out"`): Metadata for cue out points. Disabled if `null`.
- `(unlabeled)` (of type `[string]`): Playlist.

Methods:

- `add` (of type `(request) -> bool`): Add a request to the queue. Requests are resolved before being added. Returns `true` if the request was successfully added.
- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `current` (of type `() -> request?`): Get the request currently being played.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `fetch` (of type `() -> bool`): Try feeding the queue with a new request. Returns `true` if successful. This method can take long to return and should usually be run in a separate thread.
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
- `queue` (of type `() -> [request]`): Get the requests currently in the queue.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `reload` (of type `(?empty_queue : bool, [string]) -> unit`): Reload the playlist with given list of songs.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `remaining_files` (of type `() -> [string]`): Songs remaining to be played.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `set_queue` (of type `([request]) -> unit`): Set the queue of requests. Requests are resolved before being added to the queue. You are responsible for destroying the requests currently in the queue.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `request.dynamic` {#request.dynamic}

Play request dynamically created by a given function.

Type:

```
(?id : string?, ?available : {bool}, ?prefetch : int?,
 ?retry_delay : {float}, ?synchronous : bool, ?timeout : float?,
 ?native : bool, (() -> request?)) -> source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `available` (of type `{bool}`, which defaults to `true`): Whether some new requests are available (when set to false, it stops after current playing request).
- `prefetch` (of type `int?`, which defaults to `null`): How many requests should be queued in advance.
- `retry_delay` (of type `{float}`, which defaults to `0.1`): Retry after a given time (in seconds) when callback returns `null` or an error occurs while resolving a returned request.
- `synchronous` (of type `bool`, which defaults to `false`): If `true`, new requests are prepared as needed instead of using an asynchronous queue.
- `timeout` (of type `float?`, which defaults to `null`): Timeout (in sec.) to resolve the request. Defaults to `settings.request.timeout` when `null`.
- `native` (of type `bool`, which defaults to `false`)
- `(unlabeled)` (of type `() -> request?`)

Methods:

- `add` (of type `(request) -> bool`): Add a request to the queue. Requests are resolved before being added. Returns `true` if the request was successfully added.
- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `current` (of type `() -> request?`): Get the request currently being played.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `fetch` (of type `() -> bool`): Try feeding the queue with a new request. Returns `true` if successful. This method can take long to return and should usually be run in a separate thread.
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
- `queue` (of type `() -> [request]`): Get the requests currently in the queue.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `set_queue` (of type `([request]) -> unit`): Set the queue of requests. Requests are resolved before being added to the queue. You are responsible for destroying the requests currently in the queue.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `request.once` {#request.once}

Play a request once and become unavailable.

Type:

```
(?id : string?, ?timeout : float?, request) -> source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `"request.once"`)
- `timeout` (of type `float?`, which defaults to `null`): Timeout in seconds for resolving the request.
- `(unlabeled)` (of type `request`): Request to play.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `request` (of type `request`): 
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `resolve` (of type `() -> bool`): 
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `request.single` {#request.single}

Loop on a request. It never fails if the request is static, meaning that it can be fetched once. Typically, http, ftp, say requests are static, and time is not.

Type:

```
(?id : string?, ?prefetch : int?, ?timeout : float?, ?fallible : bool?,
 {request}) -> source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `"request.single"`)
- `prefetch` (of type `int?`, which defaults to `null`): How many requests should be queued in advance.
- `timeout` (of type `float?`, which defaults to `null`): Timeout (in sec.) to resolve the request.
- `fallible` (of type `bool?`, which defaults to `null`): Enforce fallibility of the request.
- `(unlabeled)` (of type `{request}`): Request

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `saw` {#saw}

Generate a saw wave.

Type:

```
(?id : string?, ?amplitude : {float}, ?duration : float?, ?{float}) ->
source(audio=pcm*)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `amplitude` (of type `{float}`, which defaults to `1.0`): Maximal value of the waveform.
- `duration` (of type `float?`, which defaults to `null`): Duration in seconds (`null` means infinite).
- `(unlabeled)` (of type `{float}`, which defaults to `440.0`): Frequency of the saw.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `sine` {#sine}

Generate a sine wave.

Type:

```
(?id : string?, ?amplitude : {float}, ?duration : float?, ?{float}) ->
source(audio=pcm*)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `amplitude` (of type `{float}`, which defaults to `1.0`): Maximal value of the waveform.
- `duration` (of type `float?`, which defaults to `null`): Duration in seconds (`null` means infinite).
- `(unlabeled)` (of type `{float}`, which defaults to `440.0`): Frequency of the sine.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `single` {#single}

Loop on a URI. It never fails if the request is static, meaning that it can be fetched once. Typically, http, ftp, say requests are static, and time is not.

Type:

```
(?prefetch : int?, ?timeout : float?, ?id : string?, ?fallible : bool,
 ?cue_in_metadata : string?, ?cue_out_metadata : string?, string) ->
source('a)
```

Arguments:

- `prefetch` (of type `int?`, which defaults to `null`): How many requests should be queued in advance.
- `timeout` (of type `float?`, which defaults to `null`): Timeout (in sec.) to resolve the request.
- `id` (of type `string?`, which defaults to `"single"`)
- `fallible` (of type `bool`, which defaults to `false`): Enforce fallibility of the request.
- `cue_in_metadata` (of type `string?`, which defaults to `"liq_cue_in"`): Metadata for cue in points. Disabled if `null`.
- `cue_out_metadata` (of type `string?`, which defaults to `"liq_cue_out"`): Metadata for cue out points. Disabled if `null`.
- `(unlabeled)` (of type `string`): URI where to find the file

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `source` {#source}

Create a source that muxes the given tracks.

Type:

```
(?id : string?, 'a.{metadata? : metadata, track_marks? : track_marks}) ->
source('a) where 'a is a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `'a.{metadata? : metadata, track_marks? : track_marks}
where 'a is a set of tracks to be muxed into a source`): Tracks to mux

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `source.fail` {#source.fail}

A source that does not produce anything. No silence, no track at all.

Type:

```
(?id : string?) -> source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `source.fail.init` {#source.fail.init}

A source that errors during its initialization phase, used for testing and debugging.

Type:

```
(?id : string?) -> source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

This function is experimental.

### `square` {#square}

Generate a square wave.

Type:

```
(?id : string?, ?amplitude : {float}, ?duration : float?, ?{float}) ->
source(audio=pcm*)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `amplitude` (of type `{float}`, which defaults to `1.0`): Maximal value of the waveform.
- `duration` (of type `float?`, which defaults to `null`): Duration in seconds (`null` means infinite).
- `(unlabeled)` (of type `{float}`, which defaults to `440.0`): Frequency of the square.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `video.testsrc` {#video.testsrc}

Generate a test video.

Type:

```
(?id : string?, ?height : int, ?width : int) -> source('a)
where 'a is a set of internal tracks
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `height` (of type `int`, which defaults to `-1`)
- `width` (of type `int`, which defaults to `-1`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.
