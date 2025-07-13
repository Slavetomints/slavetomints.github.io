---
title: Obedient Cat
date: 2025-07-08
categories: [Capture The Flags, picoCTF]
tags: [ctf, picoctf, misc, writeups]
description: picoCTF Obedient Cat Challenge
---


> Challenge description:
>
>This file has a flag in plain sight (aka "in-the-clear").
{: .prompt-info }

For this challenge, all you have to do is download the file and look inside it for the flag.

```terminal
~/training/picoCTF/obedient-cat
❯ wget https://mercury.picoctf.net/static/fb851c1858cc762bd4eed569013d7f00/flag
--2025-07-08 17:38:50--  https://mercury.picoctf.net/static/fb851c1858cc762bd4eed569013d7f00/flag
Loaded CA certificate '/etc/ssl/certs/ca-certificates.crt'
Resolving mercury.picoctf.net (mercury.picoctf.net)... 18.189.209.142
Connecting to mercury.picoctf.net (mercury.picoctf.net)|18.189.209.142|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 34 [application/octet-stream]
Saving to: ‘flag’

flag                      100%[====================================>]      34  --.-KB/s    in 0s

2025-07-08 17:38:50 (98.9 MB/s) - ‘flag’ saved [34/34]


~/training/picoCTF/obedient-cat
❯ ls
 flag

~/training/picoCTF/obedient-cat
❯ cat flag
picoCTF{s4n1ty_v3r1f13d_28e8376d}
```

FLAG: `picoCTF{s4n1ty_v3r1f13d_28e8376d}`