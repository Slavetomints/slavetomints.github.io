# bandit20

> ssh bandit20@bandit.labs.overthewire.org -p 2220
>  
>  There is a setuid binary in the homedirectory that does the following: it makes a connection to localhost on the port you specify as a commandline argument. It then reads a line of text from the connection and compares it to the password in the previous level (bandit20). If the password is correct, it will transmit the password for the next level (bandit21).

Alrighty, this one takes a little bit of finagling. The first thing that we'll need to so is get a port to broadcast the password for bandit 20, which is pretty easy to do using `nc`. I'll show the command we'll be using and explain how it works.

```

bandit20@bandit:~$ echo -n "0qXahG8ZjOVMN9Ghs7iOWsCfZyXOUbYO" | nc -l -p 1234 &
[1] 4112773
```

So, we know that echo is probably the best way to get the message to `nc` using a pipe, and since we know the passwords are going to be compared then we should use the `-n` operator to remove any trailing newline character so only the exact passwords are compared. 
However, when we open a connection with `netcat` we need to close it to run another command, which stops the broadcast. The way for us to fix this is to make it a background process with `&`
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjM5Mzk1NjgwLC00NTU5MTk3MzIsMTY1Nj
I5OTYxNCwxNDczMTMxMzg4LDE4MTMzMjQ1NSw3MjA0Mzc4NTIs
LTIwODg3NDY2MTJdfQ==
-->