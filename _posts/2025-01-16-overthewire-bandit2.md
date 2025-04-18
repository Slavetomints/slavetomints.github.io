---
title: Bandit Level 2 → Level 3
date: 2025-01-16 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 2 → Level 3
---

> ssh bandit2@bandit.labs.overthewire.org -p 2220
> 
> The password for the next level is stored in a file called **spaces in this filename** located in the home directory
{: .prompt-info }

Alrighty, the challenge this time is to `cat` the contents of a file whose name has spaces in it. What happens if we just try to use the file as it?

```terminal
bandit2@bandit:~$ ls
spaces in this filename
bandit2@bandit:~$ cat spaces in this filename
cat: spaces: No such file or directory
cat: in: No such file or directory
cat: this: No such file or directory
cat: filename: No such file or directory
```

Why does this happen? It's because with the spaces they're interpreted as sperate files/directories, and since they dont exist, it cant output their content.

So there are two ways we can do this, the first way is arguably easier and it's through simply putting the filename in quotes. The other way involves using the escape character `\` in front of each space to signal that it is part of the string and not part of the command `.\`

```terminal
bandit2@bandit:~$ cat 'spaces in this filename' 
{hidden in accordance with game rules}
bandit2@bandit:~$ cat spaces\ in\ this\ filename 
{hidden in accordance with game rules}
```
