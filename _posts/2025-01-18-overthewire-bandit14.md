---
title: Bandit Level 14 → Level 15
date: 2025-01-18 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 14 → Level 15
---

> ssh ba prondit14@bandit.labs.overthewire.org -p 2220 -i sshkey.private
>  
>  The password for the next level can be retrieved by submitting the password of the current level to **port 30000 on localhost**.
{: .prompt-info }

So, this challenge would be really easy if we had, ya know, the password. But since we logged in with the SSH key, we didn't need the password. Thankfully, we were told in the last challenge that the password was stored at `/etc/bandit_pass/bandit14` so let's go get it really quick.

```terminal
bandit14@bandit:~$ cat /etc/bandit_pass/bandit14
{removed in accordance with game rules}
```

For this challenge, it's asking us to submit the password to port `30000` on `localhost`, which is our own machine, aka `127.0.0.1`. We can open this connection with `netcat`, which is, according to the GNU Netcat project, "a featured networking utility which reads and writes data across network connections, using the TCP/IP protocol." All we need to know for now is that the syntax for netcat is `nc ip_address port` So, in our case, we're looking to make a connection with `nc localhost 30000`.

Nothing will happen, and that's okay. Pass in the password for bandit14, and you should get prompted that that answer was correct, and you'll get the next password.

```terminal
bandit14@bandit:~$ nc localhost 30000
{removed in accordance with game rules}
Correct!
{removed in accordance with game rules}
```
