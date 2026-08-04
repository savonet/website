---
title: "String"
description: "pattern % [...,(k,v),...] changes in the pattern occurrences of:"
---
### `%` {#section-13}

`pattern % [...,(k,v),...]` changes in the pattern occurrences of:

- `$(k)` into `v`
- `$(if $(k2),"a","b") into "a" if k2 is found in the list, "b" otherwise.

Type:

```
(string, [string * string]) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)
- `(unlabeled)` (of type `[string * string]`)

### `^` {#section-14}

Concatenate strings.

Type:

```
(string, string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)
- `(unlabeled)` (of type `string`)

### `bool_of_string` {#bool_of_string}

Convert a string to a bool. Raises `error.failure("a string to a bool")` if conversion fails and default is `null`

Type:

```
(string, ?default : bool?) -> bool
```

Arguments:

- `(unlabeled)` (of type `string`)
- `default` (of type `bool?`, which defaults to `null`)

### `file.metadata.flac.cover.decode` {#file.metadata.flac.cover.decode}

Decode a flac-encoded cover metadata string.

Type:

```
(string) -> string
.{
  color_depth : int,
  description : string,
  height : int,
  mime : string,
  number_of_colors : int?,
  picture_type : int,
  width : int}?
```

Arguments:

- `(unlabeled)` (of type `string`)

### `file.metadata.flac.cover.encode` {#file.metadata.flac.cover.encode}

Encode cover metadata for embedding with flac files.

Type:

```
(picture_type : int, mime : string, ?description : string, width : int,
 height : int, color_depth : int, ?number_of_colors : int?, string) -> string
```

Arguments:

- `picture_type` (of type `int`)
- `mime` (of type `string`)
- `description` (of type `string`, which defaults to `""`)
- `width` (of type `int`)
- `height` (of type `int`)
- `color_depth` (of type `int`)
- `number_of_colors` (of type `int?`, which defaults to `null`)
- `(unlabeled)` (of type `string`)

### `float_of_string` {#float_of_string}

Convert a string to a float. Raises `error.failure("a string to a float")` if conversion fails and default is `null`

Type:

```
(string, ?default : float?) -> float
```

Arguments:

- `(unlabeled)` (of type `string`)
- `default` (of type `float?`, which defaults to `null`)

### `hls.playlist.main` {#hls.playlist.main}

Generate a main HLS playlist

Type:

```
(?extra_tags : [string], ?prefix : string, ?version : int,
 [string.{bandwidth : int, codecs : string, video_size? : int * int}]) ->
string
```

Arguments:

- `extra_tags` (of type `[string]`, which defaults to `[]`)
- `prefix` (of type `string`, which defaults to `""`)
- `version` (of type `int`, which defaults to `7`)
- `(unlabeled)` (of type `[string.{bandwidth : int, codecs : string, video_size? : int * int}]`)

### `int_of_string` {#int_of_string}

Convert a string to a int. Raises `error.failure("a string to a int")` if conversion fails and default is `null`

Type:

```
(string, ?default : int?) -> int
```

Arguments:

- `(unlabeled)` (of type `string`)
- `default` (of type `int?`, which defaults to `null`)

### `irc.channel` {#irc.channel}

Contents of an IRC channel.

Type:

```
(?server : string, ?port : int, ?channel : string, ?nick : string,
 ?limit : int) -> () -> string
