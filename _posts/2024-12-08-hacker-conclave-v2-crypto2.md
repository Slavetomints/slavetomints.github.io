---
title: Crypto 2
date: 2024-12-08 19:47:00 -0600
categories: [Capture The Flags, Hacker Conclvae v2]
tags: [ctf, hacker conclave v2, crypto, writeups]
description: Hacker Conclave v2 Crpyto 2 Challenge
---

> Challenge description:
>
> In this challenge, we have access to a program that will encrypt the flag we want to obtain. When connecting to port **[redacted for privacy]** at the address **[redacted for privacy]**, it will return the program's output. Will you be able to retrieve the flag?
{: .prompt-info }

Alright, so lets look at this challenge, when we connect to the port, it spits out two things at us. First, the source code, and then an encrypted message. Lets look at the source code.


```python

import os
import random
import string
from Cryptodome.Cipher import AES
from Cryptodome.Protocol.KDF import PBKDF2
from Cryptodome.Random import get_random_bytes
from Cryptodome.Util.number import bytes_to_long

characters = string.ascii_letters + string.digits

if os.path.exists("/flag/flag.txt"):
    flag=(open("/flag/flag.txt","r").read()).encode("utf-8");
else:
    flag=(open("flag.txt","r").read()).encode("utf-8");

key = ((""+random.choice(characters))*16).encode("utf-8");

cipher = AES.new(key, AES.MODE_ECB);

padded_content = flag.ljust((len(flag) // 16 + 1) * 16, b'\x00');
encrypted_content = cipher.encrypt(padded_content);
encrypted_content = bytes_to_long(encrypted_content);

print(open("cifra.py","r").read());
print("encrypted_content="+str(encrypted_content)+"\n");

```
{: file="cifra.py" }

Okay, so this ran when we connected, and thats why it printed the entire program and the encrypted content to the terminal, as that is the last thing that this program `cifra.py` does. Lets break down this program line by line.

```python

import os
import random
import string
from Cryptodome.Cipher import AES
from Cryptodome.Protocol.KDF import PBKDF2
from Cryptodome.Random import get_random_bytes
from Cryptodome.Util.number import bytes_to_long

```
{: file="cifra.py" }

The `os` module is commonly used for using the functionality of the operating system. In this program its used to check if the flag is at `flag/flag.txt`.

The `random` module is used for randomness, as the name suggests. Its used in the program with `random.choice()`, where it makes a random selection based on hat is passed to `choice()`.

The `string` module is used here for the `string.ascii_letters` and `string.digits`, which is used to make the `characters` variable.

Next up is `Cryptodome`. It is another module that gives python some expanded cryptographic functionalities. Here, we they are importing `AES`, `PBKDF2`, `get_random_bytes`, and `bytes_to_long`. We'll go over their functionality as we get to them.

Moving away from the import statements, lets get into the meat and potatoes of the code. First up, we have:

```python

characters = string.ascii_letters + string.digits

```
{: file="cifra.py" }

This is a pretty simple line. It takes all uppercase and lowercase ascii letters, and all digits 0-9 and concatenates them, seting characters value to `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`

So, moving on, we are confronted with this:

```python

if os.path.exists("/flag/flag.txt"):
    flag=(open("/flag/flag.txt","r").read()).encode("utf-8");
else:
    flag=(open("flag.txt","r").read()).encode("utf-8");

```
{: file="cifra.py" }

This `if...else` block first checks to see if the path to `/flag/flag.txt` exists, and if it does then it opens the file in read mode with UTF-8 encoding. However, if the path doesn't exist, it would open `./flag.txt` in read mode with UTF-8 encoding.

This next line is where the vulnerability in the code lies.

```python

key = ((""+random.choice(characters))*16).encode("utf-8");

```
{: file="cifra.py" }

Usually, a 16 character key can be pretty secure, knowing that there are 62 possible choices for each character, leaving a whopping `47,672,401,706,823,533,450,263,330,816`, or `Forty-seven octillion, six hundred seventy-two septillion, four hundred one sextillion, seven hundred six quintillion, eight hundred twenty-three quadrillion, five hundred thirty-three trillion, four hundred fifty billion, two hundred sixty-three million, three hundred thirty thousand, eight hundred sixteen`. However, the arrow in the knee is that they randomly generate one character and repeat it 16 times, taking that huge number of possilities and turning it into `62`. This, is easily brute-forcable.

```python

padded_content = flag.ljust((len(flag) // 16 + 1) * 16, b'\x00');
encrypted_content = cipher.encrypt(padded_content);
encrypted_content = bytes_to_long(encrypted_content);

print(open("cifra.py","r").read());
print("encrypted_content="+str(encrypted_content)+"\n");

```
{: file="cifra.py" }

The rest of the code covers encrypting the flag, and then printing the program and the encrypted flag to the terminal.

The encrypted flag I got was `33184633452588628947694484591780825103796687823569131220950080094742922022993114204314814746054128940142933245107995`

Lets now review my decryption program.

```python

from Cryptodome.Cipher import AES
from Cryptodome.Util.number import long_to_bytes
import string

# Given encrypted content (ciphertext as a long integer)
encrypted_content = 33184633452588628947694484591780825103796687823569131220950080094742922022993114204314814746054128940142933245107995

# Convert encrypted content back to bytes
ciphertext = long_to_bytes(encrypted_content)

# Character set used to generate the key
characters = string.ascii_letters + string.digits

# Brute-force all possible single-character keys repeated 16 times
for char in characters:
    key = (char * 16).encode("utf-8")  # Key is one character repeated 16 times
    cipher = AES.new(key, AES.MODE_ECB)  # Initialize cipher with key
    
    try:
        decrypted_content = cipher.decrypt(ciphertext).rstrip(b'\x00')  # Remove padding
        if decrypted_content.startswith(b"conclave{"):  # Check if it starts with "conclave{"
            print(f"Key: {key.decode()} | Flag: {decrypted_content.decode()}")
    except Exception:
        continue  # Skip invalid decryptions

```
{: file="bruteforce.py" }

To quickly cover the program, we import some of the same modules as they did originally in order to reverse the encrypted content to bytes, and to recreate the `characters` variable. Then for each character in `characters` we are going to make an AES key the same way they did and attempt to decrypt it. If it starts with `conclave{`, which is the flag format for the CTF, then we know we have the correct key. And it's all wrapped in a `try...except` in order to skip past invalid decryptions that might cause the program to error out.

```terminal

┌─[slavetomints@parrot]─[~/ctfs/hacker-conclave-v2/crypto/crypto2]
└──╼ $python bruteforce.py 
Key: HHHHHHHHHHHHHHHH | Flag: conclave{40e9222eee660a0c1cd2e736d613a7e1}

```

FLAG: `conclave{40e9222eee660a0c1cd2e736d613a7e1}`