---
title: "Interaction"
description: "Add a skip telnet command to a source when it does not have one by default."
---
### `add_skip_command` {#add_skip_command}

Add a skip telnet command to a source when it does not have one by default.

Type:

```
(source('b).{skip : () -> 'a}) -> unit
```

Arguments:

- `(unlabeled)` (of type `source('b).{skip : () -> 'a}`): The source to attach the command to.

### `audioscrobbler.submit.full` {#audioscrobbler.submit.full}

Submit songs using audioscrobbler, respecting the full protocol: First signal song as now playing when starting, and then submit song when it ends.

Type:

```
(user : string, password : string, ?host : string, ?port : int,
 ?source : string, ?length : bool, ?delay : float, ?force : bool, source('A)) ->
source('A)
```

Arguments:

- `user` (of type `string`)
- `password` (of type `string`)
- `host` (of type `string`, which defaults to `"post.audioscrobbler.com"`)
- `port` (of type `int`, which defaults to `80`)
- `source` (of type `string`, which defaults to `"broadcast"`): Source for tracks. Should be one of: "broadcast", "user", "recommendation" or "unknown". Since liquidsoap is intended for radio broadcasting, this is the default. Sources other than user don't need duration to be set.
- `length` (of type `bool`, which defaults to `false`): Try to submit length information. This operation can be CPU intensive. Value forced to true when used with the "user" source type.
- `delay` (of type `float`, which defaults to `10.`): Submit song when there is only this delay left, in seconds.
- `force` (of type `bool`, which defaults to `false`): If remaining time is null, the song will be assumed to be skipped or cut, and not submitted. Set to zero to disable this behaviour.
- `(unlabeled)` (of type `source('A)`)

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

### `compress.multiband.interactive` {#compress.multiband.interactive}

Create a multiband compressor whose parameters are interactive variables.

Type:

```
(?id : string?, ?bands : int, source(audio=pcm('a), 'b)) ->
source(audio=pcm('a).{gain? : never, rms? : never}, 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Id of the source. Variable names are prefixed with this.
- `bands` (of type `int`, which defaults to `5`): Number of bands.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)
where
  'b is a set of tracks to be muxed into a source and a set of internal tracks`): Source to compress.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `gain` (of type `() -> float`): 
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
- `rms` (of type `() -> float`): 
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `interactive.bool` {#interactive.bool}

Read a boolean from an interactive input.

Type:

```
(?description : string, ?osc : string, string, bool) -> () -> bool
```

Arguments:

- `description` (of type `string`, which defaults to `""`): Description of the variable.
- `osc` (of type `string`, which defaults to `""`): OSC address.
- `(unlabeled)` (of type `string`): Name of the variable.
- `(unlabeled)` (of type `bool`): Initial value.

Methods:

- `remove` (of type `() -> unit`): 
- `set` (of type `(bool) -> unit`): 

### `interactive.float` {#interactive.float}

Read a float from an interactive input.

Type:

```
(?min : float, ?max : float, ?step : float, ?description : string,
 ?unit : string, ?osc : string, string, float) -> () -> float
```

Arguments:

- `min` (of type `float`, which defaults to `-inf`): Minimal value.
- `max` (of type `float`, which defaults to `inf`): Maximal value.
- `step` (of type `float`, which defaults to `0.1`): Typical variation of the value.
- `description` (of type `string`, which defaults to `""`): Description of the variable.
- `unit` (of type `string`, which defaults to `""`): Unit for the variable.
- `osc` (of type `string`, which defaults to `""`): OSC address.
- `(unlabeled)` (of type `string`): Name of the variable.
- `(unlabeled)` (of type `float`): Initial value.

Methods:

- `remove` (of type `() -> unit`): 
- `set` (of type `(float) -> unit`): 

### `interactive.harbor` {#interactive.harbor}

Expose interactive variables through habor http server. Once this is called, with default parameters, you can browse <http://localhost:8000/interactive> to change the value of interactive variables using sliders.

Type:

```
(?transport : http_transport
 .{default_port : int, name : string, protocol : string}, ?port : int,
 ?uri : string) -> unit
```

Arguments:

- `transport` (of type `http_transport.{default_port : int, name : string, protocol : string}`, which defaults to `<unix_transport>.{default_port=80, protocol="http", name="unix"}`): Http transport. Use `http.transport.ssl` or http.transport.secure_transport`, when available, to enable HTTPS output
- `port` (of type `int`, which defaults to `8000`): Port of the server.
- `uri` (of type `string`, which defaults to `"/interactive"`): URI of the server.

### `interactive.int` {#interactive.int}

Read an integer from an interactive input.

Type:

```
(?description : string, ?osc : string, string, int) -> () -> int
```

Arguments:

- `description` (of type `string`, which defaults to `""`): Description of the variable.
- `osc` (of type `string`, which defaults to `""`): OSC address.
- `(unlabeled)` (of type `string`): Name of the variable.
- `(unlabeled)` (of type `int`): Initial value.

Methods:

- `remove` (of type `() -> unit`): 
- `set` (of type `(int) -> unit`): 

### `interactive.load` {#interactive.load}

Load the value of interactive variables from a file.

Type:

```
(string) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): Name of the file.

