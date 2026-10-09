---
title: "Source / Testing"
description: "Sleep regularly, thus inducing delays in the sound production. This is mainly useful for emulating network delays or sources which are slow to produce…"
---
### `sleeper` {#sleeper}

Sleep regularly, thus inducing delays in the sound production. This is mainly useful for emulating network delays or sources which are slow to produce data, and thus test bufferization and robustness of scripts.

Type:

```
(?every : float, ?delay : float, ?delay_random : float,
 ?on_delay : ((float) -> unit), source('a)) -> source('a)
```

Arguments:

- `every` (of type `float`, which defaults to `1.0`): How often we should sleep (in seconds, 0 means every frame).
- `delay` (of type `float`, which defaults to `1.1`): Delay introduced (in seconds).
- `delay_random` (of type `float`, which defaults to `0.0`): Maximum amount of time randomly added to the delay (in seconds).
- `on_delay` (of type `(float) -> unit`, which defaults to `fun (_) -> ()`): Function called when a delay is introduced, with the delay as argument.
- `(unlabeled)` (of type `source('a)`): Source in which the delays should be introduced.

Methods:

- `frozen` (of type `(() -> bool).{set : (bool) -> unit}`): The stream production is frozen while set to `true`.

This function is experimental.
