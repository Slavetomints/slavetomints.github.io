# bandit14

> ssh bandit14@bandit.labs.overthewire.org -p 2220 -i sshkey.private
>  
>  The password for the next level can be retrieved by submitting the password of the current level to **port 30000 on localhost**.

So, this challenge would be really easy if we had ya know, the password. But since we logged in with the SSH key, we didn't need the password. Thankfully, we were told in the last challenge that the password was stored at `/etc/bandit_pass/bandit14` so lets go get it really quick.

```

bandit14@bandit:~$ cat /etc/bandit_pass/bandit14
{removed in accordance with game rules}
```

For this challenge, its asking us to submit the password to port 30000
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjc3ODY0NzczLC01MDU2MjgxMDEsLTIwOD
g3NDY2MTJdfQ==
-->