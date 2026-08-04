---
title: "Interaction"
description: "Submit a track to the audioscrobbler track.scrobble API."
---
### `audioscrobbler.api.track.scrobble` {#audioscrobbler.api.track.scrobble}

Submit a track to the audioscrobbler `track.scrobble` API.

Type:

```
(username : string, password : string, ?session_key : string?,
 ?api_key : string?, ?api_secret : string?, artist : string, track : string,
 ?timestamp : float?, ?album : string?, ?context : string?,
 ?streamId : string?, ?chosenByUser : bool, ?trackNumber : int?,
 ?mbid : string?, ?albumArtist : string?, ?duration : int?) -> unit
```

Arguments:

- `username` (of type `string`)
- `password` (of type `string`)
- `session_key` (of type `string?`, which defaults to `null`)
- `api_key` (of type `string?`, which defaults to `null`)
- `api_secret` (of type `string?`, which defaults to `null`)
- `artist` (of type `string`)
- `track` (of type `string`)
- `timestamp` (of type `float?`, which defaults to `null`)
- `album` (of type `string?`, which defaults to `null`)
- `context` (of type `string?`, which defaults to `null`)
- `streamId` (of type `string?`, which defaults to `null`)
- `chosenByUser` (of type `bool`, which defaults to `true`)
- `trackNumber` (of type `int?`, which defaults to `null`)
- `mbid` (of type `string?`, which defaults to `null`)
- `albumArtist` (of type `string?`, which defaults to `null`)
- `duration` (of type `int?`, which defaults to `null`)

Methods:

- `lfm` (of type `
{
  scrobbles : 
  {
    scrobble : 
    {
      album : string?
      .{xml_params : {corrected : int}
      },
      albumArtist : string?
      .{xml_params : {corrected : int}
      },
      artist : string
      .{xml_params : {corrected : int}
      },
      ignoredMessage : 
      {xml_params : {code : int}
      },
      timestamp : float,
      track : string
      .{xml_params : {corrected : int}
      }
    },
    xml_params : 
    {accepted : int, ignored : int
    }
  },
  xml_params : 
  {status : string
  }
}`): 

### `audioscrobbler.api.track.scrobble.metadata` {#audioscrobbler.api.track.scrobble.metadata}

Submit a track to the audioscrobbler `track.scrobble` API using its metadata.

Type:

```
(username : string, password : string, ?session_key : string?,
 ?api_key : string?, ?api_secret : string?, [string * string]) -> unit
```

Arguments:

- `username` (of type `string`)
- `password` (of type `string`)
- `session_key` (of type `string?`, which defaults to `null`)
- `api_key` (of type `string?`, which defaults to `null`)
- `api_secret` (of type `string?`, which defaults to `null`)
- `(unlabeled)` (of type `[string * string]`)

### `audioscrobbler.api.track.updateNowPlaying` {#audioscrobbler.api.track.updatenowplaying}

Submit a track to the audioscrobbler `track.updateNowPlaying` API.

Type:

```
(username : string, password : string, ?session_key : string?,
 ?api_key : string?, ?api_secret : string?, artist : string, track : string,
 ?album : string?, ?context : string?, ?trackNumber : int?, ?mbid : string?,
 ?albumArtist : string?, ?duration : int?) -> unit
```

Arguments:

- `username` (of type `string`)
- `password` (of type `string`)
- `session_key` (of type `string?`, which defaults to `null`)
- `api_key` (of type `string?`, which defaults to `null`)
- `api_secret` (of type `string?`, which defaults to `null`)
- `artist` (of type `string`)
- `track` (of type `string`)
- `album` (of type `string?`, which defaults to `null`)
- `context` (of type `string?`, which defaults to `null`)
- `trackNumber` (of type `int?`, which defaults to `null`)
- `mbid` (of type `string?`, which defaults to `null`)
- `albumArtist` (of type `string?`, which defaults to `null`)
- `duration` (of type `int?`, which defaults to `null`)

Methods:

- `lfm` (of type `
{
  nowplaying : 
  {
    album : string?
    .{xml_params : {corrected : int}
    },
    albumArtist : string?
    .{xml_params : {corrected : int}
    },
    artist : string
    .{xml_params : {corrected : int}
    },
    ignoredMessage : 
    {xml_params : {code : int}
    },
    track : string
    .{xml_params : {corrected : int}
    }
  },
  xml_params : 
  {status : string
  }
}`): 

