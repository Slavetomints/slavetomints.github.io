# bandit21

> ssh bandit21@bandit.labs.overthewire.org -p 2220
>  
>  A program is running automatically at regular intervals from **cron**, the time-based job scheduler. Look in **/etc/cron.d/** for the configuration and see what command is being executed.

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

So, let's check out what is inside of `/etc/cron.d`

```

bandit21@bandit:~$ ls /etc/cron.d/
cronjob_bandit22  cronjob_bandit23  cronjob_bandit24  e2scrub_all  otw-tmp-dir  sysstat
```

Hm, now that we know what's there, the `cronjob_bandit22` is probably the one that pertains to us, so lets take a quick look inside there. 

```

bandit21@bandit:~$ cat /etc/cron.d/cronjob_bandit22
@reboot bandit22 /usr/bin/cronjob_bandit22.sh &> /dev/null
* * * * * bandit22 /usr/bin/cronjob_bandit22.sh &> /dev/null
```

Now that we know the command the job is running, lets pop open that shell script and see if we can find anything more important in there.

``
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzUzNDA5MDE3LC0yMDMxNTEyMjI3LC02MD
g2Mzc0MDUsLTIwODg3NDY2MTJdfQ==
-->