### `interactive.persistent` {#interactive.persistent}

Make the value of interactive variables persistent: they are loaded from the given file and stored there whenever updated. This function should be called after all interactive variables have been defined (variables not declared yet will not be loaded).

Type:

```
(string) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): Name of the file.

### `interactive.save` {#interactive.save}

Save the value of all interactive variables in a file.

Type:

```
(string) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): Name of the file.

### `interactive.string` {#interactive.string}

Read a string from an interactive input.

Type:

```
(?description : string, ?osc : string, string, string) -> () -> string
```

Arguments:

- `description` (of type `string`, which defaults to `""`): Description of the variable.
- `osc` (of type `string`, which defaults to `""`): OSC address.
- `(unlabeled)` (of type `string`): Name of the variable.
- `(unlabeled)` (of type `string`): Initial value.

Methods:

- `remove` (of type `() -> unit`): 
- `set` (of type `(string) -> unit`): 

### `interactive.unit` {#interactive.unit}

Register a callback when a unit interactive input is set.

Type:

```
(?description : string, ?osc : string, string, (() -> unit)) -> unit
```

Arguments:

- `description` (of type `string`, which defaults to `""`): Description of the variable.
- `osc` (of type `string`, which defaults to `""`): OSC address.
- `(unlabeled)` (of type `string`): Name of the variable.
- `(unlabeled)` (of type `() -> unit`): Function triggered when the value is set.

Methods:

- `remove` (of type `() -> unit`): 
- `set` (of type `() -> unit`): 

### `lastfm.nowplaying` {#lastfm.nowplaying}

Submit metadata to lastfm.fm using the audioscrobbler protocol (nowplaying mode).

Type:

```
(user : string, password : string, ?length : bool, [string * string]) -> unit
```

Arguments:

- `user` (of type `string`)
- `password` (of type `string`)
- `length` (of type `bool`, which defaults to `false`): Try to submit length information. This operation can be CPU intensive. Value forced to true when used with the "user" source type.
- `(unlabeled)` (of type `[string * string]`)

### `lastfm.submit` {#lastfm.submit}

Submit metadata to lastfm.fm using the audioscrobbler protocol.

Type:

```
(user : string, password : string, ?source : string, ?length : bool,
 [string * string]) -> unit
```

Arguments:

- `user` (of type `string`)
- `password` (of type `string`)
- `source` (of type `string`, which defaults to `"broadcast"`): Source for tracks. Should be one of: "broadcast", "user", "recommendation" or "unknown". Since liquidsoap is intended for radio broadcasting, this is the default. Sources other than user don't need duration to be set.
- `length` (of type `bool`, which defaults to `false`): Try to submit length information. This operation can be CPU intensive. Value forced to true when used with the "user" source type.
- `(unlabeled)` (of type `[string * string]`)

