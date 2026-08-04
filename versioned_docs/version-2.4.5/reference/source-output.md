---
title: "Source / Output"
description: "Return a source with audio and video from a filter's output."
---
### `ffmpeg.filter.audio_video.output` {#ffmpeg.filter.audio_video.output}

Return a source with audio and video from a filter's output.

Type:

```
(?id : string?, ffmpeg.filter.graph, 'b
 .{tracks : () -> 'a.{audio : ffmpeg.filter.audio}}, 'd
 .{tracks : () -> 'c.{video : ffmpeg.filter.video}}) ->
source(audio=ffmpeg.audio.raw('e), video=ffmpeg.video.raw('f))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`)
- `(unlabeled)` (of type `ffmpeg.filter.graph`): Force the value of the source ID.
- `(unlabeled)` (of type `'b.{tracks : () -> 'a.{audio : ffmpeg.filter.audio}}`)
- `(unlabeled)` (of type `'d.{tracks : () -> 'c.{video : ffmpeg.filter.video}}`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
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
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): 
- `skip` (of type `() -> unit`): Skip to the next track.
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

### `output` {#output}

Output a stream using the default operator. The input source does not need to be infallible, blank will just be played during failures.

Type:

```
(?id : string?, ?fallible : bool, ?start : bool, source(audio=pcm('A))) ->
unit
```

Synchronization:

