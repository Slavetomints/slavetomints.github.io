# bandit11

> ssh bandit11@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in the file **data.txt**, where all lowercase (a-z) and uppercase (A-Z) letters have been rotated by 13 positions

For this funky challenge we are going to make use of `tr`, which stands for translate, and use it to translate the content of the file. The first thing we'll need to do is define the character set we're using, which is going to look like `a-zA-Z`, aka all alphabetic characters lowercase and uppercase, and then define what we are going to translate that to, which is going to look like `n-za-mN-ZA-M`. This second part is a bit more tricky to figure out, but we can rewrite the first set to look like `a-mn-zA-MN-Z
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE4MjQ5OTY2NjQsLTIwODg3NDY2MTJdfQ
==
-->