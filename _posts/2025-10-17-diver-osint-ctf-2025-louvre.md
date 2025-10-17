---
title: louvre
date: 2025-10-17
categories: [Capture The Flags, Diver OSINT CTF 2025]
tags: [ctf, diver osint ctf 2025, osint, writeups]
description: Diver OSINT CTF 2025 louvre Challenge
image:
  path: /assets/img/diver25/louvre/wigle.png
  alt: list of mac addresses for the SSID Louvre_Wifi_Gratuit
  post: false
---


> Challenge description:
>
>Answer the vendor of one of the Louvre's public Wi-Fi access points that meets the following criteria.
>
> - Information was collected on 28 February 2025. This can be accessed via online.
> - Determine the vendor according to the BSSID.
>
> Flag format: Diver25{Company Name} (e.g. If the company is Apple Inc., the flag should be Diver25{Apple Inc.}.)
{: .prompt-info }

Alrighty, first order of business is figuring out what the public Wi-Fi is for the Louvre. Thankfully, they make that easy for us on their website

>The ‘Louvre_Wifi_Gratuit’ network is available under the Pyramid and in the exhibition rooms. The free Wi-Fi connection last one hour and can be renewed as many times as needed.
>
>\- [Do you offer Wi-Fi? - Louvre Website](https://contact.louvre.fr/hc/en-gb/articles/12853523479453-Do-you-offer-WiFi)

Okay okay okay, noow with that out of the way, its time to figure out what the vendor is. The reason we figured out the SSID (name) for the Wi-Fi network is that there are public databases of Wireless Networks. We will be using a site called [wigle.net](https://wigle.net). In order to access the site you need to have an account, but let's see what our search reveals.

![search results](/assets/img/diver25/louvre/wigle.png)

Now, for those of you who don't know, the things on the left most column are whats called MAC addresses. Every single Network Interface Card (NIIC) has one. Every single one is unique, and it consists of two parts. The entire address is 6 pairs of Hexadecimal digits. The first three pairs identify the manufacturer of the device, and the last three pairs identify the unique device.

Thankfully, we can also look that up as well. However, we have two to search for, both `48:C0:93` and `50:60:28`. For this you can use any site of your liking, but I'll use [maclookup.app](https://maclookup.app) this time. Let's see the results for the first one now:

![first mac](/assets/img/diver25/louvre/1-mac.png)

And the second one:

![second mac](/assets/img/diver25/louvre/2-mac.png)

Well wouldya look at that, both MACs are the same vendor, so lets get that flag turned i n!

FLAG: `Diver25{Xirrus, Inc.}`