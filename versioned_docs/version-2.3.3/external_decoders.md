---
title: "External decoders"
description: "You can use external programs in liquidsoap to decode audio files. The program must be able to output WAV data to its standard output (stdout) and,…"
---
You can use external programs in liquidsoap to decode audio files. The program must be able to
output WAV data to its standard output (`stdout`) and, possibly, read encoded data from its
standard input.

Please note that this feature is not available under Windows.

## Basic operators {#basic-operators}

External decoders are registered using the `decoder.add` and `decoder.oblivious.add` operators.
They are invoked the following way:

### `decoder.add` {#decoder.add}

```liquidsoap
decoder.add(name="my_decoder",description="My custom decoder",
            test,decoder)
```

`decoder.add` is used for external decoders that can read the encoded data from their standard
input (stdin) and write the decoded data as WAV to their standard output (stdout). This operator
is recommended because its estimation of the remaining time is better than the estimation done
by the decoders registered using `decoder.oblivious.add`. The important parameters are:

- `test` is a function used to determine if the file should be decoded by the decoder. Returned values are:

  - `0`: no decodable audio,
  - `-1`: decodable audio but number of audio channels unknown,
  - `x`: fixed number of decodable audio channels.

- `decoder` is the string containing the shell command to run to execute the decoding process.

### `decoder.oblivious.add` {#decoder.oblivious.add}

`decoder.oblivious.add` is very similar to `decoder.add`. The main difference is that the
decoding program reads encoded data directly from the local files and not its standard input.
Decoders registered using this operator do not have a reliable estimation of the remaining
time. You should use `decoder.oblivious.add` only if your decoding program is not able
to read the encoded data from its standard input.

```liquidsoap
decoder.oblivious.add(name="my_decoder",description="My custom decoder",
                      buffer=5., test,decoder)
```

`decoder.add` is used for external decoders that can read the encoded data from their standard
input (stdin) and write the decoded data as WAV to their standard output (stdout). This operator
is recommended because its estimation of the remaining time is better than the estimation done
by the decoders registered using `decoder.oblivious.add`. The important parameters are:

- `test` is a function used to determine if the file should be decoded by the decoder. Returned values are:

  - `0`: no decodable audio,
  - `-1`: decodable audio but number of audio channels unknown,
  - `x`: fixed number of decodable audio channels.

- `decoder` is a function that receives the name of the file that should be decoded and returns a string containing the shell command to run to execute the decoding process.

### `decoder.metadata.add` {#decoder.metadata.add}

You may also register new metadata resolvers using the `decoder.metadata.add` operator. It is invoked the
following way: `decoder.metadata.add(format,resolver)`, where:

- `format` is the name of the resolved format. It is only informative.
- `resolver` is a function `f` that returns a list of metadata of the form: `(label, value)`. It is invoked the following way: `f(format=name,file)`, where:

  - `format` contains the name of the format, as returned by the decoder that accepted to decode the file. `f` may return immediately if this is not an expected value.
  - `file` is the name of the file to decode.

## Wrappers {#wrappers}

On top of the basic operators, wrappers have been written for some common decoders. This includes the `flac` and
`faad` decoders, by default. All the operators are defined in `externals.liq`.

### The FLAC decoder {#the-flac-decoder}

The flac decoder uses the `flac` command line. It is enabled if the binary can be found in the current `$PATH`.

Its code is the following:

```liquidsoap title="decoder-flac.liq"
flac_p = "/usr/bin/flac"

def test_flac(f) =
  if process.test("which metaflac") then
    channels = list.hd(default="",process.read.lines("metaflac --show-channels #{process.quote(f)} 2>/dev/null"))
    #If the value is not an int, this returns 0 and we are ok :)
    int_of_string(channels)
  else
    if string.match(pattern="flac", f) then
      # We do not know the number of audio channels so setting to -1
      (-1)
    else
      # All tests failed: no audio decodable using flac..
      0
    end
  end
end

decoder.add(name="FLAC", description="Decode files using the flac decoder binary.", test=test_flac, flac_p)
```

