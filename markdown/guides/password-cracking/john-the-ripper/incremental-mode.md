# Incremental Mode
Sometimes the user was smart, and decided to make their password a mix of random characters. This makes almost every single wordlist we have obsolete, especially if the password is long enough. So now it's time to bring out the big guns.

By calling `--incremental` after `john` we are telling it we want to try every single combination of the 95 printable ASCII characters. Obviously this is a slow but thorough process.

For today's purposes we'll be using the following `hashes.txt` at first as our hash file:

```

joe:8627d2dde8a6c1c3fc06f2519b33ff62
admin:913fe0708e469bd545866b2b9a203171
supervisor1:cd64a7aaaafdf1926b21cc4c218b861f
phil:78048e67122ec794d6d136c4e22fcc63
billy:e61c631c5b30fc7aac63ddec56ad8329
codebot:16151ca215795e8c71b3be21f8e14c2a
production-server:6f46559d3bd87771fecf34cf917976dc
ssh:681d8f483e7af51c8c7d43eb03b20067
```

So, the syntax of the command is extremely simply again, all we have to do is call `john --format=format --incremental hashes.txt`. For our purposes, the format is Raw MD5 for simplicity's sake.

```


```

Sweet! But that's not all you can do with the incremental mode. Let's cover some of its other features.

## Defining character sets

By default, John will use the `ASCII` character set, which contains all of the 95 printable ASCII characters. This is quite a lot, meaning that just to find every 6 character password it will generate 735 billion passwords. While a wordlist might make the process faster, a wordlist of that size would be about 4.8 Terabytes large. That's why wordlists aren't always going to help you, there's always a tradeoff between speed and size. 

John comes with the following character sets:

-   **`ASCII`**: All 95 printable ASCII characters
-   **`LM_ASCII`**: For use on LM hashes (specific to certain legacy Windows hashes)
-   **`Alnum`**: All 62 alphanumeric characters (uppercase + lowercase letters + digits)
-   **`Alpha`**: All 52 letters (uppercase + lowercase letters)
-   **`LowerNum`**: Lowercase letters plus digits (36 characters total)
-   **`UpperNum`**: Uppercase letters plus digits (36 characters total)
-   **`LowerSpace`**: Lowercase letters plus space (27 characters total)
-   **`Lower`**: Lowercase letters only
-   **`Upper`**: Uppercase letters only
-   **`Digits`**: Digits only (0-9)

In order to use one of these character sets with the `--incremental` mode, all you need to do is add `--`
<!--stackedit_data:
eyJoaXN0b3J5IjpbMzc1MjA3NzUsMjMyMjI0NjVdfQ==
-->