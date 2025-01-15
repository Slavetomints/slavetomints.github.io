# bandit5

> ssh bandit5@bandit.labs.overthewire.org -p 2220
> The password for the next level is stored in a file somewhere under the **inhere** directory and has all of the following properties:
> 
> -   human-readable
> -   1033 bytes in size
> -   not executable

Here is where we are going to show off the `find` command in all its glory, as it can do all the work for us here.

We know that the file needs to be human-readable and is exactly 1033 bytes in size, so lets append the flags `-readable` and `-size 1033c` to the find command, and watch as it recursively scans through the directories looking for the file that meets out specifications.

```

bandit5@bandit:~$ find -readable -size 1033c
./maybehere07/.file2
``
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTgwMjkxMDk1OCw3MzU3MjU5MDMsLTE3Mj
I2NTI4ODAsLTE3NzI5ODQxNzZdfQ==
-->