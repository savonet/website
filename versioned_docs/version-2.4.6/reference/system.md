---
title: "System"
description: "Get command-line parameters. The parameters are numbered starting from 1, the zeroth parameter being the script name."
---
### `argv` {#argv}

Get command-line parameters. The parameters are numbered starting from 1, the zeroth parameter being the script name.

Type:

```
(?default : string, int) -> string
```

Arguments:

- `default` (of type `string`, which defaults to `""`)
- `(unlabeled)` (of type `int`)

### `environment` {#environment}

Return the process environment.

Type:

```
() -> [string * string]
```

### `environment.get` {#environment.get}

Get the value of an environment variable. Returns `default` if the variable is not set.

Type:

```
(?default : string, string) -> string
```

Arguments:

- `default` (of type `string`, which defaults to `""`)
- `(unlabeled)` (of type `string`)

### `environment.set` {#environment.set}

Set the value associated to a variable in the process environment.

Type:

```
(string, string) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`): Variable to be set.
- `(unlabeled)` (of type `string`): Value to set.

### `exe_ext` {#exe_ext}

Executable file extension.

Type:

```
string
```

### `exit` {#exit}

Immediately stop the application. This should only be used in extreme cases or to specify an exit value. The recommended way of stopping Liquidsoap is to use shutdown.

Type:

```
(int) -> unit
```

Arguments:

- `(unlabeled)` (of type `int`): Exit value.

### `getopt` {#getopt}

Parse command line options:
`getopt("-o")` returns "1" if "-o" was passed without any parameter, "0" otherwise.
`getopt(default="X","-o")` returns "Y" if "-o Y" was passed, "X" otherwise.
The result is removed from the list of arguments, affecting subsequent
calls to `argv()` and `getopt()`.

Type:

```
(?default : string, string) -> string
```

Arguments:

- `default` (of type `string`, which defaults to `""`)
- `(unlabeled)` (of type `string`)

### `on_cleanup` {#on_cleanup}

Register a function to be called for the final cleanup.

Type:

