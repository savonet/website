---
title: "Liquidsoap"
description: "Mark a function as deprecated."
---
### `deprecated` {#deprecated}

Mark a function as deprecated.

Type:

```
('a, string) -> unit
```

Arguments:

- `(unlabeled)` (of type `'a`): Old function name.
- `(unlabeled)` (of type `string`): New function name.

### `register_flow` {#register_flow}

Deprecated: flow is no longer maintained Register a radio on Liquidsoap Flows.

Type:

```
(?server : string, ?user : string, ?password : string, ?email : string,
 radio : string, website : string, description : string, genre : string,
 streams : [string * string], 'b
 .{on_metadata : ((([string * string]) -> unit)) -> 'a}) -> 'a
```

Arguments:

- `server` (of type `string`, which defaults to `""`)
- `user` (of type `string`, which defaults to `"default"`)
- `password` (of type `string`, which defaults to `"default"`)
- `email` (of type `string`, which defaults to `""`)
- `radio` (of type `string`): Name of the radio.
- `website` (of type `string`): URL of the website of the radio.
- `description` (of type `string`): Description of the radio.
- `genre` (of type `string`): Genre of the radio (rock or rap or etc.).
- `streams` (of type `[string * string]`): List of streams for the radio described by a pair of strings consisting of the format of the stream and the url of the stream. The format should be of the form "ogg/128k" consisting of the codec and the bitrate, separated by "/".
- `(unlabeled)` (of type `'b.{on_metadata : ((([string * string]) -> unit)) -> 'a}`)
