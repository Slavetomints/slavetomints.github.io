# bandit6

> ssh bandit6@bandit.labs.overthewire.org -p 2220
> The password for the next level is stored **somewhere on the server** and has all of the following properties:
>
> -   owned by user bandit7
> -   owned by group bandit6
> -   33 bytes in size

Alrighty, this one seems like the last challenge but it is asking for some different properties. The biggest thing that stick out is that they specified that it is somewhere on the server, implying that it wont be in our home directory. That's fine, all we need to do is navigate to the root directory and run another instance of `find`.

With this search we are going to use the `-size`, `-group`, and `-user` flags to help refine our search

<!--stackedit_data:
eyJoaXN0b3J5IjpbMjg5MDY0NzgsODM0MjU1NDcyXX0=
-->