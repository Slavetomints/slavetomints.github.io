# PW Crack 2

Challenge description:

> Can you crack the password to get the flag?

Similar to the precursor challenge to this one (PW Crack 1), we are given a python script to decipher the encoded flag. Upon analysis of the python script we see a similar vulnerabilitiy to the one that we previously had come across. Let's take a look at the code now.

```python

### THIS FUNCTION WILL NOT HELP YOU FIND THE FLAG --LT ########################
def str_xor(secret, key):
    #extend key to secret length
    new_key = key
    i = 0
    while len(new_key) < len(secret):
        new_key = new_key + key[i]
        i = (i + 1) % len(key)        
    return "".join([chr(ord(secret_c) ^ ord(new_key_c)) for (secret_c,new_key_c) in zip(secret,new_key)])
###############################################################################

flag_enc = open('level2.flag.txt.enc', 'rb').read()



def level_2_pw_check():
    user_pw = input("Please enter correct password for flag: ")
    if( user_pw == chr(0x34) + chr(0x65) + chr(0x63) + chr(0x39) ):
        print("Welcome back... your flag, user:")
        decryption = str_xor(flag_enc.decode(), user_pw)
        print(decryption)
        return
    print("That password is incorrect")



level_2_pw_check()
```

Once again, we have user input being saved into `user_pw`, and it is being checked against some obfuscated password. In python, the `chr()` method will turn the hexadecimal code for a character into its Unicode/ASCII equivalent. With this we can easily decrypt the password with a single `print()` call.

```

┌─[slavetomints@parrot]─[~]
└──╼ $python
Python 3.11.2 (main, Month Day Year, HH:MM:SS) [GCC 12.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> print(chr(0x34) + chr(0x65) + chr(0x63) + chr(0x39))
4ec9
```

And if we run the script with that password we'll get the following:

```

┌─[slavetomints@parrot]─[~/training/picoCTF/general-skills/pw-crack-2]
└──╼ $python level2.py 
Please enter correct password for flag: 4ec9
Welcome back... your flag, user:
picoCTF{tr45h_51ng1ng_9701e681}
```

FLAG: `picoCTF{tr45h_51ng1ng_9701e681}`
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjc0MTYxNzkyXX0=
-->