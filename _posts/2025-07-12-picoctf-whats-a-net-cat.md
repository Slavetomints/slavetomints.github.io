---
title: what's a net cat?
date: 2025-07-12
categories: [Capture The Flags, picoCTF]
tags: [ctf, picoctf, misc, writeups]
description: picoCTF what's a net cat? Challenge
---


> Challenge description:
>
>Using netcat (nc) is going to be pretty important. Can you connect to `jupiter.challenges.picoctf.org` at port `25103` to get the flag?
{: .prompt-info }

`Netcat` is a nifty tool that lets you read/write data via network connections. It's definitely something important to learn on your cybersecurity journey.

In order to use it in its most basic sense, your command will look something like this:

```terminal
nc [domain/IP address] [port]
```

So, if we need to connect to `jupiter.challenges.pictoctf.org` on port `25103`, It should look as such:

```terminal
❯ nc jupiter.challenges.picoctf.org 25103
You're on your way to becoming the net cat master
picoCTF{nEtCat_Mast3ry_d0c64587}
```

FLAG: `picoCTF{nEtCat_Mast3ry_d0c64587}`