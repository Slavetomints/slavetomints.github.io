---
title: Bandit Level 12 → Level 13
date: 2025-01-18 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 12 → Level 13
---

> ssh bandit12@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in the file **data.txt**, which is a hexdump of a file that has been repeatedly compressed. For this level it may be useful to create a directory under /tmp in which you can work. Use mkdir with a hard to guess directory name. Or better, use the command “mktemp -d”. Then copy the datafile using cp, and rename it using mv (read the manpages!)
{: .prompt-info }

This level is a little bit different. I am going to walk you through how to decompress the three different file types and how to get started on the challenge, and then show you the full output from my terminal.

## Setting Up

Firstly though we need to move the file to a place where we can make edits to the file, so we'll do the work in `/tmp` which is for temporary file storage and is cleared when the computer shuts down. We'll use `mktemp -d` so it makes a random directory in `/tmp` so other people can't mess with our stuff. And then finally copy over the file with the `cp` command.

```terminal
bandit12@bandit:~$ mktemp -d
/tmp/tmp.QSXjJUP0qG
bandit12@bandit:~$ cd /tmp/tmp.QSXjJUP0qG
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ cp /home/bandit12/data.txt data.txt
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ ls
data.txt
```
## Decompressing Different Compression Formats

Now, before we do any decompressing, we need to make the file out of the hexdump. We're going to use `xxd` to reverse the process with the handy dandy `-r` flag, which stands for reverse. We'll send that into a new file named `compressed.txt` and we're off to the races.

```terminal
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ xxd -r data.txt > compressed.txt
```

In order to figure out the type of file that we're dealing with, we need to use `file` to discover it.

```terminal
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ file compressed.txt 
compressed.txt: gzip compressed data, was "data2.bin", last modified: Thu Sep 19 07:08:15 2024, max compression, from Unix, original size modulo 2^32 574
```

Let's take a look at those compression protocols.

### gzip

`gzip` is going to be our troublemaker today, as it won't decompress unless it has the `.gz` file extension. To change a file's extension you can use `mv` to change the name to something new, and then use `gzip -d` where the flag d is for decompress to decompressing your file

```terminal
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ mv compressed.txt compressed.gz
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ gzip -d compressed.gz 
```

### bzip2

`bzip2` is similar to `gzip` in which it wants you to select the file format, but it's not going to be picky about it and will work without it. You decompress the same was as `gzip` such as `bzip2 -d`

```terminal
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ bzip2 -d compressed
bzip2: Can't guess original name for compressed -- using compressed.out
```

### tar

`tar` is another fun one. To decompress with `tar` we want to use the `-xvf` flags, where those mean the following: 
| Flag | Definition |
|:--:|:--:|
| x | extract files from an archive |
| v | verbosely list files processed |
| f | use archive file or device ARCHIVE |

For example:

```terminal
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ file compressed 
compressed: POSIX tar archive (GNU)
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ tar -xvf compressed
data5.bin
```

## Putting it together
```terminal
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ file compressed.txt 
compressed.txt: gzip compressed data, was "data2.bin", last modified: Thu Sep 19 07:08:15 2024, max compression, from Unix, original size modulo 2^32 574
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ mv compressed.txt compressed.gz
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ gzip -d compressed.gz 
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ bzip2 -d compressed
bzip2: Can't guess original name for compressed -- using compressed.out
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ file compressed.out 
compressed.out: gzip compressed data, was "data4.bin", last modified: Thu Sep 19 07:08:15 2024, max compression, from Unix, original size modulo 2^32 20480
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ mv compressed.out compressed.gz
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ gzip -d compressed.gz 
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ file compressed 
compressed: POSIX tar archive (GNU)
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ tar -xvf compressed
data5.bin
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ file data5.bin 
data5.bin: POSIX tar archive (GNU)
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ tar -xvf data5.bin
data6.bin
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ file data6.bin
data6.bin: bzip2 compressed data, block size = 900k
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ bzip2 -d data6.bin
bzip2: Can't guess original name for data6.bin -- using data6.bin.out
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ file data6.bin.out 
data6.bin.out: POSIX tar archive (GNU)
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ tar -xvf data6.bin.out
data8.bin
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ file data8.bin 
data8.bin: gzip compressed data, was "data9.bin", last modified: Thu Sep 19 07:08:15 2024, max compression, from Unix, original size modulo 2^32 49
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ mv data8.bin data8.gz
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ gzip -d data8.gz 
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ file data8 
data8: ASCII text
bandit12@bandit:/tmp/tmp.QSXjJUP0qG$ cat data8
The password is {removed in accordance with game rules}
```
