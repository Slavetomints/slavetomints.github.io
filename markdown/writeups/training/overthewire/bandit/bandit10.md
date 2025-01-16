# bandit10

> ssh bandit10@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in the file **data.txt**, which contains base64 encoded data

Alrighty, so we know that the file contains base64 encoded data, so lets verify that quickly.

```

bandit10@bandit:~$ cat data.txt 
VGhlIHBhc3N3b3JkIGlzIGR0UjE3M2ZaS2IwUlJzREZTR3NnMlJXbnBOVmozcVJyCg==
```

The biggest tell that this is base64 encoded data is the trailing equal signs, which base64 encoding uses to get the string to a standard size if it is too short. To decode this we'll need to introduce 
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzE4NTQ2MTY5LC0zNzM2MzE3NTRdfQ==
-->