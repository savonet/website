---
title: "Source / Fade"
description: "Cross operator, allowing the composition of the n last seconds of a track with the beginning of the next track, using a transition function depending…"
---
### `cross` {#cross}

Cross operator, allowing the composition of the _n_ last seconds of a track with the beginning of the next track, using a transition function depending on the relative power of the signal before and after the end of track.

Type:

```
(?id : string?, ?assume_autocue : bool?, ?duration : {float},
 ?end_duration : {float}?, ?override_duration : string,
 ?override_end_duration : string, ?override_max_start_duration : string,
 ?override_start_duration : string, ?persist_override : bool,
 ?start_duration : {float}?, ?width : float, ?deduplicate : bool,
 ((
   {
     db_level : float,
     metadata : [string * string],
     source : source(audio=pcm('a),
     'b)
   }, 
   {
     db_level : float,
     metadata : [string * string],
     source : source(audio=pcm('a),
     'b)
   }) -> source(audio=pcm('a), 'b)),
 source(audio=pcm('a), 'b)) -> source(audio=pcm('a), 'b)
where 'b is a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `assume_autocue` (of type `bool?`, which defaults to `null`): Assume that a track has autocue enabled when all four cue in/out and fade in/out override metadata are present. Defaults to `settings.crossfade.assume_autocue` when `null`.
- `duration` (of type `{float}`, which defaults to `5.0`): Duration (in seconds) of buffered data from the end and start of each track that is used to compute the transition between tracks.
- `end_duration` (of type `{float}?`, which defaults to `null`): Duration (in seconds) of buffered data from the end of each track that is used to compute the transition between tracks.
- `override_duration` (of type `string`, which defaults to `"liq_cross_duration"`): Metadata field which, if present and containing a float, overrides the 'duration' parameter for current track.
- `override_end_duration` (of type `string`, which defaults to `"liq_cross_end_duration"`): Metadata field which, if present and containing a float, overrides the 'end_duration' parameter for current track.
- `override_max_start_duration` (of type `string`, which defaults to `"liq_cross_max_start_duration"`): Metadata field which, if present and containing a float, informs the crossfade of the maximum start duration. When not present, it is assumed to be `0.`.
- `override_start_duration` (of type `string`, which defaults to `"liq_cross_start_duration"`): Metadata field which, if present and containing a float, overrides the 'start_duration' parameter for current track.
- `persist_override` (of type `bool`, which defaults to `false`): Keep duration override on track change.
- `start_duration` (of type `{float}?`, which defaults to `null`): Duration (in seconds) of buffered data from the start of each track that is used to compute the transition between tracks.
- `width` (of type `float`, which defaults to `2.0`): Width of the power computation window.
- `deduplicate` (of type `bool`, which defaults to `true`): Crossfade transitions can generate duplicate metadata. When `true`, the operator removes duplicate metadata from the returned source.
- `(unlabeled)` (of type `(
 {
   db_level : float,
   metadata : [string * string],
   source : source(audio=pcm('a),
   'b)
 }, 
 {
   db_level : float,
   metadata : [string * string],
   source : source(audio=pcm('a),
   'b)
 }) -> source(audio=pcm('a), 'b)
where 'b is a set of tracks to be muxed into a source`): Transition function, composing from the end of a track and the next track. The sources corresponding to the two tracks are decorated with fields indicating the power of the signal before and after the transition (`power`), and the metadata (`metadata`).
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)
where 'b is a set of tracks to be muxed into a source`)

Methods:

- `buffered` (of type `() -> [string * float]`): 
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): 
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `end_duration` (of type `() -> float`): 
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
- `start_duration` (of type `() -> float`): 
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

### `cross.simple` {#cross.simple}

Simple transition for crossfade

Type:

```
(?log : ((string) -> unit), ?fade_in : float, ?fade_out : float,
 ?initial_fade_in_metadata : [string * string],
 ?initial_fade_out_metadata : [string * string],
 ?ending_map : ((source(audio='a, 'b)) -> source(audio='a, 'b)),
 ?starting_map : ((source(audio='a, 'b)) -> source(audio='a, 'b)),
 source(audio='a, 'b), source(audio='a, 'b)) -> source(audio='a, 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks and an orderable type,
  'a is a track of type: pcm, pcm_s16 or pcm_f32 and a track and a track of type: pcm, pcm_s16, pcm_f32, canvas, metadata or track_marks
```

Arguments:

- `log` (of type `(string) -> unit`, which defaults to `<fun>`): Logging utility
- `fade_in` (of type `float`, which defaults to `3.0`): Fade-in duration, if any.
- `fade_out` (of type `float`, which defaults to `3.0`): Fade-out duration, if any.
- `initial_fade_in_metadata` (of type `[string * string]`, which defaults to `[]`): Initial fade-in metadata
- `initial_fade_out_metadata` (of type `[string * string]`, which defaults to `[]`): Initial fade-out metadata
- `ending_map` (of type `(source(audio='a, 'b)) -> source(audio='a, 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks and an orderable type,
  'a is a track of type: pcm, pcm_s16 or pcm_f32 and a track and a track of type: pcm, pcm_s16, pcm_f32, canvas, metadata or track_marks`, which defaults to `<fun>`): Optional mapping for the ending track
- `starting_map` (of type `(source(audio='a, 'b)) -> source(audio='a, 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks and an orderable type,
  'a is a track of type: pcm, pcm_s16 or pcm_f32 and a track and a track of type: pcm, pcm_s16, pcm_f32, canvas, metadata or track_marks`, which defaults to `<fun>`): Optional mapping for the starting track
- `(unlabeled)` (of type `source(audio='a, 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks and an orderable type,
  'a is a track of type: pcm, pcm_s16 or pcm_f32 and a track and a track of type: pcm, pcm_s16, pcm_f32, canvas, metadata or track_marks`): Ending track
- `(unlabeled)` (of type `source(audio='a, 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks and an orderable type,
  'a is a track of type: pcm, pcm_s16 or pcm_f32 and a track and a track of type: pcm, pcm_s16, pcm_f32, canvas, metadata or track_marks`): Starting track

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

### `crossfade` {#crossfade}

Crossfade between tracks, taking the respective volume levels into account in the choice of the transition.

Type:

```
(?id : string?, ?start_duration : {float}?, ?end_duration : {float}?,
 ?duration : {float}, ?override_start_duration : string,
 ?override_end_duration : string, ?override_duration : string,
 ?persist_override : bool, ?width : float, ?fade_in : float,
 ?fade_out : float, ?deduplicate : bool, source(audio=pcm('a), 'b)) ->
source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks and an orderable type
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `start_duration` (of type `{float}?`, which defaults to `null`): Duration (in seconds) of buffered data from the start of each track that is used to compute the transition between tracks.
- `end_duration` (of type `{float}?`, which defaults to `null`): Duration (in seconds) of buffered data from the end of each track that is used to compute the transition between tracks.
- `duration` (of type `{float}`, which defaults to `5.0`): Duration (in seconds) of buffered data from the end and start of each track that is used to compute the transition between tracks.
- `override_start_duration` (of type `string`, which defaults to `"liq_cross_start_duration"`): Metadata field which, if present and containing a float, overrides the 'start_duration' parameter for current track.
- `override_end_duration` (of type `string`, which defaults to `"liq_cross_end_duration"`): Metadata field which, if present and containing a float, overrides the 'end_duration' parameter for current track.
- `override_duration` (of type `string`, which defaults to `"liq_cross_duration"`): Metadata field which, if present and containing a float, overrides the 'duration' parameter for current track.
- `persist_override` (of type `bool`, which defaults to `false`): Keep duration override on track change.
- `width` (of type `float`, which defaults to `2.0`): Width of the power computation window.
- `fade_in` (of type `float`, which defaults to `3.0`)
- `fade_out` (of type `float`, which defaults to `3.0`)
- `deduplicate` (of type `bool`, which defaults to `true`): Crossfade transitions can generate duplicate metadata. When `true`, the operator removes duplicate metadata from the returned source.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks and an orderable type`): The input source.

Methods:

- `buffered` (of type `() -> [string * float]`): 
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): 
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `end_duration` (of type `() -> float`): 
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
- `start_duration` (of type `() -> float`): 
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

### `fade.in` {#fade.in}

Fade the beginning of tracks.

Type:

```
(?id : string, ?duration : float?, ?delay : float, ?curve : float?,
 ?override_duration : string, ?override_type : string,
 ?override_curve : string, ?override_delay : string,
 ?persist_overrides : bool, ?track_sensitive : bool,
 ?initial_metadata : [string * string], ?type : string?, source(audio='a,
 'b)) -> source(audio='a, 'b)
where
  'a is a track of type: pcm, pcm_s16, pcm_f32, canvas, metadata or track_marks and a track and a track of type: pcm, pcm_s16 or pcm_f32,
  'b is an orderable type and a set of internal tracks and a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string`, which defaults to `"fade.in"`): Force the value of the source ID.
