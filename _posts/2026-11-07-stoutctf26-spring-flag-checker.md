---
title: Flag Checker
date: 2026-11-07
categories: [Capture The Flags, StoutCTF 2026 Spring]
tags: [ctf, stoutctf 2026 spring, reverse engineering, writeups, challenges I created]
description: StoutCTF 2026 Spring Flag Checker Challenge
---


> Challenge description:
>
> I wrote a program that checks if the flag you enetered was the correct one. Can you figure it out?
{: .prompt-info }

Alrighty, let's give it a shot.

```terminal
❯ ./main
What's the flag?
> STOUTCTF{please}
Incorrect, try again
```

Worth a try. Let's see if `strings` will do all the work for us.

```terminal
❯ strings main | grep STOUTCTF | head -3
STOUTCTFH
STOUTCTFH
STOUTCTFH
```

Hm, that's weird. The flag format is in there, but it's getting cut off. How many of these are there?

```terminal
❯ strings main | grep -c STOUTCTF
401
```

401! Well, that's not going to work. It looks like those strings are getting chopped up because they're built in pieces on the stack, instead of being stored whole somewhere, and even if we could read them, we'd have 401 flags to choose from. Let's open it in `Ghidra` instead. Thankfully this binary isn't stripped, so we get to keep all the function names.

```c
undefined8 main(void)

{
  int result;
  long in_FS_OFFSET;
  char input [48];
  char flag [56];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  fun_flags();
  printf("What\'s the flag?\n> ");
  __isoc23_scanf(&DAT_0010c018,input);
  builtin_strncpy(flag,"STOUTCTF{Hi2GZtWhAXAoEsotOtDoF94wN04Lm20Z}",0x2b);
  result = strcmp(input,flag);
  if (result == 0) {
    printf("Correct!");
  }
  else {
    printf("Incorrect, try again");
  }
  more_fun_flags();
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 0;
}
```

Okay, so this is the whole program. It runs `fun_flags()`, reads our input, and copies a flag into `flag`. Then it uses `strcmp` to compare our input to that flag. If they match, we're correct.

So what are `fun_flags()` and `more_fun_flags()` doing? If you click on them, the decompiler shows a basically empty function, which is weird. But if you look at the assembly, they're huge. `objdump -d` shows 1200 `movabs` instructions in each one, and `main` uses 6 of those to build its flag, so that's 200 flags per function. That's probably where 400 of our 401 flags came from. They get put on the stack and then never get used, so the decompiler just throws them out.

That leaves us with only one flag that the program actually compares against, so let's try it.

```terminal
❯ ./main
What's the flag?
> STOUTCTF{Hi2GZtWhAXAoEsotOtDoF94wN04Lm20Z}
Correct!
```

FLAG: `STOUTCTF{Hi2GZtWhAXAoEsotOtDoF94wN04Lm20Z}`
