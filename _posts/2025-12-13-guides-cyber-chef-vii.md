---
title: CyberChef VII
date: 2025-12-13
categories:
  - Guides
  - CyberChef
tags:
  - stoutctf 2025
  - crypto
  - guides
  - challenges I created
description: CyberChef Guide Part VII
image:
  path: /assets/img/guides/cyberchef/cyberchef-128x128.png
  alt: CyberChef logo
  post: false
---

> This was originally a set of walkthrough challenges I created for StoutCTF 2025. They have been re-uploaded here as guides after the fact. CyberChef VIII - CyberChef X are considered to be writeups, and are in the writeups category.
>
>CyberChef VIII: http://slavetomints.com/posts/stoutctf-cyber-chef-viii/
>CyberChef IX: http://slavetomints.com/posts/stoutctf-cyber-chef-ix/
>CyberChef X: http://slavetomints.com/posts/stoutctf-cyber-chef-x/
{: .prompt-info }

Can you decode this ciphertext?

`\x52\x55\x4e\x54\x55\x42\x55\x47\x7a\x33\x66\x79\x62\x64\x6b\x43\x32\x69\x74\x4a\x64\x6f\x6a\x70\x63\x4a\x44\x66\x75\x49\x4c\x56\x58\x50\x48\x40\x62\x55\x56\x38\x6c\x7c`

## Walkthrough

Welcome back to the CyberChef Walkthroughs! Here we are going to go through the basics of CyberChef, with a few extra challenges at the end for you to work on.

This time, we are going to talk about our last topic, brute forcing.

CyberChef does have limited brute force capabilities built into it. We'll be looking at `XOR Brute Force` this time.

First things first, we need to read the ciphertext as hex, so let's first add the `From Hex` with `\x` as the delimiter. Then, we can look into breaking the XOR encryption on it.

The nice things about XOR, is the same value you use to encrypt, is the same one you use to decrypt, so let's go through and try to use brute force to get it. Go ahead and drag the `XOR Brute Force` block into the recipe.

You'll notice that it shows the first 100 hexadecimal keys, and it can be pretty hard to parse through that, so let's fill in the crib with the flag header `STOUTCTF{`, to see if we get a match.

And just like that, you've learned the basics on how to do brute force wiith CyberChef. By now, you should be familiar with the basics of the program, so challenges VIII, IX, and X will be all on your own. Good luck!

FLAG: `STOUTCTF{2gxcejB3huKenkqbKEgtHMWYQIAcTW9m}`