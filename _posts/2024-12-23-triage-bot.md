---
title: Triage Bot
date: 2024-12-23 19:47:00 +/-0600
categories: [Capture The Flags, 1337Up Live 2024]
tags: [ctf, 1337up, misc, writeups]
---

Challenge description:

> Check out our new and improved Triage Bot! 
>
> https://go.intigriti.com/discord 

I tackled this one with a friend who's much more adept at Discord than me. But, if you ran `!news` in the bot channel it displayed a number of commands and their descriptions. One that stood out was `!read_report`

![output of !news](/assets/img/1337up-2024/triage-bot/image0.png)

![output of !read_report](/assets/img/1337up-2024/triage-bot/image1.png)

Hm, you need to have a `triage` role, but I can't get that. So my friend added the bot to a throwaway Discord server and gave me the role of `triage`, and then I reran the command. It gave us a random CVE, which you could add a number to the end of the command to specify which one, so I tried running `!read_report 0`

![flag obtained](/assets/img/1337up-2024/triage-bot/image2.png)

FLAG: `INTIGRITI{4n07h3r_y34r_4n07h3r_7r1463_b07}`
