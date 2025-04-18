---
title: Bandit Level 22 → Level 23
date: 2025-01-20 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 22 → Level 23
---

> ssh bandit22@bandit.labs.overthewire.org -p 2220
>  
>  A program is running automatically at regular intervals from **cron**, the time-based job scheduler. Look in **/etc/cron.d/** for the configuration and see what command is being executed.
{: .prompt-info }

Same deal as last level, the `cron` job reveals a shell script. Let's take a look at that shell script.

```bash
#!/bin/bash

myname=$(whoami)
mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)

echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"

cat /etc/bandit_pass/$myname > /tmp/$mytarget
```
{: file="/usr/bin/cronjob_bandit23.sh" }

First, the script sets the user's name to the `myname` variable, and then uses it in a string that gets obfuscated. That string ends up being the temp file where the password from bandit23 gets saved. The way to access this is to use the same obfuscation method used there, piping the string "I am user bandit23" into `md5sum` and uses `cut` to format it some more.

Let's set up the command the same way, substituting the `$myname` with the actual value of the name so we can figure out where the password is hiding, and `cat` the results of that.

```terminal
bandit22@bandit:~$ echo I am user bandit23 | md5sum | cut -d ' ' -f 1
8ca319486bfbbc3663ea0fbe81326349
bandit22@bandit:~$ cat /tmp/8ca319486bfbbc3663ea0fbe81326349
{removed according to game rules}
```

