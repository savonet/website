---
title: "FFmpeg filters"
description: "FFmpeg filters provide audio and video processing using the ffmpeg library. They are available in liquidsoap when compiled with the optional…"
---
[FFmpeg filters](https://ffmpeg.org/ffmpeg-filters.html) provide audio and video processing using the ffmpeg library. They are available in liquidsoap when compiled with the optional [ffmpeg-avfilter](https://github.com/savonet/ocaml-ffmpeg) package.

## Filter as operators {#filter-as-operators}

When enabled, filters appear as operators prefixed with `ffmpeg.filter`. For example:

```
Ffmpeg filter: Add echoing to the audio.

Type: (?in_gain : float?, ?out_gain : float?,
 ?delays : string?, ?decays : string?,
 ffmpeg.filter.graph, ffmpeg.filter.audio) ->
ffmpeg.filter.audio

Category: Liquidsoap

Parameters:

 * in_gain : float? (default: null)
     set signal input gain. (default: 0.6)

 * out_gain : float? (default: null)
     set signal output gain. (default: 0.3)

 * delays : string? (default: null)
     set list of signal delays. (default: "1000")

 * decays : string? (default: null)
     set list of signal decays. (default: "0.5")

 * (unlabeled) : ffmpeg.filter.graph (default: None)

 * (unlabeled) : ffmpeg.filter.audio (default: None)
```

Filter inputs and outputs are abstract values of type `ffmpeg.filter.audio` and `ffmpeg.filter.video`. Create them with `ffmpeg.filter.audio.input` and `ffmpeg.filter.video.input`, which take [media tracks](multitrack.html) as input. Convert them back to tracks with `ffmpeg.filter.audio.output` and `ffmpeg.filter.video.output`.

Filters are configured inside a function closure. Here is an example:

```liquidsoap title="ffmpeg-filter-flanger-highpass.liq"
def flanger_highpass(audio_track) =
  def mkfilter(graph) =
    audio_track = ffmpeg.filter.audio.input(graph, audio_track)
    audio_track = ffmpeg.filter.flanger(graph, audio_track, delay=10.)
    audio_track = ffmpeg.filter.highpass(graph, audio_track, frequency=4000.)
    ffmpeg.filter.audio.output(graph, audio_track)
  end

  ffmpeg.filter.create(mkfilter)
end
```

This filter takes an audio input, wraps it in a `ffmpeg.filter.audio.input`, applies a flanger and then a high-pass effect, and returns the result as an audio output.

Here is another example for video:

```liquidsoap title="ffmpeg-filter-hflip.liq"
def hflip(video_track) =
  def mkfilter(graph) =
    video_track = ffmpeg.filter.video.input(graph, video_track)
    video_track = ffmpeg.filter.hflip(graph, video_track)
    ffmpeg.filter.video.output(graph, video_track)
  end

  ffmpeg.filter.create(mkfilter)
end
```

This filter takes a video input, wraps it in a `ffmpeg.filter.video.input`, applies an `hflip` filter (horizontal flip), and returns the result as a video output.

## Applying filters to a source {#applying-filters-to-a-source}

When applying a filter, the input is placed in a clock driven by the output. This means other tracks from the input cannot be shared with the output, which can be a source of confusion.

When applying FFmpeg filters to sources with both audio and video, pass all tracks through the filter even if some are simply copied.

Here is an example:

```liquidsoap title="ffmpeg-filter-hflip2.liq"
def hflip(s) =
  def mkfilter(graph) =
    let {audio = audio_track, video = video_track} = source.tracks(s)

    video_track = ffmpeg.filter.video.input(graph, video_track)
    video_track = ffmpeg.filter.hflip(graph, video_track)

    audio_track = ffmpeg.filter.audio.input(graph, audio_track)
    audio_track = ffmpeg.filter.acopy(graph, audio_track)

    video_track = ffmpeg.filter.video.output(graph, video_track)
    audio_track = ffmpeg.filter.audio.output(graph, audio_track)

    source(
      {
        audio=audio_track,
        video=video_track,
        metadata=track.metadata(audio_track),
        track_marks=track.track_marks(audio_track)
      }
    )
  end

  ffmpeg.filter.create(mkfilter)
end
```

FFmpeg filters are powerful: they can convert audio to video (for example, to display stream information) and can be combined into complex graph-based processing pipelines.

## Filter commands {#filter-commands}

Some filters support [changing options at runtime](https://ffmpeg.org/ffmpeg-filters.html#Changing-options-at-runtime-with-a-command) via commands. This is supported in liquidsoap using a slightly different API:

```liquidsoap title="ffmpeg-filter-dynamic-volume.liq"
def dynamic_volume(s) =
  def mkfilter(graph) =
    filter = ffmpeg.filter.volume.create(graph)

    def set_volume(v) =
      ignore(filter.process_command("volume", "#{v}"))
    end

    let {audio = audio_track} = source.tracks(s)

    audio_track = ffmpeg.filter.audio.input(graph, audio_track)
    filter.set_input(audio_track)
    audio_track = filter.output
    audio_track = ffmpeg.filter.audio.output(graph, audio_track)

    s =
      source(
        {
          audio=audio_track,
          metadata=track.metadata(audio_track),
          track_marks=track.track_marks(audio_track)
        }
      )

    (s, set_volume)
  end

  ffmpeg.filter.create(mkfilter)
end

s = playlist("my_playlist")

let (s, set_volume) = dynamic_volume(s)

```

A volume filter is instantiated via `ffmpeg.filter.volume.create`. The filter instance exposes `process_command`, which is used to build the `set_volume` function. The input is then applied to the filter and the pair `(s, set_volume)` is returned.

The `ffmpeg.filter.<filter>.create` API is for advanced use with filter commands. For standard use, `ffmpeg.filter.<filter>` provides a simpler interface.

## Filters with dynamic inputs or outputs {#filters-with-dynamic-inputs-or-outputs}

Filters with dynamic inputs or outputs determine the number of inputs or outputs at runtime. For example, `ffmpeg.filter.split` splits a video stream and `ffmpeg.filter.merge` merges multiple streams into one.

These filters have a different operator signature. Here is an example for dynamic outputs:

```
% liquidsoap -h ffmpeg.filter.asplit

Ffmpeg filter: Pass on the audio input to N audio outputs. This filter has
dynamic outputs: returned value is a tuple of audio and video outputs. Total
number of outputs is determined at runtime.

Type: (?outputs : int?, ffmpeg.filter.graph,
 ffmpeg.filter.audio) ->
[ffmpeg.filter.audio] * [ffmpeg.filter.video]

Category: Liquidsoap
Flag: extra

Parameters:

 * outputs : int? (default: null)
     set number of outputs. (default: 2)

 * (unlabeled) : ffmpeg.filter.graph (default: None)

 * (unlabeled) : ffmpeg.filter.audio (default: None)
```

This filter returns a tuple `(audio, video)` of dynamic outputs.

For dynamic inputs:

```
% liquidsoap -h ffmpeg.filter.amerge

Ffmpeg filter: Merge two or more audio streams into a single multi-channel
stream. This filter has dynamic inputs: last two arguments are lists of audio
and video inputs. Total number of inputs is determined at runtime.

Type: (?inputs : int?, ffmpeg.filter.graph,
 [ffmpeg.filter.audio], [ffmpeg.filter.video]) ->
ffmpeg.filter.audio

Category: Liquidsoap
Flag: extra

Parameters:

 * inputs : int? (default: null)
     specify the number of inputs. (default: 2)

 * (unlabeled) : ffmpeg.filter.graph (default: None)

 * (unlabeled) : [ffmpeg.filter.audio] (default: None)

 * (unlabeled) : [ffmpeg.filter.video] (default: None)
```

This filter takes arrays of `audio` and `video` inputs.

Combined, these can be used as follows:

```liquidsoap title="ffmpeg-filter-parallel-flanger-highpass.liq"
def parallel_flanger_highpass(s) =
  def mkfilter(graph) =
    audio_track = ffmpeg.filter.audio.input(graph, s.tracks.audio)

    let (audio, _) = ffmpeg.filter.asplit(outputs=2, graph, audio_track)

    let [a1, a2] = audio

    a1 = ffmpeg.filter.flanger(graph, a1, delay=10.)
    a2 = ffmpeg.filter.highpass(graph, a2, frequency=4000.)

    audio_track = ffmpeg.filter.amerge(inputs=2, graph, [a1, a2], [])

    ffmpeg.filter.audio.output(graph, audio_track)
  end

  ffmpeg.filter.create(mkfilter)
end
```
