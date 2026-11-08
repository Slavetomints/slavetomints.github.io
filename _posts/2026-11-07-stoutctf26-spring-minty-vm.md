---
title: Minty VM
date: 2026-05-04
categories: [Capture The Flags, StoutCTF 2026 Spring]
tags: [ctf, stoutctf 2026 spring, reverse engineering, writeups, challenges I created]
description: StoutCTF 2026 Spring Minty VM Challenge
---


> Challenge description:
>
> Can you find the correct state for this VM?
{: .prompt-info }

Oh boy, a VM! Let's see what we have to work with.

```terminal
❯ ./main
== Minty VM ==
program> 

input> 

--- VM HALT ---
tape[0] = 0
tape[1] = 0
tape[2] = 0
checksum = 12345678
invalid state
```

Okay, so it takes in a program and an input, and runs it. Then it gives us the state of the machine, which is three spots on a `tape`, and a `checksum`. Our empty program isn't a valid state, so let's find out what is.

This one's written in Rust, so `Ghidra` is going to give us a whole lot of junk to go through, but `main::main` is the only function we care about. All the VM's logic got inlined right into it, and the part of the decompilation where it runs our program is where we'll start.

```c
    checksum[0] = 0x12345678;
    pos = ZEXT816(0);
    local_140 = uVar19;
    if (program_len != 0) {
      pc = 0;
      do {
        auVar25 = pos;
        uVar8 = pos._0_4_;
        switch(*(undefined1 *)(program + pc)) {
        case 0x23:
          if (0x3f < (ulong)pos._0_8_) goto LAB_00117941;
          checksum[0] = (uint)(byte)tape[pos._0_8_] + checksum[0] * 0x1f;
          break;
        case 0x2b:
          if (0x3f < (ulong)pos._0_8_) goto LAB_0011792f;
          tape[pos._0_8_] = tape[pos._0_8_] + '\x01';
```

So this is the VM itself. It's a loop with a `switch` on each character of our program. After renaming what I could, `tape` is the tape, `pos` is our position on it, and `checksum[0]` is the checksum, which starts at `0x12345678`. Let's convert these cases over to characters. Altogether, the switch has cases for these:

| Hex | Character | What it does |
| -- | -- | -- |
| 0x3e | `>` | Move right on the tape |
| 0x3c | `<` | Move left on the tape |
| 0x2b | `+` | Add 1 to the current cell |
| 0x2d | `-` | Subtract 1 from the current cell |
| 0x2c | `,` | Read a byte of input into the current cell |
| 0x23 | `#` | Update the checksum using the current cell |

If you've seen `Brainfuck` before, this might look pretty familiar. It's a very similar idea, except for that `#`, which is our own special instruction. Let's look at what it does again:

```c
checksum[0] = (uint)(byte)tape[pos._0_8_] + checksum[0] * 0x1f;
```

So `checksum = (checksum * 31) + current cell`.

Next we need to find out what state it wants, which is further down in the function:

```c
    if ((((tape[0] != '*') || (tape[1] != '\x13')) || (tape_2[0] != '/')) ||
       (checksum[0] != 0x789a7688)) {
      local_198 = &PTR_s_invalid_state_00159948;
```

If any of these aren't what it's looking for, then we get `invalid state`. `tape_2` is just `Ghidra` splitting off the third cell for some reason. So we need:

- `tape[0]` has to be `'*'`, which is 42
- `tape[1]` has to be `0x13`, which is 19
- `tape[2]` has to be `'/'`, which is 47
- `checksum` has to be `0x789a7688`

## Setting the Tape

This part's easy, we need 42 `+`s, a `>` to move over, 19 `+`s, another `>`, and then 47 `+`s.

```terminal
❯ ./main
== Minty VM ==
program> 
++++++++++++++++++++++++++++++++++++++++++>+++++++++++++++++++>+++++++++++++++++++++++++++++++++++++++++++++++
input> 

--- VM HALT ---
tape[0] = 42
tape[1] = 19
tape[2] = 47
checksum = 12345678
invalid state
```

Awesome! The tape's good, so now we just need the checksum.

## Fixing the Checksum

So how do we turn `0x12345678` into `0x789a7688`? Each `#` multiplies the checksum by 31, then adds whatever's in the current cell. And the checksum is 32 bits, so anything bigger wraps back around.

To keep things simple, let's only do `#` on empty cells, so that the multiplication is the only thing changing it. Everything past `tape[2]` should still be 0, so we can move over one spot and do it there, without touching the three cells we need. Let's add `>#` to the end of our program and see what that does.

```terminal
❯ ./main
== Minty VM ==
program>
++++++++++++++++++++++++++++++++++++++++++>+++++++++++++++++++>+++++++++++++++++++++++++++++++++++++++++++++++>#
input>

--- VM HALT ---
tape[0] = 42
tape[1] = 19
tape[2] = 47
checksum = 34567888
invalid state
```

Hm, that's not it, but `12345678` turned into `34567888`, which is a pretty interesting looking number. We want something that starts with `78`, so let's do it again.

```terminal
❯ ./main
== Minty VM ==
program>
++++++++++++++++++++++++++++++++++++++++++>+++++++++++++++++++>+++++++++++++++++++++++++++++++++++++++++++++++>#>#
input>

--- VM HALT ---
tape[0] = 42
tape[1] = 19
tape[2] = 47
checksum = 56789878
invalid state
```

Okay, now it's `56789878`. It seems like it's moving up each time, so let's try one more.

```terminal
❯ ./main
== Minty VM ==
program>
++++++++++++++++++++++++++++++++++++++++++>+++++++++++++++++++>+++++++++++++++++++++++++++++++++++++++++++++++>#>#>#
input>

--- VM HALT ---
tape[0] = 42
tape[1] = 19
tape[2] = 47
checksum = 789a7688
STOUTCTF{4BA9NrO3p8Trcn1Sjf2e2oQhWKIHilVX}
```

And that's the right state!

FLAG: `STOUTCTF{4BA9NrO3p8Trcn1Sjf2e2oQhWKIHilVX}`
