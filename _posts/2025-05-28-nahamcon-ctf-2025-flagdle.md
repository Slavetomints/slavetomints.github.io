---
title: Flagdle
date: 2025-05-28
categories: [Capture The Flags, NahamCon CTF 2025]
tags: [ctf, nahamcon ctf 2025, misc, writeups]
description: NahamCon CTF 2025 Flagdle Challenge
image:
  path: /assets/img/nahamcon-ctf-2025/flagdle/image0.png
  alt: flagdle landing page
  post: false
---


> Challenge description:
> 
> Wordle? I sleep. Too easy.  
> 
> 32 character Wordle? Now we're cooking with gas!
{: .prompt-info }

Oh boy, just for fun let's do today's Wordle to see how well I can normally do it. 

```plaintext
Wordle 1,439 4/6

🟨⬜⬜⬜⬜
🟩🟨🟨⬜⬜
🟩⬜🟩🟨⬜
🟩🟩🟩🟩🟩
```
Heck yeah, hopefully I can solve this one in less tries, let's take a look at the application:

![the site](/assets/img/nahamcon-ctf-2025/flagdle/image0.png)

After looking at the app a bit, I was able to determine that the info is sent and received as `JSON` objects, so let's write a script to make this easy.

### Rules of Wordle
For those that don't know how Wordle works, you are given a hidden word to guess, like hangman, except you get hints based on your previous guesses. If a letter was in the correct position, you get a green box, if a letter was in the wrong position, you get a yellow box, and if the letter isn't in the word, you get a gray box.

### Writing the Script
Let's apply that logic to the script. Rather than just brute-force it, lets check it one character at a time. We'll ignore everything but the green box emoji, and just cycle through each possible hex character for that space until the application returns that green box, at which point we move on to the next character. that's represented by the loop we have here:

```python
HEX_CHARS = "0123456789abcdef"
flag_chars = ['x'] * 32

for i in range(32):
    print(f"\n[*] Trying position {i}")
    for c in HEX_CHARS:
        test_guess = list('x' * 32)
        for j in range(32):
            if flag_chars[j] != 'x':
                test_guess[j] = flag_chars[j]
        test_guess[i] = c
        joined_guess = ''.join(test_guess)
        print(f"  [-] Testing: {joined_guess}")
        feedback = send_guess(joined_guess)
        if feedback and feedback[i] == '🟩':
            flag_chars[i] = c
            print(f"  [+] Found character at position {i}: {c}")
            break
```
{: file="flagdle.py" }

Then implementing in the `send_guess` function brings us to this script:

```python
import requests

URL = "http://challenge.nahamcon.com:32664/guess"
HEADER = {"Content-Type": "application/json"}
HEX_CHARS = "0123456789abcdef"

flag_chars = ['x'] * 32

def send_guess(guess):
    try:
        response = requests.post(URL, json={"guess": f"flag{{{guess}}}"}, headers=HEADER)
        if response.status_code == 200:
            return response.json().get("result", "")
        else:
            print(f"Error: {response.status_code} - {response.text}")
            return ""
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return ""

for i in range(32):
    print(f"\n[*] Trying position {i}")
    for c in HEX_CHARS:
        test_guess = list('x' * 32)
        for j in range(32):
            if flag_chars[j] != 'x':
                test_guess[j] = flag_chars[j]
        test_guess[i] = c
        joined_guess = ''.join(test_guess)
        print(f"  [-] Testing: {joined_guess}")
        feedback = send_guess(joined_guess)
        if feedback and feedback[i] == '🟩':
            flag_chars[i] = c
            print(f"  [+] Found character at position {i}: {c}")
            break

final_flag = f"flag{{{''.join(flag_chars)}}}"
print(f"\n[✅] Final Flag: {final_flag}")
```
{: file="flagdle.py" }

### Running the Script
Now all that's left to do is run it, the results are below.

