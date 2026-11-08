---
title: This XOR That?
date: 2026-11-07
categories: [Capture The Flags, StoutCTF 2026 Spring]
tags: [ctf, stoutctf 2026 spring, reverse engineering, writeups, challenges I created]
description: StoutCTF 2026 Spring This XOR That? Challenge
---


> Challenge description:
>
> We found the encrypted flag, and the ecryptor program. Can you find the flag?
{: .prompt-info }

Okay, let's run it and see what we're given.

```terminal
❯ ./main
We have the flag, but its encrypted: LKPJK\KYdf{)^/GUowyTuO^.YsxYL~jZ&^P*,o|'Vb

You can enter in anything to have the same encryption applied to it
> A
^
```

So it hands us the encrypted flag, and then it'll encrypt whatever we want. Let's throw it into `Ghidra`, and thankfully it isn't stripped, so we even get the function names.

```c
undefined8 main(void)

{
  int result;
  long in_FS_OFFSET;
  char input [48];
  char enc_flag [56];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  builtin_strncpy(enc_flag,"LKPJK\\KYdf{)^/GUowyTuO^.YsxYL~jZ&^P*,o|\'Vb",0x2b);
  printf("We have the flag, but its encrypted: %s\n\n",enc_flag);
  printf("You can enter in anything to have the same encryption applied to it\n> ");
  __isoc23_scanf(&DAT_0010207f,input);
  result = strcmp(input,enc_flag);
  if (result == 0) {
    printf("\nYou cant enter that silly. That\'d be too easy.");
  }
  else {
    xor_str(input);
    printf("%s",input);
  }
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 0;
}
```

And here's the function that does the encrypting:

```c
void xor_str(byte *str)

{
  byte *cur;
  
  for (cur = str; *cur != 0; cur = cur + 1) {
    *cur = *cur ^ 0x1f;
  }
  return;
}
```

So it goes through the string one byte at a time, and `XOR`s each one with `0x1f`.

The nice thing about `XOR` is that it undoes itself. If you `XOR` something with a key, and then `XOR` it again with the same key, you get the original back. This means that this program isn't only the encryptor, it's also the decryptor! All we'd have to do is give it the encrypted flag.

Of course, I thought of that, which is what the `strcmp` in `main` is for.

```terminal
> LKPJK\KYdf{)^/GUowyTuO^.YsxYL~jZ&^P*,o|'Vb

You cant enter that silly. That'd be too easy.
```

Rude. However, that check only stops us if our input is an exact match. So what if we leave off the last character?

```terminal
> LKPJK\KYdf{)^/GUowyTuO^.YsxYL~jZ&^P*,o|'V
STOUTCTF{yd6A0XJphfKjPA1FlgFSauE9AO53pc8I
```

There we go! We can't enter the whole thing, but we got everything except the last character. And we already know what that one has to be, since every flag ends in a `}`. If you want to double check, `b` is `0x62`, and `0x62 ^ 0x1f` is `0x7d`, which is a `}`.

You could also skip the program altogether, and use `CyberChef`'s `XOR` block with `1f` as the key.

FLAG: `STOUTCTF{yd6A0XJphfKjPA1FlgFSauE9AO53pc8I}`
