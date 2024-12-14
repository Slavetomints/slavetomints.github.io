# Basic Scans

Alrighty! Now that we've [checked our scope](https://slavetomints.github.io/guides/guides/network-security/nmap/list-scans.html), its time to check to see what on the network is active. For this we'll be using `198.162.0.0/24` for demonstration purposes.

```

┌─[slavetomints@parrot]─[~]
└──╼ $nmap 192.168.0.0/24
Starting Nmap 7.94 ( https://nmap.org ) at 2024-12-14 12:34 UTC
Nmap scan report for 192.168.0.1
Host is up (0.0010s latency).
Not shown: 997 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
MAC Address: 00:1A:2B:3C:4D:5E (Netgear Inc.)

Nmap scan report for 192.168.0.10
Host is up (0.0025s latency).
Not shown: 998 closed ports
PORT     STATE SERVICE
21/tcp   open  ftp
139/tcp  open  netbios-ssn
MAC Address: 78:45:C4:D1:E2:F3 (Dell Inc.)

Nmap scan report for 192.168.0.15
Host is up (0.0030s latency).
Not shown: 996 closed ports
PORT     STATE SERVICE
80/tcp   open  http
139/tcp  open  netbios-ssn
445/tcp  open  microsoft-ds
MAC Address: 00:50:56:FA:BC:01 (VMware Inc.)

Nmap scan report for 192.168.0.50
Host is up (0.0015s latency).
Not shown: 994 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
3306/tcp open  mysql
8080/tcp open  http-proxy
MAC Address: C8:3A:35:A1:7F:BC (ASUSTek Computer Inc.)

Nmap scan report for 192.168.0.100
Host is up (0.0020s latency).
Not shown: 996 closed ports
PORT     STATE SERVICE
23/tcp   open  telnet
80/tcp   open  http
554/tcp  open  rtsp
MAC Address: 40:A5:EF:55:23:78 (Hikvision Digital Technology Co., Ltd.)

Nmap scan report for 192.168.0.200
Host is up (0.0012s latency).
Not shown: 998 closed ports
PORT     STATE SERVICE
80/tcp   open  http
443/tcp  open  https
MAC Address: 58:82:A8:11:44:AA (Apple Inc.)

Nmap scan report for 192.168.0.254
Host is up (0.0008s latency).
Not shown: 996 closed ports
PORT     STATE SERVICE
53/tcp   open  domain
80/tcp   open  http
443/tcp  open  https
MAC Address: F4:F5:24:A6:C8:EF (Cisco Systems, Inc.)

Nmap done: 256 IP addresses (7 hosts up) scanned in 12.34 seconds
```

Wow! That's a lot of information! So we now need to figure out what is what. Some of it is pretty simple, such as `192.160.0.200`. We know from the MAC Address that it is an Apple device, probably an iPhone or an iPad. What else can we figure out from this scan?

Another point of interest is the device at `192.168.0.10`, which we know is a Dell computer, but what else? Well, it's likely that its a Windows workstation due to the fact that FTP is up and running, and that port 139 is active, which is usually used for file sharing purposes for devices such as printers on a Windows machine. 

So now that we've looked as some of the devices and identified them, what else can you find about this network?

## Figuring out service versions

So lets take a look at the versions of the active services to see if anything has any vulnerabilities. 
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5NDIwNjQ1NzksLTE5MDE4MzcxODcsMz
M1NzU4MjQ3LDc1MTY3MzQ0NywxMzI5NTM3NDIyXX0=
-->