# Binary Search

Challenge description:

> Want to play a game? As you use more of the shell, you might be interested in how they work! Binary search is a classic algorithm used to quickly find an item in a sorted list. Can you find the flag? You'll have 1000 possibilities and only 10 guesses. Cyber security often has a huge amount of data to look through - from logs, vulnerability reports, and forensics. Practicing the fundamentals manually might help you in the future when you have to write your own tools! You can download the challenge files here:
>
> [challenge.zip](https://artifacts.picoctf.net/c_atlas/19/challenge.zip)
>
> `ssh -p 63188 ctf-player@atlas.picoctf.net` Using the password `1db87a14`. Accept the fingerprint with `yes`, and `ls` once connected to begin. Remember, in a shell, passwords are hidden!

Alright, lets download the zip and take a look at whats inside!

## guessing_game.sh

```bash


```

```

┌─[slavetomints@parrot]─[~]
└──╼ $ssh -p 63188 ctf-player@atlas.picoctf.net
ctf-player@atlas.picoctf.net's password: 
Welcome to the Binary Search Game!
I'm thinking of a number between 1 and 1000.
Enter your guess: 500
Higher! Try again.
Enter your guess: 750
Lower! Try again.
Enter your guess: 625
Higher! Try again.
Enter your guess: 690
Lower! Try again.
Enter your guess: 656
Lower! Try again.
Enter your guess: 641
Lower! Try again.
Enter your guess: 634
Higher! Try again.
Enter your guess: 638
Congratulations! You guessed the correct number: 638
Here's your flag: picoCTF{g00d_gu355_1597707f}
Connection to atlas.picoctf.net closed.
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTcxOTc4MDc0MCwtMjA1NzA4MDIwMV19
-->