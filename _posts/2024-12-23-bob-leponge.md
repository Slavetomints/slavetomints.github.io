---
title: Bob L'éponge
date: 2024-12-23 19:47:00 +/-0600
categories: [Capture The Flags, 1337UP Live 2024]
tags: [ctf, 1337up, osint, writeups]
description: 1337UP Live 2024 Bob L'éponge Challenge
---

> Challenge description:
>
> I'm an epic hacker and I'm trying to start a YouTube channel to show off my skills! I've been playing around with some of the video settings and stumbled upon a few cool features. Can you find the secret I've hidden?
> https://youtu.be/DXZrAGYS6X8 
{: .prompt-info }

Alright, so we're given a youtube video titled `test`. Now, this video is actually a red herring. I know, crazy right? A red herring in a CTF. If we go to the youtube channel we'll see that they have a YT Short named `test3`, so we can safely assume that there's a `test2` hidden somewhere, and upon further investigation it seems to be the case. They channel has a playlist with 1 unlisted video named `test2`

![playlist](/assets/img/1337up-2024/bob-leponge/image1.png)

A great tool for video forensics is [https://mattw.io/youtube-metadata/](https://mattw.io/youtube-metadata/), and plugging the video link into there reveals many things about the videos metadata, including a flag in the tags.

![the flag in the metadata](/assets/img/1337up-2024/bob-leponge/image2.png)

FLAG: `INTIGRITI{t4gs_4r3_m0stly_0bs0l3t3_zM1H7RH6psw}`