### `audioscrobbler.api.track.updateNowPlaying.metadata` {#audioscrobbler.api.track.updatenowplaying.metadata}

Submit a track using its metadata to the audioscrobbler `track.updateNowPlaying` API.

Type:

```
(username : string, password : string, ?session_key : string?,
 ?api_key : string?, ?api_secret : string?, [string * string]) -> unit
```

Arguments:

- `username` (of type `string`)
- `password` (of type `string`)
- `session_key` (of type `string?`, which defaults to `null`)
- `api_key` (of type `string?`, which defaults to `null`)
- `api_secret` (of type `string?`, which defaults to `null`)
- `(unlabeled)` (of type `[string * string]`)

### `http.codes` {#http.codes}

List of HTTP response codes and statuses.

Type:

```
[int * string]
```

### `icy.update_metadata` {#icy.update_metadata}

Update metata on an icecast mountpoint using the ICY protocol.

Type:

```
(?host : string, ?port : int, ?user : string, ?transport : http_transport,
 ?password : string, ?mount : string, ?icy_id : int, ?protocol : string,
 ?encoding : string?, ?headers : [string * string], [string * string]) ->
unit
```

Arguments:

- `host` (of type `string`, which defaults to `"localhost"`)
- `port` (of type `int`, which defaults to `8000`)
- `user` (of type `string`, which defaults to `"source"`)
- `transport` (of type `http_transport`, which defaults to `<unix_transport>`): Http transport. Use `http.transport.ssl` or `http.transport.secure_transport`, when available, to enable HTTPS output
- `password` (of type `string`, which defaults to `"hackme"`)
- `mount` (of type `string`, which defaults to `""`): Source mount point. Mandatory when streaming to icecast.
- `icy_id` (of type `int`, which defaults to `1`): Shoutcast source ID. Only supported by Shoutcast v2.
- `protocol` (of type `string`, which defaults to `"http"`): Protocol to use. One of: "icy", "http" or "https"
- `encoding` (of type `string?`, which defaults to `null`): Encoding used to send metadata, default (UTF-8) if null.
- `headers` (of type `[string * string]`, which defaults to `[("User-Agent", "Liquidsoap/2.3.3 (Unix; OCaml 4.14.2)")]`): Additional headers.
- `(unlabeled)` (of type `[string * string]`)

### `osc.bool` {#osc.bool}

Read from an OSC path.

Type:

```
(string, bool) -> () -> bool
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `bool`): Initial value.

### `osc.float` {#osc.float}

Read from an OSC path.

Type:

```
(string, float) -> () -> float
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `float`): Initial value.

### `osc.float_pair` {#osc.float_pair}

Read from an OSC path.

Type:

```
(string, (float * float)) -> () -> float * float
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `float * float`): Initial value.

### `osc.int` {#osc.int}

Read from an OSC path.

Type:

```
(string, int) -> () -> int
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `int`): Initial value.

### `osc.int_pair` {#osc.int_pair}

Read from an OSC path.

Type:

```
(string, (int * int)) -> () -> int * int
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `int * int`): Initial value.

### `osc.native.float` {#osc.native.float}

Read from an OSC path.

Type:

```
(string, float) -> () -> float
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `float`): Initial value.

### `osc.native.float_pair` {#osc.native.float_pair}

Read from an OSC path.

Type:

```
(string, (float * float)) -> () -> float * float
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `float * float`): Initial value.

### `osc.native.int` {#osc.native.int}

Read from an OSC path.

Type:

```
(string, int) -> () -> int
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `int`): Initial value.

### `osc.native.int_pair` {#osc.native.int_pair}

Read from an OSC path.

Type:

