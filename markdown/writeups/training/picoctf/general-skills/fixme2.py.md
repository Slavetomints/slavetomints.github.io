
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

This time it seems that an error when comparing the value of `flag`, lets take a look at the source.

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


flag_enc = chr(0x15) + chr(0x07) + chr(0x08) + chr(0x06) + chr(0x27) + chr(0x21) + chr(0x23) + chr(0x15) + chr(0x58) + chr(0x18) + chr(0x11) + chr(0x41) + chr(0x09) + chr(0x5f) + chr(0x1f) + chr(0x10) + chr(0x3b) + chr(0x1b) + chr(0x55) + chr(0x1a) + chr(0x34) + chr(0x5d) + chr(0x51) + chr(0x40) + chr(0x54) + chr(0x09) + chr(0x05) + chr(0x04) + chr(0x57) + chr(0x1b) + chr(0x11) + chr(0x31) + chr(0x5f) + chr(0x51) + chr(0x52) + chr(0x46) + chr(0x00) + chr(0x5f) + chr(0x5a) + chr(0x0b) + chr(0x19)

  
flag = str_xor(flag_enc, 'enkidu')

# Check that flag is not empty
if flag = "":
  print('String XOR encountered a problem, quitting.')
else:
  print('That is correct! Here\'s your flag: ' + flag)



```

Yep, when you're comparing two things you need to use two equals signs, else you are assigning the left hand the value of the right hand, and being the condition in the `if-else` block, that's sure to cause an error. Let's add in another equals sign and rerun it.

```

┌─[slavetomints@parrot]─[~]
└──╼ $python fixme2.py
That is correct! Here's your flag: picoCTF{3qu4l1ty_n0t_4551gnm3nt_4863e11b}

```

FLAG: `picoCTF{3qu4l1ty_n0t_4551gnm3nt_4863e11b}`
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1OTQ4OTc0NDYsLTEwMTEwNjk5Nl19
-->