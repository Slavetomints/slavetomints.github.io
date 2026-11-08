---
title: License Checker
date: 2026-11-07
categories: [Capture The Flags, StoutCTF 2026 Spring]
tags: [ctf, stoutctf 2026 spring, reverse engineering, writeups, challenges I created]
description: StoutCTF 2026 Spring License Checker Challenge
---


> Challenge description:
>
> I made a license checker! Is yours valid?
{: .prompt-info }

Alrighty, I don't think I have a license, but let's try anyways.

```terminal
❯ ./main
Please enter your license number
> 1234-5678-9012
Checking Part One...
Part One Failed
```

So it looks like there's multiple parts to it. Let's open it in `Ghidra`, and follow `entry` to get to `main`, since this one's stripped (check out [Ghost Functions](https://slavetomints.com/posts/stoutctf26-spring-ghost-functions/) if you haven't seen how). I've renamed things as I went, so it's easier to follow.

```c
undefined8 main(void)

{
  size_t sVar1;
  long in_FS_OFFSET;
  int section_num;
  char *token;
  char license [56];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  printf("Please enter your license number\n> ");
  fgets(license,0x32,stdin);
  sVar1 = strcspn(license,"\n");
  license[sVar1] = '\0';
  token = strtok(license,"-");
  section_num = 0;
  while (token != (char *)0x0) {
    section_num = section_num + 1;
    check_section(token,section_num);
    token = strtok((char *)0x0,"-");
  }
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 0;
}
```

It reads in our license, and then uses `strtok` to split it up on the dashes, passing each section to `check_section` along with which number section it's on.

```c
void check_section(undefined8 section,int section_num)

{
  if (section_num == 1) {
    check_part_one(section);
  }
  else if (section_num == 2) {
    check_part_two(section);
  }
  else if (section_num == 3) {
    check_part_three(section);
  }
  else {
    printf("An error has occurred");
  }
  return;
}
```

Okay, so there's three sections, and each one gets its own check. Let's go through them.

## Part One

```c
void check_part_one(char *section)

{
  int result;
  long in_FS_OFFSET;
  int i;
  char expected [4];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  puts("Checking Part One...");
  builtin_strncpy(expected,"MINT",4);
  for (i = 0; i < 4; i = i + 1) {
    section[i] = section[i] ^ 0x13;
  }
  result = strncmp(section,expected,4);
  if (result == 0) {
    puts("Part One OK");
    if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
      __stack_chk_fail();
    }
    return;
  }
  puts("Part One Failed");
                    /* WARNING: Subroutine does not return */
  exit(1);
}
```

It takes the first four characters, `XOR`s each with `0x13`, and checks if the result is `MINT`. Since `XOR` undoes itself, we can find the right input by doing the same thing to `MINT`.

- `M` is `0x4d`, and `0x4d ^ 0x13` is `0x5e`, which is `^`
- `I` is `0x49`, and `0x49 ^ 0x13` is `0x5a`, which is `Z`
- `N` is `0x4e`, and `0x4e ^ 0x13` is `0x5d`, which is `]`
- `T` is `0x54`, and `0x54 ^ 0x13` is `0x47`, which is `G`

So part one of our license is `^Z]G`.

## Part Two

```c
void check_part_two(long section)

{
  int total;
  int i;
  
  puts("Checking Part Two...");
  total = 0;
  for (i = 0; i < 4; i = i + 1) {
    total = total + (i + 1) * (*(char *)(section + i) + -0x41);
  }
  if (total == 0x96) {
    puts("Part Two OK");
    return;
  }
  puts("Part Two Failed");
                    /* WARNING: Subroutine does not return */
  exit(1);
}
```

This one has a bit more math. For each of the four characters it subtracts `0x41` (that's `A`), multiplies that by the character's position, and adds it to a running total. The total needs to hit `0x96`, which is 150.

If we make all four characters the same, then we can simplify this quite a bit. The positions are 1, 2, 3, and 4, which add up to 10, so we need a character where `(character - 'A') * 10 = 150`. That means our character is 15 letters after `A`, which is `P`.

So part two is `PPPP`. There's a ton of other answers that work too, but this one is the easiest to figure out.

## Part Three

```c
void check_part_three(void)

{
  puts("Checking Part Three...");
  printf("You thought you could just get it? Nope ;)");
  sleep(50000);
  puts("ACCESS GRANTED");
  print_flag();
  return;
}
```

Heyyy, there's no check on this one! As long as there's a third section, then it'll work, so we can use whatever we want. And then it just... waits 50,000 seconds, which is almost 14 hours, before giving us the flag. Yeah, that's me. Sorry about that.

Now, you could just let it run overnight, but I'm guessing the CTF would be over by the time you got your points. So let's get rid of that `sleep`.

## Skipping the Nap

We'll use `gdb` for this. The plan is to set a breakpoint on `sleep`, and when we hit it, make it return immediately without doing anything. Even though the binary is stripped, `sleep` comes from `libc`, so `gdb` can still find it by name.

```terminal
❯ gdb ./main
gef➤  break sleep
Breakpoint 1 at 0x10c0
gef➤  run
Please enter your license number
> ^Z]G-PPPP-AAAA
Checking Part One...
Part One OK
Checking Part Two...
Part Two OK
Checking Part Three...

Breakpoint 1, 0x00007ffff7d038b9 in sleep () from /usr/lib/libc.so.6

---cut for brevity---

gef➤  return
#0  0x0000555555555483 in ?? ()
gef➤  continue
Continuing.
You thought you could just get it? Nope ;)ACCESS GRANTED
STOUTCTF{rOI0UAcUJSy014H0ZwkISRO2bFFQsoGq}
[Inferior 1 (process 362647) exited normally]
```

FLAG: `STOUTCTF{rOI0UAcUJSy014H0ZwkISRO2bFFQsoGq}`
