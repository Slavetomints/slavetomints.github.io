# bandit9

> ssh bandit9@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in the file **data.txt** in one of the few human-readable strings, preceded by several ‘=’ characters.

Alrighty, so the first thing we need to do is figure out the type of file `data.txt` is, since the question mentions that there aren't very many human readable strings in it.

```

bandit9@bandit:~$ file data.txt 
data.txt: data
```

Okay, since this isn't an ASXCI
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEwMTY0ODQxNDQsODI4Nzg4MDJdfQ==
-->