---
title: "Internet"
description: "Register a new harbor middleware"
---
### `harbor.http.middleware.register` {#harbor.http.middleware.register}

Register a new harbor middleware

Type:

```
((('a, 'b, (('a, 'b) -> 'c)) -> 'c)) -> unit
```

Arguments:

- `(unlabeled)` (of type `('a, 'b, (('a, 'b) -> 'c)) -> 'c`)

### `harbor.http.register` {#harbor.http.register}

Register a HTTP handler on the harbor. The handler function receives as argument the full requested information and returns the answer sent to the client, including HTTP headers. This function registers exact path matches, i.e. `"/users"`, `"/index.hml"` as well as fragment matches, i.e. `"/user/:id"`, `"/users/:id/collabs/:cid"`, etc. If you need more advanced matching, use `harbor.http.register.regexp` to match regular expressions. Paths are resolved in the order they are declared and can override default harbor paths such as metadata handlers. The handler receives the request details as a record and a response handler. Matched fragments are reported as part of the response `query` parameter. The response handler can be used to fill up details about the http response, which will be converted into a plain HTTP response string after the handler returns.

Type:

```
(?port : int, ?transport : http_transport
 .{default_port : int, name : string, protocol : string}, ?method : string,
 string,
 ((
   {
     body : (?timeout : float) -> string,
     data : (?timeout : float) -> string,
     headers : [string * string],
     http_version : string,
     method : string,
     path : string,
     query : [string * string]
   }, (() -> string)
   .{
     content_type : ((string?) -> unit)
     .{current : () -> string?
     },
     data : (({string}) -> unit)
     .{current : () -> {string}
     },
     header : (string, string) -> unit,
     headers : (([string * string]) -> unit)
     .{current : () -> [string * string]
     },
     html : ({string}) -> unit,
     http_version : ((string) -> unit)
     .{current : () -> string
     },
     json : (?compact : bool, 'a) -> unit,
     multipart_form : (?boundary : string?,
                       [
                        {
                          attributes : [string * string],
                          contents : {string},
                          headers : ['b * 'c],
                          name : string
                        }]) -> unit,
     redirect : (?status_code : int, string) -> unit,
     send_status : (socket
                    .{
                      close : () -> unit,
                      non_blocking : (bool) -> unit,
                      read : ((?timeout : float?) -> string)
                      .{wait : (?timeout : float?, (() -> unit)) -> unit
                      },
                      type : string,
                      write : (string) -> unit
                    }) -> unit,
     status_code : ((int) -> unit)
     .{current : () -> int
     },
     status_message : ((string?) -> unit)
     .{current : () -> string?
     },
     status_sent : () -> bool
   }) -> unit)) -> unit
```

Arguments:

- `port` (of type `int`, which defaults to `8000`): Port to serve.
- `transport` (of type `http_transport.{default_port : int, name : string, protocol : string}`, which defaults to `<unix_transport>.{name="unix", protocol="http", default_port=80}`): Http transport. Use `http.transport.ssl` or `http.transport.secure_transport`, when available, to enable HTTPS output
- `method` (of type `string`, which defaults to `"GET"`): Accepted method ("GET" / "POST" / "PUT" / "DELETE" / "HEAD" / "OPTIONS").
- `(unlabeled)` (of type `string`)
- `(unlabeled)` (of type `(
 {
   body : (?timeout : float) -> string,
   data : (?timeout : float) -> string,
   headers : [string * string],
   http_version : string,
   method : string,
   path : string,
   query : [string * string]
 }, (() -> string)
 .{
   content_type : ((string?) -> unit)
   .{current : () -> string?
   },
   data : (({string}) -> unit)
   .{current : () -> {string}
   },
   header : (string, string) -> unit,
   headers : (([string * string]) -> unit)
   .{current : () -> [string * string]
   },
   html : ({string}) -> unit,
   http_version : ((string) -> unit)
   .{current : () -> string
   },
   json : (?compact : bool, 'a) -> unit,
   multipart_form : (?boundary : string?,
                     [
                      {
                        attributes : [string * string],
                        contents : {string},
                        headers : ['b * 'c],
                        name : string
                      }]) -> unit,
   redirect : (?status_code : int, string) -> unit,
   send_status : (socket
                  .{
                    close : () -> unit,
                    non_blocking : (bool) -> unit,
                    read : ((?timeout : float?) -> string)
                    .{wait : (?timeout : float?, (() -> unit)) -> unit
                    },
                    type : string,
                    write : (string) -> unit
                  }) -> unit,
   status_code : ((int) -> unit)
   .{current : () -> int
   },
   status_message : ((string?) -> unit)
   .{current : () -> string?
   },
   status_sent : () -> bool
 }) -> unit`)

### `harbor.http.register.simple` {#harbor.http.register.simple}

Register a HTTP handler on the harbor. This function offers a simple API, suitable for quick implementation of HTTP handlers. See `harbor.http.register` for a node/express like alternative API.

Type:

