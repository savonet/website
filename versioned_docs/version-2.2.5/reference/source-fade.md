---
title: "Source / Fade"
description: "Cross operator, allowing the composition of the n last seconds of a track with the beginning of the next track, using a transition function depending…"
---
### `cross` {#cross}

Cross operator, allowing the composition of the _n_ last seconds of a track with the beginning of the next track, using a transition function depending on the relative power of the signal before and after the end of track.

Type:

```
(?id : string?, ?assume_autocue : bool?, ?conservative : bool,
 ?duration : {float}, ?minimum : float, ?override_duration : string,
 ?persist_override : bool, ?width : float,
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
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `assume_autocue` (of type `bool?`, which defaults to `null`): Assume that a track has autocue enabled when all four cue in/out and fade in/out override metadata are present. Defaults to `settings.crossfade.assume_autocue` when `null`.
- `conservative` (of type `bool`, which defaults to `true`): Do not trust remaining time estimations, always buffering data in advance. This avoids being tricked by skips, either manual or caused by blank.skip().
- `duration` (of type `{float}`, which defaults to `5.`): Duration (in seconds) of buffered data from each track that is used to compute the transition between tracks.
- `minimum` (of type `float`, which defaults to `-1.`): Minimum duration (in sec.) for a cross: If the track ends without any warning (e.g. in case of skip) there may not be enough data for a decent composition. Set to 0. to avoid having transitions after skips, or more to avoid transitions on short tracks. With a negative default, transitions always occur.
- `override_duration` (of type `string`, which defaults to `"liq_cross_duration"`): Metadata field which, if present and containing a float, overrides the 'duration' parameter for current track.
- `persist_override` (of type `bool`, which defaults to `false`): Keep duration override on track change.
- `width` (of type `float`, which defaults to `2.`): Width of the power computation window.
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
 }) -> source(audio=pcm('a), 'b)`): Transition function, composing from the end of a track and the next track. The sources corresponding to the two tracks are decorated with fields indicating the power of the signal before and after the transition (`power`), and the metadata (`metadata`).
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `cross_duration` (of type `() -> float`): Get the current crossfade duration.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int?).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `on_metadata` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on metadata packets.
- `on_shutdown` (of type `((() -> unit)) -> unit`): Register a function to be called when source shuts down.
- `on_track` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on new tracks.
- `on_wake_up` (of type `((() -> unit)) -> unit`): Register a function to be called after the source is asked to get ready. This is when, for instance, the source's final ID is set.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `cross.simple` {#cross.simple}

Simple transition for crossfade

Type:

```
(?fade_in : float, ?fade_out : float,
 ?initial_fade_in_metadata : [string * string],
 ?initial_fade_out_metadata : [string * string], source(audio=pcm('a), 'b),
 source(audio=pcm('a), 'b)) -> source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks
```

Arguments:

- `fade_in` (of type `float`, which defaults to `3.`): Fade-in duration, if any.
- `fade_out` (of type `float`, which defaults to `3.`): Fade-out duration, if any.
- `initial_fade_in_metadata` (of type `[string * string]`, which defaults to `[]`): Initial fade-in metadata
- `initial_fade_out_metadata` (of type `[string * string]`, which defaults to `[]`): Initial fade-out metadata
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks`): Ending track
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks`): Starting track

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int?).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `on_metadata` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on metadata packets.
- `on_shutdown` (of type `((() -> unit)) -> unit`): Register a function to be called when source shuts down.
- `on_track` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on new tracks.
- `on_wake_up` (of type `((() -> unit)) -> unit`): Register a function to be called after the source is asked to get ready. This is when, for instance, the source's final ID is set.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `cross.smart` {#cross.smart}

Smart transition for crossfade

Type:

```
(?log : ((string) -> unit), ?fade_in : float, ?fade_out : float,
 ?default : ((source(audio=pcm('a), 'b), source(audio=pcm('a), 'b)) ->
             source(audio=pcm('a), 'b)),
 ?high : float, ?medium : float, ?margin : float, 'c
 .{
   db_level : float,
   metadata : [string * string],
   source : source(audio=pcm('a),
   'b)
 }, 'd
 .{
   db_level : float,
   metadata : [string * string],
   source : source(audio=pcm('a),
   'b)
 }) -> source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks
```

Arguments:

