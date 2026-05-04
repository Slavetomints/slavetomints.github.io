---
title: CyberChef IV
date: 2025-12-13
categories:
  - Guides
  - CyberChef
tags:
  - stoutctf 2025
  - crypto
  - guides
  - challenges I created
description: CyberChef Guide Part IV
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

`4e544d314e44526d4e5455314e44517a4e5451304e6a64694e47553059544d304e6a6b334d5459334e7a59334d444d784e6a6b30595459314e444d304e6a5a694e6a6b324e5452694e4463325a4451304e7a41324e7a4d794d7a41334f5455344e6a45314f544d774e5455305a44646b`

## Walkthrough

Welcome back to the CyberChef Walkthroughs! Here we are going to go through the basics of CyberChef, with a few extra challenges at the end for you to work on.

This time, we are going to be super duper lazy, and solve the entire challenge using a single block!

I know, I know, its a lot to ask, but trust me its possible. We're going to learn about the `Magic` block this time.

The Magic block has four main components to it: Depth, Intensive Mode, Extensive Language Support, and Crib.

### Depth
Depth allows you to specify how "deep" or how many layers of encoding might be on the cipher text. For example, the cipher text in CyberChef II had 2 layers of encoding.

### Intensive Mode
Intensive mode makes the Magic block try more complex combinations than it normally would. Be careful, this can crash the application depending on the ciphertext.

### Extensive language Support
This is a mode you might not regularly use. This let's CyberChef know you want it to check against all languages, not just the most common ones.

### Crib
This tells CyberChef what the start of the plaintext is, so it can only show you ones that contain the crib in it.

Now that you've learned all about `Magic`, you can try and solve this challenge.


FLAG: `STOUTCTF{NJ4iqgvp1iJeCFkieKGmDpg20yXaY0UM}`