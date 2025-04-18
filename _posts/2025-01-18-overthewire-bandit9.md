---
title: Bandit Level 9 → Level 10
date: 2025-01-18 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 9 → Level 10
---

> ssh bandit9@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in the file **data.txt** in one of the few human-readable strings, preceded by several ‘=’ characters.
{: .prompt-info }

Alrighty, so the first thing we need to do is figure out the type of file `data.txt` is, since the question mentions that there aren't very many human-readable strings in it.

```terminal
bandit9@bandit:~$ file data.txt 
data.txt: data
```

Okay, since this isn't an ASCII text file, we'll need to use something other than `cat` to work it out. While we could use `cat` we run the risk of it breaking out terminal since we're outputting binary data through standard output. Instead, we'll use `strings` to output all strings to the terminal screen. Using that, we'll also use `grep` to filter for the several '=' characters.

```terminal
bandit9@bandit:~$ strings data.txt | grep =========
}========== the
3JprD========== passwordi
~fDV3========== is
D9========== {removed in accordance with game rules}
```
