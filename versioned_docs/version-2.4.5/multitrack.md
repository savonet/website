---
title: "Multitrack Support in Liquidsoap"
description: "Starting in version 2.2.0, Liquidsoap gained support for multitrack operations — a powerful addition that lets you work with individual tracks inside…"
sidebar_label: "Multitrack"
---
Starting in version 2.2.0, Liquidsoap gained support for **multitrack operations** — a powerful addition that lets you work with individual tracks inside your media files. Whether it's audio, video, or metadata, you can now demux, remux, encode, decode, apply filters, and more — all at the track level!

This unlocks advanced media workflows, like keeping multiple language tracks, adding a default video stream to audio-only files, or even mixing and matching content across sources.

Let’s walk through what this means, step by step

## What is a Track? {#what-is-a-track}

A media file can contain multiple “tracks.” Think of a movie file with:

- English and French audio tracks
- One video track
- Metadata like title and artist

In Liquidsoap, these tracks are made accessible through operators that let you manipulate them individually. This opens up many possibilities — but also introduces a few new concepts and conventions to learn.

## Requirements: When You Need FFmpeg {#requirements-when-you-need-ffmpeg}

Some multitrack features rely on FFmpeg, while others don't:

| Feature | Requires FFmpeg? |
| ----------------------------------------------- | -------------------------------- |
| Track-level encode/decode | Yes |
| Encode or decode multiple audio or video tracks | Yes |
| Demuxing/remuxing tracks | No |
| Source track manipulation | No (unless decoding/encoding) |

To fully unlock multitrack functionality, make sure your Liquidsoap is compiled with FFmpeg support.

## Using Multitrack Media {#using-multitrack-media}

Let’s say you have a media file with multiple tracks, like:

```sh
movie.mkv
├── audio (English)
├── audio_2 (French)
└── video
```

You can create a source with this file like so:

```liquidsoap
s = single("/path/to/movie.mkv")
```

By default, only the first audio and video track will be used:

```liquidsoap
output.file(%ffmpeg(%audio.copy, %video.copy), "/path/to/copy.mkv", s)
```

 **Logs will confirm the detected tracks:**

```
[output_file:3] Content type is {audio=ffmpeg.copy,video=ffmpeg.copy}.
[decoder.ffmpeg:3] Requested content-type for "/path/to/movie.mkv": {audio=ffmpeg.copy,video=ffmpeg.copy}
[decoder.ffmpeg:3] FFmpeg recognizes "/path/to/movie.mkv" as video: {codec: h264, 1920x1038, yuv420p}, audio: {codec: aac, 48000Hz, 6 channel(s)}, audio_2: {codec: aac, 48000Hz, 6 channel(s)}
[decoder.ffmpeg:3] Decoded content-type for "/path/to/movie.mkv": {audio=ffmpeg.copy(codec="aac",channel_layout="5.1",sample_format=fltp,sample_rate=48000),video=ffmpeg.copy(codec="h264",width=1920,height=1038,aspect_ratio=1/1,pixel_format=yuv420p)}
```

Here, `audio_2` is present but unused. Let’s fix that

## Custom Track Handling {#custom-track-handling}

What if you want to **keep both audio tracks**, re-encoding the second one to stereo?

```liquidsoap
output.file(
 %ffmpeg(
 %audio.copy,
 %audio_2(channels=2, codec="aac"),
 %video.copy
 ),
 "/path/to/copy.mkv",
 s
)
```

 Logs now show `audio_2` being processed:

```
[output_file:3] Content type is {audio=ffmpeg.copy,audio_2=pcm(stereo),video=ffmpeg.copy}.
[decoder.ffmpeg:3] Requested content-type for "/path/to/movie.mkv": {audio=ffmpeg.copy,audio_2=pcm(stereo),video=ffmpeg.copy}
[decoder.ffmpeg:3] FFmpeg recognizes "/path/to/movie.mkv" as video: {codec: h264, 1920x1038, yuv420p}, audio: {codec: aac, 48000Hz, 6 channel(s)}, audio_2: {codec: aac, 48000Hz, 6 channel(s)}
[decoder.ffmpeg:3] Decoded content-type for "/path/to/movie.mkv": {audio=ffmpeg.copy(codec="aac",channel_layout="5.1",sample_format=fltp,sample_rate=48000),audio_2=pcm(5.1),video=ffmpeg.copy(codec="h264",width=1920,height=1038,aspect_ratio=1/1,pixel_format=yuv420p)}
```

