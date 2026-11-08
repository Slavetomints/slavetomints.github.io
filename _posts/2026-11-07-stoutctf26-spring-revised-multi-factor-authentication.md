---
title: Revised Multi-Factor Authentication
date: 2026-11-07
categories: [Capture The Flags, StoutCTF 2026 Spring]
tags: [ctf, stoutctf 2026 spring, reverse engineering, writeups, challenges I created]
description: StoutCTF 2026 Spring Revised Multi-Factor Authentication Challenge
---


> Challenge description:
>
> Okay, the MFA should have been fixed this time...
{: .prompt-info }

This is the follow up to [Multi-Factor Authentication](https://slavetomints.com/posts/stoutctf26-spring-multi-factor-authentication/), so let's see how much better it got.

```terminal
❯ ./main
Enter value: 1000
```

Hm, not even an `Incorrect!` this time. It just exits. Let's see what `Ghidra` thinks, and following `entry` like last time gets us to `main`.

```c
undefined8 main(void)

{
  long in_FS_OFFSET;
  undefined4 value;
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  printf("Enter value: ");
  __isoc23_scanf(&DAT_00102012,&value);
  check_value(value);
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 0;
}
```

So it reads a value, and then hands it off to a function I've named `check_value`. Let's look at that.

```c
void check_value(uint value)

{
  uint countdown;
  int i;
  int j;
  int k;
  int l;
  
  if (-1 < (int)value) {
    if ((int)value < 0x3e9) {
      countdown = value;
      if ((int)value < 0x1f5) {
        if (200 < (int)value) {
          for (i = 0; i < 10; i = i + 1) {
            for (j = 0; j < 5; j = j + 1) {
              if (i == j) {
                if (value == 0x539) {
                  win(0x539);
                }
                else if ((value & 1) == 0) {
                  FUN_001012b0(value);
                }
                for (k = 0; k < 3; k = k + 1) {
                  for (l = 0; l < 2; l = l + 1) {
                    if (k == l) {
                      FUN_00101264(value);
                    }
                  }
                }
              }
            }
          }
        }
      }
      else {
        for (; 0 < (int)countdown; countdown = countdown - 1) {
          if (countdown == 9999) {
            FUN_00101246(9999);
          }
        }
      }
    }
    else {
      if ((((int)value % 7 == 0) && ((int)value % 0xbf == 0)) && (value == 0x539)) {
        win(0x539);
      }
      if ((int)value % 5 == 0) {
        FUN_00101293(value);
      }
      if ((int)value % 7 == 0) {
        FUN_001012ed(value);
      }
      else if ((int)value % 0xb == 0) {
        FUN_00101201(value);
      }
    }
  }
  return;
}
```

Well that's a mess. There's also about 30 tiny functions in this binary that get called from here, or don't get called at all. Most of them look like this:

```c
int FUN_00101389(int param_1)

{
  return param_1 + -0x1e;
}
```

They do a little bit of math, and then nothing happens with the result, so we can ignore them. Rather than go through this from the top, let's work backwards. We're looking for whatever decrypts the flag, and only one of these functions stands out from the rest, so I named it `win`.

```c
undefined8 win(void)

{
  decrypt_flag();
  return 1;
}
```

Instead of doing math, it calls a function I named `decrypt_flag`, which is the big function that has all the encrypted data in it. So that's our target. It gets called in two places in that mess above, so let's check both.

## The Fake Path

The first spot is deep in those nested loops:

```c
if (value == 0x539) {
  win(0x539);
}
```

So the password needs to be `0x539`, or `1337`, because of course it is. But look at how we'd get there. To reach this code the value has to be less than `0x1f5`, which is 501. There's no way for `1337` to be less than `501`, so this code can never run. All those loops are just there to look scary.

## The Real Path

So let's look at the other spot:

```c
if ((((int)value % 7 == 0) && ((int)value % 0xbf == 0)) && (value == 0x539)) {
  win(0x539);
}
```

This one is in the `else` of the check for `(int)value < 0x3e9`, so our value needs to be at least 1001. `1337` is good there. Then it has three more checks:

- It has to be divisible by 7
- It has to be divisible by `0xbf`, which is 191
- It has to be `0x539`

The last one is all that really matters, and the other two are there to make you second guess yourself. They're true anyways, since `7 * 191 = 1337`.

```terminal
❯ ./main
Enter value: 1337
STOUTCTF{bJgmJ8ID106VVesrL38BXR34PXOdBOB0}
```

FLAG: `STOUTCTF{bJgmJ8ID106VVesrL38BXR34PXOdBOB0}`
