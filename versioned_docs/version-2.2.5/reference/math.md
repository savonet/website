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

### `float_of_int` {#float_of_int}

Convert an int to a float.

Type:

```
(int) -> float
```

Arguments:

- `(unlabeled)` (of type `int`)

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
('a) -> int where 'a is a number type
```

Arguments:

- `(unlabeled)` (of type `anything that is a number type`)

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

- `min` (of type `float`, which defaults to `0.`)
- `max` (of type `float`, which defaults to `1.`)

### `random.int` {#random.int}

Generate a random value between `min` (included) and `max` (excluded).

Type:

```
(?min : int, ?max : int) -> int
```

Arguments:

- `min` (of type `int`, which defaults to `-536870911`)
- `max` (of type `int`, which defaults to `536870912`)

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
