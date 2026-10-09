---
title: "File"
description: "Read the whole contents of a file."
---
### `file.contents` {#file.contents}

Read the whole contents of a file.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.copy` {#file.copy}

Copy a file. Arguments and implementation follows the POSIX `cp` command line specifications.

Type:

```
(?recursive : bool, ?force : bool, ?preserve : bool, string, string) -> unit
```

Arguments:

- `recursive` (of type `bool`, which defaults to `false`): Copy file hierarchies.
- `force` (of type `bool`, which defaults to `true`): If a file descriptor for a destination file cannot be obtained attempt to unlink the destination file and proceed.
- `preserve` (of type `bool`, which defaults to `false`): Duplicate source files attributes in the destination file.
- `(unlabeled)` (of type `string`): Source
- `(unlabeled)` (of type `string`): Destination

### `file.digest` {#file.digest}

Return an MD5 digest for the given file.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.download` {#file.download}

Download file using a regular http.get request. Returns `true` on success.

Type:

```
(filename : string, ?timeout : float, string) -> bool
```

Arguments:

- `filename` (of type `string`): Downloaded filename.
- `timeout` (of type `float`, which defaults to `5.0`): Timeout in seconds
- `(unlabeled)` (of type `string`)

### `file.exists` {#file.exists}

Returns true if the file or directory exists.

Type:

```
(string) -> bool
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.extension` {#file.extension}

Returns a file's extension.

Type:

```
(?dir_sep : string, ?leading_dot : bool, string) -> string
```

Arguments:

- `dir_sep` (of type `string`, which defaults to `"/"`): Directory separator.
- `leading_dot` (of type `bool`, which defaults to `true`): Return extension with a leading dot, e.g. `.foo`.
- `(unlabeled)` (of type `string`)

### `file.getter` {#file.getter}

Getter to the contents of a file.

Type:

```
(string) -> () -> string
```

Arguments:

- `(unlabeled)` (of type `string`): Name of the file from which the contents should be taken.

### `file.getter.float` {#file.getter.float}

Float getter from a file.

Type:

```
(?default : float, string) -> {float}
```

Arguments:

- `default` (of type `float`, which defaults to `0.0`): Default value when the file contains invalid data.
- `(unlabeled)` (of type `string`): Name of the file from which the contents should be taken.

### `file.is_directory` {#file.is_directory}

Returns true if the file exists and is a directory.

Type:

```
(string) -> bool
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.iterator` {#file.iterator}

Iterate over the contents of a file.

Type:

```
(string) -> () -> string?
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.lines` {#file.lines}

Get the list of lines of a file.

Type:

```
(string) -> [string]
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.lines.iterator` {#file.lines.iterator}

Iterate over the lines of a file.

Type:

```
(string) -> () -> string?
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.ls` {#file.ls}

List all the files in a directory.

Type:

```
(?absolute : bool, ?recursive : bool, ?pattern : string?, ?sorted : bool,
 string) -> [string]
```

Arguments:

- `absolute` (of type `bool`, which defaults to `false`): Whether to return absolute paths.
- `recursive` (of type `bool`, which defaults to `false`): Whether to look recursively in subdirectories.
- `pattern` (of type `string?`, which defaults to `null`): Pattern that the filenames should match (e.g. `"*.mp3"`).
- `sorted` (of type `bool`, which defaults to `false`): Return results in a sorted order.
- `(unlabeled)` (of type `string`): Directory to look in.

### `file.lufs` {#file.lufs}

Get the LUFS for a file (in dB).

Type:

```
(?id : string?, ?compute : bool, ?ratio : float?, string) -> float?
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `compute` (of type `bool`, which defaults to `true`): Compute LUFS if metadata tag is empty.
- `ratio` (of type `float?`, which defaults to `null`): Decoding ratio. A value of `50` means try to decode the file `50x` faster than real time, if possible. Use this setting to lower CPU peaks when computing lufs tags. Defaults to `settings.lufs.decoding_ratio` when `null`.
- `(unlabeled)` (of type `string`): File name.

### `file.metadata` {#file.metadata}

Read metadata from a file.

Type:

```
(string, ?exclude : [string]) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): File from which the metadata should be read.
- `exclude` (of type `[string]`, which defaults to `[]`): Decoders to exclude

### `file.metadata.ffmpeg` {#file.metadata.ffmpeg}

Read metadata from a file using the ffmpeg decoder.

Type:

```
(string) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): File from which the metadata should be read.

### `file.metadata.flac` {#file.metadata.flac}

Read metadata from a file using the flac decoder.

Type:

```
(string) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): File from which the metadata should be read.

### `file.metadata.flac_native` {#file.metadata.flac_native}

Read metadata from a file using the flac_native decoder.

Type:

```
(string) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): File from which the metadata should be read.

### `file.metadata.id3` {#file.metadata.id3}

Read metadata from a file using the id3 decoder.

Type:

```
(string) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): File from which the metadata should be read.

### `file.metadata.id3v1` {#file.metadata.id3v1}

Read metadata from a file using the id3v1 decoder.

Type:

```
(string) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): File from which the metadata should be read.

### `file.metadata.id3v2` {#file.metadata.id3v2}

Read metadata from a file using the id3v2 decoder.

Type:

```
(string) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): File from which the metadata should be read.

### `file.metadata.image` {#file.metadata.image}

Read metadata from a file using the image decoder.

Type:

```
(string) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): File from which the metadata should be read.

### `file.metadata.mp4` {#file.metadata.mp4}

Read metadata from a file using the mp4 decoder.

Type:

```
(string) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): File from which the metadata should be read.

### `file.metadata.native` {#file.metadata.native}

Read metadata from a file using the native decoder.

Type:

```
(string) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): File from which the metadata should be read.

### `file.metadata.ogg` {#file.metadata.ogg}

Read metadata from a file using the ogg decoder.

Type:

```
(string) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): File from which the metadata should be read.