- `log` (of type `(string) -> unit`, which defaults to `<fun>`): Default logger
- `fade_in` (of type `float`, which defaults to `3.`): Fade-in duration, if any.
- `fade_out` (of type `float`, which defaults to `3.`): Fade-out duration, if any.
- `default` (of type `(source(audio=pcm('a), 'b), source(audio=pcm('a), 'b)) ->
source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks`, which defaults to `<fun>`): Smart crossfade: transition used when no rule applies (default: sequence).
- `high` (of type `float`, which defaults to `-15.`): Value, in dB, for loud sound level.
- `medium` (of type `float`, which defaults to `-32.`): Value, in dB, for medium sound level.
- `margin` (of type `float`, which defaults to `4.`): Margin to detect sources that have too different sound level for crossing.
- `(unlabeled)` (of type `'c
.{
  db_level : float,
  metadata : [string * string],
  source : source(audio=pcm('a),
  'b)
}
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks`): Ending track
- `(unlabeled)` (of type `'d
.{
  db_level : float,
  metadata : [string * string],
  source : source(audio=pcm('a),
  'b)
}
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks`): Starting track

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int?).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `on_metadata` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on metadata packets.
- `on_shutdown` (of type `((() -> unit)) -> unit`): Register a function to be called when source shuts down.
- `on_track` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on new tracks.
- `on_wake_up` (of type `((() -> unit)) -> unit`): Register a function to be called after the source is asked to get ready. This is when, for instance, the source's final ID is set.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `crossfade` {#crossfade}

Crossfade between tracks, taking the respective volume levels into account in the choice of the transition.

Type:

```
(?id : string?, ?duration : float, ?override_duration : string,
 ?persist_override : bool, ?fade_in : float, ?fade_out : float,
 ?smart : bool,
 ?default : ((source(audio=pcm('a), 'b), source(audio=pcm('a), 'b)) ->
             source(audio=pcm('a), 'b)),
 ?assume_autocue : bool?, ?high : float, ?medium : float, ?margin : float,
 ?deduplicate : bool, ?minimum : float, ?width : float, ?conservative : bool,
 source(audio=pcm('a), 'b)) -> source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `duration` (of type `float`, which defaults to `5.`): Duration (in seconds) of buffered data from each track that is used to compute the transition between tracks.
- `override_duration` (of type `string`, which defaults to `"liq_cross_duration"`): Metadata field which, if present and containing a float, overrides the 'duration' parameter for current track.
- `persist_override` (of type `bool`, which defaults to `false`): Keep duration override on track change.
- `fade_in` (of type `float`, which defaults to `3.`): Fade-in duration, if any.
- `fade_out` (of type `float`, which defaults to `3.`): Fade-out duration, if any.
- `smart` (of type `bool`, which defaults to `false`): Enable smart crossfading
- `default` (of type `(source(audio=pcm('a), 'b), source(audio=pcm('a), 'b)) ->
source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks`, which defaults to `<fun>`): Smart crossfade: transition used when no rule applies (default: sequence).
- `assume_autocue` (of type `bool?`, which defaults to `null`): Assume that a track has autocue enabled when all four cue in/out and fade in/out override metadata are present. Defaults to `settings.crossfade.assume_autocue` when `null`.
- `high` (of type `float`, which defaults to `-15.`): Smart crossfade: value, in dB, for loud sound level.
- `medium` (of type `float`, which defaults to `-32.`): Smart crossfade: value, in dB, for medium sound level.
- `margin` (of type `float`, which defaults to `4.`): Smart crossfade: margin to detect sources that have too different sound level for crossing.
- `deduplicate` (of type `bool`, which defaults to `true`): Crossfade transitions can generate duplicate metadata. When `true`, the operator removes duplicate metadata from the returned source.
- `minimum` (of type `float`, which defaults to `-1.`): Minimum duration (in sec.) for a cross: If the track ends without any warning (e.g. in case of skip) there may not be enough data for a decent composition. Set to 0. to avoid having transitions after skips, or more to avoid transitions on short tracks. With a negative default, transitions always occur.
- `width` (of type `float`, which defaults to `2.`): Width of the volume analysis window.
- `conservative` (of type `bool`, which defaults to `true`): Always prepare for a premature end-of-track.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks`): The input source.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `cross_duration` (of type `() -> float`): 
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int?).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `on_metadata` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on metadata packets.
- `on_shutdown` (of type `((() -> unit)) -> unit`): Register a function to be called when source shuts down.
- `on_track` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on new tracks.
- `on_wake_up` (of type `((() -> unit)) -> unit`): Register a function to be called after the source is asked to get ready. This is when, for instance, the source's final ID is set.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `fade.in` {#fade.in}

Fade the beginning of tracks.

Type:

```
(?id : string, ?duration : float, ?delay : float, ?curve : float?,
 ?override_duration : string, ?override_type : string,
 ?override_curve : string, ?override_delay : string,
 ?persist_overrides : bool, ?track_sensitive : bool,
 ?initial_metadata : [string * string], ?type : string, source(audio=pcm('a),
 'b)) -> source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks
```

Arguments:

