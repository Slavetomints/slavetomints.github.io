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

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3NzM4MDEzMiwtMjA4ODc0NjYxMl19
-->