```
(string, (int * int)) -> () -> int * int
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `int * int`): Initial value.

### `osc.native.on_float` {#osc.native.on_float}

Register a callback on OSC messages.

Type:

```
(string, ((float) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `(float) -> unit`): Callback function.

### `osc.native.on_float_pair` {#osc.native.on_float_pair}

Register a callback on OSC messages.

Type:

```
(string, (((float * float)) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `((float * float)) -> unit`): Callback function.

### `osc.native.on_int` {#osc.native.on_int}

Register a callback on OSC messages.

Type:

```
(string, ((int) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `(int) -> unit`): Callback function.

### `osc.native.on_int_pair` {#osc.native.on_int_pair}

Register a callback on OSC messages.

Type:

```
(string, (((int * int)) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `((int * int)) -> unit`): Callback function.

### `osc.native.on_string` {#osc.native.on_string}

Register a callback on OSC messages.

Type:

```
(string, ((string) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `(string) -> unit`): Callback function.

### `osc.native.on_string_pair` {#osc.native.on_string_pair}

Register a callback on OSC messages.

Type:

```
(string, (((string * string)) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `((string * string)) -> unit`): Callback function.

### `osc.native.send_float` {#osc.native.send_float}

Send a value to an OSC client.

Type:

```
(host : string, port : int, string, float) -> unit
```

Arguments:

- `host` (of type `string`): OSC client address.
- `port` (of type `int`): OSC client port.
- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `float`): Value to send.

### `osc.native.send_float_pair` {#osc.native.send_float_pair}

Send a value to an OSC client.

Type:

```
(host : string, port : int, string, (float * float)) -> unit
```

Arguments:

- `host` (of type `string`): OSC client address.
- `port` (of type `int`): OSC client port.
- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `float * float`): Value to send.

### `osc.native.send_int` {#osc.native.send_int}

Send a value to an OSC client.

Type:

```
(host : string, port : int, string, int) -> unit
```

Arguments:

- `host` (of type `string`): OSC client address.
- `port` (of type `int`): OSC client port.
- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `int`): Value to send.

### `osc.native.send_int_pair` {#osc.native.send_int_pair}

Send a value to an OSC client.

Type:

```
(host : string, port : int, string, (int * int)) -> unit
```

Arguments:

- `host` (of type `string`): OSC client address.
- `port` (of type `int`): OSC client port.
- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `int * int`): Value to send.

### `osc.native.send_string` {#osc.native.send_string}

Send a value to an OSC client.

Type:

```
(host : string, port : int, string, string) -> unit
```

Arguments:

- `host` (of type `string`): OSC client address.
- `port` (of type `int`): OSC client port.
- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `string`): Value to send.

### `osc.native.send_string_pair` {#osc.native.send_string_pair}

Send a value to an OSC client.

Type:

```
(host : string, port : int, string, (string * string)) -> unit
```

Arguments:

- `host` (of type `string`): OSC client address.
- `port` (of type `int`): OSC client port.
- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `string * string`): Value to send.

### `osc.native.string` {#osc.native.string}

Read from an OSC path.

Type:

```
(string, string) -> () -> string
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `string`): Initial value.

### `osc.native.string_pair` {#osc.native.string_pair}

Read from an OSC path.

Type:

```
(string, (string * string)) -> () -> string * string
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `string * string`): Initial value.

### `osc.on_bool` {#osc.on_bool}

Register a callback on OSC messages.

Type:

```
(string, ((bool) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `(bool) -> unit`): Callback function.

### `osc.on_float` {#osc.on_float}

Register a callback on OSC messages.

Type:

```
(string, ((float) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `(float) -> unit`): Callback function.

### `osc.on_float_pair` {#osc.on_float_pair}

Register a callback on OSC messages.

Type:

```
(string, (((float * float)) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `((float * float)) -> unit`): Callback function.

### `osc.on_int` {#osc.on_int}

Register a callback on OSC messages.

Type:

```
(string, ((int) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `(int) -> unit`): Callback function.

### `osc.on_int_pair` {#osc.on_int_pair}

Register a callback on OSC messages.

Type:

```
(string, (((int * int)) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `((int * int)) -> unit`): Callback function.

### `osc.on_string` {#osc.on_string}

Register a callback on OSC messages.

Type:

```
(string, ((string) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `(string) -> unit`): Callback function.

### `osc.on_string_pair` {#osc.on_string_pair}

Register a callback on OSC messages.

Type:

```
(string, (((string * string)) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `((string * string)) -> unit`): Callback function.

### `osc.send_bool` {#osc.send_bool}

Send a value to an OSC client.

Type:

```
(host : string, port : int, string, bool) -> unit
```

Arguments:

- `host` (of type `string`): OSC client address.
- `port` (of type `int`): OSC client port.
- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `bool`): Value to send.

### `osc.send_float` {#osc.send_float}

Send a value to an OSC client.

Type:

```
(host : string, port : int, string, float) -> unit
```

Arguments:

- `host` (of type `string`): OSC client address.
- `port` (of type `int`): OSC client port.
- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `float`): Value to send.

### `osc.send_float_pair` {#osc.send_float_pair}

Send a value to an OSC client.

Type:

```
(host : string, port : int, string, (float * float)) -> unit
```

Arguments:

- `host` (of type `string`): OSC client address.
- `port` (of type `int`): OSC client port.
- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `float * float`): Value to send.

### `osc.send_int` {#osc.send_int}

Send a value to an OSC client.

Type:

```
(host : string, port : int, string, int) -> unit
```

Arguments:

- `host` (of type `string`): OSC client address.
- `port` (of type `int`): OSC client port.
- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `int`): Value to send.

### `osc.send_int_pair` {#osc.send_int_pair}

Send a value to an OSC client.

Type:

```
(host : string, port : int, string, (int * int)) -> unit
```

Arguments:

- `host` (of type `string`): OSC client address.
- `port` (of type `int`): OSC client port.
- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `int * int`): Value to send.

### `osc.send_string` {#osc.send_string}

Send a value to an OSC client.

Type:

```
(host : string, port : int, string, string) -> unit
```

Arguments:

- `host` (of type `string`): OSC client address.
- `port` (of type `int`): OSC client port.
- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `string`): Value to send.

