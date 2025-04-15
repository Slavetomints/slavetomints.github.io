---
title: Secure Bank
date: 2024-12-23 19:47:00 +/-0600
categories: [Capture The Flags, 1337Up Live 2024]
tags: [ctf, 1337up, reverse engineering, writeups]
---

Challenge description:

> Can you crack the bank?


Well, I sure hope so, lets take a look at it.

```terminal
┌─[slavetomints@parrot]─[~/CTFS/1337UP2024/rev/secure_bank]
└──╼ $ nc securebank.ctf.intigriti.io 1335 
****************************************
*         Welcome to SecureBank        *
*    Your trusted partner in security  *
****************************************

========================================
=   SecureBank Superadmin Login System =
========================================

Enter superadmin PIN: 1234
Access Denied! Incorrect PIN.
```

Drats! Well, lets take a look at the provided executable in Ghidra and see what pops up. 

```c
bool main(void)

{
  undefined4 2fa_input;
  int superadmin_pin;
  undefined4 2fa_code;
  
  banner();
  login_message();
  printf("Enter superadmin PIN: ");
  __isoc99_scanf(&DAT_001021ea,&superadmin_pin);
  if (superadmin_pin == 0x539) {
    2fa_code = generate_2fa_code(0x539);
    printf("Enter your 2FA code: ");
    __isoc99_scanf(&DAT_001021ea,&2fa_input);
    validate_2fa_code(2fa_input,2fa_code);
  }
  else {
    puts("Access Denied! Incorrect PIN.");
  }
  return superadmin_pin != 0x539;
}
```

Looks like the master password is `1337` (`0x539` = `1337` in decimal), should've guessed, but what about the 2FA code? lets check that out.

```c
uint generate_2fa_code(int input)

{
  int iterator;
  uint final_code;
  uint code;
  
  final_code = input * 0xbeef;
  code = final_code;
  for (iterator = 0; iterator < 10; iterator = iterator + 1) {
    code = obscure_key(code);
    final_code = ((final_code ^ code) << 5 | (final_code ^ code) >> 0x1b) +
                 (code << ((char)iterator + (char)(iterator / 7) * -7 & 0x1fU) ^
                 code >> ((char)iterator + (char)(iterator / 5) * -5 & 0x1fU));
  }
  return final_code & 0xffffff;
}
```

So this is going to take in the input of `1337` and first multiply it by `0xbeef`, and assign the value of `1337 * 48879`, which is `65351223`. It then copies that to `code`, which is going to transform it a bit more. 

In order to go over the loop, we need to see the `obscure_key()` function, and that is:
```c
uint obscure_key(uint param_1)

{
  return ((param_1 ^ 0xa5a5a5a5) << 3 | (param_1 ^ 0xa5a5a5a5) >> 0x1d) * 0x1337 ^ 0x5a5a5a5a;
}
```

Lets rewrite this all in ruby

```ruby
def generate_2fa_code(input)
    final_code = (input * 0xbeef) & 0xFFFFFFFF
    code = final_code
    (0..9).each do |num|
      code = obscure_key(code)
      shift_left = (num + (num / 7) * -7) & 0x1f
      shift_right = (num + (num / 5) * -5) & 0x1f
      final_code = (((final_code ^ code) << 5 | (final_code ^ code) >> 27) + ((code << shift_left) ^ (code >> shift_right))) & 0xFFFFFFFF
      puts (final_code & 0xffffff)
    end
end

def obscure_key(code)
    (((code ^ 0xa5a5a5a5) << 3 | (code ^ 0xa5a5a5a5) >> 29) * 0x1337 ^ 0x5a5a5a5a) & 0xFFFFFFFF
end

generate_2fa_code(0x539)

```

And run the program

```terminal
┌─[slavetomints@parrot]─[~/CTFS/1337UP2024/rev/secure_bank]
└──╼ $ruby bank.rb 
3206601
7033701
15797056
8440272
12671376
16406220
8585348
10125287
16527349
5670688
```

Alright! So the 2FA code is now right there, so lets go connect into the bank!

![money!](/assets/img/1337up-2024/secure-bank/image1.png)

FLAG: `INTIGRITI{pfff7_wh47_2f4?!}`
