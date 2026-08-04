---
title: "Internet"
description: "Harbor middleware to add CORS headers"
---
### `harbor.http.middleware.cors` {#harbor.http.middleware.cors}

Harbor middleware to add CORS headers

Type:

```
(?origin : string?,
 ?origin_callback : ((
                      {
                        body : (?timeout : float) -> string,
                        data : (?timeout : float) -> string,
                        headers : [string * string],
                        http_version : string,
                        method : string,
                        path : string,
                        query : [string * string]
                      }) -> string?)?,
 ?methods : [string], ?allowed_headers : [string]?,
 ?exposed_headers : [string], ?credentials : bool, ?max_age : int?,
 ?preflight_continue : bool, ?options_status_code : int) ->
(
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
   send_status : ('d.{write : (string) -> unit}) -> unit,
   status_code : ((int) -> unit)
   .{current : () -> int
   },
   status_message : ((string?) -> unit)
   .{current : () -> string?
   },
   status_sent : () -> bool
 },
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
     send_status : ('d.{write : (string) -> unit}) -> unit,
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

- `origin` (of type `string?`, which defaults to `"*"`): Configures the Access-Control-Allow-Origin CORS header
- `origin_callback` (of type `((
  {
    body : (?timeout : float) -> string,
    data : (?timeout : float) -> string,
    headers : [string * string],
    http_version : string,
    method : string,
    path : string,
    query : [string * string]
  }) -> string?)?`, which defaults to `null`): Origin callback for advanced uses. If passed, overrides `origin` argument. Takes the request as input and returns the allowed origin. Return `null` to skip all CORS headers.
- `methods` (of type `[string]`, which defaults to `["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]`): Configures the Access-Control-Allow-Methods CORS header.
- `allowed_headers` (of type `[string]?`, which defaults to `null`): Configures the Access-Control-Allow-Headers CORS header. If not specified, defaults to reflecting the headers specified in the request's Access-Control-Request-Headers header.
- `exposed_headers` (of type `[string]`, which defaults to `[]`): Configures the Access-Control-Expose-Headers CORS header. If not specified, no custom headers are exposed.
- `credentials` (of type `bool`, which defaults to `false`): Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
- `max_age` (of type `int?`, which defaults to `null`): Configures the Access-Control-Max-Age CORS header. Set to an integer to pass the header, otherwise it is omitted.
- `preflight_continue` (of type `bool`, which defaults to `false`): Pass the CORS preflight response to the nexnhandler.
- `options_status_code` (of type `int`, which defaults to `204`): Provides a status code to use for successful OPTIONS requests, since some legacy browsers (IE11, various SmartTVs) choke on 204.

### `server.harbor` {#server.harbor}

Start an interface for the "telnet" server over http.

Type:

```
(?transport : http_transport
 .{default_port : int, name : string, protocol : string}, ?port : int,
 ?uri : string) -> unit
```

Arguments:

- `transport` (of type `http_transport.{default_port : int, name : string, protocol : string}`, which defaults to `<unix_transport>.{default_port=80, protocol="http", name="unix"}`): Http transport. Use `http.transport.ssl` or http.transport.secure_transport`, when available, to enable HTTPS output
- `port` (of type `int`, which defaults to `8000`): Port of the server.
- `uri` (of type `string`, which defaults to `"/telnet"`): URI of the server.