### `lastfm.submit.full` {#lastfm.submit.full}

Submit songs to lastfm using audioscrobbler, respecting the full protocol: First signal song as now playing when starting, and then submit song when it ends.

Type:

```
(user : string, password : string, ?source : string, ?length : bool,
 ?delay : float, ?force : bool, source('A)) -> source('A)
```

Arguments:

- `user` (of type `string`)
- `password` (of type `string`)
- `source` (of type `string`, which defaults to `"broadcast"`): Source for tracks. Should be one of: "broadcast", "user", "recommendation" or "unknown". Since liquidsoap is intended for radio broadcasting, this is the default. Sources other than user don't need duration to be set.
- `length` (of type `bool`, which defaults to `false`): Try to submit length information. This operation can be CPU intensive. Value forced to true when used with the "user" source type.
- `delay` (of type `float`, which defaults to `10.`): Submit song when there is only this delay left, in seconds. If remaining time is less than this value, the song will be assumed to be skipped or cut, and not submitted. Set to zero to disable this behaviour.
- `force` (of type `bool`, which defaults to `false`): If remaining time is null, the song will be assumed to be skipped or cut, and not submitted. Set to zero to disable this behaviour.
- `(unlabeled)` (of type `source('A)`)

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

### `librefm.nowplaying` {#librefm.nowplaying}

Submit metadata to libre.fm using the audioscrobbler protocol (nowplaying mode).

Type:

```
(user : string, password : string, ?length : bool, [string * string]) -> unit
```

Arguments:

- `user` (of type `string`)
- `password` (of type `string`)
- `length` (of type `bool`, which defaults to `false`): Try to submit length information. This operation can be CPU intensive. Value forced to true when used with the "user" source type.
- `(unlabeled)` (of type `[string * string]`)

### `librefm.submit` {#librefm.submit}

Submit metadata to libre.fm using the audioscrobbler protocol.

Type:

```
(user : string, password : string, ?source : string, ?length : bool,
 [string * string]) -> unit
```

Arguments:

- `user` (of type `string`)
- `password` (of type `string`)
- `source` (of type `string`, which defaults to `"broadcast"`): Source for tracks. Should be one of: "broadcast", "user", "recommendation" or "unknown". Since liquidsoap is intended for radio broadcasting, this is the default. Sources other than user don't need duration to be set.
- `length` (of type `bool`, which defaults to `false`): Try to submit length information. This operation can be CPU intensive. Value forced to true when used with the "user" source type.
- `(unlabeled)` (of type `[string * string]`)

### `librefm.submit.full` {#librefm.submit.full}

Submit songs to librefm using audioscrobbler, respecting the full protocol: First signal song as now playing when starting, and then submit song when it ends.

Type:

```
(user : string, password : string, ?source : string, ?length : bool,
 ?delay : float, ?force : bool, source('A)) -> source('A)
```

Arguments:

- `user` (of type `string`)
- `password` (of type `string`)
- `source` (of type `string`, which defaults to `"broadcast"`): Source for tracks. Should be one of: "broadcast", "user", "recommendation" or "unknown". Since liquidsoap is intended for radio broadcasting, this is the default. Sources other than user don't need duration to be set.
- `length` (of type `bool`, which defaults to `false`): Try to submit length information. This operation can be CPU intensive. Value forced to true when used with the "user" source type.
- `delay` (of type `float`, which defaults to `10.`): Submit song when there is only this delay left, in seconds. If remaining time is less than this value, the song will be assumed to be skipped or cut, and not submitted. Set to zero to disable this behaviour.
- `force` (of type `bool`, which defaults to `false`): If remaining time is null, the song will be assumed to be skipped or cut, and not submitted. Set to zero to disable this behaviour.
- `(unlabeled)` (of type `source('A)`)

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
