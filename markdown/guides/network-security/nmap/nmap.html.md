
# Nmap

Nmap is the well known network scanner that can serve a variety of functions, such as port scanning, identifying hosts, and ping scanning.
  

```
┌─[slavetomints@parrot]─[~]
└──╼ $nmap www.example.com
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-12-13 23:20 CST
Nmap scan report for www.example.com (93.184.215.14)
Host is up (0.050s latency).
Other addresses for www.example.com (not scanned): 2606:2800:21f:cb07:6820:80da:af6b:8b2c
Not shown: 995 filtered tcp ports (no-response)
PORT STATE SERVICE
53/tcp closed domain
80/tcp open http
443/tcp open https
1119/tcp closed bnetgame
1935/tcp closed rtmp
Nmap done: 1 IP address (1 host up) scanned in 5.92 seconds
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1MTgxODg0MjZdfQ==
-->