```

Example:

```liquidsoap
# Display messages in the #liquidsoap-test room over a video
s = single("test.mp4")
s = video.add_text.native(irc.channel(channel="#liquidsoap-test"), s)
```

Arguments:

- `server` (of type `string`, which defaults to `"irc.libera.chat"`): IRC server.
- `port` (of type `int`, which defaults to `6667`): Port for IRC server.
- `channel` (of type `string`, which defaults to `"#liquidsoap"`): IRC chan to join.
- `nick` (of type `string`, which defaults to `"liquidbot"`): Nickname.
- `limit` (of type `int`, which defaults to `10`): Limit to n last messages

### `json.object` {#json.object}

Create a generic json object

Type:

```
() -> json
```

Methods:

- `add` (of type `(string, 'a) -> unit`): Add or replace a new `key`/`value` pair to the object.
- `remove` (of type `(string) -> unit`): Remove a key from the object. Does not nothing if the key does not exist.
- `stringify` (of type `(?compact : bool, ?json5 : bool) -> string`): Render object as json string.

### `json.stringify` {#json.stringify}

Convert a value to JSON. If the value cannot be represented as JSON (for instance a function), a `error.json` exception is raised.

Type:

```
(?compact : bool, ?json5 : bool, 'a) -> string
```

Arguments:

- `compact` (of type `bool`, which defaults to `false`): Output compact text.
- `json5` (of type `bool`, which defaults to `false`): Use json5 extended spec.
- `(unlabeled)` (of type `'a`)

### `json.value` {#json.value}

Create a generic json value

Type:

```
('a) -> json
```

Arguments:

- `(unlabeled)` (of type `'a`)

### `metadata.id3v2.render` {#metadata.id3v2.render}

Return a string representation of a id3v2 metadata tag

Type:

```
([string * string], ?version : int) -> string
```

Arguments:

- `(unlabeled)` (of type `[string * string]`)
- `version` (of type `int`, which defaults to `3`): Tag version. One of: 3 or 4

### `metadata.parse.amplify` {#metadata.parse.amplify}

Parse an amplify metadata. Parsing is the same as in the `amplify` operator. Metadata can be of the form: "<db> dB" for a decibel-based value or "<float>" for a linear-based value. Returns a decibel value.

Type:

```
(string) -> float
```

Arguments:

- `(unlabeled)` (of type `string`)

### `regexp` {#regexp}

Create a regular expression

Type:

```
(?flags : [string], string) -> regexp
```

Arguments:

- `flags` (of type `[string]`, which defaults to `[]`): List of flags. Valid flags: `"i"`, `"g"`, `"m"`.
- `(unlabeled)` (of type `string`)

Methods:

- `exec` (of type `(string) -> [int * string].{groups : [string * string]}`): Extract substrings from a string. Returns a list of (index,value). If the list does not have a pair associated to some index, it means that the corresponding pattern was not found.
- `replace` (of type `(((string) -> string), string) -> string`): Replace substrings matched by the regexp by another string returned by a function.
- `split` (of type `(string) -> [string]`): Split a string on the given regular expression.
- `test` (of type `(string) -> bool`): Match a string with the expressionn.

### `runtime.memory.prettify_bytes` {#runtime.memory.prettify_bytes}

Returns a human-redable description of an amount of bytes.

Type:

```
(?float_printer : ((float) -> string)?, ?signed : bool?, ?bits : bool?,
 ?binary : bool?, int) -> string
```

Arguments:

- `float_printer` (of type `((float) -> string)?`, which defaults to `null`)
- `signed` (of type `bool?`, which defaults to `null`)
- `bits` (of type `bool?`, which defaults to `null`)
- `binary` (of type `bool?`, which defaults to `null`)
- `(unlabeled)` (of type `int`)

### `string` {#string-1}

Return the representation of a value.

Type:

```
(?fields : bool, ?print_binary : bool, 'a) -> string
```

Arguments:

- `fields` (of type `bool`, which defaults to `false`): Show toplevel fields around the value.
- `print_binary` (of type `bool`, which defaults to `true`): When `false`, strings marked as binary are masked and returned as `<string>`
- `(unlabeled)` (of type `'a`)

### `string.annotate.parse` {#string.annotate.parse}

Parse a string of the form `<key>=<value>,...:<uri>` as given by the `annotate:` protocol

Type:

```
(string) -> [string * string] * string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `string.base64.decode` {#string.base64.decode}

Decode a Base64 encoded string.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `string.base64.encode` {#string.base64.encode}

Encode a string in Base64.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `string.binary.of_int` {#string.binary.of_int}

Encode a positive (unsigned) integer using native memory representation.

Type:

```
(?pad : int, ?little_endian : bool, int) -> string
```

Arguments:

- `pad` (of type `int`, which defaults to `0`): Minimum length in digits (pad on the left with zeros in order to reach it)
- `little_endian` (of type `bool`, which defaults to `true`): Whether the memory representation is little endian.
- `(unlabeled)` (of type `int`): String containing the binary representation.

### `string.binary.to_int` {#string.binary.to_int}

Value of a positive (unsigned) integer encoded using native memory representation.

Type:

```
(?little_endian : bool, string) -> int
```

Arguments:

- `little_endian` (of type `bool`, which defaults to `true`): Whether the memory representation is little endian.
- `(unlabeled)` (of type `string`): String containing the binary representation.

### `string.bytes` {#string.bytes}

Return an array of the string's bytes.

Type:

```
(string) -> [string]
```

Arguments:

- `(unlabeled)` (of type `string`)

### `string.bytes.length` {#string.bytes.length}

Return the length of the string in bytes.

Type:

```
(string) -> int
```

Arguments:

- `(unlabeled)` (of type `string`)

### `string.capitalize` {#string.capitalize}

Return a string with the first character set to upper case (capitalize), or to lower case (uncapitalize).

Type:

```
(?capitalize : bool, ?space_sensitive : bool, string) -> string
```

Arguments:

- `capitalize` (of type `bool`, which defaults to `true`): Capitalize if true, uncapitalize otherwise
- `space_sensitive` (of type `bool`, which defaults to `true`): Capitalize each space separated sub-string.
- `(unlabeled)` (of type `string`)

### `string.case` {#string.case}

Convert a string to lower or upper case.

Type:

```
(?lower : bool, string) -> string
```

Arguments:

- `lower` (of type `bool`, which defaults to `true`): Convert to lower case if true and uppercase otherwise.
- `(unlabeled)` (of type `string`)

### `string.char` {#string.char}

Create a string with one character.

Type:

```
(int) -> string
```

Arguments:

- `(unlabeled)` (of type `int`): Code of the character.

### `string.char.ascii` {#string.char.ascii}

All ASCII characters code

Type:

```
[int]
```

### `string.char.ascii.alphabet` {#string.char.ascii.alphabet}

All ASCII alphabet character codes

Type:

```
[int]
```

### `string.char.ascii.control` {#string.char.ascii.control}

All ASCII control character codes

Type:

```
[int]
```

### `string.char.ascii.number` {#string.char.ascii.number}

All ASCII number character codes

Type:

```
[int]
```

### `string.char.ascii.printable` {#string.char.ascii.printable}

All ASCII printable character codes

Type:

```
[int]
```

### `string.char.ascii.random` {#string.char.ascii.random}

Return a random ASCII character

Type:

```
(?[int]) -> string
```

Arguments:

- `(unlabeled)` (of type `[int]`, which defaults to `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127]`)

### `string.chars` {#string.chars}

Split string into characters. Raises `error.invalid` on errors.

Type:

```
(?encoding : string?, string) -> [string]
```

Arguments:

- `encoding` (of type `string?`, which defaults to `null`): Encoding used to split characters. Should be one of: `"utf8"` or `"ascii"`
- `(unlabeled)` (of type `string`)

### `string.compare` {#string.compare}

Compare strings in lexicographical order.

Type:

```
(string, string) -> int
```

Arguments:

- `(unlabeled)` (of type `string`)
- `(unlabeled)` (of type `string`)

### `string.concat` {#string.concat}

Concatenate strings.

Type:

```
(?separator : string, [string]) -> string
```

Arguments:

- `separator` (of type `string`, which defaults to `""`)
- `(unlabeled)` (of type `[string]`)

### `string.contains` {#string.contains}

Test whether a string contains a given prefix, substring or suffix.

Type:

```
(?encoding : string?, ?prefix : string, ?substring : string,
 ?suffix : string, string) -> bool
