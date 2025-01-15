# bandit2

> ssh bandit2@bandit.labs.overthewire.org -p 2220
> The password for the next level is stored in a file called **spaces in this filename** located in the home directory

Alrighty, the challenge this time is to `cat` the contents of a file whose name has spaces in it. What happens if we just try to use the file as it?

```

bandit2@bandit:~$ ls
spaces in this filename
bandit2@bandit:~$ cat spaces in this filename
cat: spaces: No such file or directory
cat: in: No such file or directory
cat: this: No such file or directory
cat: filename: No such file or directory
```

So there's two ways we can do this, the first way is arguably easier and its through simply putting the filename in quotes. The other way involves using the escape character `\` in front of each space to signal that it is part of the string and not part of the command

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQ2MTU4Njk5NywzMTY2MjE4N119
-->