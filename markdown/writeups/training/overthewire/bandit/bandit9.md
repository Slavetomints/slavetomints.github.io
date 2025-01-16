# bandit9

> ssh bandit9@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in the file **data.txt** in one of the few human-readable strings, preceded by several ‘=’ characters.

Alrighty, so the first thing we need to do is figure out the type of file `data.txt` is, since the question mentions that there aren't very many human readable strings in it.

```

bandit9@bandit:~$ file data.txt 
data.txt: data
```

Okay, since this isn't an ASCII text file, we'll need to use something other than `cat` to work it out. While we could use `cat` we run the risk of it breaking out terminal since we're outputting binary data through standard output. Instead, we'll use `strings` to output all strings to the terminal screen. Using that we'll also use `grep` to filter for the several '=' characters.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIxMjg3NzU2MzIsODI4Nzg4MDJdfQ==
-->