---
title: "Liquidsoap"
description: "Decorate a clock with all its methods."
---
### `clock` {#clock}

Decorate a clock with all its methods.

Type:

```
(clock) -> clock
```

Arguments:

- `(unlabeled)` (of type `clock`)

Methods:

- `active_sources` (of type `() -> [clock_source.{id : () -> string}]`): List of active sources connected to the clock. This returns abstract sources for logging and etc. These sources cannot be used in operators.
- `dump` (of type `() -> string`): Dump source graph for the clock.
- `id` (of type `(() -> string).{set : (string) -> unit}`): The clock's id
- `outputs` (of type `() -> [clock_source.{id : () -> string}]`): List of outputs connected to the clock. This returns abstract sources for logging and etc. These sources cannot be used in operators.
- `passive_sources` (of type `() -> [clock_source.{id : () -> string}]`): List of passive sources connected to the clock. This returns abstract sources for logging and etc. These sources cannot be used in operators.
- `self_sync` (of type `() -> bool`): `true` if the clock is in control of its latency.
- `sources` (of type `() -> [clock_source.{id : () -> string}]`): List of sources connected to the clock. This returns abstract sources for logging and etc. These sources cannot be used in operators.
- `start` (of type `(?force : bool) -> unit`): Start the clock.
- `stop` (of type `() -> unit`): Stop the clock. Does nothing if the clock is stopping or stopped.
- `sub_clocks` (of type `() -> [clock]`): The list of sub-clocks for this clock.
- `sync` (of type `() -> string`): The clock's current sync mode. One of: `"stopped"`, `"stopping"`, `"auto"`, `"CPU"`, `"unsynced"` or `"passive"`.
- `tick` (of type `() -> unit`): Animate the clock and run one tick
- `ticks` (of type `() -> int`): The total number of times the clock has ticked.
- `unify` (of type `(clock) -> unit`): Unify the clock with another one. One of the two clocks should be in `"stopped"` sync mode.

### `clock.active` {#clock.active}

Return the list of clocks currently in use.

Type:

```
() -> [clock]
```

### `clock.assign_new` {#clock.assign_new}

Create a new clock and assign it to a list of sources.

Type:

```
(?sync : string, ?id : string?, ?on_error : ((error) -> unit)?,
 ['a.{clock : clock}]) -> unit
```

Arguments:

- `sync` (of type `string`, which defaults to `"auto"`): Synchronization mode. One of: `"auto"`, `"cpu"`, `"passive"` or `"none"`. Defaults to `"auto"`, which synchronizes with the CPU clock if none of the active sources are attached to their own clock (e.g. ALSA input, etc). `"cpu"` always synchronizes with the CPU clock. `"none"` removes all synchronization control.
- `id` (of type `string?`, which defaults to `null`)
- `on_error` (of type `((error) -> unit)?`, which defaults to `null`): Error callback executed when a streaming error occurs. When passed, all streaming errors are silenced. Intended mostly for debugging purposes.
- `(unlabeled)` (of type `['a.{clock : clock}]`)

### `clock.create` {#clock.create}

Create a new clock

Type:

