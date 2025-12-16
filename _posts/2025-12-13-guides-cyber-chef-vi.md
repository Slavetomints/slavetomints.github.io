---
title: CyberChef VI
date: 2025-12-13
categories:
  - Guides
  - CyberChef
tags:
  - stoutctf 2025
  - crypto
  - guides
  - challenges I created
description: CyberChef Guide Part VI
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

`MNIONWNZ{ksZHombA4Z84sBq1dlOH3oXu7rJEYms8}`

## Walkthrough

Welcome back to the CyberChef Walkthroughs! Here we are going to go through the basics of CyberChef, with a few extra challenges at the end for you to work on.

This time, we are going to look at translations and rotations. One of the easiest ways to do this is with the `ROT 13` block.

The way that ROT works is that is shifts letters one to the side, such as that `a` becomes `b`, and so on and so forth. The Caesar Cipher works with a shift of three characters. `a` becomes `d`, `b` becomes `e`, and etc.

If we rotate `Hello, World!` by 13 characters, `Uryyb, Jbeyq!`, and to find the shift to rotate back to the original text, we have two options.

If we know what the original shift was, we can subtract that from 26, which is why if you shift something by 13, all out need to do is shift it by 13 again.

The other option is to simply try all 26 shifts, which is doable, but it does take a little longer to do.

Use the `ROT 13` block to find the amount of shift to get the flag!

FLAG: `STOUTCTF{qyFNushG4F84yHw1jrUN3uDa7xPKEsy8}`