```

Arguments:

- `encoding` (of type `string?`, which defaults to `null`): Encoding used to split characters. Should be one of: `"utf8"` or `"ascii"`
- `prefix` (of type `string`, which defaults to `""`): Prefix to look for.
- `substring` (of type `string`, which defaults to `""`): Substring to look for.
- `suffix` (of type `string`, which defaults to `""`): Suffix to look for.
- `(unlabeled)` (of type `string`): The string to look into.

### `string.data_uri.decode` {#string.data_uri.decode}

Decode a string using the data uri format, i.e. `"data:<mime>[;base64],<data>"`.

Type:

```
(string) -> string.{mime : string}?
```

Arguments:

- `(unlabeled)` (of type `string`)

### `string.data_uri.encode` {#string.data_uri.encode}

Encode a string using the data uri format, i.e. `"data:<mime>[;base64],<data>"`.

Type:

```
(?base64 : bool, mime : string, string) -> string
```

Arguments:

- `base64` (of type `bool`, which defaults to `true`): Encode data using the base64 format
- `mime` (of type `string`): Data mime type
- `(unlabeled)` (of type `string`)

### `string.digest` {#string.digest}

Return an MD5 digest for the given string.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `string.escape` {#string.escape}

Escape special characters in an string. By default, the string is assumed to be `"utf8"` encoded and is escaped following JSON and javascript specification.

Type:

```
(?special_char : ((encoding : string, string) -> bool)?,
 ?escape_char : ((encoding : string, string) -> string)?,
 ?encoding : string?, string) -> string
