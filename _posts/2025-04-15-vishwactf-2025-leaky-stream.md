---
title: Leaky Stream
date: 2025-04-15 23:25:20 +/-0600
categories: [Capture The Flags, VishwaCTF 2025]
tags: [ctf, vishwactf, forensics, writeups]
description: VishwaCTF 2025 Leaky Stream Challenge
---


> Challenge description:
> 
> In the middle of our conversation, some packets went amiss. We managed to resend a few but they were slightly altered.
> Help me reconstruct the message and I'll reward you with something useful ;)
{: .prompt-info }

Hm, looks like a challenge that is going to test my network forensics skills. I really do hope that this challenge isn't easy to figure out any other way.

## The Janky Solution
So assuming that the flag is simply hidden in some packets, its is possible to use the `strings` command in order to display all the printable strings tin the .pcap file. And if we know the flag format, it is also super easy for us to use `grep` in order to find the flag.

> Note to CTF devs: I understand that creating enough challenges for a full weekend of fun is hard, and I also totally understand the need to have nice easy challenges. However, if I can solve a network analysis challenge using nothing but grep and strings, it kinda defeats the purpose of it being a network analysis challenge. Please test for this when designing challenges.
{: .prompt-warning }

```terminal
┌─[slavetomints@parrot]─[~/]
└──╼ $strings chitty-chat.pcapng | grep VishwaCTF{
VishwaCTF{this_is_first_part
```

And assuming that the second part of the flag is going to mention it's the second part, we can adjust our search to find that

```terminal
┌─[slavetomints@parrot]─[~/]
└──╼ $strings chitty-chat.pcapng | grep part
_this_second_part}
VishwaCTF{this_is_first_part
```

## The Actual Solution Method
Alright, you didn't come here to be scammed out of an actual writeup did you? If you did then go find another hobby. Let's dive into this one.

### What is a pcap?
A pcap is a packet capture file. Tools like `Wireshark` and `tshark` listen to packets as they go around the network and "capture" them, writing them to this file. It's very useful since it allows you to see exactly what goes where when in your network, and thus is a very detailed map of that snapshot of network history. 

### Features of Wireshark
Now, with `Wireshark` being one of the most popular packet analyzers out there, its no surprise that there is a way to add comments to packets. Usually used for purposes of forensic analysis to keep track of whats going on, but you can hide flags in them too... right? 

A nice way to see every frame with a comment is to apply the `frame.comment` display filter. Doing that will give us two packets, and each has one half of the flag
![The packet comments](/assets/img/vishwactf-2025/leaky-stream/packets.png)

FLAG: `VishwaCTF{this_is_first_part_this_second_part}`
