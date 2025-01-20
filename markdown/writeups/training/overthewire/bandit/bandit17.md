# bandit17

> ssh bandit17@bandit.labs.overthewire.org -p 2220 -i sshkey.private 
>  
>  There are 2 files in the homedirectory: **passwords.old and passwords.new**. The password for the next level is in **passwords.new** and is the only line that has been changed between **passwords.old and passwords.new**

*If you are having issues with your identify file, make sure that you update the permissions so that only you can read from it.*

This one is pretty easy, we're going to be using the `diff` command today, which shows us the difference between two files. So 
<!--stackedit_data:
eyJoaXN0b3J5IjpbOTY1NTYwODM4LC0yMDg4NzQ2NjEyXX0=
-->