```
(?port : int, ?transport : http_transport
 .{default_port : int, name : string, protocol : string}, ?method : string,
 string,
 ((
   {
     body : (?timeout : float) -> string,
     data : (?timeout : float) -> string,
     headers : [string * string],
     http_version : string,
     method : string,
     path : string,
     query : [string * string],
     socket : socket
     .{
       close : () -> unit,
       non_blocking : (bool) -> unit,
       read : ((?timeout : float?) -> string)
       .{wait : (?timeout : float?, (() -> unit)) -> unit
       },
       type : string,
       write : ((?timeout : float?, string) -> unit)
       .{wait : (?timeout : float?, (() -> unit)) -> unit
       }
     }
   }) -> {string}?)) -> unit
```

Arguments:

- `port` (of type `int`, which defaults to `8000`): Port to serve.
- `transport` (of type `http_transport.{default_port : int, name : string, protocol : string}`, which defaults to `<unix_transport>.{name="unix", protocol="http", default_port=80}`): Http transport. Use `http.transport.ssl` or `http.transport.secure_transport`, when available, to enable HTTPS output
- `method` (of type `string`, which defaults to `"GET"`): Accepted method ("GET" / "POST" / "PUT" / "DELETE" / "HEAD" / "OPTIONS").
- `(unlabeled)` (of type `string`)
- `(unlabeled)` (of type `(
 {
   body : (?timeout : float) -> string,
   data : (?timeout : float) -> string,
   headers : [string * string],
   http_version : string,
   method : string,
   path : string,
   query : [string * string],
   socket : socket
   .{
     close : () -> unit,
     non_blocking : (bool) -> unit,
     read : ((?timeout : float?) -> string)
     .{wait : (?timeout : float?, (() -> unit)) -> unit
     },
     type : string,
     write : ((?timeout : float?, string) -> unit)
     .{wait : (?timeout : float?, (() -> unit)) -> unit
     }
   }
 }) -> {string}?`)

### `harbor.http.register.simple.regexp` {#harbor.http.register.simple.regexp}

Register a HTTP handler on the harbor with a generic regexp `path`. This function offers a simple API, suitable for quick implementation of HTTP handlers. See `harbor.http.register` for a node/express like alternative API.

Type:

```
(?port : int, ?transport : http_transport
 .{default_port : int, name : string, protocol : string}, ?method : string,
 regexp,
 ((
   {
     data : (?timeout : float) -> string,
     headers : [string * string],
     http_version : string,
     method : string,
     path : string,
     query : [string * string],
     socket : socket
     .{
       close : () -> unit,
       non_blocking : (bool) -> unit,
       read : ((?timeout : float?) -> string)
       .{wait : (?timeout : float?, (() -> unit)) -> unit
       },
       type : string,
       write : ((?timeout : float?, string) -> unit)
       .{wait : (?timeout : float?, (() -> unit)) -> unit
       }
     }
   }) -> {string}?)) -> unit
```

Arguments:

- `port` (of type `int`, which defaults to `8000`): Port to serve.
- `transport` (of type `http_transport.{default_port : int, name : string, protocol : string}`, which defaults to `<unix_transport>.{name="unix", protocol="http", default_port=80}`): Http transport. Use `http.transport.ssl` or `http.transport.secure_transport`, when available, to enable HTTPS output
- `method` (of type `string`, which defaults to `"GET"`): Accepted method ("GET" / "POST" / "PUT" / "DELETE" / "HEAD" / "OPTIONS").
- `(unlabeled)` (of type `regexp`)
- `(unlabeled)` (of type `(
 {
   data : (?timeout : float) -> string,
   headers : [string * string],
   http_version : string,
   method : string,
   path : string,
   query : [string * string],
   socket : socket
   .{
     close : () -> unit,
     non_blocking : (bool) -> unit,
     read : ((?timeout : float?) -> string)
     .{wait : (?timeout : float?, (() -> unit)) -> unit
     },
     type : string,
     write : ((?timeout : float?, string) -> unit)
     .{wait : (?timeout : float?, (() -> unit)) -> unit
     }
   }
 }) -> {string}?`)

### `harbor.http.static` {#harbor.http.static}

Serve a static path.

Type:

```
(?transport : http_transport
 .{default_port : int, name : string, protocol : string}, ?port : int,
 ?path : string, ?browse : bool, ?content_type : ((string) -> string?),
 ?headers : [string * string], string) -> unit
```

Arguments:

- `transport` (of type `http_transport.{default_port : int, name : string, protocol : string}`, which defaults to `<unix_transport>.{default_port=80, protocol="http", name="unix"}`): Http transport. Use `http.transport.ssl` or http.transport.secure_transport`, when available, to enable HTTPS output
- `port` (of type `int`, which defaults to `8000`): Port for incoming harbor (http) connections.
- `path` (of type `string`, which defaults to `"/"`): Base path.
- `browse` (of type `bool`, which defaults to `false`): List files in directories.
- `content_type` (of type `(string) -> string?`, which defaults to `<fun>.{magic=<fun>, cli=<fun>}`): Callback to specify Content-Type on a per file basis. Default: file.mime if compiled or file CLI if present.
- `headers` (of type `[string * string]`, which defaults to `[("Access-Control-Allow-Origin", "*")]`): Default response headers.
- `(unlabeled)` (of type `string`): Local path to be served.

### `harbor.remove` {#harbor.remove}

Remove a registered handler on the harbor.

Type:

```
(?port : int, ?method : string, regexp) -> unit
```

Arguments:

- `port` (of type `int`, which defaults to `8000`): Port to serve.
- `method` (of type `string`, which defaults to `"GET"`): Method served.
- `(unlabeled)` (of type `regexp`): URI served.

### `host.of_internet_address` {#host.of_internet_address}

Find a host by internet address

Type:

```
(internet_address) -> 
{
  addresses : [internet_address.{is_ipv6 : bool, to_string : () -> string}],
  aliases : [string],
  domain : socket_domain,
  name : string}?
```

Arguments:

- `(unlabeled)` (of type `internet_address`)

### `host.of_name` {#host.of_name}

Find a host by name

Type:

```
(string) -> 
{
  addresses : [internet_address.{is_ipv6 : bool, to_string : () -> string}],
  aliases : [string],
  domain : socket_domain,
  name : string}?
```

Arguments:

- `(unlabeled)` (of type `string`): hostname

### `http.delete` {#http.delete}

Perform a full http DELETE request.

Type:

```
(?headers : [string * string], ?http_version : string?, ?redirect : bool,
 ?timeout : float?, ?normalize_url : bool?, string) -> unit
```

Arguments:

- `headers` (of type `[string * string]`, which defaults to `[]`): Additional headers.
- `http_version` (of type `string?`, which defaults to `null`): Http request version.
- `redirect` (of type `bool`, which defaults to `true`): Perform redirections if needed.
- `timeout` (of type `float?`, which defaults to `10.0`): Timeout for network operations in seconds.
- `normalize_url` (of type `bool?`, which defaults to `null`): Normalize url, replacing spaces with `%20` and more. Defaults to `settings.http.normalize_url` when `null`.
- `(unlabeled)` (of type `string`): Requested URL, e.g. `"http://www.liquidsoap.info/"`.

Methods:

- `headers` (of type `[string * string]`): HTTP headers.
- `http_version` (of type `string`): Version of the HTTP protocol.
- `status_code` (of type `int`): Status code.
- `status_message` (of type `string`): Status message.

### `http.delete.stream` {#http.delete.stream}

Perform a full http DELETE request.

Type:

```
(?headers : [string * string], ?http_version : string?, ?redirect : bool,
 ?timeout : float?, ?normalize_url : bool?, string,
 on_body_data : ((string?) -> unit)) -> unit
```

Arguments:

- `headers` (of type `[string * string]`, which defaults to `[]`): Additional headers.
- `http_version` (of type `string?`, which defaults to `null`): Http request version.
- `redirect` (of type `bool`, which defaults to `true`): Perform redirections if needed.
- `timeout` (of type `float?`, which defaults to `10.0`): Timeout for network operations in seconds.
- `normalize_url` (of type `bool?`, which defaults to `null`): Normalize url, replacing spaces with `%20` and more. Defaults to `settings.http.normalize_url` when `null`.
- `(unlabeled)` (of type `string`): Requested URL, e.g. `"http://www.liquidsoap.info/"`.
- `on_body_data` (of type `(string?) -> unit`): function called when receiving response body data. `null` or `""` means that all the data has been passed.

Methods:

- `headers` (of type `[string * string]`): HTTP headers.
- `http_version` (of type `string`): Version of the HTTP protocol.
- `status_code` (of type `int`): Status code.
- `status_message` (of type `string`): Status message.

### `http.get` {#http.get}

Perform a full http GET request.

Type:

```
(?headers : [string * string], ?http_version : string?, ?redirect : bool,
 ?timeout : float?, ?normalize_url : bool?, string) -> string
```

Arguments:

- `headers` (of type `[string * string]`, which defaults to `[]`): Additional headers.
- `http_version` (of type `string?`, which defaults to `null`): Http request version.
- `redirect` (of type `bool`, which defaults to `true`): Perform redirections if needed.
- `timeout` (of type `float?`, which defaults to `10.0`): Timeout for network operations in seconds.
- `normalize_url` (of type `bool?`, which defaults to `null`): Normalize url, replacing spaces with `%20` and more. Defaults to `settings.http.normalize_url` when `null`.
- `(unlabeled)` (of type `string`): Requested URL, e.g. `"http://www.liquidsoap.info/"`.

Methods:

- `headers` (of type `[string * string]`): HTTP headers.
- `http_version` (of type `string`): Version of the HTTP protocol.
- `status_code` (of type `int`): Status code.
- `status_message` (of type `string`): Status message.

### `http.get.stream` {#http.get.stream}

Perform a full http GET request.

Type:

```
(?headers : [string * string], ?http_version : string?, ?redirect : bool,
 ?timeout : float?, ?normalize_url : bool?, string,
 on_body_data : ((string?) -> unit)) -> unit
