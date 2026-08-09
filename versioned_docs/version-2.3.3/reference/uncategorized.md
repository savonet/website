---
title: "Uncategorized"
description: "Defer the source's audio track by a given amount of time. Source will be available when the given delay has been fully buffered. Use this operator…"
---
### `defer` {#defer}

Defer the source's audio track by a given amount of time. Source will be available when the given `delay` has been fully buffered. Use this operator instead of `buffer` when buffering large amount of data as initial delay.

This operator encodes and decodes the audio content. See `defer.pcm_s16` for a low-level operator using directly the `pcm_s16` format.

Type:

```
(?id : string?, delay : float, ?overhead : float?, source(audio=pcm('a), 'b)) ->
source(audio=pcm('a))
```

Arguments:

- `id` (of type `string?`, which defaults to `"defer"`): Force the source's ID
- `delay` (of type `float`): Duration of the delay, in seconds.
- `overhead` (of type `float?`, which defaults to `null`): Duration of the delay overhead, in seconds. Defaults to frame size.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

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

### `defer.pcm_s16` {#defer.pcm_s16}

Defer the source's audio track by a given amount of time. Source will be available when the given `delay` has been fully buffered. Use this operator instead of `buffer` when buffering large amount of data as initial delay.

This operator uses a source already using `pcm_s16` audio data. It can be used to prevent unneeded data copy. Typically, decoders that know how to decode to `pcm_s16` (like `ffmpeg`) will decode directly into the format and encoders who support it (also `%ffmpeg`) will encoder directly from the `pcm_s16` data. Use `defer` if you prefer a more user-friendly operator.

Type:

```
(?id : string?, delay : float, ?overhead : float?, source(audio=pcm_s16('a))) ->
source(audio=pcm_s16('a))
```

Arguments:

- `id` (of type `string?`, which defaults to `"defer.pcm_s16"`): Force the source's ID
- `delay` (of type `float`): Duration of the delay, in seconds.
- `overhead` (of type `float?`, which defaults to `null`): Duration of the delay overhead, in seconds. Defaults to frame size.
- `(unlabeled)` (of type `source(audio=pcm_s16('a))`)

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

### `interactive.persistency` {#interactive.persistency}

Function called to ensure persistency of data.

Type:

```
() -> () -> unit
```

### `native` {#native}

Native reimplementation of track functions.

Type:

```
unit
```

### `native.request` {#native.request}

This allows doing `open native`

Type:

```
unit
```

Methods:

- `all` (of type `() -> [request]`): 
- `create` (of type `(?cue_in_metadata : string?, ?cue_out_metadata : string?, ?persistent : bool,
 ?resolve_metadata : bool, ?excluded_metadata_resolvers : [string],
 ?temporary : bool, string) -> request`): 
- `destroy` (of type `(?force : bool, request) -> unit`): 
- `dump` (of type `(format('a), string, request, ?ratio : float, ?timeout : float,
 ?sleep_latency : float) -> unit`): 
- `duration` (of type `((?resolvers : [string]?, ?resolve_metadata : bool,
  ?metadata : [string * string], ?timeout : float?, string) -> float?)
.{
  ffmpeg : (?resolve_metadata : bool, ?metadata : [string * string],
            ?timeout : float?, string) -> float?,
  flac : (?resolve_metadata : bool, ?metadata : [string * string],
          ?timeout : float?, string) -> float?,
  mad : (?resolve_metadata : bool, ?metadata : [string * string],
         ?timeout : float?, string) -> float?,
  ogg_flac : (?resolve_metadata : bool, ?metadata : [string * string],
              ?timeout : float?, string) -> float?,
  wav/aiff : (?resolve_metadata : bool, ?metadata : [string * string],
              ?timeout : float?, string) -> float?
}`): 
- `dynamic` (of type `(?id : string?, ?available : {bool}, ?prefetch : int?,
 ?retry_delay : {float}, ?synchronous : bool, ?timeout : float?,
 ?native : bool, (() -> request?)) -> source('a)
.{
  add : (request) -> bool,
  buffered : () -> [string * float],
  clock : clock,
  current : () -> request?,
  duration : () -> float,
  elapsed : () -> float,
  fallible : bool,
  fetch : () -> bool,
  id : () -> string,
  is_active : () -> bool,
  is_ready : () -> bool,
  is_up : () -> bool,
  last_metadata : () -> [string * string]?,
  log : 
  {level : (() -> int).{set : (int) -> unit}
  },
  on_metadata : ((([string * string]) -> unit)) -> unit,
  on_shutdown : ((() -> unit)) -> unit,
  on_track : ((([string * string]) -> unit)) -> unit,
  on_wake_up : ((() -> unit)) -> unit,
  queue : () -> [request],
  register_command : (?usage : string?, description : string, string,
                      ((string) -> string)) -> unit,
  remaining : () -> float,
  reset_last_metadata_on_track : (() -> bool)
  .{set : (bool) -> unit
  },
  seek : (float) -> float,
  self_sync : () -> bool,
  set_queue : ([request]) -> unit,
  skip : () -> unit,
  time : () -> float}`): 
