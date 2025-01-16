# bandit12

> ssh bandit12@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in the file **data.txt**, which is a hexdump of a file that has been repeatedly compressed. For this level it may be useful to create a directory under /tmp in which you can work. Use mkdir with a hard to guess directory name. Or better, use the command “mktemp -d”. Then copy the datafile using cp, and rename it using mv (read the manpages!)

This level is a little bit different. I am going to walk you through how to decompress the three different file types and how to get started on the challenge and then show you the full output from my terminal.

Firstly though we need to move the file to a place where we can make edits to the file, so we'll to the work in `/tmp` which is for temporary file storage and is cleared when the computer shuts down. We'll use `mktemp -d` so it makes a random directory in `/tmp` so other people can't mess with our stuff. And then finally copy over the file with the `cp` command.

```

bandit12@bandit:~$ mktemp -d
/tmp/tmp.dVNGKtAhrL
bandit12@bandit:~$ cd /tmp/tmp.dVNGKtAhrL
bandit12@bandit:/tmp/tmp.dVNGKtAhrL$ cp /home/bandit12/data.txt data.txt
bandit12@bandit:/tmp/tmp.dVNGKtAhrL$ ls
data.txt
```

Now, before we do any decompressing, we need to make the file out of the hexdump. We're going to use `xxd` to reverse the process with the handy dandy `-r` flag, which stands for reverse. We'll send that into a new fi
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5NjYyNTA3MTQsLTEzNzAxMDUzMjAsLT
IwODg3NDY2MTJdfQ==
-->