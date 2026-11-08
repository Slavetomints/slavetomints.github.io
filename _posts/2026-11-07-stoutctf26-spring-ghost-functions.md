---
title: Ghost Functions
date: 2026-11-07
categories: [Capture The Flags, StoutCTF 2026 Spring]
tags: [ctf, stoutctf 2026 spring, reverse engineering, writeups, challenges I created]
description: StoutCTF 2026 Spring Ghost Functions Challenge
---


> Challenge description:
>
> It seems like theres something missing in this program...
{: .prompt-info }

Alright, let's run it and see just how much is missing.

```terminal
❯ ./main
Theres something missing here.......
```

Yeah, that's a lot of missing. No input, no prompt, nothing. Let's see if `file` has anything to tell us.

```terminal
❯ file main
main: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=109a6a3d12ae50ef7fb1ec2848f76908568f2e8d, for GNU/Linux 4.4.0, stripped
```

The part we care about is at the very end, `stripped`. That means all the function names have been removed from the binary, so we don't get to look for something helpful like `print_flag()`. If you run `strings` on it, the only interesting thing you'll find is the message we already saw, so the flag isn't just sitting around in plaintext either.

Let's pop it into `Ghidra` and see what's actually in there.

## Finding main

With no symbols, `Ghidra` can't tell us which function is `main`, and it names everything after its address instead. Thankfully, we can always find it from the `entry` function, since the first thing a program does is hand `main` over to `__libc_start_main`.

```c
void processEntry entry(undefined8 param_1,undefined8 param_2)

{
  undefined1 auStack_8 [8];
  
  (*(code *)PTR___libc_start_main_00103fc0)
            (FUN_00101159,param_2,&stack0x00000008,0,0,param_1,auStack_8);
  do {
                    /* WARNING: Do nothing block with infinite loop */
  } while( true );
}
```

That first argument is the one we want, so `FUN_00101159` is our `main`. Let's rename it and take a look.

```c
undefined8 main(void)

{
  printf("Theres something missing here.......");
  return 0;
}
```

Well, that lines up with what we saw when we ran it. It prints the message and then leaves. So where's the flag?

## Finding the Ghost

Here's the thing about compilers, they'll happily leave a function in your binary even if nothing ever calls it. And if we look at the very next function in the binary, this is what we find (with some renaming, so we can actually read it):

```c
void ghost_function(void)

{
  long in_FS_OFFSET;
  int i;
  byte enc_flag [56];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  enc_flag[0] = 0xfc;
  enc_flag[1] = 0xfb;
  enc_flag[2] = 0xe0;
  enc_flag[3] = 0xfa;
  enc_flag[4] = 0xfb;
  enc_flag[5] = 0xec;
  enc_flag[6] = 0xfb;
  enc_flag[7] = 0xe9;
  enc_flag[8] = 0xd4;
  enc_flag[9] = 0xd8;
  enc_flag[10] = 0xf5;
  enc_flag[0xb] = 0x9d;
  enc_flag[0xc] = 0xd8;
  enc_flag[0xd] = 0xe6;
  enc_flag[0xe] = 0xc2;
  enc_flag[0xf] = 0xd9;
  enc_flag[0x10] = 0xe1;
  enc_flag[0x11] = 0xda;
  enc_flag[0x12] = 0xdc;
  enc_flag[0x13] = 0xea;
  enc_flag[0x14] = 0xed;
  enc_flag[0x15] = 0xdd;
  enc_flag[0x16] = 0xce;
  enc_flag[0x17] = 0xd6;
  enc_flag[0x18] = 0xeb;
  enc_flag[0x19] = 0xdf;
  enc_flag[0x1a] = 0xee;
  enc_flag[0x1b] = 0x9d;
  enc_flag[0x1c] = 0x9c;
  enc_flag[0x1d] = 0xe9;
  enc_flag[0x1e] = 0xe4;
  enc_flag[0x1f] = 0xdc;
  enc_flag[0x20] = 0xc0;
  enc_flag[0x21] = 0xf8;
  enc_flag[0x22] = 0xfb;
  enc_flag[0x23] = 0xdd;
  enc_flag[0x24] = 0xeb;
  enc_flag[0x25] = 0xe8;
  enc_flag[0x26] = 0xf5;
  enc_flag[0x27] = 0xcc;
  enc_flag[0x28] = 200;
  enc_flag[0x29] = 0xd2;
  for (i = 0; i < 0x2a; i = i + 1) {
    enc_flag[i] = enc_flag[i] ^ 0xaf;
  }
  puts((char *)enc_flag);
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}
```

There's our ghost! `main` never calls this function, which is why we never see it do anything, but it's still sitting in the binary waiting for someone to find it.

Let's break down what it does. It's pretty simple, despite how long it looks:

1. It loads 42 bytes (`0x2a`) into an array, one at a time.
2. It loops over all of them and `XOR`s each one with `0xaf`.
3. It prints the result with `puts`.

The stuff with `in_FS_OFFSET` at the top and bottom is just a stack canary that the compiler added, so we can ignore it.

So this looks like single-byte `XOR`, and the key is right there in the code. And since `XOR` undoes itself when you use the same key, all we need to do is the exact same thing the function would have done.

## Decoding It

We don't need to write anything for this one, so let's bring out `CyberChef`. First we need to grab all the bytes in order, and there's one small thing to watch out for. Look at `enc_flag[0x28]`. Every other byte is written in hex, but `Ghidra` decided to show that one as `200`, which is `0xc8` in hex. If you copy that one wrong your flag will have a bad character near the end.

That gives us:

`fcfbe0fafbecfbe9d4d8f59dd8e6c2d9e1dadceaedddced6ebdfee9d9ce9e4dcc0f8fbddebe8f5ccc8d2`

Now throw that into the input, and use a `From Hex` block followed by an `XOR` block, with the key set to `af` and the key type set to `Hex`.

And out comes:

`STOUTCTF{wZ2wImvNusEBrayDpA23FKsoWTrDGZcg}`

## Bringing It Back to Life

Since I'm the one who made this, I have a copy of the program lying around that actually calls the function, so let's see what it would've looked like all along:

```terminal
❯ ./fixed
Theres something missing here.......STOUTCTF{wZ2wImvNusEBrayDpA23FKsoWTrDGZcg}
```

FLAG: `STOUTCTF{wZ2wImvNusEBrayDpA23FKsoWTrDGZcg}`