- `filename` (of type `(request) -> string`): 
- `id` (of type `(request) -> int`): 
- `image` (of type `(?id : string?, ?fallible : bool, ?width : {int}?, ?height : {int}?,
 ?x : {int}, ?y : {int}, {request}) -> source(video=canvas('a), 'b)
.{
  buffered : () -> [string * float],
  clock : clock,
  current_source : () -> source(video=canvas('a), 'b)?,
  duration : () -> float,
  elapsed : () -> float,
  fallible : bool,
  id : () -> string,
  is_active : () -> bool,
  is_ready : () -> bool,
  is_up : () -> bool,
  last_metadata : () -> [string * string]?,
  log : 
  {level : (() -> int).{set : (int) -> unit}
  },
  on_metadata : ((([string * string]) -> unit)) -> unit,
  on_shutdown : ((() -> unit)) -> unit,
  on_track : ((([string * string]) -> unit)) -> unit,
  on_wake_up : ((() -> unit)) -> unit,
  prepare : (source(video=canvas('a), 'b)) -> unit,
  register_command : (?usage : string?, description : string, string,
                      ((string) -> string)) -> unit,
  remaining : () -> float,
  reset_last_metadata_on_track : (() -> bool)
  .{set : (bool) -> unit
  },
  seek : (float) -> float,
  self_sync : () -> bool,
  skip : () -> unit,
  time : () -> float}`): 
- `is_static` (of type `(string) -> bool`): 
- `log` (of type `(request) -> string`): 
- `metadata` (of type `(request) -> [string * string]`): 
- `once` (of type `(?id : string?, ?timeout : float?, request) -> source('a)
.{
  buffered : () -> [string * float],
  clock : clock,
  duration : () -> float,
  elapsed : () -> float,
  fallible : bool,
  id : () -> string,
  is_active : () -> bool,
  is_ready : () -> bool,
  is_up : () -> bool,
  last_metadata : () -> [string * string]?,
  log : 
  {level : (() -> int).{set : (int) -> unit}
  },
  on_metadata : ((([string * string]) -> unit)) -> unit,
  on_shutdown : ((() -> unit)) -> unit,
  on_track : ((([string * string]) -> unit)) -> unit,
  on_wake_up : ((() -> unit)) -> unit,
  register_command : (?usage : string?, description : string, string,
                      ((string) -> string)) -> unit,
  remaining : () -> float,
  request : request,
  reset_last_metadata_on_track : (() -> bool)
  .{set : (bool) -> unit
  },
  resolve : () -> bool,
  seek : (float) -> float,
  self_sync : () -> bool,
  skip : () -> unit,
  time : () -> float}`): 
- `player` (of type `(?simultaneous : bool) -> source('a)
.{
  buffered : () -> [string * float],
  clock : clock,
  current_source : () -> source('a)?,
  duration : () -> float,
  elapsed : () -> float,
  fallible : bool,
  id : () -> string,
  is_active : () -> bool,
  is_ready : () -> bool,
  is_up : () -> bool,
  last_metadata : () -> [string * string]?,
  length : () -> int,
  log : 
  {level : (() -> int).{set : (int) -> unit}
  },
  on_metadata : ((([string * string]) -> unit)) -> unit,
  on_shutdown : ((() -> unit)) -> unit,
  on_track : ((([string * string]) -> unit)) -> unit,
  on_wake_up : ((() -> unit)) -> unit,
  play : (request) -> unit,
  prepare : (source('a)) -> unit,
  register_command : (?usage : string?, description : string, string,
                      ((string) -> string)) -> unit,
  remaining : () -> float,
  reset_last_metadata_on_track : (() -> bool)
  .{set : (bool) -> unit
  },
  seek : (float) -> float,
  self_sync : () -> bool,
  skip : () -> unit,
  time : () -> float}
where 'a is a set of internal tracks`): 
- `process` (of type `(request, ?process : ((source('a)) -> source('b)), ?ratio : float,
 ?timeout : float, ?sleep_latency : float) -> unit`): 
