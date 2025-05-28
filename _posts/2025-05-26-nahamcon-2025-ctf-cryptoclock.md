---
title: Cryptoclock
date: 2025-05-26
categories: [Capture The Flags, NahamCon CTF 2025]
tags: [ctf, nahamcon ctf 2025, crypto, writeups]
description: NahamCon CTF 2025 Cryptoclock Challenge
---

> Challenge description:
>  
>  Just imagine it, _the Cryptoclock!!_ Just like you've seen in the movies, a magical power to be able to manipulate the world's numbers across time!!
{: .prompt-info }

For this challenge, we are given `server.py`, let's take a look at that script.

```py
#!/usr/bin/env python3
import socket
import threading
import time
import random
import os
from typing import Optional

def encrypt(data: bytes, key: bytes) -> bytes:
    """Encrypt data using XOR with the given key."""
    return bytes(a ^ b for a, b in zip(data, key))

def generate_key(length: int, seed: Optional[float] = None) -> bytes:
    """Generate a random key of given length using the provided seed."""
    if seed is not None:
        random.seed(int(seed))
    return bytes(random.randint(0, 255) for _ in range(length))

def handle_client(client_socket: socket.socket):
    """Handle individual client connections."""
    try:
        with open('flag.txt', 'rb') as f:
            flag = f.read().strip()
        
        current_time = int(time.time())
        key = generate_key(len(flag), current_time)
        
        encrypted_flag = encrypt(flag, key)
        
        welcome_msg = b"Welcome to Cryptoclock!\n"
        welcome_msg += b"The encrypted flag is: " + encrypted_flag.hex().encode() + b"\n"
        welcome_msg += b"Enter text to encrypt (or 'quit' to exit):\n"
        client_socket.send(welcome_msg)
        
        while True:
            data = client_socket.recv(1024).strip()
            if not data:
                break
                
            if data.lower() == b'quit':
                break
                
            key = generate_key(len(data), current_time)
            encrypted_data = encrypt(data, key)
            
            response = b"Encrypted: " + encrypted_data.hex().encode() + b"\n"
            client_socket.send(response)
            
    except Exception as e:
        print(f"Error handling client: {e}")
    finally:
        client_socket.close()

def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    
    server.bind(('0.0.0.0', 1337))
    server.listen(5)
    
    print("Server started on port 1337...")
    
    try:
        while True:
            client_socket, addr = server.accept()
            print(f"Accepted connection from {addr}")
            client_thread = threading.Thread(target=handle_client, args=(client_socket,))
            client_thread.start()
    except KeyboardInterrupt:
        print("\nShutting down server...")
    finally:
        server.close()

if __name__ == "__main__":
    main() 
```
{: file="server.py"}

Okay, so a good chunk of the script is just handling the client connections, but let's take a closer look at where they generate the key for the encryption.

```py
def generate_key(length: int, seed: Optional[float] = None) -> bytes:
    """Generate a random key of given length using the provided seed."""
    if seed is not None:
        random.seed(int(seed))
    return bytes(random.randint(0, 255) for _ in range(length))
```
{: file="server.py" }

So in this script they generate their key using a random seed, and then use that random seed to randomly add onto the key until it reaches a specified length. The issue with this is that if you are able to figure out the same seed, you ill get the same key. To add on to the issue, lets look at how they generate the seed.

```py
with open('flag.txt', 'rb') as f:
    flag = f.read().strip()
        
current_time = int(time.time())
key = generate_key(len(flag), current_time)
```
{: file="server.py" } 

So whats wrong with this? Well, its because in the `generate_key` function, they make the seed an int, which removes any decimals after it, so the seed becomes something like `1748285129`, rather than `1748285129.9751241`, this makes it very easy to guess the seed, as long as we know when thee script is run. And since we know the script is run when we connect, we can be pretty sure down to a few seconds.

Okay, so we can reproduce the key, but so what? Don't we need to also reverse the encryption? We'll yes, but that's easy. Let's take a look at the `encrypt` function:

```py
def encrypt(data: bytes, key: bytes) -> bytes:
    """Encrypt data using XOR with the given key."""
    return bytes(a ^ b for a, b in zip(data, key))
```
{: file="server.py" }

What we see is a very basic `XOR` function, and given that you can obtain the plaintext by simply `XOR`ing the ciphertext and key, it'll be a peice of cake. Let's take a look at the script in action:

```terminal
┌─[✗]─[slavetomints@parrot]─[~]
└──╼ $nc challenge.nahamcon.com 30851
Welcome to Cryptoclock!
The encrypted flag is: f3703a3c13e737316dcc0bb7bfddf602bb5ffe2829a8d819663133251a93155f4774b45ba00e
Enter text to encrypt (or 'quit' to exit):

```

I made sure to take a note of the UNIX time when I ran the script, `1748032152`, the nice thing about this one is that the script to brute force the flag is very similar to the provided script.

```py
import re
import random
import time

approx_timestamp = 1748032152 

encrypted_flag_hex = "f3703a3c13e737316dcc0bb7bfddf602bb5ffe2829a8d819663133251a93155f4774b45ba00e"
encrypted_flag = bytes.fromhex(encrypted_flag_hex)

def generate_key(seed: int, length: int) -> bytes:
    random.seed(seed)
    return bytes(random.randint(0, 255) for _ in range(length))

def decrypt_flag(encrypted: bytes, key: bytes) -> bytes:
    return bytes(a ^ b for a, b in zip(encrypted, key))

def is_valid_flag(flag: bytes) -> bool:
    try:
        flag_str = flag.decode()
        return bool(re.fullmatch(r'flag\{[0-9a-f]{32}\}', flag_str))
    except:
        return False

print(f"Trying seeds from {approx_timestamp - 5} to {approx_timestamp + 5}...")

for ts in range(approx_timestamp - 5, approx_timestamp + 6):
    key = generate_key(ts, len(encrypted_flag))
    candidate_flag = decrypt_flag(encrypted_flag, key)
    
    if is_valid_flag(candidate_flag):
        print(f"[+] Seed {ts} matched!")
        print(f"Decrypted flag: {candidate_flag.decode()}")
```
{: file="brute.py"}

With this script, I made sure to include a few seconds before and after my timestamp to account for any errors in generating the timestamp. And in action, it worked like a charm.

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $python brute.py 
Trying seeds from 1748032147 to 1748032157...
[+] Seed 1748032152 matched!
Decrypted flag: flag{0e42ba180089ce6e3bb50e52587d3724}
```

FLAG: `flag{0e42ba180089ce6e3bb50e52587d3724}`

