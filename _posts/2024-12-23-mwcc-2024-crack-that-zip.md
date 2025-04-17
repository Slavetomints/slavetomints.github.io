---
title: Crack That Zip
date: 2024-12-23 19:47:00 -0600
categories: [Capture The Flags, Mountain West Cyber Challenge]
tags: [ctf, mountain west cyber challenge, password cracking, writeups]
description: Mountain West Cyber Challenge Crack That Zip Challenge
---

> Challenge description:
>
> Can you decrypt this zip file? The password should occur in standard wordlists such as "rockyou".
> Flag format: CTF{32-hex} 
{: .prompt-info }

Given that the password is in `rockyou.txt` this should be pretty easy. We have a zip file that is password protected, so lets extract the hash from the file.

```terminal

┌─[slavetomints@parrot]─[~/ctfs/mwcc/pass]
└──╼ $zip2john challenge.zip > hash.txt 
ver 2.0 efh 5455 efh 7875 challenge.zip/input.txt PKZIP Encr: TS_chk, cmplen=132, decmplen=140, crc=DF7C40D5 ts=88E4 cs=88e4 type=8

```

Lets verify that the command worked

```terminal

┌─[slavetomints@parrot]─[~/ctfs/mwcc/pass]
└──╼ $cat hash.txt 
challenge.zip/input.txt:$pkzip$1*1*2*0*84*8c*df7c40d5*0*43*8*84*88e4*24413e2fce7f1526f78a0334ec84517c97fa4968ef7b9c06b84bf81bd9ca47f30e4ae788f36e22ca2b6c34af270fff123cd06e1c490d0f6763ad00a630c26870871814e4a74cd7c37f9a02a3ee1281a3363d7f98686fc241829fe845e45dbce000fc878f32ec3089856c830f38195c451f5391ad5b78a074ad497b904a048e2f6bdc833a*$/pkzip$:input.txt:challenge.zip::challenge.zip

```

ALright, now that we have the hash from the pdf, lets dump it into `John the Ripper` to get the password from it. We're going to use `rockyou.txt`, from the infamous rockyou.com breach.

```terminal

┌─[slavetomints@parrot]─[~/ctfs/mwcc/pass]
└──╼ $john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Will run 4 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
budweiser        (challenge.zip/input.txt)     
1g 0:00:00:00 DONE (2024-12-08 20:02) 33.33g/s 273066p/s 273066c/s 273066C/s 123456..whitetiger
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 

```

Now, armed with the password, lets inflate the zip and see what we can get.

```terminal

┌─[slavetomints@parrot]─[~/ctfs/mwcc/pass]
└──╼ $unzip challenge.zip 
Archive:  challenge.zip
[challenge.zip] input.txt password: 
  inflating: input.txt               
┌─[slavetomints@parrot]─[~/ctfs/mwcc/pass]
└──╼ $cat input.txt 
If you can read this you managed to crack the password of the zip file.

Here is a nice flag for you:
CTF{1aa4c84b1ff9f21ce476ff50c7d0fe74}

```

FLAG: `CTF{1aa4c84b1ff9f21ce476ff50c7d0fe74}`