- `queue` (of type `(?id : string?, ?interactive : bool, ?prefetch : int?, ?native : bool,
 ?queue : [request], ?timeout : float?) -> source('a)
.{
  add : (request) -> bool,
  buffered : () -> [string * float],
  clock : clock,
  current : () -> request?,
  duration : () -> float,
  elapsed : () -> float,
  fallible : bool,
  fetch : () -> bool,
  id : () -> string,
  is_active : () -> bool,
  is_ready : () -> bool,
  is_up : () -> bool,
  last_metadata : () -> [string * string]?,
  length : () -> int,
  log : 
  {level : (() -> int).{set : (int) -> unit}
  },
  on_metadata : ((([string * string]) -> unit)) -> unit,
  on_shutdown : ((() -> unit)) -> unit,
  on_track : ((([string * string]) -> unit)) -> unit,
  on_wake_up : ((() -> unit)) -> unit,
  push : ((request) -> unit)
  .{uri : (string) -> unit
  },
  queue : () -> [request],
  register_command : (?usage : string?, description : string, string,
                      ((string) -> string)) -> unit,
  remaining : () -> float,
  reset_last_metadata_on_track : (() -> bool)
  .{set : (bool) -> unit
  },
  seek : (float) -> float,
  self_sync : () -> bool,
  set_queue : ([request]) -> unit,
  skip : () -> unit,
  time : () -> float}`): 
- `resolve` (of type `(?timeout : float?, ?content_type : source('a)?, request) -> bool`): 
- `resolved` (of type `(request) -> bool`): 
- `single` (of type `(?id : string?, ?prefetch : int?, ?timeout : float?, ?fallible : bool?,
 {request}) -> source('a)
.{
  buffered : () -> [string * float],
  clock : clock,
  duration : () -> float,
  elapsed : () -> float,
  fallible : bool,
  id : () -> string,
  is_active : () -> bool,
  is_ready : () -> bool,
  is_up : () -> bool,
  last_metadata : () -> [string * string]?,
  log : 
  {level : (() -> int).{set : (int) -> unit}
  },
  on_metadata : ((([string * string]) -> unit)) -> unit,
  on_shutdown : ((() -> unit)) -> unit,
  on_track : ((([string * string]) -> unit)) -> unit,
  on_wake_up : ((() -> unit)) -> unit,
  register_command : (?usage : string?, description : string, string,
                      ((string) -> string)) -> unit,
  remaining : () -> float,
  reset_last_metadata_on_track : (() -> bool)
  .{set : (bool) -> unit
  },
  seek : (float) -> float,
  self_sync : () -> bool,
  skip : () -> unit,
  time : () -> float}`): 
- `status` (of type `(request) -> string`): 
- `uri` (of type `(request) -> string`): 

### `settings.autocue` {#settings.autocue}

Initialize settings for autocue

Type:

```
unit
```

Methods:

- `internal` (of type `unit`): 

### `settings.decoder.external` {#settings.decoder.external}

Decoders, enabled when the binary is detected and the os is not Win32.

Type:

```
unit
```

Methods:

- `comments` (of type `string`): 
- `description` (of type `string`): 

### `settings.protocol.gtts` {#settings.protocol.gtts}

GTTS

Type:

```
unit
```

Methods:

- `comments` (of type `string`): 
- `description` (of type `string`): 

### `settings.protocol.macos_say` {#settings.protocol.macos_say}

MacOS say

Type:

```
unit
```

Methods:

- `comments` (of type `string`): 
- `description` (of type `string`): 

### `settings.protocol.pico2wave` {#settings.protocol.pico2wave}

Pico2wave

Type:

```
unit
```

Methods:

- `comments` (of type `string`): 
- `description` (of type `string`): 

### `settings.protocol.say` {#settings.protocol.say}

Say

Type:

```
unit
```

Methods:

- `comments` (of type `string`): 
- `description` (of type `string`): 

### `settings.protocol.text2wave` {#settings.protocol.text2wave}

Text2wave

Type:

```
unit
```

Methods:

- `comments` (of type `string`): 
- `description` (of type `string`): 

### `variables` {#variables}

Information about all variables

Type:

```
() -> [string * {description : string, type : string}]
```

### `variables_bool` {#variables_bool}

Bool variables

Type:

```
() -> [string * {ref : (() -> bool).{set : (bool) -> unit}}]
```

### `variables_float` {#variables_float}

Float variables

Type:

```
() ->
[string * 
 {
   max : float,
   min : float,
   ref : (() -> float)
   .{set : (float) -> unit
   },
   step : float,
   unit : string
 }]
```

### `variables_int` {#variables_int}

Int variables

Type:

```
() -> [string * {ref : (() -> int).{set : (int) -> unit}}]
```

### `variables_string` {#variables_string}

String variables

Type:

```
() -> [string * {ref : (() -> string).{set : (string) -> unit}}]
```

### `variables_unit` {#variables_unit}

Unit variables: those are not references but handler functions

Type:

```
() -> [string * {handler : () -> unit}]
```

