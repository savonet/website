---
title: "Time"
description: "Convert a duration in seconds to hour/minutes/seconds"
---
### `duration.split` {#duration.split}

Convert a duration in seconds to hour/minutes/seconds

Type:

```
(int) -> unit
```

Arguments:

- `(unlabeled)` (of type `int`)

Methods:

- `hours` (of type `int`): 
- `minutes` (of type `int`): 
- `seconds` (of type `int`): 

### `time` {#time-1}

Return the current time since 00:00:00 GMT, Jan. 1, 1970, in seconds.

Type:

```
() -> float
```

### `time.local` {#time.local}

Convert a time in seconds into a date in the local time zone (current time is used if no argument is provided).

Type:

```
(?float?) -> unit
```

Arguments:

- `(unlabeled)` (of type `float?`, which defaults to `null`)

Methods:

- `day` (of type `int`): Day of month.
- `dst` (of type `bool`): Daylight time savings in effect.
- `hour` (of type `int`): Hours.
- `min` (of type `int`): Minutes.
- `month` (of type `int`): Month of year.
- `sec` (of type `int`): Seconds.
- `week_day` (of type `int`): Day of week (Sunday is 0 or 7, Saturday is 6).
- `year` (of type `int`): Year.
- `year_day` (of type `int`): Day of year, between `1` and `366`.

### `time.make` {#time.make}

Convert a date and time in the local timezone into a time, in seconds, since 00:00:00 GMT, Jan. 1, 1970.

Type:

```
(
 {
   day : int,
   dst : bool?,
   hour : int,
   min : int,
   month : int,
   sec : int,
   year : int
 }) -> float
```

Arguments:

- `(unlabeled)` (of type `
{
  day : int,
  dst : bool?,
  hour : int,
  min : int,
  month : int,
  sec : int,
  year : int
}`)

### `time.predicate` {#time.predicate}

Parse a string as a time predicate

Type:

```
(string) -> () -> bool
```

Arguments:

- `(unlabeled)` (of type `string`)

### `time.string` {#time.string}

Obtain a string representation of the current time. It takes a string as argument where special strings are replaced roughly following [strftime](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes): %H is replaced by the current hour, %M minute, %S second, %A week day (%a week day abbreviated), %d month day, %B month name (%b month name abbreviated), %z timezone.

Type:

```
(?time : float?, ?string?) -> string
```

Example:

```liquidsoap
s = time.string("Current time is %H:%M.")
print(s)
```

Example:

```liquidsoap
# Backup a source naming the file based on time
output.file({time.string("/path/to/file%H%M%S.wav")}, ...)
```

Arguments:

- `time` (of type `float?`, which defaults to `null`): If specified convert the given time (in seconds since 00:00:00 GMT, Jan. 1, 1970) instead of the current time.
- `(unlabeled)` (of type `string?`, which defaults to `null`): Description of the string to produce, e.g. `"Current time is %H:%M`"`.

### `time.up` {#time.up}

Current time, in seconds, since the script has started.

Type:

```
() -> float
```

### `time.utc` {#time.utc}

Convert a time in seconds into a date in the UTC time zone (current time is used if no argument is provided).

Type:

```
(?float?) -> unit
```

Arguments:

- `(unlabeled)` (of type `float?`, which defaults to `null`)

Methods:

- `day` (of type `int`): Day of month.
- `dst` (of type `bool`): Daylight time savings in effect.
- `hour` (of type `int`): Hours.
- `min` (of type `int`): Minutes.
- `month` (of type `int`): Month of year.
- `sec` (of type `int`): Seconds.
- `week_day` (of type `int`): Day of week (Sunday is 0 or 7, Saturday is 6).
- `year` (of type `int`): Year.
- `year_day` (of type `int`): Day of year, between `1` and `366`.

### `time.zone` {#time.zone}

Returns a description of the time zone set for the running process.

Type:

```
() -> string
```

Methods:

- `daylight` (of type `string`): Daylight Savings Time
- `utc_diff` (of type `int`): Difference in seconds between the current timezone and UTC.

### `time.zone.set` {#time.zone.set}

Set the current time zone. This is equivalent to setting the `TZ` environment variable.

Type:

```
(string) -> unit
```

Arguments:

- `(unlabeled)` (of type `string`)
