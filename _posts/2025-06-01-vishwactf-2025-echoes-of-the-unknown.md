---
title: Echoes of the Unknown
date: 2025-05-31
categories: [Capture The Flags, VishwaCTF 2025]
tags: [ctf, vishwactf 2025, steganography, writeups]
description: VishwaCTF 2025 Echoes of the Unknown Challenge
---


> Challenge description:
> 
> Not everything is heard—some things must be seen.
{: .prompt-info }

FLAG: `VishwaCTF{CR4CK3D_7H3_C0D3}`

Okay, so for this challenge we we're given a `wav` file, full of just some beeps. Whenever I'm doing a challenge and I get a audio file full off just beeps, I like to assume that it's probably morse code. Thankfully, there are online tools that can take in audio files with morse code and play them back to you. I like to use [this tool](https://morsecode.world/international/decoder/audio-decoder-adaptive.html) for decoding audio files with morse code. However, the file that we are given is much to slow, so you can use your software of choice to speed the audio up. Once we get that done, all that's left is to plug it into the site again and let it to its thing.

![the morse decoded](/assets/img/vishwactf-2025/echoes/image0.png)

FLAG: `VishwaCTF{CR4CK3D_7H3_C0D3}`
