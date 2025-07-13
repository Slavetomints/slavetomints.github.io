---
title: Bases
date: 2025-07-12
categories: [Capture The Flags, picoCTF]
tags: [ctf, picoctf, misc, writeups]
description: picoCTF Bases Challenge
---


> Challenge description:
>
>What does this `bDNhcm5fdGgzX3IwcDM1` mean? I think it has something to do with bases.
{: .prompt-info }

Alrighty, so we've been given a `base64` encoded string, and have to find out what it is. For this, we'll use both `echo` and `base64`.

`base64` has a decode flag, which is `-d`. It decoded and text passed through to it In order to do that we'll need to use `echo` to pipe the text through. We need to be careful, since `echo` adds a newline to the end of the string, so we'll use the `-n` flag to disable that.

Our final command looks like this:

```terminal
❯ echo "bDNhcm5fdGgzX3IwcDM1" | base64 -d
l3arn_th3_r0p35
```

Add on the flag formatters, and we're all good to go!

FLAG: `picoCTF{l3arn_th3_r0p35}`