# bandit4

> ssh bandit4@bandit.labs.overthewire.org -p 2220
> The password for the next level is stored in the only human-readable file in the **inhere** directory. Tip: if your terminal is messed up, try the “reset” command.


Let's take a look at the server now.

```

bandit4@bandit:~$ ls
inhere
bandit4@bandit:~$ cd inhere
bandit4@bandit:~/inhere$ ls
-file00  -file01  -file02  -file03  -file04  -file05  -file06  -file07  -file08  -file09
```

Now, we're looking for the only human-readable file. While we could `cat` every single file, we run the risk to breaking our terminal is we output binary data. So lets use the `file` command to figure out the file type!

Now, remembering the lessons we learned earlier, if the file starts with '-' it is going to be interpreted as a flag, so instead lets prepend `./` to the file names. 

Also, instead of just looking at each file one after another, lets use the wildcard `*` to designate that I want to use every single file in the directory.

```

bandit4@bandit:~/inhere$ file ./*
./-file00: data
./-file01: data
./-file02: data
./-file03: data
./-file04: data
./-file05: data
./-file06: data
./-file07: ASCII text
./-file08: data
./-file09: data
```

Looks like `-file07` is the one we want.

```

bandit4@bandit:~/inhere$ cat ./-file07 
{hidden in accordance with game rules}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQxMzUyNzMxMiwtMTQ3OTIzNzYyMiwtMT
U5NzQ2ODMyMiwyMDU4MzkxOTI4XX0=
-->