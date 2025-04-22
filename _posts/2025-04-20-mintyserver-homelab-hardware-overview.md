---
title: Homelab Hardware Overview
date: 2025-04-20 11:45:00 +/-0600
categories: [mintyserver.lab, Building the Lab]
tags: [homelab, hardware]
description: Review of the hardware for my homelab
---

What good is a homelab without the actual lab? Let's take a look at the hardware that is running in the lab as of writing this:

## Servers
### Acer Aspire A515-54G
While many people might use a laptop for their regular daily work, I've decided to use an old laptop I have to run the Plex media server for this lab. A quick look at the specs reveals why:

```terminal
CPU: Intel i5-8265U (8) @ 3.9GHz
GPU: NVIDIA GeForce MX250
GPU: Intel WhiskeyLake-U GT2 [UHD Graphics 620]
Memory: 1.605 GiB / 7.603 GiB (21%)
```
> These specs were generated with `hyfetch`. You can check out the project [here](https://github.com/hykilpikonna/hyfetch)
{: .prompt-tip }

While yes, the RAM is lacking, and will be a bottle neck for the server, the NVIDIA GPU is extremely excited since it will allow for me to utilize a pretty decent graphics card for transcoding media on the fly.

You may be asking why I've decided to use a laptop rather than just simply getting another computer. Mostly its for cost reasons, as I'm trying to keep the costs of this server pretty low. Also, the keyboard on the laptop doesn't work all too well, so it's a good way to find a use for it without needing to suffer through typing on it.

### HP Prodesk 600 G3 SFF
So these are going to be the meat and potatoes of the server. I have 5 of these and they will each be a different node in a `proxmox` cluster. Right now each node has an Intel Core i5, 8GB of DDR4, and 500 GB HDD. The lovely thing about this is that almost all of it is upgradeable, so in the future we could upgrade the RAM for instance to 64 GB DDR4. 

Now, why did I pick these computers? A pretty simple reason actually, I was able to get all 5 of them for under $50 through government surplus auctions. They work well and I'm very happy with them.
> Looking for cheap yet still usable computers? Check out your local government surplus auctions too see if they're selling any. [GovDeals](https://www.govdeals.com/) is a pretty reputable site to get items from, but be warned, many auctions require you to pick up your items in-person, so you can't order and have it shipped to you.
{: .prompt-tip }

## Networking
### TL-SG1024D Switch
So for our switch we got the TL-SG1024D from tp-link, it had 24 ports that all run Gigabit connections, plus its rack mountable. That leaves us with able to fully take advantage of fast networking speeds, while leaving plenty of room for expansion in the future if we needed to add on more devices.

### CAT-6 Ethernet
So in the homelab we're going to be using CAT-6 Ethernet cables rather than CAT-5 or CAT-5e. If you need a reference as to the differences between different Ethernet categories this chart should be helpful. 
![ethernet categories](https://telecom.samm.com/Data/EditorFiles/images/blog/015-what-is-the-ethernet/history-of-ethernet-lan-cables-categories.png)

Now, I could sit here and say that the reason I'm using CAT-6 is for the extra speed over CAT-5, or the fact that CAT-6 enforces better shielding to prevent cross-talk as compared to CAT-5e, but in reality its because I was able to get them for the cheapest, and they fully utilize my switch's capabilities

## UPS
Where I live, you can expect to loose power a couple times a year due to weather, and even though power loss usually doesn't physically do anything to the computers, the sudden power surge can corrupt data on disks. I'm not necessarily looking to have the server run for hours after an outage, but long enough to where it can safely shutdown. 

We're going to be using an APC UPS (model number BVN900M1), as this one will supply us with 6 battery backup and surge protection ports, one for each node and the switch, and an extra 3 surge protection ports. One for the laptop and two for future devices.

## Rack
Now its time for the final part, the rack that's going to hold everything together. Once again, in the spirit of not spending an arm and a leg but retaining the ability to expand in the future I went with a 20U open frame rack from Tecmojo off of Amazon. I was pretty impressed with the quality of the rack, and with 20U i have 3U to play with in the future once all's said and done.
