---
title: Magikarp Ground Mission
date: 2025-07-12
categories: [Capture The Flags, picoCTF]
tags: [ctf, picoctf, misc, writeups]
description: picoCTF Magikarp Ground Mission Challenge
---


> Challenge description:
>
>Do you know how to move between directories and read files in the shell? Start the container, `ssh` to it, and then `ls` once connected to begin. Login via `ssh` as `ctf-player` with the password, `abcba9f7`
{: .prompt-info }


For this challenge, it's pretty darn simple. Once you're in, use `cat` to read the part of the flag, and then use `cat` again to read the instructions for the next part of the flag. After you've done that, `cd` to where the instructions pointed you, and continue from there.

The process should look something like this:
```terminal
ctf-player@pico-chall$ ls
1of3.flag.txt  instructions-to-2of3.txt
ctf-player@pico-chall$ cat 1of3.flag.txt
picoCTF{xxsh_
ctf-player@pico-chall$ cat instructions-to-2of3.txt
Next, go to the root of all things, more succinctly `/`
ctf-player@pico-chall$ cd /
ctf-player@pico-chall$ ls
2of3.flag.txt  boot  etc   instructions-to-3of3.txt  lib64  mnt  proc  run   srv  tmp  var
bin	       dev   home  lib			     media  opt  root  sbin  sys  usr
ctf-player@pico-chall$ cat 2of3.flag.txt
0ut_0f_\/\/4t3r_
ctf-player@pico-chall$ cat instructions-to-3of3.txt
Lastly, ctf-player, go home... more succinctly `~`
ctf-player@pico-chall$ cd ~
ctf-player@pico-chall$ ls
3of3.flag.txt  drop-in
ctf-player@pico-chall$ cat 3of3.flag.txt
21cac893}
```

FLAG: `picoCTF{xxsh_0ut_0f_\/\/4t3r_21cac893}`