```

Arguments:

- `headers` (of type `[string * string]`, which defaults to `[]`): Additional headers.
- `http_version` (of type `string?`, which defaults to `null`): Http request version.
- `redirect` (of type `bool`, which defaults to `true`): Perform redirections if needed.
- `timeout` (of type `float?`, which defaults to `10.0`): Timeout for network operations in seconds.
- `normalize_url` (of type `bool?`, which defaults to `null`): Normalize url, replacing spaces with `%20` and more. Defaults to `settings.http.normalize_url` when `null`.
- `(unlabeled)` (of type `string`): Requested URL, e.g. `"http://www.liquidsoap.info/"`.
- `on_body_data` (of type `(string?) -> unit`): function called when receiving response body data. `null` or `""` means that all the data has been passed.

Methods:

- `headers` (of type `[string * string]`): HTTP headers.
- `http_version` (of type `string`): Version of the HTTP protocol.
- `status_code` (of type `int`): Status code.
- `status_message` (of type `string`): Status message.

### `http.head` {#http.head}

Perform a full http HEAD request.

Type:

```
(?headers : [string * string], ?http_version : string?, ?redirect : bool,
 ?timeout : float?, ?normalize_url : bool?, string) -> unit
```

Arguments:

- `headers` (of type `[string * string]`, which defaults to `[]`): Additional headers.
- `http_version` (of type `string?`, which defaults to `null`): Http request version.
- `redirect` (of type `bool`, which defaults to `true`): Perform redirections if needed.
- `timeout` (of type `float?`, which defaults to `10.0`): Timeout for network operations in seconds.
- `normalize_url` (of type `bool?`, which defaults to `null`): Normalize url, replacing spaces with `%20` and more. Defaults to `settings.http.normalize_url` when `null`.
- `(unlabeled)` (of type `string`): Requested URL, e.g. `"http://www.liquidsoap.info/"`.

Methods:

- `headers` (of type `[string * string]`): HTTP headers.
- `http_version` (of type `string`): Version of the HTTP protocol.
- `status_code` (of type `int`): Status code.
- `status_message` (of type `string`): Status message.

### `http.head.stream` {#http.head.stream}

Perform a full http HEAD request.

Type:

```
(?headers : [string * string], ?http_version : string?, ?redirect : bool,
 ?timeout : float?, ?normalize_url : bool?, string,
 on_body_data : ((string?) -> unit)) -> unit
```

Arguments:

- `headers` (of type `[string * string]`, which defaults to `[]`): Additional headers.
- `http_version` (of type `string?`, which defaults to `null`): Http request version.
- `redirect` (of type `bool`, which defaults to `true`): Perform redirections if needed.
- `timeout` (of type `float?`, which defaults to `10.0`): Timeout for network operations in seconds.
- `normalize_url` (of type `bool?`, which defaults to `null`): Normalize url, replacing spaces with `%20` and more. Defaults to `settings.http.normalize_url` when `null`.
- `(unlabeled)` (of type `string`): Requested URL, e.g. `"http://www.liquidsoap.info/"`.
- `on_body_data` (of type `(string?) -> unit`): function called when receiving response body data. `null` or `""` means that all the data has been passed.

Methods:

- `headers` (of type `[string * string]`): HTTP headers.
- `http_version` (of type `string`): Version of the HTTP protocol.
- `status_code` (of type `int`): Status code.
- `status_message` (of type `string`): Status message.

### `http.headers.content_disposition` {#http.headers.content_disposition}

Extract the content-disposition header

Type:

```
([string * string]) -> 
{args : [string * string?], filename? : string, name? : string, type : string
}?
```

Arguments:

- `(unlabeled)` (of type `[string * string]`)

### `http.headers.content_type` {#http.headers.content_type}

Extract the content-type header

Type:

```
([string * string?]) -> {args : [string * string], mime : string}?
```

Arguments:

- `(unlabeled)` (of type `[string * string?]`)

### `http.headers.extname` {#http.headers.extname}

Try to get a filename from a request's headers.

Type:

```
([string * string]) -> string?
```

Arguments:

- `(unlabeled)` (of type `[string * string]`)

### `http.multipart_form_data` {#http.multipart_form_data}

Prepare a list of data to be sent as multipart form data.

Type:

```
(?boundary : string?,
 [
  {
    attributes : [string * string],
    contents : {string},
    headers : ['a * 'b],
    name : string
  }]) -> unit
