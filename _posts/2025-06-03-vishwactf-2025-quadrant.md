--- 
title: QuadRant 
date: 2025-06-03 
categories: [Capture The Flags, VishwaCTF 2025] 
tags: [ctf, vishwactf 2025, steganography, writeups] 
description: VishwaCTF 2025 QuadRant Challenge
---

> Challenge description:
> 
> Four pieces of a forgotten code lie before you. Each fragment holds a part of a greater whole, but the puzzle is incomplete. Your task: find the pattern, align the pieces, and unlock the final code. Once the pieces fall into place, scan what you’ve created to uncover the secret within.
>
> Let the search begin. {: .prompt-info }

For this challenge we were given 4 different images, each one is part of a QR code. I'm assuming that the QR code is either the flag or a clue to look at the next step of the flag. The flags are as follows:

![quadrant 1](/assets/img/vishwactf-2025/quadrant/flag1.png) 
![quadrant 2](/assets/img/vishwactf-2025/quadrant/flag2.png)
![quadrant 3](/assets/img/vishwactf-2025/quadrant/flag3.png)
![quadrant 4](/assets/img/vishwactf-2025/quadrant/flag4.png)

Let's use GIMP to piece the images together into a single QR code.

![The reconstructed QR code](/assets/img/vishwactf-2025/quadrant/image0.png)

So an interesting thing about QR codes is that you do not need the entire code to be able to get the data that is on it. They do have some redundancy built into them, and while the math behind that is too high level for this writeup, [the Wikipedia article on QR code's](https://en.wikipedia.org/wiki/QR_code#Error_correction) has an interesting section on the error correction capabilities of them.

Anyway, if we scan with a QR code reader, it gives us the flag!

FLAG: `VishwaCTF{aG9lMTIzNDU2c3Bhc3NhZ2U=}`
