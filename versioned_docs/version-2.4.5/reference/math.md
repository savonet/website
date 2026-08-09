---
title: "Math"
description: "Multiplication of numbers."
---
### `*` {#section-8}

Multiplication of numbers.

Type:

```
('a, 'a) -> 'a where 'a is a number type
```

Arguments:

- `(unlabeled)` (of type `anything that is a number type`)
- `(unlabeled)` (of type `anything that is a number type`)

### `+` {#section-9}

Addition of numbers.

Type:

```
('a, 'a) -> 'a where 'a is a number type
```

Arguments:

- `(unlabeled)` (of type `anything that is a number type`)
- `(unlabeled)` (of type `anything that is a number type`)

### `-` {#section-10}

Subtraction  of numbers.

Type:

```
('a, 'a) -> 'a where 'a is a number type
```

Arguments:

- `(unlabeled)` (of type `anything that is a number type`)
- `(unlabeled)` (of type `anything that is a number type`)

### `/` {#section-11}

Division of numbers.

Type:

```
('a, 'a) -> 'a where 'a is a number type
```

Arguments:

- `(unlabeled)` (of type `anything that is a number type`)
- `(unlabeled)` (of type `anything that is a number type`)

### `abs` {#abs}

Absolute value.

Type:

```
('a) -> 'a where 'a is a number type
```

Arguments:

- `(unlabeled)` (of type `anything that is a number type`)

### `acos` {#acos}

