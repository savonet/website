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

### `output` {#output}

Output a stream using the default operator. The input source does not need to be infallible, blank will just be played during failures.

Type:

```
(?id : string?, ?fallible : bool, ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?start : bool, source(audio=pcm('A))) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `true`): Allow the child source to fail, in which case the output will be (temporarily) stopped.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting stops.
- `start` (of type `bool`, which defaults to `true`): Automatically start outputting whenever possible. If `true`, an infallible (normal) output will start outputting as soon as it is created, and a fallible output will (re)start as soon as its source becomes available for streaming.
- `(unlabeled)` (of type `source(audio=pcm('A))`): Source to play.

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.alsa` {#output.alsa}

Output the source's stream to an ALSA output device.

Type:

```
(?id : string?, ?bufferize : bool, ?clock_safe : bool, ?device : string,
 ?fallible : bool, ?on_start : (() -> unit), ?on_stop : (() -> unit),
 ?register_telnet : bool, ?start : bool, source(audio=pcm('a), 'b)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `bufferize` (of type `bool`, which defaults to `true`): Bufferize output
- `clock_safe` (of type `bool`, which defaults to `true`): Force the use of the dedicated ALSA clock
- `device` (of type `string`, which defaults to `"default"`): Alsa device to use
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.ao` {#output.ao}

Output stream to local sound card using libao.

Type:

```
(?id : string?, ?buffer_size : int, ?channels_matrix : string,
 ?clock_safe : bool, ?driver : string, ?fallible : bool,
 ?on_start : (() -> unit), ?on_stop : (() -> unit),
 ?options : [string * string], ?register_telnet : bool, ?start : bool,
 source(audio=pcm('a), 'b)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `buffer_size` (of type `int`, which defaults to `2`): Set buffer size, in frames.
- `channels_matrix` (of type `string`, which defaults to `""`): Output channels matrix, "" for AO's default.
- `clock_safe` (of type `bool`, which defaults to `true`): Use the dedicated AO clock.
- `driver` (of type `string`, which defaults to `""`): Driver to be used, "" for AO's default.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `options` (of type `[string * string]`, which defaults to `[]`): List of parameters, depends on the driver.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.audio_video` {#output.audio_video}

Output a stream with audio and video using the default operator. The input source does not need to be infallible, blank will just be played during failures.

Type:

```
(?id : string?, ?fallible : bool, ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?start : bool, source(audio=pcm('A),
 video=canvas('a))) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `true`): Allow the child source to fail, in which case the output will be (temporarily) stopped.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting stops.
- `start` (of type `bool`, which defaults to `true`): Automatically start outputting whenever possible. If `true`, an infallible (normal) output will start outputting as soon as it is created, and a fallible output will (re)start as soon as its source becomes available for streaming.
- `(unlabeled)` (of type `source(audio=pcm('A), video=canvas('a))`): Source to play.

### `output.dummy` {#output.dummy}

Dummy output: computes the stream, without actually using it.

Type:

```
(?id : string?, ?fallible : bool, ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?register_telnet : bool, ?start : bool, source('a)) ->
unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.external` {#output.external}

Send the stream to a process' standard input.

Type:

```
(?id : string?, ?export_cover_metadata : bool, ?fallible : bool,
 ?flush : bool, ?on_reopen : (() -> unit), ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?register_telnet : bool, ?reopen_delay : {float},
 ?reopen_on_error : ((error
                      .{
                        kind : string,
                        message : string,
                        trace : [
                                 {
                                   position_end : 
                                   {
                                     character_offset : int,
                                     filename : string,
                                     line_number : int
                                   },
                                   position_start : 
                                   {
                                     character_offset : int,
                                     filename : string,
                                     line_number : int
                                   },
                                   to_string : (?prefix : string) -> string
                                 }]
                      }?) -> float?),
 ?reopen_on_metadata : (([string * string]) -> bool),
 ?reopen_when : (() -> bool), ?self_sync : bool, ?start : bool, format('a),
 {string}, source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `export_cover_metadata` (of type `bool`, which defaults to `true`): Export cover metadata.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `flush` (of type `bool`, which defaults to `false`): Perform a flush after each write.
- `on_reopen` (of type `() -> unit`, which defaults to `{()}`): Callback executed when the output is reopened.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `reopen_delay` (of type `{float}`, which defaults to `120.`): Prevent re-opening within that delay, in seconds. Only applies to `reopen_when`.
- `reopen_on_error` (of type `(error
 .{
   kind : string,
   message : string,
   trace : [
            {
              position_end : 
              {character_offset : int, filename : string, line_number : int
              },
              position_start : 
              {character_offset : int, filename : string, line_number : int
              },
              to_string : (?prefix : string) -> string
            }]
 }?) -> float?`, which defaults to `<fun>`): Callback called when there is an error. Error is raised when returning `null`. Otherwise, the file is reopened after the returned value, in seconds.
- `reopen_on_metadata` (of type `([string * string]) -> bool`, which defaults to `fun (_) -> false`): Callback called on metadata. If returned value is `true`, the file is reopened.
- `reopen_when` (of type `() -> bool`, which defaults to `{false}`): Callback called on each frame. If returned value is `true`, the file is reopened.
- `self_sync` (of type `bool`, which defaults to `false`): Set to `true` if the process is expected to control the output's latency. Typical example: `ffmpeg` with the `-re` command-line option.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `format('a)`): Process to pipe data to.
- `(unlabeled)` (of type `{string}`): Encoding format.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int?).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `on_metadata` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on metadata packets.
- `on_shutdown` (of type `((() -> unit)) -> unit`): Register a function to be called when source shuts down.
- `on_track` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on new tracks.
- `on_wake_up` (of type `((() -> unit)) -> unit`): Register a function to be called after the source is asked to get ready. This is when, for instance, the source's final ID is set.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reopen` (of type `() -> unit`): Reopen the output pipe. The actual reopening happens the next time the output has some data to output.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.file` {#output.file}

Output the source stream to a file.

Type:

```
(?id : string?, ?append : bool, ?dir_perm : int,
 ?export_cover_metadata : bool, ?fallible : bool, ?flush : bool,
 ?on_close : ((string) -> unit), ?on_reopen : (() -> unit),
 ?on_start : (() -> unit), ?on_stop : (() -> unit), ?perm : int,
 ?register_telnet : bool, ?reopen_delay : {float},
 ?reopen_on_error : ((error
                      .{
                        kind : string,
                        message : string,
                        trace : [
                                 {
                                   position_end : 
                                   {
                                     character_offset : int,
                                     filename : string,
                                     line_number : int
                                   },
                                   position_start : 
                                   {
                                     character_offset : int,
                                     filename : string,
                                     line_number : int
                                   },
                                   to_string : (?prefix : string) -> string
                                 }]
                      }?) -> float?),
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
- `on_reopen` (of type `() -> unit`, which defaults to `{()}`): Callback executed when the output is reopened.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `perm` (of type `int`, which defaults to `438`): Permission of the file if it has to be created, up to umask. You can and should write this number in octal notation: 0oXXX. The default value is however displayed in decimal (0o666 = 6×8^2 + 6×8 + 6 = 438).
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `reopen_delay` (of type `{float}`, which defaults to `120.`): Prevent re-opening within that delay, in seconds. Only applies to `reopen_when`.
- `reopen_on_error` (of type `(error
 .{
   kind : string,
   message : string,
   trace : [
            {
              position_end : 
              {character_offset : int, filename : string, line_number : int
              },
              position_start : 
              {character_offset : int, filename : string, line_number : int
              },
              to_string : (?prefix : string) -> string
            }]
 }?) -> float?`, which defaults to `<fun>`): Callback called when there is an error. Error is raised when returning `null`. Otherwise, the file is reopened after the returned value, in seconds.
- `reopen_on_metadata` (of type `([string * string]) -> bool`, which defaults to `fun (_) -> false`): Callback called on metadata. If returned value is `true`, the file is reopened.
- `reopen_when` (of type `() -> bool`, which defaults to `{false}`): Callback called on each frame. If returned value is `true`, the file is reopened.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `format('a)`): Encoding format.
- `(unlabeled)` (of type `{string}`): Filename where to output the stream.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int?).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `on_metadata` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on metadata packets.
- `on_shutdown` (of type `((() -> unit)) -> unit`): Register a function to be called when source shuts down.
- `on_track` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on new tracks.
- `on_wake_up` (of type `((() -> unit)) -> unit`): Register a function to be called after the source is asked to get ready. This is when, for instance, the source's final ID is set.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `reopen` (of type `() -> unit`): Reopen the output pipe. The actual reopening happens the next time the output has some data to output.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.file.hls` {#output.file.hls}

Output the source stream to an HTTP live stream served from a local directory.

Type:

```
(?id : string?, ?dir_perm : int, ?extra_tags : [string], ?fallible : bool,
 ?on_file_change : ((state : string, string) -> unit),
 ?on_start : (() -> unit), ?on_stop : (() -> unit), ?perm : int,
 ?persist_at : string?, ?playlist : string, ?prefix : string,
 ?register_telnet : bool, ?segment_duration : float,
 ?segment_name : ((position : int, extname : string, string) -> string),
 ?segments : int, ?segments_overhead : int, ?start : bool,
 ?strict_persist : bool, ?temp_dir : string?, string,
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
- `dir_perm` (of type `int`, which defaults to `511`): Permission of the directories if some have to be created, up to umask. Although you can enter values in octal notation (0oXXX) they will be displayed in decimal (for instance, 0o777 = 7×8^2 + 7×8 + 7 = 511).
- `extra_tags` (of type `[string]`, which defaults to `[]`): Extra tags to insert into the main playlist.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `on_file_change` (of type `(state : string, string) -> unit`, which defaults to `fun (~state=_,_) -> ()`): Callback executed when a file changes. `state` is one of: `"created"`, `"updated"` or `"deleted"`, second argument is file path. Typical use: sync file with a CDN
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `perm` (of type `int`, which defaults to `438`): Permission of the created files, up to umask. You can and should write this number in octal notation: 0oXXX. The default value is however displayed in decimal (0o666 = 6×8^2 + 4×8 + 4 = 412).
- `persist_at` (of type `string?`, which defaults to `null`): Location of the configuration file used to restart the output. Relative paths are assumed to be with regard to the directory for generated file.
- `playlist` (of type `string`, which defaults to `"stream.m3u8"`): Playlist name (m3u8 extension is recommended).
- `prefix` (of type `string`, which defaults to `""`): Prefix for each files in playlists.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `segment_duration` (of type `float`, which defaults to `10.`): Segment duration (in seconds).
- `segment_name` (of type `(position : int, extname : string, string) -> string`, which defaults to `<fun>`): Segment name. Default: `fun (~position,~extname,stream_name) -> "#{stream_name}_#{position}.#{extname}"`
- `segments` (of type `int`, which defaults to `10`): Number of segments per playlist.
- `segments_overhead` (of type `int`, which defaults to `5`): Number of segments to keep after they have been featured in the live playlist.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `strict_persist` (of type `bool`, which defaults to `false`): Fail if an invalid saved state exists.
- `temp_dir` (of type `string?`, which defaults to `null`): Temporary directory used for writing files. This should be in the same partition or device as the final directory to guarantee atomic file operations. Use an system-specific value if `null`.
- `(unlabeled)` (of type `string`): Directory for generated files.
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
 }]`): List of specifications for each stream: (name, format).
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
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

### `output.harbor` {#output.harbor}

Encode and output the stream using the harbor server.

Type:

```
(?id : string?, ?auth : ((address : string, string, string) -> bool)?,
 ?buffer : int, ?burst : int, ?chunk : int, ?dumpfile : string?,
 ?encoding : string, ?fallible : bool, ?format : string,
 ?headers : [string * string], ?metaint : int, mount : string,
 ?on_connect : ((headers : [string * string], uri : string,
                 protocol : string, string) -> unit),
 ?on_disconnect : ((string) -> unit), ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?password : string?, ?port : int,
 ?register_telnet : bool, ?start : bool, ?timeout : float,
 ?transport : http_transport, ?url : string?, ?user : string?, format('a),
 source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `auth` (of type `((address : string, string, string) -> bool)?`, which defaults to `null`): Authentication function. `f(~address,login,password)` returns `true` if the user should be granted access for this login. When defined, `user` and `password` arguments are not taken in account.
- `buffer` (of type `int`, which defaults to `327675`): Maximum buffer per-client.
- `burst` (of type `int`, which defaults to `65534`): Initial burst of data sent to the client.
- `chunk` (of type `int`, which defaults to `4096`): Send data to clients using chunks of at least this length.
- `dumpfile` (of type `string?`, which defaults to `null`): Dump stream to file, for debugging purpose. Disabled if null.
- `encoding` (of type `string`, which defaults to `""`): Encoding used to send metadata. If empty, defaults to "UTF-8"
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `format` (of type `string`, which defaults to `""`): Format, e.g. "audio/ogg". When empty, the encoder is used to guess.
- `headers` (of type `[string * string]`, which defaults to `[]`): Additional headers.
- `metaint` (of type `int`, which defaults to `8192`): Interval used to send ICY metadata
- `mount` (of type `string`)
- `on_connect` (of type `(headers : [string * string], uri : string, protocol : string, string) ->
unit`, which defaults to `fun (~headers=_,~uri=_,~protocol=_,_) -> ()`): Callback executed when connection is established (takes headers, connection uri, protocol and client's IP as arguments).
- `on_disconnect` (of type `(string) -> unit`, which defaults to `fun (_) -> ()`): Callback executed when connection stops (takes client's IP as argument).
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `password` (of type `string?`, which defaults to `null`): Password for client connection. A `user` must also be set. We check for this password is checked unless an `auth` function is defined, which is used in this case.
- `port` (of type `int`, which defaults to `8000`)
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `timeout` (of type `float`, which defaults to `30.`): Timeout for network operations (in seconds).
- `transport` (of type `http_transport`, which defaults to `<unix_transport>`): Http transport. Use `http.transport.ssl` or `http.transport.secure_transport`, when available, to enable HTTPS output
- `url` (of type `string?`, which defaults to `null`)
- `user` (of type `string?`, which defaults to `null`): User for client connection. You also need to setup a `password`.
- `(unlabeled)` (of type `format('a)`): Encoding format.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.harbor.hls` {#output.harbor.hls}

Output the source stream to an HTTP live stream served from the harbor HTTP server.

Type:

```
(?id : string?, ?dir_perm : int, ?extra_tags : [string], ?fallible : bool,
 ?on_file_change : ((state : string, string) -> unit),
 ?on_start : (() -> unit), ?on_stop : (() -> unit), ?perm : int,
 ?persist_at : string?, ?playlist : string, ?prefix : string,
 ?register_telnet : bool, ?segment_duration : float, ?segments : int,
 ?segments_overhead : int, ?start : bool, ?strict_persist : bool,
 ?temp_dir : string?,
 ?segment_name : ((position : int, extname : string, string) -> string),
 ?headers : [string * string], ?port : int, ?path : string,
 ?tmpdir : string?, ?transport : http_transport
 .{default_port : int, name : string, protocol : string},
 [string * format('a)], source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `dir_perm` (of type `int`, which defaults to `511`): Permission of the directories if some have to be created, up to umask. Although you can enter values in octal notation (0oXXX) they will be displayed in decimal (for instance, 0o777 = 7×8^2 + 7×8 + 7 = 511).
- `extra_tags` (of type `[string]`, which defaults to `[]`): Extra tags to insert into the main playlist.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `on_file_change` (of type `(state : string, string) -> unit`, which defaults to `fun (~state=_,_) -> ()`): Callback executed when a file changes. `state` is one of: `"created"`, `"updated"` or `"deleted"`, second argument is file path. Typical use: sync file with a CDN
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `perm` (of type `int`, which defaults to `438`): Permission of the created files, up to umask. You can and should write this number in octal notation: 0oXXX. The default value is however displayed in decimal (0o666 = 6×8^2 + 4×8 + 4 = 412).
- `persist_at` (of type `string?`, which defaults to `null`): Location of the configuration file used to restart the output. Relative paths are assumed to be with regard to the directory for generated file.
- `playlist` (of type `string`, which defaults to `"stream.m3u8"`): Playlist name (m3u8 extension is recommended).
- `prefix` (of type `string`, which defaults to `""`): Prefix for each files in playlists.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `segment_duration` (of type `float`, which defaults to `10.`): Segment duration (in seconds).
- `segments` (of type `int`, which defaults to `10`): Number of segments per playlist.
- `segments_overhead` (of type `int`, which defaults to `5`): Number of segments to keep after they have been featured in the live playlist.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `strict_persist` (of type `bool`, which defaults to `false`): Fail if an invalid saved state exists.
- `temp_dir` (of type `string?`, which defaults to `null`): Temporary directory used for writing files. This should be in the same partition or device as the final directory to guarantee atomic file operations. Use an system-specific value if `null`.
- `segment_name` (of type `(position : int, extname : string, string) -> string`, which defaults to `<fun>`): Segment name. Default: `fun (~position,~extname,stream_name) -> "#{stream_name}_#{position}.#{extname}"`
- `headers` (of type `[string * string]`, which defaults to `[("Access-Control-Allow-Origin", "*")]`): Default response headers.
- `port` (of type `int`, which defaults to `8000`): Port for incoming harbor (http) connections.
- `path` (of type `string`, which defaults to `"/"`): Base path for hls URIs.
- `tmpdir` (of type `string?`, which defaults to `null`): Directory for generated files.
- `transport` (of type `http_transport.{default_port : int, name : string, protocol : string}`, which defaults to `<unix_transport>.{default_port=80, protocol="http", name="unix"}`): Http transport. Use `http.transport.ssl` or `http.transport.secure_transport`, when available, to enable HTTPS output
- `(unlabeled)` (of type `[string * format('a)]`): List of specifications for each stream: (name, format).
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
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

### `output.icecast` {#output.icecast}

Encode and output the stream to an icecast server.

Type:

```
(?id : string?, ?chunked : bool, ?connection_timeout : float,
 ?description : string?, ?dumpfile : string?, ?encoding : string?,
 ?fallible : bool, ?format : string, ?genre : string?,
 ?headers : [string * string], ?host : string, ?icy_metadata : [string],
 ?icy_song : (([string * string]) -> string?), ?method : string,
 mount : string, ?name : string?, ?on_connect : (() -> unit),
 ?on_disconnect : (() -> unit), ?on_error : ((string) -> float),
 ?on_start : (() -> unit), ?on_stop : (() -> unit), ?password : string,
 ?port : int, ?prefer_address : string?, ?public : bool,
 ?register_telnet : bool, ?send_icy_metadata : bool?, ?start : bool,
 ?timeout : float, ?transport : http_transport, ?url : string?,
 ?user : string?, format('a), source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `chunked` (of type `bool`, which defaults to `false`): Used chunked transfer with the 'http(s)' protocol.
- `connection_timeout` (of type `float`, which defaults to `5.`): Timeout for establishing network connections (disabled is negative).
- `description` (of type `string?`, which defaults to `null`)
- `dumpfile` (of type `string?`, which defaults to `null`): Dump stream to file, for debugging purpose. Disabled if null.
- `encoding` (of type `string?`, which defaults to `null`): Encoding used to send metadata and stream info (name, genre and description). If null, defaults to "UTF-8".
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `format` (of type `string`, which defaults to `""`): Format, e.g. "audio/ogg". When empty, the encoder is used to guess.
- `genre` (of type `string?`, which defaults to `null`)
- `headers` (of type `[string * string]`, which defaults to `[("User-Agent", "Liquidsoap/2.2.5 (Unix; OCaml 4.14.1)")]`): Additional headers.
- `host` (of type `string`, which defaults to `"localhost"`)
- `icy_metadata` (of type `[string]`, which defaults to `["song", "title", "artist", "genre", "date", "album", "tracknum", "comment", "dj", "next"]`): List of metadata to send with ICY metadata update
- `icy_song` (of type `([string * string]) -> string?`, which defaults to `<fun>`): Function used to generate the default icy "song" metadata. Metadata is not added when returning `null`. Default: `$(artist) - $(title)` if both are defined, otherwise `artist` or `title` if either is defined or `null`.
- `method` (of type `string`, which defaults to `"source"`): Method to use with the 'http(s)' protocol. One of: 'source', 'put' or 'post'.
- `mount` (of type `string`): Source mount point.
- `name` (of type `string?`, which defaults to `null`)
- `on_connect` (of type `() -> unit`, which defaults to `{()}`): Callback executed when connection is established.
- `on_disconnect` (of type `() -> unit`, which defaults to `{()}`): Callback executed when connection stops.
- `on_error` (of type `(string) -> float`, which defaults to `fun (_) -> 3.`): Callback executed when an error happens. The callback receives a string representation of the error that occurred and returns a float. If returned value is positive, connection will be tried again after this amount of time (in seconds).
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `password` (of type `string`, which defaults to `"hackme"`)
- `port` (of type `int`, which defaults to `8000`)
- `prefer_address` (of type `string?`, which defaults to `null`): Preferred address type when resolving hostnames. One of: `"ipv4"` or `"ipv6"`. Defaults to system default when `null`.
- `public` (of type `bool`, which defaults to `true`)
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `send_icy_metadata` (of type `bool?`, which defaults to `null`): Send new metadata using the ICY protocol. Guessed when `null`
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `timeout` (of type `float`, which defaults to `30.`): Timeout for network read and write.
- `transport` (of type `http_transport`, which defaults to `<unix_transport>`): Http transport. Use `http.transport.ssl` or `http.transport.secure_transport`, when available, to enable HTTPS output
- `url` (of type `string?`, which defaults to `null`)
- `user` (of type `string?`, which defaults to `null`): User for shout source connection. Defaults to "source" for icecast connections. Useful only in special cases, like with per-mountpoint users.
- `(unlabeled)` (of type `format('a)`): Encoding format.
- `(unlabeled)` (of type `source('a)`): The source to output

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.jack` {#output.jack}

Output stream to jack.

Type:

```
(?id : string?, ?buffer_size : int, ?clock_safe : bool, ?fallible : bool,
 ?on_start : (() -> unit), ?on_stop : (() -> unit), ?register_telnet : bool,
 ?server : string, ?start : bool, source(audio=pcm('a), 'b)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `buffer_size` (of type `int`, which defaults to `2`): Set buffer size, in frames.
- `clock_safe` (of type `bool`, which defaults to `true`): Force the use of the dedicated bjack clock.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `server` (of type `string`, which defaults to `""`): Jack server to connect to.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.oss` {#output.oss}

Output the source's stream to an OSS output device.

Type:

```
(?id : string?, ?clock_safe : bool, ?device : string, ?fallible : bool,
 ?on_start : (() -> unit), ?on_stop : (() -> unit), ?register_telnet : bool,
 ?start : bool, source(audio=pcm('a), 'b)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `clock_safe` (of type `bool`, which defaults to `true`): Force the use of the dedicated OSS clock.
- `device` (of type `string`, which defaults to `"/dev/dsp"`): OSS device to use.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.portaudio` {#output.portaudio}

Output the source's stream to a portaudio output device.

Type:

```
(?id : string?, ?buflen : int, ?clock_safe : bool, ?device_id : int?,
 ?fallible : bool, ?latency : float?, ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?register_telnet : bool, ?start : bool,
 source(audio=pcm('a), 'b)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `buflen` (of type `int`, which defaults to `256`): Length of a buffer in samples.
- `clock_safe` (of type `bool`, which defaults to `true`): Force the use of the dedicated Portaudio clock.
- `device_id` (of type `int?`, which defaults to `null`): Device ID. Uses default device if `null`.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `latency` (of type `float?`, which defaults to `null`): Device latency. Only used when specifying device ID.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.pulseaudio` {#output.pulseaudio}

Output the source's stream to a pulseaudio output device.

Type:

```
(?id : string?, ?client : string, ?clock_safe : bool, ?device : string,
 ?fallible : bool, ?on_start : (() -> unit), ?on_stop : (() -> unit),
 ?register_telnet : bool, ?start : bool, source(audio=pcm('a), 'b)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `client` (of type `string`, which defaults to `"liquidsoap"`)
- `clock_safe` (of type `bool`, which defaults to `true`): Force the use of the dedicated Pulseaudio clock.
- `device` (of type `string`, which defaults to `""`): Device to use. Uses default if set to "".
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(audio=pcm('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.sdl` {#output.sdl}

Display a video using SDL.

Type:

```
(?id : string?, ?fallible : bool, ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?register_telnet : bool, ?start : bool,
 source(video=canvas('a), 'b)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

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
 ?on_connect : (() -> unit), ?on_disconnect : (() -> unit),
 ?on_error : ((string) -> float), ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?password : string, ?port : int,
 ?prefer_address : string?, ?public : bool, ?register_telnet : bool,
 ?send_icy_metadata : bool?, ?start : bool, ?timeout : float,
 ?transport : http_transport, ?url : string?, ?user : string?,
 ?icy_reset : bool, ?dj : (() -> string), ?aim : string, ?icq : string,
 ?irc : string, format('a), source('a)) -> unit
where 'a is a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `chunked` (of type `bool`, which defaults to `false`): Used chunked transfer with the 'http(s)' protocol.
- `connection_timeout` (of type `float`, which defaults to `5.`): Timeout for establishing network connections (disabled is negative).
- `dumpfile` (of type `string?`, which defaults to `null`): Dump stream to file, for debugging purpose. Disabled if null.
- `encoding` (of type `string?`, which defaults to `null`): Encoding used to send metadata and stream info (name, genre and description). If null, defaults to "UTF-8".
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `format` (of type `string`, which defaults to `""`): Format, e.g. "audio/ogg". When empty, the encoder is used to guess.
- `genre` (of type `string?`, which defaults to `null`)
- `headers` (of type `[string * string]`, which defaults to `[("User-Agent", "Liquidsoap/2.2.5 (Unix; OCaml 4.14.1)")]`): Additional headers.
- `host` (of type `string`, which defaults to `"localhost"`)
- `icy_id` (of type `int`, which defaults to `1`): Shoutcast source ID.
- `icy_metadata` (of type `[string]`, which defaults to `["song", "title", "artist", "genre", "date", "album", "tracknum", "comment", "dj", "next"]`): List of metadata to send with ICY metadata update
- `icy_song` (of type `([string * string]) -> string?`, which defaults to `<fun>`): Function used to generate the default icy "song" metadata. Metadata is not added when returning `null`. Default: `$(artist) - $(title)` if both are defined, otherwise `artist` or `title` if either is defined or `null`.
- `name` (of type `string?`, which defaults to `null`)
- `on_connect` (of type `() -> unit`, which defaults to `{()}`): Callback executed when connection is established.
- `on_disconnect` (of type `() -> unit`, which defaults to `{()}`): Callback executed when connection stops.
- `on_error` (of type `(string) -> float`, which defaults to `fun (_) -> 3.`): Callback executed when an error happens. The callback receives a string representation of the error that occurred and returns a float. If returned value is positive, connection will be tried again after this amount of time (in seconds).
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `password` (of type `string`, which defaults to `"hackme"`)
- `port` (of type `int`, which defaults to `8000`)
- `prefer_address` (of type `string?`, which defaults to `null`): Preferred address type when resolving hostnames. One of: `"ipv4"` or `"ipv6"`. Defaults to system default when `null`.
- `public` (of type `bool`, which defaults to `true`)
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `send_icy_metadata` (of type `bool?`, which defaults to `null`): Send new metadata using the ICY protocol. Guessed when `null`
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `timeout` (of type `float`, which defaults to `30.`): Timeout for network read and write.
- `transport` (of type `http_transport`, which defaults to `<unix_transport>`): Http transport. Use `http.transport.ssl` or `http.transport.secure_transport`, when available, to enable HTTPS output
- `url` (of type `string?`, which defaults to `null`)
- `user` (of type `string?`, which defaults to `null`): User for shout source connection. Defaults to "source" for icecast connections. Useful only in special cases, like with per-mountpoint users.
- `icy_reset` (of type `bool`, which defaults to `true`): Reset shoutcast source buffer upon connecting (necessary for NSV).
- `dj` (of type `() -> string`, which defaults to `{""}`): Callback to set dj name.
- `aim` (of type `string`, which defaults to `""`)
- `icq` (of type `string`, which defaults to `""`)
- `irc` (of type `string`, which defaults to `""`)
- `(unlabeled)` (of type `format('a) where 'a is a set of tracks to be muxed into a source`): Encoding format. Should be mp3 or AAC(+).
- `(unlabeled)` (of type `source('a) where 'a is a set of tracks to be muxed into a source`): The source to output

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.srt` {#output.srt}

Send a SRT stream to a distant agent.

Type:

```
(?id : string?, ?bind_address : string, ?connection_timeout : float?,
 ?enforced_encryption : bool?, ?fallible : bool, ?host : string,
 ?listen_callback : ((hs_version : int, peeraddr : string,
                      streamid : string?, srt_socket
                      .{
                        bistats : (?clear : bool?, ?instantaneous : bool?) -> 
                                  {
                                    byteAvailRcvBuf : int,
                                    byteAvailSndBuf : int,
                                    byteMSS : int,
                                    byteRcvBuf : int,
                                    byteRcvDrop : int,
                                    byteRcvDropTotal : int,
                                    byteRcvUndecrypt : int,
                                    byteRcvUndecryptTotal : int,
                                    byteRecv : int,
                                    byteRecvTotal : int,
                                    byteRetrans : int,
                                    byteRetransTotal : int,
                                    byteSent : int,
                                    byteSentTotal : int,
                                    byteSndBuf : int,
                                    byteSndDrop : int,
                                    byteSndDropTotal : int,
                                    mbpsBandwidth : float,
                                    mbpsMaxBW : float,
                                    mbpsRecvRate : float,
                                    mbpsSendRate : float,
                                    msRTT : float,
                                    msRcvBuf : int,
                                    msRcvTsbPdDelay : int,
                                    msSndBuf : int,
                                    msSndTsbPdDelay : int,
                                    msTimeStamp : int,
                                    pktCongestionWindow : int,
                                    pktFlightSize : int,
                                    pktFlowWindow : int,
                                    pktRcvAvgBelatedTime : float,
                                    pktRcvBelated : int,
                                    pktRcvBuf : int,
                                    pktRcvDrop : int,
                                    pktRcvDropTotal : int,
                                    pktRcvFilterExtra : int,
                                    pktRcvFilterExtraTotal : int,
                                    pktRcvFilterLoss : int,
                                    pktRcvFilterLossTotal : int,
                                    pktRcvFilterSupply : int,
                                    pktRcvFilterSupplyTotal : int,
                                    pktRcvLoss : int,
                                    pktRcvLossTotal : int,
                                    pktRcvRetrans : int,
                                    pktRcvUndecrypt : int,
                                    pktRcvUndecryptTotal : int,
                                    pktRecv : int,
                                    pktRecvACK : int,
                                    pktRecvACKTotal : int,
                                    pktRecvNAK : int,
                                    pktRecvNAKTotal : int,
                                    pktRecvTotal : int,
                                    pktReorderDistance : int,
                                    pktRetrans : int,
                                    pktRetransTotal : int,
                                    pktSent : int,
                                    pktSentACK : int,
                                    pktSentACKTotal : int,
                                    pktSentNAK : int,
                                    pktSentNAKTotal : int,
                                    pktSentTotal : int,
                                    pktSndBuf : int,
                                    pktSndDrop : int,
                                    pktSndDropTotal : int,
                                    pktSndFilterExtra : int,
                                    pktSndFilterExtraTotal : int,
                                    pktSndLoss : int,
                                    pktSndLossTotal : int,
                                    usPktSndPeriod : float,
                                    usSndDuration : int,
                                    usSndDurationTotal : int},
                        bstats : (?clear : bool?) -> 
                                 {
                                   byteAvailRcvBuf : int,
                                   byteAvailSndBuf : int,
                                   byteMSS : int,
                                   byteRcvBuf : int,
                                   byteRcvDrop : int,
                                   byteRcvDropTotal : int,
                                   byteRcvUndecrypt : int,
                                   byteRcvUndecryptTotal : int,
                                   byteRecv : int,
                                   byteRecvTotal : int,
                                   byteRetrans : int,
                                   byteRetransTotal : int,
                                   byteSent : int,
                                   byteSentTotal : int,
                                   byteSndBuf : int,
                                   byteSndDrop : int,
                                   byteSndDropTotal : int,
                                   mbpsBandwidth : float,
                                   mbpsMaxBW : float,
                                   mbpsRecvRate : float,
                                   mbpsSendRate : float,
                                   msRTT : float,
                                   msRcvBuf : int,
                                   msRcvTsbPdDelay : int,
                                   msSndBuf : int,
                                   msSndTsbPdDelay : int,
                                   msTimeStamp : int,
                                   pktCongestionWindow : int,
                                   pktFlightSize : int,
                                   pktFlowWindow : int,
                                   pktRcvAvgBelatedTime : float,
                                   pktRcvBelated : int,
                                   pktRcvBuf : int,
                                   pktRcvDrop : int,
                                   pktRcvDropTotal : int,
                                   pktRcvFilterExtra : int,
                                   pktRcvFilterExtraTotal : int,
                                   pktRcvFilterLoss : int,
                                   pktRcvFilterLossTotal : int,
                                   pktRcvFilterSupply : int,
                                   pktRcvFilterSupplyTotal : int,
                                   pktRcvLoss : int,
                                   pktRcvLossTotal : int,
                                   pktRcvRetrans : int,
                                   pktRcvUndecrypt : int,
                                   pktRcvUndecryptTotal : int,
                                   pktRecv : int,
                                   pktRecvACK : int,
                                   pktRecvACKTotal : int,
                                   pktRecvNAK : int,
                                   pktRecvNAKTotal : int,
                                   pktRecvTotal : int,
                                   pktReorderDistance : int,
                                   pktRetrans : int,
                                   pktRetransTotal : int,
                                   pktSent : int,
                                   pktSentACK : int,
                                   pktSentACKTotal : int,
                                   pktSentNAK : int,
                                   pktSentNAKTotal : int,
                                   pktSentTotal : int,
                                   pktSndBuf : int,
                                   pktSndDrop : int,
                                   pktSndDropTotal : int,
                                   pktSndFilterExtra : int,
                                   pktSndFilterExtraTotal : int,
                                   pktSndLoss : int,
                                   pktSndLossTotal : int,
                                   usPktSndPeriod : float,
                                   usSndDuration : int,
                                   usSndDurationTotal : int},
                        close : () -> unit,
                        pbkeylen : () -> int,
                        read_data : () -> int,
                        read_latency : () -> int,
                        read_timeout : () -> int,
                        status : () -> string,
                        streamid : () -> string,
                        write_timeout : () -> int
                      }) -> bool)?,
 ?max_clients : int?, ?messageapi : bool, ?mode : string,
 ?on_connect : (() -> unit), ?on_disconnect : (() -> unit),
 ?on_start : (() -> unit), ?on_stop : (() -> unit), ?passphrase : string?,
 ?payload_size : int, ?pbkeylen : int?, ?polling_delay : float, ?port : int,
 ?read_timeout : float?, ?register_telnet : bool, ?start : bool,
 ?streamid : string?, ?write_timeout : float?, format('a), source('a)) ->
unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `bind_address` (of type `string`, which defaults to `"0.0.0.0"`): Address to bind on the local machine. Used only in listener mode
- `connection_timeout` (of type `float?`, which defaults to `null`): Timeout, in seconds, after which initial connection operations are aborted if no data was received. Uses library's default if `nulll`. Used only in `client` mode.
- `enforced_encryption` (of type `bool?`, which defaults to `null`): Enforces that both connection parties have the same passphrase set, or both do not set the passphrase, otherwise the connection is rejected.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `host` (of type `string`, which defaults to `"localhost"`): Address to connect to. Used only in caller mode.
- `listen_callback` (of type `((hs_version : int, peeraddr : string, streamid : string?, srt_socket
  .{
    bistats : (?clear : bool?, ?instantaneous : bool?) -> 
              {
                byteAvailRcvBuf : int,
                byteAvailSndBuf : int,
                byteMSS : int,
                byteRcvBuf : int,
                byteRcvDrop : int,
                byteRcvDropTotal : int,
                byteRcvUndecrypt : int,
                byteRcvUndecryptTotal : int,
                byteRecv : int,
                byteRecvTotal : int,
                byteRetrans : int,
                byteRetransTotal : int,
                byteSent : int,
                byteSentTotal : int,
                byteSndBuf : int,
                byteSndDrop : int,
                byteSndDropTotal : int,
                mbpsBandwidth : float,
                mbpsMaxBW : float,
                mbpsRecvRate : float,
                mbpsSendRate : float,
                msRTT : float,
                msRcvBuf : int,
                msRcvTsbPdDelay : int,
                msSndBuf : int,
                msSndTsbPdDelay : int,
                msTimeStamp : int,
                pktCongestionWindow : int,
                pktFlightSize : int,
                pktFlowWindow : int,
                pktRcvAvgBelatedTime : float,
                pktRcvBelated : int,
                pktRcvBuf : int,
                pktRcvDrop : int,
                pktRcvDropTotal : int,
                pktRcvFilterExtra : int,
                pktRcvFilterExtraTotal : int,
                pktRcvFilterLoss : int,
                pktRcvFilterLossTotal : int,
                pktRcvFilterSupply : int,
                pktRcvFilterSupplyTotal : int,
                pktRcvLoss : int,
                pktRcvLossTotal : int,
                pktRcvRetrans : int,
                pktRcvUndecrypt : int,
                pktRcvUndecryptTotal : int,
                pktRecv : int,
                pktRecvACK : int,
                pktRecvACKTotal : int,
                pktRecvNAK : int,
                pktRecvNAKTotal : int,
                pktRecvTotal : int,
                pktReorderDistance : int,
                pktRetrans : int,
                pktRetransTotal : int,
                pktSent : int,
                pktSentACK : int,
                pktSentACKTotal : int,
                pktSentNAK : int,
                pktSentNAKTotal : int,
                pktSentTotal : int,
                pktSndBuf : int,
                pktSndDrop : int,
                pktSndDropTotal : int,
                pktSndFilterExtra : int,
                pktSndFilterExtraTotal : int,
                pktSndLoss : int,
                pktSndLossTotal : int,
                usPktSndPeriod : float,
                usSndDuration : int,
                usSndDurationTotal : int},
    bstats : (?clear : bool?) -> 
             {
               byteAvailRcvBuf : int,
               byteAvailSndBuf : int,
               byteMSS : int,
               byteRcvBuf : int,
               byteRcvDrop : int,
               byteRcvDropTotal : int,
               byteRcvUndecrypt : int,
               byteRcvUndecryptTotal : int,
               byteRecv : int,
               byteRecvTotal : int,
               byteRetrans : int,
               byteRetransTotal : int,
               byteSent : int,
               byteSentTotal : int,
               byteSndBuf : int,
               byteSndDrop : int,
               byteSndDropTotal : int,
               mbpsBandwidth : float,
               mbpsMaxBW : float,
               mbpsRecvRate : float,
               mbpsSendRate : float,
               msRTT : float,
               msRcvBuf : int,
               msRcvTsbPdDelay : int,
               msSndBuf : int,
               msSndTsbPdDelay : int,
               msTimeStamp : int,
               pktCongestionWindow : int,
               pktFlightSize : int,
               pktFlowWindow : int,
               pktRcvAvgBelatedTime : float,
               pktRcvBelated : int,
               pktRcvBuf : int,
               pktRcvDrop : int,
               pktRcvDropTotal : int,
               pktRcvFilterExtra : int,
               pktRcvFilterExtraTotal : int,
               pktRcvFilterLoss : int,
               pktRcvFilterLossTotal : int,
               pktRcvFilterSupply : int,
               pktRcvFilterSupplyTotal : int,
               pktRcvLoss : int,
               pktRcvLossTotal : int,
               pktRcvRetrans : int,
               pktRcvUndecrypt : int,
               pktRcvUndecryptTotal : int,
               pktRecv : int,
               pktRecvACK : int,
               pktRecvACKTotal : int,
               pktRecvNAK : int,
               pktRecvNAKTotal : int,
               pktRecvTotal : int,
               pktReorderDistance : int,
               pktRetrans : int,
               pktRetransTotal : int,
               pktSent : int,
               pktSentACK : int,
               pktSentACKTotal : int,
               pktSentNAK : int,
               pktSentNAKTotal : int,
               pktSentTotal : int,
               pktSndBuf : int,
               pktSndDrop : int,
               pktSndDropTotal : int,
               pktSndFilterExtra : int,
               pktSndFilterExtraTotal : int,
               pktSndLoss : int,
               pktSndLossTotal : int,
               usPktSndPeriod : float,
               usSndDuration : int,
               usSndDurationTotal : int},
    close : () -> unit,
    pbkeylen : () -> int,
    read_data : () -> int,
    read_latency : () -> int,
    read_timeout : () -> int,
    status : () -> string,
    streamid : () -> string,
    write_timeout : () -> int
  }) -> bool)?`, which defaults to `null`): Callback used to decide whether to accept new incoming connections. Used in listener mode only.
- `max_clients` (of type `int?`, which defaults to `null`): Max number of connected clients (listener mode only)
- `messageapi` (of type `bool`, which defaults to `true`): Use message api
- `mode` (of type `string`, which defaults to `"caller"`): Mode to operate on. One of: `"listener"` (waits for connection to come in) or `"caller"` (initiate connection to a remote server)
- `on_connect` (of type `() -> unit`, which defaults to `{()}`): Function to execute when connected.
- `on_disconnect` (of type `() -> unit`, which defaults to `{()}`): Function to execute when disconnected
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `passphrase` (of type `string?`, which defaults to `null`): When set to a non-empty string, this option enables encryption and sets the passphrase for it. See `libsrt` documentation for more details.
- `payload_size` (of type `int`, which defaults to `1316`): Payload size.
- `pbkeylen` (of type `int?`, which defaults to `null`): Set encryption key length. See `libsrt` documentation for more details.
- `polling_delay` (of type `float`, which defaults to `2.`): Delay between connection attempts. Used only in caller mode.
- `port` (of type `int`, which defaults to `8000`): Port to bind on the local machine (listener mode) or to connect to (caller mode). The term `port` as used in SRT is occasionally identical to the term `UDP port`. However SRT offers more flexibility than UDP because it manages ports as its own resources. For example, one port may be shared between various services.
- `read_timeout` (of type `float?`, which defaults to `1.`): Timeout, in seconds, after which read operations are aborted if no data was received, indefinite if `null`.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `streamid` (of type `string?`, which defaults to `null`): Set `streamid`. This value can be retrieved by the listener side when connecting to it. Used in caller mode only.
- `write_timeout` (of type `float?`, which defaults to `1.`): Timeout, in seconds, after which write operations are aborted if no data was received, indefinite if `null`.
- `(unlabeled)` (of type `format('a)`): Encoding format.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `sockets` (of type `() ->
[string * srt_socket
 .{
   bistats : (?clear : bool?, ?instantaneous : bool?) -> 
             {
               byteAvailRcvBuf : int,
               byteAvailSndBuf : int,
               byteMSS : int,
               byteRcvBuf : int,
               byteRcvDrop : int,
               byteRcvDropTotal : int,
               byteRcvUndecrypt : int,
               byteRcvUndecryptTotal : int,
               byteRecv : int,
               byteRecvTotal : int,
               byteRetrans : int,
               byteRetransTotal : int,
               byteSent : int,
               byteSentTotal : int,
               byteSndBuf : int,
               byteSndDrop : int,
               byteSndDropTotal : int,
               mbpsBandwidth : float,
               mbpsMaxBW : float,
               mbpsRecvRate : float,
               mbpsSendRate : float,
               msRTT : float,
               msRcvBuf : int,
               msRcvTsbPdDelay : int,
               msSndBuf : int,
               msSndTsbPdDelay : int,
               msTimeStamp : int,
               pktCongestionWindow : int,
               pktFlightSize : int,
               pktFlowWindow : int,
               pktRcvAvgBelatedTime : float,
               pktRcvBelated : int,
               pktRcvBuf : int,
               pktRcvDrop : int,
               pktRcvDropTotal : int,
               pktRcvFilterExtra : int,
               pktRcvFilterExtraTotal : int,
               pktRcvFilterLoss : int,
               pktRcvFilterLossTotal : int,
               pktRcvFilterSupply : int,
               pktRcvFilterSupplyTotal : int,
               pktRcvLoss : int,
               pktRcvLossTotal : int,
               pktRcvRetrans : int,
               pktRcvUndecrypt : int,
               pktRcvUndecryptTotal : int,
               pktRecv : int,
               pktRecvACK : int,
               pktRecvACKTotal : int,
               pktRecvNAK : int,
               pktRecvNAKTotal : int,
               pktRecvTotal : int,
               pktReorderDistance : int,
               pktRetrans : int,
               pktRetransTotal : int,
               pktSent : int,
               pktSentACK : int,
               pktSentACKTotal : int,
               pktSentNAK : int,
               pktSentNAKTotal : int,
               pktSentTotal : int,
               pktSndBuf : int,
               pktSndDrop : int,
               pktSndDropTotal : int,
               pktSndFilterExtra : int,
               pktSndFilterExtraTotal : int,
               pktSndLoss : int,
               pktSndLossTotal : int,
               usPktSndPeriod : float,
               usSndDuration : int,
               usSndDurationTotal : int},
   bstats : (?clear : bool?) -> 
            {
              byteAvailRcvBuf : int,
              byteAvailSndBuf : int,
              byteMSS : int,
              byteRcvBuf : int,
              byteRcvDrop : int,
              byteRcvDropTotal : int,
              byteRcvUndecrypt : int,
              byteRcvUndecryptTotal : int,
              byteRecv : int,
              byteRecvTotal : int,
              byteRetrans : int,
              byteRetransTotal : int,
              byteSent : int,
              byteSentTotal : int,
              byteSndBuf : int,
              byteSndDrop : int,
              byteSndDropTotal : int,
              mbpsBandwidth : float,
              mbpsMaxBW : float,
              mbpsRecvRate : float,
              mbpsSendRate : float,
              msRTT : float,
              msRcvBuf : int,
              msRcvTsbPdDelay : int,
              msSndBuf : int,
              msSndTsbPdDelay : int,
              msTimeStamp : int,
              pktCongestionWindow : int,
              pktFlightSize : int,
              pktFlowWindow : int,
              pktRcvAvgBelatedTime : float,
              pktRcvBelated : int,
              pktRcvBuf : int,
              pktRcvDrop : int,
              pktRcvDropTotal : int,
              pktRcvFilterExtra : int,
              pktRcvFilterExtraTotal : int,
              pktRcvFilterLoss : int,
              pktRcvFilterLossTotal : int,
              pktRcvFilterSupply : int,
              pktRcvFilterSupplyTotal : int,
              pktRcvLoss : int,
              pktRcvLossTotal : int,
              pktRcvRetrans : int,
              pktRcvUndecrypt : int,
              pktRcvUndecryptTotal : int,
              pktRecv : int,
              pktRecvACK : int,
              pktRecvACKTotal : int,
              pktRecvNAK : int,
              pktRecvNAKTotal : int,
              pktRecvTotal : int,
              pktReorderDistance : int,
              pktRetrans : int,
              pktRetransTotal : int,
              pktSent : int,
              pktSentACK : int,
              pktSentACKTotal : int,
              pktSentNAK : int,
              pktSentNAKTotal : int,
              pktSentTotal : int,
              pktSndBuf : int,
              pktSndDrop : int,
              pktSndDropTotal : int,
              pktSndFilterExtra : int,
              pktSndFilterExtraTotal : int,
              pktSndLoss : int,
              pktSndLossTotal : int,
              usPktSndPeriod : float,
              usSndDuration : int,
              usSndDurationTotal : int},
   close : () -> unit,
   pbkeylen : () -> int,
   read_data : () -> int,
   read_latency : () -> int,
   read_timeout : () -> int,
   status : () -> string,
   streamid : () -> string,
   write_timeout : () -> int
 }]`): List of `(connected_address, connected_socket)`
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.url` {#output.url}

Encode and let encoder handle data output. Useful with encoder with no expected output or to encode to files that need full control from the encoder, e.g. `%ffmpeg` with `rtmp` output.

Type:

```
(?id : string?, ?export_cover_metadata : bool, ?fallible : bool,
 ?on_error : ((error
               .{
                 kind : string,
                 message : string,
                 trace : [
                          {
                            position_end : 
                            {
                              character_offset : int,
                              filename : string,
                              line_number : int
                            },
                            position_start : 
                            {
                              character_offset : int,
                              filename : string,
                              line_number : int
                            },
                            to_string : (?prefix : string) -> string
                          }]
               }) -> unit),
 ?on_start : (() -> unit), ?on_stop : (() -> unit), ?register_telnet : bool,
 ?restart_delay : float?, ?self_sync : bool, ?start : bool, url : string,
 format('a), source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `export_cover_metadata` (of type `bool`, which defaults to `true`): Export cover metadata.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be stopped until the source is available again.
- `on_error` (of type `(error
 .{
   kind : string,
   message : string,
   trace : [
            {
              position_end : 
              {character_offset : int, filename : string, line_number : int
              },
              position_start : 
              {character_offset : int, filename : string, line_number : int
              },
              to_string : (?prefix : string) -> string
            }]
 }) -> unit`, which defaults to `<fun>`): Callback executed when an error occurs.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when output stops.
- `register_telnet` (of type `bool`, which defaults to `true`): Register telnet commands for this output.
- `restart_delay` (of type `float?`, which defaults to `2.`): If not `null`, restart output on errors after the given delay.
- `self_sync` (of type `bool`, which defaults to `false`): Should the source control its own synchronization? Set to `true` for output to e.g. `rtmp` output using `%ffmpeg` and etc.
- `start` (of type `bool`, which defaults to `true`): Start output as soon as it is available.
- `url` (of type `string`): Url to output to.
- `(unlabeled)` (of type `format('a)`): Encoding format.
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `output.video` {#output.video}

Output a video stream using the default operator. The input source does not need to be infallible, blank will just be played during failures.

Type:

```
(?id : string?, ?fallible : bool, ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?start : bool, source(video=canvas('a), 'b)) ->
unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `true`): Allow the child source to fail, in which case the output will be (temporarily) stopped.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting stops.
- `start` (of type `bool`, which defaults to `true`): Automatically start outputting whenever possible. If `true`, an infallible (normal) output will start outputting as soon as it is created, and a fallible output will (re)start as soon as its source becomes available for streaming.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`): Source to play.

### `output.youtube.live.hls` {#output.youtube.live.hls}

Stream to youtube using HLS.

Type:

```
(?id : string?, ?fallible : bool, ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?segment_duration : float, ?segments : int,
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
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting stops.
- `segment_duration` (of type `float`, which defaults to `2.`): Segment duration (in seconds).
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
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
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

### `output.youtube.live.rtmp` {#output.youtube.live.rtmp}

Stream to youtube using RTMP.

Type:

```
(?id : string?, ?fallible : bool, ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?start : bool, ?url : string, key : string,
 encoder : format('a), source('a)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be (temporarily) stopped.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting stops.
- `start` (of type `bool`, which defaults to `true`): Automatically start outputting whenever possible. If true, an infallible (normal) output will start outputting as soon as it is created, and a fallible output will (re)start as soon as its source becomes available for streaming.
- `url` (of type `string`, which defaults to `"rtmp://a.rtmp.youtube.com/live2"`): RTMP URL to stream to
- `key` (of type `string`): Your secret youtube key
- `encoder` (of type `format('a)`): Encoder to use (most likely a `%ffmpeg` encoder)
- `(unlabeled)` (of type `source('a)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_started` (of type `() -> bool`): `true` if the output or source is started.
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
- `shutdown` (of type `() -> unit`): Shutdown the output or source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `start` (of type `() -> unit`): Ask the source or output to start.
- `stop` (of type `() -> unit`): Ask the source or output to stop.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.
