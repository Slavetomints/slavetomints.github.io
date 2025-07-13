---
title: Python Wrangling
date: 2025-07-12
categories:
  - Capture The Flags
  - picoCTF
tags:
  - ctf
  - picoctf
  - misc
  - writeups
description: picoCTF Python Wrangling Challenge
---


> Challenge description:
>
>Python scripts are invoked kind of like programs in the Terminal... Can you run [this Python script](https://mercury.picoctf.net/static/2ac2139344d2e734d5d638ac928f1a8d/ende.py) using [this password](https://mercury.picoctf.net/static/2ac2139344d2e734d5d638ac928f1a8d/pw.txt) to get [the flag](https://mercury.picoctf.net/static/2ac2139344d2e734d5d638ac928f1a8d/flag.txt.en)?
>
{: .prompt-info }

For this challenge, we are given `ende.py`, `flag.txt.en`, and `pw.txt`

Let's look at each file we're given.

```python
import sys
import base64
from cryptography.fernet import Fernet



usage_msg = "Usage: "+ sys.argv[0] +" (-e/-d) [file]"
help_msg = usage_msg + "\n" +\
        "Examples:\n" +\
        "  To decrypt a file named 'pole.txt', do: " +\
        "'$ python "+ sys.argv[0] +" -d pole.txt'\n"



if len(sys.argv) < 2 or len(sys.argv) > 4:
    print(usage_msg)
    sys.exit(1)



if sys.argv[1] == "-e":
    if len(sys.argv) < 4:
        sim_sala_bim = input("Please enter the password:")
    else:
        sim_sala_bim = sys.argv[3]

    ssb_b64 = base64.b64encode(sim_sala_bim.encode())
    c = Fernet(ssb_b64)

    with open(sys.argv[2], "rb") as f:
        data = f.read()
        data_c = c.encrypt(data)
        sys.stdout.write(data_c.decode())


elif sys.argv[1] == "-d":
    if len(sys.argv) < 4:
        sim_sala_bim = input("Please enter the password:")
    else:
        sim_sala_bim = sys.argv[3]

    ssb_b64 = base64.b64encode(sim_sala_bim.encode())
    c = Fernet(ssb_b64)

    with open(sys.argv[2], "r") as f:
        data = f.read()
        data_c = c.decrypt(data.encode())
        sys.stdout.buffer.write(data_c)


elif sys.argv[1] == "-h" or sys.argv[1] == "--help":
    print(help_msg)
    sys.exit(1)


else:
    print("Unrecognized first argument: "+ sys.argv[1])
    print("Please use '-e', '-d', or '-h'.")

```
{: file="ende.py" }

```plaintext
gAAAAABgUAIV8D5MJdzgLLTkkMlbU84ARVwfX4brMt2rJQCjkpLItytfWVZe1L2dp4K8VrKgRU3axStKJEAqcM0iDaxiYE54Boh8UfAAo1RNifKnlDrFz0gLaznVSFVj2xAUa4V35180
```
{: file="flag.txt.en" }

```plaintext
68f88f9368f88f9368f88f9368f88f93
```
{: file="pw.txt" }

Hm, looks like a python script, an encoded flag, and the password to decrypt said flag. Let's run the python script and see what the usage looks like.

```terminal
❯ python ende.py
Usage: ende.py (-e/-d) [file]
```

Okay, so since we want to decrypt, lets use the `-d` flag, along with the `flag.txt.en` file.

```terminal
❯ python ende.py -d flag.txt.en
Please enter the password:
```

Alrighty, and let's throw the password in that we got from the `pw.txt` file.

```terminal
❯ python ende.py -d flag.txt.en
Please enter the password:68f88f9368f88f9368f88f9368f88f93
picoCTF{4p0110_1n_7h3_h0us3_68f88f93}
```

FLAG: `picoCTF{4p0110_1n_7h3_h0us3_68f88f93}`