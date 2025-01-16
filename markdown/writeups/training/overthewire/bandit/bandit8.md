# bandit8

> ssh bandit8@bandit.labs.overthewire.org -p 2220
>
> The password for the next level is stored in the file **data.txt** and is the only line of text that occurs only once

Similar to the last level, this level utilizes the file `data.txt` however this time it has a bunch of decoy passwords instead, and we are looking for the only unique one. 

The first idea you might have is to use the command `cat data.txt | uniq -u`, but this will not work as it sees every line as its own unique line. What we need to do first is 

<!--stackedit_data:
eyJoaXN0b3J5IjpbNzM0Mzc1NjI2LC0xODE0NTQwMjY2LDE3NT
M3Njc0NzJdfQ==
-->