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

Looks like the flag is hidden in an older commit. Thankfully, there is a command to see the difference between two commits. That command is `git diff`, and we'll be using this variation of it ` git diff [<options>] <commit>...<commit>`

```

┌─[slavetomints@parrot]─[~/training/picoCTF/general-skills/commitment_issues/drop-in]
└──╼ $git diff 8dc51806c760dfdbb34b33a2008926d3d8e8ad49 87b85d7dfb839b077678611280fa023d76e017b8
diff --git a/message.txt b/message.txt
index d552d1e..bae247d 100644
--- a/message.txt
+++ b/message.txt
@@ -1 +1 @@
-TOP SECRET
+picoCTF{s@n1t1z3_ea83ff2a}
```

FLAG: `picoCTF{s@n1t1z3_ea83ff2a}`
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTMyNDYwNDcyOCw4Njk1NTE1NzJdfQ==
-->