# Chaos

Challenge description:

> You've stumbled upon a bunch of garbled nonsense—some might call them "encrypted messages," but who really knows? Most of it is just random junk, but hidden somewhere in this mess is an actual secret. No keys, no hints, just you and the chaos. Good luck figuring it out—if you even can.

Alrighty, here we are given two files, and both are as shown below:

## output.txt

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

## challenge.p​y

```py
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

Looking at `challenge.py`, it appears that its pulling some text from `https://x.com/Abhinav04139720.txt` and then encoding it using `xor`, and then writing it to a file named `output.txt`. That's all fine and dandy, but what is `XOR`?

## XOR

`XOR`, or `exclusive or` is a logic gate. In a basic sense, a logic gates are ["device[s] that performs a Boolean function"](https://en.wikipedia.org/wiki/Logic_gate). They preform the most basic computation that a computer chip needs in order to function. You computer chip has hundreds of millions of logic gates on it, in order to work the way that it does. The `XOR` gate looks as such:

![https://graphicmaths.com/img/computer-science/logic/combining-logic-gates/xor-create-gate.png](XOR Gate)
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTU5MjEyNTgyXX0=
-->