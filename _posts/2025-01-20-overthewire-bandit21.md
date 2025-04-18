---
title: Bandit Level 21 → Level 22
date: 2025-01-20 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 21 → Level 22
---

> ssh bandit21@bandit.labs.overthewire.org -p 2220
>  
>  A program is running automatically at regular intervals from **cron**, the time-based job scheduler. Look in **/etc/cron.d/** for the configuration and see what command is being executed.
{: .prompt-info }

## What is `cron`?

So for this one, we need to decipher a `cron` job. `cron` is a time-based job scheduler, where users can create a job to run at regular intervals. Wikipedia has an example template that looks like this:

```
# * * * * * <command to execute>
# | | | | |
# | | | | day of the week (0–6) (Sunday to Saturday; 
# | | | month (1–12)             7 is also Sunday on some systems)
# | | day of the month (1–31)
# | hour (0–23)
# minute (0–59)
```

So, let's check out what is inside `/etc/cron.d`

```terminal
bandit21@bandit:~$ ls /etc/cron.d/
cronjob_bandit22  cronjob_bandit23  cronjob_bandit24  e2scrub_all  otw-tmp-dir  sysstat
```

Hm, now that we know what's there, the `cronjob_bandit22` is probably the one that pertains to us, so let's take a quick look inside there. 

```terminal
bandit21@bandit:~$ cat /etc/cron.d/cronjob_bandit22
@reboot bandit22 /usr/bin/cronjob_bandit22.sh &> /dev/null
* * * * * bandit22 /usr/bin/cronjob_bandit22.sh &> /dev/null
```

Now that we know the command the job is running, let's pop open that shell script and see if we can find anything more important in there.

```terminal
bandit21@bandit:~$ cat /usr/bin/cronjob_bandit22.sh
#!/bin/bash
chmod 644 /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
cat /etc/bandit_pass/bandit22 > /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
```

Looks like it changes the readability of a temp directory to readable by everyone, and then puts the password for bandit22 inside of it!

```terminal
bandit21@bandit:~$ cat /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
{removed in accordance with games rules}
```

