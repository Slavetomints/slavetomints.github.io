---
title: Bandit Level 7 → Level 8
date: 2025-01-18 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 7 → Level 8
---

> ssh bandit7@bandit.labs.overthewire.org -p 2220
> 
> The password for the next level is stored in the file **data.txt** next to the word **millionth**
{: .prompt-info }

So, if we try to cat the file `data.txt` we notice that there are quite a few lines in it, and while we could read through until we find the word millionth it would take quite a while. So let's use the `grep` command to filter the output from that.

If we run `cat data.txt | grep millionth`, it should work, but let's break down how the command works.

The first thing we do is we send all the contents of `data.txt` to the terminal output, but instead of it displaying it is actually sent into another command because of the pipe. That other command is `grep` which then searches the output and displays those that match the word "millionth".

```terminal

bandit7@bandit:~$ cat data.txt | grep millionth
millionth	{removed in accordance with game rules}
```
