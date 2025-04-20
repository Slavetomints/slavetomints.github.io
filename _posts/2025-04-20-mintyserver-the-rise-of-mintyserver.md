---
title: The Rise of mintyserver.lab
date: 2025-04-20 01:45:00
categories: [mintyserver.lab]
tags: [homelab, blog]
description: The beginning of my homelab
---
## Why Do You Need a Homelab?
Something that I have learned from getting into cybersecurity is that you need to be constantly learning and improving upon your skills, or else you run the risk of falling out of practice. 

But it can be really hard sometimes to test new skills. Like, what if I want to work on exploiting a web server? You can't just find someone's web server on the internet and break in to it, that's illegal. So the alternative is a homelab.

A homelab can be as small as a single mini pc you use to run some virtual machines off of, to as large as an enterprise grade setup (check out [r/homelab](https://www.reddit.com/r/homelab/top/?t=all) for some examples). 

With a homelab, you can spin up a web server of your own, an attacker machine, and hammer away all you want with no worries about doing something illegal (provided that you own everything and are keeping it all in the lab). It's very commonly used by security researchers to try and poke holes in different OS's or services without breaking something on the open internet.

Also, homelabs can be used for home automation and security. You can use [Home Assistant](https://www.home-assistant.io/) to help make your house the smartest on the block, or you can go all in on a [Ubiquiti security camera](https://ui.com/us/en/camera-security) setup and sleep peacefully at night.


## So What Am I Going To Do?

For me, I'll try to find somewhere in the middle. I don't want to spend thousands of dollars (yet) on something that only I will use, but I also want something that's not frustrating to work with. At the time I'm writing this, I already have the hardware that I'll be using for the foreseeable future, and I'll be writing another post about that here soon. But let's go over some of the basic things that I am going to want on my homelab.

### My Requirements
- Plex Media Server
	- Tautulli (Plex Monitoring Service)
- DNS Server
- Pi-hole
- Cyber Lab
	- Attack Machine
	- Defending Machines

## Early Planning
So now that I have the basic needs for my server, let's go over some more specific things I'm planning

### Plex Server
This is going to be the biggest one, as it is probably going to be the most used feature of the homelab, not only by myself but by others. Right now, it’s running on regular old Ubuntu 24.04 LTS on an old laptop. The big change is that I’ll be moving it to a Debian server instead. Why, you may ask? Well, here are some reasons:
- The stability that comes with Debian
- Removing any sort of reliance on snap
	- (If you want a future post as to why, be sure to let me know in the comments!)
- Better use of system resources

Taking a peek at the specs for the laptop, we see what we're working with.
```terminal
CPU: Intel i5-8265U (8) @ 3.9GHz
GPU: NVIDIA GeForce MX250
GPU: Intel WhiskeyLake-U GT2 [UHD Graphics 620]
Memory: 1.605 GiB / 7.603 GiB (21%)
```
> These specs were generated with `hyfetch`. You can check out the project [here](https://github.com/hykilpikonna/hyfetch)
{: .prompt-tip }

So yes, you will eventually get to see me fight the NVIDIA on Linux fight, but I remain hopeful that if we get that set up, then the Plex server will run much smoother than it currently does.

### Everything Else
For the rest of the server, I am planning on using `Proxmox` as my hypervisor, mostly because it is free, but also because I can eventually cluster multiple Proxmox nodes together (if I add more hardware) and manage them all in one place. We'll dive deeper into this as we get to these stages of the homelab 


## Why The Name `mintyserver.lab`?
Well, my name is `Slavetomints`, and having a custom TLD just makes everything more fun and personal (I thought `mintyserver.mint` was too on the nose.)

## Final Thoughts
I will be posting server updates, tutorials and how-to guides, and other cool homelab projects under the `mintyserver.lab` category, or at least tagging the posts with `homelab` if they don't necessarily fit into just the homelab topic. 

Thanks for reading, I hope to see you all again soon! 

