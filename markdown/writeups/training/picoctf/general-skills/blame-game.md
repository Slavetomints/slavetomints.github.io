# Blame Game

Challenge description:

> Someone's commits seems to be preventing the program from working. Who is it?

Once we're in the repository let's take a look to see what we have

```

┌─[slavetomints@parrot]─[~]
└──╼ $ls
message.py
┌─[slavetomints@parrot]─[~]
└──╼ $cat message.py 
print("Hello, World!"
```
Hm, lets take a look at who made this mistake using `git`s logging feature. With it we are able to look at all commits to see who authored them. `git log` is the command to look at it.

```

commit b7f1fb20f72e493f604ccb3b9f2639a00c566939 (HEAD -> master)
Author: picoCTF <ops@picoctf.com>
Date:   Tue Mar 12 00:07:08 2024 +0000

    important business work

commit c16a2576a68c7166d13f3e877ea4b4cfc675d343
Author: picoCTF <ops@picoctf.com>
Date:   Tue Mar 12 00:07:08 2024 +0000

    important business work

...
...
...

commit 587afe7521bb675f3015acce66dbadcbb6acfb29
Author: picoCTF <ops@picoctf.com>
Date:   Tue Mar 12 00:07:06 2024 +0000

    important business work

commit 2466febd40004b9ca644ce924181d07e23dcfaeb
Author: picoCTF{@sk_th3_1nt3rn_cfca95b2} <ops@picoctf.com>
Date:   Tue Mar 12 00:07:06 2024 +0000

    optimize file size of prod code

commit 05f26d123cde97b714aaae28ba8f18db3f385af5
Author: picoCTF <ops@picoctf.com>
Date:   Tue Mar 12 00:07:06 2024 +0000

    create top secret project
```

FLAG: `picoCTF{@sk_th3_1nt3rn_cfca95b2}`

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI5Njg4NzAyOF19
-->