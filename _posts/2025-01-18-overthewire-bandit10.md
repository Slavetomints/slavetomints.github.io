---
title: Bandit Level 10 → Level 11
date: 2025-01-18 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 10 → Level 11
---

> ssh bandit10@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in the file **data.txt**, which contains base64 encoded data
{: .prompt-info }

Alrighty, so we know that the file contains base64 encoded data, so let's verify that quickly.

```terminal
bandit10@bandit:~$ cat data.txt 
VGhlIHBhc3N3b3JkIGlzIGR0UjE3M2ZaS2IwUlJzREZTR3NnMlJXbnBOVmozcVJyCg==
```

The biggest tell that this is base64 encoded data is the trailing equal signs, which base64 encoding uses to get the string to a standard size if it is too short. To decode this, we'll need to introduce the `base64` command.

## base64
```terminal
NAME
       base64 - base64 encode/decode data and print to standard output

SYNOPSIS
       base64 [OPTION]... [FILE]

DESCRIPTION
       Base64 encode or decode FILE, or standard input, to standard output.

       With no FILE, or when FILE is -, read standard input.

       Mandatory arguments to long options are mandatory for short options too.

       -d, --decode
              decode data
```
*Taken from the man page for base64*

This is all we're going to need in order to solve this level. Using `base64` with the flag `-d` for decode, we can figure out what the password is.

```terminal
bandit10@bandit:~$ base64 -d data.txt 
The password is {removed in accordance with game rules}
```