```

Arguments:

- `boundary` (of type `string?`, which defaults to `null`): Specify boundary to use for multipart/form-data.
- `(unlabeled)` (of type `[
 {
   attributes : [string * string],
   contents : {string},
   headers : ['a * 'b],
   name : string
 }]`): data to insert

Methods:

- `boundary` (of type `string`): 
- `contents` (of type `{string}`): 

### `http.post` {#http.post}

Perform a full http POST request.

Type:

```
(?data : {string}, ?headers : [string * string], ?http_version : string?,
 ?redirect : bool, ?timeout : float?, ?normalize_url : bool?, string) ->
string
```

Arguments:

- `data` (of type `{string}`, which defaults to `""`): POST data. Use a `string` getter to stream data and return `""` when all data has been passed.
- `headers` (of type `[string * string]`, which defaults to `[]`): Additional headers.
- `http_version` (of type `string?`, which defaults to `null`): Http request version.
- `redirect` (of type `bool`, which defaults to `true`): Perform redirections if needed.
- `timeout` (of type `float?`, which defaults to `10.0`): Timeout for network operations in seconds.
- `normalize_url` (of type `bool?`, which defaults to `null`): Normalize url, replacing spaces with `%20` and more. Defaults to `settings.http.normalize_url` when `null`.
- `(unlabeled)` (of type `string`): Requested URL, e.g. `"http://www.liquidsoap.info/"`.

Methods:

- `headers` (of type `[string * string]`): HTTP headers.
- `http_version` (of type `string`): Version of the HTTP protocol.
- `status_code` (of type `int`): Status code.
- `status_message` (of type `string`): Status message.

### `http.post.file` {#http.post.file}

Send a file via POST request encoded in multipart/form-data. The contents can either be directly specified (with the `contents` argument) or taken from a file (with the `file` argument).

Type:

```
(?name : string, ?content_type : string?, ?headers : [string * string],
 ?boundary : string?, ?filename : string?, ?file : string?,
 ?contents : {string}?, ?timeout : float?, ?redirect : bool, string) ->
string
```

Arguments:

- `name` (of type `string`, which defaults to `"file"`): Name of the field field
- `content_type` (of type `string?`, which defaults to `null`): Content-type (mime) for the file.
- `headers` (of type `[string * string]`, which defaults to `[]`): Additional headers.
- `boundary` (of type `string?`, which defaults to `null`): Specify boundary to use for multipart/form-data.
- `filename` (of type `string?`, which defaults to `null`): File name sent in the request.
- `file` (of type `string?`, which defaults to `null`): File whose contents is to be sent in the request.
- `contents` (of type `{string}?`, which defaults to `null`): Contents of the file sent in the request.
- `timeout` (of type `float?`, which defaults to `null`): Timeout in seconds.
- `redirect` (of type `bool`, which defaults to `true`): Follow reidrections.
- `(unlabeled)` (of type `string`): URL to post to.

Methods:

- `headers` (of type `[string * string]`): HTTP headers.
- `http_version` (of type `string`): Version of the HTTP protocol.
- `status_code` (of type `int`): Status code.
- `status_message` (of type `string`): Status message.

### `http.post.stream` {#http.post.stream}

Perform a full http POST request.

Type:

```
(?data : {string}, ?headers : [string * string], ?http_version : string?,
 ?redirect : bool, ?timeout : float?, ?normalize_url : bool?, string,
 on_body_data : ((string?) -> unit)) -> unit
```

Arguments:

- `data` (of type `{string}`, which defaults to `""`): POST data. Use a `string` getter to stream data and return `""` when all data has been passed.
- `headers` (of type `[string * string]`, which defaults to `[]`): Additional headers.
- `http_version` (of type `string?`, which defaults to `null`): Http request version.
- `redirect` (of type `bool`, which defaults to `true`): Perform redirections if needed.
- `timeout` (of type `float?`, which defaults to `10.0`): Timeout for network operations in seconds.
- `normalize_url` (of type `bool?`, which defaults to `null`): Normalize url, replacing spaces with `%20` and more. Defaults to `settings.http.normalize_url` when `null`.
- `(unlabeled)` (of type `string`): Requested URL, e.g. `"http://www.liquidsoap.info/"`.
- `on_body_data` (of type `(string?) -> unit`): function called when receiving response body data. `null` or `""` means that all the data has been passed.

Methods:

- `headers` (of type `[string * string]`): HTTP headers.
- `http_version` (of type `string`): Version of the HTTP protocol.
- `status_code` (of type `int`): Status code.
- `status_message` (of type `string`): Status message.

### `http.put` {#http.put}

Perform a full http PUT request.

Type:

```
(?data : {string}, ?headers : [string * string], ?http_version : string?,
 ?redirect : bool, ?timeout : float?, ?normalize_url : bool?, string) ->
