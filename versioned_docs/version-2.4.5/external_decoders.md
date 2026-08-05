---
title: "External decoders"
description: "You can use external programs in liquidsoap to decode audio files."
---
You can use external programs in liquidsoap to decode audio files.

## Basic operators {#basic-operators}

External decoders are registered using decoder.add`.

```liquidsoap
decoder.add(name="my_decoder",description="My custom decoder",
 file_extensions=["foo"], decoder)
```

- `file_extensions` is a list of file extensions that the decoder can handle.
- `decoder` is a function used to return the decoded file.
- You can also use the `mimes` argument to file files based on their mime-type.

The `decoder` function has a similar signature as protocol resolution functions. This is because
file decoding happen as part of the protocol resolution. It takes a `rlog` function, a `maxtime`
maximum execution time stamp and an input file and returns a decoded URI.

Decoded URI can be any url to pass down to the protocol resolution pipeline. Most of the time, it should be
a decoded file but it could also be a `annotate` uri if you wish to also pass down decoded metadata along with
the decoded file.

```liquidsoap title="decoder-openmpt.liq"
options = ""

# BEGIN
decoder.add(
 name="OPENMPT123",
 description="Decode files using the openmpt123 decoder binary",
 mimes=[
 "audio/it",
 "audio/xm",
 "audio/s3m",
 "audio/x-mod",
 "audio/mod",
 "audio/module-xm",
 "audio/x-mod",
 "application/playerpro",
 "audio/x-s3m",
 "application/soundapp",
 "audio/med",
 "audio/x-xm"
 ],
 file_extensions=[
 "xm",
 "mtm",
 "amf",
 "stm",
 "ult",
 "wow",
 "dmf",
 "it",
 "s3m",
 "far",
 "mod",
 "mt2",
 "okt",
 "med",
 "669"
 ],
 fun (~rlog, ~maxtime:_, infile) ->
 begin
 ret =
 process.read.lines(
 "openmpt123 --info #{process.quote(infile)} 2>&1"
 )
 def get_meta(l, s) =
 ret = string.extract(pattern="^(\\w+).+:\\s(.+)$", s)
 if
 list.length(ret) > 2
 then
 label = ret[1]
 val = ret[2]
 label = "openmpt:#{string.case(lower=true, label)}"
 ["#{string.quote(label)}=#{string.quote(val)}", ...l]
 else
 l
 end
 end
 meta = list.fold(get_meta, [], ret)

 prefix =
 if
 meta == []
 then
 ""
 else
 "annotate:#{string.concat(separator=',', meta)}:"
 end

 # File is cleaned up as part of the request workflow.
 outfile = file.temp(cleanup=false, "openmpt", ".wav")
 try
 let {status = {code}} =
 process.run(
 "openmpt123 --assume-terminal --quiet --force #{options} --output #{
 process.quote(outfile)
 } #{process.quote(infile)}"
 )
 code == 0 ? "#{prefix}#{outfile}" : null
 catch err do
 file.remove(outfile)
 rlog(
 "Error while decoding #{infile} using ffmpeg: #{err}"
 )
 null
 end
 end
)
```
