# Listing Scans

So you want to to scan a network to look for alive hosts, but you want to make sure that you remain in scope. Thankfully Nmap has a nifty tool for that.

So lets say your scope is limited to `192.168.0.0/24`, and you want to be sure you only scan things on that subnet. But you cant just hope and pray that your command will be correct on the first go, that will look unprofessional. So you need to validate what you'll be scanning on the network. For that lets use the `-sL` flag.

The `--sL` flag stands for  List Scan, and all it does it list out the target that you are going to scan with your current settings. So, taking our `192.168.0.0/24` example, the output would look something like this:

```

┌─[slavetomints@parrot]─[~]
└──╼ $nmap -sL 192.168.0.0/24
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-12-14 15:47 CST
Nmap scan report for 192.168.0.0
Nmap scan report for 192.168.0.1
Nmap scan report for 192.168.0.2
Nmap scan report for 192.168.0.3
Nmap scan report for 192.168.0.4
Nmap scan report for 192.168.0.5
Nmap scan report for 192.168.0.6
Nmap scan report for 192.168.0.7
Nmap scan report for 192.168.0.8
Nmap scan report for 192.168.0.9
Nmap scan report for 192.168.0.10
Nmap scan report for 192.168.0.11
Nmap scan report for 192.168.0.12
--------<Cut for brevity>--------
Nmap scan report for 192.168.0.248
Nmap scan report for 192.168.0.249
Nmap scan report for 192.168.0.250
Nmap scan report for 192.168.0.251
Nmap scan report for 192.168.0.252
Nmap scan report for 192.168.0.253
Nmap scan report for 192.168.0.254
Nmap scan report for 192.168.0.255
```
This is helpful in the reconnaissance phase since the "scan" doesn't send any packets and instead tries only to resolve hostnames. The reason it is important that you don't accidentally scan the wrong network is that you can get in serious trouble for acting out of scope, as you have no legal protections for that.

If DNS is configured, Nmap may resolve and display hostnames alongside IP addresses. Otherwise, it will just list the IPs. In this example, we only got hostnames, but its still nice to be able to verify that what we're scanning is correct.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTkzMTUzOTYyNiw1NjU2NzU2NTgsLTE0NT
k3OTMyNjMsLTQwMTg5MjE3NiwtMTU0MTUzMjYwOV19
-->