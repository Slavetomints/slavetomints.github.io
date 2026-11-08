---
title: Deep Cut
date: 2026-11-07
categories: [Capture The Flags, StoutCTF 2026 Spring]
tags: [ctf, stoutctf 2026 spring, reverse engineering, writeups, challenges I created]
description: StoutCTF 2026 Spring Deep Cut Challenge
---


> Challenge description:
>
> Only true old people get this reference.
{: .prompt-info }

Let's see what this reference is then.

```terminal
❯ ./main
What's 9 + 10?
```

If you know, you know. For those of you who are too young to have been on Vine (I can't believe that's something I have to say), there's a very famous video where a kid gets asked this exact question, and the answer is `21`. So let's try that.

```terminal
❯ ./main
What's 9 + 10?
21
```

Nothing. Well, let's try the math answer.

```terminal
❯ ./main
What's 9 + 10?
19
```

Also nothing. Okay, let's throw it into `Ghidra`. It's stripped, so we'll follow `entry` to find `main`, same as in [Ghost Functions](https://slavetomints.com/posts/stoutctf26-spring-ghost-functions/), and I've renamed a few things so it's easier to read.

```c
undefined8 main(void)

{
  ostream *this;
  long in_FS_OFFSET;
  undefined1 local_55;
  int value;
  undefined1 *local_50;
  string input [40];
  long local_20;
  
  local_20 = *(long *)(in_FS_OFFSET + 0x28);
  local_50 = &local_55;
  FUN_00102a0c(input,&DAT_0010400d,&local_55);
  FUN_00102c58(&local_55);
  this = std::operator<<((ostream *)std::cout,"What\'s 9 + 10?");
  std::ostream::operator<<
            (this,(_func_ostream_ptr_ostream_ptr *)PTR_endl<char,std_char_traits<char>>_00105fb8);
  std::operator>>((istream *)std::cin,input);
  value = stoi(input,0,0x10);
  if (value == 0xdd) {
    print_flag();
  }
  std::__cxx11::string::~string(input);
  if (local_20 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 0;
}
```

The C++ makes this look busier than it is, so let's only look at the parts that matter.

```c
std::operator>>((istream *)std::cin,input);
value = stoi(input,0,0x10);
if (value == 0xdd) {
  print_flag();
}
```

First, it reads our input as a string. Then it hands it to a function with `0x10` as the last argument, which is 16 in decimal. I named it `stoi`, since if you click into it, it calls `strtol`, and there's a `stoi` string in the binary. That looks like `std::stoi` to me, which turns a string into an integer, and that last argument is the base to read it in. So it looks like our input is being read as hexadecimal!

That's why `21` didn't work. It got read as `0x21`, which is 33.

And then what's it being compared to? `0xdd`. So we don't have to do any converting at all, we can just type it in exactly how it's shown.

```terminal
❯ ./main
What's 9 + 10?
dd
STOUTCTF{CXCnh3lbpsBwVR8gwBFHId9HczbE1xIN}
```

So what does `0xdd` have to do with anything? It's 221, and the original source compares `result - 200` to `21`. The compiler simplified that down to `0xdd` for us, which kind of ruins my joke, but at least the answer to 9 + 10 is still technically 21.

FLAG: `STOUTCTF{CXCnh3lbpsBwVR8gwBFHId9HczbE1xIN}`
