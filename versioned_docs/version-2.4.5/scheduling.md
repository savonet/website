---
title: "Scheduling Tasks in Liquidsoap"
description: "Liquidsoap includes a lightweight scheduler that lets you run code at specific times or on a recurring basis. This is useful for automating things like…"
sidebar_label: "Scheduling"
---
Liquidsoap includes a lightweight scheduler that lets you run code at specific times or on a recurring basis.
This is useful for automating things like playing a file every hour, announcing the top of the hour, or triggering a command at a specific time.

Scheduling in Liquidsoap works through **threads** — simple tasks that run in the background without interrupting your media streams.
These threads are managed by the scheduler and executed as needed. They’re not operating system threads, just scheduled functions.

There are four main APIs available for scheduling:

- `thread.run` – run a task on a regular interval
- `thread.when` – run a task when a time-based condition becomes true
- `cron.add` / `cron.remove` – schedule tasks using familiar cron syntax
- `thread.run.recurrent` – an advanced interface for custom scheduling

This page walks you through the first three, with examples to get you started.

If you are looking for a more in-depth example of how to use the scheduler, you can refer to our blog post [Precise scheduling of tracks](https://www.liquidsoap.info/blog/2023-03-25-precise-scheduling-of-tracks/)

## `thread.run`: Simple Repeating Tasks {#thread.run-simple-repeating-tasks}

Use `thread.run` when you want to run a task repeatedly every N seconds. This is the most straightforward scheduling method.

### Example: Log a message every 10 minutes {#example-log-a-message-every-10-minutes}

```liquidsoap title="scheduling_simple.liq"
thread.run(
  every=600.,
  # This is the same as: fun () -> log("10 minutes have passed.")
  {
    log(
      "10 minutes have passed."
    )
  }
)
```

This task will run every 600 seconds (10 minutes), logging a message.

You can schedule any function here — such as sending metadata, modifying a source, or queueing a track.

### Example: Play a file every hour {#example-play-a-file-every-hour}

```liquidsoap title="scheduling_queue.liq"
thread.run(
  every=3600.,
  {request_queue.push(request.create("/path/to/hourly-jingle.mp3"))}
)

```

In this case, we assume that `request_queue` is a `request.queue` source used elsewhere in your script.

## `thread.when`: Run at a Specific Time {#thread.when-run-at-a-specific-time}

To schedule a task at a specific time, use `thread.when`. It takes a [time predicate](language.html#time-predicates) — a Liquidsoap-specific language construct that returns `true` when the current time matches the given interval or time.

### Example: Run a task at 9:00 AM {#example-run-a-task-at-900-am}

```liquidsoap title="scheduling_9am.liq"
thread.when(
  {9h},
  {
    log(
      "It's 9 AM!"
    )
  }
)
```

This function is ran every time the predicates returns `true`, which should be during the 9th hour of the morning (hours are in 24h format).

You can refer to the `thread.when` and `predicate.activates` documentation for more details about the implementation.

### Example: Queue a track at midnight {#example-queue-a-track-at-midnight}

```liquidsoap title="scheduling_queue_midnight.liq"
thread.when(
  {23h59m},
  {request_queue.push(request.create("/path/to/midnight-track.mp3"))}
)

```

## `cron.add` and `cron.remove`: Cron-style Scheduling {#cron.add-and-cron.remove-cron-style-scheduling}

If you’re used to cron syntax, you can use `cron.add` to schedule tasks using a familiar string format.

```liquidsoap title="cron_add.liq"
cron.add(
  "0 12 * * *",
  {
    log(
      "It’s noon!"
    )
  }
)
```

This example runs the task every day at 12:00 PM.

If needed, the function returns a unique identifier for the task, which you can use to remove it later:

```liquidsoap title="cron_id.liq"
let {id} =
  cron.add(
    "0 12 * * *",
    {
      log(
        "It’s noon!"
      )
    }
  )
```

### Explicit IDs {#explicit-ids}

You can also pass an explicit ID:

```liquidsoap title="cron_id_arg.liq"
cron.add(
  id="minight-task",
  "0 0 * * *",
  {
    log(
      "Midnight event"
    )
  }
)
```

If the ID is already registered, Liquidsoap will raise an error. This is useful for keeping track of scheduled tasks in complex scripts using meaningful IDs.

### Removing a Cron Task {#removing-a-cron-task}

To remove a task, use `cron.remove` with its ID:

```liquidsoap title="cron_remove.liq"
cron.remove("midnight-task")
```

### Cron Syntax Recap {#cron-syntax-recap}

Cron strings follow the standard format:

```
minute hour day-of-month month day-of-week
```

Examples:

- `"0 0 * * *"` – every day at midnight
- `"*/5 * * * *"` – every 5 minutes
- `"15 14 * * 1-5"` – weekdays at 2:15 PM

The implementation also supports the following shorthands: `@annually`, `@yearly`, `@daily`, `@hourly`, `@monthly` and `@weekly`.

## Advanced: `thread.run.recurrent` {#advanced-thread.run.recurrent}

For more complex scheduling needs, advanced users may use `thread.run.recurrent`. It allows full control over how a task is rescheduled after each execution, making it possible to implement dynamic or irregular schedules.

Most users won’t need this API, but it’s available if `thread.run` or `cron.add` don’t fit your needs.
