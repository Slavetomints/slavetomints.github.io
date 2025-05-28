---
title: Screenshot
date: 2025-05-27
categories: [Capture The Flags, NahamCon CTF 2025]
tags: [ctf, nahamcon ctf 2025, misc, writeups]
description: NahamCon CTF 2025 Screenshot Challenge
---


> Challenge description:
> 
> Oh shoot! I accidentally took a screenshot just as I accidentally opened the dump of a `flag.zip` file in a text editor! Whoopsies, what a crazy accidental accident that just accidented!  
>   
> Well anyway, I think I remember the password was just **`password`**!
{: .prompt-info }

Alrighty! Let's take a look at the provided screenshot.

![Screenshot.png](/assets/img/nahamcon-ctf-2025/screenshot/Screenshot.png)

While there is probably an easy way to do this, Let's try using `hexedit` to make our `flag.zip` file.

First let's use `touch` to create `flag.zip`, then open it using `hexedit`.

Specify the name for the file we want to edit:

![hexedit](/assets/img/nahamcon-ctf-2025/screenshot/image0.png)

And now we see that we have an empty file, so let's start adding things in from the provided screenshot, making sure to enter the hex in correctly.

![hexedit](/assets/img/nahamcon-ctf-2025/screenshot/image1.png)

Once, we're all done, it should look like this:

![hexedit](/assets/img/nahamcon-ctf-2025/screenshot/image2.png)

`CTR+X` to exit, save changes, and then test the type using the `file` command:

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $file flag.zip
flag.zip: Zip archive data, at least v5.1 to extract, compression method=AES Encrypted
```

Hm, since it's v5.1 my implementation of `unzip` might struggle with it, we can try anyways for the whimsies though:

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $unzip flag.zip 
Archive:  flag.zip
   skipping: flag.txt                need PK compat. v5.1 (can do v4.6)
```

Yep just as expected, so lets just use `7zip` instead, with the `e` option to specify that we want to extract.

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $7z e flag.zip 

7-Zip [64] 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21
p7zip Version 16.02 (REDACTED)

Scanning the drive for archives:
1 file, 239 bytes (1 KiB)

Extracting archive: flag.zip
--
Path = flag.zip
Type = zip
Physical Size = 239

    
Enter password (will not be echoed):
ERROR: CRC Failed in encrypted file. Wrong password? : flag.txt
               
Sub items Errors: 1

Archives with Errors: 1

Sub items Errors: 1
```
Hm, looks like there was an error, I wonder if the flag works still

```terminal
┌──[slavetomints@parrot]─[~]
└──╼ $cat flag.txt
flag{907e5bb257cd8fc818e88a13622f3d46}
```

It worked!

FLAG: `flag{907e5bb257cd8fc818e88a13622f3d46}`
