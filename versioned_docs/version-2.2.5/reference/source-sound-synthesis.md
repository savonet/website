---
title: "Source / Sound synthesis"
description: "Register a DSSI plugin."
---
### `dssi.register` {#dssi.register}

Register a DSSI plugin.

Type:

```
(string) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): Path of the DSSI plugin file.

### `synth.all.saw` {#synth.all.saw}

Saw synthesizer. It creates one synthesizer for each channel.

Type:

```
(?id : string?, ?attack : float, ?decay : float, ?envelope : bool,
 ?release : float, ?sustain : float, source(midi=midi(channels=16), 'a)) ->
source(midi=midi(channels=16), 'a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `attack` (of type `float`, which defaults to `0.02`): Envelope attack (in seconds).
- `decay` (of type `float`, which defaults to `0.01`): Envelope decay (in seconds).
- `envelope` (of type `bool`, which defaults to `true`): Use envelope.
- `release` (of type `float`, which defaults to `0.01`): Envelope release (in seconds).
- `sustain` (of type `float`, which defaults to `0.9`): Envelope sustain level.
- `(unlabeled)` (of type `source(midi=midi(channels=16), 'a)`)

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

### `synth.all.sine` {#synth.all.sine}

Sine synthesizer. It creates one synthesizer for each channel.

Type:

```
(?id : string?, ?attack : float, ?decay : float, ?envelope : bool,
 ?release : float, ?sustain : float, source(midi=midi(channels=16), 'a)) ->
source(midi=midi(channels=16), 'a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `attack` (of type `float`, which defaults to `0.02`): Envelope attack (in seconds).
- `decay` (of type `float`, which defaults to `0.01`): Envelope decay (in seconds).
- `envelope` (of type `bool`, which defaults to `true`): Use envelope.
- `release` (of type `float`, which defaults to `0.01`): Envelope release (in seconds).
- `sustain` (of type `float`, which defaults to `0.9`): Envelope sustain level.
- `(unlabeled)` (of type `source(midi=midi(channels=16), 'a)`)

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

### `synth.all.square` {#synth.all.square}

Square synthesizer. It creates one synthesizer for each channel.

Type:

```
(?id : string?, ?attack : float, ?decay : float, ?envelope : bool,
 ?release : float, ?sustain : float, source(midi=midi(channels=16), 'a)) ->
source(midi=midi(channels=16), 'a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `attack` (of type `float`, which defaults to `0.02`): Envelope attack (in seconds).
- `decay` (of type `float`, which defaults to `0.01`): Envelope decay (in seconds).
- `envelope` (of type `bool`, which defaults to `true`): Use envelope.
- `release` (of type `float`, which defaults to `0.01`): Envelope release (in seconds).
- `sustain` (of type `float`, which defaults to `0.9`): Envelope sustain level.
- `(unlabeled)` (of type `source(midi=midi(channels=16), 'a)`)

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

### `synth.saw` {#synth.saw}

Saw synthesizer.

Type:

```
(?id : string?, ?attack : float, ?channel : int, ?decay : float,
 ?envelope : bool, ?release : float, ?sustain : float, ?volume : float,
 source(midi=midi(channels=1), 'a)) -> source(midi=midi(channels=1), 'a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `attack` (of type `float`, which defaults to `0.02`): Envelope attack (in seconds).
- `channel` (of type `int`, which defaults to `0`): MIDI channel to handle.
- `decay` (of type `float`, which defaults to `0.01`): Envelope decay (in seconds).
- `envelope` (of type `bool`, which defaults to `true`): Use envelope.
- `release` (of type `float`, which defaults to `0.05`): Envelope release (in seconds).
- `sustain` (of type `float`, which defaults to `0.9`): Envelope sustain level.
- `volume` (of type `float`, which defaults to `0.3`): Initial volume.
- `(unlabeled)` (of type `source(midi=midi(channels=1), 'a)`)

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

### `synth.sine` {#synth.sine}

Sine synthesizer.

Type:

```
(?id : string?, ?attack : float, ?channel : int, ?decay : float,
 ?envelope : bool, ?release : float, ?sustain : float, ?volume : float,
 source(midi=midi(channels=1), 'a)) -> source(midi=midi(channels=1), 'a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `attack` (of type `float`, which defaults to `0.02`): Envelope attack (in seconds).
- `channel` (of type `int`, which defaults to `0`): MIDI channel to handle.
- `decay` (of type `float`, which defaults to `0.01`): Envelope decay (in seconds).
- `envelope` (of type `bool`, which defaults to `true`): Use envelope.
- `release` (of type `float`, which defaults to `0.05`): Envelope release (in seconds).
- `sustain` (of type `float`, which defaults to `0.9`): Envelope sustain level.
- `volume` (of type `float`, which defaults to `0.3`): Initial volume.
- `(unlabeled)` (of type `source(midi=midi(channels=1), 'a)`)

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

### `synth.square` {#synth.square}

Square synthesizer.

Type:

```
(?id : string?, ?attack : float, ?channel : int, ?decay : float,
 ?envelope : bool, ?release : float, ?sustain : float, ?volume : float,
 source(midi=midi(channels=1), 'a)) -> source(midi=midi(channels=1), 'a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `attack` (of type `float`, which defaults to `0.02`): Envelope attack (in seconds).
- `channel` (of type `int`, which defaults to `0`): MIDI channel to handle.
- `decay` (of type `float`, which defaults to `0.01`): Envelope decay (in seconds).
- `envelope` (of type `bool`, which defaults to `true`): Use envelope.
- `release` (of type `float`, which defaults to `0.05`): Envelope release (in seconds).
- `sustain` (of type `float`, which defaults to `0.9`): Envelope sustain level.
- `volume` (of type `float`, which defaults to `0.3`): Initial volume.
- `(unlabeled)` (of type `source(midi=midi(channels=1), 'a)`)

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
