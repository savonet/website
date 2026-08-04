---
title: "Source / Video processing"
description: "Input from ffmpeg."
---
### `input.external.ffmpeg` {#input.external.ffmpeg}

Input from ffmpeg.

Type:

```
(?id : string, ?show_command : bool, ?restart : bool,
 ?restart_on_error : bool, ?buffer : float, ?max : float, string) ->
source(audio=pcm(stereo), video=canvas('a))
```

Arguments:

- `id` (of type `string`, which defaults to `"input.external.ffmpeg"`)
- `show_command` (of type `bool`, which defaults to `false`)
- `restart` (of type `bool`, which defaults to `true`): restart on exit.
- `restart_on_error` (of type `bool`, which defaults to `false`): restart on exit with error.
- `buffer` (of type `float`, which defaults to `0.2`): Duration of the pre-buffered data.
- `max` (of type `float`, which defaults to `10.0`): Maximum duration of the buffered data.
- `(unlabeled)` (of type `string`): ffmpeg options specifying the input

### `video.external.testsrc` {#video.external.testsrc}

ffmpeg's test source video (useful for testing and debugging).

Type:

```
(?id : string, ?restart : bool, ?restart_on_error : bool, ?buffer : float,
 ?max : float, ?framerate : int) -> source(audio=pcm(stereo),
video=canvas('a))
```

Arguments:

- `id` (of type `string`, which defaults to `"video.external.testsrc"`)
- `restart` (of type `bool`, which defaults to `true`): restart on exit.
- `restart_on_error` (of type `bool`, which defaults to `false`): restart on exit with error.
- `buffer` (of type `float`, which defaults to `0.2`): Duration of the pre-buffered data.
- `max` (of type `float`, which defaults to `10.0`): Maximum duration of the buffered data.
- `framerate` (of type `int`, which defaults to `0`)
