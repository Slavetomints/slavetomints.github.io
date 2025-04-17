---
title: Chaos
date: 2025-03-06 19:59:00 -0600
categories: [Capture The Flags, VishwaCTF 2025]
tags: [ctf, vishwactf, crypto, writeups]
description: VishwaCTF 2025 Chaos Challenge
---

> Challenge description:
>
> You've stumbled upon a bunch of garbled nonsense—some might call them "encrypted messages," but who really knows? Most of it is just random junk, but hidden somewhere in this mess is an actual secret. No keys, no hints, just you and the chaos. Good luck figuring it out—if you even can.
{: .prompt-info }

Alrighty, here we are given two files, and both are as shown below:

```
P-JjxWp#BYd|_`ZYGH3^FnD1zaeH-me0+X8b#p#lK~hH*5E=$(S_wx=RZmL~SX4?3
Pjez}Wqf2}D1BmXEPrcmd@*!?b#gX-YdLUkZ)rYoPDBDgOhi;hOI=S{3`s{xR#ZS%T0s_3N>*1JT~SgWG$|)AA!Q&YBP=;|
R%mf+b7VzRPI63VIBHQqVoqEmU`j%NENw+9Z$e6U6Ml16K~{1W7)Mt
O<;RrVI^{JZ7FPLZE7xNV=;PqaB*{aIDB?!d1`igQbY_53I
R%mf+b7VzRPI6v5JW@kDerQcqAburCUUe>9Z$eow5Ji1&QASN#
Pjez_YIbj9Z7FLjZ(?I&b$@0veS0=zaC|ywb7*XQMFBxfKtLG
RB3B)By4pjW@dgXcx7uZc71bnI5mB8eQ7#(b8>ZdPDTR
Pjez}Wqf2}D1BmXerPFtFmN(pcV~ZRY&m^?a(HZhR7gxj1V~d$TtHe!NexI&TT~KNSX5C&7+phET~JqCAuTRCdj
R%mf+b7VzRPI5_kRegFtPjWzNL_sD<DSky#XhJV+e^PBu7kUv-L1#^LSRHX|089
O<;RrVI^;KFM29sVt!|9bun{&dtrWZYB_mxeQ|PnPDV!$1V&UyTUrNMNlQyzRbNqBT2dBKR9Ia|0{
Pjez_cO`FgHv
LUeW`b7XIGCMP5-Wqx2NWHDxYeP%XecXm2-ertDdRZ<-
S7~E+By3<OVSO!lENm`kabkKidvi8paC|yxd3<s|MomLR8v
R%mf+b7VzRPI5$KSW;SNRZc*5by-PqRCrxPS1v72e^qc=6>C9S
Pjez`ZDC?!W+`K3ENoyed3<wpaW!LPad&+?Z)tmYK~GIYRzy}$Q5F
NMLeveI;&kW_@F2Yb*
R%mf+b7VzRPI6N_c~V(sTzySlCu1dLM_(&-ctS60T>
Pjez}Wqf2}D1BmXEPrcmd@*!?b#gX-YdLaqczJtq07y(wO+iBkNeMziNJ&dU5La7YQ3?
MrdqjTXAk;S9@=2U{Yvfadu5$dw6qTaC~TfLv(OJR7p!vdq_i6TL
PiZbAU~FP1ab|xjcx7i{dogBvbzwGOd1^Xod3<sp0BT1@R0Tp#PfkNcOAG
```
{: file="output.txt" }

```python
import random
import base64
import os

messages = []
with open('https://x.com/Abhinav04139720.txt', 'rb') as f:
    for line in f.readlines():
        messages.append(line.strip())

with open('flag.txt', 'rb') as f:
    flag = f.read().strip()
messages.append(flag)

random.shuffle(messages)

def xor_encrypt(msg):
    transformed = bytearray(msg)
    for i in range(len(transformed)):
        transformed[i] ^= (i % 256)  
    return base64.b85encode(transformed).decode() 

with open('output.txt', 'w') as f:
    for msg in messages:
        encrypted_msg = xor_encrypt(msg)
        f.write(f'{encrypted_msg}\n\n')

```
{: file="challenge.py" }

Looking at `challenge.py`, it appears that its pulling some text from `https://x.com/Abhinav04139720.txt` and `flag.txt`, shuffling the order of the line, then encoding each using `xor`, and then writing it to a file named `output.txt`. That's all fine and dandy, but what is `XOR`?

## XOR

`XOR`, or `exclusive or` is a logic gate. In a basic sense, a logic gates are ["device[s] that performs a Boolean function"](https://en.wikipedia.org/wiki/Logic_gate). They preform the most basic computation that a computer chip needs in order to function. You computer chip has hundreds of millions of logic gates on it, in order to work the way that it does. The `XOR` gate looks as such:

![XOR gate](https://graphicmaths.com/img/computer-science/logic/combining-logic-gates/xor-create-gate.png)

But, what does it actually do? It compares two values, both of which are either 0 or 1, and returns `1` if the two are different, and `0` if they are different for example:

| Input 1 | Input 2 | Output |
| -- | -- | -- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

As you can see, where the input were different, a `1` was returned. The nice thing about this is that if you simply preform the `XOR` again and it will decrypt itself, as long as you use the same key.

## Back to the Challenge

Now that we know how `XOR` works, this challenge is pretty simple. First off, the function `xor_encrypt` takes the message and turns it into an array of bytes, and then preforms an `XOR` on each byte in the array using the output of `index MOD 256`, so know we know the key to use in decrypting it. And finally it returns the `XOR`ed message encoded in `base85`. I'm not too concerned about the shuffling of the messages since its a simple task to decrypt them all. Let's take a look now at the solution

## My Solution

```python

import base64

def xor_decrypt(msg):
    decoded_msg = base64.b85decode(msg)
    transformed = bytearray(decoded_msg)
    for i in range(len(transformed)):
        transformed[i] ^= (i % 256)
    return bytes(transformed)

encrypted_messages = []

with open('output.txt', 'r') as f:
    encrypted_messages = f.read().split('\n\n')

decrypted_messages = []
for encrypted_msg in encrypted_messages:
    decrypted_msg = xor_decrypt(encrypted_msg)
    decrypted_messages.append(decrypted_msg.decode())

for message in decrypted_messages:
    print(message)

```

It's almost the same as the encryption script, in fact some parts are the exact same, but utilizing the same logic from earlier we can easily decrypt it all. Lets take a look at what that looks like.

```terminal

┌─[slavetomints@parrot]─[~]
└──╼ $python3 py.py 

Perhaps the flag is encoded in Base64? Or maybe hex?
Or maybe the real flag is just one character different from all these fakes?
VishwaCTF{Fl4g_Or_N0t_Th4t_1s_Th3_QuesT10n}
Maybe the flag is hidden elsewhere...
VishwaCTF{T00_M4ny_F4k3_Fl4Gs_G00d_Luck}
Or inside a comment in the source code?
This is not the flag, keep looking!
Or maybe there's a script generating multiple fake flags dynamically?
VishwaCTF{CrYpt0_cRyPT0_1g_It_1s_sOm3_7hiNg_t0_D0}
Maybe it's inside another challenge, cross-referencing flags?
Or is it?
But wait... isn't this too obvious?
What if it's a hash of the real flag?
VishwaCTF{NoT_ThE_ReaL_fLaG_K33P_tRy1Ng}
Or hidden in an image using steganography?
Happy hunting!
VishwaCTF{Y0u_WiLl_N3v3r_F1nd_1t}
Or maybe the real flag is hidden inside a hidden file?
Find_the_real_flag_somewhere_in_this_mess
Oh, did you think that was real? Keep digging!
```

Looks like we have a few flags, lets submit the one that doesn't allude to being a fake flag.

FLAG: `VishwaCTF{CrYpt0_cRyPT0_1g_It_1s_sOm3_7hiNg_t0_D0}`