```terminal
┌──[slavetomints@parrot]─[~]
└──╼ $python flagdle.py 

[*] Trying position 0
  [-] Testing: 0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: 1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: 2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: 3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: 4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: 5xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: 6xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: 7xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: 8xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: 9xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: axxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [+] Found character at position 0: b

[*] Trying position 1
  [-] Testing: b0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: b1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: b2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: b3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: b4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: b5xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: b6xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: b7xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: b8xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: b9xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: baxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bcxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bexxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [+] Found character at position 1: e

[*] Trying position 2
  [-] Testing: be0xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: be1xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: be2xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: be3xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: be4xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: be5xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: be6xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: be7xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: be8xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: be9xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: beaxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bebxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: becxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [+] Found character at position 2: c

[*] Trying position 3
  [-] Testing: bec0xxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec1xxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec2xxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec3xxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec4xxxxxxxxxxxxxxxxxxxxxxxxxxxx
  [+] Found character at position 3: 4

[*] Trying position 4
  [-] Testing: bec40xxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec41xxxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42xxxxxxxxxxxxxxxxxxxxxxxxxxx
  [+] Found character at position 4: 2

[*] Trying position 5
  [-] Testing: bec420xxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec421xxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec422xxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec423xxxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec424xxxxxxxxxxxxxxxxxxxxxxxxxx
  [+] Found character at position 5: 4

[*] Trying position 6
  [-] Testing: bec4240xxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec4241xxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec4242xxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec4243xxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec4244xxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec4245xxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec4246xxxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec4247xxxxxxxxxxxxxxxxxxxxxxxxx
  [+] Found character at position 6: 7

[*] Trying position 7
  [-] Testing: bec42470xxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42471xxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42472xxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42473xxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42474xxxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475xxxxxxxxxxxxxxxxxxxxxxxx
  [+] Found character at position 7: 5

[*] Trying position 8
  [-] Testing: bec424750xxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec424751xxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec424752xxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec424753xxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec424754xxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec424755xxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec424756xxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec424757xxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec424758xxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec424759xxxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475axxxxxxxxxxxxxxxxxxxxxxx
  [+] Found character at position 8: a

[*] Trying position 9
  [-] Testing: bec42475a0xxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a1xxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a2xxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a3xxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a4xxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a5xxxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a6xxxxxxxxxxxxxxxxxxxxxx
  [+] Found character at position 9: 6

[*] Trying position 10
  [-] Testing: bec42475a60xxxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a61xxxxxxxxxxxxxxxxxxxxx
  [+] Found character at position 10: 1

[*] Trying position 11
  [-] Testing: bec42475a610xxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a611xxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a612xxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a613xxxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614xxxxxxxxxxxxxxxxxxxx
  [+] Found character at position 11: 4

[*] Trying position 12
  [-] Testing: bec42475a6140xxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a6141xxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a6142xxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a6143xxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a6144xxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a6145xxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a6146xxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a6147xxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a6148xxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a6149xxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614axxxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614bxxxxxxxxxxxxxxxxxxx
  [+] Found character at position 12: b

[*] Trying position 13
  [-] Testing: bec42475a614b0xxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b1xxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b2xxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b3xxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b4xxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b5xxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b6xxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b7xxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b8xxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9xxxxxxxxxxxxxxxxxx
  [+] Found character at position 13: 9

[*] Trying position 14
  [-] Testing: bec42475a614b90xxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b91xxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b92xxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b93xxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b94xxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b95xxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b96xxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b97xxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b98xxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b99xxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9axxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9bxxxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9cxxxxxxxxxxxxxxxxx
  [+] Found character at position 14: c

[*] Trying position 15
  [-] Testing: bec42475a614b9c0xxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c1xxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c2xxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c3xxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c4xxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c5xxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c6xxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c7xxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c8xxxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9xxxxxxxxxxxxxxxx
  [+] Found character at position 15: 9

[*] Trying position 16
  [-] Testing: bec42475a614b9c90xxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c91xxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c92xxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c93xxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c94xxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c95xxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c96xxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c97xxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c98xxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c99xxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9axxxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9bxxxxxxxxxxxxxxx
  [+] Found character at position 16: b

[*] Trying position 17
  [-] Testing: bec42475a614b9c9b0xxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9b1xxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9b2xxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9b3xxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9b4xxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9b5xxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9b6xxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9b7xxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9b8xxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9b9xxxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9baxxxxxxxxxxxxxx
  [+] Found character at position 17: a

[*] Trying position 18
  [-] Testing: bec42475a614b9c9ba0xxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba1xxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba2xxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba3xxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba4xxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba5xxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba6xxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba7xxxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba8xxxxxxxxxxxxx
  [+] Found character at position 18: 8

[*] Trying position 19
  [-] Testing: bec42475a614b9c9ba80xxxxxxxxxxxx
  [+] Found character at position 19: 0

[*] Trying position 20
  [-] Testing: bec42475a614b9c9ba800xxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba801xxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba802xxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba803xxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba804xxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba805xxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba806xxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba807xxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba808xxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba809xxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80axxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80bxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80cxxxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80dxxxxxxxxxxx
  [+] Found character at position 20: d

[*] Trying position 21
  [-] Testing: bec42475a614b9c9ba80d0xxxxxxxxxx
  [+] Found character at position 21: 0

[*] Trying position 22
  [-] Testing: bec42475a614b9c9ba80d00xxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d01xxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d02xxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d03xxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d04xxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d05xxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d06xxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d07xxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d08xxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d09xxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0axxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0bxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0cxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0dxxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0exxxxxxxxx
  [+] Found character at position 22: e

[*] Trying position 23
  [-] Testing: bec42475a614b9c9ba80d0e0xxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0e1xxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0e2xxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0e3xxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0e4xxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0e5xxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0e6xxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0e7xxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0e8xxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0e9xxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eaxxxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0ebxxxxxxxx
  [+] Found character at position 23: b

[*] Trying position 24
  [-] Testing: bec42475a614b9c9ba80d0eb0xxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb1xxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb2xxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb3xxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb4xxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb5xxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb6xxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7xxxxxxx
  [+] Found character at position 24: 7

[*] Trying position 25
  [-] Testing: bec42475a614b9c9ba80d0eb70xxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb71xxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb72xxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb73xxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb74xxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb75xxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb76xxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb77xxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb78xxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb79xxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7axxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7bxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7cxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7dxxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7exxxxxx
  [+] Found character at position 25: e

[*] Trying position 26
  [-] Testing: bec42475a614b9c9ba80d0eb7e0xxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7e1xxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7e2xxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7e3xxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7e4xxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7e5xxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7e6xxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7e7xxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7e8xxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7e9xxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7eaxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7ebxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7ecxxxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7edxxxxx
  [+] Found character at position 26: d

[*] Trying position 27
  [-] Testing: bec42475a614b9c9ba80d0eb7ed0xxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed1xxxx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed2xxxx
  [+] Found character at position 27: 2

[*] Trying position 28
  [-] Testing: bec42475a614b9c9ba80d0eb7ed20xxx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed21xxx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed22xxx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed23xxx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed24xxx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed25xxx
  [+] Found character at position 28: 5

[*] Trying position 29
  [-] Testing: bec42475a614b9c9ba80d0eb7ed250xx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed251xx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed252xx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed253xx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed254xx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed255xx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed256xx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed257xx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed258xx
  [+] Found character at position 29: 8

[*] Trying position 30
  [-] Testing: bec42475a614b9c9ba80d0eb7ed2580x
  [-] Testing: bec42475a614b9c9ba80d0eb7ed2581x
  [-] Testing: bec42475a614b9c9ba80d0eb7ed2582x
  [-] Testing: bec42475a614b9c9ba80d0eb7ed2583x
  [-] Testing: bec42475a614b9c9ba80d0eb7ed2584x
  [-] Testing: bec42475a614b9c9ba80d0eb7ed2585x
  [-] Testing: bec42475a614b9c9ba80d0eb7ed2586x
  [-] Testing: bec42475a614b9c9ba80d0eb7ed2587x
  [-] Testing: bec42475a614b9c9ba80d0eb7ed2588x
  [-] Testing: bec42475a614b9c9ba80d0eb7ed2589x
  [-] Testing: bec42475a614b9c9ba80d0eb7ed258ax
  [-] Testing: bec42475a614b9c9ba80d0eb7ed258bx
  [-] Testing: bec42475a614b9c9ba80d0eb7ed258cx
  [+] Found character at position 30: c

[*] Trying position 31
  [-] Testing: bec42475a614b9c9ba80d0eb7ed258c0
  [-] Testing: bec42475a614b9c9ba80d0eb7ed258c1
  [-] Testing: bec42475a614b9c9ba80d0eb7ed258c2
  [-] Testing: bec42475a614b9c9ba80d0eb7ed258c3
  [-] Testing: bec42475a614b9c9ba80d0eb7ed258c4
  [-] Testing: bec42475a614b9c9ba80d0eb7ed258c5
  [+] Found character at position 31: 5

[✅] Final Flag: flag{bec42475a614b9c9ba80d0eb7ed258c5}
```

FLAG: `flag{bec42475a614b9c9ba80d0eb7ed258c5}`
