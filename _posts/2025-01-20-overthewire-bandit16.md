---
title: Bandit Level 16 → Level 17
date: 2025-01-20 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 16 → Level 17
---

> ssh bandit16@bandit.labs.overthewire.org -p 2220
>  
>  The credentials for the next level can be retrieved by submitting the password of the current level to **a port on localhost in the range 31000 to 32000**. First find out which of these ports have a server listening on them. Then find out which of those speak SSL/TLS and which don’t. There is only 1 server that will give the next credentials, the others will simply send back to you whatever you send to it.
{: .prompt-info }

## The Solution
### Running `nmap`
First things first, we need to find that port that will give us the credentials. For this, we'll use `nmap`. If you need a quick refresher on `nmap`, you can check out my guides for it [here](https://slavetomints.github.io/guides/guides/network-security/nmap/nmap.html). The command for this scan is going to be `nmap localhost -p31000-32000 -sV`

```terminal
bandit16@bandit:~$ nmap localhost -p31000-32000 -sV
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-01-20 05:15 UTC
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00021s latency).
Not shown: 996 closed tcp ports (conn-refused)
PORT      STATE SERVICE     VERSION
31046/tcp open  echo
31518/tcp open  ssl/echo
31691/tcp open  echo
31790/tcp open  ssl/unknown
31960/tcp open  echo
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port31790-TCP:V=7.94SVN%T=SSL%I=7%D=1/20%Time=678DDC07%P=x86_64-pc-linu
SF:x-gnu%r(GenericLines,32,"Wrong!\x20Please\x20enter\x20the\x20correct\x2
SF:0current\x20password\.\n")%r(GetRequest,32,"Wrong!\x20Please\x20enter\x
SF:20the\x20correct\x20current\x20password\.\n")%r(HTTPOptions,32,"Wrong!\
SF:x20Please\x20enter\x20the\x20correct\x20current\x20password\.\n")%r(RTS
SF:PRequest,32,"Wrong!\x20Please\x20enter\x20the\x20correct\x20current\x20
SF:password\.\n")%r(Help,32,"Wrong!\x20Please\x20enter\x20the\x20correct\x
SF:20current\x20password\.\n")%r(FourOhFourRequest,32,"Wrong!\x20Please\x2
SF:0enter\x20the\x20correct\x20current\x20password\.\n")%r(LPDString,32,"W
SF:rong!\x20Please\x20enter\x20the\x20correct\x20current\x20password\.\n")
SF:%r(SIPOptions,32,"Wrong!\x20Please\x20enter\x20the\x20correct\x20curren
SF:t\x20password\.\n");

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 157.83 seconds
```

### Connecting With `SSL` Again

Hm, looks like the only port where the service is just `SSL` is port `31790`, so let's use `openssl`to get into that one and take a look there. We'll use the following command to connect to the port over SSL/TLS.

```terminal
bandit16@bandit:~$ openssl s_client -connect localhost:31790 -ign_eof
```

And then once prompted, let's give it the password for the current level

```terminal
read R BLOCK
{removed in accordance with game rules}
Correct!
-----BEGIN RSA PRIVATE KEY-----
ThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEn
GEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAll
EnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChA
llEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEC
hAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmTh
EChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOm
ThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFr
OmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKey
FrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlK
eyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuA
lKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcT
uAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeA
cTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtH
eAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoT
tHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsN
oTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThI
sNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGET
hIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnG
EThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllE
nGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAl
lEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThECh
AllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThE
ChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGE
-----END RSA PRIVATE KEY-----

closed
```

Make sure to save the key as we'll be needing it for the next level.
