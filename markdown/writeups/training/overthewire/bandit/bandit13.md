# bandit13

> ssh bandit13@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in **/etc/bandit_pass/bandit14 and can only be read by user bandit14**. For this level, you don’t get the next password, but you get a private SSH key that can be used to log into the next level. 

Hm, so we need to log in to bandit14 without the password using this private SSH RSA key. That's pretty simple for us. Lets first verify that it is in fact 
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTExMTcyMTIxOSwxOTAwNDIwNzU2LC0yMD
g4NzQ2NjEyXX0=
-->