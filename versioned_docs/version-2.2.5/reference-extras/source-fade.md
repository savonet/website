---
title: "Source / Fade"
description: "Fade when the metadata trigger is received and then skip."
---
### `fade.skip` {#fade.skip}

Fade when the metadata trigger is received and then skip.

Type:

```
(?id : string, ?duration : float, ?curve : float?,
 ?override_duration : string, ?override_type : string,
 ?override_curve : string, ?persist_overrides : bool,
 ?override_skip : string, ?initial_metadata : [string * string],
 ?type : string, source(audio=pcm('a), 'b)) -> source(audio=pcm('a), 'b)
where 'b is a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string`, which defaults to `"fade.skip"`): Force the value of the source ID.
- `duration` (of type `float`, which defaults to `5.`): Duration of the fading. This value can be set on a per-file basis using the metadata field passed as override.
- `curve` (of type `float?`, which defaults to `null`): Fade curve. Default if `null`.
- `override_duration` (of type `string`, which defaults to `"liq_fade_skip"`): Metadata field which, if present and containing a float, overrides the 'duration' parameter for the current track.
- `override_type` (of type `string`, which defaults to `"liq_fade_skip_type"`): Metadata field which, if present and correct, overrides the 'type' parameter for the current track.
- `override_curve` (of type `string`, which defaults to `"liq_fade_skip_curve"`): Metadata field which, if presents and correct, overrides the `curve` parameter for the current track. Use `"default"` to set to default value.
- `persist_overrides` (of type `bool`, which defaults to `false`): Keep duration and type overrides on track change.
- `override_skip` (of type `string`, which defaults to `"liq_skip_meta"`): Metadata field which, when present and set to "true", will trigger the fade
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

### `smooth_add` {#smooth_add}

Mixes two streams, with faded transitions between the state when only the normal stream is available and when the special stream gets added on top of it.

Type:

```
(?duration : float, ?p : {float}, normal : source(audio=pcm('a), 'b),
 special : source(audio=pcm('a), 'b)) -> source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks
```

Arguments:

- `duration` (of type `float`, which defaults to `1.`): Duration of the fade in seconds.
- `p` (of type `{float}`, which defaults to `0.2`): Portion of amplitude of the normal source in the mix.
- `normal` (of type `source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks`): The normal source, which could be called the carrier too.
- `special` (of type `source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks`): The special source.

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
