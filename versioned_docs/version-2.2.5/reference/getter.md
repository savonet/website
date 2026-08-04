---
title: "Getter"
description: "Create a getter."
---
### `getter` {#getter-1}

Create a getter.

Type:

```
({'a}) -> {'a}
```

Arguments:

- `(unlabeled)` (of type `{'a}`): Value from which the getter should be created.

### `getter.case` {#getter.case}

Return a value depending on whether the getter is constant or not.

Type:

```
({'a}, (('a) -> 'b), (((() -> 'a)) -> 'b)) -> 'b
```

Arguments:

- `(unlabeled)` (of type `{'a}`): Getter to inspect.
- `(unlabeled)` (of type `('a) -> 'b`)
- `(unlabeled)` (of type `((() -> 'a)) -> 'b`)

### `getter.changes` {#getter.changes}

Detect whether the value of the getter changes.

Type:

```
({'a}) -> () -> bool where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `{'a} where 'a is an orderable type`)

### `getter.float_of_int` {#getter.float_of_int}

Convert an int getter to a float getter.

Type:

```
({int}) -> {float}
```

Arguments:

- `(unlabeled)` (of type `{int}`)

### `getter.function` {#getter.function}

Construct a function returning the value of a getter.

Type:

```
({'a}) -> () -> 'a
```

Arguments:

- `(unlabeled)` (of type `{'a}`)

### `getter.get` {#getter.get}

Get the value of a getter.

Type:

```
({'a}) -> 'a
```

Arguments:

- `(unlabeled)` (of type `{'a}`)

### `getter.int_of_float` {#getter.int_of_float}

Convert a float getter to a int getter.

Type:

```
({float}) -> {int}
```

Arguments:

- `(unlabeled)` (of type `{float}`)

### `getter.is_constant` {#getter.is_constant}

Determine if a getter is a constant.

Type:

```
({'a}) -> bool
```

Arguments:

- `(unlabeled)` (of type `{'a}`)

### `getter.map` {#getter.map}

Apply a function on a getter.

Type:

```
((('a) -> 'b), {'a}) -> {'b}
```

Arguments:

- `(unlabeled)` (of type `('a) -> 'b`): Function to apply.
- `(unlabeled)` (of type `{'a}`)

### `getter.map.memoize` {#getter.map.memoize}

Apply a function on a getter. If the input value has not changed compared to last call, the previous result is returned without computing the function again.

Type:

```
((('a) -> 'b), {'a}) -> {'b} where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `('a) -> 'b where 'a is an orderable type`): Function to apply.
- `(unlabeled)` (of type `{'a} where 'a is an orderable type`)

### `getter.merge` {#getter.merge}

Give the latest value among two getters.

Type:

```
({'a}, {'a}) -> () -> 'a where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `{'a} where 'a is an orderable type`)
- `(unlabeled)` (of type `{'a} where 'a is an orderable type`)

### `getter.on_change` {#getter.on_change}

Execute a function when the value of the getter changes.

Type:

```
((('a) -> unit), {'a}) -> () -> 'a where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `('a) -> unit where 'a is an orderable type`)
- `(unlabeled)` (of type `{'a} where 'a is an orderable type`)
