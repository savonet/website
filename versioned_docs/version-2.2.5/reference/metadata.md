---
title: "Metadata"
description: "Obtain cover-art for a file. null is returned in case there is no such information."
---
### `file.cover` {#file.cover}

Obtain cover-art for a file. `null` is returned in case there is no such information.

Type:

```
(string) -> string
.{
  color_depth? : int,
  description? : string,
  format? : string,
  height? : int,
  mime : string,
  number_of_colors? : int?,
  picture_type? : int,
  width? : int}?
```

Arguments:

- `(unlabeled)` (of type `string`): File from which the cover should be obtained

### `metadata.artist` {#metadata.artist}

Extract artist from metadata.

Type:

```
([string * string]) -> string
```

Arguments:

- `(unlabeled)` (of type `[string * string]`)

### `metadata.comment` {#metadata.comment}

Extract comment from metadata.

Type:

```
([string * string]) -> string
```

Arguments:

- `(unlabeled)` (of type `[string * string]`)

### `metadata.cover` {#metadata.cover}

Extract cover from metadata. This function implements cover extraction for the following formats: coverart (ogg), apic (flac, mp3) and pic (mp3).

Type:

```
(?coverart_mime : string?, [string * string]) -> string
.{
  color_depth? : int,
  description? : string,
  format? : string,
  height? : int,
  mime : string,
  number_of_colors? : int?,
  picture_type? : int,
  width? : int}?
```

Arguments:

- `coverart_mime` (of type `string?`, which defaults to `null`): Mime type to use for `"coverart"` metadata. Support disabled if `null`.
- `(unlabeled)` (of type `[string * string]`): Metadata from which the cover should be extracted.

### `metadata.cover.remove` {#metadata.cover.remove}

Remove cover metadata. This is mostly useful in order not to flood logs with coverart when logging metadata.

Type:

```
([string * string]) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `[string * string]`)

### `metadata.deduplicate` {#metadata.deduplicate}

Remove duplicate metadata in a source.

Type:

```
(?id : string?, source('a)) -> source('a)
where 'a is a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string?`, which defaults to `"metadata.deduplicate"`): Source id
- `(unlabeled)` (of type `source('a) where 'a is a set of tracks to be muxed into a source`): source

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

### `metadata.export` {#metadata.export}

Cleanup metadata for export. This is used to remove Liquidsoap's internal metadata entries before sending them. List of exported metadata is set using `settings.encoder.metadata.export.set`.

Type:

```
([string * string]) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `[string * string]`)

### `metadata.filename` {#metadata.filename}

Extract filename from metadata.

Type:

```
([string * string]) -> string
```

Arguments:

- `(unlabeled)` (of type `[string * string]`)

### `metadata.getter` {#metadata.getter}

Create a getter from a metadata: this is a string, whose value can be changed with a metadata.

Type:

```
(string, 'a, 'c.{on_metadata : (((['a * string]) -> unit)) -> 'b}) ->
() -> string where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `string`): Initial value.
- `(unlabeled)` (of type `anything that is an orderable type`): Metadata on which the value should be updated.
- `(unlabeled)` (of type `'c.{on_metadata : (((['a * string]) -> unit)) -> 'b}
where 'a is an orderable type`): Source containing the metadata.

### `metadata.getter.float` {#metadata.getter.float}

Create a float getter from a metadata: this is a float, whose value can be changed with a metadata.

Type:

```
(float, 'a, 'c.{on_metadata : (((['a * string]) -> unit)) -> 'b}) ->
() -> float where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `float`): Initial value.
- `(unlabeled)` (of type `anything that is an orderable type`): Metadata on which the value should be updated.
- `(unlabeled)` (of type `'c.{on_metadata : (((['a * string]) -> unit)) -> 'b}
where 'a is an orderable type`): Source containing the metadata.

### `metadata.json.parse` {#metadata.json.parse}

Parse metadata from JSON object.

Type:

```
(string) -> [string * string] as json.object
```

Arguments:

- `(unlabeled)` (of type `string`)

### `metadata.json.stringify` {#metadata.json.stringify}

Export metadata as JSON object. Cover art, if found, is extracted using `metadata.cover` and exported with key `"cover"` and exported using `string.data_uri.encode`.

Type:

```
(?coverart_mime : string?, ?base64 : bool, ?compact : bool, ?json5 : bool,
 [string * string]) -> string
```

Arguments:

- `coverart_mime` (of type `string?`, which defaults to `null`): Mime type to use for `"coverart"` metadata. Support disasbled if `null`.
- `base64` (of type `bool`, which defaults to `true`)
- `compact` (of type `bool`, which defaults to `false`): Output compact text.
- `json5` (of type `bool`, which defaults to `false`): Use json5 extended spec.
- `(unlabeled)` (of type `[string * string]`)

### `metadata.title` {#metadata.title}

Extract title from metadata.

Type:

```
([string * string]) -> string
```

Arguments:

- `(unlabeled)` (of type `[string * string]`)

### `string.apic.parse` {#string.apic.parse}

Parse APIC ID3v2 tags (such as those obtained in the APIC tag from `file.metadata.id3v2`). The returned values are: mime, picture type, description, and picture data.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`): APIC data.

Methods:

- `description` (of type `string`): Description
- `mime` (of type `string`): Mime type
- `picture_type` (of type `int`): Picture type

### `string.pic.parse` {#string.pic.parse}

Parse PIC ID3v2 tags (such as those obtained in the PIC tag from `file.metadata.id3v2`). The returned values are: format, picture type, description, and picture data.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`): PIC data.

Methods:

- `description` (of type `string`): Description
- `format` (of type `string`): Picture format
- `picture_type` (of type `int`): Picture type

### `track.metadata.deduplicate` {#track.metadata.deduplicate}

Remove duplicate metadata in a track.

Type:

```
(?id : string?, metadata) -> metadata
```

Arguments:

- `id` (of type `string?`, which defaults to `"track.metadata.deduplicate"`)
- `(unlabeled)` (of type `metadata`)
