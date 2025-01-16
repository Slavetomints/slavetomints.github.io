# bandit7

> ssh bandit7@bandit.labs.overthewire.org -p 2220
> 
> The password for the next level is stored in the file **data.txt** next to the word **millionth**

So, if we try to cat the file `data.txt` we notice that there are quite a few lines in it, and while we could read through until we find the word millionth it would take quite a while. So lets use the `grep` command to filter the output from that.

If we run `cat data.txt | grep millionth`, it should work, but let's break down how the command works.

The first thing we do is we send all of the contents of `data.txt` to the terminal output, but instead of it displaying it is actually sent into another command
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTUzMjAwNTU0MCw5MDMzMzkwMTgsLTg1Mz
Q3MjE3Nl19
-->