### `file.metadata.ogg_native` {#file.metadata.ogg_native}

Read metadata from a file using the ogg_native decoder.

Type:

```
(string) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): File from which the metadata should be read.

### `file.metadata.video-metadata` {#file.metadata.video-metadata}

Read metadata from a file using the video-metadata decoder.

Type:

```
(string) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): File from which the metadata should be read.

### `file.mime` {#file.mime}

Get a file's mime type. Uses libmagic if enabled, otherwise try to get the value using the file binary. Returns `null` if no value can be found.

Type:

```
(string) -> string?
```

Arguments:

- `(unlabeled)` (of type `string`): The file to test

### `file.mime.cli` {#file.mime.cli}

Get a file's mime type by calling the `file` command line binary.

Type:

```
(string) -> string?
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.mime.extension` {#file.mime.extension}

Return the file extension associated with the given content-type if it is known.

Type:

```
(string) -> string?
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.mime.magic` {#file.mime.magic}

Get the MIME type of a file.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.mkdir` {#file.mkdir}

Create a directory.

Type:

```
(?parents : bool, ?perms : int, string) -> unit
```

Arguments:

- `parents` (of type `bool`, which defaults to `false`): Also create parent directories if they do not exist.
- `perms` (of type `int`, which defaults to `0o755`): Default file rights if created.
- `(unlabeled)` (of type `string`)

### `file.move` {#file.move}

Move a file

Type:

```
(?force : bool, ?atomic : bool, string, string) -> unit
```

Arguments:

- `force` (of type `bool`, which defaults to `false`): Do not prompt for confirmation if the destination path exists.
- `atomic` (of type `bool`, which defaults to `false`): Move the file atomically. Implies `force` and raises `error.file.cross_device` if atomic move fails because the source and destination files are not on the same partition.
- `(unlabeled)` (of type `string`): Source
- `(unlabeled)` (of type `string`): Destination

### `file.mtime` {#file.mtime}

Last modification time.

Type:

```
(string) -> float
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.open` {#file.open}

Open a file.

Type:

```
(?write : bool, ?create : bool?, ?append : bool, ?non_blocking : bool,
 ?perms : int, string) -> socket
```

Arguments:

- `write` (of type `bool`, which defaults to `false`): Open file for writing
- `create` (of type `bool?`, which defaults to `null`): Create if nonexistent. Default: `false` in read-only mode, `true` when writing.
- `append` (of type `bool`, which defaults to `false`): Append data if file exists.
- `non_blocking` (of type `bool`, which defaults to `false`): Open in non-blocking mode.
- `perms` (of type `int`, which defaults to `0o644`): Default file rights if created.
- `(unlabeled)` (of type `string`)

Methods:

- `close` (of type `() -> unit`): Close the socket.
- `closed` (of type `() -> bool`): `true` if the socket is already closed.
- `non_blocking` (of type `(bool) -> unit`): Set the non-blocking flag on the socket
- `read` (of type `((?timeout : float?) -> string)
.{wait : (?timeout : float?, (() -> unit)) -> unit}`): Read data from a socket. Reading is done when the function returns an empty string `""`.
- `type` (of type `string`): Socket type
- `write` (of type `((?timeout : float?, string) -> unit)
.{wait : (?timeout : float?, (() -> unit)) -> unit}`): Write data to a socket

### `file.read` {#file.read}

Read the content of a file. Returns a function of type `()->string`. File is done reading when function returns the empty string `""`.

Type:

```
(string) -> () -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

Methods:

- `close` (of type `() -> unit`): Close the underlying file descriptor without waiting for the whole file to be read.

### `file.remove` {#file.remove}

Remove a file.

Type:

```
(string) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.replaygain` {#file.replaygain}

Get the ReplayGain for a file (in dB).               Use this setting to lower CPU peaks when computing replaygain tags.

Type:

```
(?id : string?, ?compute : bool, ?ratio : float, string) -> float?
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `compute` (of type `bool`, which defaults to `true`): Compute ReplayGain if metadata tag is empty.
- `ratio` (of type `float`, which defaults to `50.0`): Decoding ratio. A value of `50` means try to decode the file `50x` faster than real time, if possible.
- `(unlabeled)` (of type `string`): File name.

### `file.rmdir` {#file.rmdir}

Remove a directory and its content.

Type:

```
(string) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.size` {#file.size}

File size in bytes.

Type:

```
(string) -> int
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.temp` {#file.temp}

Return a fresh temporary filename. The temporary file is created empty, with permissions 0o600 (readable and writable only by the file owner).

Type:

```
(?cleanup : bool, ?directory : string?, string, string) -> string
```

Arguments:

- `cleanup` (of type `bool`, which defaults to `false`): Delete the file on shutdown
- `directory` (of type `string?`, which defaults to `null`): Directory where to create the file.
- `(unlabeled)` (of type `string`): File suffix
- `(unlabeled)` (of type `string`): File prefix

### `file.temp_dir` {#file.temp_dir}

Return a fresh temporary directory name. The temporary directory is created empty, in the default tmp directory, with permissions 0o700 (readable, writable and listable only by the file owner).

Type:

```
(?cleanup : bool, string, ?string) -> string
```

Arguments:

- `cleanup` (of type `bool`, which defaults to `false`): Delete the file on shutdown
- `(unlabeled)` (of type `string`): Directory name suffix.
- `(unlabeled)` (of type `string`, which defaults to `""`): Directory name prefix.

### `file.touch` {#file.touch}

Ensure that a file exists, creating it empty if it does not.

Type:

```
(?perms : int, string) -> unit
```

Arguments:

- `perms` (of type `int`, which defaults to `0o644`)
- `(unlabeled)` (of type `string`): Path of the file.

### `file.umask` {#file.umask}

Get the process's file mode creation mask.

Type:

```
() -> int
```

### `file.umask.set` {#file.umask.set}

Set process's file mode creation mask.

Type:

```
(int) -> unit
```

Arguments:

- `(unlabeled)` (of type `int`)

### `file.watch` {#file.watch}

Call a function when a file is modified. Returns unwatch function in `unwatch` method.

Type:

```
(string, (() -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): File to watch.
- `(unlabeled)` (of type `() -> unit`): Handler function.

Methods:

- `unwatch` (of type `() -> unit`): Function to remove the watch on the file.

### `file.which` {#file.which}

`file.which("progname")` looks for an executable named "progname" using directories from the PATH environment variable and returns "" if it could not find one.

Type:

```
(string) -> string?
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.write` {#file.write}

Write data to a file.

Type:

```
(data : {string?}, ?perms : int, ?append : bool, ?atomic : bool,
 ?temp_dir : string?, string) -> unit
```

Arguments:

- `data` (of type `{string?}`): Data to write. If passing a callback `() -> string?`, the callback must return `null` or `""` when it has finished sending all its data.
- `perms` (of type `int`, which defaults to `0o644`): Default file rights if created. Default: `0o644`.
- `append` (of type `bool`, which defaults to `false`): Append data if file exists.
- `atomic` (of type `bool`, which defaults to `false`): Make the write atomic by writing to a temporary file and moving the file to destination once writing has succeeded.
- `temp_dir` (of type `string?`, which defaults to `null`): Temporary directory for atomic write.
- `(unlabeled)` (of type `string`): Path to write to.

### `file.write.stream` {#file.write.stream}

Stream data to a file. Returns a callback to write to the file. Execute with `null` or `""` to signify the end of the writing operation.

Type:

```
(?perms : int, ?append : bool, ?atomic : bool, ?temp_dir : string?, string) ->
(string?) -> unit
```

Arguments:

- `perms` (of type `int`, which defaults to `0o644`): Default file rights if created. Default: `0o644`.
- `append` (of type `bool`, which defaults to `false`): Append data if file exists.
- `atomic` (of type `bool`, which defaults to `false`): Make the write atomic by writing to a temporary file and moving the file to destination once writing has succeeded.
- `temp_dir` (of type `string?`, which defaults to `null`): Temporary directory for atomic write.
- `(unlabeled)` (of type `string`): Path to write to

### `medialib` {#medialib}

A library to store the metadata of files in given folders and query them. This is useful to generate playlists based on metadata.

Type:

```
(?id : string?, ?persistency : string?, ?refresh : float?,
 ?standardize : (([string * string]) -> [string * string]),
 ?initial_progress : bool, ?directories : [string], ?string?) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`)
- `persistency` (of type `string?`, which defaults to `null`): Store the database in given file, which is reuse to populate the database on next run.
- `refresh` (of type `float?`, which defaults to `null`): Scan directories for new files every given number of seconds (by default the database is never updated).
- `standardize` (of type `([string * string]) -> [string * string]`, which defaults to `<fun>`): Function mapped on metadata when indexing. It can be used to change the field names to standard ones, pretreat data, etc.
- `initial_progress` (of type `bool`, which defaults to `true`): Show progress of library being indexed at startup.
- `directories` (of type `[string]`, which defaults to `[]`): Directories to look for files in.
- `(unlabeled)` (of type `string?`, which defaults to `null`): Directory to look for files in.

Methods:

- `add_directory` (of type `(string) -> unit`): Add a new directory which should be scanned.
- `clear` (of type `() -> unit`): Remove all known metadata.
- `find` (of type `(?case_sensitive : bool, ?artist : string?, ?artist_contains : string?,
 ?artist_matches : string?, ?album : string?, ?genre : string?,
 ?title : string?, ?title_contains : string?, ?filename : string?,
 ?filename_contains : string?, ?filename_matches : string?, ?year : int?,
 ?year_ge : int?, ?year_lt : int?, ?bpm : int?, ?bpm_ge : int?,
 ?bpm_lt : int?, ?predicate : (([string * string]) -> bool)) -> [string]`): Find files according to conditions on metadata.
- `refresh` (of type `() -> unit`): Update metadatas and look for new files.

### `medialib.sqlite` {#medialib.sqlite}

A library to store the metadata of files in given folders and query them. This is useful to generate playlists based on metadata. This version use an SQL implementation which should be much faster and less memory consuming than the basic one.

Type:

```
(?id : string?, database : string, ?refresh : float?,
 ?standardize : (([string * string]) -> [string * string]),
 ?initial_progress : bool, ?directories : [string], ?string?) -> unit
```

Arguments:

- `id` (of type `string?`, which defaults to `null`)
- `database` (of type `string`)
- `refresh` (of type `float?`, which defaults to `null`): Scan directories for new files every given number of seconds (by default the database is never updated).
- `standardize` (of type `([string * string]) -> [string * string]`, which defaults to `<fun>`): Function mapped on metadata when indexing. It can be used to change the field names to standard ones, pretreat data, etc.
- `initial_progress` (of type `bool`, which defaults to `true`): Show progress of library being indexed at startup.
- `directories` (of type `[string]`, which defaults to `[]`): Directories to look for files in.
- `(unlabeled)` (of type `string?`, which defaults to `null`): Directory to look for files in.

Methods:

- `add_directory` (of type `(string) -> unit`): Add a new directory which should be scanned.
- `clear` (of type `() -> unit`): Remove all known metadata.
- `find` (of type `(?case_sensitive : bool, ?artist : string?, ?artist_contains : string?,
 ?artist_matches : string?, ?album : string?, ?genre : string?,
 ?title : string?, ?title_contains : string?, ?filename : string?,
 ?filename_contains : string?, ?filename_matches : string?, ?year : 'A?,
 ?year_ge : 'B?, ?year_lt : 'C?, ?bpm : 'D?, ?bpm_ge : 'E?, ?bpm_lt : 'F?,
 ?condition : string?) -> [string]`): Find files according to conditions on metadata.
- `refresh` (of type `() -> unit`): Update metadatas and look for new files.

### `path.basename` {#path.basename}

Get the base name of a path, i.e. the name of the file without the full path. For instance `file.basename("/tmp/folder/bla.mp3")` returns `"bla.mp3"`.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `path.concat` {#path.concat}

Concatenate two paths, using the appropriate directory separator.

Type:

```
(string, string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)
- `(unlabeled)` (of type `string`)

### `path.dirname` {#path.dirname}

Get the directory name of a path.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `path.home.unrelate` {#path.home.unrelate}

Expand path that start with '~' with the current home directory.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `path.remove_extension` {#path.remove_extension}

Remove the file extension from a path.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `playlist.files` {#playlist.files}

Retrieve the list of files contained in a playlist.

Type:

```
(?id : string?, ?mime_type : string?, ?timeout : float?, string) -> [string]
```

Arguments:

- `id` (of type `string?`, which defaults to `null`)
- `mime_type` (of type `string?`, which defaults to `null`): Default MIME type for the playlist. `null` means automatic detection.
- `timeout` (of type `float?`, which defaults to `null`): Timeout for resolving the playlist
- `(unlabeled)` (of type `string`): Path to the playlist

### `socket.unix.client` {#socket.unix.client}

Open a named UNIX socket and connect as a client.

Type:

```
(?non_blocking : bool, string) -> socket
```

Arguments:

- `non_blocking` (of type `bool`, which defaults to `false`): Open in non-blocking mode.
- `(unlabeled)` (of type `string`)

Methods:

- `close` (of type `() -> unit`): 
- `read` (of type `((?timeout : float?) -> string)
.{wait : (?timeout : float?, (() -> unit)) -> unit}`): 
- `type` (of type `string`): 
- `write` (of type `((?timeout : float?, string) -> unit)
.{wait : (?timeout : float?, (() -> unit)) -> unit}`): 

### `socket.unix.listen` {#socket.unix.listen}

Open a named socket and wait for a client to connect

Type:

```
(?non_blocking : bool, string) -> socket
```

Arguments:

- `non_blocking` (of type `bool`, which defaults to `false`): Open in non-blocking mode.
- `(unlabeled)` (of type `string`)

Methods:

- `close` (of type `() -> unit`): 
- `read` (of type `((?timeout : float?) -> string)
.{wait : (?timeout : float?, (() -> unit)) -> unit}`): 
- `type` (of type `string`): 
- `write` (of type `((?timeout : float?, string) -> unit)
.{wait : (?timeout : float?, (() -> unit)) -> unit}`): 
