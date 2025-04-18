---
title: Bandit Level 20 → Level 21
date: 2025-01-20 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 20 → Level 21
---

> ssh bandit20@bandit.labs.overthewire.org -p 2220
>  
>  There is a setuid binary in the homedirectory that does the following: it makes a connection to localhost on the port you specify as a commandline argument. It then reads a line of text from the connection and compares it to the password in the previous level (bandit20). If the password is correct, it will transmit the password for the next level (bandit21).
{: .prompt-info }

Alrighty, this one takes a little bit of finagling. The first thing that we'll need to do is get a port to broadcast the password for bandit 20, which is pretty easy to do using `nc`. I'll show the command we'll be using and explain how it works.

```terminal
bandit20@bandit:~$ echo -n "{removed in accordance with game rules}" | nc -l -p 1337 &
[1] 4112773
```

So, we know that `echo` is probably the best way to get the message to `nc` using a pipe, and since we know the passwords are going to be compared then we should use the `-n` operator to remove any trailing newline character, so only the exact passwords are compared. 

For the `netcat` commands we want to use `-l` and `-p`. The `-l` puts us into listen mode so it's waiting for inbound connects, and the `-p` allows us to specify the port number, which in this case will be 1337.

However, when we open a connection with `netcat` we need to close it to run another command, which stops the broadcast. The way for us to fix this is to make it a background process with `&` added to the end. The resulting output is the process ID (PID) of the process for later use. 

Once you've run all of that, you can then use `./suconnect 1337` and retrieve that password.

```terminal
bandit20@bandit:~$ ./suconnect 1234
Read: 0qXahG8ZjOVMN9Ghs7iOWsCfZyXOUbYO
Password matches, sending next password
{removed in accordance with game rules}
[1]+  Done                    echo -n "{removed in accordance with game rules}" | nc -l -p 1234
```

