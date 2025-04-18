---
title: Bandit Level 5 → Level 6
date: 2025-01-16 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 5 → Level 6
---

> ssh bandit5@bandit.labs.overthewire.org -p 2220
> 
> The password for the next level is stored in a file somewhere under the **inhere** directory and has all of the following properties:
> 
> -   human-readable
> -   1033 bytes in size
> -   not executable
{: .prompt-info }

## The `find` Command

Here is where we are going to show off the `find` command in all its glory, as it can do all the work for us here.

We know that the file needs to be human-readable and is exactly 1033 bytes in size, so let's append the flags `-readable` and `-size 1033c` to the find command, and watch as it recursively scans through the directories looking for the file that meets our specifications.

```terminal

bandit5@bandit:~$ find -readable -size 1033c
./maybehere07/.file2
```
 And the password awaits us in that file!

```terminal

bandit5@bandit:~$ cat ./inhere/maybehere07/.file2 
{removed in accordance with game rules}
```
