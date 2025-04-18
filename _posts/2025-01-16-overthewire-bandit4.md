---
title: Bandit Level 4 → Level 5
date: 2025-01-16 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 4 → Level 5
---

> ssh bandit4@bandit.labs.overthewire.org -p 2220
>
> The password for the next level is stored in the only human-readable file in the **inhere** directory. Tip: if your terminal is messed up, try the “reset” command.
{: .prompt-info }

## Poking Around
Let's take a look at the server now.

```terminal

bandit4@bandit:~$ ls
inhere
bandit4@bandit:~$ cd inhere
bandit4@bandit:~/inhere$ ls
-file00  -file01  -file02  -file03  -file04  -file05  -file06  -file07  -file08  -file09
```

Now, we're looking for the only human-readable file. While we could `cat` every single file, we run the risk of breaking our terminal if we output binary data. So, let's use the `file` command to figure out the file type!

Now, remembering the lessons we learned earlier, if the file starts with '-' it is going to be interpreted as a flag, so instead lets prepend `./` to the file names. 

Also, instead of just looking at each file one after another, let's use the wildcard `*` to designate that I want to use every single file in the directory.

```terminal

bandit4@bandit:~/inhere$ file ./*
./-file00: data
./-file01: data
./-file02: data
./-file03: data
./-file04: data
./-file05: data
./-file06: data
./-file07: ASCII text
./-file08: data
./-file09: data
```

Looks like `-file07` is the one we want.

### The Solution
```terminal

bandit4@bandit:~/inhere$ cat ./-file07 
{hidden in accordance with game rules}
```