Arc cosine. The argument must fall within the range [-1.0, 1.0]. Result is in radians and is between 0.0 and pi.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `asin` {#asin}

Arc sine. The argument must fall within the range [-1.0, 1.0]. Result is in radians and is between -pi/2 and pi/2.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `atan` {#atan}

Arc tangent. Result is in radians and is between -pi/2 and pi/2.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `bool_of_float` {#bool_of_float}

Convert a float to a bool.

Type:

```
(float) -> bool
```

Arguments:

- `(unlabeled)` (of type `float`)

### `bool_of_int` {#bool_of_int}

Convert an int to a bool.

Type:

```
(int) -> bool
```

Arguments:

- `(unlabeled)` (of type `int`)

### `ceil` {#ceil}

Round above to an integer value. `ceil(x)` returns the least integer whose value is greater than or equal to `x`. The result is returned as a float.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `cos` {#cos}

Cosine. Argument is in radians.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `cosh` {#cosh}

Hyperbolic cosine. Argument is in radians.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `dB_of_lin` {#db_of_lin}

Convert linear scale into decibels.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `exp` {#exp}

Exponential.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `float` {#float}

Convert a number to a float.

Type:

```
('a) -> float where 'a is a number type
```

Arguments:

- `(unlabeled)` (of type `anything that is a number type`)

### `float.is_infinite` {#float.is_infinite}

Return `true` if the floating point number is infinite.

Type:

```
(float) -> bool
```

Arguments:

- `(unlabeled)` (of type `float`)

### `float.is_nan` {#float.is_nan}

Return `true` if the floating point number is `NaN`.

Type:

```
(float) -> bool
```

Arguments:

- `(unlabeled)` (of type `float`)

### `float.truncate` {#float.truncate}

Round a float to a given number of decimal digits. Mode can be `"ceil"` (round up), `"floor"` (round down), or `"default"` (round to nearest).

Type:

```
(?digits : int, ?mode : string, float) -> float
```

Arguments:

- `digits` (of type `int`, which defaults to `0`): Number of decimal digits to keep.
- `mode` (of type `string`, which defaults to `"default"`): Rounding mode: `"ceil"`, `"floor"`, or `"default"`.
- `(unlabeled)` (of type `float`)

### `float_of_int` {#float_of_int}

Convert an int to a float.

Type:

```
(int) -> float
```

Arguments:

- `(unlabeled)` (of type `int`)

### `floor` {#floor}

Round below to an integer value. `floor(x)` returns the greatest integer whose value is less than or equal to `x`. The result is returned as a float.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `infinity` {#infinity}

Float representation of infinity.

Type:

```
float
```

### `int` {#int}

Convert a number to an integer.

Type:

```
('a, ?raise : bool) -> int where 'a is a number type
```

Arguments:

- `(unlabeled)` (of type `anything that is a number type`)
- `raise` (of type `bool`, which defaults to `false`): Raise `error.invalid` if number is `NaN` or `+/-infinity`.

### `int_of_float` {#int_of_float}

Convert a float to a int.

Type:

```
(float) -> int
```

Arguments:

- `(unlabeled)` (of type `float`)

### `lin_of_dB` {#lin_of_db}

Convert decibels into linear scale.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `ln` {#ln}

Natural logarithm.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `log10` {#log10}

Base 10 logarithm.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `lsl` {#lsl}

Logical shift left.

Type:

```
(int, int) -> int
```

Arguments:

- `(unlabeled)` (of type `int`): Number to shift.
- `(unlabeled)` (of type `int`): Number of bits to shift.

### `lsr` {#lsr}

Logical shift right.

Type:

```
(int, int) -> int
```

Arguments:

- `(unlabeled)` (of type `int`): Number to shift.
- `(unlabeled)` (of type `int`): Number of bits to shift.

### `max` {#max}

Compute the maximum of two values.

Type:

```
('a, 'a) -> 'a where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `anything that is an orderable type`)
- `(unlabeled)` (of type `anything that is an orderable type`)

### `max_int` {#max_int}

Maximal representable integer.

Type:

```
int
```

### `min` {#min}

Compute the minimum of two values.

Type:

```
('a, 'a) -> 'a where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `anything that is an orderable type`)
- `(unlabeled)` (of type `anything that is an orderable type`)

### `min_int` {#min_int}

Minimal representable integer.

Type:

```
int
```

### `mod` {#mod}

Remainder of division of numbers.

Type:

```
('a, 'a) -> 'a where 'a is a number type
```

Arguments:

- `(unlabeled)` (of type `anything that is a number type`)
- `(unlabeled)` (of type `anything that is a number type`)

### `nan` {#nan}

A special floating-point value denoting the result of an undefined operation such as 0.0 /. 0.0. Stands for 'not a number'. Any floating-point operation with nan as argument returns nan as result. As for floating-point comparisons, `==`, `<`, `<=`, `>` and `>=` return `false` and `!=` returns `true` if one or both of their arguments is `nan`.

Type:

```
float
```

### `pow` {#pow}

Exponentiation of numbers.

Type:

```
('a, 'a) -> 'a where 'a is a number type
```

Arguments:

- `(unlabeled)` (of type `anything that is a number type`)
- `(unlabeled)` (of type `anything that is a number type`)

### `random.float` {#random.float}

Generate a random value between `min` (included) and `max` (excluded).

Type:

```
(?min : float, ?max : float) -> float
```

Arguments:

- `min` (of type `float`, which defaults to `0.0`)
- `max` (of type `float`, which defaults to `1.0`)

### `random.int` {#random.int}

Generate a random value between `min` (included) and `max` (excluded).

Type:

```
(?min : int, ?max : int) -> int
```

Arguments:

- `min` (of type `int`, which defaults to `-536870911`)
- `max` (of type `int`, which defaults to `536870912`)

### `round` {#round}

Rounds `x` to the nearest integer with ties (fractional values of `0.5`) rounded away from zero, regardless of the current rounding direction. If `x` is an integer, `+0.`, `-0.`, `nan`, or `infinite`, `x` itself is returned.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `sign` {#sign}

Return `1.` if the argument is positive and `-1.` otherwise.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `sin` {#sin}

Sine. Argument is in radians.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `sinh` {#sinh}

Hyperbolic sine. Argument is in radians.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `sqrt` {#sqrt}

Square root.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `tan` {#tan}

Tangent. Argument is in radians.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `tanh` {#tanh}

Hyperbolic tangent. Argument is in radians.

Type:

```
(float) -> float
```

Arguments:

- `(unlabeled)` (of type `float`)

### `~-` {#section-12}

Returns the opposite of its argument.

Type:

```
('a) -> 'a where 'a is a number type
```

Arguments:

- `(unlabeled)` (of type `anything that is a number type`)
