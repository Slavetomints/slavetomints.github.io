---
title: Wave a flag
date: 2025-07-08
categories: [Capture The Flags, picoCTF]
tags: [ctf, picoctf, misc, writeups]
description: picoCTF Wave a flag Challenge
---


> Challenge description:
>
>Can you invoke help flags for a tool or binary? [This program](https://mercury.picoctf.net/static/a14be2648c73e3cda5fc8490a2f476af/warm) has extraordinarily helpful information...
{: .prompt-info }

For this challenge we were given a 64-bit binary, so we'll pop it into `Ghidra` to see whats in the `main()` function.

```c
void main(int argc,char **argv)

{
  int iVar1;
  char **argv-local;
  int argc-local;
  
  if (argc == 1) {
    puts("Hello user! Pass me a -h to learn what I can do!");
  }
  else {
    iVar1 = strcmp(argv[1],"-h");
    if (iVar1 == 0) {
      puts(
          "Oh, help? I actually don\'t do much, but I do have this flag here: picoCTF{b1scu1ts_4nd_g r4vy_755f3544}"
          );
    }
    else {
      printf("I don\'t know what \'%s\' means! I do know what -h means though!\n",argv[1]);
    }
  }
  return;
}
```

And the flag's right there!

FLAG: `picoCTF{b1scu1ts_4nd_gr4vy_755f3544}`