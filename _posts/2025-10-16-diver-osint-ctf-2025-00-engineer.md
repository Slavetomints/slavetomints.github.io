---
title: 00_engineer
date: 2025-10-16
categories:
  - Capture The Flags
  - Diver OSINT CTF 2025
tags:
  - ctf
  - diver osint ctf 2025
  - osint
  - writeups
description: Diver OSINT CTF 2025 00_engineer Challenge
image:
  path: /assets/img/diver25/engineer/engineer.jpg
  alt: a picture of an access badge for a conference
  post: false
---


> Challenge description:
>
>An software engineer's nameplate was picked up near Tokyo Station. This should be a lost item.
Answer the URL of the website (index page) of the company where this engineer works.
Flag Format: Diver25{https://google.com}
{: .prompt-info }

Okay, so lets take a look at the photo that's provided:

![a picture of an access badge for a conference](/assets/img/diver25/engineer/engineer.jpg)

Hmm, well this looks like a classic lanyard and badge for a conference. I bet the name on the badge is actually the person's username on sites like GitHub. Checking there does in fact reveal a GitHub account for one `kodai-sn`.

![the github acount](/assets/img/diver25/engineer/github.png)

Even better, it looks like there a repository named `kodai-sn.github.io`. That's a special repository on GitHub. If you create a website using GitHub pages, it shows up at `username.github.io/repository-name`. However, if the name of the repository is just `username.github.io`, it uses the base URL for the site, making it a good place for a personal website. This blog is served off of [`Slavetomints/slavetomints.github.io`](https://github.com/slavetomints/slavetomints.github.io), and simply uses a custom domain. If you went to [https://slavetomints.github.io](https://slavetomints.github.io) you would also appear here. Neat right?

Anyways, lets check out the website there.

![the personal website](/assets/img/diver25/engineer/personal-website.png)

The part I'm most interested in is the Career section, where they say they've been working for `Magneight Software`. This is probably the company who's website we have to find.

A quick lookup later reveals `magneight.com` to us, and with it the solution

![the company website](/assets/img/diver25/engineer/company-website.png)

FLAG: `Diver25{https://magneight.com/}`