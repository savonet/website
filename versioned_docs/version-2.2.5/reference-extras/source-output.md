---
title: "Source / Output"
description: "Output to ffmpeg."
---
### `output.external.ffmpeg` {#output.external.ffmpeg}

Output to ffmpeg.

Type:

```
(?id : string?, ?show_command : bool, ?flush : bool, ?fallible : bool,
 ?on_start : (() -> unit), ?on_stop : (() -> unit),
 ?reopen_on_metadata : (([string * string]) -> bool),
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
 ?reopen_when : (() -> bool), ?reopen_delay : {float},
 ?on_reopen : (() -> unit), ?start : bool, string, source(audio=pcm(stereo),
 video=canvas)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `show_command` (of type `bool`, which defaults to `false`)
- `flush` (of type `bool`, which defaults to `false`): Perform a flush after each write.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be (temporarily) stopped.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting stops.
- `reopen_on_metadata` (of type `([string * string]) -> bool`, which defaults to `fun (_) -> false`): Callback called on metadata. If returned value is `true`, the file is reopened.
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
- `reopen_when` (of type `() -> bool`, which defaults to `{false}`): Callback called on each frame. If returned value is `true`, the file is reopened.
- `reopen_delay` (of type `{float}`, which defaults to `120.`): Prevent re-opening within that delay, in seconds. Only applies to `reopen_when`.
- `on_reopen` (of type `() -> unit`, which defaults to `{()}`): Callback executed when the output is reopened.
- `start` (of type `bool`, which defaults to `true`): Automatically start outputting whenever possible. If true, an infallible (normal) output will start outputting as soon as it is created, and a fallible output will (re)start as soon as its source becomes available for streaming.
- `(unlabeled)` (of type `string`)
- `(unlabeled)` (of type `source(audio=pcm(stereo), video=canvas)`)

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

### `output.file.dash` {#output.file.dash}

Output an MPEG-DASH playlist.

Type:

```
(?id : string?, ?fallible : bool, ?on_start : (() -> unit),
 ?on_stop : (() -> unit), ?codec : string, ?bitrate : int, ?start : bool,
 ?playlist : string, directory : string, source(audio=pcm(stereo))) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be (temporarily) stopped.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting stops.
- `codec` (of type `string`, which defaults to `"libmp3lame"`): Codec to use for audio (following FFmpeg's conventions).
- `bitrate` (of type `int`, which defaults to `128`)
- `start` (of type `bool`, which defaults to `true`): Automatically start outputting whenever possible. If true, an infallible (normal) output will start outputting as soon as it is created, and a fallible output will (re)start as soon as its source becomes available for streaming.
- `playlist` (of type `string`, which defaults to `"stream.mpd"`): Playlist name
- `directory` (of type `string`): Directory to write to
- `(unlabeled)` (of type `source(audio=pcm(stereo))`)

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

### `output.file.dash.ffmpeg` {#output.file.dash.ffmpeg}

Output an MPEG-DASH playlist using ffmpeg

Type:

```
(?id : string?, ?flush : bool, ?fallible : bool, ?on_start : (() -> unit),
 ?on_stop : (() -> unit),
 ?reopen_on_metadata : (([string * string]) -> bool),
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
 ?reopen_when : (() -> bool), ?reopen_delay : {float},
 ?on_reopen : (() -> unit), ?start : bool, ?playlist : string,
 directory : string, source(audio=pcm(stereo), video=canvas)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `flush` (of type `bool`, which defaults to `false`): Perform a flush after each write.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be (temporarily) stopped.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting stops.
- `reopen_on_metadata` (of type `([string * string]) -> bool`, which defaults to `fun (_) -> false`): Callback called on metadata. If returned value is `true`, the file is reopened.
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
- `reopen_when` (of type `() -> bool`, which defaults to `{false}`): Callback called on each frame. If returned value is `true`, the file is reopened.
- `reopen_delay` (of type `{float}`, which defaults to `120.`): Prevent re-opening within that delay, in seconds. Only applies to `reopen_when`.
- `on_reopen` (of type `() -> unit`, which defaults to `{()}`): Callback executed when the output is reopened.
- `start` (of type `bool`, which defaults to `true`): Automatically start outputting whenever possible. If true, an infallible (normal) output will start outputting as soon as it is created, and a fallible output will (re)start as soon as its source becomes available for streaming.
- `playlist` (of type `string`, which defaults to `"stream.mpd"`): Playlist name
- `directory` (of type `string`): Directory to write to
- `(unlabeled)` (of type `source(audio=pcm(stereo), video=canvas)`)

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

### `output.file.hls.ffmpeg` {#output.file.hls.ffmpeg}

Output a HLS playlist using ffmpeg

Type:

```
(?id : string?, ?flush : bool, ?fallible : bool, ?on_start : (() -> unit),
 ?on_stop : (() -> unit),
 ?reopen_on_metadata : (([string * string]) -> bool),
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
 ?reopen_when : (() -> bool), ?reopen_delay : {float},
 ?on_reopen : (() -> unit), ?start : bool, ?playlist : string,
 directory : string, source(audio=pcm(stereo), video=canvas)) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `flush` (of type `bool`, which defaults to `false`): Perform a flush after each write.
- `fallible` (of type `bool`, which defaults to `false`): Allow the child source to fail, in which case the output will be (temporarily) stopped.
- `on_start` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting starts.
- `on_stop` (of type `() -> unit`, which defaults to `{()}`): Callback executed when outputting stops.
- `reopen_on_metadata` (of type `([string * string]) -> bool`, which defaults to `fun (_) -> false`): Callback called on metadata. If returned value is `true`, the file is reopened.
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
- `reopen_when` (of type `() -> bool`, which defaults to `{false}`): Callback called on each frame. If returned value is `true`, the file is reopened.
- `reopen_delay` (of type `{float}`, which defaults to `120.`): Prevent re-opening within that delay, in seconds. Only applies to `reopen_when`.
- `on_reopen` (of type `() -> unit`, which defaults to `{()}`): Callback executed when the output is reopened.
- `start` (of type `bool`, which defaults to `true`): Automatically start outputting whenever possible. If true, an infallible (normal) output will start outputting as soon as it is created, and a fallible output will (re)start as soon as its source becomes available for streaming.
- `playlist` (of type `string`, which defaults to `"stream.m3u8"`): Playlist name
- `directory` (of type `string`): Directory to write to
- `(unlabeled)` (of type `source(audio=pcm(stereo), video=canvas)`)

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
