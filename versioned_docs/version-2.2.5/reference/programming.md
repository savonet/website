---
title: "Programming"
description: "Ensure that a condition is satisfied (raise error.assertion exception otherwise)."
---
### `assert` {#assert}

Ensure that a condition is satisfied (raise `error.assertion` exception otherwise).

Type:

```
(bool) -> unit
```

Arguments:

- `(unlabeled)` (of type `bool`): Condition which should be satisfied.

### `error.on_error` {#error.on_error}

Register a callback to monitor errors raised during the execution of the program. The callback is allow to re-raise a different error if needed.

Type:

```
(((error
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
   }) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `(error
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
 }) -> unit`)

### `error.raise` {#error.raise}

Raise an error.

Type:

```
(error, ?string) -> 'a
```

Arguments:

- `(unlabeled)` (of type `error`): Error kind.
- `(unlabeled)` (of type `string`, which defaults to `""`): Description of the error.

### `error.register` {#error.register}

Register an error of the given kind

Type:

```
(string) -> error
```

Arguments:

- `(unlabeled)` (of type `string`): Kind of the error

Methods:

- `kind` (of type `string`): Error kind.
- `message` (of type `string`): Error message.
- `trace` (of type `[
 {
   position_end : 
   {character_offset : int, filename : string, line_number : int
   },
   position_start : 
   {character_offset : int, filename : string, line_number : int
   },
   to_string : (?prefix : string) -> string
 }]`): Error stacktrace.

### `failwith` {#failwith}

Major failure.

Type:

```
(string) -> 'a
```

Arguments:

- `(unlabeled)` (of type `string`): Explanation about the failure.

### `fst` {#fst}

Get the first component of a pair.

Type:

```
(('a * 'b)) -> 'a
```

Arguments:

- `(unlabeled)` (of type `'a * 'b`)

### `ignore` {#ignore}

Convert anything to unit, preventing warnings.

Type:

```
('a) -> unit
```

Arguments:

- `(unlabeled)` (of type `'a`)

### `memoize` {#memoize}

Memoize the result of a function, making sure it is only executed once.

Type:

```
((() -> 'a)) -> () -> 'a where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `() -> 'a where 'a is an orderable type`)

### `null` {#null}

Create a nullable value.

Type:

```
(?'a?) -> 'a?
```

Arguments:

- `(unlabeled)` (of type `'a?`, which defaults to `null`): Value to make nullable.

### `null.case` {#null.case}

Return a result dending on whether a value is nothing or not.

Type:

```
('a?, (() -> 'b), (('a) -> 'b)) -> 'b
```

Arguments:

- `(unlabeled)` (of type `'a?`): Value to reason by case analysis on.
- `(unlabeled)` (of type `() -> 'b`): Value to return in case we have nothing.
- `(unlabeled)` (of type `('a) -> 'b`): Value to return in case we have something.

### `null.default` {#null.default}

Return a result dending on whether a value is nothing or not.

Type:

```
('a?, (() -> 'a)) -> 'a
```

Arguments:

- `(unlabeled)` (of type `'a?`): Value to reason by case analysis on.
- `(unlabeled)` (of type `() -> 'a`): Value to return in case we have nothing.

### `null.defined` {#null.defined}

Determine whether a nullable value is not null.

Type:

```
('a?) -> bool
```

Arguments:

- `(unlabeled)` (of type `'a?`)

### `null.find` {#null.find}

Find the first element of a list for which the image of the function is not `null`. Raises `error.not_found` if not element is found and no default value was specified.

Type:

```
(?default : 'a??, (('b) -> 'a?), ['b]) -> 'a?
```

Arguments:

- `default` (of type `'a??`, which defaults to `null`): Returned value when no element is found.
- `(unlabeled)` (of type `('b) -> 'a?`): Function.
- `(unlabeled)` (of type `['b]`): List.

### `null.get` {#null.get}

Get the value of a nullable. Raises `error.not_found` if the value is `null` and no default value was specified.

Type:

```
(?default : 'a?, 'a?) -> 'a
```

Arguments:

- `default` (of type `'a?`, which defaults to `null`): Returned value when the value is `null`.
- `(unlabeled)` (of type `'a?`)

### `null.map` {#null.map}

Apply a function on a nullable value if it is not null, and return null otherwise.

Type:

```
((('a) -> 'b?), 'a?) -> 'b?
```

Arguments:

- `(unlabeled)` (of type `('a) -> 'b?`)
- `(unlabeled)` (of type `'a?`)

### `null.to_list` {#null.to_list}

Convert a nullable value to a list containing zero or one element depending on whether the value is null or not.

Type:

```
('a?) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `'a?`)

### `position` {#position}

Return the current position in the script

Type:

```
() -> unit
```

Methods:

- `character_offset` (of type `int`): character offset
- `filename` (of type `string`): filename
- `line_number` (of type `int`): line number

### `predicate.activates` {#predicate.activates}

Detect when a predicate becomes true.

Type:

```
(?init : bool, (() -> bool)) -> () -> bool
```

Arguments:

- `init` (of type `bool`, which defaults to `false`): Detect at beginning.
- `(unlabeled)` (of type `() -> bool`): Predicate.

### `predicate.at_most` {#predicate.at_most}

Limit the number of times a predicate is true is a row.

Type:

```
(int, (() -> bool)) -> () -> bool
```

Arguments:

- `(unlabeled)` (of type `int`): Number of times the predicate is allowed to be true.
- `(unlabeled)` (of type `() -> bool`): Predicate.

### `predicate.changes` {#predicate.changes}

Detect when a predicate changes.

Type:

```
((() -> 'a)) -> () -> bool where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `() -> 'a where 'a is an orderable type`): Predicate.

### `predicate.first` {#predicate.first}

First occurrence of a predicate.

Type:

```
((() -> bool)) -> () -> bool
```

Arguments:

- `(unlabeled)` (of type `() -> bool`): Predicate.

### `predicate.once` {#predicate.once}

Become true once every time a predicate is true.

Type:

```
((() -> bool)) -> () -> bool
```

Arguments:

- `(unlabeled)` (of type `() -> bool`): Predicate.

### `predicate.signal` {#predicate.signal}

Predicate which is true when a signal is sent. The returned predicate has a method `signal` to send the signal.

Type:

```
() -> () -> bool
```

Methods:

- `signal` (of type `() -> unit`): Send a signal.

### `print` {#print}

Print on standard output.

Type:

```
(?newline : bool, 'a) -> unit
```

Arguments:

- `newline` (of type `bool`, which defaults to `true`): If true, a newline is added after displaying the value.
- `(unlabeled)` (of type `'a`)

### `ref` {#ref}

Create a reference, i.e. a value which can be modified.

Type:

```
('a) -> () -> 'a
```

Arguments:

- `(unlabeled)` (of type `'a`)

Methods:

- `set` (of type `('A) -> unit`): Set the value of the reference.

### `ref.getter` {#ref.getter}

Create a getter from a reference (sometimes useful to remove the `set` method).

Type:

```
((() -> 'a).{set : ('a) -> unit}) -> () -> 'a
```

Arguments:

- `(unlabeled)` (of type `(() -> 'a).{set : ('a) -> unit}`)

### `ref.incr` {#ref.incr}

Increment a reference to an integer.

Type:

```
((() -> int).{set : (int) -> 'a}) -> 'a
```

Arguments:

- `(unlabeled)` (of type `(() -> int).{set : (int) -> 'a}`)

### `ref.make` {#ref.make}

Create a reference from a pair of get / set functions.

Type:

```
((() -> 'a), (('a) -> unit)) -> () -> 'a
```

Arguments:

- `(unlabeled)` (of type `() -> 'a`): Function to retrieve the value of the reference.
- `(unlabeled)` (of type `('a) -> unit`): Function to change the value of the reference.

Methods:

- `set` (of type `('A) -> unit`): Set the value of the reference.

### `ref.map` {#ref.map}

Map functions to a reference.

Type:

```
((('a) -> 'b), (('b) -> 'a), (() -> 'a).{set : ('a) -> unit}) -> () -> 'b
```

Arguments:

- `(unlabeled)` (of type `('a) -> 'b`): Function to apply to the getter.
- `(unlabeled)` (of type `('b) -> 'a`): Function to apply to the setter.
- `(unlabeled)` (of type `(() -> 'a).{set : ('a) -> unit}`)

Methods:

- `set` (of type `('A) -> unit`): Set the value of the reference.

### `snd` {#snd}

Get the second component of a pair.

Type:

```
(('a * 'b)) -> 'b
```

Arguments:

- `(unlabeled)` (of type `'a * 'b`)

### `thread.on_error` {#thread.on_error}

Register the function to be called when an error of the given kind is raised in a thread. Catches all errors if first argument is `null`.

Type:

```
(error
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
 }?,
 ((backtrace : string, error
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
   }) -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `error
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
}?`)
- `(unlabeled)` (of type `(backtrace : string, error
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
 }) -> unit`)

### `thread.pause` {#thread.pause}

Pause execution for a given amount of seconds. This freezes the calling thread and should not be used in the main streaming loop.

Type:

```
(float) -> unit
```

Arguments:

- `(unlabeled)` (of type `float`): Number of seconds of pause.

### `thread.run` {#thread.run}

Run a function in a separate thread.

Type:

```
(?fast : bool, ?delay : float, ?every : {float}?, (() -> unit)) -> unit
```

Arguments:

- `fast` (of type `bool`, which defaults to `true`): Whether the thread is supposed to return quickly or not. Typically, blocking tasks (e.g. fetching data over the internet) should not be considered to be fast. When set to `false` its priority will be lowered below that of request resolutions and fast timeouts. This is only effective if you set a dedicated queue for fast tasks, see the "scheduler" settings for more details.
- `delay` (of type `float`, which defaults to `0.`): Delay (in seconds) after which the thread should be launched.
- `every` (of type `{float}?`, which defaults to `null`): How often (in seconds) the thread should be run. If negative or `null`, run once.
- `(unlabeled)` (of type `() -> unit`): Function to execute.

### `thread.run.recurrent` {#thread.run.recurrent}

Run a recurrent function in a separate thread.

Type:

```
(?fast : bool, ?delay : float, (() -> float)) -> unit
```

Arguments:

- `fast` (of type `bool`, which defaults to `true`): Whether the thread is supposed to return quickly or not. Typically, blocking tasks (e.g. fetching data over the internet) should not be considered to be fast. When set to `false` its priority will be lowered below that of request resolutions and fast timeouts. This is only effective if you set a dedicated queue for fast tasks, see the "scheduler" settings for more details.
- `delay` (of type `float`, which defaults to `0.`): Delay (in sec.) after which the thread should be launched.
- `(unlabeled)` (of type `() -> float`): Function to execute recurrently. The returned value is the delay (in sec.) in which the function should be run again (it won't be run if the value is strictly negative).

### `thread.when` {#thread.when}

Execute a callback when a predicate is `true`. The predicate is checked `every` seconds and the callback is called when the predicate returns `true` after having been `false`, following the same semantics as `predicate.activates`.

Type:

```
(?fast : bool, ?init : bool, ?every : {float}, ?once : bool, ?changed : bool,
 (() -> bool), (() -> 'a)) -> unit
```

Arguments:

- `fast` (of type `bool`, which defaults to `true`): Whether the callback is supposed to return quickly or not.
- `init` (of type `bool`, which defaults to `true`): Detect at beginning.
- `every` (of type `{float}`, which defaults to `0.5`): How often (in sec.) to check for the predicate.
- `once` (of type `bool`, which defaults to `false`): Execute the function only once.
- `changed` (of type `bool`, which defaults to `true`): Execute the function only if the predicate was false when last checked.
- `(unlabeled)` (of type `() -> bool`): Predicate indicating when to execute the function, typically a time interval such as `{10h-10h30}`.
- `(unlabeled)` (of type `() -> 'a`): Function to execute when the predicate is true.

### `while` {#while}

A while loop.

Type:

```
({bool}, (() -> unit)) -> unit
```

Arguments:

- `(unlabeled)` (of type `{bool}`): Condition guarding the loop.
- `(unlabeled)` (of type `() -> unit`): Function to execute.
