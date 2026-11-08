---
title: Multi-Factor Authentication
date: 2026-11-07
categories: [Capture The Flags, StoutCTF 2026 Spring]
tags: [ctf, stoutctf 2026 spring, reverse engineering, writeups, challenges I created]
description: StoutCTF 2026 Spring Multi-Factor Authentication Challenge
---


> Challenge description:
>
> This program checks your password multiple times! That's... how MFA works, right?
{: .prompt-info }

No. No that's not how that works. Anyways, let's take a look.

```terminal
❯ ./main
Please enter the password
> 50
Incorrect!
```

Drats! Let's open it in `Ghidra` and see what's up. This one is stripped, so we need to start from `entry` to find `main`.

```c
void processEntry entry(undefined8 param_1,undefined8 param_2)

{
  undefined1 auStack_8 [8];
  
  (*(code *)PTR___libc_start_main_00103fc0)
            (FUN_00101169,param_2,&stack0x00000008,0,0,param_1,auStack_8);
  do {
                    /* WARNING: Do nothing block with infinite loop */
  } while( true );
}
```

The first thing passed into `__libc_start_main` is `main`, so `FUN_00101169` is the one we want. Let's rename it, along with a couple other things.

```c
undefined8 main(void)

{
  long in_FS_OFFSET;
  uint password;
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  printf("Please enter the password\n> ");
  __isoc23_scanf(&DAT_00102021,&password);
  if ((int)password < 0x65) {
    printf("Incorrect!");
  }
  else if ((int)password < 200) {
    if ((password & 1) == 0) {
      print_flag();
    }
    else {
      printf("Incorrect!");
    }
  }
  else {
    printf("Incorrect!");
  }
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 0;
}
```

So here's our "multi-factor authentication". The password is a number, and it needs to get through three checks to reach a function I named `print_flag`, since that looks like what we want to run.

- It can't be below `0x65`, which is 101, so it has to be at least 101
- It has to be less than 200
- `(password & 1) == 0`, so the lowest bit has to be 0, meaning it's an even number

That last one might look a little odd if you haven't seen it before. In binary, every odd number ends in a 1, and every even number ends in a 0. So `& 1` looks at only the last bit, which makes it a quick way to check if a number is even.

So there isn't even one password. Any even number from 102 to 198 will do. Let's use the first one.

```terminal
❯ ./main
Please enter the password
> 102
STOUTCTF{DI0J6nCNIPLXo7vRmNSq3ULJ3DQ7ba0D}
```

We didn't even need to figure out how `print_flag` decrypts the flag, since the program is happy to do it for us.

FLAG: `STOUTCTF{DI0J6nCNIPLXo7vRmNSq3ULJ3DQ7ba0D}`
