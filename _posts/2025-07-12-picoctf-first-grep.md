---
title: first grep
date: 2025-07-12
categories: [Capture The Flags, picoCTF]
tags: [ctf, picoctf, misc, writeups]
description: picoCTF first grep Challenge
---


> Challenge description:
>
>Can you find the flag in [file](https://jupiter.challenges.picoctf.org/static/495d43ee4a2b9f345a4307d053b4d88d/file)? This would be really tedious to look through manually, something tells me there is a better way.
>
{: .prompt-info }

Okay, so here we've been given a pretty big file, and we need to pull out the flag. Now, we know that the flag starts with `picoCTF`, but how can we find it quickly in a large file?  Well, we use `grep`!

Now, you can use `grep` in one of two ways. We'll cover both here

## Way #1
The first way is to only use `grep` by itself. The syntax is `grep [string to search for] [file]`.

```terminal
❯ grep pico file
picoCTF{grep_is_good_to_find_things_dba08a45}
```
## Way #2
Now let's say you don't have a file, or you didn't like the first way for some reason. You can also use `cat` to send the file's contents to `stdout`, and pipe it into `grep`. Piping output to `grep` is useful is you're working with data not in a file, or trying to chain together a command.


```terminal
❯ cat file | grep pico
picoCTF{grep_is_good_to_find_things_dba08a45}
```

Either way, you get the flag!

FLAG: `picoCTF{grep_is_good_to_find_things_dba08a45}`