---
title: "Source / Video processing"
description: "Generate a source from a static image."
---
### `image` {#image}

Generate a source from a static image.

Type:

```
(?id : string?, ?fallible : bool, ?width : {int}?, ?height : {int}?,
 ?x : {int}, ?y : {int}, {string}) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `fallible` (of type `bool`, which defaults to `false`): Whether we are allowed to fail (in case the file is non-existent or invalid).
- `width` (of type `{int}?`, which defaults to `null`): Scale to width
- `height` (of type `{int}?`, which defaults to `null`): Scale to height
- `x` (of type `{int}`, which defaults to `0`): x position.
- `y` (of type `{int}`, which defaults to `0`): y position.
- `(unlabeled)` (of type `{string}`): Path to the image.

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
- `set` (of type `(string) -> unit`): Change the image.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `video.add_image` {#video.add_image}

Add a static image on the source video channel.

Type:

```
(?id : string?, ?width : {int}?, ?height : {int}?, ?x : {int}, ?y : {int},
 file : {string}, source(video=canvas('a), 'b)) -> source(video=canvas('a),
'b) where 'b is a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string?`, which defaults to `"video.add_image"`): Force the value of the source ID.
- `width` (of type `{int}?`, which defaults to `null`): Scale to width
- `height` (of type `{int}?`, which defaults to `null`): Scale to height
- `x` (of type `{int}`, which defaults to `0`): x position.
- `y` (of type `{int}`, which defaults to `0`): y position.
- `file` (of type `{string}`): Path to the image file.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)
where 'b is a set of tracks to be muxed into a source`)

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

### `video.add_line` {#video.add_line}

Draw a line on the video.

Type:

```
(?id : string?, ?alpha : {float}, ?color : {int}, {int * int}, {int * int},
 source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `alpha` (of type `{float}`, which defaults to `1.`): Transparency of the color between 0 and 1 (0 is fully transparent and 1 is fully opaque).
- `color` (of type `{int}`, which defaults to `0`): Color to fill the image with (0xRRGGBB).
- `(unlabeled)` (of type `{int * int}`): Start point.
- `(unlabeled)` (of type `{int * int}`): End point.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.add_rectangle` {#video.add_rectangle}

Draw a rectangle.

Type:

```
(?id : string?, ?alpha : {float}, ?color : {int}, height : {int},
 width : {int}, ?x : {int}, ?y : {int}, source(video=canvas('a), 'b)) ->
source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `alpha` (of type `{float}`, which defaults to `1.`): Transparency of the color between 0 and 1 (0 is fully transparent and 1 is fully opaque).
- `color` (of type `{int}`, which defaults to `0`): Color to fill the image with (0xRRGGBB).
- `height` (of type `{int}`): Height.
- `width` (of type `{int}`): Width.
- `x` (of type `{int}`, which defaults to `0`): Horizontal offset.
- `y` (of type `{int}`, which defaults to `0`): Vertical offset.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.add_subtitle` {#video.add_subtitle}

Add subtitle from metadata.

Type:

```
(?override : string, ?size : int, ?color : int, ?offset : int,
 source(video=canvas('A), 'a)) -> source(video=canvas('A), 'a)
where 'a is a set of tracks to be muxed into a source
```

Arguments:

- `override` (of type `string`, which defaults to `"subtitle"`): Metadata where subtitle to display are located.
- `size` (of type `int`, which defaults to `18`)
- `color` (of type `int`, which defaults to `16777215`)
- `offset` (of type `int`, which defaults to `20`): Offset in pixels.
- `(unlabeled)` (of type `source(video=canvas('A), 'a)
where 'a is a set of tracks to be muxed into a source`): Source.

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

### `video.add_text` {#video.add_text}

Add a text to a stream. Uses the first available operator in: camlimages, SDL, FFmpeg, GStreamer, gd or native.

Type:

```
(?id : string?, ?duration : float?, ?color : int, ?cycle : bool,
 ?font : {string}?, ?metadata : string?, ?size : int, ?speed : int,
 ?x : {int}, ?y : {int}, ?on_cycle : (() -> unit), {string},
 source(video=canvas('A), 'a).{is_ready : () -> bool}) ->
source(video=canvas('A), 'a)
where 'a is a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `duration` (of type `float?`, which defaults to `null`)
- `color` (of type `int`, which defaults to `16777215`): Text color (in 0xRRGGBB format).
- `cycle` (of type `bool`, which defaults to `true`): Cycle text when it reaches left boundary.
- `font` (of type `{string}?`, which defaults to `null`): Path to ttf font file.
- `metadata` (of type `string?`, which defaults to `null`): Change text on a particular metadata (empty string means disabled).
- `size` (of type `int`, which defaults to `18`): Font size.
- `speed` (of type `int`, which defaults to `0`): Horizontal speed in pixels per second (`0` means no scrolling and update according to `x` and `y` in case they are variable).
- `x` (of type `{int}`, which defaults to `10`): x offset.
- `y` (of type `{int}`, which defaults to `10`): y offset.
- `on_cycle` (of type `() -> unit`, which defaults to `{()}`): Function called when text is cycling.
- `(unlabeled)` (of type `{string}`): d Text to display.
- `(unlabeled)` (of type `source(video=canvas('A), 'a).{is_ready : () -> bool}
where 'a is a set of tracks to be muxed into a source`)

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

### `video.add_text.ffmpeg.internal` {#video.add_text.ffmpeg.internal}

Display a text.

Type:

```
(?id : string?, ?color : int, ?cycle : bool, ?font : string?,
 ?duration : float?, ?metadata : string?, ?size : int, ?speed : int,
 ?x : {int}, ?y : {int}, {string}, source(audio=pcm('b), video=canvas('a))) ->
source(audio=pcm('c), video=canvas('d))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `color` (of type `int`, which defaults to `16777215`): Text color (in 0xRRGGBB format).
- `cycle` (of type `bool`, which defaults to `true`): Cycle text when it reaches left boundary.
- `font` (of type `string?`, which defaults to `null`): Path to ttf font file.
- `duration` (of type `float?`, which defaults to `null`)
- `metadata` (of type `string?`, which defaults to `null`): Change text on a particular metadata (empty string means disabled).
- `size` (of type `int`, which defaults to `18`): Font size.
- `speed` (of type `int`, which defaults to `70`): Horizontal speed in pixels per second (0 means no scrolling and update according to x and y in case they are variable).
- `x` (of type `{int}`, which defaults to `10`): x offset.
- `y` (of type `{int}`, which defaults to `10`): y offset.
- `(unlabeled)` (of type `{string}`): d Text to display.
- `(unlabeled)` (of type `source(audio=pcm('b), video=canvas('a))`)

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

### `video.add_text.ffmpeg.raw` {#video.add_text.ffmpeg.raw}

Display a text. Use this operator inside ffmpeg filters with a input source

Type:

```
(?color : int, ?cycle : bool, ?font : string?, ?metadata : string?,
 ?size : int, ?speed : int, ?x : {int}, ?y : {int},
 graph : ffmpeg.filter.graph, ?{string}, source(video=ffmpeg.video.raw('a),
 'b)) -> ffmpeg.filter.video
```

Arguments:

- `color` (of type `int`, which defaults to `16777215`): Text color (in 0xRRGGBB format).
- `cycle` (of type `bool`, which defaults to `true`): Cycle text when it reaches left boundary.
- `font` (of type `string?`, which defaults to `null`): Path to ttf font file.
- `metadata` (of type `string?`, which defaults to `null`): Change text on a particular metadata (empty string means disabled).
- `size` (of type `int`, which defaults to `18`): Font size.
- `speed` (of type `int`, which defaults to `70`): Horizontal speed in pixels per second (0 means no scrolling and update according to x and y in case they are variable).
- `x` (of type `{int}`, which defaults to `10`): x offset.
- `y` (of type `{int}`, which defaults to `10`): y offset.
- `graph` (of type `ffmpeg.filter.graph`): a ffmpeg filter graph to attach this filter to.
- `(unlabeled)` (of type `{string}`, which defaults to `""`): d Text to display.
- `(unlabeled)` (of type `source(video=ffmpeg.video.raw('a), 'b)`)

### `video.add_text.ffmpeg.raw.filter` {#video.add_text.ffmpeg.raw.filter}

Display a text. Use this operator inside ffmpeg filters with a ffmpeg video input Returns a ffmpeg video output with `on_change` and `on_metadata` methods to be used to update the output text.

Type:

```
(?color : int, ?cycle : bool, ?font : string?, ?metadata : string?,
 ?size : int, ?speed : int, ?x : {int}, ?y : {int},
 graph : ffmpeg.filter.graph, ?{string}, ffmpeg.filter.video) ->
ffmpeg.filter.video
```

Arguments:

- `color` (of type `int`, which defaults to `16777215`): Text color (in 0xRRGGBB format).
- `cycle` (of type `bool`, which defaults to `true`): Cycle text when it reaches left boundary.
- `font` (of type `string?`, which defaults to `null`): Path to ttf font file.
- `metadata` (of type `string?`, which defaults to `null`): Change text on a particular metadata (empty string means disabled).
- `size` (of type `int`, which defaults to `18`): Font size.
- `speed` (of type `int`, which defaults to `70`): Horizontal speed in pixels per second (0 means no scrolling and update according to x and y in case they are variable).
- `x` (of type `{int}`, which defaults to `10`): x offset.
- `y` (of type `{int}`, which defaults to `10`): y offset.
- `graph` (of type `ffmpeg.filter.graph`): a ffmpeg filter graph to attach this filter to.
- `(unlabeled)` (of type `{string}`, which defaults to `""`): d Text to display.
- `(unlabeled)` (of type `ffmpeg.filter.video`)

Methods:

- `on_change` (of type `() -> unit`): Method to call when parameters have changed to update the filter's rendered out, including when text changes.
- `on_metadata` (of type `([string * string]) -> unit`): Method to call on new metadata.

### `video.add_text.native` {#video.add_text.native}

Add a text to a stream (native implementation).

Type:

```
(?id : string?, ?duration : float?, ?color : {int}, ?cycle : bool,
 ?font : {string}?, ?metadata : string?, ?size : {int}, ?speed : int,
 ?x : {int}, ?y : {int}, ?on_cycle : (() -> unit), {string},
 source(video=canvas('B), 'A).{is_ready : () -> bool}) ->
source(video=canvas('B), 'A)
where 'A is a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `duration` (of type `float?`, which defaults to `null`)
- `color` (of type `{int}`, which defaults to `16777215`): Text color (in 0xRRGGBB format).
- `cycle` (of type `bool`, which defaults to `true`): Cycle text when it reaches left boundary.
- `font` (of type `{string}?`, which defaults to `null`): Path to ttf font file.
- `metadata` (of type `string?`, which defaults to `null`): Change text on a particular metadata (empty string means disabled).
- `size` (of type `{int}`, which defaults to `18`): Font size.
- `speed` (of type `int`, which defaults to `0`): Horizontal speed in pixels per second (`0` means no scrolling and update according to `x` and `y` in case they are variable).
- `x` (of type `{int}`, which defaults to `10`): x offset.
- `y` (of type `{int}`, which defaults to `10`): y offset.
- `on_cycle` (of type `() -> unit`, which defaults to `{()}`)
- `(unlabeled)` (of type `{string}`): d Text to display.
- `(unlabeled)` (of type `source(video=canvas('B), 'A).{is_ready : () -> bool}
where 'A is a set of tracks to be muxed into a source`)

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

### `video.add_text.sdl` {#video.add_text.sdl}

Add a text to a stream (SDL implementation).

Type:

```
(?id : string?, ?duration : float?, ?color : {int}, ?cycle : bool,
 ?font : {string}?, ?metadata : string?, ?size : {int}, ?speed : int,
 ?x : {int}, ?y : {int}, ?on_cycle : (() -> unit), {string},
 source(video=canvas('B), 'A).{is_ready : () -> bool}) ->
source(video=canvas('B), 'A)
where 'A is a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `duration` (of type `float?`, which defaults to `null`)
- `color` (of type `{int}`, which defaults to `16777215`): Text color (in 0xRRGGBB format).
- `cycle` (of type `bool`, which defaults to `true`): Cycle text when it reaches left boundary.
- `font` (of type `{string}?`, which defaults to `null`): Path to ttf font file.
- `metadata` (of type `string?`, which defaults to `null`): Change text on a particular metadata (empty string means disabled).
- `size` (of type `{int}`, which defaults to `18`): Font size.
- `speed` (of type `int`, which defaults to `0`): Horizontal speed in pixels per second (`0` means no scrolling and update according to `x` and `y` in case they are variable).
- `x` (of type `{int}`, which defaults to `10`): x offset.
- `y` (of type `{int}`, which defaults to `10`): y offset.
- `on_cycle` (of type `() -> unit`, which defaults to `{()}`)
- `(unlabeled)` (of type `{string}`): d Text to display.
- `(unlabeled)` (of type `source(video=canvas('B), 'A).{is_ready : () -> bool}
where 'A is a set of tracks to be muxed into a source`)

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

### `video.align` {#video.align}

Translate the video so that it is aligned on boundaries.

Type:

```
(?id : string?, ?bottom : bool, ?left : bool, ?right : bool, ?top : bool,
 source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `bottom` (of type `bool`, which defaults to `false`): Align bottom.
- `left` (of type `bool`, which defaults to `false`): Align left.
- `right` (of type `bool`, which defaults to `false`): Align right.
- `top` (of type `bool`, which defaults to `false`): Align top.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.alpha.movement` {#video.alpha.movement}

Make moving parts visible and non-moving parts transparent. A cheap way to have a bluescreen.

Type:

```
(?id : string?, ?precision : float, source(video=canvas('a), 'b)) ->
source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `precision` (of type `float`, which defaults to `0.2`): Precision when comparing pixels to those of previous image (between 0 and 1).
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.alpha.of_color` {#video.alpha.of_color}

Set a color to be transparent.

Type:

```
(?id : string?, ?color : int, ?precision : float, source(video=canvas('a),
 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `color` (of type `int`, which defaults to `0`): Color which should be transparent (in 0xRRGGBB format).
- `precision` (of type `float`, which defaults to `0.2`): Precision in color matching (0. means match precisely the color and 1. means match every color).
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.alpha.remove` {#video.alpha.remove}

Remove α channel.

Type:

```
(?id : string?, source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.alpha.to_y` {#video.alpha.to_y}

Convert the α channel to Y channel, thus converting opaque (resp. transparent) pixels to bright (resp. dark) ones. This is useful to observe the α channel.

Type:

```
(?id : string?, source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.board` {#video.board}

A plane where one can draw.

Type:

```
(?id : string?, ?height : int?, ?width : int?) -> source('a)
where 'a is a set of internal tracks
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `height` (of type `int?`, which defaults to `null`): Initial height of the video (defaults ot the same as frame).
- `width` (of type `int?`, which defaults to `null`): Initial width of the video (defaults ot the same as frame).

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clear` (of type `() -> unit`): Clear the board.
- `clear_and_copy` (of type `(?x : int, ?y : int) -> unit`): Clear the board and copy the old board to the new one, translated.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `fill` (of type `(int) -> unit`): Fill with given color (0xRRGGBB).
- `height` (of type `() -> int`): Current height of the board.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `line_to` (of type `(?color : int, int, int) -> unit`): Draw a line from the last point.
- `log` (of type `{level : (() -> int?).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `on_metadata` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on metadata packets.
- `on_shutdown` (of type `((() -> unit)) -> unit`): Register a function to be called when source shuts down.
- `on_track` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on new tracks.
- `on_wake_up` (of type `((() -> unit)) -> unit`): Register a function to be called after the source is asked to get ready. This is when, for instance, the source's final ID is set.
- `pixel` (of type `(int, int) -> (() -> int).{set : (int) -> unit}`): Retrieve a pixel whose contents is a color (in 0xRRGGBB format).
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.
- `width` (of type `() -> int`): Current width of the board.

### `video.bounding_box` {#video.bounding_box}

Retrieve the origin (methods `x` / `y`) and the dimensions (methods `width` / `height`) of the bounding box of the video.

Type:

```
(?id : string?, source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `height` (of type `() -> int`): Height of video.
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
- `width` (of type `() -> int`): Width of video.
- `x` (of type `() -> int`): x offset of video.
- `y` (of type `() -> int`): y offset of video.

### `video.color` {#video.color}

Generate a video filled with given color.

Type:

```
({int}) -> source(video=canvas('a), 'b) where 'b is a set of internal tracks
```

Arguments:

- `(unlabeled)` (of type `{int}`): Color (in 0xRRGGBB format).

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

### `video.cover` {#video.cover}

Generate a video source containing cover-art for current track of input audio source.

Type:

```
('b.{on_track : ((([string * string]) -> unit)) -> 'a}) ->
source(video=canvas('c))
```

Arguments:

- `(unlabeled)` (of type `'b.{on_track : ((([string * string]) -> unit)) -> 'a}`): Audio source whose metadata contain cover-art.

### `video.crop` {#video.crop}

Make the viewport of the current video match its bounding box.

Type:

```
(?id : string?, source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.fade.in` {#video.fade.in}

Fade the beginning of tracks. Metadata 'liq_video_fade_in' can be used to set the duration for a specific track (float in seconds).

Type:

```
(?id : string?, ?duration : float, ?override : string, ?transition : string,
 ?type : string, source(video=canvas('a), 'b)) -> source(video=canvas('a),
'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `duration` (of type `float`, which defaults to `3.`): Duration of the fading. This value can be set on a per-file basis using the metadata field passed as override.
- `override` (of type `string`, which defaults to `"liq_video_fade_in"`): Metadata field which, if present and containing a float, overrides the 'duration' parameter for current track.
- `transition` (of type `string`, which defaults to `"fade"`): Kind of transition (fade|slide_left|slide_right|slide_up|slide_down|grow|disc|random).
- `type` (of type `string`, which defaults to `"lin"`): Fader shape (lin|sin|log|exp): linear, sinusoidal, logarithmic or exponential.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.fade.out` {#video.fade.out}

Fade the end of tracks. Metadata 'liq_video_fade_out' can be used to set the duration for a specific track (float in seconds).

Type:

```
(?id : string?, ?duration : float, ?override : string, ?transition : string,
 ?type : string, source(video=canvas('a), 'b)) -> source(video=canvas('a),
'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `duration` (of type `float`, which defaults to `3.`): Duration of the fading. This value can be set on a per-file basis using the metadata field passed as override.
- `override` (of type `string`, which defaults to `"liq_video_fade_out"`): Metadata field which, if present and containing a float, overrides the 'duration' parameter for current track.
- `transition` (of type `string`, which defaults to `"fade"`): Kind of transition (fade|slide_left|slide_right|slide_up|slide_down|grow|disc|random).
- `type` (of type `string`, which defaults to `"lin"`): Fader shape (lin|sin|log|exp): linear, sinusoidal, logarithmic or exponential.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.fill` {#video.fill}

Fill frame with a color.

Type:

```
(?id : string?, ?alpha : {float}, ?color : {int}, source(video=canvas('a),
 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `alpha` (of type `{float}`, which defaults to `1.`): Transparency of the color between 0 and 1 (0 is fully transparent and 1 is fully opaque).
- `color` (of type `{int}`, which defaults to `0`): Color to fill the image with (0xRRGGBB).
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.frame.height` {#video.frame.height}

Height for all video frames.

Type:

```
() -> int
```

### `video.frame.rate` {#video.frame.rate}

Framerate for all video frames.

Type:

```
() -> int
```

### `video.frame.width` {#video.frame.width}

Width for all video frames.

Type:

```
() -> int
```

### `video.greyscale` {#video.greyscale}

Convert video to greyscale.

Type:

```
(?id : string?, source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.hmirror` {#video.hmirror}

Flip image horizontally.

Type:

```
(?id : string?, source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.info` {#video.info}

Compute various information about the video (dimension, size, etc.). Those are accessible through the methods attached to the source.

Type:

```
(?id : string?, source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

Methods:

- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `height` (of type `() -> int`): Height of video.
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
- `planes` (of type `() -> int`): Number of planes in a video frame.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `size` (of type `() -> int`): Size of a video frame (in bytes).
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.
- `width` (of type `() -> int`): Width of video.

### `video.invert` {#video.invert}

Invert video.

Type:

```
(?id : string?, source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.lomo` {#video.lomo}

Emulate the "Lomo effect".

Type:

```
(?id : string?, source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.opacity` {#video.opacity}

Scale opacity of video.

Type:

```
(?id : string?, {float}, source(video=canvas('a), 'b)) ->
source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `{float}`): Coefficient to scale opacity with.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.opacity.box` {#video.opacity.box}

Set alpha value on a given box inside the image.

Type:

```
(?id : string?, alpha : {float}, height : {int}, width : {int}, ?x : {int},
 ?y : {int}, source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `alpha` (of type `{float}`): alpha value.
- `height` (of type `{int}`): Box height.
- `width` (of type `{int}`): Box width.
- `x` (of type `{int}`, which defaults to `0`): x offset.
- `y` (of type `{int}`, which defaults to `0`): y offset.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.persistence` {#video.persistence}

Make images of the video persistent.

Type:

```
(?id : string?, ?duration : {float}, source(video=canvas('a), 'b)) ->
source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `duration` (of type `{float}`, which defaults to `1.`): Persistence duration in seconds.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.plot` {#video.plot}

Plot a floating point value.

Type:

```
(?lines : bool, ?min : float, ?max : float, ?speed : float, ?color : int,
 (() -> float)) -> source(video=canvas('a), 'b)
where 'b is a set of internal tracks
```

Arguments:

- `lines` (of type `bool`, which defaults to `true`): Draw lines connecting plotted points.
- `min` (of type `float`, which defaults to `0.`): Minimal value of the parameter.
- `max` (of type `float`, which defaults to `1.`): Maximal value of the parameter.
- `speed` (of type `float`, which defaults to `100.`): Speed in pixels per second.
- `color` (of type `int`, which defaults to `16777215`): Color of the drawn point (in 0xRRGGBB format).
- `(unlabeled)` (of type `() -> float`): Value to plot.

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

### `video.render` {#video.render}

Render the video by computing the result of its canvas images.

Type:

```
(?id : string?, ?transparent : bool, source(video=canvas('a), 'b)) ->
source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `transparent` (of type `bool`, which defaults to `true`): Make uncovered portions of the image transparent (they are black by default).
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.resize` {#video.resize}

Resize and translate video.

Type:

```
(?id : string?, ?height : {int}?, ?proportional : bool, ?width : {int}?,
 ?x : {int}, ?y : {int}, source(video=canvas('a), 'b)) ->
source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `height` (of type `{int}?`, which defaults to `null`): Target height (`null` means original height).
- `proportional` (of type `bool`, which defaults to `true`): Keep original proportions.
- `width` (of type `{int}?`, which defaults to `null`): Target width (`null` means original width).
- `x` (of type `{int}`, which defaults to `0`): x offset.
- `y` (of type `{int}`, which defaults to `0`): y offset.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.rotate` {#video.rotate}

Rotate video.

Type:

```
(?id : string?, ?angle : {float}, source(video=canvas('a), 'b)) ->
source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `angle` (of type `{float}`, which defaults to `0.`): Angle in radians.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.scale` {#video.scale}

Scale and translate video.

Type:

```
(?id : string?, ?scale : {float}, ?x : {int}, ?xscale : {float}, ?y : {int},
 ?yscale : {float}, source(video=canvas('a), 'b)) -> source(video=canvas('a),
'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `scale` (of type `{float}`, which defaults to `1.`): Scaling coefficient in both directions.
- `x` (of type `{int}`, which defaults to `0`): x offset.
- `xscale` (of type `{float}`, which defaults to `1.`): x scaling.
- `y` (of type `{int}`, which defaults to `0`): y offset.
- `yscale` (of type `{float}`, which defaults to `1.`): y scaling.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.sepia` {#video.sepia}

Convert video to sepia.

Type:

```
(?id : string?, source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.slideshow` {#video.slideshow}

Display a slideshow (typically of pictures).

Type:

```
(?id : string?, ?cyclic : {bool}, ?advance : {float}, ?[string]) ->
source('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`)
- `cyclic` (of type `{bool}`, which defaults to `true`): Go to the first picture after the last.
- `advance` (of type `{float}`, which defaults to `-1.`): Skip to the next file after this amount of time in seconds (negative means never).
- `(unlabeled)` (of type `[string]`, which defaults to `[]`): List of files to display.

Methods:

- `append` (of type `([string]) -> unit`): Append a list of files to the slideshow.
- `buffered` (of type `() -> [string * float]`): Length of buffered data.
- `clear` (of type `() -> unit`): Clear the list of files in the slideshow.
- `current` (of type `() -> string`): Currently displayed file.
- `duration` (of type `() -> float`): Estimation of the duration of the current track.
- `elapsed` (of type `() -> float`): Elapsed time in the current track.
- `fallible` (of type `bool`): Indicate if a source may fail, i.e. may not be ready to stream.
- `id` (of type `() -> string`): Identifier of the source.
- `is_active` (of type `() -> bool`): `true` if the source is active, i.e. it is continuously animated by its own clock whenever it is ready. Typically, `true` for outputs and sources such as `input.http`.
- `is_ready` (of type `() -> bool`): Indicate if a source is ready to stream. This does not mean that the source is currently streaming, just that its resources are all properly initialized.
- `is_up` (of type `() -> bool`): Indicate that the source can be asked to produce some data at any time. This is `true` when the source is currently being used or if it could be used at any time, typically inside a `switch` or `fallback`.
- `last_metadata` (of type `() -> [string * string]?`): Return the last metadata from the source.
- `log` (of type `{level : (() -> int?).{set : (int) -> unit}}`): Get or set the source's log level, from `1` to `5`.
- `next` (of type `() -> unit`): Go to next file.
- `on_metadata` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on metadata packets.
- `on_shutdown` (of type `((() -> unit)) -> unit`): Register a function to be called when source shuts down.
- `on_track` (of type `((([string * string]) -> unit)) -> unit`): Call a given handler on new tracks.
- `on_wake_up` (of type `((() -> unit)) -> unit`): Register a function to be called after the source is asked to get ready. This is when, for instance, the source's final ID is set.
- `prev` (of type `() -> unit`): Go to previous file.
- `remaining` (of type `() -> float`): Estimation of remaining time in the current track.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `set` (of type `(source('A)) -> unit`): Set the source.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `video.still_frame` {#video.still_frame}

Take still frames from a video source by calling the `save` method. For now only bitmap output is supported.

Type:

```
(?id : string?, source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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
- `save` (of type `(string) -> unit`): Save current image, argument is the file name to save to.
- `seek` (of type `(float) -> float`): Seek forward, in seconds (returns the amount of time effectively seeked).
- `self_sync` (of type `() -> bool`): Is the source currently controlling its own real-time loop.
- `skip` (of type `() -> unit`): Skip to the next track.
- `time` (of type `() -> float`): Get a source's time, based on its assigned clock.

### `video.testsrc.ffmpeg` {#video.testsrc.ffmpeg}

A test video source, which generates various patterns.

Type:

```
(?id : string?, ?pattern : string, ?max_buffer : float, ?duration : 'a?) ->
source(video=canvas('b))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`)
- `pattern` (of type `string`, which defaults to `"testsrc"`): Pattern drawn in the video: `"testsrc"`, `"testsrc2"`, `"smptebars"`, `"pal75bars"`, `"pal100bars"`, `"smptehdbars"`, `"yuvtestsrc"` or `"rgbtestsrc"` and more. Support any of the patterns supported by `ffmpeg`.
- `max_buffer` (of type `float`, which defaults to `0.5`): Maximum data buffer in seconds
- `duration` (of type `'a?`, which defaults to `null`): Duration of the source.

### `video.text` {#video.text}

Display a text using the first available operator in: camlimages, SDL, FFmpeg, GStreamer, gd or native.

Type:

```
(?id : string?, ?color : {int}, ?duration : float?, ?font : {string}?,
 ?size : {int}, {string}) -> source(video=canvas('A))
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `color` (of type `{int}`, which defaults to `16777215`): Text color (in 0xRRGGBB format).
- `duration` (of type `float?`, which defaults to `null`): Duration in seconds (`null` means infinite).
- `font` (of type `{string}?`, which defaults to `null`): Path to ttf font file.
- `size` (of type `{int}`, which defaults to `18`): Font size.
- `(unlabeled)` (of type `{string}`): Text to display.

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

### `video.text.gd` {#video.text.gd}

Add a text to a stream (GD implementation).

Type:

```
(?id : string?, ?duration : float?, ?color : {int}, ?cycle : bool,
 ?font : {string}?, ?metadata : string?, ?size : {int}, ?speed : int,
 ?x : {int}, ?y : {int}, ?on_cycle : (() -> unit), {string},
 source(video=canvas('B), 'A).{is_ready : () -> bool}) ->
source(video=canvas('B), 'A)
where 'A is a set of tracks to be muxed into a source
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `duration` (of type `float?`, which defaults to `null`)
- `color` (of type `{int}`, which defaults to `16777215`): Text color (in 0xRRGGBB format).
- `cycle` (of type `bool`, which defaults to `true`): Cycle text when it reaches left boundary.
- `font` (of type `{string}?`, which defaults to `null`): Path to ttf font file.
- `metadata` (of type `string?`, which defaults to `null`): Change text on a particular metadata (empty string means disabled).
- `size` (of type `{int}`, which defaults to `18`): Font size.
- `speed` (of type `int`, which defaults to `0`): Horizontal speed in pixels per second (`0` means no scrolling and update according to `x` and `y` in case they are variable).
- `x` (of type `{int}`, which defaults to `10`): x offset.
- `y` (of type `{int}`, which defaults to `10`): y offset.
- `on_cycle` (of type `() -> unit`, which defaults to `{()}`)
- `(unlabeled)` (of type `{string}`): d Text to display.
- `(unlabeled)` (of type `source(video=canvas('B), 'A).{is_ready : () -> bool}
where 'A is a set of tracks to be muxed into a source`)

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

### `video.text.native` {#video.text.native}

Display a text.

Type:

```
(?id : string?, ?color : {int}, ?duration : float?, ?font : {string}?,
 ?size : {int}, {string}) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `color` (of type `{int}`, which defaults to `16777215`): Text color (in 0xRRGGBB format).
- `duration` (of type `float?`, which defaults to `null`): Duration in seconds (`null` means infinite).
- `font` (of type `{string}?`, which defaults to `null`): Path to ttf font file (default is `"/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"`).
- `size` (of type `{int}`, which defaults to `18`): Font size.
- `(unlabeled)` (of type `{string}`): Text to display.

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

### `video.text.sdl` {#video.text.sdl}

Display a text.

Type:

```
(?id : string?, ?color : {int}, ?duration : float?, ?font : {string}?,
 ?size : {int}, {string}) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `color` (of type `{int}`, which defaults to `16777215`): Text color (in 0xRRGGBB format).
- `duration` (of type `float?`, which defaults to `null`): Duration in seconds (`null` means infinite).
- `font` (of type `{string}?`, which defaults to `null`): Path to ttf font file (default is `"/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"`).
- `size` (of type `{int}`, which defaults to `18`): Font size.
- `(unlabeled)` (of type `{string}`): Text to display.

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

### `video.tile` {#video.tile}

Tile sources

Type:

```
(?id : string?, ?normalize : {bool}, ?power : {bool}, ?proportional : bool,
 ?weights : [{float}], [source(?audio=pcm('b), video=canvas('a), 'c)]) ->
source(?audio=pcm('b), video=canvas('a))
```

Arguments:

- `id` (of type `string?`, which defaults to `"video.tile"`): Force the value of the track ID.
- `normalize` (of type `{bool}`, which defaults to `true`): Divide by the sum of weights of ready sources (or by the number of ready sources if weights are not specified).
- `power` (of type `{bool}`, which defaults to `false`): Perform constant-power normalization.
- `proportional` (of type `bool`, which defaults to `true`): Scale preserving the proportions.
- `weights` (of type `[{float}]`, which defaults to `[]`)
- `(unlabeled)` (of type `[source(?audio=pcm('b), video=canvas('a), 'c)]`)

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

### `video.translate` {#video.translate}

Translate video.

Type:

```
(?id : string?, ?x : {int}, ?y : {int}, source(video=canvas('a), 'b)) ->
source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `x` (of type `{int}`, which defaults to `0`): x offset.
- `y` (of type `{int}`, which defaults to `0`): y offset.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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

### `video.viewport` {#video.viewport}

Set the viewport for the current video.

Type:

```
(?id : string?, ?height : int?, ?width : int?, ?x : int, ?y : int,
 source(video=canvas('a), 'b)) -> source(video=canvas('a), 'b)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the source ID.
- `height` (of type `int?`, which defaults to `null`): height (default is frame height).
- `width` (of type `int?`, which defaults to `null`): Width (default is frame width).
- `x` (of type `int`, which defaults to `0`): Horizontal offset.
- `y` (of type `int`, which defaults to `0`): Vertical offset.
- `(unlabeled)` (of type `source(video=canvas('a), 'b)`)

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
