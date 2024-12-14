# Basic Usage

  

In order to use [John the Ripper](https://slavetomints.github.io/guides/guides/vocabulary.html#john-the-ripper), you first need to have it installed. If you do not have it installed yet, please checkout the [installation guide](https://slavetomints.github.io/guides/guides/password-cracking/john-the-ripper/installation/installation.html).

For the most basic usage of John the Ripper, all you need is a file full of hashed passwords, which we'll call `hashes.txt`. The contents of `hashes.txt` should look something similar to this:

```

┌─[slavetomints@parrot]─[~]
└──╼ $cat hashes.txt

joe:d8578edf8458ce06fbc5bb76a58c5ca4

john:e10adc3949ba59abbe56e057f20f883e

admin:5f4dcc3b5aa765d61d8327deb882cf99

jane:9686c6f3173c9d463fe3a78da4f3616c

superuser:0d107d09f5bbe40cade3de5c71e9e9b7

```

Now you can call `john hashes.txt` on the command line and watch the fireworks! Truly a [Master H4X0r](https://www.reddit.com/r/masterhacker/) .

```

  

┌─[slavetomints@parrot]─[~]
└──╼ $john hashes.txt
Warning: detected hash type "LM", but the string is also recognized as "dynamic=md5($p)"
Use the "--format=dynamic=md5($p)" option to force loading these as that type instead
Warning: detected hash type "LM", but the string is also recognized as "HAVAL-128-4"
Use the "--format=HAVAL-128-4" option to force loading these as that type instead
Warning: detected hash type "LM", but the string is also recognized as "MD2"
Use the "--format=MD2" option to force loading these as that type instead
Warning: detected hash type "LM", but the string is also recognized as "mdc2"
Use the "--format=mdc2" option to force loading these as that type instead
Warning: detected hash type "LM", but the string is also recognized as "mscash"
Use the "--format=mscash" option to force loading these as that type instead
Warning: detected hash type "LM", but the string is also recognized as "mscash2"
Use the "--format=mscash2" option to force loading these as that type instead
Warning: detected hash type "LM", but the string is also recognized as "NT"
Use the "--format=NT" option to force loading these as that type instead
Warning: detected hash type "LM", but the string is also recognized as "Raw-MD4"
Use the "--format=Raw-MD4" option to force loading these as that type instead
Warning: detected hash type "LM", but the string is also recognized as "Raw-MD5"
Use the "--format=Raw-MD5" option to force loading these as that type instead
Warning: detected hash type "LM", but the string is also recognized as "Raw-MD5u"
Use the "--format=Raw-MD5u" option to force loading these as that type instead
Warning: detected hash type "LM", but the string is also recognized as "Raw-SHA1-AxCrypt"
Use the "--format=Raw-SHA1-AxCrypt" option to force loading these as that type instead
Warning: detected hash type "LM", but the string is also recognized as "ripemd-128"
Use the "--format=ripemd-128" option to force loading these as that type instead
Warning: detected hash type "LM", but the string is also recognized as "Snefru-128"
Use the "--format=Snefru-128" option to force loading these as that type instead
Warning: detected hash type "LM", but the string is also recognized as "ZipMonster"
Use the "--format=ZipMonster" option to force loading these as that type instead
Using default input encoding: UTF-8
Using default target encoding: CP850
Loaded 10 password hashes with no different salts (LM [DES 256/256 AVX2])
Warning: poor OpenMP scalability for this hash type, consider --fork=4
Will run 4 OpenMP threads
Proceeding with single, rules:Single
Press 'q' or Ctrl-C to abort, almost any other key for status
Almost done: Processing the remaining buffered candidate passwords, if any.
Warning: Only 517 candidates buffered for the current salt, minimum 1024 needed for performance.
Proceeding with wordlist:/usr/share/john/password.lst
Proceeding with incremental:LM_ASCII
```

Well, maybe not. See, you cant just throw passwords at john. While it might work for super super common passwords and small passwords, it wont work for much else. So we need to upgrade our command. The first thing we'll introduce is the `--format=` flag.

## ----format

This flag allows you to specify the format of the hashes at hand. John will try its best to figure it for you but like in the example above, it can also mimic kernel panic. If you don't know what format the hashes are in, that's okay! We can use `hashid` to do that. If you don't know how to use that tool, check out [this guide](https://slavetomints.github.io/guides/guides/password-cracking/hashid.html) where we go over it.

So, now that we know the format of the hashes, its important to use the correct syntax for it. If we have an [MD5](https://slavetomints.github.io/guides/guides/vocabulary.html#md5) hash, we need to specify `--format=Raw-MD5` instead of simply using `--format=md5`. You can find all the formats using the command `john --list=formats`

## ----wordlist

So lets say you want to use a specific curated wordlist for your attack. How do you specify it? This is where the `--wordlist` flag is helpful. If your wordlist such as `rockyou.txt` is in `/usr/share/wordlists/` you'll have to append `--wordlist=/usr/share/wordlist/your-wordlist-here` But let's say your have a file in your current directory that you want to use. Do you need to spell out the whole path? Thankfully no, all you need to do is call it relative to where you are.

## Putting it together

Now that we know all about the basic usage of `John the Ripper`, lets take another crack at those passwords from earlier. We know now that the format of the passwords is just simply raw MD5, and that they're likely in `rockyou.txt` due to their simplicity and its extensive collection.

```

┌─[slavetomints@parrot]─[~]
└──╼ $john hashes.txt --wordlist=/usr/share/wordlists/rockyou.txt --format=Raw-MD5
Using default input encoding: UTF-8
Loaded 5 password hashes with no different salts (Raw-MD5 [MD5 256/256 AVX2 8x3])
Warning: no OpenMP support for this hash type, consider --fork=4
Press 'q' or Ctrl-C to abort, almost any other key for status
123456 (john)
password (admin)
qwerty (joe)
letmein (superuser)
4g 0:00:00:00 DONE (2024-12-13 18:35) 4.301g/s 15422Kp/s 15422Kc/s 15424KC/s fuckyooh21..*7¡Vamos!
Use the "--show --format=Raw-MD5" options to display all of the cracked passwords reliably
Session completed.
```

## On your own

Try out the following hashes on your own!

098f6bcd4621d373cade4e832627b4f6
e99a18c428cb38d5f260853678922e03
5f4dcc3b5aa765d61d8327deb882cf99
25d55ad283aa400af464c76d713c07ad
d8578edf8458ce06fbc5bb8e8c1efb3da
7c6a180b36896a0a8c02787eeafb0e4c
827ccb0eea8a706c4c34a16891f84e7b
6cb75f652a9b52798eb6cf2201057c73
2bb80d537b1da3e38bd30361aa855686
e10adc3949ba59abbe56e057f20f883e
f3e9d2b2783fc3c139b24165c68db512d98039c578fc7d07810a0ac420b8b8f9
0e7d207a7cc65d66d9675e631a1fc0a48bafbb680e5d3f05d22fe741addfa342
9b6d62c8b3802c63d1b1b46b18c5b5e7b8a9c0a79d17ec6da82e0cdad6d73ac5
9d8e2baf35f824703bdefddf58661b3c2e8d81f7b7fcf7b20247abf59c9f4591
55b4ed8d0c57b3bc31acb17760bb3e28de9f57c94107a755f51e795f5d93f0de
d2d2d2db073da5d3f81f67f17a121db9fbd79e96cd4d77794f155c6e2e189287
e20faed53b091946c9734e60d9c7300c68f062b9998d34a79d983e890de2fd13
bc4c51fd4c1cb0e3e91107e5f29a484f216be3ebd3bc61898e19c209a28292ea
fb8e45b2e35b8f87722ac4185cd6b993c8a19a4c524edc8a4f66a1192e6475b0
7d35d148e4d5fa93b40b968dc982be357fdbcf1db3196d9a6a21a2a28927ba3c
7efbd4e72a06b3c9ed5c4317ac45e4ff0f2b1e635ed8ae6972a43b42cd31955d
6d58761a207278b146d790e050dbd5002c93bbf93a23adf9debf547fbebc1d8e
5c4d1a86580d63d94ae3f47343b687b0851b60442d49a69ff9f1f8ed0c5a541f
7f7a32746be83aef83534b7b50636a59cc72e2d577e4c13f03cf1c9a3945b763
46b89d5a80b2c2c6208c3d6e8c50a9fa2f902de279d4d25be746320d4fd7a3be
f84231e04e8e8a7a070e424520ff6b0d3a54bdb06d85dbbfed5c74246ac5b3ea
65a42c08d8d5b289230b374f82b16b87e697f0b7c4c0b515b0f6a16c80f9b71f
35b27c69ca9284e4e0de0c98d79bb4c95f68e60a4f7742a3a3ed9c060e3a4694
2d973e18cd07e1a0721c9942e50f544de1115cfc4a4b9b8e04607d7204d6d8ba
a842a81a9b961003503a2e28f89e798f7b72c7f1bbf07a6e0b3be6b7fe42d04b
$2y$12$L5Qb8mVRVoI8Tz4.hIpCo.oXqg.k3LJ1gs3gqFtaHn3D7X4B8cH2S
$2y$12$gVXZnxEkKhjRAx68PQej.01yGpDOxDbdNfgqj93ssEq3ZWKmygFQy
$2y$12$Xbeqv2MZ59Oyl0Y0qg2Opu9gnwC5hbHE3tDRpwpbzg0Xecv5A3VTe
$2y$12$OShQvHSlNKl9v/PO4PKMeiVoUReygJXYQIcdeXtGTRmjczWhX7c.e
$2y$12$Ewl70/Jx5ZkHpnzVvqPvzOt1u2d2vDAwYO5zqhtKpnYl.lj6prvAm
$2y$12$FmFg9bAwNhZHvWdrdpxgoq9a2gX2JOGIRHdoa9lIS2jN0ThwYo9je
$2y$12$9GtnzEz3fKxOXcw4Qdydne8AejJ0kmBQ2T0uZDbScdVRXk2ZixV1q
$2y$12$4W.9YYtbXxL0XWv1VOZGz/ZkgYWGxIgexnBPLopIV0C5p2b45RnoS
$2y$12$MZYD8Jd39lMEwXgk2zoFhvoTfX5ShZIFz.ajI6iMeG4osVsF9O/ri
$2y$12$FLrgy6e0Fz0AWf5MrDA2cePiay8l0eLHLGbXMKMHH7h2jMOGaWv5K
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTgzODk2MzkyNF19
-->