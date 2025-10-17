---
title: Aria of the Lost Code
date: 2025-03-06 19:59:00 -0600
categories: [Capture The Flags, VishwaCTF 2025]
tags: [ctf, vishwactf, crypto, writeups]
description: VishwaCTF 2025 Aria of the Lost Code Challenge
image:
  path: /assets/img/vishwactf-2025/aria-of-the-lost-code/Chall_crypto.png
  alt: challenge 
  post: false
---

> Challenge description: 
>
> A shattered data shard from an ancient relic has been recovered. It hums with a cryptic resonance, revealing a fragmented inscription in an unknown script. After intense decryption efforts, a single phrase emerged:
>
> "The melody echoes beyond the void."
>
> Can you uncover the true message hidden within?
> 
> Flag Format:
> VishwaCTF{A4v4_a4a_4aa4a_Aa_44a4a4a4}
{: .prompt-info }

All we are given for this challenge is a single image with some patterns on it:

![the challenge](/assets/img/vishwactf-2025/aria-of-the-lost-code/Chall_crypto.png)

Now, I highly doubt that this is a novel encoding, so lets do a quick reverse image search to look for similar ciphers. And as a result of that I found the following:

![hymmnos](/assets/img/vishwactf-2025/aria-of-the-lost-code/Hymmnos.png)

Looks like we have the cipher down, now all we need to do is decrypt it and we'll be on our way!

FLAG: `VishwaCTF{H4v3_y0u_7ri3d_Ar_70n3l1c0}`