```

Arguments:

- `special_char` (of type `((encoding : string, string) -> bool)?`, which defaults to `null`): Return `true` if the given character (passed as a string) should be escaped. Defaults to control characters for `"utf8"` and control characters and any character above `\x7E` (non-printable characters) for `"ascii"`.
- `escape_char` (of type `((encoding : string, string) -> string)?`, which defaults to `null`): Function used to escape a character. Defaults to `\xxx` octal notation for `"ascii"` and `\uxxxx` hexadecimal notation for `"utf8"`.
- `encoding` (of type `string?`, which defaults to `null`): One of: `"ascii"` or `"utf8"`. If `null`, `utf8` is tried first and `ascii` is used as a fallback if this fails.
- `(unlabeled)` (of type `string`)

### `string.escape.all` {#string.escape.all}

Escape each character in the given string using a specific escape sequence.

Type:

```
(?format : string, string) -> string
```

Arguments:

- `format` (of type `string`, which defaults to `"utf8"`): Escape format. One of: `"octal"`, `"hex"` or `"utf8"`.
- `(unlabeled)` (of type `string`)

### `string.escape.html` {#string.escape.html}

Escape HTML entities.

Type:

```
(?encoding : string?, string) -> string
```

Arguments:

- `encoding` (of type `string?`, which defaults to `null`): One of: `"ascii"` or `"utf8"`. If `null`, `utf8` is tried first and `ascii` is used as a fallback if this fails.
- `(unlabeled)` (of type `string`)

### `string.escape.special_char` {#string.escape.special_char}

Default function to detect characters to escape. See `string.escape` for more details.

Type:

```
(?encoding : string, string) -> bool
```

Arguments:

- `encoding` (of type `string`, which defaults to `"utf8"`): One of: `"ascii"` or `"utf8"`.
- `(unlabeled)` (of type `string`)

### `string.extract` {#string.extract}

Extract substrings from a string. Perl compatible regular expressions are recognized. Hence, special characters should be escaped. Returns a list of (index,value). If the list does not have a pair associated to some index, it means that the corresponding pattern was not found. Alter natively, one can use the `r/_/.exec(_)` syntax for regular expressions.

Type:

```
(pattern : string, string) -> [int * string]
```

Arguments:

- `pattern` (of type `string`)
- `(unlabeled)` (of type `string`)

Methods:

- `groups` (of type `[string * string]`): Named captures

### `string.float` {#string.float}

String representation of a float.

Type:

```
(?decimal_places : int?, float) -> string
```

Arguments:

- `decimal_places` (of type `int?`, which defaults to `null`): Number of decimal places.
- `(unlabeled)` (of type `float`)

### `string.getter.concat` {#string.getter.concat}

Combine a list of string getters `[g1, ...]` and return a single getter `g` such that: `string.getter.flush(separator=s, g) = string.concat(separator=s, list.filter(fun (s) -> s != "", [string.getter.flush(g1), ...]))`

Type:

```
([{string}]) -> {string}
```

Arguments:

- `(unlabeled)` (of type `[{string}]`)

### `string.getter.flush` {#string.getter.flush}

Flush all values from a string getter and return the concatenated result. If the getter is constant, return the constant string. Otherwise, call the getter repeatedly until it returns an empty string and return the concatenated result

Type:

```
(?separator : string, {string}) -> string
```

Arguments:

- `separator` (of type `string`, which defaults to `""`)
- `(unlabeled)` (of type `{string}`)

### `string.getter.single` {#string.getter.single}

Create a string getter which will return once the given string and then the empty string.

Type:

```
(string) -> () -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `string.hex_of_int` {#string.hex_of_int}

Hexadecimal representation of an integer.

Type:

```
(?pad : int, int) -> string
```

Arguments:

- `pad` (of type `int`, which defaults to `0`): Minimum length in digits (pad on the left with zeros in order to reach it).
- `(unlabeled)` (of type `int`)

### `string.id` {#string.id}

Generate an identifier with given operator name.

Type:

```
(?category : string, string) -> string
```

Arguments:

- `category` (of type `string`, which defaults to `""`): Category
- `(unlabeled)` (of type `string`): Operator name.

### `string.id.default` {#string.id.default}

Generate an identifier if no identifier was provided.

Type:

```
(default : string, string?) -> string
```

Arguments:

- `default` (of type `string`): Name from which identifier is generated if not present.
- `(unlabeled)` (of type `string?`): Proposed identifier.

### `string.index` {#string.index}

Index where a substring occurs in a string. The function returns `-1` if the substring is not present

Type:

```
(substring : string, string) -> int
```

Arguments:

- `substring` (of type `string`): Substring to look for.
- `(unlabeled)` (of type `string`): String in which to look.

### `string.is_int` {#string.is_int}

Test whether a string is a valid integer.

Type:

```
(string) -> bool
```

Arguments:

- `(unlabeled)` (of type `string`)

### `string.length` {#string.length}

Return the string's length using the given encoding. Raises `error.invalid` on errors.

Type:

```
(?encoding : string?, string) -> int
```

Arguments:

- `encoding` (of type `string?`, which defaults to `null`): Encoding used to split characters. Should be one of: `"utf8"` or `"ascii"`
- `(unlabeled)` (of type `string`)

### `string.lowercase` {#string.lowercase}

Convert a string to lowercase.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `string.make` {#string.make}

Create a string of a given length using the given character.

Type:

```
(?char_code : int, int) -> string
```

Arguments:

- `char_code` (of type `int`, which defaults to `32`): Character code.
- `(unlabeled)` (of type `int`): String length.

### `string.match` {#string.match}

Match a string with an expression. Perl compatible regular expressions are recognized. Hence, special characters should be escaped. Alternatively, one can use the `r/_/.test(_)` syntax for regular expressions.

Type:

```
(pattern : string, string) -> bool
```

Arguments:

- `pattern` (of type `string`)
- `(unlabeled)` (of type `string`)

### `string.nth` {#string.nth}

Retrieve a character in a string. Raises `error.not_found` if character does not exist.

Type:

```
(string, int) -> int
```

Example:

```liquidsoap
c = string.nth("abcde", 2)
print(c) # should print 99 which is the ascii code for "c"
```

Arguments:

- `(unlabeled)` (of type `string`): String to look into.
- `(unlabeled)` (of type `int`): Index of the character.

### `string.null_terminated` {#string.null_terminated}

Add a null character at the end of a string.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`): String.

### `string.of_int` {#string.of_int}

Convert an int to string.

Type:

```
(?digits : int, 'a) -> string
```

Arguments:

- `digits` (of type `int`, which defaults to `0`): Minimal number of digits (pad with 0s on the left if necessary).
- `(unlabeled)` (of type `'a`)

### `string.quote` {#string.quote}

Return a quoted copy of the given string. By default, the string is assumed to be `"utf8"` encoded and is escaped following JSON and javascript specification.

Type:

```
(?encoding : string?, string) -> string
```

Arguments:

- `encoding` (of type `string?`, which defaults to `null`): One of: `"ascii"` or `"utf8"`. If `null`, `utf8` is tried first and `ascii` is used as a fallback if this fails.
- `(unlabeled)` (of type `string`)

### `string.recode` {#string.recode}

Convert a string. Effective only if Camomile is enabled.

Type:

```
(?in_enc : string?, ?out_enc : string, string) -> string
```

Arguments:

- `in_enc` (of type `string?`, which defaults to `null`): Input encoding. Autodetected if null.
- `out_enc` (of type `string`, which defaults to `"UTF-8"`): Output encoding.
- `(unlabeled)` (of type `string`)

### `string.replace` {#string.replace}

Replace all substrings matched by a pattern by another string returned by a function. Alternatively, one can use the `r/_/g.replace(_)` syntax for regular expressions.

Type:

```
(pattern : string, ((string) -> string), string) -> string
```

Arguments:

- `pattern` (of type `string`): Pattern (regular expression) of substrings which should be replaced.
- `(unlabeled)` (of type `(string) -> string`): Function getting a matched substring an returning the string to replace it with.
- `(unlabeled)` (of type `string`): String whose substrings should be replaced.

### `string.residual` {#string.residual}

What remains of a string after a given prefix.

Type:

```
(?encoding : string?, prefix : string, string) -> string?
```

Arguments:

- `encoding` (of type `string?`, which defaults to `null`): Encoding used to split characters. Should be one of: `"utf8"` or `"ascii"`
- `prefix` (of type `string`): Requested prefix.
- `(unlabeled)` (of type `string`)

### `string.spaces` {#string.spaces}

Generate a given number of spaces (this can be useful for indenting).

Type:

```
(int) -> string
```

Arguments:

- `(unlabeled)` (of type `int`): Number of spaces.

### `string.split` {#string.split}

Split a string at "separator". Perl compatible regular expressions are recognized. Hence, special characters should be escaped. Alternatively, one can use the `r/_/.split(_)` syntax for regular expressions.

Type:

```
(separator : string, string) -> [string]
```

Arguments:

- `separator` (of type `string`)
- `(unlabeled)` (of type `string`)

### `string.split.first` {#string.split.first}

Split a string in two at first "separator".

Type:

```
(?encoding : string?, separator : string, string) -> string * string
```

Arguments:

- `encoding` (of type `string?`, which defaults to `null`)
- `separator` (of type `string`)
- `(unlabeled)` (of type `string`)

### `string.sub` {#string.sub}

Get a substring of a string. Returns "" if no such substring exists.

Type:

```
(string, start : int, ?encoding : string?, length : int) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)
- `start` (of type `int`): Return a sub string starting at this position. First position is 0.
- `encoding` (of type `string?`, which defaults to `null`): Encoding used to split characters. Should be one of: `"utf8"` or `"ascii"`
- `length` (of type `int`): Return a sub string of `length` characters.

### `string.to_float` {#string.to_float}

Convert a string to a float.

Type:

```
(?default : float, string) -> float
```

Arguments:

- `default` (of type `float`, which defaults to `0.0`)
- `(unlabeled)` (of type `string`)

### `string.to_int` {#string.to_int}

Convert a string to a int.

Type:

```
(?default : int, string) -> int
```

Arguments:

- `default` (of type `int`, which defaults to `0`)
- `(unlabeled)` (of type `string`)

### `string.trim` {#string.trim}

Return a string without leading and trailing whitespace.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `string.unescape` {#string.unescape}

This function is the inverse of `string.escape`.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `string.unquote` {#string.unquote}

Return an unquoted copy of the given string. Quotes are removed by trying to parse the string following the JSON string escaping convention.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `string.uppercase` {#string.uppercase}

Convert a string to uppercase.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`)

### `string_of_metadata` {#string_of_metadata}

Standard function for displaying metadata. Shows artist and title, using "Unknown" when a field is empty.

Type:

```
([string * string]) -> string
```

Arguments:

- `(unlabeled)` (of type `[string * string]`): Metadata packet to be displayed.

### `url.decode` {#url.decode}

Decode an encoded url (e.g. "%20" becomes " ").

Type:

```
(?plus : bool, string) -> string
```

Arguments:

- `plus` (of type `bool`, which defaults to `true`)
- `(unlabeled)` (of type `string`)

### `url.encode` {#url.encode}

Encode an url (e.g. " " becomes "%20").

Type:

```
(?plus : bool, string) -> string
```

Arguments:

- `plus` (of type `bool`, which defaults to `true`)
- `(unlabeled)` (of type `string`)

### `url.split` {#url.split}

Split an url of the form `foo?arg=bar&arg2=bar2` into `("foo",[("arg","bar"),("arg2","bar2")])`. The returned strings are decoded (see `url.decode`).

Type:

```
(string) -> string * [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): Url to split.

### `url.split_args` {#url.split_args}

Split the arguments of an url of the form `arg=bar&arg2=bar2` into `[("arg","bar"),("arg2","bar2")]`. The returned strings are decoded (see `url.decode`).

Type:

```
(string) -> [string * string]
```

Arguments:

- `(unlabeled)` (of type `string`): Argument string to split.

### `xml.stringify` {#xml.stringify}

Convert a value to XML. If the value cannot be represented as XML (for instance a function), a `error.xml` exception is raised.

Type:

```
(?compact : bool, 'a) -> string
```

Arguments:

- `compact` (of type `bool`, which defaults to `false`): Output compact text.
- `(unlabeled)` (of type `'a`)

### `yaml.stringify` {#yaml.stringify}

Convert a value to YAML. If the value cannot be represented as YAML (for instance a function), a `error.yaml` exception is raised.

Type:

```
(?scalar_style : string, ?layout_style : string, 'a) -> string
```

Arguments:

- `scalar_style` (of type `string`, which defaults to `"any"`): Scalar style. One of: "any", "plain", "single_quoted", "double_quoted", "literal" or "folded".
- `layout_style` (of type `string`, which defaults to `"any"`): Layout style. One of: "any", "block" or "flow".
- `(unlabeled)` (of type `'a`)
