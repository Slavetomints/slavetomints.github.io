# bandit10

> ssh bandit10@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in the file **data.txt**, which contains base64 encoded data

Alrighty, so we know that the file contains base64 encoded data, so lets verify that quickly.

```

bandit10@bandit:~$ cat data.txt 
VGhlIHBhc3N3b3JkIGlzIGR0UjE3M2ZaS2IwUlJzREZTR3NnMlJXbnBOVmozcVJyCg==
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0NjUzNjEyODEsLTM3MzYzMTc1NF19
-->