```
((() -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `() -> unit`)

### `on_shutdown` {#on_shutdown}

Register a function to be called when Liquidsoap shuts down.

Type:

```
((() -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `() -> unit`)

### `on_start` {#on_start}

Register a function to be called when Liquidsoap starts.

Type:

```
((() -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `() -> unit`)

### `os.type` {#os.type}

Type of OS running liquidsoap.

Type:

```
string
```

### `process.pid` {#process.pid}

Get the process' pid.

Type:

```
() -> int
```

### `process.quote` {#process.quote}

Return a quoted copy of the given string, suitable for use as one argument in a command line, escaping all meta-characters. Warning: under Windows, the output is only suitable for use with programs that follow the standard Windows quoting conventions.

Type:

```
(string) -> string
```

Arguments:

- `(unlabeled)` (of type `string`): String to escape

### `process.quote.command` {#process.quote.command}

Return a quoted command line, suitable for use as an argument to `process.run`.

The optional arguments `stdin`, `stdout` and `stderr` are file names used to redirect the standard input, the standard output, or the standard error of the command.

If `stdin=f` is given, a redirection `< f` is performed and the standard input of the command reads from file `f`.

If `stdout=f` is given, a redirection `> f` is performed and the standard output of the command is written to file `f`.

If `stderr=f` is given, a redirection `2> f` is performed and the standard error of the command is written to file `f`.

If both `stdout=f` and `stderr=f` are given, with the exact same file name `f`, a `2>&1` redirection is performed so that the standard output and the standard error of the command are interleaved and redirected to the same file `f`.

Type:

```
(?stdin : string?, ?stdout : string?, ?stderr : string?, ?args : [string],
 string) -> string
```

Arguments:

- `stdin` (of type `string?`, which defaults to `null`): command standard input
- `stdout` (of type `string?`, which defaults to `null`): command standard output
- `stderr` (of type `string?`, which defaults to `null`): command standard error
- `args` (of type `[string]`, which defaults to `[]`): command arguments
- `(unlabeled)` (of type `string`): Command to execute

### `process.read` {#process.read}

Perform a shell call and return its output.

Type:

```
(?timeout : float, ?env : [string * string], ?inherit_env : bool,
 ?log_errors : bool, string) -> string
```

Arguments:

- `timeout` (of type `float`, which defaults to `-1.0`): Cancel process after `timeout` has elapsed. Ignored if negative.
- `env` (of type `[string * string]`, which defaults to `[]`): Process environment
- `inherit_env` (of type `bool`, which defaults to `true`): Inherit calling process's environment when `env` parameter is empty.
- `log_errors` (of type `bool`, which defaults to `true`): Log details if the command does not return 0.
- `(unlabeled)` (of type `string`): Command to run

### `process.read.lines` {#process.read.lines}

Perform a shell call and return the list of its output lines.

Type:

```
(?timeout : float, ?env : [string * string], ?inherit_env : bool,
 ?log_errors : bool, string) -> [string]
```

Arguments:

- `timeout` (of type `float`, which defaults to `-1.0`): Cancel process after `timeout` has elapsed. Ignored if negative.
- `env` (of type `[string * string]`, which defaults to `[]`): Process environment
- `inherit_env` (of type `bool`, which defaults to `true`): Inherit calling process's environment when `env` parameter is empty.
- `log_errors` (of type `bool`, which defaults to `true`): Log details if the command does not return 0.
- `(unlabeled)` (of type `string`): Command to run

### `process.run` {#process.run}

Run a process in a shell environment. Returns the standard output, as well as standard error and status as methods. The status can be "exit" (the status code is set), "killed" or "stopped" (the status code is the signal), or "exception" (the description is set) or "timeout" (the description is the run time).

Type:

```
(?env : [string * string], ?inherit_env : bool, ?stdin : string,
 ?rwdirs : [string], ?rodirs : [string], ?network : bool?, ?timeout : float?,
 string) -> unit
```

Arguments:

- `env` (of type `[string * string]`, which defaults to `[]`): Process environment
- `inherit_env` (of type `bool`, which defaults to `true`): Inherit calling process's environment when `env` parameter is empty.
- `stdin` (of type `string`, which defaults to `""`): Data to write to the process' standard input.
- `rwdirs` (of type `[string]`, which defaults to `["default"]`): Read/write directories for sandboxing. `"default"` expands to sandbox default.
- `rodirs` (of type `[string]`, which defaults to `["default"]`): Read-only directories for sandboxing `"default"` expands to sandbox default.
- `network` (of type `bool?`, which defaults to `null`): Enable or disable network inside sandboxed environment (sandbox default if not specified).
- `timeout` (of type `float?`, which defaults to `null`): Cancel process after `timeout` has elapsed. Ignored if negative.
- `(unlabeled)` (of type `string`): Command to run

Methods:

- `status` (of type `string.{code : int, description : string}`): Status when process ended, can be one of `"exit"` (the program exited, the `status` code is then relevant), `"killed"` (the program was killed by signal given in `status` code), `"stopped"` (the program was stopped by signal given in `status` code) or `"exception"` (the program raised and exception detailed in the `description`).
- `stderr` (of type `string`): Messages written by process on standard error stream.
- `stdout` (of type `string`): Messages written by process on standard output stream.

### `process.stderr` {#process.stderr}

The process' stderr

Type:

```
socket
.{
  close : () -> unit,
  closed : () -> bool,
  non_blocking : (bool) -> unit,
  read : ((?timeout : float?) -> string)
  .{wait : (?timeout : float?, (() -> unit)) -> unit
  },
  type : string,
  write : ((?timeout : float?, string) -> unit)
  .{wait : (?timeout : float?, (() -> unit)) -> unit
  }
}
```

### `process.stdin` {#process.stdin}

The process' stdin

Type:

```
socket
.{
  close : () -> unit,
  closed : () -> bool,
  non_blocking : (bool) -> unit,
  read : ((?timeout : float?) -> string)
  .{wait : (?timeout : float?, (() -> unit)) -> unit
  },
  type : string,
  write : ((?timeout : float?, string) -> unit)
  .{wait : (?timeout : float?, (() -> unit)) -> unit
  }
}
```

### `process.stdout` {#process.stdout}

The process' stdout

Type:

```
socket
.{
  close : () -> unit,
  closed : () -> bool,
  non_blocking : (bool) -> unit,
  read : ((?timeout : float?) -> string)
  .{wait : (?timeout : float?, (() -> unit)) -> unit
  },
  type : string,
  write : ((?timeout : float?, string) -> unit)
  .{wait : (?timeout : float?, (() -> unit)) -> unit
  }
}
```

### `process.test` {#process.test}

Return true if process exited with 0 code.

Type:

```
(?timeout : float, ?env : [string * string], ?inherit_env : bool, string) ->
bool
```

Arguments:

- `timeout` (of type `float`, which defaults to `-1.0`): Cancel process after `timeout` has elapsed. Ignored if negative.
- `env` (of type `[string * string]`, which defaults to `[]`): Process environment
- `inherit_env` (of type `bool`, which defaults to `true`): Inherit calling process's environment when `env` parameter is empty.
- `(unlabeled)` (of type `string`): Command to test

### `process.time` {#process.time}

Get the execution time of the current liquidsoap process.

Type:

```
() -> unit
```

Methods:

- `system` (of type `float`)
- `user` (of type `float`)

### `read` {#read}

Read some value from standard input (console).

Type:

```
(?hide : bool) -> string
```

Arguments:

- `hide` (of type `bool`, which defaults to `false`): Hide typed characters (for passwords).

### `reopen.stderr` {#reopen.stderr}

Reopen standard error on the given file

Type:

```
(string) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`)

### `reopen.stdin` {#reopen.stdin}

Reopen standard input on the given file

Type:

```
(string) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`)

### `reopen.stdout` {#reopen.stdout}

Reopen standard output on the given file

Type:

```
(string) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`)

### `restart` {#restart}

Restart the application.

Type:

```
() -> unit
```

### `runtime.gc.get` {#runtime.gc.get}

Return the current values of the GC parameters

Type:

```
() -> unit
```

Methods:

- `allocation_policy` (of type `int`)
- `custom_major_ratio` (of type `int`)
- `custom_minor_max_size` (of type `int`)
- `custom_minor_ratio` (of type `int`)
- `major_heap_increment` (of type `int`)
- `max_overhead` (of type `int`)
- `minor_heap_size` (of type `int`)
- `space_overhead` (of type `int`)
- `stack_limit` (of type `int`)
- `verbose` (of type `int`)
- `window_size` (of type `int`)

### `runtime.gc.print_stat` {#runtime.gc.print_stat}

Print the current values of the memory management counters in human-readable form.

Type:

```
() -> unit
```

### `runtime.gc.quick_stat` {#runtime.gc.quick_stat}

Same as stat except that `live_words`, `live_blocks`, `free_words`, `free_blocks`, `largest_free`, and `fragments` are set to `0`. This function is much faster than `gc.stat` because it does not need to go through the heap.

Type:

```
() -> unit
```

Methods:

- `compactions` (of type `int`)
- `forced_major_collections` (of type `int`)
- `fragments` (of type `int`)
- `free_blocks` (of type `int`)
- `free_words` (of type `int`)
- `heap_chunks` (of type `int`)
- `heap_words` (of type `int`)
- `largest_free` (of type `int`)
- `live_blocks` (of type `int`)
- `live_words` (of type `int`)
- `major_collections` (of type `int`)
- `major_words` (of type `float`)
- `minor_collections` (of type `int`)
- `minor_words` (of type `float`)
- `promoted_words` (of type `float`)
- `stack_size` (of type `int`)
- `top_heap_words` (of type `int`)

### `runtime.gc.set` {#runtime.gc.set}

Set the GC parameters.

Type:

```
(
 {
   allocation_policy : int,
   custom_major_ratio : int,
   custom_minor_max_size : int,
   custom_minor_ratio : int,
   major_heap_increment : int,
   max_overhead : int,
   minor_heap_size : int,
   space_overhead : int,
   stack_limit : int,
   verbose : int,
   window_size : int
 }) -> unit
```

Arguments:

- `(unlabeled)` (of type `
{
  allocation_policy : int,
  custom_major_ratio : int,
  custom_minor_max_size : int,
  custom_minor_ratio : int,
  major_heap_increment : int,
  max_overhead : int,
  minor_heap_size : int,
  space_overhead : int,
  stack_limit : int,
  verbose : int,
  window_size : int
}`)

### `runtime.gc.stat` {#runtime.gc.stat}

Return the current values of the memory management counters. This function examines every heap block to get the statistics.

Type:

```
() -> unit
```

Methods:

- `compactions` (of type `int`)
- `forced_major_collections` (of type `int`)
- `fragments` (of type `int`)
- `free_blocks` (of type `int`)
- `free_words` (of type `int`)
- `heap_chunks` (of type `int`)
- `heap_words` (of type `int`)
- `largest_free` (of type `int`)
- `live_blocks` (of type `int`)
- `live_words` (of type `int`)
- `major_collections` (of type `int`)
- `major_words` (of type `float`)
- `minor_collections` (of type `int`)
- `minor_words` (of type `float`)
- `promoted_words` (of type `float`)
- `stack_size` (of type `int`)
- `top_heap_words` (of type `int`)

### `runtime.locale.set` {#runtime.locale.set}

Set the system's locale. This sets `LANG` and `LC_ALL` environment variables to the given value and then calls `setlocale`. This is set to `"C"` on startup, which defaults to the system's default locale. Keep in mind that changing this can potentially impact some functions such a `float_of_string`.

Type:

```
(string) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`)

### `runtime.memory` {#runtime.memory}

Returns information about the system and process' memory.

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

### `runtime.sys.word_size` {#runtime.sys.word_size}

Size of one word on the machine currently executing the program, in bits. Either `32` or `64`.

Type:

```
int
```

### `shutdown` {#shutdown}

Shutdown the application.

Type:

```
(?code : int) -> unit
```

Arguments:

- `code` (of type `int`, which defaults to `0`): Exit code. Default: `0`

### `source.is_up` {#source.is_up}

Check whether a source is up.

Type:

```
(source('a)) -> bool
```

Arguments:

- `(unlabeled)` (of type `source('a)`)
