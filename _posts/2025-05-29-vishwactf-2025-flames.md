---
title: Flames
date: 2025-05-29
categories: [Capture The Flags, VishwaCTF 2025]
tags: [ctf, vishwactf, web, writeups]
description: VishwaCTF 2025 Flames Challenge
---

> Challenge description:
>  
>  Find Your True Love <3
{: .prompt-info }

Alrighty, so we have a web application to poke at, let's see what we have.

![home page](/assets/img/vishwactf-2025/flames/image0.png)

Looks like a love calculator that takes in two names and "determines" how compatible the two are. Let's see how it holds up against SQL injection.

![the payload](/assets/img/vishwactf-2025/flames/image1.png)

With this payload, all I am attempting to do is establish the version of SQL that is being used. Not trying to exfiltrate any user data at this point.

![the response](/assets/img/vishwactf-2025/flames/image2.png)

Hm, it looks like it might not have worked. Either that or the names of our two lovebirds just got thrown into the database, so let's check out the `Famous Love Stories` to see if anything happened there.

![the flag??](/assets/img/vishwactf-2025/flames/image3.png)

Huh, they probably just used a regex for SQL-like statements? This is a confusing challenge, albiet an easy one. 

FLAG: `VishwaCTF{SQL_1nj3ct10n_C4n_Qu3ry_Your_He4rt}`
