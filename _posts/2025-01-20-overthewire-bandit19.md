---
title: Bandit Level 19 → Level 20
date: 2025-01-20 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 19 → Level 20
---

> ssh bandit19@bandit.labs.overthewire.org -p 2220
>  
>  To gain access to the next level, you should use the setuid binary in the homedirectory. Execute it without arguments to find out how to use it. The password for this level can be found in the usual place (/etc/bandit_pass), after you have used the setuid binary.
{: .prompt-info }

Another simple challenge. If you run the bandit20-do binary by itself, it shows you that you can execute commands as bandit20. And since they are the ones allowed to see into their password file, we can't use `cat` to steal their password and pass this level.

```terminal
bandit19@bandit:~$ ls
bandit20-do
bandit19@bandit:~$ file bandit20-do 
bandit20-do: setuid ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), dynamically linked, interpreter /lib/ld-linux.so.2, BuildID[sha1]=368cd8ac4633fabdf3f4fb1c47a250634d6a8347, for GNU/Linux 3.2.0, not stripped
bandit19@bandit:~$ ./bandit20-do 
Run a command as another user.
  Example: ./bandit20-do id
bandit19@bandit:~$ ./bandit20-do id
uid=11019(bandit19) gid=11019(bandit19) euid=11020(bandit20) groups=11019(bandit19)
bandit19@bandit:~$ ./bandit20-do cat /etc/bandit_pass/bandit20
{removed in accordance with game rules}
```
