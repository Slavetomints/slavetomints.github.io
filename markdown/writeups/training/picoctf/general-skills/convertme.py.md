# convertme.py

Challenge description:

> Run the Python script and convert the given number from decimal to binary to get the flag.

Alrighty, this one sounds super duper simple. Let's run the script and see the number that we get!

```

┌──[slavetomints@parrot]─[~]
└──╼ $python convertme.py 
If 44 is in decimal base, what is it in binary base?
Answer: 
```

Alright, lets quickly talk about how a binary number works.

| 256 | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|--|--|--|--|--|--|--|--|--|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

In this example, the binary number `000000` is equal to zero. This is because each consecutive zero is "valued" twice more than the one preceding it. To represent the number `10`, we need to turn enough of the `0`'s into `1`'s to make the value be `1`.


| 256 | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|--|--|--|--|--|--|--|--|--|
| 0 | 0 | 0 | 0 | 0 | 1 | 0 | 1 | 0 |

The `8` and `2` bits are flipped, and `8+2=10`, so `10` is represented in binary as `1010`. The easiest way to do this is to find the first number that is smaller than the number you are trying to find, flip it to a `1`, and subtract it from your numbers value, keep repeating that until you are left with 0 and you have your binary number.

Now its time to try out our number, `44` the first number smaller than it is `32`, so lets subtract that from `44` and flip its bit to `1`.

| 256 | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|--|--|--|--|--|--|--|--|--|
| 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |

Now we are left with the number `12`, and we'll subtract 
```

┌──[slavetomints@parrot]─[~]
└──╼ $python convertme.py 
If 44 is in decimal base, what is it in binary base?
Answer: 101100
That is correct! Here's your flag: picoCTF{4ll_y0ur_b4535_762f748e}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQ5NjY0MTA3OCwyMDUyNjkzNjkyXX0=
-->