This output uses the PulseAudio clock as synchronization source when `self_sync=true` and the stream is open.

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `true`): Allow the child source to fail, in which case the output will be (temporarily) stopped.
- `start` (of type `bool`, which defaults to `true`): Automatically start outputting whenever possible. If `true`, an infallible (normal) output will start as soon as it is created, and a fallible output will (re)start as soon as its source becomes available for streaming.
- `(unlabeled)` (of type `source(audio=pcm('A))`): Source to play.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): This output uses the PulseAudio clock as synchronization source when `self_sync=true` and the stream is open.
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.alsa` {#output.alsa}

Output the source's stream to an ALSA output device.

Type:

```
(?id : string?, ?buffer_size : float?, ?device : string, ?fallible : bool,
 ?register_telnet : bool, ?self_sync : bool, ?start : bool,
 source(audio=pcm('a), 'b)) -> unit
```

Synchronization:

This output uses the ALSA hardware clock as synchronization source when `self_sync=true` and the device is open.

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `buffer_size` (of type `float?`, which defaults to `null`): ALSA buffer size in seconds. Defaults to frame duration when `null`.
- `device` (of type `string`, which defaults to `"default"`): Alsa device to use
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `self_sync` (of type `bool`, which defaults to `true`): Mark the source as being synchronized by the ALSA driver.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): This output uses the ALSA hardware clock as synchronization source when `self_sync=true` and the device is open.
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.ao` {#output.ao}

Output stream to local sound card using libao.

Type:

```
(?id : string?, ?channels_matrix : string, ?driver : string,
 ?fallible : bool, ?options : [string * string], ?register_telnet : bool,
 ?self_sync : bool, ?start : bool, source(audio=pcm('a), 'b)) -> unit
```

Synchronization:

This output uses the AO device clock as synchronization source when `self_sync=true` and the device is open.

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `channels_matrix` (of type `string`, which defaults to `""`): Output channels matrix, "" for AO's default.
- `driver` (of type `string`, which defaults to `""`): Driver to be used, "" for AO's default.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `options` (of type `[string * string]`, which defaults to `[]`): List of parameters, depends on the driver.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `self_sync` (of type `bool`, which defaults to `true`): Use the dedicated AO clock.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): This output uses the AO device clock as synchronization source when `self_sync=true` and the device is open.
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.audio_video` {#output.audio_video}

Output a stream with audio and video using the default operator. The input source does not need to be infallible, blank will just be played during failures.

Type:

```
(?id : string?, ?fallible : bool, ?start : bool, source(audio=pcm('A),
 video=canvas('a), 'b)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `true`): Allow the child source to fail, in which case the output will be (temporarily) stopped.
- `start` (of type `bool`, which defaults to `true`): Automatically start outputting whenever possible. If `true`, an infallible (normal) output will start outputting as soon as it is created, and a fallible output will (re)start as soon as its source becomes available for streaming.
- `(unlabeled)` (of type `source(audio=pcm('A), video=canvas('a), 'b)`): Source to play.

### `output.dummy` {#output.dummy}

Dummy output: computes the stream, without actually using it.

Type:

```
(?id : string?, ?fallible : bool, ?register_telnet : bool, ?start : bool,
 source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`)
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.external` {#output.external}

Send the stream to a process' standard input.

Type:

```
(?id : string?, ?export_cover_metadata : bool, ?fallible : bool,
 ?flush : bool, ?register_telnet : bool, ?reopen_delay : {float},
 ?reopen_on_error : ((error?) -> float?),
 ?reopen_on_metadata : (([string * string]) -> bool),
 ?reopen_when : (() -> bool), ?self_sync : bool, ?start : bool, format('a),
 {string}, source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `export_cover_metadata` (of type `bool`, which defaults to `true`): Export cover metadata.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `flush` (of type `bool`, which defaults to `false`): Perform a flush after each write.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `reopen_delay` (of type `{float}`, which defaults to `120.0`): Prevent re-opening within that delay, in seconds. Only applies to `reopen_when`.
- `reopen_on_error` (of type `(error?) -> float?`, which defaults to `fun (_) -> null`): Callback called when there is an error. Error is raised when returning `null`. Otherwise, the file is reopened after the returned value, in seconds.
- `reopen_on_metadata` (of type `([string * string]) -> bool`, which defaults to `fun (_) -> false`): Callback called on metadata. If returned value is `true`, the file is reopened.
- `reopen_when` (of type `() -> bool`, which defaults to `{false}`): Callback called on each frame. If returned value is `true`, the file is reopened.
- `self_sync` (of type `bool`, which defaults to `false`): Set to `true` if the process is expected to control the output's latency. Typical example: `ffmpeg` with the `-re` command-line option.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `format('a)`): Process to pipe data to.
- `(unlabeled)` (of type `{string}`): Encoding format.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reopen` (of type `() -> unit`): Reopen the output pipe. The actual reopening happens the next time the output has some data to output.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): 
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_reopen` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when the output is reopened.
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.file` {#output.file}

Output the source stream to a file.

Type:

```
(?id : string?, ?append : bool, ?dir_perm : int,
 ?export_cover_metadata : bool, ?fallible : bool, ?flush : bool,
 ?on_close : ((string) -> unit), ?perm : int, ?register_telnet : bool,
 ?reopen_delay : {float}, ?reopen_on_error : ((error?) -> float?),
 ?reopen_on_metadata : (([string * string]) -> bool),
 ?reopen_when : (() -> bool), ?start : bool, format('a), {string},
 source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `append` (of type `bool`, which defaults to `false`): Do not truncate but append in the file if it exists.
- `dir_perm` (of type `int`, which defaults to `511`): Permission of the directories if some have to be created, up to umask. Although you can enter values in octal notation (0oXXX) they will be displayed in decimal (for instance, 0o777 = 7×8^2 + 7×8 + 7 = 511).
- `export_cover_metadata` (of type `bool`, which defaults to `true`): Export cover metadata.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `flush` (of type `bool`, which defaults to `false`): Perform a flush after each write.
- `on_close` (of type `(string) -> unit`, which defaults to `fun (_) -> ()`): This function will be called for each file, after that it is finished and closed. The filename will be passed as argument.
- `perm` (of type `int`, which defaults to `438`): Permission of the file if it has to be created, up to umask. You can and should write this number in octal notation: 0oXXX. The default value is however displayed in decimal (0o666 = 6×8^2 + 6×8 + 6 = 438).
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `reopen_delay` (of type `{float}`, which defaults to `120.0`): Prevent re-opening within that delay, in seconds. Only applies to `reopen_when`.
- `reopen_on_error` (of type `(error?) -> float?`, which defaults to `fun (_) -> null`): Callback called when there is an error. Error is raised when returning `null`. Otherwise, the file is reopened after the returned value, in seconds.
- `reopen_on_metadata` (of type `([string * string]) -> bool`, which defaults to `fun (_) -> false`): Callback called on metadata. If returned value is `true`, the file is reopened.
- `reopen_when` (of type `() -> bool`, which defaults to `{false}`): Callback called on each frame. If returned value is `true`, the file is reopened.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `format('a)`): Encoding format.
- `(unlabeled)` (of type `{string}`): Filename where to output the stream.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reopen` (of type `() -> unit`): Reopen the output pipe. The actual reopening happens the next time the output has some data to output.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`)
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_reopen` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when the output is reopened.
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.file.hls` {#output.file.hls}

Output the source stream to an HTTP live stream served from a local directory.

Type:

```
(?id : string?, ?dir_perm : int, ?extra_tags : [string], ?fallible : bool,
 ?perm : int, ?persist_at : string?, ?playlist : string, ?prefix : string,
 ?register_telnet : bool, ?segment_duration : float,
 ?segment_name : ((
                   {
                     duration : float,
                     extname : string,
                     position : int,
                     stream_name : string,
                     ticks : int
                   }) -> string),
 ?segments : int, ?segments_overhead : int?, ?start : bool,
 ?strict_persist : bool, ?temp_dir : string?,
 ?main_playlist_writer : ((extra_tags : [string], prefix : string,
                           version : int,
                           [string
                            .{
                              bandwidth : int,
                              codecs : string,
                              video_size? : int * int
                            }]) -> string?)?,
 string,
 [string * format('a)
  .{
    bandwidth? : int,
    codecs? : string,
    extname? : string,
    extra_tags? : [string],
    id3? : bool,
    id3_version? : int,
    replay_id3? : bool,
    video_size? : int * int
  }],
 source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `dir_perm` (of type `int`, which defaults to `511`): Permission of the directories if some have to be created, up to umask.
- `extra_tags` (of type `[string]`, which defaults to `[]`): Extra tags to insert into the main playlist.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `perm` (of type `int`, which defaults to `438`): Permission of the created files, up to umask.
- `persist_at` (of type `string?`, which defaults to `null`): Location of the configuration file used to restart the output. Relative paths are assumed to be with regard to the directory for generated file.
- `playlist` (of type `string`, which defaults to `"stream.m3u8"`): Playlist name (m3u8 extension is recommended).
- `prefix` (of type `string`, which defaults to `""`): Prefix for each files in playlists.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `segment_duration` (of type `float`, which defaults to `10.0`): Segment duration (in seconds).
- `segment_name` (of type `(
 {
   duration : float,
   extname : string,
   position : int,
   stream_name : string,
   ticks : int
 }) -> string`, which defaults to `<fun>`): Segment name. Default: `fun (metadata) -> "#{metadata.stream_name}_#{metadata.position}.#{metadata.extname}"`
- `segments` (of type `int`, which defaults to `10`): Number of segments per playlist.
- `segments_overhead` (of type `int?`, which defaults to `5`): Number of segments to keep after they have been featured in the live playlist. Set to `null` to disable.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `strict_persist` (of type `bool`, which defaults to `false`): Fail if an invalid saved state exists.
- `temp_dir` (of type `string?`, which defaults to `null`): Temporary directory used for writing files. This should be in the same partition or device as the final directory to guarantee atomic file operations. Use the same directory as the HLS files if `null`.
- `main_playlist_writer` (of type `((extra_tags : [string], prefix : string, version : int,
  [string.{bandwidth : int, codecs : string, video_size? : int * int}]) ->
 string?)?`, which defaults to `<fun>`): Main playlist writer. Main playlist writing is disabled when `null` or when returning `null`.
- `(unlabeled)` (of type `string`): List of specifications for each stream: (name, format).
- `(unlabeled)` (of type `[string * format('a)
 .{
   bandwidth? : int,
   codecs? : string,
   extname? : string,
   extra_tags? : [string],
   id3? : bool,
   id3_version? : int,
   replay_id3? : bool,
   video_size? : int * int
 }]`): Directory for generated files.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `insert_tag` (of type `(string) -> unit`): Insert the same tag into all the streams
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): 
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `streams` (of type `() ->
[
 {
   bandwidth : int,
   codecs : string,
   discontinuity_count : int,
   encoder : format('A),
   extname : string,
   extra_tags : [string],
   id3_enabled : bool,
   insert_tag : (string) -> unit,
   name : string,
   replay_id3 : bool,
   video_size : 
   {height : int, width : int
   }?
 }]`): Output streams
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_file_change` (of type `(synchronous : bool, (({path : string, state : string}) -> unit)) -> unit`): Call a given handler when a file changes. `state` is one of: `"created"`, `"updated"` or `"deleted"`, `path` is the full file path. Typical use: sync file with a CDN
- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.harbor` {#output.harbor}

Encode and output the stream using the harbor server.

Type:

```
(?id : string?, ?auth : ((address : string, string, string) -> bool)?,
 ?buffer : int, ?burst : int, ?chunk : int, ?dumpfile : string?,
 ?encoding : string, ?fallible : bool, ?format : string,
 ?headers : [string * string], ?metaint : int, mount : string,
 ?password : string?, ?port : int, ?register_telnet : bool, ?start : bool,
 ?timeout : float, ?transport : http_transport, ?url : string?,
 ?user : string?, format('a), source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `auth` (of type `((address : string, string, string) -> bool)?`, which defaults to `null`): Authentication function. `f(~address,login,password)` returns `true` if the user should be granted access for this login. When defined, `user` and `password` arguments are not taken in account.
- `buffer` (of type `int`, which defaults to `327675`): Maximum buffer per-client.
- `burst` (of type `int`, which defaults to `65534`): Initial burst of data sent to the client.
- `chunk` (of type `int`, which defaults to `1024`): Send data to clients using chunks of at least this length.
- `dumpfile` (of type `string?`, which defaults to `null`): Dump stream to file, for debugging purpose. Disabled if null.
- `encoding` (of type `string`, which defaults to `""`): Encoding used to send metadata. If empty, defaults to "UTF-8"
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `format` (of type `string`, which defaults to `""`): Format, e.g. "audio/ogg". When empty, the encoder is used to guess.
- `headers` (of type `[string * string]`, which defaults to `[]`): Additional headers.
- `metaint` (of type `int`, which defaults to `8192`): Interval used to send ICY metadata
- `mount` (of type `string`)
- `password` (of type `string?`, which defaults to `null`): Password for client connection. A `user` must also be set. We check for this password is checked unless an `auth` function is defined, which is used in this case.
- `port` (of type `int`, which defaults to `8000`)
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `timeout` (of type `float`, which defaults to `30.0`): Timeout for network operations (in seconds).
- `transport` (of type `http_transport`, which defaults to `<unix_transport>`): Http transport. Use `http.transport.ssl` or `http.transport.secure_transport`, when available, to enable HTTPS output
- `url` (of type `string?`, which defaults to `null`)
- `user` (of type `string?`, which defaults to `null`): User for client connection. You also need to setup a `password`.
- `(unlabeled)` (of type `format('a)`): Encoding format.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`)
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_connect` (of type `(synchronous : bool,
 (({headers : [string * string], ip : string, protocol : string, uri : string
   }) -> unit)) -> unit`): Call a given handler when connection is established (takes headers, connection uri, protocol and client's IP as arguments).
- `on_disconnect` (of type `(synchronous : bool, ((string) -> unit)) -> unit`): Call a given handler when a source is disconnected.
- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.harbor.hls` {#output.harbor.hls}

Output the source stream to an HTTP live stream served from the harbor HTTP server.

Type:

```
(?id : string?, ?dir_perm : int, ?extra_tags : [string], ?fallible : bool,
 ?perm : int, ?persist_at : string?, ?playlist : string, ?prefix : string,
 ?register_telnet : bool, ?segment_duration : float, ?segments : int,
 ?segments_overhead : int?, ?start : bool, ?strict_persist : bool,
 ?temp_dir : string?,
 ?main_playlist_writer : ((extra_tags : [string], prefix : string,
                           version : int,
                           [string
                            .{
                              bandwidth : int,
                              codecs : string,
                              video_size? : int * int
                            }]) -> string?)?,
 ?segment_name : ((
                   {
                     duration : float,
                     extname : string,
                     position : int,
                     stream_name : string,
                     ticks : int
                   }) -> string),
 ?headers : [string * string], ?port : int, ?path : string,
 ?tmpdir : string?, ?transport : http_transport
 .{default_port : int, name : string, protocol : string},
 [string * format('a)], source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `dir_perm` (of type `int`, which defaults to `511`): Permission of the directories if some have to be created, up to umask.
- `extra_tags` (of type `[string]`, which defaults to `[]`): Extra tags to insert into the main playlist.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `perm` (of type `int`, which defaults to `438`): Permission of the created files, up to umask.
- `persist_at` (of type `string?`, which defaults to `null`): Location of the configuration file used to restart the output. Relative paths are assumed to be with regard to the directory for generated file.
- `playlist` (of type `string`, which defaults to `"stream.m3u8"`): Playlist name (m3u8 extension is recommended).
- `prefix` (of type `string`, which defaults to `""`): Prefix for each files in playlists.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `segment_duration` (of type `float`, which defaults to `10.0`): Segment duration (in seconds).
- `segments` (of type `int`, which defaults to `10`): Number of segments per playlist.
- `segments_overhead` (of type `int?`, which defaults to `5`): Number of segments to keep after they have been featured in the live playlist. Set to `null` to disable.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `strict_persist` (of type `bool`, which defaults to `false`): Fail if an invalid saved state exists.
- `temp_dir` (of type `string?`, which defaults to `null`): Temporary directory used for writing files. This should be in the same partition or device as the final directory to guarantee atomic file operations. Use the same directory as the HLS files if `null`.
- `main_playlist_writer` (of type `((extra_tags : [string], prefix : string, version : int,
  [string.{bandwidth : int, codecs : string, video_size? : int * int}]) ->
 string?)?`, which defaults to `<fun>`): Main playlist writer. Main playlist writing is disabled when `null` or when returning `null`.
- `segment_name` (of type `(
 {
   duration : float,
   extname : string,
   position : int,
   stream_name : string,
   ticks : int
 }) -> string`, which defaults to `<fun>`): Segment name. Default: `fun (metadata) -> "#{metadata.stream_name}_#{metadata.position}.#{metadata.extname}"`
- `headers` (of type `[string * string]`, which defaults to `[("Access-Control-Allow-Origin", "*")]`): Default response headers.
- `port` (of type `int`, which defaults to `8000`): Port for incoming harbor (http) connections.
- `path` (of type `string`, which defaults to `"/"`): Base path for hls URIs.
- `tmpdir` (of type `string?`, which defaults to `null`): Directory for generated files.
- `transport` (of type `http_transport.{default_port : int, name : string, protocol : string}`, which defaults to `<unix_transport>.{default_port=80, protocol="http", name="unix"}`): Http transport. Use `http.transport.ssl` or `http.transport.secure_transport`, when available, to enable HTTPS output
- `(unlabeled)` (of type `[string * format('a)]`): List of specifications for each stream: (name, format).
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `insert_tag` (of type `(string) -> unit`): Insert the same tag into all the streams
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): 
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `streams` (of type `() ->
[
 {
   bandwidth : int,
   codecs : string,
   discontinuity_count : int,
   encoder : format('A),
   extname : string,
   extra_tags : [string],
   id3_enabled : bool,
   insert_tag : (string) -> unit,
   name : string,
   replay_id3 : bool,
   video_size : 
   {height : int, width : int
   }?
 }]`): Output streams
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_file_change` (of type `(synchronous : bool, (({path : string, state : string}) -> unit)) -> unit`): Call a given handler when a file changes. `state` is one of: `"created"`, `"updated"` or `"deleted"`, `path` is the full file path. Typical use: sync file with a CDN
- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.icecast` {#output.icecast}

Encode and output the stream to an icecast server.

Type:

```
(?id : string?, ?chunked : bool, ?connection_timeout : float,
 ?description : string?, ?dumpfile : string?, ?encoding : string?,
 ?fallible : bool, ?format : string, ?genre : string?,
 ?headers : [string * string], ?host : string, ?icy_metadata : [string],
 ?icy_song : (([string * string]) -> string?), ?method : string,
 mount : string, ?name : string?, ?password : string, ?port : int,
 ?prefer_address : string?, ?public : bool, ?register_telnet : bool,
 ?send_icy_metadata : bool?, ?send_last_metadata_on_connect : bool,
 ?start : bool, ?timeout : float, ?transport : http_transport,
 ?url : string?, ?user : string?, format('a), source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `chunked` (of type `bool`, which defaults to `false`): Used chunked transfer with the 'http(s)' protocol.
- `connection_timeout` (of type `float`, which defaults to `5.0`): Timeout for establishing network connections (disabled is negative).
- `description` (of type `string?`, which defaults to `null`)
- `dumpfile` (of type `string?`, which defaults to `null`): Dump stream to file, for debugging purpose. Disabled if null.
- `encoding` (of type `string?`, which defaults to `null`): Encoding used to send metadata and stream info (name, genre and description). If null, defaults to "UTF-8".
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `format` (of type `string`, which defaults to `""`): Format, e.g. "audio/ogg". When empty, the encoder is used to guess.
- `genre` (of type `string?`, which defaults to `null`)
- `headers` (of type `[string * string]`, which defaults to `[("User-Agent", "Liquidsoap/2.4.5 (Unix; OCaml 4.14.2)")]`): Additional headers.
- `host` (of type `string`, which defaults to `"localhost"`)
- `icy_metadata` (of type `[string]`, which defaults to `["song", "title", "artist", "genre", "date", "album", "tracknum", "comment", "dj", "next"]`): List of metadata to send with ICY metadata update
- `icy_song` (of type `([string * string]) -> string?`, which defaults to `<fun>`): Function used to generate the default icy "song" metadata. Metadata is not added when returning `null`. Default: `$(artist) - $(title)` if both are defined, otherwise `artist` or `title` if either is defined or `null`.
- `method` (of type `string`, which defaults to `"source"`): Method to use with the 'http(s)' protocol. One of: 'source', 'put' or 'post'.
- `mount` (of type `string`): Source mount point.
- `name` (of type `string?`, which defaults to `null`)
- `password` (of type `string`, which defaults to `"hackme"`)
- `port` (of type `int`, which defaults to `8000`)
- `prefer_address` (of type `string?`, which defaults to `null`): Preferred address type when resolving hostnames. One of: `"system"`, `"ipv4"` or `"ipv6"`. Defaults to `settings.icecast.prefer_address` when `null`.
- `public` (of type `bool`, which defaults to `true`)
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `send_icy_metadata` (of type `bool?`, which defaults to `null`): Send new metadata using the ICY protocol. Guessed when `null`
- `send_last_metadata_on_connect` (of type `bool`, which defaults to `true`): Send the source's last metadata when connecting to the remote icecast server.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `timeout` (of type `float`, which defaults to `30.0`): Timeout for network read and write.
- `transport` (of type `http_transport`, which defaults to `<unix_transport>`): Http transport. Use `http.transport.ssl` or `http.transport.secure_transport`, when available, to enable HTTPS output
- `url` (of type `string?`, which defaults to `null`)
- `user` (of type `string?`, which defaults to `null`): User for shout source connection. Defaults to "source" for icecast connections. Useful only in special cases, like with per-mountpoint users.
- `(unlabeled)` (of type `format('a)`): Encoding format.
- `(unlabeled)` (of type `source('a)`): The source to output

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): 
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_connect` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when connection is established.
- `on_disconnect` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when connection stops.
- `on_error` (of type `(synchronous : bool, ((restart_in : ((float?) -> unit), error) -> unit)) ->
unit`): Call a given handler when an error happens. The callback receives the error that occurred and a restart callback. If restart callback is executed with a positive float value, connection will be tried again after this amount of time (in seconds). If executed with a negative value, an error is raised. If executed with `null`, connection is not attempted again and no errors are raised. There can only be one single callback registered for this at a time. Every secondary registration replaces the previous one.
- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.jack` {#output.jack}

Output stream to jack.

Type:

```
(?id : string?, ?fallible : bool, ?register_telnet : bool, ?server : string,
 ?start : bool, source(audio=pcm('a), 'b)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `server` (of type `string`, which defaults to `""`): Jack server to connect to.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`)
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.ndi` {#output.ndi}

Output stream to NDI

Type:

```
(?id : string?, ?fallible : bool, ?groups : string?, library_file : string,
 ?name : string?, ?register_telnet : bool, ?self_sync : bool, ?start : bool,
 format('a), source('a)) -> unit
```

Synchronization:

This output uses the NDI sender clock as synchronization source when `self_sync=true` and the sender is active.

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `groups` (of type `string?`, which defaults to `null`): NDI sender groups
- `library_file` (of type `string`): Path to the shared library file.
- `name` (of type `string?`, which defaults to `null`): NDI sender name
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `self_sync` (of type `bool`, which defaults to `false`): Use the dedicated NDI clock.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `format('a)`): Encoding format. Only the `%ndi` encoder is allowed here!
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): This output uses the NDI sender clock as synchronization source when `self_sync=true` and the sender is active.
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

This function is experimental.

### `output.oss` {#output.oss}

Output the source's stream to an OSS output device.

Type:

```
(?id : string?, ?device : string, ?fallible : bool, ?register_telnet : bool,
 ?self_sync : bool, ?start : bool, source(audio=pcm('a), 'b)) -> unit
```

Synchronization:

This output uses the OSS hardware clock as synchronization source when `self_sync=true` and the device is open.

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `device` (of type `string`, which defaults to `"/dev/dsp"`): OSS device to use.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `self_sync` (of type `bool`, which defaults to `true`): Mark the source as being synchronized by the OSS driver.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): This output uses the OSS hardware clock as synchronization source when `self_sync=true` and the device is open.
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.portaudio` {#output.portaudio}

Output the source's stream to a portaudio output device.

Type:

```
(?id : string?, ?buflen : int, ?device_id : int?, ?device_name : string?,
 ?fallible : bool, ?latency : float?, ?register_telnet : bool,
 ?self_sync : bool, ?start : bool, source(audio=pcm('a), 'b)) -> unit
```

Synchronization:

This output uses the PortAudio clock as synchronization source when `self_sync=true` and the stream is open.

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `buflen` (of type `int`, which defaults to `256`): Length of a buffer in samples.
- `device_id` (of type `int?`, which defaults to `null`): Device ID. Uses default device if `null`.
- `device_name` (of type `string?`, which defaults to `null`): Device name.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `latency` (of type `float?`, which defaults to `null`): Device latency. Only used when specifying device ID.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `self_sync` (of type `bool`, which defaults to `true`): Mark the source as being synchronized by the portaudio driver.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): This output uses the PortAudio clock as synchronization source when `self_sync=true` and the stream is open.
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.pulseaudio` {#output.pulseaudio}

Output the source's stream to a pulseaudio output device.

Type:

```
(?id : string?, ?client : string, ?device : string?, ?fallible : bool,
 ?on_error : ((string) -> unit), ?register_telnet : bool,
 ?retry_delay : float, ?self_sync : bool, ?start : bool,
 source(audio=pcm('a), 'b)) -> unit
```

Synchronization:

This output uses the PulseAudio clock as synchronization source when `self_sync=true` and the stream is open.

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `client` (of type `string`, which defaults to `"liquidsoap"`)
- `device` (of type `string?`, which defaults to `null`): Device to use. Uses default if set to `null`.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `on_error` (of type `(string) -> unit`, which defaults to `fun (_) -> ()`): Function executed when an operation with the pulseaudio server returns an error.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `retry_delay` (of type `float`, which defaults to `1.0`): When fallible, time to wait before trying to connect again.
- `self_sync` (of type `bool`, which defaults to `true`): Mark the source as being synchronized by the pulseaudio driver.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): This output uses the PulseAudio clock as synchronization source when `self_sync=true` and the stream is open.
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.sdl` {#output.sdl}

Display a video using SDL.

Type:

```
(?id : string?, ?fallible : bool, ?register_telnet : bool, ?start : bool,
 source(video=canvas('a), 'b)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`)
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.sdl.has_video` {#output.sdl.has_video}

Check whether video output is available with SDL.

Type:

```
() -> bool
```

### `output.shoutcast` {#output.shoutcast}

Encode and output the stream to a shoutcast server.

Type:

```
(?id : string?, ?chunked : bool, ?connection_timeout : float,
 ?dumpfile : string?, ?encoding : string?, ?fallible : bool,
 ?format : string, ?genre : string?, ?headers : [string * string],
 ?host : string, ?icy_id : int, ?icy_metadata : [string],
 ?icy_song : (([string * string]) -> string?), ?name : string?,
 ?password : string, ?port : int, ?prefer_address : string?, ?public : bool,
 ?register_telnet : bool, ?send_icy_metadata : bool?,
 ?send_last_metadata_on_connect : bool, ?start : bool, ?timeout : float,
 ?transport : http_transport, ?url : string?, ?user : string?,
 ?icy_reset : bool, ?dj : {string}, ?aim : string, ?icq : string,
 ?irc : string, format('a), source('a)) -> unit
where 'a is a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `chunked` (of type `bool`, which defaults to `false`): Used chunked transfer with the 'http(s)' protocol.
- `connection_timeout` (of type `float`, which defaults to `5.0`): Timeout for establishing network connections (disabled is negative).
- `dumpfile` (of type `string?`, which defaults to `null`): Dump stream to file, for debugging purpose. Disabled if null.
- `encoding` (of type `string?`, which defaults to `null`): Encoding used to send metadata and stream info (name, genre and description). If null, defaults to "UTF-8".
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `format` (of type `string`, which defaults to `""`): Format, e.g. "audio/ogg". When empty, the encoder is used to guess.
- `genre` (of type `string?`, which defaults to `null`)
- `headers` (of type `[string * string]`, which defaults to `[("User-Agent", "Liquidsoap/2.4.5 (Unix; OCaml 4.14.2)")]`): Additional headers.
- `host` (of type `string`, which defaults to `"localhost"`)
- `icy_id` (of type `int`, which defaults to `1`): Shoutcast source ID.
- `icy_metadata` (of type `[string]`, which defaults to `["song", "title", "artist", "genre", "date", "album", "tracknum", "comment", "dj", "next"]`): List of metadata to send with ICY metadata update
- `icy_song` (of type `([string * string]) -> string?`, which defaults to `<fun>`): Function used to generate the default icy "song" metadata. Metadata is not added when returning `null`. Default: `$(artist) - $(title)` if both are defined, otherwise `artist` or `title` if either is defined or `null`.
- `name` (of type `string?`, which defaults to `null`)
- `password` (of type `string`, which defaults to `"hackme"`)
- `port` (of type `int`, which defaults to `8000`)
- `prefer_address` (of type `string?`, which defaults to `null`): Preferred address type when resolving hostnames. One of: `"system"`, `"ipv4"` or `"ipv6"`. Defaults to `settings.icecast.prefer_address` when `null`.
- `public` (of type `bool`, which defaults to `true`)
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `send_icy_metadata` (of type `bool?`, which defaults to `null`): Send new metadata using the ICY protocol. Guessed when `null`
- `send_last_metadata_on_connect` (of type `bool`, which defaults to `true`): Send the source's last metadata when connecting to the remote icecast server.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `timeout` (of type `float`, which defaults to `30.0`): Timeout for network read and write.
- `transport` (of type `http_transport`, which defaults to `<unix_transport>`): Http transport. Use `http.transport.ssl` or `http.transport.secure_transport`, when available, to enable HTTPS output
- `url` (of type `string?`, which defaults to `null`)
- `user` (of type `string?`, which defaults to `null`): User for shout source connection. Defaults to "source" for icecast connections. Useful only in special cases, like with per-mountpoint users.
- `icy_reset` (of type `bool`, which defaults to `true`): Reset shoutcast source buffer upon connecting (necessary for NSV).
- `dj` (of type `{string}`, which defaults to `""`): Set DJ name.
- `aim` (of type `string`, which defaults to `""`)
- `icq` (of type `string`, which defaults to `""`)
- `irc` (of type `string`, which defaults to `""`)
- `(unlabeled)` (of type `format('a) where 'a is a set of tracks to be muxed into a source`): Encoding format. Should be mp3 or AAC(+).
- `(unlabeled)` (of type `source('a) where 'a is a set of tracks to be muxed into a source`): The source to output

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): 
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_connect` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when connection is established.
- `on_disconnect` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when connection stops.
- `on_error` (of type `(synchronous : bool, ((restart_in : ((float?) -> unit), error) -> unit)) ->
unit`): Call a given handler when an error happens. The callback receives the error that occurred and a restart callback. If restart callback is executed with a positive float value, connection will be tried again after this amount of time (in seconds). If executed with a negative value, an error is raised. If executed with `null`, connection is not attempted again and no errors are raised. There can only be one single callback registered for this at a time. Every secondary registration replaces the previous one.
- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.srt` {#output.srt}

Send a SRT stream to a distant agent.

Type:

```
(?id : string?, ?bind_address : string, ?connection_timeout : float?,
 ?enforced_encryption : bool?, ?fallible : bool, ?host : string,
 ?ipv6only : bool?,
 ?listen_callback : ((hs_version : int, peeraddr : string,
                      streamid : string?, srt_socket) -> bool)?,
 ?max_clients : int?, ?messageapi : bool, ?mode : string,
 ?passphrase : string?, ?payload_size : int, ?pbkeylen : int?,
 ?polling_delay : float, ?port : int, ?prefer_address : string?,
 ?read_timeout : float?, ?register_telnet : bool, ?start : bool,
 ?streamid : string?, ?write_timeout : float?, format('a), source('a)) ->
unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `bind_address` (of type `string`, which defaults to `"0.0.0.0"`): Address to bind on the local machine. Used only in listener mode
- `connection_timeout` (of type `float?`, which defaults to `null`): Timeout, in seconds, after which initial connection operations are aborted if no data was received. Uses library's default if `null`. Used only in `client` mode.
- `enforced_encryption` (of type `bool?`, which defaults to `null`): Enforces that both connection parties have the same passphrase set, or both do not set the passphrase, otherwise the connection is rejected.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `host` (of type `string`, which defaults to `"localhost"`): Address to connect to. Used only in caller mode.
- `ipv6only` (of type `bool?`, which defaults to `null`): If `true` and `mode` is set to `listen`, only ipv6 connections are accepted. When `null`, defaults to `true` when the `bind_address` is a ipv6 address and system defaults otherwise.
- `listen_callback` (of type `((hs_version : int, peeraddr : string, streamid : string?, srt_socket) ->
 bool)?`, which defaults to `null`): Callback used to decide whether to accept new incoming connections. Used in listener mode only.
- `max_clients` (of type `int?`, which defaults to `null`): Max number of connected clients (listener mode only)
- `messageapi` (of type `bool`, which defaults to `true`): Use message api
- `mode` (of type `string`, which defaults to `"caller"`): Mode to operate on. One of: `"listener"` (waits for connection to come in) or `"caller"` (initiate connection to a remote server)
- `passphrase` (of type `string?`, which defaults to `null`): When set to a non-empty string, this option enables encryption and sets the passphrase for it. See `libsrt` documentation for more details.
- `payload_size` (of type `int`, which defaults to `1316`): Payload size.
- `pbkeylen` (of type `int?`, which defaults to `null`): Set encryption key length. See `libsrt` documentation for more details.
- `polling_delay` (of type `float`, which defaults to `2.0`): Delay between connection attempts. Used only in caller mode.
- `port` (of type `int`, which defaults to `8000`): Port to bind on the local machine (listener mode) or to connect to (caller mode). The term `port` as used in SRT is occasionally identical to the term `UDP port`. However SRT offers more flexibility than UDP because it manages ports as its own resources. For example, one port may be shared between various services.
- `prefer_address` (of type `string?`, which defaults to `null`): Preferred address type when resolving hostnames. One of: `"system"`, `"ipv4"` or `"ipv6"`. Defaults to global `srt.prefer_connection` settings when `null`.
- `read_timeout` (of type `float?`, which defaults to `1.0`): Timeout, in seconds, after which read operations are aborted if no data was received, indefinite if `null`.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `streamid` (of type `string?`, which defaults to `null`): Set `streamid`. This value can be retrieved by the listener side when connecting to it. Used in caller mode only.
- `write_timeout` (of type `float?`, which defaults to `1.0`): Timeout, in seconds, after which write operations are aborted if no data was received, indefinite if `null`.
- `(unlabeled)` (of type `format('a)`): Encoding format.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `connect` (of type `() -> unit`): In sender mode, connect to remote server. In listener mode, setup listening socket.
- `disconnect` (of type `() -> unit`): Disconnect all connected socket.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`)
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `sockets` (of type `() -> [string * srt_socket]`): List of `(connected_address, connected_socket)`
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_connect` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when connected.
- `on_disconnect` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when disconnected.
- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_socket` (of type `(synchronous : bool, ((mode : string, srt_socket) -> unit)) -> unit`): Call a given handler when a new SRT socket is created to set additional options, add monitoring, etc. `mode` should be one of: `"connect"` (socket created before connecting to a remote address), `"listen"` (socket created before binding for receiving new incoming connections), `"incoming"` (socket received as incoming connection) or `"close"` (socket is about to closed).
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.stereotool` {#output.stereotool}

Output an audio source using stereotool

Type:

```
(?id : string?, library_file : string, ?license_key : string?,
 ?preset : string?, ?load_type : string, ?fallible : bool,
 ?register_telnet : bool, ?start : bool, source(audio=pcm('a), 'b)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `"output.stereotool"`): Force the value of the track ID.
- `library_file` (of type `string`): Path to the shared library file.
- `license_key` (of type `string?`, which defaults to `null`)
- `preset` (of type `string?`, which defaults to `null`): Path to a preset file to load when initializing the operator.
- `load_type` (of type `string`, which defaults to `"totalinit"`): Load type for preset. One of: "totalinit", "all_settings", "audiofm", "audio", "processing", "repair", "repair_no_pnr" or "sublevel_pnr".
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `api_version` (of type `() -> int`): API version.
- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `latency` (of type `() -> float`): Get the operator's latency.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): 
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `software_version` (of type `() -> int`): Software version.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.
- `unlincensed_used_features` (of type `() -> string?`): Check if the license is valid for the current settings.
- `valid_license` (of type `() -> bool`): Check if the license is valid for the current settings.

Callbacks:

- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.url` {#output.url}

Encode and let encoder handle data output. Useful with encoder with no expected output or to encode to files that need full control from the encoder, e.g. `%ffmpeg` with `rtmp` output.

Type:

```
(?id : string?, ?export_cover_metadata : bool, ?fallible : bool,
 ?register_telnet : bool, ?restart_delay : float?, ?self_sync : bool,
 ?start : bool, url : string, format('a), source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `export_cover_metadata` (of type `bool`, which defaults to `true`): Export cover metadata.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `restart_delay` (of type `float?`, which defaults to `2.0`): If not `null`, restart output on errors after the given delay.
- `self_sync` (of type `bool`, which defaults to `false`): Should the source control its own synchronization? Set to `true` for output to e.g. `rtmp` output using `%ffmpeg` and etc.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `url` (of type `string`): Url to output to.
- `(unlabeled)` (of type `format('a)`): Encoding format.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`)
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_error` (of type `(synchronous : bool, ((error) -> unit)) -> unit`): Call a given handler when an error occurs.
- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.video` {#output.video}

Output a video stream using the default operator. The input source does not need to be infallible, blank will just be played during failures.

Type:

```
(?id : string?, ?fallible : bool, ?start : bool, source(video=canvas('a),
 'b)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `true`): Allow the child source to fail, in which case the output will be (temporarily) stopped.
- `start` (of type `bool`, which defaults to `true`): Automatically start outputting whenever possible. If `true`, an infallible (normal) output will start outputting as soon as it is created, and a fallible output will (re)start as soon as its source becomes available for streaming.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`): Source to play.

### `output.youtube.live.hls` {#output.youtube.live.hls}

Stream to youtube using HLS.

Type:

```
(?id : string?, ?fallible : bool, ?segment_duration : float, ?segments : int,
 ?segments_overhead : int, ?start : bool, ?url : string, key : string,
 encoder : format('a)
 .{
   bandwidth? : int,
   codecs? : string,
   extname? : string,
   extra_tags? : [string],
   id3? : bool,
   id3_version? : int,
   replay_id3? : bool,
   video_size? : int * int
 }, source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be (temporarily) stopped.
- `segment_duration` (of type `float`, which defaults to `2.0`): Segment duration (in seconds).
- `segments` (of type `int`, which defaults to `4`): Number of segments per playlist.
- `segments_overhead` (of type `int`, which defaults to `4`): Number of segments to keep after they have been featured in the live playlist.
- `start` (of type `bool`, which defaults to `true`): Automatically start outputting whenever possible. If true, an infallible (normal) output will start outputting as soon as it is created, and a fallible output will (re)start as soon as its source becomes available for streaming.
- `url` (of type `string`, which defaults to `"https://a.upload.youtube.com/http_upload_hls"`): HLS URL to stream to
- `key` (of type `string`): Your secret youtube key
- `encoder` (of type `format('a)
.{
  bandwidth? : int,
  codecs? : string,
  extname? : string,
  extra_tags? : [string],
  id3? : bool,
  id3_version? : int,
  replay_id3? : bool,
  video_size? : int * int
}`): Encoder to use (most likely a `%ffmpeg` encoder)
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `insert_tag` (of type `(string) -> unit`): Insert the same tag into all the streams
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): 
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `streams` (of type `() ->
[
 {
   bandwidth : int,
   codecs : string,
   discontinuity_count : int,
   encoder : format('A),
   extname : string,
   extra_tags : [string],
   id3_enabled : bool,
   insert_tag : (string) -> unit,
   name : string,
   replay_id3 : bool,
   video_size : 
   {height : int, width : int
   }?
 }]`): Output streams
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_file_change` (of type `(synchronous : bool, (({path : string, state : string}) -> unit)) -> unit`): Call a given handler when a file changes. `state` is one of: `"created"`, `"updated"` or `"deleted"`, `path` is the full file path. Typical use: sync file with a CDN
- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready

### `output.youtube.live.rtmp` {#output.youtube.live.rtmp}

Stream to youtube using RTMP.

Type:

```
(?id : string?, ?fallible : bool, ?start : bool, ?url : string, key : string,
 encoder : format('a), source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be (temporarily) stopped.
- `start` (of type `bool`, which defaults to `true`): Automatically start outputting whenever possible. If true, an infallible (normal) output will start outputting as soon as it is created, and a fallible output will (re)start as soon as its source becomes available for streaming.
- `url` (of type `string`, which defaults to `"rtmp://a.rtmp.youtube.com/live2"`): RTMP URL to stream to
- `key` (of type `string`): Your secret youtube key
- `encoder` (of type `format('a)`): Encoder to use (most likely a `%ffmpeg` encoder)
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `generate_frame` (of type `() -> unit`): Generate a frame from the source without consuming it. This can be useful in advanced cases where generating a frame is required to trigger some side effect like calculating some metadata before making a decision. You should make sure that the source is available before calling this function and it should only be called inside synchronous streaming loop callback such as `on_frame`!
- `id` (of type `() -> string`): Identifier of the source.
- `insert_metadata` (of type `(?new_track : bool, [string * string]) -> unit`): Dynamically insert metadata in a stream. Inserts a new track with the given metadata if `new_track` is `true`.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `register_command` (of type `(?usage : string?, description : string, string, ((string) -> string)) ->
unit`): Register a server command for this source. Command is registered under the source's id namespace when it gets up and de-registered when it gets down.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reset_last_metadata_on_track` (of type `(() -> bool).{set : (bool) -> unit}`): If `true`, the source's `last_metadata` is reset on each new track. If a metadata is present along with the track mark, then it becomes the new `last_metadata`, otherwise, `last_metadata becomes `null`.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `self_sync_description` (of type `() -> string`): 
- `shutdown` (of type `() -> unit`): Shutdown the output.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

Callbacks:

- `on_error` (of type `(synchronous : bool, ((error) -> unit)) -> unit`): Call a given handler when an error occurs.
- `on_frame` (of type `(?before : bool, synchronous : bool, (() -> unit)) -> unit`): Call a given handler on frame. When `before` is `true`, callback is executed before computing the frame and after otherwise
- `on_frame_checksum` (of type `(?before : ((string?) -> unit)?, synchronous : bool,
 ((cache : string?, string) -> unit)) -> unit`): Call a given handler Register callbacks to compute frame checksums for debugging purposes. This is useful to track frame content changes through the streaming pipeline. The `before` callback is called before computing the frame with the checksum of the cached frame (if any, `null` otherwise). The main callback is called after computing the frame with the checksum of the generated frame and the remaining cache (if any).
- `on_metadata` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler to execute on each metadata
- `on_position` (of type `(position : {float}, ?remaining : bool, ?allow_partial : bool,
 synchronous : bool, ((float, [string * string]) -> unit)) -> unit`): Call a given handler on track position. If `remaining` is `false`, callback is executed when position in track is more or equal to `position`. If `remaining` is `true`, callback is executed when remaining time in the current track is less or equal to `position`. Keep in mind that elapsed time is exact while remaining time is always estimated. Remaining time is usually more accurate for file-based sources. When `allow_partial` is `true`, if the current track ends before the `offset` position is reached, callback is still executed
- `on_shutdown` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called when source shuts down
- `on_start` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output starts
- `on_stop` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler when output stops
- `on_track` (of type `(synchronous : bool, (([string * string]) -> unit)) -> unit`): Call a given handler on track marks
- `on_wake_up` (of type `(synchronous : bool, (() -> unit)) -> unit`): Call a given handler to be called after the source is asked to get ready