- `id` (of type `string`, which defaults to `"fade.in"`): Force the value of the source ID.
- `duration` (of type `float`, which defaults to `3.`): Duration of the fading. This value can be set on a per-file basis using the metadata field passed as override.
- `delay` (of type `float`, which defaults to `0.`): Initial delay before starting fade.
- `curve` (of type `float?`, which defaults to `null`): Fade curve. Default if `null`.
- `override_duration` (of type `string`, which defaults to `"liq_fade_in"`): Metadata field which, if present and containing a float, overrides the 'duration' parameter for the current track.
- `override_type` (of type `string`, which defaults to `"liq_fade_in_type"`): Metadata field which, if present and correct, overrides the 'type' parameter for the current track.
- `override_curve` (of type `string`, which defaults to `"liq_fade_in_curve"`): Metadata field which, if presents and correct, overrides the `curve` parameter for the current track. Use `"default"` to set to default value.
- `override_delay` (of type `string`, which defaults to `"liq_fade_in_delay"`): Metadata field which, if presents and correct, overrides the initial fade delay.
- `persist_overrides` (of type `bool`, which defaults to `false`): Keep duration and type overrides on track change.
- `track_sensitive` (of type `bool`, which defaults to `false`): Be track sensitive (if `false` we only fade in once at the beginning of the track).
- `initial_metadata` (of type `[string * string]`, which defaults to `[]`): Initial metadata.
- `type` (of type `string`, which defaults to `"lin"`): Fader shape (lin|sin|log|exp): linear, sinusoidal, logarithmic or exponential.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fade_delay` (of type `() -> float`): 
- `fade_duration` (of type `() -> float`): 
- `fade_type` (of type `() -> string`): 
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int?).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `on_metadata` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on metadata packets.
- `on_shutdown` (of type `((() -> unit)) -> unit`): Register a function to be called when source shuts down.
- `on_track` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on new tracks.
- `on_wake_up` (of type `((() -> unit)) -> unit`): Register a function to be called after the source is asked to get ready. This is when, for instance, the source's final ID is set.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `fade.out` {#fade.out}

Fade the end of tracks.

Type:

```
(?id : string, ?duration : float, ?delay : float, ?curve : float?,
 ?override_duration : string, ?override_type : string,
 ?override_curve : string, ?override_delay : string,
 ?persist_overrides : bool, ?track_sensitive : bool,
 ?initial_metadata : [string * string], ?type : string, source(audio=pcm('a),
 'b)) -> source(audio=pcm('a), 'b)
where 'b is a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string`, which defaults to `"fade.out"`): Force the value of the source ID.
- `duration` (of type `float`, which defaults to `3.`): Duration of the fading. This value can be set on a per-file basis using the metadata field passed as override.
- `delay` (of type `float`, which defaults to `0.`): Initial delay before starting fade.
- `curve` (of type `float?`, which defaults to `null`): Fade curve. Default if `null`.
- `override_duration` (of type `string`, which defaults to `"liq_fade_out"`): Metadata field which, if present and containing a float, overrides the 'duration' parameter for the current track.
- `override_type` (of type `string`, which defaults to `"liq_fade_out_type"`): Metadata field which, if present and correct, overrides the 'type' parameter for the current track.
- `override_curve` (of type `string`, which defaults to `"liq_fade_out_curve"`): Metadata field which, if presents and correct, overrides the `curve` parameter for the current track. Use `"default"` to set to default value.
- `override_delay` (of type `string`, which defaults to `"liq_fade_out_delay"`): Metadata field which, if presents and correct, overrides the initial fade delay.
- `persist_overrides` (of type `bool`, which defaults to `false`): Keep duration and type overrides on track change.
- `track_sensitive` (of type `bool`, which defaults to `false`): Be track sensitive (if `false` we only fade ou once at the beginning of the track).
- `initial_metadata` (of type `[string * string]`, which defaults to `[]`): Initial metadata.
- `type` (of type `string`, which defaults to `"lin"`): Fader shape (lin|sin|log|exp): linear, sinusoidal, logarithmic or exponential.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)
where 'b is a set of tracks to be muxed into a source`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fade_duration` (of type `() -> float`): 
- `fade_type` (of type `() -> string`): 
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int?).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `on_metadata` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on metadata packets.
- `on_shutdown` (of type `((() -> unit)) -> unit`): Register a function to be called when source shuts down.
- `on_track` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on new tracks.
- `on_wake_up` (of type `((() -> unit)) -> unit`): Register a function to be called after the source is asked to get ready. This is when, for instance, the source's final ID is set.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

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
- `start` (of type `float`, which defaults to `0.`): Start value.
- `stop` (of type `float`, which defaults to `1.`): Stop value.
- `delay` (of type `float`, which defaults to `0.`): Initial delay before starting fade.
- `duration` (of type `float`, which defaults to `3.`): Duration in seconds.
- `on_done` (of type `() -> unit`, which defaults to `{()}`): Function to execute when the fade is finished
- `(unlabeled)` (of type `source('a)`)
