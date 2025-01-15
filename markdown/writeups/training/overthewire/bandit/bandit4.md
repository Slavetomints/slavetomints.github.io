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

Now, we're looking for the only human-readable file. While we could `cat` every single file, we run the risk to breaking our terminal is we output binary data. So lets use the `file` command to 
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1OTc0NjgzMjIsMjA1ODM5MTkyOF19
-->