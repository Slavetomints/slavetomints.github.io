# bandit6

> ssh bandit6@bandit.labs.overthewire.org -p 2220
> The password for the next level is stored **somewhere on the server** and has all of the following properties:
>
> -   owned by user bandit7
> -   owned by group bandit6
> -   33 bytes in size

Alrighty, this one seems like the last challenge but it is asking for some different properties. The biggest thing that stick out is that they specified that it is somewhere on the server, implying that it wont be in our home directory. That's fine, all we need to do is navigate to the root directory and run another instance of `find`.

With this search we are going to use the `-size`, `-group`, and `-user` flags to help refine what we're looking for. 

We set the size to `-size 33c` as that only looks for files that are 33bytes in size, the `-group bandit6` and `-user bandit7` in accordance with the challenge description.

```

bandit6@bandit:/$ find -user bandit7 -group bandit6 -size 33c 2>/dev/null
./var/lib/dpkg/info/bandit7.password
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI0NjE2NDQ0MywyODkwNjQ3OCw4MzQyNT
U0NzJdfQ==
-->