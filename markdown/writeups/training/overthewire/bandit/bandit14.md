# bandit14

> ssh ba prondit14@bandit.labs.overthewire.org -p 2220 -i sshkey.private
>  
>  The password for the next level can be retrieved by submitting the password of the current level to **port 30000 on localhost**.

So, this challenge would be really easy if we had ya know, the password. But since we logged in with the SSH key, we didn't need the password. Thankfully, we were told in the last challenge that the password was stored at `/etc/bandit_pass/bandit14` so lets go get it really quick.

```

bandit14@bandit:~$ cat /etc/bandit_pass/bandit14
{removed in accordance with game rules}
```

For this challenge, its asking us to submit the password to port `30000` on `localhost`, which is out own machine, aka `127.0.0.1`. We can open this connecting with Netcat, which is, according to the GNU Netcat project, "a featured networking utility which reads and writes data across network connections, using the TCP/IP protocol." All we need to know for now is that the syntax for netcat is `nc ip_address port` So in our case, we're looking to make a connection with `nc localhost 30000`.

Nothing will happen and thats okay. Past in the password for bandit14, and you should get prompted that that answer was correc tand you'll get the next password.

```

bandit14@bandit:~$ nc localhost 30000
{removed in accordance with game rules}
Correct!
{removed in accordance with game rules}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjEzNDY2NjA5NywtNTA1NjI4MTAxLC0yMD
g4NzQ2NjEyXX0=
-->