---
title: "Track / Audio processing"
description: "Mix audio tracks with optional normalization."
---
### `track.audio.add` {#track.audio.add}

Mix audio tracks with optional normalization.

Type:

```
(?id : string?, [pcm('a).{weight? : {float}}], ?normalize : {bool},
 ?power : {bool}) -> pcm('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `[pcm('a).{weight? : {float}}]`)
- `normalize` (of type `{bool}`, which defaults to `true`): Divide by the sum of weights of ready sources (or by the number of ready sources if weights are not specified).
- `power` (of type `{bool}`, which defaults to `false`): Perform constant-power normalization.

### `track.audio.amplify` {#track.audio.amplify}

Multiply the amplitude of the signal.

Type:

```
(?id : string?, {float}, ?override : string?, pcm('a)) -> pcm('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `{float}`): Multiplicative factor.
- `override` (of type `string?`, which defaults to `"liq_amplify"`): Specify the name of a metadata field that, when present and well-formed, overrides the amplification factor for the current track. Well-formed values are floats in decimal notation (e.g. `0.7`) which are taken as normal/linear multiplicative factors; values can be passed in decibels with the suffix `dB` (e.g. `-8.2 dB`, but the spaces do not matter).
- `(unlabeled)` (of type `pcm('a)`)

### `track.audio.clip` {#track.audio.clip}

Clip samples, i.e. ensure that all values are between -1 and 1: values lower than -1 become -1 and values higher than 1 become 1. `nan` values become `0.`

Type:

```
(?id : string?, pcm('a)) -> pcm('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `pcm('a)`)

### `track.audio.comb` {#track.audio.comb}

Comb filter.

Type:

```
(?id : string?, ?delay : float, ?feedback : {float}, pcm('a)) -> pcm('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `delay` (of type `float`, which defaults to `0.001`): Delay in seconds.
- `feedback` (of type `{float}`, which defaults to `-6.`): Feedback coefficient in dB.
- `(unlabeled)` (of type `pcm('a)`)

### `track.audio.compand` {#track.audio.compand}

Compand the signal.

Type:

```
(?id : string?, ?mu : float, source(pcm('a))) -> pcm('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `mu` (of type `float`, which defaults to `1.`)
- `(unlabeled)` (of type `source(pcm('a))`)

### `track.audio.compress` {#track.audio.compress}

Compress the signal.

Type:

```
(?id : string?, ?attack : {float}, ?release : {float}, ?lookahead : {float},
 ?threshold : {float}, ?track_sensitive : bool, ?knee : {float},
 ?pre_gain : {float}, ?gain : {float}, ?ratio : {float}, ?window : {float},
 ?wet : {float}, pcm('a)) -> pcm('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `attack` (of type `{float}`, which defaults to `50.`): Attack time (ms).
- `release` (of type `{float}`, which defaults to `400.`): Release time (ms).
- `lookahead` (of type `{float}`, which defaults to `0.`): Lookahead (ms).
- `threshold` (of type `{float}`, which defaults to `-10.`): Threshold level (dB).
- `track_sensitive` (of type `bool`, which defaults to `false`): Reset on every track.
- `knee` (of type `{float}`, which defaults to `1.`): Knee width (dB).
- `pre_gain` (of type `{float}`, which defaults to `0.`): Pre-amplification (dB).
- `gain` (of type `{float}`, which defaults to `0.`): Post-amplification (dB).
- `ratio` (of type `{float}`, which defaults to `2.`): Gain reduction ratio (reduction is ratio:1). Must be at least 1.
- `window` (of type `{float}`, which defaults to `0.`): RMS window length (second). `0.` means peak mode.
- `wet` (of type `{float}`, which defaults to `1.`): How much of input sound to output (between 0 and 1, 0 means only original sound, 1 means only compressed sound).
- `(unlabeled)` (of type `pcm('a)`)

Methods:

- `gain` (of type `() -> float`): Gain (dB).
- `rms` (of type `() -> float`): RMS or peak power (linear).

### `track.audio.compress.exponential` {#track.audio.compress.exponential}

Exponential compressor.

Type:

```
(?id : string?, ?mu : float, pcm('a)) -> pcm('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `mu` (of type `float`, which defaults to `2.`): Exponential compression factor, typically greater than 1.
- `(unlabeled)` (of type `pcm('a)`)

### `track.audio.map` {#track.audio.map}

Map a function to all audio samples. This is SLOW!

Type:

```
(?id : string?, ((float) -> float), pcm('a)) -> pcm('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `(float) -> float`)
- `(unlabeled)` (of type `pcm('a)`)

This function is experimental.

### `track.audio.stereo.ms.decode` {#track.audio.stereo.ms.decode}

Decode mid+side stereo (M/S) to left+right stereo.

Type:

```
(?id : string?, ?width : float, pcm(stereo)) -> pcm(stereo)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `width` (of type `float`, which defaults to `1.`): Width of the stereo field.
- `(unlabeled)` (of type `pcm(stereo)`)

### `track.audio.stereo.ms.encode` {#track.audio.stereo.ms.encode}

Encode left+right stereo to mid+side stereo (M/S).

Type:

```
(?id : string?, pcm(stereo)) -> pcm(stereo)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `pcm(stereo)`)

### `track.audio.stereo.pan` {#track.audio.stereo.pan}

Pan a stereo sound.

Type:

```
(?id : string?, ?pan : {float}, ?field : {float}, pcm(stereo)) -> pcm(stereo)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `pan` (of type `{float}`, which defaults to `0.`): Pan ranges between -1 and 1.
- `field` (of type `{float}`, which defaults to `90.`): Field width in degrees (between 0 and 90).
- `(unlabeled)` (of type `pcm(stereo)`)

### `track.audio.stereo.width` {#track.audio.stereo.width}

Spacializer which allows controlling the width of the signal.

Type:

```
(?id : string?, ?{float}, pcm(stereo)) -> pcm(stereo)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `{float}`, which defaults to `0.`): Width of the signal (-1: mono, 0.: original, 1.: wide stereo).
- `(unlabeled)` (of type `pcm(stereo)`)

### `track.audio.stereotool` {#track.audio.stereotool}

Process the given audio track with StereoTool.

Type:

```
(?id : string?, library_file : string, ?license_key : string?,
 ?preset : string?, ?load_type : string, pcm('a)) -> pcm('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `library_file` (of type `string`): Path to the shared library file.
- `license_key` (of type `string?`, which defaults to `null`)
- `preset` (of type `string?`, which defaults to `null`): Path to a preset file to load when initializing the operator.
- `load_type` (of type `string`, which defaults to `"totalinit"`): Load type for preset. One of: "totalinit", "all_settings", "audiofm", "audio", "processing", "repair", "repair_no_pnr" or "sublevel_pnr".
- `(unlabeled)` (of type `pcm('a)`)

Methods:

- `api_version` (of type `() -> int`): API version.
- `latency` (of type `() -> float`): Get the operator's latency.
- `software_version` (of type `() -> int`): Software version.
- `unlincensed_used_features` (of type `() -> string?`): Check if the license is valid for the current settings.
- `valid_license` (of type `() -> bool`): Check if the license is valid for the current settings.

### `track.audio.stretch` {#track.audio.stretch}

Slow down or accelerate an audio stream by stretching (sounds lower) or squeezing it (sounds higher).

Type:

```
(?id : string?, ratio : {float}, pcm('a)) -> pcm('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `ratio` (of type `{float}`): A value higher than 1 means slowing down.
- `(unlabeled)` (of type `pcm('a)`)

### `track.decode.audio.pcm_f32` {#track.decode.audio.pcm_f32}

Decode an audio track using PCM signed 16 bit integers.

Type:

```
(?id : string?, pcm_f32('a)) -> pcm('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `pcm_f32('a)`)

### `track.decode.audio.pcm_s16` {#track.decode.audio.pcm_s16}

Decode an audio track using PCM signed 16 bit integers.

Type:

```
(?id : string?, pcm_s16('a)) -> pcm('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `pcm_s16('a)`)

### `track.encode.audio.pcm_f32` {#track.encode.audio.pcm_f32}

Encode an audio track using PCM signed 16 bit integers.

Type:

```
(?id : string?, pcm('a)) -> pcm_f32('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `pcm('a)`)

### `track.encode.audio.pcm_s16` {#track.encode.audio.pcm_s16}

Encode an audio track using PCM signed 16 bit integers.

Type:

```
(?id : string?, pcm('a)) -> pcm_s16('a)
```

Arguments:

- `id` (of type `string?`, which defaults to `null`): Force the value of the track ID.
- `(unlabeled)` (of type `pcm('a)`)
