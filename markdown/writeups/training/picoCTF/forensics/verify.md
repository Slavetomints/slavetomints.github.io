# Verify

> People keep trying to trick my players with imitation flags. I want to make sure they get the real thing! I'm going to provide the SHA-256 hash and a decrypt script to help you know that my flags are legitimate. `ssh -p 62638 ctf-player@rhea.picoctf.net` Using the password `1ad5be0d`. Accept the fingerprint with `yes`, and `ls` once connected to begin. Remember, in a shell, passwords are hidden!
> 
> -   Checksum: 5848768e56185707f76c1d74f34f4e03fb0573ecc1ca7b11238007226654bcda
> -   To decrypt the file once you've verified the hash, run `./decrypt.sh files/<file>`.

Alrighty, lets SSH in and see what we have!

```

ctf-player@pico-chall$ ls
checksum.txt  decrypt.sh  files
```

Hm, seems like not too much. Let's check out the shell script there.

```bash

#!/bin/bash

# Check if the user provided a file name as an argument
if [ $# -eq 0 ]; then
  echo "Expected usage: decrypt.sh <filename>"
  exit 1
fi

# Store the provided filename in a variable
file_name="$1"

# Check if the provided argument is a file and not a folder
if [ ! -f "/home/ctf-player/drop-in/$file_name" ]; then
  echo "Error: '$file_name' is not a valid file. Look inside the 'files' folder with 'ls -R'!"
  exit 1
fi

# If there's an error reading the file, print an error message
if ! openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -salt -in "/home/ctf-player/drop-in/$file_name" -k picoCTF; then
  echo "Error: Failed to decrypt '$file_name'. This flag is fake! Keep looking!"
fi
```

Pretty simple it seems, looks like we cant call the entire `files/` directory, which makes this mildly harder, but lets see how many files there are in there.

```


```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTU0NDM1MjA0NV19
-->