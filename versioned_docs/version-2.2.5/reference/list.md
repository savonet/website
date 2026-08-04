---
title: "List"
description: "Add an element at the top of a list."
---
### `_::_` {#section-6}

Add an element at the top of a list.

Type:

```
('a, ['a]) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `'a`)
- `(unlabeled)` (of type `['a]`)

### `_[_]` {#section-7}

l[k] returns the first v such that (k,v) is in the list l (or "" if no such v exists).

Type:

```
(['a * string], 'a) -> string where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `['a * string] where 'a is an orderable type`)
- `(unlabeled)` (of type `anything that is an orderable type`)

### `list.add` {#list.add}

Add an element at the top of a list.

Type:

```
('a, ['a]) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `'a`)
- `(unlabeled)` (of type `['a]`)

### `list.append` {#list.append}

Concatenate two lists.

Type:

```
(['a], ['a]) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `['a]`)
- `(unlabeled)` (of type `['a]`)

### `list.assoc` {#list.assoc}

Associate a value to a key in an association list. This functions raises `error.not_found` if no default value is specified.

Type:

```
(?default : 'a?, 'b, ['b * 'a]) -> 'a where 'b is an orderable type
```

Arguments:

- `default` (of type `'a?`, which defaults to `null`): Value returned if the key is not found.
- `(unlabeled)` (of type `anything that is an orderable type`)
- `(unlabeled)` (of type `['b * 'a] where 'b is an orderable type`)

### `list.assoc.filter` {#list.assoc.filter}

Keep only the elements of an association list satisfying a given predicate.

Type:

```
((('a, 'b) -> bool), ['a * 'b]) -> ['a * 'b]
```

Arguments:

- `(unlabeled)` (of type `('a, 'b) -> bool`)
- `(unlabeled)` (of type `['a * 'b]`)

### `list.assoc.filter_map` {#list.assoc.filter_map}

Map a function of every element of the associative list, removing the entry if the function returns `null`.

Type:

```
((('a, 'b) -> 'c?), ['a * 'b]) -> ['c]
```

Arguments:

- `(unlabeled)` (of type `('a, 'b) -> 'c?`)
- `(unlabeled)` (of type `['a * 'b]`)

### `list.assoc.mem` {#list.assoc.mem}

`list.assoc.mem(key,l)` returns `true` if `l` contains a pair (key,value).

Type:

```
('a, ['a * 'b]) -> bool where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `anything that is an orderable type`): Key to look for
- `(unlabeled)` (of type `['a * 'b] where 'a is an orderable type`): List of pairs (key,value)

### `list.assoc.remove` {#list.assoc.remove}

Remove the first pair from an associative list.

Type:

```
('a, ['a * 'b]) -> ['a * 'b] where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `anything that is an orderable type`): Key of pair to be removed.
- `(unlabeled)` (of type `['a * 'b] where 'a is an orderable type`): List of pairs (key,value).

### `list.assoc.remove.all` {#list.assoc.remove.all}

Remove all pairs with given key from an associative list.

Type:

```
('a, ['a * 'b]) -> ['a * 'b] where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `anything that is an orderable type`): Key of pairs to be removed.
- `(unlabeled)` (of type `['a * 'b] where 'a is an orderable type`): List of pairs (key,value).

### `list.case` {#list.case}

Define a function by case analysis, depending on whether a list is empty or not.

Type:

```
(['a], 'b, (('a, ['a]) -> 'b)) -> 'b
```

Arguments:

- `(unlabeled)` (of type `['a]`): List to perform case analysis on.
- `(unlabeled)` (of type `'b`): Result when the list is empty.
- `(unlabeled)` (of type `('a, ['a]) -> 'b`): Result when the list is non-empty.

### `list.cons` {#list.cons}

Add an element at the top of a list.

Type:

```
('a, ['a]) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `'a`)
- `(unlabeled)` (of type `['a]`)

### `list.dcase` {#list.dcase}

"Delayed" version of `list.case` where the value on empty list is only evaluated if necessary.

Type:

```
(['a], (() -> 'b), (('a, ['a]) -> 'b)) -> 'b
```

Arguments:

- `(unlabeled)` (of type `['a]`)
- `(unlabeled)` (of type `() -> 'b`)
- `(unlabeled)` (of type `('a, ['a]) -> 'b`)

### `list.exists` {#list.exists}

Check that a predicate is satisfied for some element in a list.

Type:

```
((('a) -> bool), ['a]) -> bool
```

Arguments:

- `(unlabeled)` (of type `('a) -> bool`): Predicate.
- `(unlabeled)` (of type `['a]`): List

### `list.filter` {#list.filter}

Filter a list according to a predicate. The order in which elements are handled is not specified (and is currently implemented from the right).

Type:

```
(?remove : (('a) -> unit), (('a) -> bool), ['a]) -> ['a]
```

Arguments:

- `remove` (of type `('a) -> unit`, which defaults to `fun (_) -> ()`): Function called on an element when it is removed.
- `(unlabeled)` (of type `('a) -> bool`): Predicate indicating whether an element should be kept or not.
- `(unlabeled)` (of type `['a]`): List to filter.

### `list.filter_map` {#list.filter_map}

Map a function on a list (like `list.map`) excepting that the value is removed if the function returns `null`.

Type:

```
((('a) -> 'b?), ['a]) -> ['b]
```

Arguments:

- `(unlabeled)` (of type `('a) -> 'b?`): Function called on every element of the list.
- `(unlabeled)` (of type `['a]`): The list.

### `list.find` {#list.find}

First element satisfying a predicate. Raises `error.not_found` if not element is found and no default value was specified.

Type:

```
(?default : 'a?, (('a) -> bool), ['a]) -> 'a
```

Arguments:

- `default` (of type `'a?`, which defaults to `null`): Returned value when the predicate is not found.
- `(unlabeled)` (of type `('a) -> bool`): Predicate.
- `(unlabeled)` (of type `['a]`): List

### `list.flatten` {#list.flatten}

Concatenate all the elements of a list of lists.

Type:

```
([['a]]) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `[['a]]`)

### `list.fold` {#list.fold}

Fold a function on every element of a list: `list.fold(f,x1,[e1,..,en]) is f(...f(f(x1,e1),e2)...,en)`.

Type:

```
((('a, 'b) -> 'a), 'a, ['b]) -> 'a
```

Arguments:

- `(unlabeled)` (of type `('a, 'b) -> 'a`): Function `f` for which `f(x,e)` which will be called on every element `e` with the current value of `x`, returning the new value of `x`.
- `(unlabeled)` (of type `'a`): Initial value x1, to be updated by successive calls of `f(x,e)`.
- `(unlabeled)` (of type `['b]`)

### `list.fold.right` {#list.fold.right}

Fold a function on every element of a list. Similar to `list.fold` but iterates from the right of the list. It is slightly more efficient than `list.fold`.

Type:

```
((('a, 'b) -> 'b), 'b, ['a]) -> 'b
```

Arguments:

- `(unlabeled)` (of type `('a, 'b) -> 'b`): Function `f` for which `f(x,e)` which will be called on every element `e` with the current value of `x`, returning the new value of `x`.
- `(unlabeled)` (of type `'b`): Initial value x1, to be updated by successive calls of `f(x,e)`.
- `(unlabeled)` (of type `['a]`)

### `list.for_all` {#list.for_all}

Check that a predicate is satisfied for every element in a list.

Type:

```
((('a) -> bool), ['a]) -> bool
```

Arguments:

- `(unlabeled)` (of type `('a) -> bool`): Predicate.
- `(unlabeled)` (of type `['a]`): List

### `list.hd` {#list.hd}

Return the head (first element) of a list, or `default` if the list is empty.

Type:

```
(?default : 'a?, ['a]) -> 'a
```

Arguments:

- `default` (of type `'a?`, which defaults to `null`): Default value if key does not exist.
- `(unlabeled)` (of type `['a]`)

### `list.ind` {#list.ind}

Define a function by induction on a list. This is slightly more efficient than defining a recursive function. The list is scanned from the right.

Type:

```
(['a], 'b, (('a, ['a], 'b) -> 'b)) -> 'b
```

Arguments:

- `(unlabeled)` (of type `['a]`): List to perform induction on.
- `(unlabeled)` (of type `'b`): Result when the list is empty.
- `(unlabeled)` (of type `('a, ['a], 'b) -> 'b`): Result when the list is non-empty, given the current element, the tail and the result of the recursive call on the tail.

### `list.index` {#list.index}

First index where a predicate is satisfied.

Type:

```
((('a) -> bool), ['a]) -> int
```

Arguments:

- `(unlabeled)` (of type `('a) -> bool`): Predicate.
- `(unlabeled)` (of type `['a]`): List

### `list.indexed` {#list.indexed}

Add indices to every element of a list, so that it can be accessed with the notation `l[n]`.

Type:

```
(['a]) -> [int * 'a]
```

Arguments:

- `(unlabeled)` (of type `['a]`)

### `list.init` {#list.init}

Initialize a list.

Type:

```
(int, ((int) -> 'a)) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `int`): Number of elements in the list.
- `(unlabeled)` (of type `(int) -> 'a`): Function such that `f i` is the `i`th element.

### `list.insert` {#list.insert}

Returns a copy of the given list with a new element inserted at a given position. Raises `error.not_found` if the list has less than `index` elements.

Type:

```
(int, 'a, ['a]) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `int`): Index to insert at, starting at `0`.
- `(unlabeled)` (of type `'a`): Element to insert
- `(unlabeled)` (of type `['a]`): List to insert into.

### `list.is_empty` {#list.is_empty}

Determining whether a list is empty or not.

Type:

```
(['a]) -> bool
```

Arguments:

- `(unlabeled)` (of type `['a]`)

### `list.iter` {#list.iter}

Call a function on every element of a list.

Type:

```
((('a) -> unit), ['a]) -> unit
```

Arguments:

- `(unlabeled)` (of type `('a) -> unit`)
- `(unlabeled)` (of type `['a]`)

### `list.iterator` {#list.iterator}

Create an iterator over the elements of a list.

Type:

```
(['a?]) -> () -> 'a?
```

Arguments:

- `(unlabeled)` (of type `['a?]`)

### `list.iteri` {#list.iteri}

Call a function on every element of a list, along with its index.

Type:

```
(((int, 'a) -> unit), ['a]) -> unit
```

Arguments:

- `(unlabeled)` (of type `(int, 'a) -> unit`)
- `(unlabeled)` (of type `['a]`)

### `list.last` {#list.last}

Return the last element of a list.

Type:

```
(?default : 'a?, ['a]) -> 'a
```

Arguments:

- `default` (of type `'a?`, which defaults to `null`)
- `(unlabeled)` (of type `['a]`)

### `list.length` {#list.length}

Compute the length of a list, i.e., the number of its elements.

Type:

```
(['a]) -> int
```

Arguments:

- `(unlabeled)` (of type `['a]`)

### `list.make` {#list.make}

Create a list with given length, filled with given element.

Type:

```
(int, 'a) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `int`): Number of elements in the list.
- `(unlabeled)` (of type `'a`): Element to fill the list with.

### `list.map` {#list.map}

Map a function on every element of a list.

Type:

```
((('a) -> 'b), ['a]) -> ['b]
```

Arguments:

- `(unlabeled)` (of type `('a) -> 'b`)
- `(unlabeled)` (of type `['a]`)

### `list.map.right` {#list.map.right}

Map a function on every element of a list, starting from the right. This function is tail-recursive.

Type:

```
((('a) -> 'b), ['a]) -> ['b]
```

Arguments:

- `(unlabeled)` (of type `('a) -> 'b`)
- `(unlabeled)` (of type `['a]`)

### `list.mapi` {#list.mapi}

Map a function on every element of a list, along with its index.

Type:

```
(((int, 'a) -> 'b), ['a]) -> ['b]
```

Arguments:

- `(unlabeled)` (of type `(int, 'a) -> 'b`)
- `(unlabeled)` (of type `['a]`)

### `list.mem` {#list.mem}

Check whether an element belongs to a list.

Type:

```
('a, ['a]) -> bool where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `anything that is an orderable type`)
- `(unlabeled)` (of type `['a] where 'a is an orderable type`)

### `list.nth` {#list.nth}

Get the n-th element of a list (the first element is at position 0), or `default` if element does not exist.

Type:

```
(?default : 'a?, ['a], int) -> 'a
```

Arguments:

- `default` (of type `'a?`, which defaults to `null`): Default element. Raises `error.not_found` if `null` and no element can be found in the list.
- `(unlabeled)` (of type `['a]`)
- `(unlabeled)` (of type `int`)

### `list.pick` {#list.pick}

Pick a random element in a list.

Type:

```
(?default : 'a?, ['a]) -> 'a
```

Arguments:

- `default` (of type `'a?`, which defaults to `null`): Value returned if the list is empty.
- `(unlabeled)` (of type `['a]`): List in which the element should be picked.

### `list.prefix` {#list.prefix}

Compute the beginning of a list.

Type:

```
(int, ['a]) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `int`): Number of elements in the returned list.
- `(unlabeled)` (of type `['a]`): List whose prefix should be taken.

### `list.remove` {#list.remove}

Remove the first occurrence of a value from a list.

Type:

```
('a, ['a]) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `'a`)
- `(unlabeled)` (of type `['a]`)

### `list.rev` {#list.rev}

Revert list order.

Type:

```
(['a]) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `['a]`)

### `list.shuffle` {#list.shuffle}

Shuffle the content of a list. The function returns a list with the same elements but in different, random, order.

Type:

```
(['a]) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `['a]`)

### `list.sort` {#list.sort}

Sort a list according to a comparison function.

Type:

```
((('a, 'a) -> int), ['a]) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `('a, 'a) -> int`): Comparison function f such that f(x,y)<0 when x<y, f(x,y)=0 when x=y, and f(x,y)>0 when x>y.
- `(unlabeled)` (of type `['a]`): List to sort.

### `list.sort.natural` {#list.sort.natural}

Sort a list according to the "natural" order.

Type:

```
(['a]) -> ['a] where 'a is an orderable type
```

Arguments:

- `(unlabeled)` (of type `['a] where 'a is an orderable type`): List to sort

### `list.tl` {#list.tl}

Return the list without its first element.

Type:

```
(['a]) -> ['a]
```

Arguments:

- `(unlabeled)` (of type `['a]`)
