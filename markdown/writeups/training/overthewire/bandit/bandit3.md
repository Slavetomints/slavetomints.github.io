# bandit3

> ssh bandit3@bandit.labs.overthewire.org -p 2220
> The password for the next level is stored in a hidden file in the **inhere** directory.

After `ssh`ing into the server, lets check out that directory.

```

bandit3@bandit:~$ ls
inhere
bandit3@bandit:~$ cd inhere
bandit3@bandit:~/inhere$ ls
bandit3@bandit:~/inhere$ 
```

So let's talk a little bit about `ls`. 

## ls
`ls` is short for the word list, and it does just that. it lists all the files and directories in the specified directory. If no directory is given, then it uses the current one. By default, hidden files and directories (those with a period in front of them), do not show up as they are considered "hidden". The man page shows this for the `-a` flag

```
  -a, --all                  do not ignore entries starting with .
```

So, rerunning the earlier command with that flag we get.

```

bandit3@bandit:~/inhere$ ls -a
.  ..  ...Hiding-From-You
```

The `.` and `..` are the current directory and the directory one level higher up respectively
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTE5MjgzNzcxM119
-->