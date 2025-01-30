# First Find

Challenge description:

> Unzip this archive and find the file named 'uber-secret.txt'

For this one we will be using the `find` command. What this does is it "finds" files and directories for you. If we specify `-name uber-secret.txt`we'll be able to find the file named `uber-secret.txt`.  So the full command is going to look something like `find -name uber-secret.txt`

```

┌─[slavetomints@parrot]─[~]
└──╼ $find -name uber-secret.txt
./files/adequate_books/more_books/.secret/deeper_secrets/deepest_secrets/uber-secret.txt
┌─[slavetomints@parrot]─[~]
└──╼ $cat files/adequate_books/more_books/.secret/deeper_secrets/deepest_secrets/uber-secret.txt 
picoCTF{f1nd_15_f457_ab443fd1}

```

FLAG: `picoCTF{f1nd_15_f457_ab443fd1}`
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTI5MTk3MDIxMSwyNjU1NTgzMSwyNjk4OT
cyMTBdfQ==
-->