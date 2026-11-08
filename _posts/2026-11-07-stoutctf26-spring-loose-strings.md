---
title: Loose Strings
date: 2026-11-07
categories: [Capture The Flags, StoutCTF 2026 Spring]
tags: [ctf, stoutctf 2026 spring, reverse engineering, writeups, challenges I created]
description: StoutCTF 2026 Spring Loose Strings Challenge
---


> Challenge description:
>
> Apperantly there's a flag in this binary, but we can't find it. Can you?
{: .prompt-info }

Let's run it and see what it has to say for itself.

```terminal
❯ ./main | sort | uniq -c
    403 I wonder what the flag is?
```

Yeah, me too buddy. It prints the same line 403 times, and then it quits. That's it, that's the whole program.

With a name like Loose Strings, I think we can skip the fancy tools for now and start with `strings`. It pulls out anything in a file that looks like readable text, so it's always a good first move on a binary. And since we know the flag format, we can use `grep` to cut through the noise.

```terminal
❯ strings main | grep STOUTCTF
STOUTCTF{yMShsEOJtQZx4HK6krhkkPgNPQMugq4m}
```

Well that was fast.

If you open it in `Ghidra` you can see why you'd never find this by running it. The whole `main` function is just 403 calls to `puts`, and the flag never gets used anywhere. It's just sitting in the binary, doing nothing, waiting for someone to look.

FLAG: `STOUTCTF{yMShsEOJtQZx4HK6krhkkPgNPQMugq4m}`
