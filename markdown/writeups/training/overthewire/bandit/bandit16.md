# bandit16

> ssh bandit16@bandit.labs.overthewire.org -p 2220
>  
>  The credentials for the next level can be retrieved by submitting the password of the current level to **a port on localhost in the range 31000 to 32000**. First find out which of these ports have a server listening on them. Then find out which of those speak SSL/TLS and which don’t. There is only 1 server that will give the next credentials, the others will simply send back to you whatever you send to it.


First things first, we need to find that port that will give us the credentials. For this we'll use `nmap`. If you need a quick refresher on `nmap`, you can check out my guides for it [here](https://slavetomints.github.io/guides/guides/network-security/nmap/nmap.html). The command for this scan is going to be `nmap localhost -p31000-32000 -sV`
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3NTM4MTA0NDcsNjk2MjQ3OTY5LDMwMT
I0MDIyLC0yMDg4NzQ2NjEyXX0=
-->