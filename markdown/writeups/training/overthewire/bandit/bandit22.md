# bandit22

> ssh bandit22@bandit.labs.overthewire.org -p 2220
>  
>  A program is running automatically at regular intervals from **cron**, the time-based job scheduler. Look in **/etc/cron.d/** for the configuration and see what command is being executed.

Same deal as last level, the `cron` job reveals a shell script. Let's take a look at that shell script.

```

bandit22@bandit:~$ cat /usr/bin/cronjob_bandit23.sh
#!/bin/bash

myname=$(whoami)
mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)

echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"

cat /etc/bandit_pass/$myname > /tmp/$mytarget
```

First the script sets the user's name to the `myname` variable, and then uses it in a string that gets obfuscated. That string ends up being the temp file where the password from bandit23 gets saved. The way to access this is to use the same obfuscation method used there, piping the string "I am user bandit23" into `md5sum` and uses `cut` to format it some more.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTg1MDg0MzY3OCwzNDE1NDY5ODEsLTExOD
A4MDMwMDgsLTEzNDY2ODkzMTYsLTIwNDcyMjkyNzgsMTQ2NjA2
OTIwNCwtMjA4ODc0NjYxMl19
-->