- `duration` (of type `float?`, which defaults to `null`): Duration of the fading. This value can be set on a per-file basis using the metadata field passed as override. Defaults to `settings.fade.in.duration` if `null`.
- `delay` (of type `float`, which defaults to `0.0`): Initial delay before starting fade.
- `curve` (of type `float?`, which defaults to `null`): Fade curve. Defaults to `settings.fade.in.curve` if `null`.
- `override_duration` (of type `string`, which defaults to `"liq_fade_in"`): Metadata field which, if present and containing a float, overrides the 'duration' parameter for the current track.
- `override_type` (of type `string`, which defaults to `"liq_fade_in_type"`): Metadata field which, if present and correct, overrides the 'type' parameter for the current track.
- `override_curve` (of type `string`, which defaults to `"liq_fade_in_curve"`): Metadata field which, if presents and correct, overrides the `curve` parameter for the current track. Use `"default"` to set to default value.
- `override_delay` (of type `string`, which defaults to `"liq_fade_in_delay"`): Metadata field which, if presents and correct, overrides the initial fade delay.
- `persist_overrides` (of type `bool`, which defaults to `false`): Keep duration and type overrides on track change.
- `track_sensitive` (of type `bool`, which defaults to `false`): Be track sensitive (if `false` we only fade in once at the beginning of the track).
- `initial_metadata` (of type `[string * string]`, which defaults to `[]`): Initial metadata.
- `type` (of type `string?`, which defaults to `null`): Fader shape. One of: "lin"", "sin", "log" or "exp". Defaults to `settings.fade.in.type` if `null`.
- `(unlabeled)` (of type `source(audio='a, 'b)
where
  'a is a track of type: pcm, pcm_s16, pcm_f32, canvas, metadata or track_marks and a track and a track of type: pcm, pcm_s16 or pcm_f32,
  'b is an orderable type and a set of internal tracks and a set of tracks to be muxed into a source`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fade_delay` (of type `() -> float`): 
- `fade_duration` (of type `() -> float`): 
- `fade_type` (of type `() -> string`): 
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

### `fade.out` {#fade.out}

Fade the end of tracks.

Type:

```
(?id : string, ?duration : float?, ?delay : float, ?curve : float?,
 ?override_duration : string, ?override_type : string,
 ?override_curve : string, ?override_delay : string,
 ?persist_overrides : bool, ?track_sensitive : bool,
 ?initial_metadata : [string * string], ?type : string?, source(audio='a,
 'b)) -> source(audio='a, 'b)
where 'a is a track and a track of type: pcm, pcm_s16 or pcm_f32,
  'b is an orderable type and a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string`, which defaults to `"fade.out"`): Force the value of the source ID.
- `duration` (of type `float?`, which defaults to `null`): Duration of the fading. This value can be set on a per-file basis using the metadata field passed as override. Defaults to `settings.fade.out.curve` if `null`.
- `delay` (of type `float`, which defaults to `0.0`): Initial delay before starting fade. Defaults to `settings.fade.out.delay` if `null`.
- `curve` (of type `float?`, which defaults to `null`): Fade curve. Defaults to `settings.fade.out.curve` if `null`.
- `override_duration` (of type `string`, which defaults to `"liq_fade_out"`): Metadata field which, if present and containing a float, overrides the 'duration' parameter for the current track.
- `override_type` (of type `string`, which defaults to `"liq_fade_out_type"`): Metadata field which, if present and correct, overrides the 'type' parameter for the current track.
- `override_curve` (of type `string`, which defaults to `"liq_fade_out_curve"`): Metadata field which, if presents and correct, overrides the `curve` parameter for the current track. Use `"default"` to set to default value.
- `override_delay` (of type `string`, which defaults to `"liq_fade_out_delay"`): Metadata field which, if presents and correct, overrides the initial fade delay.
- `persist_overrides` (of type `bool`, which defaults to `false`): Keep duration and type overrides on track change.
- `track_sensitive` (of type `bool`, which defaults to `false`): Be track sensitive (if `false` we only fade ou once at the beginning of the track).
- `initial_metadata` (of type `[string * string]`, which defaults to `[]`): Initial metadata.
- `type` (of type `string?`, which defaults to `null`): Fader shape. One of: "lin"", "sin", "log" or "exp". Defaults to `settings.fade.out.type` if `null`.
- `(unlabeled)` (of type `source(audio='a, 'b)
where 'a is a track and a track of type: pcm, pcm_s16 or pcm_f32,
  'b is an orderable type and a set of tracks to be muxed into a source`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fade_duration` (of type `() -> float`): 
- `fade_type` (of type `() -> string`): 
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

### `mkfade` {#mkfade}

Make a fade function based on a source's clock.

Type:

```
(?curve : float?, ?type : string, ?start : float, ?stop : float,
 ?delay : float, ?duration : float, ?on_done : (() -> unit), source('a)) ->
() -> float
```

Arguments:

- `curve` (of type `float?`, which defaults to `null`): Fade curve for `"log"` and `"exp"` shapes. If `null`, depends on the type of fade. The higher the value, the shaper the curve.
- `type` (of type `string`, which defaults to `"lin"`): Fade shape. One of: `"sin"`, `"exp"`, `"log"`, `"lin"`
- `start` (of type `float`, which defaults to `0.0`): Start value.
- `stop` (of type `float`, which defaults to `1.0`): Stop value.
- `delay` (of type `float`, which defaults to `0.0`): Initial delay before starting fade.
- `duration` (of type `float`, which defaults to `3.0`): Duration in seconds.
- `on_done` (of type `() -> unit`, which defaults to `{()}`): Function to execute when the fade is finished
- `(unlabeled)` (of type `source('a)`)
