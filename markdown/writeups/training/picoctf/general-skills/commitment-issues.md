# Commitment Issues 

Challenge description: 

> I accidentally wrote the flag down. Good thing I deleted it!

For this challenge, we are given a git repository. Inside the git repository, we'll find a file named `message.txt` and we can see that inside of it it says `TOP SECRET`. We know that they probably have the flag in the older versions of the file, so lets look at the past using the command `git log`

```

┌─[slavetomints@parrot]─[~/drop-in]
└──╼ $git log
commit 8dc51806c760dfdbb34b33a2008926d3d8e8ad49 (HEAD -> master)
Author: picoCTF <ops@picoctf.com>
Date:   Tue Mar 12 00:06:17 2024 +0000

    remove sensitive info

commit 87b85d7dfb839b077678611280fa023d76e017b8
Author: picoCTF <ops@picoctf.com>
Date:   Tue Mar 12 00:06:17 2024 +0000

    create flag
```

Looks like the
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTE2ODE4MDgxMiw4Njk1NTE1NzJdfQ==
-->