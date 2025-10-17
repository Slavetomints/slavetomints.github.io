---
title: Broken Access Control
date: 2024-12-08 19:47:00 -0600
categories: [Capture The Flags, Mountain West Cyber Challenge]
tags: [ctf, mountain west cyber challenge, web, writeups]
description: Mountain West Cyber Challenge Broken Access Control Challenge
image:
  path: /assets/img/mwcc-2024/broken-access-control/image1.png
  alt: login page
  post: false
---

> Challenge description:
>
> You are John, a student at the school. There is a flag hidden somewhere in the website. You might need to gain access to admin privileges for the information you seek. Here are your credentials for the website: username: John password: johndoe123 
{: prompt-info }

![the login page](/assets/img/mwcc-2024/broken-access-control/image0.png)

Hm, lets try something before we log in. In the browser we can see that we're at `https://dockeridgohere.challenge.hackazon.org/login`, what if we went to `https://doesanyonereadthese.challenge.hackazon.org/admin`.

![holy shit](/assets/img/mwcc-2024/broken-access-control/image1.png)

Holy shit that actually worked.

FLAG: `CTF{5468697365626f6f6b6973666f727468}`