Additionally, a metadata resolver is registered when the `metaflac` command can be found in the `$PATH`:

```liquidsoap title="decoder-metaflac.liq"
if
  process.test(
    "which metaflac"
  )
then
  log(
    level=3,
    "Found metaflac binary: enabling flac external metadata resolver."
  )

  def flac_meta(~metadata=_, fname) =
    ret =
      process.read.lines(
        "metaflac --export-tags-to=- #{process.quote(fname)} 2>/dev/null"
      )
    ret = list.map(fun (s) -> string.split(separator="=", s), ret)

    # Could be made better.
    def f(l', l) =
      if
        list.length(l) >= 2
      then
        list.append([(list.hd(default="", l), list.nth(default="", l, 1))], l')
      else
        if
          list.length(l) >= 1
        then
          list.append([(list.hd(default="", l), "")], l')
        else
          l'
        end
      end
    end
    list.fold(f, [], ret)
  end

  decoder.metadata.add("FLAC", flac_meta)
end
```

### The faad decoder {#the-faad-decoder}

The faad decoder uses the `faad` program, if found in the `$PATH`.
It can decode AAC and AAC+ audio files. This program does not support
reading encoded data from its standard input so the decoder is
registered using `decoder.oblivious.add`.

Its code is the following:

```liquidsoap title="decoder-faad.liq"
aac_mimes =
  [
    "audio/aac",
    "audio/aacp",
    "audio/3gpp",
    "audio/3gpp2",
    "audio/mp4",
    "audio/MP4A-LATM",
    "audio/mpeg4-generic",
    "audio/x-hx-aac-adts"
  ]
aac_filexts = ["m4a", "m4b", "m4p", "m4v", "m4r", "3gp", "mp4", "aac"]

# Faad is not very selective so we are checking only file that end with a known
# extension or mime type
def faad_test(fname) =
  # Get the file's mime
  mime = file.mime(fname) ?? ""

  # Test mime
  if
    list.mem(mime, aac_mimes)
  then
    true
  else
    # Otherwise test file extension
    ret = string.extract(pattern="\\.(.+)$", fname)
    if
      list.length(ret) != 0
    then
      ext = ret[1]
      list.mem(ext, aac_filexts)
    else
      false
    end
  end
end

if
  process.test(
    "which faad"
  )
then
  log(
    level=3,
    "Found faad binary: enabling external faad decoder and metadata resolver."
  )
  faad_p =
    (
      fun (f) ->
        "faad -w #{process.quote(f)} 2>/dev/null"
    )

  def test_faad(fname) =
    if
      faad_test(fname)
    then
      channels =
        list.hd(
          default="",
          process.read.lines(
            "faad -i #{process.quote(fname)} 2>&1 | grep 'ch,'"
          )
        )
      ret =
        string.extract(
          pattern=
            ", (\\d) ch,",
          channels
        )
      ret =
        if
          list.length(ret) == 0
        then
          # If we pass the faad_test, chances are high that the file will
          # contain aac audio data..
          "-1"
        else
          ret[1]
        end
      int_of_string(default=(-1), ret)
    else
      0
    end
  end

  decoder.oblivious.add(
    name="FAAD",
    description=
      "Decode files using the faad binary.",
    test=test_faad,
    faad_p
  )

  def faad_meta(~metadata=_, file) =
    if
      faad_test(file)
    then
      ret =
        process.read.lines(
          "faad -i #{process.quote(file)} 2>&1"
        )

      # Yea, this is tuff programming (again)!
      def get_meta(l, s) =
        ret = string.extract(pattern="^(\\w+):\\s(.+)$", s)
        if
          list.length(ret) > 0
        then
          list.append([(ret[1], ret[2])], l)
        else
          l
        end
      end
      list.fold(get_meta, [], ret)
    else
      []
    end
  end

  decoder.metadata.add("FAAD", faad_meta)
end
```
