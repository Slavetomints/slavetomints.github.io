
# fixme2.py

Challenge description:

> Fix the syntax error in this Python script to print the flag.

Just like the other one, let's try to first run the script to see if the error message leads us to where the error is.

```

┌─[slavetomints@parrot]─[~]
└──╼ $python fixme2.py 
  File "/home/slavetomints/training/picoCTF/general-skills/fixme2.py/fixme2.py", line 22
    if flag = "":
       ^^^^^^^^^
SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?
```

Hm, now that we know that we're looking for an indent, lets take a look at the actual source code.

```python

import random



def str_xor(secret, key):
    #extend key to secret length
    new_key = key
    i = 0
    while len(new_key) < len(secret):
        new_key = new_key + key[i]
        i = (i + 1) % len(key)        
    return "".join([chr(ord(secret_c) ^ ord(new_key_c)) for (secret_c,new_key_c) in zip(secret,new_key)])


flag_enc = chr(0x15) + chr(0x07) + chr(0x08) + chr(0x06) + chr(0x27) + chr(0x21) + chr(0x23) + chr(0x15) + chr(0x5a) + chr(0x07) + chr(0x00) + chr(0x46) + chr(0x0b) + chr(0x1a) + chr(0x5a) + chr(0x1d) + chr(0x1d) + chr(0x2a) + chr(0x06) + chr(0x1c) + chr(0x5a) + chr(0x5c) + chr(0x55) + chr(0x40) + chr(0x3a) + chr(0x5e) + chr(0x52) + chr(0x0c) + chr(0x01) + chr(0x42) + chr(0x57) + chr(0x59) + chr(0x0a) + chr(0x14)

  
flag = str_xor(flag_enc, 'enkidu')
  print('That is correct! Here\'s your flag: ' + flag)

```

Ah, the last line is indented, and in python that's a big deal. Let's get rid of the indent and run the script again.

```

┌─[slavetomints@parrot]─[~]
└──╼ $python fixme1.py 
That is correct! Here's your flag: picoCTF{1nd3nt1ty_cr1515_09ee727a}
```

FLAG: `picoCTF{1nd3nt1ty_cr1515_09ee727a}`
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEwMTEwNjk5Nl19
-->