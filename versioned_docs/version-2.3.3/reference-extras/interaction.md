---
title: "Interaction"
description: "Add a skip telnet command to a source when it does not have one by default."
---
### `add_skip_command` {#add_skip_command}

Add a skip telnet command to a source when it does not have one by default.

Type:

```
(source('c).{on_wake_up : ((() -> unit)) -> 'b, skip : () -> 'a}) -> 'b
```

Arguments:

- `(unlabeled)` (of type `source('c).{on_wake_up : ((() -> unit)) -> 'b, skip : () -> 'a}`): The source to attach the command to.

### `audioscrobbler.submit` {#audioscrobbler.submit}

Submit songs using audioscrobbler, respecting the full protocol: First signal song as now playing when starting, and then submit song when it ends.

Type:

```
(username : string, password : string, ?api_key : string?,
 ?api_secret : string?, ?delay : float, ?force : bool,
 ?metadata_preprocessor : (([string * string]) -> [string * string]),
 source('a)) -> source('a)
```

Arguments:

- `username` (of type `string`)
- `password` (of type `string`)
- `api_key` (of type `string?`, which defaults to `null`)
- `api_secret` (of type `string?`, which defaults to `null`)
- `delay` (of type `float`, which defaults to `10.0`): Submit song when there is only this delay left, in seconds.
- `force` (of type `bool`, which defaults to `false`): If remaining time is null, the song will be assumed to be skipped or cut, and not submitted. Set this to `true` to prevent this behavior
- `metadata_preprocessor` (of type `([string * string]) -> [string * string]`, which defaults to `<fun>`): Metadata pre-processor callback. Can be used to change metadata on-the-fly before sending to nowPlaying/scrobble. If returning an empty metadata, nothing is sent at all.
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
- `clock` (of type `clock`): The source's clock
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `gain` (of type `() -> float`): 
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

Expose interactive variables through harbor http server. Once this is called, with default parameters, you can browse <http://localhost:8000/interactive> to change the value of interactive variables using sliders.

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

### `spinitron.submit` {#spinitron.submit}

Submit a track to the spinitron track system and return the parsed response

Type:

```
(?host : string, api_key : string, ?live : bool, ?start : string?,
 ?duration : int?, artist : string, ?release : string?, ?label : string?,
 ?genre : string?, song : string, ?composer : string?, ?isrc : string?) ->
unit
```

Arguments:

- `host` (of type `string`, which defaults to `"https://spinitron.com/api"`)
- `api_key` (of type `string`): API key
- `live` (of type `bool`, which defaults to `false`)
- `start` (of type `string?`, which defaults to `null`)
- `duration` (of type `int?`, which defaults to `null`)
- `artist` (of type `string`)
- `release` (of type `string?`, which defaults to `null`)
- `label` (of type `string?`, which defaults to `null`)
- `genre` (of type `string?`, which defaults to `null`)
- `song` (of type `string`)
- `composer` (of type `string?`, which defaults to `null`)
- `isrc` (of type `string?`, which defaults to `null`)

Methods:

- `artist` (of type `string`): 
- `artist_custom` (of type `string?`): 
- `catalog_number` (of type `string?`): 
- `classical` (of type `bool?`): 
- `composer` (of type `string?`): 
- `conductor` (of type `string?`): 
- `duration` (of type `int?`): 
- `ensemble` (of type `string?`): 
- `genre` (of type `string?`): 
- `id` (of type `int`): 
- `image` (of type `string?`): 
- `isrc` (of type `string?`): 
- `iswc` (of type `string?`): 
- `label` (of type `string?`): 
- `label_custom` (of type `string?`): 
- `links` (of type `{playlist : {href : string}?, self : {href : string}?}?`): 
- `local` (of type `bool?`): 
- `medium` (of type `string?`): 
- `new` (of type `bool?`): 
- `note` (of type `string?`): 
- `performers` (of type `string?`): 
- `playlist_id` (of type `int`): 
- `release` (of type `string?`): 
- `release_custom` (of type `string?`): 
- `released` (of type `int?`): 
- `request` (of type `bool?`): 
- `song` (of type `string`): 
- `spin_end` (of type `string?`): 
- `spin_start` (of type `string`): 
- `timezone` (of type `string?`): 
- `upc` (of type `string?`): 
- `va` (of type `bool?`): 
- `work` (of type `string?`): 

### `spinitron.submit.metadata` {#spinitron.submit.metadata}

Submit a spin using the given metadata to the spinitron track system and return the parsed response. `artist` and `song` (or `title`) must be present either as metadata or as optional argument.

Type:

```
(?host : string, api_key : string, ?live : bool, ?start : string?,
 ?duration : int?, ?release : string?, ?label : string?, ?genre : string?,
 ?composer : string?, ?isrc : string?,
 ?mapper : (([string * string]) -> [string * string]), ?artist : string?,
 ?song : string?, [string * string]) -> unit
```

Arguments:

