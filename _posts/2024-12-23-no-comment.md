---
title: No Comment
date: 2024-12-23 19:47:00 +/-0600
categories: [Capture The Flags, 1337UP Live 2024]
tags: [ctf, 1337up, osint, writeups]
description: 1337UP Live 2024 No Comment Challenge
---

>Challenge description:
>
> Or is there? 🤔
{: .prompt-info }

We get this... psychedelic image

![ripple.jpg](/assets/img/1337up-2024/no-comment/ripple.jpg)

With a description about as obvious as a script kiddie on social media, we know that we are looking for a comment somewhere. So, lets use exiftool. Exiftool is an amazing digital forensics tool that can be used both on the command line and as a Perl library. It's designed to scrape out all avaliable metadata from an image

![exiftool results](/assets/img/1337up-2024/no-comment/image1.png)

We see the image has a comment, but what does it mean? 

Here's the part where I was stumped. I had no idea where to even go with the comment of `/a/pq6TgwS`. CyberChef had nothing, I had nothing, but thankfully while working on another task I noticed the format for images on `Imgur.com` matched perfectly. So armed with this knowledge, I headed to `https://www.imgur.com/a/pq6TgwS` and found:

![imgur results](/assets/img/1337up-2024/no-comment/image2.png)

Finally, something I can work with. Something interesting about Base64 is that if the string isn't long enough it pads the ending with equals signs, so this immediately rose suspicion as we decoded the message (with CyberChef ofc).

![decoded message](/assets/img/1337up-2024/no-comment/image3.png)

Yes... Yes it has. Following the pastebin link surprisingly doesn't lead us to a scam, but rather to a locked paste. Using the password provided earlier `long_strange_trip` reveals a cryptic string of numbers and letters. Checking out the user's profile we can see that they made another paste and this time its about XORing passwords. The article attached is a hint that they might not know to not reuse passwords yet.

![first paste](/assets/img/1337up-2024/no-comment/image4.png)

![second paste](/assets/img/1337up-2024/no-comment/image5.png)

So lets hit up `dcode.fr` the site for all things ciphers, codes, and cryptography, and run a XOR through it with the weird string we got earlier, using the same password as a key. 

![decoded](/assets/img/1337up-2024/no-comment/image6.png)

Bullseye!

FLAG: `INTIGRITI{instagram.com/reel/C7xYShjMcV0}`
