---
title: "Liquidsoap"
description: "Assign a new clock to the given source (and to other time-dependent sources) and return the source. It is a conveniency wrapper around…"
---
### `clock` {#clock}

Assign a new clock to the given source (and to other time-dependent sources) and return the source. It is a conveniency wrapper around clock.assign_new(), allowing more concise scripts in some cases.

Type:

```
(?sync : string, ?id : string?, source('a)) -> source('a)
```

Arguments:

- `sync` (of type `string`, which defaults to `"auto"`): Synchronization mode. One of: `"auto"`, `"cpu"`, or `"none"`. Defaults to `"auto"`, which synchronizes with the CPU clock if none of the active sources are attached to their own clock (e.g. ALSA input, etc). `"cpu"` always synchronizes with the CPU clock. `"none"` removes all synchronization control.
- `id` (of type `string?`, which defaults to `null`)
- `(unlabeled)` (of type `source('a)`)

### `clock.assign_new` {#clock.assign_new}

Create a new clock and assign it to a list of sources.

Type:

```
(?id : string?,
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
               }) -> unit)?,
 ?sync : string, [source('a)]) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Identifier for the new clock. The default empty string means that the identifier of the first source will be used.
- `on_error` (of type `((error
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
  }) -> unit)?`, which defaults to `null`): Error callback executed when a streaming error occurs. When passed, all streaming
errors are silenced. Intended mostly for debugging purposes.
- `sync` (of type `string`, which defaults to `"auto"`): Synchronization mode. One of: `"auto"`, `"cpu"`, or `"none"`. Defaults to `"auto"`, which synchronizes with the CPU clock if none of the active sources are attached to their own clock (e.g. ALSA input, etc). `"cpu"` always synchronizes with the CPU clock. `"none"` removes all synchronization control.
- `(unlabeled)` (of type `[source('a)]`): List of sources to which the new clock will be assigned.

### `clock.log` {#clock.log}

Create a log of clock times for all the clocks initially present. The log is in a simple format which you can directly use with gnuplot.

Type:

```
(?delay : float, ?every : float, string) -> unit
```

Arguments:

- `delay` (of type `float`, which defaults to `0.`): Delay before setting up the clock logger. This should be used to ensure that the logger starts only after the clocks are created.
- `every` (of type `float`, which defaults to `1.`): Polling interval.
- `(unlabeled)` (of type `string`): Path of the log file.

### `clock.status` {#clock.status}

Get the current time (in clock ticks) for all allocated clocks.

Type:

```
() -> [string * int]
```

### `clock.status.seconds` {#clock.status.seconds}

Get the current time in seconds for all allocated clocks.

Type:

```
() -> [string * float]
```

### `clock.unify` {#clock.unify}

Enforce that a list of sources all belong to the same clock.

Type:

```
([source('a)]) -> unit
```

Arguments:

- `(unlabeled)` (of type `[source('a)]`)

### `decoder.add` {#decoder.add}

Register an external decoder. The encoder should output in WAV format to his standard output (stdout) and read data from its standard input (stdin).

Type:

```
(name : string, description : string, ?mimes : [string],
 ?file_extensions : [string], ?priority : int, test : ((string) -> int),
 string) -> unit
```

Arguments:

- `name` (of type `string`): Format/decoder's name.
- `description` (of type `string`): Description of the decoder.
- `mimes` (of type `[string]`, which defaults to `[]`): List of mime types supported by this decoder. Empty means any mime type should be accepted.
- `file_extensions` (of type `[string]`, which defaults to `[]`): List of file extensions. Empty means any file extension should be accepted.
- `priority` (of type `int`, which defaults to `1`): Decoder priority
- `test` (of type `(string) -> int`): Function used to determine if a file should be decoded by the decoder. Returned values are: 0: no decodable audio, -1: decodable audio but number of audio channels unknown, x: fixed number of decodable audio channels.
- `(unlabeled)` (of type `string`): Process to start.

### `decoder.metadata.add` {#decoder.metadata.add}

Register an external file metadata decoder.

Type:

```
(?priority : {int}, string,
 ((metadata : [string * string], string) -> [string * string])) -> unit
```

Arguments:

- `priority` (of type `{int}`, which defaults to `1`): Resolver's priority.
- `(unlabeled)` (of type `string`): Format/resolver's name.
- `(unlabeled)` (of type `(metadata : [string * string], string) -> [string * string]`): Process to start. The function takes the format and filename as argument and returns a list of (name,value) fields.

### `decoder.oblivious.add` {#decoder.oblivious.add}

Register an external file decoder. The encoder should output in WAV format to his standard output (stdout) and read data from the file it receives. The estimated remaining duration for this decoder will be unknown until the `buffer` last seconds of the file. If possible, it is recommended to decode from stdin and use `decoder.add`.

Type:

```
(name : string, description : string, test : ((string) -> int),
 ?priority : int, ?mimes : [string], ?file_extensions : [string],
 ?buffer : float, ((string) -> string)) -> unit
```

Arguments:

- `name` (of type `string`): Format/decoder's name.
- `description` (of type `string`): Description of the decoder.
- `test` (of type `(string) -> int`): Function used to determine if a file should be decoded by the decoder. Returned values are: 0: no decodable audio, -1: decodable audio but number of audio channels unknown, x: fixed number of decodable audio channels.
- `priority` (of type `int`, which defaults to `1`): Decoder priority
- `mimes` (of type `[string]`, which defaults to `[]`): List of mime types supported by this decoder. Empty means any mime type should be accepted.
- `file_extensions` (of type `[string]`, which defaults to `[]`): List of file extensions. Empty means any file extension should be accepted.
- `buffer` (of type `float`, which defaults to `5.`)
- `(unlabeled)` (of type `(string) -> string`): Process to start. The function takes the filename as argument and returns the process to start.

### `enable_autocue_metadata` {#enable_autocue_metadata}

Enable autocue metadata resolver. This resolver will process any file decoded by Liquidsoap and add cue-in/out and crossfade metadata when these values can be computed. This function sets `settings.request.prefetch` to `2` to account for the latency introduced by the `autocue` computation when resolving reausts and sets `settings.crossfade.assume_autocue` to `true` as well. For a finer-grained processing, use the `autocue:` protocol.

Type:

```
() -> unit
```

### `enable_external_faad_decoder` {#enable_external_faad_decoder}

Enable or disable external FAAD (AAC/AAC+/M4A) decoders. Does not work on Win32. Please note that built-in support for faad is available in liquidsoap if compiled and should be preferred over the external decoder.

Type:

```
() -> unit
```

### `enable_external_ffmpeg_decoder` {#enable_external_ffmpeg_decoder}

Enable ffmpeg decoder.

Type:

```
() -> unit
```

### `enable_external_flac_decoder` {#enable_external_flac_decoder}

Enable external FLAC decoders. Please note that built-in support for FLAC is available in liquidsoap if compiled and should be preferred over the external decoder.

Type:

```
() -> unit
```

### `enable_external_mpc_decoder` {#enable_external_mpc_decoder}

Enable external Musepack decoder.

Type:

```
() -> unit
```

### `enable_replaygain_metadata` {#enable_replaygain_metadata}

Enable ReplayGain metadata resolver. This resolver will process any file decoded by Liquidsoap and add a `replaygain_track_gain` metadata when this value could be computed. For a finer-grained replay gain processing, use the `replaygain:` protocol.

Type:

```
(?ratio : float) -> unit
```

Arguments:

- `ratio` (of type `float`, which defaults to `50.`): Decoding ratio. A value of `50.` means try to decode the file `50x` faster than real time, if possible. Use this setting to lower CPU peaks when computing replaygain tags.

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

Parse CUE playlists

Type:

```
(string, ?pwd : string?) -> [[string * string] * string]
```

Arguments:

- `(unlabeled)` (of type `string`): Playlist file
- `pwd` (of type `string?`, which defaults to `null`): Current directory to use for relative file path.

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
(format : string, strict : bool,
 ((?pwd : string, string) -> [[string * string] * string])) -> unit
```

Arguments:

- `format` (of type `string`): Playlist format. If possible, a mime-type.
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

- `window` (of type `float`, which defaults to `5.`): Window over which mean and peak metrics are reported.
- `prefix` (of type `string`, which defaults to `"liquidsoap_"`): Prefix for the metric's name
- `labels` (of type `[string]`): labels for the metric

### `protocol.add` {#protocol.add}

Register a new protocol.

Type:

```
(?temporary : bool, ?static : bool, ?syntax : string, ?doc : string, string,
 ((rlog : ((string) -> unit), maxtime : float, string) -> [string])) -> unit
```

Arguments:

- `temporary` (of type `bool`, which defaults to `false`): if true, file is removed when it is finished.
- `static` (of type `bool`, which defaults to `false`): if true, then requests can be resolved once and for all. Typically, static protocols can be used to create infallible sources.
- `syntax` (of type `string`, which defaults to `"Undocumented"`): URI syntax.
- `doc` (of type `string`, which defaults to `"Undocumented"`): Protocol documentation.
- `(unlabeled)` (of type `string`): Protocol name. Resolver will be called on uris of the form: `<protocol name>:...`.
- `(unlabeled)` (of type `(rlog : ((string) -> unit), maxtime : float, string) -> [string]`): Protocol resolver. Receives a function to log protocol resolution, the `<arg>` in `<protocol name>:<arg>` and the max delay that resolution should take.

### `request.create` {#request.create}

Create a request from an URI.

Type:

```
(?indicators : [string], ?cue_in_metadata : string?,
 ?cue_out_metadata : string?, ?persistent : bool, ?resolve_metadata : bool,
 ?excluded_metadata_resolvers : [string], ?temporary : bool, string) ->
request
```

Arguments:

- `indicators` (of type `[string]`, which defaults to `[]`)
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
(?resolve_metadata : bool, ?metadata : [string * string], ?timeout : float,
 string) -> float?
```

Arguments:

- `resolve_metadata` (of type `bool`, which defaults to `true`): Set to `false` to prevent metadata resolution on this request.
- `metadata` (of type `[string * string]`, which defaults to `[]`): Optional metadata used to decode the file, e.g. `ffmpeg_options`.
- `timeout` (of type `float`, which defaults to `30.`): Limit in seconds to the duration of the resolving.
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

### `request.read_metadata` {#request.read_metadata}

Force reading the metadata of a request.

Type:

```
(request) -> unit
```

Arguments:

- `(unlabeled)` (of type `request`)

### `request.resolve` {#request.resolve}

Resolve a request, i.e. attempt to get a valid local file. The operation can take some time. Return true if the resolving was successful, false otherwise (timeout or invalid URI). The request should not be decoded afterward: this is mostly useful to download files such as playlists, etc.

Type:

```
(?content_type : source('a)?, ?timeout : float, request) -> bool
```

Arguments:

- `content_type` (of type `source('a)?`, which defaults to `null`): If specified, the request will be decoded with the same content type as the given source.
- `timeout` (of type `float`, which defaults to `30.`): Limit in seconds to the duration of the resolving.
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

### `runtime.memory` {#runtime.memory}

Returns information about the system and process' memory usage. Requires `mem_usage` for a full report.

Type:

```
() -> unit
```

Methods:

- `pretty` (of type `
{
  process_managed_memory : string,
  process_physical_memory : string,
  process_private_memory : string,
  process_swapped_memory : string,
  process_virtual_memory : string,
  total_physical_memory : string,
  total_used_physical_memory : string,
  total_used_virtual_memory : string,
  total_virtual_memory : string
}`): 
- `process_managed_memory` (of type `int`): 
- `process_physical_memory` (of type `int`): 
- `process_private_memory` (of type `int`): 
- `process_swapped_memory` (of type `int`): 
- `process_virtual_memory` (of type `int`): 
- `total_physical_memory` (of type `int`): 
- `total_used_physical_memory` (of type `int`): 
- `total_used_virtual_memory` (of type `int`): 
- `total_virtual_memory` (of type `int`): 

### `seconds_of_main` {#seconds_of_main}

Convert a number of main ticks in seconds.

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
