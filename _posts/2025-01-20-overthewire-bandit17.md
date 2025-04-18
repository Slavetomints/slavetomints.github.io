---
title: Bandit Level 17 → Level 18
date: 2025-01-20 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 17 → Level 18
---

> ssh bandit17@bandit.labs.overthewire.org -p 2220 -i sshkey.private 
>  
>  There are 2 files in the homedirectory: **passwords.old and passwords.new**. The password for the next level is in **passwords.new** and is the only line that has been changed between **passwords.old and passwords.new**
{: .prompt-info }

*If you are having issues with your identify file, make sure that you update the permissions so that only you can read from it.*

This one is pretty easy, we're going to be using the `diff` command today, which shows us the difference between two files. The way the syntax works for this level is we'll use `diff passwords.new passwords.old`. And it'll show us the lines that are different, in order of the files in the command.

```terminal
bandit17@bandit:~$ diff passwords.new passwords.old 
42c42
< {removed in accordance with game rules}
---
> ktfgBvpMzWKR5ENj26IbLGSblgUG9CzB
```