- `host` (of type `string`, which defaults to `"https://spinitron.com/api"`)
- `api_key` (of type `string`): API key
- `live` (of type `bool`, which defaults to `false`)
- `start` (of type `string?`, which defaults to `null`)
- `duration` (of type `int?`, which defaults to `null`)
- `release` (of type `string?`, which defaults to `null`)
- `label` (of type `string?`, which defaults to `null`)
- `genre` (of type `string?`, which defaults to `null`)
- `composer` (of type `string?`, which defaults to `null`)
- `isrc` (of type `string?`, which defaults to `null`)
- `mapper` (of type `([string * string]) -> [string * string]`, which defaults to `<fun>`): Metadata mapper that can be used to map metadata fields to spinitron's expected. Returned metadata are added to the submitted metadata. By default, `title` is mapped to `song` and `album` to `release` if neither of those passed otherwise.
- `artist` (of type `string?`, which defaults to `null`)
- `song` (of type `string?`, which defaults to `null`)
- `(unlabeled)` (of type `[string * string]`): Metadata to submit. Overrides optional arguments when present.

Methods:

- `artist` (of type `string`): 
- `artist_custom` (of type `string?`): 
- `catalog_number` (of type `string?`): 
- `classical` (of type `bool?`): 
- `composer` (of type `string?`): 
- `conductor` (of type `string?`): 
- `duration` (of type `int?`): 
- `ensemble` (of type `string?`): 
- `genre` (of type `string?`): 
- `id` (of type `int`): 
- `image` (of type `string?`): 
- `isrc` (of type `string?`): 
- `iswc` (of type `string?`): 
- `label` (of type `string?`): 
- `label_custom` (of type `string?`): 
- `links` (of type `{playlist : {href : string}?, self : {href : string}?}?`): 
- `local` (of type `bool?`): 
- `medium` (of type `string?`): 
- `new` (of type `bool?`): 
- `note` (of type `string?`): 
- `performers` (of type `string?`): 
- `playlist_id` (of type `int`): 
- `release` (of type `string?`): 
- `release_custom` (of type `string?`): 
- `released` (of type `int?`): 
- `request` (of type `bool?`): 
- `song` (of type `string`): 
- `spin_end` (of type `string?`): 
- `spin_start` (of type `string`): 
- `timezone` (of type `string?`): 
- `upc` (of type `string?`): 
- `va` (of type `bool?`): 
- `work` (of type `string?`): 

### `spinitron.submit.on_metadata` {#spinitron.submit.on_metadata}

Specialized version of `source.on_metadata` that submits spins using the source's metadata to the spinitron track system. `artist` and `song` (or `title`) must be present either as metadata or as optional argument.

Type:

```
(?id : string?, ?host : string, api_key : string, ?live : bool,
 ?start : string?, ?duration : int?, ?release : string?, ?label : string?,
 ?genre : string?, ?composer : string?, ?isrc : string?,
 ?mapper : (([string * string]) -> [string * string]), ?artist : string?,
 ?song : string?, source('a)) -> source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`)
- `host` (of type `string`, which defaults to `"https://spinitron.com/api"`)
- `api_key` (of type `string`): API key
- `live` (of type `bool`, which defaults to `false`)
- `start` (of type `string?`, which defaults to `null`)
- `duration` (of type `int?`, which defaults to `null`)
- `release` (of type `string?`, which defaults to `null`)
- `label` (of type `string?`, which defaults to `null`)
- `genre` (of type `string?`, which defaults to `null`)
- `composer` (of type `string?`, which defaults to `null`)
- `isrc` (of type `string?`, which defaults to `null`)
- `mapper` (of type `([string * string]) -> [string * string]`, which defaults to `<fun>`)
- `artist` (of type `string?`, which defaults to `null`)
- `song` (of type `string?`, which defaults to `null`)
- `(unlabeled)` (of type `source('a)`): Metadata to submit. Overrides optional arguments when present.

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

### `spinitron.submit.raw` {#spinitron.submit.raw}

Submit a track to the spinitron track system and return the raw response.

Type:

```
(?host : string, api_key : string, ?live : bool, ?start : string?,
 ?duration : int?, artist : string, ?release : string?, ?label : string?,
 ?genre : string?, song : string, ?composer : string?, ?isrc : string?) ->
string
```

Arguments:

- `host` (of type `string`, which defaults to `"https://spinitron.com/api"`)
- `api_key` (of type `string`): API key
- `live` (of type `bool`, which defaults to `false`)
- `start` (of type `string?`, which defaults to `null`)
- `duration` (of type `int?`, which defaults to `null`)
- `artist` (of type `string`)
- `release` (of type `string?`, which defaults to `null`)
- `label` (of type `string?`, which defaults to `null`)
- `genre` (of type `string?`, which defaults to `null`)
- `song` (of type `string`)
- `composer` (of type `string?`, which defaults to `null`)
- `isrc` (of type `string?`, which defaults to `null`)

Methods:

- `headers` (of type `[string * string]`): HTTP headers.
- `http_version` (of type `string`): Version of the HTTP protocol.
- `status_code` (of type `int`): Status code.
- `status_message` (of type `string`): Status message.