string
```

Arguments:

- `data` (of type `{string}`, which defaults to `""`): POST data. Use a `string` getter to stream data and return `""` when all data has been passed.
- `headers` (of type `[string * string]`, which defaults to `[]`): Additional headers.
- `http_version` (of type `string?`, which defaults to `null`): Http request version.
- `redirect` (of type `bool`, which defaults to `true`): Perform redirections if needed.
- `timeout` (of type `float?`, which defaults to `10.0`): Timeout for network operations in seconds.
- `normalize_url` (of type `bool?`, which defaults to `null`): Normalize url, replacing spaces with `%20` and more. Defaults to `settings.http.normalize_url` when `null`.
- `(unlabeled)` (of type `string`): Requested URL, e.g. `"http://www.liquidsoap.info/"`.

Methods:

- `headers` (of type `[string * string]`): HTTP headers.
- `http_version` (of type `string`): Version of the HTTP protocol.
- `status_code` (of type `int`): Status code.
- `status_message` (of type `string`): Status message.

### `http.put.file` {#http.put.file}

Send a file via PUT request encoded in multipart/form-data. The contents can either be directly specified (with the `contents` argument) or taken from a file (with the `file` argument).

Type:

```
(?name : string, ?content_type : string?, ?headers : [string * string],
 ?boundary : string?, ?filename : string?, ?file : string?,
 ?contents : {string}?, ?timeout : float?, ?redirect : bool, string) ->
string
```

Arguments:

- `name` (of type `string`, which defaults to `"file"`): Name of the field field
- `content_type` (of type `string?`, which defaults to `null`): Content-type (mime) for the file.
- `headers` (of type `[string * string]`, which defaults to `[]`): Additional headers.
- `boundary` (of type `string?`, which defaults to `null`): Specify boundary to use for multipart/form-data.
- `filename` (of type `string?`, which defaults to `null`): File name sent in the request.
- `file` (of type `string?`, which defaults to `null`): File whose contents is to be sent in the request.
- `contents` (of type `{string}?`, which defaults to `null`): Contents of the file sent in the request.
- `timeout` (of type `float?`, which defaults to `null`): Timeout in seconds.
- `redirect` (of type `bool`, which defaults to `true`): Follow reidrections.
- `(unlabeled)` (of type `string`): URL to put to.

Methods:

- `headers` (of type `[string * string]`): HTTP headers.
- `http_version` (of type `string`): Version of the HTTP protocol.
- `status_code` (of type `int`): Status code.
- `status_message` (of type `string`): Status message.

### `http.put.stream` {#http.put.stream}

Perform a full http PUT request.

Type:

```
(?data : {string}, ?headers : [string * string], ?http_version : string?,
 ?redirect : bool, ?timeout : float?, ?normalize_url : bool?, string,
 on_body_data : ((string?) -> unit)) -> unit
```

Arguments:

- `data` (of type `{string}`, which defaults to `""`): POST data. Use a `string` getter to stream data and return `""` when all data has been passed.
- `headers` (of type `[string * string]`, which defaults to `[]`): Additional headers.
- `http_version` (of type `string?`, which defaults to `null`): Http request version.
- `redirect` (of type `bool`, which defaults to `true`): Perform redirections if needed.
- `timeout` (of type `float?`, which defaults to `10.0`): Timeout for network operations in seconds.
- `normalize_url` (of type `bool?`, which defaults to `null`): Normalize url, replacing spaces with `%20` and more. Defaults to `settings.http.normalize_url` when `null`.
- `(unlabeled)` (of type `string`): Requested URL, e.g. `"http://www.liquidsoap.info/"`.
- `on_body_data` (of type `(string?) -> unit`): function called when receiving response body data. `null` or `""` means that all the data has been passed.

Methods:

- `headers` (of type `[string * string]`): HTTP headers.
- `http_version` (of type `string`): Version of the HTTP protocol.
- `status_code` (of type `int`): Status code.
- `status_message` (of type `string`): Status message.

### `http.response` {#http.response}

Initiate a response handler with pre-filled values.

Type:

```
(?http_version : string, ?status_code : int?, ?status_message : string?,
 ?headers : [string * string], ?content_type : string?, ?data : {string}) ->
