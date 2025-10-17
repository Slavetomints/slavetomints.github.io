---
title: hidden_service
date: 2025-10-15
categories:
  - Capture The Flags
  - Diver OSINT CTF 2025
tags:
  - ctf
  - diver osint ctf 2025
  - osint
  - writeups
description: Diver OSINT CTF 2025 hidden_service Challenge
image: 
  path: /assets/img/diver25/hidden-service/hidden_service.jpg
  alt: crumpled paper showing .onion link
  post: false
---


> Challenge description:
>
>See the attached file and capture the flag!
{: .prompt-info }

Okay, let's take a look at this file now:

![crumpled paper showing a .onion link](/assets/img/diver25/hidden-service/hidden_service.jpg)

Okay! This one should hopefully be easy. All we see is a URL, but this one is special

Let's quickly break down how URL's look using this one: `https://example.com`

The `https` part, that is the part before the `://` specifies the protocol to use. After that part is the domain name, which is `onion` in our case. And finally, we have the Top Level Domain, or TLD. That's the `.com` part at the end.

This link, however, has a `.onion` TLD, which is a special TLD I'll let Wikipedia do the talking here:

> .onion is a special-use top-level domain name designating an anonymous onion service, which was formerly known as a "hidden service", reachable via the Tor network. Such addresses are not actual DNS names, and the .onion TLD is not in the Internet DNS root, but with the appropriate proxy software installed, Internet programs such as web browsers can access sites with .onion addresses by sending the request through the Tor network.
{: .prompt-info}

We can access the site using Tor, which is a browser that connects to the Tor network. and when we do, our flag is there.

![the flag](/assets/img/diver25/hidden-service/flag.png)
*While true that many "Dark Web" sites use Tor to remain anonymous, the mere fact of using Tor doesn't make you a criminal. Journalists and privacy enthusiasts also use it for its privacy features.*

FLAG: `Diver25{w3lc0m3_70_d4rkw3b!}`