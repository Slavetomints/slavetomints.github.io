# bandit11

> ssh bandit11@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in the file **data.txt**, where all lowercase (a-z) and uppercase (A-Z) letters have been rotated by 13 positions

For this funky challenge we are going to make use of `tr`, which stands for translate, and use it to translate the content of the file. The first thing we'll need to do is define the character set we're using, which is going to look like `a-zA-Z`, aka all alphabetic characters lowercase and uppercase, and then define what we are going to translate that to, which is going to look like `n-za-mN-ZA-M`. This second part is a bit more tricky to figure out, but we can rewrite the first set to look like `a-mn-zA-MN-Z` and it makes a bit more sense. I'll put it in a table so we can understand it a little better.

| Original Set | Translated Set |
|:---------------:|:---------------:|
| a-m | n-z |
| n-z | a-m |
| A-M | N-Z |
| N-Z | A-M |

So lets now try our command with the data in `data.txt`
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEwMDU5NjU3NSwtMjA3NzE2NDQ5NSwtMj
A4ODc0NjYxMl19
-->