() -> string
```

Arguments:

- `http_version` (of type `string`, which defaults to `"1.1"`)
- `status_code` (of type `int?`, which defaults to `null`)
- `status_message` (of type `string?`, which defaults to `null`)
- `headers` (of type `[string * string]`, which defaults to `[]`)
- `content_type` (of type `string?`, which defaults to `null`)
- `data` (of type `{string}`, which defaults to `""`)

Methods:

- `content_type` (of type `((string?) -> unit).{current : () -> string?}`): Set `"Content-Type"` header
- `data` (of type `(({string}) -> unit).{current : () -> {string}}`): Set response data.
- `header` (of type `(string, string) -> unit`): Set a single header on the response
- `headers` (of type `(([string * string]) -> unit).{current : () -> [string * string]}`): Replace response headers.
- `html` (of type `({string}) -> unit`): Set content-type to html and data to argument value
- `http_version` (of type `((string) -> unit).{current : () -> string}`): Set http protocol version
- `json` (of type `(?compact : bool, 'A) -> unit`): Set content-type to json and data to `json.stringify` of the argument
- `multipart_form` (of type `(?boundary : string?,
 [
  {
    attributes : [string * string],
    contents : {string},
    headers : ['A * 'B],
    name : string
  }]) -> unit`): 
- `redirect` (of type `(?status_code : int, string) -> unit`): Set `status_code` and `Location:` header for a HTTP redirect response
- `send_status` (of type `('A.{write : (string) -> unit}) -> unit`): 
- `status_code` (of type `((int) -> unit).{current : () -> int}`): Set response status code
- `status_message` (of type `((string?) -> unit).{current : () -> string?}`): Set response status message
- `status_sent` (of type `() -> bool`): 

### `http.transport.ssl` {#http.transport.ssl}

Https transport using libssl

Type:

```
(?read_timeout : float?, ?write_timeout : float?, ?password : string?,
 ?min_protocol : string?, ?max_protocol : string?, ?certificate : string?,
 ?key : string?) -> http_transport
```

Arguments:

- `read_timeout` (of type `float?`, which defaults to `null`): Read timeout
- `write_timeout` (of type `float?`, which defaults to `null`): Write timeout
- `password` (of type `string?`, which defaults to `null`): SSL certificate password
- `min_protocol` (of type `string?`, which defaults to `null`): Minimal accepted SSL protocol. One of, from least recent to most recent: `"ssl.3"`, `"tls.1"`, `"tls.1.1"`, `"tls.1.2"` or `"tls.1.3"`. The most recent available protocol between client and server is negotiated when initiating communication between minimal and maximal protocol version. All protocols up to `"tls.1.2"` and above are now deprecated so you might want to set this value to one of those two. Default to lowest support protocol if not set.
- `max_protocol` (of type `string?`, which defaults to `null`): Maximal accepted SSL protocol. One of, from least recent to most recent: `"ssl.3"`, `"tls.1"`, `"tls.1.1"`, `"tls.1.2"` or `"tls.1.3"`. The most recent available protocol between client and server is negotiated when initiating communication between minimal and maximal protocol version. Defaults to highest protocol supported if not set.
- `certificate` (of type `string?`, which defaults to `null`): Path to certificate file. Required in server mode, e.g. `input.harbor`, etc. If passed in client mode, certificate is added to the list of valid certificates.
- `key` (of type `string?`, which defaults to `null`): Path to certificate private key. Required in server mode, e.g. `input.harbor`, etc.

Methods:

- `default_port` (of type `int`): Transport default port
- `name` (of type `string`): Transport name
- `protocol` (of type `string`): Transport protocol

### `http.transport.tls` {#http.transport.tls}

Https transport using libtls

Type:

```
(?read_timeout : float?, ?write_timeout : float?, ?certificate : string?,
 ?key : string?) -> http_transport
```

Arguments:

- `read_timeout` (of type `float?`, which defaults to `null`): Read timeout. Defaults to harbor's timeout if `null`.
- `write_timeout` (of type `float?`, which defaults to `null`): Write timeout. Defaults to harbor's timeout if `null`.
- `certificate` (of type `string?`, which defaults to `null`): Path to certificate file. Required in server mode, e.g. `input.harbor`, etc. If passed in client mode, certificate is added to the list of valid certificates.
- `key` (of type `string?`, which defaults to `null`): Path to certificate private key. Required in server mode, e.g. `input.harbor`, etc. Unused in client mode.

Methods:

- `default_port` (of type `int`): Transport default port
- `name` (of type `string`): Transport name
- `protocol` (of type `string`): Transport protocol

### `http.transport.unix` {#http.transport.unix}

Http unencrypted transport

Type:

```
http_transport.{default_port : int, name : string, protocol : string}
```

### `http.user_agent` {#http.user_agent}

Default user-agent

Type:

```
string
```

### `http.www_form_urlencoded` {#http.www_form_urlencoded}

Prepare a list of `(string, string)` arguments for sending as `"application/x-www-form-urlencoded"` content

Type:

```
([string * string]) -> string
```

Arguments:

- `(unlabeled)` (of type `[string * string]`)

### `socket.address.internet_address` {#socket.address.internet_address}

Create a socket address for a internet address.

Type:

```
(internet_address.{is_ipv6 : bool, to_string : () -> string}, int) ->
socket_address
```

Arguments:

- `(unlabeled)` (of type `internet_address.{is_ipv6 : bool, to_string : () -> string}`): Internet address.
- `(unlabeled)` (of type `int`): port

Methods:

- `domain` (of type `socket_domain`): Socket domain
- `internet_address` (of type `internet_address.{is_ipv6 : bool, to_string : () -> string}`): Internet address
- `port` (of type `int`): Port

### `socket.address.unix` {#socket.address.unix}

Create a socket address for a unix file socket.

Type:

```
(string) -> socket_address
```

Arguments:

- `(unlabeled)` (of type `string`): Unix socket path

Methods:

- `domain` (of type `socket_domain`): Socket domain
- `path` (of type `string`): Unix socket path

### `socket.domain.inet` {#socket.domain.inet}

Inet socket domain

Type:

```
socket_domain
```

### `socket.domain.inet6` {#socket.domain.inet6}

Inet6 socket domain

Type:

```
socket_domain
```

### `socket.domain.unix` {#socket.domain.unix}

Unix socket domain

Type:

```
socket_domain
```

### `socket.internet_address` {#socket.internet_address}

Return an internet address from its string representation.

Type:

```
(string) -> internet_address
```

Arguments:

- `(unlabeled)` (of type `string`): Socket internet address.

Methods:

- `is_ipv6` (of type `bool`): Is the internet address a ipv6 address?
- `to_string` (of type `() -> string`): String representation of the internet address

### `socket.internet_address.any` {#socket.internet_address.any}

A special IPv4 address, for use only with `socket.bind`, representing all the Internet addresses that the host machine possesses.

Type:

```
internet_address.{is_ipv6 : bool, to_string : () -> string}
```

### `socket.internet_address.ipv6.any` {#socket.internet_address.ipv6.any}

A special IPv6 address, for use only with `socket.bind`, representing all the Internet addresses that the host machine possesses.

Type:

```
internet_address.{is_ipv6 : bool, to_string : () -> string}
```

### `socket.internet_address.ipv6.loopback` {#socket.internet_address.ipv6.loopback}

A special IPv6 address representing the host machine (`::1`).

Type:

```
internet_address.{is_ipv6 : bool, to_string : () -> string}
```

### `socket.internet_address.loopback` {#socket.internet_address.loopback}

A special IPv4 address representing the host machine (`127.0.0.1`).

Type:

```
internet_address.{is_ipv6 : bool, to_string : () -> string}
```

### `socket.pair` {#socket.pair}

Create a pair of sockets connected together.

Type:

```
(?domain : socket_domain, ?type : socket_type, ?protocol : int) -> socket
```

Arguments:

- `domain` (of type `socket_domain`, which defaults to `socket.domain.inet`): Socket domain.
- `type` (of type `socket_type`, which defaults to `socket.type.stream`): Socket type
- `protocol` (of type `int`, which defaults to `0`): Protocol type. `0` selects the default protocol for that kind of sockets.

Methods:

- `close` (of type `() -> unit`): Close the socket.
- `non_blocking` (of type `(bool) -> unit`): Set the non-blocking flag on the socket
- `read` (of type `((?timeout : float?) -> string)
.{wait : (?timeout : float?, (() -> unit)) -> unit}`): Read data from a socket. Reading is done when the function returns an empty string `""`.
- `type` (of type `string`): Socket type
- `write` (of type `((?timeout : float?, string) -> unit)
.{wait : (?timeout : float?, (() -> unit)) -> unit}`): Write data to a socket

### `socket.type.dgram` {#socket.type.dgram}

Dgram socket type

Type:

```
socket_type
```

### `socket.type.raw` {#socket.type.raw}

Raw socket type

Type:

```
socket_type
```

### `socket.type.stream` {#socket.type.stream}

Stream socket type

Type:

```
socket_type
```

### `socket.unix` {#socket.unix}

Create a unix socket.

Type:

```
(?domain : socket_domain, ?type : socket_type, ?protocol : int) -> socket
```

Arguments:

- `domain` (of type `socket_domain`, which defaults to `socket.domain.inet`): Socket domain.
- `type` (of type `socket_type`, which defaults to `socket.type.stream`): Socket type
- `protocol` (of type `int`, which defaults to `0`): Protocol type. `0` selects the default protocol for that kind of sockets.

Methods:

- `accept` (of type `(?timeout : float?) ->
socket
.{
  close : () -> unit,
  non_blocking : (bool) -> unit,
  read : ((?timeout : float?) -> string)
  .{wait : (?timeout : float?, (() -> unit)) -> unit
  },
  type : string,
  write : ((?timeout : float?, string) -> unit)
  .{wait : (?timeout : float?, (() -> unit)) -> unit
  }
} * socket_address`): Accept connections on the given socket. The returned socket is a socket connected to the client; the returned address is the address of the connecting client. Timeout defaults to harbor's accept_timeout if `null`.
- `bind` (of type `(socket_address) -> unit`): Bind a socket to an address.
- `close` (of type `() -> unit`): Close the socket.
- `connect` (of type `(socket_address) -> unit`): Connect a socket to an address.
- `listen` (of type `(int) -> unit`): Set up a socket for receiving connection requests. The integer argument is the maximal number of pending requests.
- `non_blocking` (of type `(bool) -> unit`): Set the non-blocking flag on the socket
- `read` (of type `((?timeout : float?) -> string)
.{wait : (?timeout : float?, (() -> unit)) -> unit}`): Read data from a socket. Reading is done when the function returns an empty string `""`.
- `type` (of type `string`): Socket type
- `write` (of type `((?timeout : float?, string) -> unit)
.{wait : (?timeout : float?, (() -> unit)) -> unit}`): Write data to a socket
