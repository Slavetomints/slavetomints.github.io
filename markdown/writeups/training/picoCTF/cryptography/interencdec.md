# Interencdec

Challenge description:

> Can you get the real meaning from this file. Download the file [here](https://artifacts.picoctf.net/c_titan/1/enc_flag).

Alrighty, lets download the file and see what we get.

```

┌─[slavetomints@parrot]─[~]
└──╼ $wget https://artifacts.picoctf.net/c_titan/1/enc_flag
--2024-12-18 02:59:49--  https://artifacts.picoctf.net/c_titan/1/enc_flag
Resolving artifacts.picoctf.net (artifacts.picoctf.net)... 18.160.102.10, 18.160.102.59, 18.160.102.92, ...
Connecting to artifacts.picoctf.net (artifacts.picoctf.net)|18.160.102.10|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 73 [application/octet-stream]
Saving to: ‘enc_flag’

enc_flag                                        100%[=====================================================================================================>]      73  --.-KB/s    in 0s      

2024-12-18 02:59:50 (63.8 MB/s) - ‘enc_flag’ saved [73/73]

┌─[slavetomints@parrot]─[~]
└──╼ $ls
enc_flag
┌─[slavetomints@parrot]─[~]
└──╼ $cat enc_flag 
YidkM0JxZGtwQlRYdHFhR3g2YUhsZmF6TnFlVGwzWVROclgyeG9OakJzTURCcGZRPT0nCg==

```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwNTY5ODYxNDVdfQ==
-->