```
(?id : string?, ?on_error : ((error) -> unit)?, ?sync : string) -> clock
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Identifier for the new clock.
- `on_error` (of type `((error) -> unit)?`, which defaults to `null`): Error callback executed when a streaming error occurs. When passed, all streaming errors are silenced. Intended mostly for debugging purposes.
- `sync` (of type `string`, which defaults to `"auto"`): Clock sync mode. Should be one of: `"auto"`, `"CPU"`, `"unsynced"` or `"passive"`. Defaults to `"auto"`. Defaults to: "auto"

Methods:

- `active_sources` (of type `() -> [clock_source.{id : () -> string}]`): List of active sources connected to the clock. This returns abstract sources for logging and etc. These sources cannot be used in operators.
- `dump` (of type `() -> string`): Dump source graph for the clock.
- `id` (of type `(() -> string).{set : (string) -> unit}`): The clock's id
- `outputs` (of type `() -> [clock_source.{id : () -> string}]`): List of outputs connected to the clock. This returns abstract sources for logging and etc. These sources cannot be used in operators.
- `passive_sources` (of type `() -> [clock_source.{id : () -> string}]`): List of passive sources connected to the clock. This returns abstract sources for logging and etc. These sources cannot be used in operators.
- `self_sync` (of type `() -> bool`): `true` if the clock is in control of its latency.
- `sources` (of type `() -> [clock_source.{id : () -> string}]`): List of sources connected to the clock. This returns abstract sources for logging and etc. These sources cannot be used in operators.
- `start` (of type `(?force : bool) -> unit`): Start the clock.
- `stop` (of type `() -> unit`): Stop the clock. Does nothing if the clock is stopping or stopped.
- `sub_clocks` (of type `() -> [clock]`): The list of sub-clocks for this clock.
- `sync` (of type `() -> string`): The clock's current sync mode. One of: `"stopped"`, `"stopping"`, `"auto"`, `"CPU"`, `"unsynced"` or `"passive"`.
- `tick` (of type `() -> unit`): Animate the clock and run one tick
- `ticks` (of type `() -> int`): The total number of times the clock has ticked.
- `unify` (of type `(clock) -> unit`): Unify the clock with another one. One of the two clocks should be in `"stopped"` sync mode.

### `clock.dump` {#clock.dump}

Return a string description of the clocks currently being used.

Type:

```
() -> string
```

### `clock.dump_all_sources` {#clock.dump_all_sources}

Return a string description of all the streaming graph currently being used.

Type:

```
() -> string
```

### `decoder.add` {#decoder.add}

Register an external decoder. The decoder receives a local file and produces another local file. Produced file can be any format decodable by liquidsoap and can also be a request uri. Recommended returned value is: `annotate:metadata="value",..:/path/to/file.wav`. File decoders are applied during the request resolution process.

Type:

```
(name : string, description : string, ?static : ((string) -> bool),
 ?mimes : [string], file_extensions : [string],
 ((rlog : ((string) -> unit), maxtime : float, string) -> string
  .{temporary? : bool}?)) -> unit
```

Arguments:

- `name` (of type `string`)
- `description` (of type `string`): Description of the decoder.
- `static` (of type `(string) -> bool`, which defaults to `fun (_) -> true`): Return `true`, then requests can be resolved once and for all. Typically, static decoders can be used to create infallible sources.
- `mimes` (of type `[string]`, which defaults to `[]`): List of mime types supported by this decoder. Empty means any mime type should be accepted.
- `file_extensions` (of type `[string]`): List of file extensions. Should not be empty.
- `(unlabeled)` (of type `(rlog : ((string) -> unit), maxtime : float, string) -> string
.{temporary? : bool}?`): Resolution function. Returns `null` if no file could be decoded.

### `decoder.metadata.add` {#decoder.metadata.add}

Register an external file metadata decoder.

Type:

```
(?priority : {int}, ?mime_types : [string]?, ?file_extensions : [string]?,
 ?reentrant : bool, string,
 ((metadata : [string * string], string) -> [string * string])) -> unit
```

Arguments:

- `priority` (of type `{int}`, which defaults to `1`): Resolver's priority.
- `mime_types` (of type `[string]?`, which defaults to `null`): Decode files that match the mime types in this list. Accept any file if `null`.
- `file_extensions` (of type `[string]?`, which defaults to `null`): Decode files that have the file extensions in this list. Accept any file if `null`.
- `reentrant` (of type `bool`, which defaults to `false`): Set to `true` to indicate that the decoder needs to resolve a request. Such decoders need to be mutually exclusive to avoid request resolution loops!
- `(unlabeled)` (of type `string`): Format/resolver's name.
- `(unlabeled)` (of type `(metadata : [string * string], string) -> [string * string]`): Process to start. The function takes the format and filename as argument and returns a list of (name,value) fields.

### `decoder.metadata.reentrant` {#decoder.metadata.reentrant}

Return the list of reentrant decoders.

Type:

```
() -> [string]
```

### `enable_autocue_metadata` {#enable_autocue_metadata}

Enable autocue metadata resolver. This resolver will process any file decoded by Liquidsoap and add cue-in/out and crossfade metadata when these values can be computed. This function sets `settings.request.prefetch` to `2` to account for the latency introduced by the `autocue` computation when resolving requests. For a finer-grained processing, use the `autocue:` protocol.

Type:

```
() -> unit
```

### `enable_external_ffmpeg_decoder` {#enable_external_ffmpeg_decoder}

Enable the external ffmpeg decoder.

Type:

```
(?binary : string, mimes : [string], file_extensions : [string]) -> unit
```

Arguments:

- `binary` (of type `string`, which defaults to `"ffmpeg"`): Path to the `ffmpeg` binary.
- `mimes` (of type `[string]`): Mime types to decode. Empty list means any type.
- `file_extensions` (of type `[string]`): File extensions to decode. Should not be empty

### `enable_external_openmpt123_decoder` {#enable_external_openmpt123_decoder}

Enable the external openmpt123 decoder

Type:

```
(?binary : string, ?mimes : [string], ?file_extensions : [string],
 ?options : string) -> unit