### `osc.send_string_pair` {#osc.send_string_pair}

Send a value to an OSC client.

Type:

```
(host : string, port : int, string, (string * string)) -> unit
```

Arguments:

- `host` (of type `string`): OSC client address.
- `port` (of type `int`): OSC client port.
- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `string * string`): Value to send.

### `osc.string` {#osc.string}

Read from an OSC path.

Type:

```
(string, string) -> () -> string
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `string`): Initial value.

### `osc.string_pair` {#osc.string_pair}

Read from an OSC path.

Type:

```
(string, (string * string)) -> () -> string * string
```

Arguments:

- `(unlabeled)` (of type `string`): OSC path.
- `(unlabeled)` (of type `string * string`): Initial value.

### `prometheus.counter` {#prometheus.counter}

Register a prometheus counter

Type:

```
(help : string, ?namespace : string, ?subsystem : string, labels : [string],
 string) -> (label_values : [string]) -> (float) -> unit
```

Arguments:

- `help` (of type `string`): Help of the metric
- `namespace` (of type `string`, which defaults to `""`): namespace of the metric
- `subsystem` (of type `string`, which defaults to `""`): subsystem of the metric
- `labels` (of type `[string]`): labels for the metric
- `(unlabeled)` (of type `string`): Name of the metric

### `prometheus.gauge` {#prometheus.gauge}

Register a prometheus gauge

Type:

```
(help : string, ?namespace : string, ?subsystem : string, labels : [string],
 string) -> (label_values : [string]) -> (float) -> unit
```

Arguments:

- `help` (of type `string`): Help of the metric
- `namespace` (of type `string`, which defaults to `""`): namespace of the metric
- `subsystem` (of type `string`, which defaults to `""`): subsystem of the metric
- `labels` (of type `[string]`): labels for the metric
- `(unlabeled)` (of type `string`): Name of the metric

### `prometheus.summary` {#prometheus.summary}

Register a prometheus summary

Type:

```
(help : string, ?namespace : string, ?subsystem : string, labels : [string],
 string) -> (label_values : [string]) -> (float) -> unit
```

Arguments:

- `help` (of type `string`): Help of the metric
- `namespace` (of type `string`, which defaults to `""`): namespace of the metric
- `subsystem` (of type `string`, which defaults to `""`): subsystem of the metric
- `labels` (of type `[string]`): labels for the metric
- `(unlabeled)` (of type `string`): Name of the metric

### `server.register` {#server.register}

Register a command. You can then execute this function through the server, either telnet or socket.

Type:

```
(?namespace : string?, ?description : string, ?usage : string?, string,
 ((string) -> string)) -> unit
```

Arguments:

- `namespace` (of type `string?`, which defaults to `null`): Used to group multiple commands for the same functionality. If specified, the command will be named `namespace.command`.
- `description` (of type `string`, which defaults to `"No documentation available."`): A description of your command.
- `usage` (of type `string?`, which defaults to `null`): Description of how the command should be used.
- `(unlabeled)` (of type `string`): Name of the command.
- `(unlabeled)` (of type `(string) -> string`): Function called when the command is executed. It takes as argument the argument passed on the commandline and returns the message which will be printed on the commandline.

### `server.telnet` {#server.telnet}

Enable telnet server.

Type:

```
(?port : int) -> unit
```

Arguments:

- `port` (of type `int`, which defaults to `1234`): Port on which we should listen.
