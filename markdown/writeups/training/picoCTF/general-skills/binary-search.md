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

#!/bin/bash

# Generate a random number between 1 and 1000
target=$(( (RANDOM % 1000) + 1 ))

echo "Welcome to the Binary Search Game!"
echo "I'm thinking of a number between 1 and 1000."

# Trap signals to prevent exiting
trap 'echo "Exiting is not allowed."' INT
trap '' SIGQUIT
trap '' SIGTSTP

# Limit the player to 10 guesses
MAX_GUESSES=10
guess_count=0

while (( guess_count < MAX_GUESSES )); do
    read -p "Enter your guess: " guess

    if ! [[ "$guess" =~ ^[0-9]+$ ]]; then
        echo "Please enter a valid number."
        continue
    fi

    (( guess_count++ ))

    if (( guess < target )); then
        echo "Higher! Try again."
    elif (( guess > target )); then
        echo "Lower! Try again."
    else
        echo "Congratulations! You guessed the correct number: $target"

        # Retrieve the flag from the metadata file
        flag=$(cat /challenge/metadata.json | jq -r '.flag')
        echo "Here's your flag: $flag"
        exit 0  # Exit with success code
    fi
done

# Player has exceeded maximum guesses
echo "Sorry, you've exceeded the maximum number of guesses."
exit 1  # Exit with error code to close the connection
```

Hm, this is troubling. We only have 10 guesses to guess a single number out of 1000 possibilities. While it might seem impossible without extreme luck, there's actually a guaranteed way to do it.

A binary search algorithm

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
eyJoaXN0b3J5IjpbLTE4NTk3NDIyNCwtNzE5NzgwNzQwLC0yMD
U3MDgwMjAxXX0=
-->