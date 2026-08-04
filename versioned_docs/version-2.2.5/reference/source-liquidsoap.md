---
title: "Source / Liquidsoap"
description: "Create a buffer between two different clocks."
---
### `buffer` {#buffer}

Create a buffer between two different clocks.

Type:

```
(?id : string?, ?buffer : float, ?fallible : bool, ?max : float,
 ?on_start : (() -> unit), ?on_stop : (() -> unit), ?register_telnet : bool,
 ?start : bool, source('a)) -> source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `buffer` (of type `float`, which defaults to `1.`): Amount of data to pre-buffer, in seconds.
- `fallible` (of type `bool`, which defaults to `true`): Allow the child source to fail.
- `max` (of type `float`, which defaults to `10.`): Maximum amount of buffered data, in seconds.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffer_length` (of type `() -> int`): Buffer length, in main ticks
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

### `buffer.adaptative` {#buffer.adaptative}

Create a buffer between two different clocks. The speed of the output is adapted so that no buffer underrun or overrun occurs. This wonderful behavior has a cost: the pitch of the sound might be changed a little.

Type:

```
(?id : string?, ?averaging : float, ?buffer : float, ?fallible : bool,
 ?limit : float, ?max : float, ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?register_telnet : bool, ?resample : bool,
 ?reset : bool, ?start : bool, source(audio=pcm('a), 'b)) ->
source(audio=pcm('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `averaging` (of type `float`, which defaults to `30.`): Length of the buffer averaging, in seconds (the time constant of the smoothing to be precise). The greater this is, the less reactive to local variations we are.
- `buffer` (of type `float`, which defaults to `1.`): Amount of data to prebuffer, in seconds.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `limit` (of type `float`, which defaults to `1.25`): Maximum acceleration or deceleration factor, ie how fast or slow we can be compared to realtime.
- `max` (of type `float`, which defaults to `10.`): Maximum amount of buffered data, in seconds.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `resample` (of type `bool`, which defaults to `true`): Use proper resampling instead of simply duplicating samples.
- `reset` (of type `bool`, which defaults to `false`): Reset speed estimation to 1 when the source becomes available again (resuming from a buffer underflow).
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Current buffer duration, in seconds.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `estimated` (of type `() -> float`): Current smoothed buffer duration, in seconds.
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
- `ratio` (of type `() -> float`): Get the current scaling ratio.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

This function is experimental.

### `source.drop` {#source.drop}

Animate the source as fast as possible, dropping its output.

Type:

```
(source('a), ?ratio : float) -> unit
```

Arguments:

- `(unlabeled)` (of type `source('a)`): Source to animate.
- `ratio` (of type `float`, which defaults to `50.`): Time ratio. A value of `50` means process data at `50x` real rate, when possible.

This function is experimental.

### `source.dump` {#source.dump}

Immediately encode the whole contents of a source into a file.

Type:

```
(format('a), string, source('a), ?ratio : float) -> unit
```

Arguments:

- `(unlabeled)` (of type `format('a)`): Encoding format.
- `(unlabeled)` (of type `string`): Name of the file.
- `(unlabeled)` (of type `source('a)`): Source to encode.
- `ratio` (of type `float`, which defaults to `50.`): Time ratio. A value of `50` means process data at `50x` real rate, when possible.

This function is experimental.

### `source.duration` {#source.duration}

Estimation of the duration in the current track.

Type:

```
(source('a)) -> float
```

Arguments:

- `(unlabeled)` (of type `source('a)`)

### `source.elapsed` {#source.elapsed}

Elapsed time in the current track.

Type:

```
(source('a)) -> float
```

Arguments:

- `(unlabeled)` (of type `source('a)`)

### `source.fallible` {#source.fallible}

Indicate if a source may fail, i.e. may not be ready to stream.

Type:

```
(source('a)) -> bool
```

Arguments:

- `(unlabeled)` (of type `source('a)`)

### `source.id` {#source.id}

Get the identifier of a source.

Type:

```
(source('a)) -> string
```

Arguments:

- `(unlabeled)` (of type `source('a)`)

### `source.init` {#source.init}

Simultaneously initialize sources, return the sublist of sources that failed to initialize.

Type:

```
([source('a)]) -> [source('a)]
```

Arguments:

- `(unlabeled)` (of type `[source('a)]`)

This function is experimental.

### `source.is_ready` {#source.is_ready}

Indicate if a source is ready to stream (we also say that it is available), or currently streaming.

Type:

```
(source('a)) -> bool
```

Arguments:

- `(unlabeled)` (of type `source('a)`)

### `source.on_shutdown` {#source.on_shutdown}

Register a function to be called when source is not used anymore by another source.

Type:

```
(source('a), (() -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `source('a)`)
- `(unlabeled)` (of type `() -> unit`)

### `source.remaining` {#source.remaining}

Estimation of remaining time in the current track.

Type:

```
(source('a)) -> float
```

Arguments:

- `(unlabeled)` (of type `source('a)`)

### `source.seek` {#source.seek}

Seek forward, in seconds. Returns the amount of time effectively seeked.

Type:

```
(source('a), float) -> float
```

Arguments:

- `(unlabeled)` (of type `source('a)`)
- `(unlabeled)` (of type `float`)

### `source.set_name` {#source.set_name}

Set the name of an operator.

Type:

```
(source('a), string) -> unit
```

Arguments:

- `(unlabeled)` (of type `source('a)`)
- `(unlabeled)` (of type `string`)

### `source.skip` {#source.skip}

Skip to the next track.

Type:

```
(source('a)) -> unit
```

Arguments:

- `(unlabeled)` (of type `source('a)`)

### `source.time` {#source.time}

Get a source's time, based on its assigned clock

Type:

```
(source('a)) -> float
```

Arguments:

- `(unlabeled)` (of type `source('a)`)
