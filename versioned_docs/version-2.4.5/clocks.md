---
title: "Clocks in Liquidsoap"
description: "When you first dive into Liquidsoap, the idea of sources generating and transforming media in a streaming pipeline feels pretty straightforward. In…"
sidebar_label: "Clocks"
---
When you first dive into Liquidsoap, the idea of sources generating and transforming media in a streaming pipeline feels pretty straightforward. In earlier pages like the [quickstart](./quick_start.md) or the overview on [sources](./sources.md), we describe a world where everything runs in sync—each component producing data at the same rate, driven by a single clock ticking steadily in the background.

But behind that simplicity lies a more nuanced reality. In practice, a media streaming system may involve **multiple clocks**, each advancing time in its own way. Understanding why and how that happens will give you a deeper appreciation of Liquidsoap’s design—and help you make sense of some occasional, but puzzling, error messages.

This page will:

1. Introduce why multiple clocks exist and how they affect streaming.
2. Show common clock-related error messages and what they mean.
3. Explain how and when to use clocks explicitly in your scripts.

 Before reading on, it helps to be familiar with [sources](./sources.md) and [latency](./latency_control.md), which tie closely into clock behavior.

## Why More Than One Clock? {#why-more-than-one-clock-}

The first reason is **external**: the world itself doesn't run on a single clock.

- Your computer's internal clock may not match your friend’s.
- Different soundcards, each with their own timing, tick at slightly different rates.
- Remote connections (like over a network) introduce unpredictable delays.

Liquidsoap interfaces with all of these elements—soundcards, remote servers, inputs, and outputs—so it has to account for those mismatches.

There are also **internal** reasons:

Some operators require control over time. For example:

- `stretch` changes playback speed.
- `crossfade`, and similar operators, temporarily consume stream data _faster_ to overlap tracks for smoother transitions.

So if an operator wants to speed things up temporarily, it can’t share a clock with parts of the system expecting a constant pace. To avoid inconsistencies, **each source in Liquidsoap is assigned a single clock**, fixed when the source is created.

## Visualizing Clocks {#visualizing-clocks}

Imagine your stream as a graph: boxes for sources, lines for data flow.

Now, add a new layer: **clocks**. Each group of sources inside a clock "box" runs at the same pace. For example:

```liquidsoap
output.icecast(fallback([crossfade(playlist(...)), jingles]))
```

In this setup:

- A dedicated clock is created for `crossfade`, so it can speed up during transitions.
- The rest runs on a standard clock tied to the computer’s real time.

Here’s what that looks like:

![Graph representation with clocks](/assets/img/graph_clocks.png)

## Understanding Clock-Related Errors {#understanding-clock-related-errors}

Most of the time, you don’t need to think about clocks—Liquidsoap handles it for you. But when things go wrong, here’s what it might look like:

### Latency Control Errors {#latency-control-errors}

```liquidsoap
s = input.srt("...")
output.ao(fallible=true, crossfade(s))
```

Error:

```
Error 7: Invalid value:
This source may control its own latency and cannot be used with this operator.
```

What’s happening?

- `input.srt` uses its **own clock** (SRT's).
- `crossfade` needs **control over time** to work properly.
- But this input won't give up control—so the operation fails.

 To learn more about self-synchronizing sources, check the [latency docs](./latency_control.md).

### Clock Conflicts {#clock-conflicts}

```liquidsoap
output.ao(fallible=true, input.srt("..."))
```

Error:

```
Error 17: clock input.srt has multiple synchronization sources. Do you need to set self_sync=false?

Sync sources:
 srt from source input.srt
 ao from source output.ao
```

Here, both `input.srt` and `output.ao` have their own clocks, and they can't be unified. You can sometimes set `self_sync=false` to override this, but beware—this could introduce latency issues.

## Using the Clock API {#using-the-clock-api}

For advanced setups, Liquidsoap gives you tools to inspect and manipulate clocks:

- Access a source’s clock:

 ```liquidsoap
 c = s.clock
 ```

- If methods are missing, rewrap your source and clock:

 ```liquidsoap
 s = source.methods(s)
 c = clock(s.clock)
 print("source #{s.id()} belongs to clock id: #{c.id()}")
 ```

You can even create new clocks and assign sources to them:

```liquidsoap
clock.assign_new(sync="none", [source])
```

To connect sources from different clocks, use a `buffer()`:

```liquidsoap
buffer(source_in_one_clock)
```

This creates a bridge: it queues data when clocks run at different speeds. Just be careful—if the clocks get too far out of sync, the buffer can overflow or underflow.

## Real-World Use: Isolating Clock Domains {#real-world-use-isolating-clock-domains}

Let’s say you're streaming from a soundcard to Icecast **and** recording the input. You want the **recording to be perfect**, even if the network lags and affects Icecast.

Here’s how you do it:

```liquidsoap
input = input.alsa()

# Icecast with its own clock + buffer
icecast_source = mksafe(buffer(input))
output.icecast(%mp3, mount="live", icecast_source)

# File recording without Icecast delays
output.file(%mp3, "recording.mp3", input)
```

 This isolates the network-sensitive Icecast output, protecting the file recording from glitches or dropped packets.

## Wrapping Up {#wrapping-up}

Clocks are one of the most abstract parts of Liquidsoap—but also one of the most powerful. They help you manage latency, avoid glitches, and coordinate complex stream behaviors.

While Liquidsoap usually handles clocks behind the scenes, understanding them opens the door to more reliable and flexible setups. And when an error does pop up, you’ll be ready.

 Feeling curious? Take a peek at your sources’ clocks and try experimenting with `buffer()` or `assign_new()`. You'll be surprised what a little time travel can do.
