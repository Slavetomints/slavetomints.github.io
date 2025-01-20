# bandit20

> ssh bandit20@bandit.labs.overthewire.org -p 2220
>  
>  There is a setuid binary in the homedirectory that does the following: it makes a connection to localhost on the port you specify as a commandline argument. It then reads a line of text from the connection and compares it to the password in the previous level (bandit20). If the password is correct, it will transmit the password for the next level (bandit21).

Alrighty, this one takes a little bit of finagling. The first thing that we'll need to so is get a port to broadcast the password for bandit 20, which is pretty easy to do using `nc`. However, when we open a connection with `netcat` we need to close it to run another command, which stops the broadcast. The way for us to fix this is to make it
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQ3MzEzMTM4OCwxODEzMzI0NTUsNzIwND
M3ODUyLC0yMDg4NzQ2NjEyXX0=
-->