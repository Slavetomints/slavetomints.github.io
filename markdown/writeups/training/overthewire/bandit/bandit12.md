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

Now, before we do any decompressing, we need to make the file out of the hexdump. We're going to use `xxd` to reverse the process with the handy dandy `-r` flag, which stands for reverse. We'll send that into a new file named `compressed.txt` and we're off to the races.

```

bandit12@bandit:/tmp/tmp.dVNGKtAhrL$ xxd -r data.txt > compressed.txt
```

In order to figure out the type of file that we're dealing with, we need to use `file` to discover it.

```

bandit12@bandit:/tmp/tmp.dVNGKtAhrL$ file compressed.txt 
compressed.txt: gzip compressed data, was "data2.bin", last modified: Thu Sep 19 07:08:15 2024, max compression, from Unix, original size modulo 2^32 574
```

Let's take a look at those compression protocols.

## gzip

`gzip` is going to be our troublemaker today, as it wont decompress unless it has the `.gz` file extension. To change a file's extension you can use `mv` to change the name to something new, and then use `gzip -d` where the flag d is for decompress to decompressing your file

```

bandit12@bandit:/tmp/tmp.dVNGKtAhrL$ mv compressed.txt compressed.gz
bandit12@bandit:/tmp/tmp.dVNGKtAhrL$ gzip -d compressed.gz 
```

## bzip2

`bzip2` is similar to `gzip` in which it wants you to select the file format, but its not going to be picky about it and will work without it. You decompress the same was as `gzip` such as `bzip2 -d`

```

bandit12@bandit:/tmp/tmp.dVNGKtAhrL$ bzip2 -d compressed
bzip2: Can't guess original name for compressed -- using compressed.out
```

## tar

`tar` is another fun one. To decompress with `tar` we want to use the `-xvf` flags, where those mean the following: 
| Flag | Definition |
|:--:|:--:|
| x | |
| v | |
| f | |

# You need to change the directories oki?
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTAwMDM5MDQzLC0xMzk5NDA3MTc1LDE4Nz
Q5NzI3MzksLTEzNzAxMDUzMjAsLTIwODg3NDY2MTJdfQ==
-->