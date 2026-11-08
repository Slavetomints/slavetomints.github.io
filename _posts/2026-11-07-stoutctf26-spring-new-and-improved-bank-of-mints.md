---
title: New and Improved Bank of Mints
date: 2026-11-07
categories: [Capture The Flags, StoutCTF 2026 Spring]
tags: [ctf, stoutctf 2026 spring, reverse engineering, writeups, challenges I created]
description: StoutCTF 2026 Spring New and Improved Bank of Mints Challenge
---


> Challenge description:
>
> After the SEC used Low Orbit Ion Cannon on our last bank, we had to close our doors. However, we opened a new one. Can you prove that you're a member?
{: .prompt-info }

For this one we have the program, and a file named `bee-movie.txt`. Let's run the program.

```terminal
❯ ./main
Hi! Welcome back to the Bank of Mints
We have this cool newsletter to show you, but only members can view it
All members got a key, what is your key?
Enter key (3 integers): 1 2 3
-1�11�,"�Cz�
```

Well, that's garbage, and it's coming out really slowly, one character at a time. Is the text file any better?

```terminal
❯ xxd bee-movie.txt | head -4
00000000: 2c33 d030 33d6 2d20 b842 7888 4a30 ee03  ,3.03.- .Bx.J0..
00000010: 11e9 4201 e110 17e7 0c52 f50b 06ea 4206  ..B......R....B.
00000020: e71a 06b9 4226 ea07 52f1 0d07 ec06 52ed  ....B&..R.....R.
00000030: 0452 e017 08f8 0b1c e542 10e7 0701 a201  .R.......B......
```

Nope, despite the `.txt` it's encrypted. Let's find out how by throwing the program into `Ghidra`. This one's stripped and in C++, so following `entry` gets us to a pretty long `main`, but here's the part we care about, after some renaming.

```c
    i = 0;
    while( true ) {
      size = vec_size(file_data);
      if (size <= i) break;
      cur_byte = (byte *)vec_at(file_data,i);
      *cur_byte = key[i % 3] ^ *cur_byte;
      i = i + 1;
    }
    j = 0;
    while( true ) {
      size = vec_size(file_data);
      if (size <= j) break;
      cur_char = (uchar *)vec_at(file_data,j);
      poVar2 = std::operator<<((ostream *)std::cout,*cur_char);
      std::ostream::operator<<
                (poVar2,(_func_ostream_ptr_ostream_ptr *)
                        PTR_flush<char,std_char_traits<char>>_00106fc8);
      delay_ms = 100;
      milliseconds(&delay,&delay_ms);
      sleep_for(&delay);
      j = j + 1;
    }
```

There are two loops here. The first one is the decryption:

```c
*cur_byte = key[i % 3] ^ *cur_byte;
```

Each byte in the file gets `XOR`ed with one of the three bytes in our key, and `% 3` makes it loop through them over and over. So it's a repeating 3 byte `XOR`. That lines up with asking for three integers.

The second loop prints the result one character at a time, and waits 100 milliseconds between each one. This means that even with the right key, we'd have to sit and wait for it. The key isn't stored anywhere in the program either, since it only uses whatever we give it. There's nothing to compare it to, so it's never going to tell us if we're wrong.

So we need to get the key from the encrypted file itself.

## Finding the Key

The problem with a short repeating key is that every third byte was encrypted with the same key byte, so really this is three separate single-byte `XOR`s. And `XOR` doesn't hide how often something shows up. If the same character shows up a lot in the plaintext, then the same byte shows up a lot in the ciphertext.

And what's the most common character in English text? It's the space, `0x20`. So if we find the most common byte for each of the three key positions, it's probably a space that's been encrypted.

Let's use some good old command line tools for this. `xxd -p -c 3` will print the file in chunks of 3 bytes, `cut` can grab one position out of each chunk, and then `sort` and `uniq -c` count them up for us.

```terminal
❯ xxd -p -c 3 bee-movie.txt | cut -c1-2 | sort | uniq -c | sort -rn | head -3
   5118 42
   2232 68
   2149 07
❯ xxd -p -c 3 bee-movie.txt | cut -c3-4 | sort | uniq -c | sort -rn | head -3
   5053 52
   2259 78
   2231 17
❯ xxd -p -c 3 bee-movie.txt | cut -c5-6 | sort | uniq -c | sort -rn | head -3
   5205 a2
   2242 88
   2096 e7
```

Look at that, there's a clear winner in each position. Now since `ciphertext = plaintext ^ key`, then `key = ciphertext ^ plaintext`. Let's `XOR` each one with `0x20`.

- Position 1: `0x42 ^ 0x20` is `0x62`, which is 98
- Position 2: `0x52 ^ 0x20` is `0x72`, which is 114
- Position 3: `0xa2 ^ 0x20` is `0x82`, which is 130

So our key should be `98 114 130`. Let's try it!

```terminal
❯ ./main
Hi! Welcome back to the Bank of Mints
We have this cool newsletter to show you, but only members can view it
All members got a key, what is your key?
Enter key (3 integers): 98 114 130
NARRATOR: 

(Black screen with text; The
```

Hey, that's actual English! Now, about that wait. This file is 91,351 bytes, and at 100 milliseconds each, reading the whole thing would take over two and a half hours. I'm not sitting through that, especially since it turns out that this newsletter is the entire script of the Bee Movie.

So let's use `CyberChef` instead. Load up `bee-movie.txt` as the input, add an `XOR` block with the key `627282` and the key type set to `Hex`, and then save the output to a file. Now we don't have to wait, and we can search it.

```terminal
❯ grep -n STOUTCTF bee-movie-decrypted.txt
1155:STOUTCTF{fyi695dtQR8AbKjqwdRBpceCfwTyD6kH}
```

There it is, right in the middle of the Bee Movie. If you did wait for the program to print it, you'd have been there for about 24 minutes.

Ya like jazz?

FLAG: `STOUTCTF{fyi695dtQR8AbKjqwdRBpceCfwTyD6kH}`