You now have a file with two audio tracks (one copied, one re-encoded) and one video track

## Playlist Caveats {#playlist-caveats}

If your source is a playlist:

```liquidsoap
s = playlist("/path/to/playlist")
```

…and you request multiple tracks:

```liquidsoap
output.file(
 fallible=true,
 %ffmpeg(%audio.copy, %audio_2(...), %video.copy),
 "/path/to/copy.mkv",
 s
)
```

Then **only files with all requested tracks** (audio + audio_2 + video) will be accepted. Others will be skipped.

## Track Naming Conventions {#track-naming-conventions}

When decoding, track names follow this pattern:

- `audio`, `audio_2`, `audio_3`, ...
- `video`, `video_2`, `video_3`, ...

These names are fixed by the decoder — you **can’t** rename them directly when reading media.

For example, this will fail:

```liquidsoap
output.file(%ffmpeg(%audio_fr.copy, %audio_en(...), "/path/to/file.mkv", playlist("...")))
```

Why? Because the decoder doesn’t know what `audio_fr` or `audio_en` means. Track names must match what the decoder emits: `audio`, `audio_2`, etc.

Once you're remuxing tracks, however, you can assign **any name** you want!

## Demuxing and Remuxing Tracks {#demuxing-and-remuxing-tracks}

To extract and rebuild track sets:

```liquidsoap
s = playlist(...)

let {audio, video, metadata, track_marks} = source.tracks(s)
```

You can then remix these into a new source:

```liquidsoap
s = source({
 audio = audio,
 video = video,
 metadata = metadata,
 track_marks = track_marks
})
```

Tracks can also be added or replaced:

```liquidsoap
s = source(source.tracks(s).{video = source.tracks(image).video})
```

One limitation is that it is not currently possible to add default tracks.

The following **won't work**:

```liquidsoap
video = source.tracks(s).video ?? source.tracks(image).video
```

## Cleaning Up Tracks {#cleaning-up-tracks}

Want to remove `track_marks`?

```liquidsoap
let {track_marks=_, ...tracks} = source.tracks(s)
s = source(tracks)
```

This is equivalent to the older `drop_tracks` operator.

## Track-Level Operators {#track-level-operators}

Many operators now work directly on tracks. Examples:

```liquidsoap
mono = track.audio.mean(audio_track)
encoded = track.ffmpeg.encode.audio(%ffmpeg(%audio(codec="aac")), audio_track)
```

 But beware: some operators (like inline encoders) put the track on a new **clock**. You’ll need to re-derive metadata and track marks from the new track to avoid clock conflicts:

```liquidsoap
let encoded_audio = track.ffmpeg.encode.audio(..., audio)

s = source({
 audio = encoded_audio,
 metadata = track.metadata(encoded_audio),
 track_marks = track.track_marks(encoded_audio)
})
```

## How Encoders Detect Track Types {#how-encoders-detect-track-types}

Liquidsoap uses **naming conventions** and **hints** to determine what kind of data each track holds:

Priority order:

1. `%audio.copy` or `%video.copy` → auto-detect
2. Named content type (`audio_content` or `video_content`)
3. Track name contains “audio” or “video”
4. Codec implies type

### Example: Explicit typing {#example-explicit-typing}

```liquidsoap
output.file(
 %ffmpeg(
 %en(audio_content, codec=audio_codec),
 %fr(codec="aac"),
 %director_cut(video_content, codec=video_codec)
 ),
 "/path/to/copy.mkv",
 s
)
```

### Or by naming convention {#or-by-naming-convention}

```liquidsoap
%audio_en(codec=...)
%director_cut_video(codec=...)
```

Internally, Liquidsoap maps this to content-type info. Once handed off to FFmpeg, **track names are lost** — FFmpeg just sees numbered tracks in order.

## Summary {#summary}

Multitrack support opens up powerful new workflows:

- Mix and match audio/video/metadata across sources
- Build custom media containers
- Target different formats per track
- Combine synchronous and asynchronous operations (with care!)

We’ve only scratched the surface — go ahead and explore the code, experiment, and let your creativity flow!

And if there’s an operator you wish worked at the track level, don’t hesitate to [open a feature request](https://github.com/savonet/liquidsoap)!
