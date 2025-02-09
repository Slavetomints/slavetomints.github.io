# PW Crack 1

Challenge description:

> Can you crack the password to get the flag?

For this challenge we are presented with a python file to decrypt the encrypted flag file. Lets take a loot at the python.

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


flag_enc = open('level1.flag.txt.enc', 'rb').read()



def level_1_pw_check():
    user_pw = input("Please enter correct password for flag: ")
    if( user_pw == "1e1a"):
        print("Welcome back... your flag, user:")
        decryption = str_xor(flag_enc.decode(), user_pw)
        print(decryption)
        return
    print("That password is incorrect")



level_1_pw_check()

```

The most interesting thing to see is that the program asks for a password, and that password is stored right here in the source code. Lets copy the password that is saved in the variable `user_pw` as the string `1e1a`. Let's run the python script with that password in mind.

```

┌─[slavetomints@parrot]─[~]
└──╼ $python level1.py 
Please enter correct password for flag: 1e1a
Welcome back... your flag, user:
picoCTF{545h_r1ng1ng_fa343060}
```

FLAG: `picoCTF{545h_r1ng1ng_fa343060}`
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjExMTc4ODU5LDIwNDQ0MDAxOTFdfQ==
-->