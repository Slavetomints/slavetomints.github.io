# BabyFlow

Challenge description:

> Does this login application even work?!

For this one we are provided a remote connection, where we are then prompted for a password.

image1

We are also provided the binary behind the program, and once we open it in Ghidra we see this

image2

Looking at the `strncmp`, we see the password that it wants us to get is `SuPeRsEcUrEPaSsWoRd123`, however it checks if we are admin. We also can see that it compares only the first 22 characters, so it is vulnerable to some overflow. 

image3

FLAG: `INTIGRITI{b4bypwn_9cdfb439c7876e703e307864c9167a15}`