```

Arguments:

- `binary` (of type `string`, which defaults to `"openmpt123"`): Path to the `ffmpeg` binary.
- `mimes` (of type `[string]`, which defaults to `["audio/it", "audio/xm", "audio/s3m", "audio/x-mod", "audio/mod", "audio/module-xm", "audio/x-mod", "application/playerpro", "audio/x-s3m", "application/soundapp", "audio/med", "audio/x-xm"]`): Mime types to decode. Empty list means any type.
- `file_extensions` (of type `[string]`, which defaults to `["xm", "mtm", "amf", "stm", "ult", "wow", "dmf", "it", "s3m", "far", "mod", "mt2", "okt", "med", "669"]`): File extensions to decode.
- `options` (of type `string`, which defaults to `""`): Extra options.

### `enable_lufs_track_gain_metadata` {#enable_lufs_track_gain_metadata}

Enable LUFS metadata resolver. This resolver will process any file decoded by Liquidsoap and add a `lufs_track_gain` metadata when this value could be computed. For a finer-grained replay gain processing, use the `lufs_track_gain:` protocol.

Type:

```
(?compute : bool, ?ratio : float?) -> unit
```

Arguments:

- `compute` (of type `bool`, which defaults to `true`): Compute lufs if metadata tag is empty.
- `ratio` (of type `float?`, which defaults to `null`): Decoding ratio. A value of `50.` means try to decode the file `50x` faster than real time, if possible. Use this setting to lower CPU peaks when computing lufs tags. Defaults to `settings.lufs.decoding_ratio` when `null`

### `enable_replaygain_metadata` {#enable_replaygain_metadata}

Enable ReplayGain metadata resolver. This resolver will process any file decoded by Liquidsoap and add a `replaygain_track_gain` metadata when this value could be computed. For a finer-grained replay gain processing, use the `replaygain:` protocol.

Type:

```
(?compute : bool, ?ratio : float) -> unit
```

Arguments:

- `compute` (of type `bool`, which defaults to `true`): Compute replaygain if metadata tag is empty.
- `ratio` (of type `float`, which defaults to `50.0`): Decoding ratio. A value of `50.` means try to decode the file `50x` faster than real time, if possible. Use this setting to lower CPU peaks when computing replaygain tags.

### `encoder.content_type` {#encoder.content_type}

Return the content-type (mime) of an encoder, if known.

Type:

```
(format('a)) -> string
```

Arguments:

- `(unlabeled)` (of type `format('a)`)

### `encoder.extension` {#encoder.extension}

Return the file extension of an encoder, if known.

Type:

```
(format('a)) -> string
```

Arguments:

- `(unlabeled)` (of type `format('a)`)

### `error.methods` {#error.methods}

Decorate an error with all its methods

Type:

```
(error) -> error
```

Arguments:

- `(unlabeled)` (of type `error`)

Methods:

- `kind` (of type `string`): Error kind.
- `message` (of type `string`): Error message.
- `trace` (of type `[
 {
   cstart : int,
   cstop : int,
   filename : string,
   lstart : int,
   lstop : int,
   to_string : (?prefix : string) -> string
 }]`): Error stacktrace.

### `liquidsoap.chroot.make` {#liquidsoap.chroot.make}

Export all the files required to install liquidsoap in a root folder. Useful for packaging and docker images.

Type:

```
(string) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`)

### `liquidsoap.executable` {#liquidsoap.executable}

Path to the Liquidsoap executable.

Type:

```
string
```

### `liquidsoap.functions.count` {#liquidsoap.functions.count}

Number of functions registered in the standard library.

Type:

```
() -> int
```

### `liquidsoap.script.path` {#liquidsoap.script.path}

Path to the current script, if available

Type:

```
string?
```

### `liquidsoap.version.at_least` {#liquidsoap.version.at_least}

Ensure that Liquidsoap version is greater or equal to given one.

Type:

```
(string) -> bool
```

Arguments:

- `(unlabeled)` (of type `string`): Minimal version.

### `log` {#log}

Log a message.

Type:

```
(?label : string, ?level : int, string) -> unit
```

Arguments:

- `label` (of type `string`, which defaults to `"lang"`)
- `level` (of type `int`, which defaults to `3`)
- `(unlabeled)` (of type `string`)

### `log.critical` {#log.critical}

Log a critical message

Type:

```
(?label : string, string) -> unit
```

Arguments:

- `label` (of type `string`, which defaults to `"lang"`)
- `(unlabeled)` (of type `string`)

### `log.debug` {#log.debug}

Log a debug message

Type:

```
(?label : string, string) -> unit
```

Arguments:

- `label` (of type `string`, which defaults to `"lang"`)
- `(unlabeled)` (of type `string`)

### `log.file` {#log.file}

Get and set the file logging

Type:

```
() -> bool
```

### `log.important` {#log.important}

Log an important message

Type:

```
(?label : string, string) -> unit
```

Arguments:

- `label` (of type `string`, which defaults to `"lang"`)
- `(unlabeled)` (of type `string`)

### `log.info` {#log.info}

Log a normal message

Type:

```
(?label : string, string) -> unit
```

Arguments:

- `label` (of type `string`, which defaults to `"lang"`)
- `(unlabeled)` (of type `string`)

### `log.level` {#log.level}

Get and set the log level.

Type:

```
() -> int
```

### `log.severe` {#log.severe}

Log a severe message

Type:

```
(?label : string, string) -> unit
```

Arguments:

- `label` (of type `string`, which defaults to `"lang"`)
- `(unlabeled)` (of type `string`)

### `log.stdout` {#log.stdout}

Get and set logging to stdout

Type:

```
() -> bool
```

### `playlist.parse` {#playlist.parse}

Try to parse a local playlist. Return a list of (metadata,URI) items, where metadata is a list of (key,value) bindings.

Type:

```
(?path : string, ?mime : string?, string) -> [[string * string] * string]
```

Arguments:

- `path` (of type `string`, which defaults to `""`): Default path for files.
- `mime` (of type `string?`, which defaults to `null`): Mime type for the playlist
- `(unlabeled)` (of type `string`)

### `playlist.parse.cue` {#playlist.parse.cue}

Parse a cue file and return a value suitable for playlist parser registration.

Type:

```
(?pwd : string?, string) -> [[string * string] * string]
```

Arguments:

- `pwd` (of type `string?`, which defaults to `null`): Path to use for relative path resolution
- `(unlabeled)` (of type `string`)

### `playlist.parse.cue.full` {#playlist.parse.cue.full}

Parse a cue file

Type:

```
(?pwd : string?, string) -> unit
```

Arguments:

- `pwd` (of type `string?`, which defaults to `null`): Path to use for relative path resolution
- `(unlabeled)` (of type `string`)

Methods:

- `catalog` (of type `string`): 
- `performer` (of type `string`): 
- `rem` (of type `[string * string]`): 
- `title` (of type `string`): 
- `tracks` (of type `[
 {
   album? : string,
   indexes : [int * 
              {
                file_type? : string,
                filename? : string,
                frames : int,
                minutes : int,
                seconds : int
              }],
   isrc? : string,
   performer? : string,
   position : int,
   postgap? : 
   {frames : int, minutes : int, seconds : int
   },
   pregap? : 
   {frames : int, minutes : int, seconds : int
   },
   title? : string,
   track_type? : string
 }]`): 

### `playlist.parse.get_file` {#playlist.parse.get_file}

Resolve a uri relative to a given pwd.

Type:

```
(?pwd : string?, string) -> string
```

Arguments:

- `pwd` (of type `string?`, which defaults to `null`): Current directory to use for relative file path.
- `(unlabeled)` (of type `string`): URI

### `playlist.parse.m3u` {#playlist.parse.m3u}

Parse M3U playlists

Type:

```
(string, ?pwd : string?) -> [[string * string] * string]
```

Arguments:

- `(unlabeled)` (of type `string`): Playlist file
- `pwd` (of type `string?`, which defaults to `null`): Current directory to use for relative file path.

### `playlist.parse.register` {#playlist.parse.register}

Register a new playlist parser. An empty playlist is considered as a failure to resolve.

Type:

```
(name : string, mimes : [string], strict : bool,
 ((?pwd : string, string) -> [[string * string] * string])) -> unit
```

Arguments:

- `name` (of type `string`): User-friendly format name
- `mimes` (of type `[string]`): Supported mime formats.
- `strict` (of type `bool`): True if playlist format can be detected unambiguously.
- `(unlabeled)` (of type `(?pwd : string, string) -> [[string * string] * string]`): Playlist parser

### `playlist.parse.scpls` {#playlist.parse.scpls}

Parse SCPLS playlists

Type:

```
(string, ?pwd : string?) -> [[string * string] * string]
```

Arguments:

- `(unlabeled)` (of type `string`): Playlist file
- `pwd` (of type `string?`, which defaults to `null`): Current directory to use for relative file path.

### `playlist.parse.xml` {#playlist.parse.xml}

Parse XML playlists

Type:

```
(string, ?pwd : string?) -> [[string * string] * string]
```

Arguments:

- `(unlabeled)` (of type `string`): Playlist file
- `pwd` (of type `string?`, which defaults to `null`): Current directory to use for relative file path.

### `process.uri` {#process.uri}

Create a process: uri, replacing `:` with `$(colon)`.

Type:

```
(?timeout : 'a?, extname : 'b, ?uri : string, string) -> string
```

Arguments:

- `timeout` (of type `'a?`, which defaults to `null`)
- `extname` (of type `'b`): Output file extension (with no leading '.')
- `uri` (of type `string`, which defaults to `""`): Input uri
- `(unlabeled)` (of type `string`): Command line to execute

### `profiler.disable` {#profiler.disable}

Record profiling statistics.

Type:

```
() -> unit
```

### `profiler.enable` {#profiler.enable}

Record profiling statistics.

Type:

```
() -> unit
```

### `profiler.print` {#profiler.print}

Print profiling information.

Type:

```
() -> unit
```

### `profiler.run` {#profiler.run}

Time a function with the profiler.

Type:

```
(string, (() -> 'a)) -> 'a
```

Arguments:

- `(unlabeled)` (of type `string`): Name of the profiled function.
- `(unlabeled)` (of type `() -> 'a`): Function to profile.

### `profiler.stats.string` {#profiler.stats.string}

Profiling statistics.

Type:

```
() -> string
```

### `prometheus.latency` {#prometheus.latency}

Monitor a source's internal latencies on Prometheus

Type:

```
(?window : float, ?prefix : string, labels : [string]) ->
(label_values : [string], source('a)) -> unit
```

Arguments:

- `window` (of type `float`, which defaults to `5.0`): Window over which mean and peak metrics are reported.
- `prefix` (of type `string`, which defaults to `"liquidsoap_"`): Prefix for the metric's name
- `labels` (of type `[string]`): labels for the metric

### `protocol.add` {#protocol.add}

Register a new protocol.

Type:

```
(?temporary : bool, ?static : ((string) -> bool), ?syntax : string,
 ?doc : string, string,
 ((rlog : ((string) -> unit), maxtime : float, string) -> string?)) -> unit
```

Arguments:

- `temporary` (of type `bool`, which defaults to `false`): if true, file is removed when it is finished.
- `static` (of type `(string) -> bool`, which defaults to `fun (_) -> false`): When given an uri for the protocol, if it returns `true`, then requests can be resolved once and for all. Typically, static protocols can be used to create infallible sources.
- `syntax` (of type `string`, which defaults to `"Undocumented"`): URI syntax.
- `doc` (of type `string`, which defaults to `"Undocumented"`): Protocol documentation.
- `(unlabeled)` (of type `string`): Protocol name. Resolver will be called on uris of the form: `<protocol name>:...`.
- `(unlabeled)` (of type `(rlog : ((string) -> unit), maxtime : float, string) -> string?`): Protocol resolver. Receives a function to log protocol resolution, the `<arg>` in `<protocol name>:<arg>` and the max delay that resolution should take.

### `protocol.count` {#protocol.count}

Number of registered protocols.

Type:

```
() -> int
```

### `request.all` {#request.all}

Return all the requests currently available.

Type:

```
() -> [request]
```

### `request.create` {#request.create}

Create a request from an URI.

Type:

```
(?cue_in_metadata : string?, ?cue_out_metadata : string?, ?persistent : bool,
 ?resolve_metadata : bool, ?excluded_metadata_resolvers : [string],
 ?temporary : bool, string) -> request
```

Arguments:

- `cue_in_metadata` (of type `string?`, which defaults to `"liq_cue_in"`): Metadata for cue in points. Disabled if `null`.
- `cue_out_metadata` (of type `string?`, which defaults to `"liq_cue_out"`): Metadata for cue out points. Disabled if `null`.
- `persistent` (of type `bool`, which defaults to `false`): Indicate that the request is persistent, i.e. that it may be used again once it has been played.
- `resolve_metadata` (of type `bool`, which defaults to `true`): Set to `false` to prevent metadata resolution on this request.
- `excluded_metadata_resolvers` (of type `[string]`, which defaults to `[]`): List of metadata resolves to exclude when resolving metadata.
- `temporary` (of type `bool`, which defaults to `false`): Indicate that the request is a temporary file: it will be destroyed after being played.
- `(unlabeled)` (of type `string`)

### `request.destroy` {#request.destroy}

Destroying a request causes any temporary associated file to be deleted, and releases its RID. Persistent requests resist to destroying, unless forced.

Type:

```
(?force : bool, request) -> unit
```

Arguments:

- `force` (of type `bool`, which defaults to `false`): Destroy the request even if it is persistent.
- `(unlabeled)` (of type `request`)

### `request.duration` {#request.duration}

Compute the duration in seconds of audio data contained in a request. The computation may be expensive. Returns `null` if computation failed, typically if the file was not recognized as valid audio.

Type:

```
(?resolvers : [string]?, ?resolve_metadata : bool,
 ?metadata : [string * string], ?timeout : float?, string) -> float?
```

Arguments:

- `resolvers` (of type `[string]?`, which defaults to `null`): Set to a list of resolvers to only resolve duration using a specific decoder.
- `resolve_metadata` (of type `bool`, which defaults to `true`): Set to `false` to prevent metadata resolution on this request.
- `metadata` (of type `[string * string]`, which defaults to `[]`): Optional metadata used to decode the file, e.g. `ffmpeg_options`.
- `timeout` (of type `float?`, which defaults to `null`): Limit in seconds to the duration of request resolution. Defaults to `settings.request.timeout` when `null`.
- `(unlabeled)` (of type `string`)

### `request.duration.ffmpeg` {#request.duration.ffmpeg}

Compute the duration in seconds of audio data contained in a request using the ffmpeg decoder. The computation may be expensive. Returns `null` if computation failed, typically if the file was not recognized as valid audio.

Type:

```
(?resolve_metadata : bool, ?metadata : [string * string], ?timeout : float?,
 string) -> float?
```

Arguments:

- `resolve_metadata` (of type `bool`, which defaults to `true`): Set to `false` to prevent metadata resolution on this request.
- `metadata` (of type `[string * string]`, which defaults to `[]`): Optional metadata used to decode the file, e.g. `ffmpeg_options`.
- `timeout` (of type `float?`, which defaults to `null`): Limit in seconds to the duration of request resolution. Defaults to `settings.request.timeout` when `null`.
- `(unlabeled)` (of type `string`)

### `request.duration.flac` {#request.duration.flac}

Compute the duration in seconds of audio data contained in a request using the flac decoder. The computation may be expensive. Returns `null` if computation failed, typically if the file was not recognized as valid audio.

Type:

```
(?resolve_metadata : bool, ?metadata : [string * string], ?timeout : float?,
 string) -> float?
```

Arguments:

- `resolve_metadata` (of type `bool`, which defaults to `true`): Set to `false` to prevent metadata resolution on this request.
- `metadata` (of type `[string * string]`, which defaults to `[]`): Optional metadata used to decode the file, e.g. `ffmpeg_options`.
- `timeout` (of type `float?`, which defaults to `null`): Limit in seconds to the duration of request resolution. Defaults to `settings.request.timeout` when `null`.
- `(unlabeled)` (of type `string`)

### `request.duration.mad` {#request.duration.mad}

Compute the duration in seconds of audio data contained in a request using the mad decoder. The computation may be expensive. Returns `null` if computation failed, typically if the file was not recognized as valid audio.

Type:

```
(?resolve_metadata : bool, ?metadata : [string * string], ?timeout : float?,
 string) -> float?
```

Arguments:

- `resolve_metadata` (of type `bool`, which defaults to `true`): Set to `false` to prevent metadata resolution on this request.
- `metadata` (of type `[string * string]`, which defaults to `[]`): Optional metadata used to decode the file, e.g. `ffmpeg_options`.
- `timeout` (of type `float?`, which defaults to `null`): Limit in seconds to the duration of request resolution. Defaults to `settings.request.timeout` when `null`.
- `(unlabeled)` (of type `string`)

### `request.duration.ogg_flac` {#request.duration.ogg_flac}

Compute the duration in seconds of audio data contained in a request using the ogg_flac decoder. The computation may be expensive. Returns `null` if computation failed, typically if the file was not recognized as valid audio.

Type:

```
(?resolve_metadata : bool, ?metadata : [string * string], ?timeout : float?,
 string) -> float?
```

Arguments:

- `resolve_metadata` (of type `bool`, which defaults to `true`): Set to `false` to prevent metadata resolution on this request.
- `metadata` (of type `[string * string]`, which defaults to `[]`): Optional metadata used to decode the file, e.g. `ffmpeg_options`.
- `timeout` (of type `float?`, which defaults to `null`): Limit in seconds to the duration of request resolution. Defaults to `settings.request.timeout` when `null`.
- `(unlabeled)` (of type `string`)

### `request.duration.wav/aiff` {#request.duration.wavaiff}

Compute the duration in seconds of audio data contained in a request using the wav/aiff decoder. The computation may be expensive. Returns `null` if computation failed, typically if the file was not recognized as valid audio.

Type:

```
(?resolve_metadata : bool, ?metadata : [string * string], ?timeout : float?,
 string) -> float?
```

Arguments:

- `resolve_metadata` (of type `bool`, which defaults to `true`): Set to `false` to prevent metadata resolution on this request.
- `metadata` (of type `[string * string]`, which defaults to `[]`): Optional metadata used to decode the file, e.g. `ffmpeg_options`.
- `timeout` (of type `float?`, which defaults to `null`): Limit in seconds to the duration of request resolution. Defaults to `settings.request.timeout` when `null`.
- `(unlabeled)` (of type `string`)

### `request.filename` {#request.filename}

Return a valid local filename if the request is ready, and the empty string otherwise.

Type:

```
(request) -> string
```

Arguments:

- `(unlabeled)` (of type `request`)

### `request.id` {#request.id}

Identifier of a request.

Type:

```
(request) -> int
```

Arguments:

- `(unlabeled)` (of type `request`)

### `request.is_static` {#request.is_static}

`true` if the given URI is assumed to be static, e.g. a file.

Type:

```
(string) -> bool
```

Arguments:

- `(unlabeled)` (of type `string`)

### `request.log` {#request.log}

Get log data associated to a request.

Type:

```
(request) -> string
```

Arguments:

- `(unlabeled)` (of type `request`)

### `request.metadata` {#request.metadata}

Get the metadata associated to a request.

Type:

```
(request) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `request`)

### `request.resolve` {#request.resolve}

Resolve a request, i.e. attempt to get a valid local file. The operation can take some time. Return true if the resolving was successful, false otherwise (timeout or invalid URI).

Type:

```
(?timeout : float?, ?content_type : source('a)?, request) -> bool
```

Arguments:

- `timeout` (of type `float?`, which defaults to `null`): Limit in seconds to the duration of the request resolution. Defaults to `settings.request.timeout` when `null`.
- `content_type` (of type `source('a)?`, which defaults to `null`): Check that the request can decode content suitable for the given source.
- `(unlabeled)` (of type `request`)

### `request.resolved` {#request.resolved}

Check if a request is resolved, i.e. is associated to a valid local file.

Type:

```
(request) -> bool
```

Arguments:

- `(unlabeled)` (of type `request`)

### `request.status` {#request.status}

Current status of a request. Can be idle, resolving, ready, playing or destroyed.

Type:

```
(request) -> string
```

Arguments:

- `(unlabeled)` (of type `request`)

### `request.uri` {#request.uri}

Initial URI of a request.

Type:

```
(request) -> string
```

Arguments:

- `(unlabeled)` (of type `request`)

### `runtime.cpu.usage_getter` {#runtime.cpu.usage_getter}

Create a function returning CPU usage (in `float` percent so `0.2` means `20%`) since the last time it was called.

Type:

```
() -> () -> {system : float, total : float, user : float}
```

### `runtime.gc.compact` {#runtime.gc.compact}

Perform a full major collection and compact the heap. Note that heap compaction is a lengthy operation.

Type:

```
() -> unit
```

### `runtime.gc.full_major` {#runtime.gc.full_major}

Trigger full major garbage collection.

Type:

```
() -> unit
```

### `runtime.gc.major` {#runtime.gc.major}

Trigger a minor collection and finish the current major collection cycle..

Type:

```
() -> unit
```

### `runtime.gc.major_slice` {#runtime.gc.major_slice}

Do a minor collection and a slice of major collection. The optional argument `n` is the size of the slice: the GC will do enough work to free (on average) `n` words of memory. If `0` (its default), the GC will try to do enough work to ensure that the next automatic slice has no work to do.

Type:

```
(?int) -> unit
```

Arguments:

- `(unlabeled)` (of type `int`, which defaults to `0`): Size of the slice

### `runtime.gc.minor` {#runtime.gc.minor}

Trigger full minor garbage collection.

Type:

```
() -> unit
```

### `seconds_of_main` {#seconds_of_main}

Convert a number of main ticks to seconds. Sub-second precision is available as the fractional part (64-bit float).

Type:

```
(int) -> float
```

Arguments:

- `(unlabeled)` (of type `int`)

### `server.execute` {#server.execute}

Execute a liquidsoap server command.

Type:

```
(string, ?string) -> [string]
```

Arguments:

- `(unlabeled)` (of type `string`): Command to execute.
- `(unlabeled)` (of type `string`, which defaults to `""`): Argument for the command.

### `srt.socket` {#srt.socket}

Decorate a srt socket with all its methods.

Type:

```
(srt_socket) -> srt_socket
```

Arguments:

- `(unlabeled)` (of type `srt_socket`)

Methods:

- `bistats` (of type `(?clear : bool?, ?instantaneous : bool?) -> 
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
  usSndDurationTotal : int}`): Socket bstats
- `bstats` (of type `(?clear : bool?) -> 
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
  usSndDurationTotal : int}`): Socket bstats
- `close` (of type `() -> unit`): Close socket
- `id` (of type `int`): Socket ID
- `ipv6only` (of type `() -> bool`): Get ipv6only option
- `latency` (of type `() -> int`): Get latency option
- `pbkeylen` (of type `() -> int`): Get pbkeylen option
- `peerlatency` (of type `() -> int`): Get peerlatency option
- `rcvbuf` (of type `() -> int`): Get rcvbuf option
- `rcvdata` (of type `() -> int`): Get rcvdata option
- `rcvlatency` (of type `() -> int`): Get rcvlatency option
- `rcvsyn` (of type `() -> bool`): Get rcvsyn option
- `rcvtimeout` (of type `() -> int`): Get rcvtimeout option
- `reuseaddr` (of type `() -> bool`): Get reuseaddr option
- `set_conntimeo` (of type `(int) -> unit`): Set conntimeo option
- `set_enforced_encryption` (of type `(bool) -> unit`): Set enforced_encryption option
- `set_ipv6only` (of type `(bool) -> unit`): Set ipv6only option
- `set_latency` (of type `(int) -> unit`): Set latency option
- `set_messageapi` (of type `(bool) -> unit`): Set messageapi option
- `set_passphrase` (of type `(string) -> unit`): Set passphrase option
- `set_payloadsize` (of type `(int) -> unit`): Set payloadsize option
- `set_pbkeylen` (of type `(int) -> unit`): Set pbkeylen option
- `set_peerlatency` (of type `(int) -> unit`): Set peerlatency option
- `set_rcvbuf` (of type `(int) -> unit`): Set rcvbuf option
- `set_rcvlatency` (of type `(int) -> unit`): Set rcvlatency option
- `set_rcvsyn` (of type `(bool) -> unit`): Set rcvsyn option
- `set_rcvtimeout` (of type `(int) -> unit`): Set rcvtimeout option
- `set_reuseaddr` (of type `(bool) -> unit`): Set reuseaddr option
- `set_sndbuf` (of type `(int) -> unit`): Set sndbuf option
- `set_sndsyn` (of type `(bool) -> unit`): Set sndsyn option
- `set_sndtimeout` (of type `(int) -> unit`): Set sndtimeout option
- `set_streamid` (of type `(string) -> unit`): Set streamid option
- `set_udp_rcvbuf` (of type `(int) -> unit`): Set udp_rcvbuf option
- `set_udp_sndbuf` (of type `(int) -> unit`): Set udp_sndbuf option
- `sndbuf` (of type `() -> int`): Get sndbuf option
- `sndsyn` (of type `() -> bool`): Get sndsyn option
- `sndtimeout` (of type `() -> int`): Get sndtimeout option
- `status` (of type `() -> string`): Socket status
- `streamid` (of type `() -> string`): Get streamid option
- `udp_rcvbuf` (of type `() -> int`): Get udp_rcvbuf option
- `udp_sndbuf` (of type `() -> int`): Get udp_sndbuf option

### `track.clock` {#track.clock}

Return the clock associated with the given track.

Type:

```
('a) -> clock where 'a is a track
```

Arguments:

- `(unlabeled)` (of type `anything that is a track`)
