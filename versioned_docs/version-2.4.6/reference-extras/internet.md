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

### `openai.chat` {#openai.chat}

Query ChatGPT API.

Type:

```
(key : string, ?base_url : string, ?model : string, ?timeout : float?,
 [
  {
    content : string,
    name? : string,
    role : string,
    tool_call_id? : string,
    tool_calls? : [
                   {
                     function : 
                     {arguments : string, name : string
                     },
                     id : string,
                     type : string
                   }]
  }]) -> unit
```

Arguments:

- `key` (of type `string`): OpenAI API key.
- `base_url` (of type `string`, which defaults to `"https://api.openai.com"`): Base URL for the API query
- `model` (of type `string`, which defaults to `"gpt-3.5-turbo"`): Language model.
- `timeout` (of type `float?`, which defaults to `30.0`): Timeout for network operations in seconds.
- `(unlabeled)` (of type `[
 {
   content : string,
   name? : string,
   role : string,
   tool_call_id? : string,
   tool_calls? : [
                  {
                    function : 
                    {arguments : string, name : string
                    },
                    id : string,
                    type : string
                  }]
 }]`): Messages initially exchanged.

Methods:

- `choices` (of type `[
 {
   finish_reason : string,
   index : int,
   message : 
   {content : string, role : string
   }
 }]`): 
- `created` (of type `int`): 
- `model` (of type `string`): 
- `object` (of type `string`): 
- `usage` (of type `{completion_tokens : int, prompt_tokens : int, total_tokens : int}`): 

### `openai.speech` {#openai.speech}

Generate speech using openai. Returns the encoded audio data.

Type:

```
(key : string, ?base_url : string, ?model : string, ?timeout : float?,
 voice : string, ?response_format : string, ?speed : float,
 on_data : ((string?) -> unit), string) -> unit
```

Arguments:

- `key` (of type `string`): OpenAI API key.
- `base_url` (of type `string`, which defaults to `"https://api.openai.com"`): Base URL for the API query
- `model` (of type `string`, which defaults to `"tts-1"`): Language model.
- `timeout` (of type `float?`, which defaults to `30.0`): Timeout for network operations in seconds.
- `voice` (of type `string`): The voice to use when generating the audio. Supported voices are `"alloy"`, `"echo"`, `"fable"`, `"onyx"`, `"nova"`, and `"shimmer"`
- `response_format` (of type `string`, which defaults to `"mp3"`): The format to audio in. Supported formats are: `"mp3"`, `"opus"`, `"aac"`, and `"flac"`.
- `speed` (of type `float`, which defaults to `1.0`): The speed of the generated audio. Select a value from `0.25` to `4.0`. `1.0` is the default.
- `on_data` (of type `(string?) -> unit`)
- `(unlabeled)` (of type `string`): ~on_data Function executed when receiving the audio data.

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
