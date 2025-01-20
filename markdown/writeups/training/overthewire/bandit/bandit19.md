# bandit19

> ssh bandit19@bandit.labs.overthewire.org -p 2220
>  
>  To gain access to the next level, you should use the setuid binary in the homedirectory. Execute it without arguments to find out how to use it. The password for this level can be found in the usual place (/etc/bandit_pass), after you have used the setuid binary.

Another simple challenge. If you run the bandit20-do binary by itself, it shows you that you can execute commands as bandit20. And since they are the ones allowed to see into their password file we cant use `cat` 
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1MjMyMjE0ODYsLTIwODg3NDY2MTJdfQ
==
-->