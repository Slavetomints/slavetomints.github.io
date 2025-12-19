---
title: CyberChef III
date: 2025-12-13
categories:
  - Guides
  - CyberChef
tags:
  - stoutctf 2025
  - crypto
  - guides
  - challenges I created
description: CyberChef Guide Part III
image:
  path: /assets/img/guides/cyberchef/cyberchef-128x128.png
  alt: CyberChef logo
  post: false
---

> This was originally a set of walkthrough challenges I created for StoutCTF 2025. They have been re-uploaded here as guides after the fact. CyberChef VIII - CyberChef X are considered to be writeups, and are in the writeups category.
>
>- CyberChef VIII: [here](https://slavetomints.com/posts/stoutctf-cyber-chef-viii/)
>- CyberChef IX: [here](https://slavetomints.com/posts/stoutctf-cyber-chef-ix/)
>- CyberChef X: [here](https://slavetomints.com/posts/stoutctf-cyber-chef-x/)
{: .prompt-info }

Can you decode this ciphertext?

`53544f55544354467b5263465a4a504a69656b34303744753071774a69323674454351747562334c657d`

## Walkthrough

Welcome back to the CyberChef Walkthroughs! Here we are going to go through the basics of CyberChef, with a few extra challenges at the end for you to work on.

This time, we are going to explore how CyberChef can handle multiple types of encodings, not only Base 64. We'll do that by exploring Base 16, better known as Hexadecimal.

This is very similar to the first walkthrough, where we are going to put our ciphertext into the input, and out block into the recipe. However, I want you to try and find the correct block now. Can you decode the hexadecimal? I guess we'll find out!

FLAG: `STOUTCTF{RcFZJPJiek407Du0qwJi26tECQtub3Le}`