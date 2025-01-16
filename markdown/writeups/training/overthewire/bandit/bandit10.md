# bandit10

> ssh bandit10@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in the file **data.txt**, which contains base64 encoded data

Alrighty, so we know that the file contains base64 encoded data, so lets verify that quickly.

```

bandit10@bandit:~$ cat data.txt 
VGhlIHBhc3N3b3JkIGlzIGR0UjE3M2ZaS2IwUlJzREZTR3NnMlJXbnBOVmozcVJyCg==
```

The biggest tell that this is base64 encoded data is the trailing equal signs, which base64 encoding uses to get the string to a standard size if it is too short. To decode this we'll need to introduce the `base64` command.

## base64
```
NAME
       base64 - base64 encode/decode data and print to standard output

SYNOPSIS
       base64 [OPTION]... [FILE]

DESCRIPTION
       Base64 encode or decode FILE, or standard input, to standard output.

       With no FILE, or when FILE is -, read standard input.

       Mandatory arguments to long options are mandatory for short options too.

       -d, --decode
              decode data
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE2ODA0ODczMTcsLTM3MzYzMTc1NF19
-->