# Time Machine

Challenge description:

> What was I last working on? I remember writing a note to help me remember...

Alright, we're provided with a zip file and uh thats about it. The first useful command for us will be `unzip`, as that's the simple way to unzip files on the command line. Once the file inflates, we're going to notice that its a git repository (called repo for short). Checking it out with `ls` shows a single file, named `message.txt`. Let's see what was in it.

```

┌─[slavetomints@parrot]─[~/Training/picoCTF/general-skills/time-machine/drop-in]
└──╼ $cat message.txt
This is what I was working on, but I'd need to look at my commit history to know why...
```

Hm, the easiest way to look at a repo's commit history is to use `git log`. This lists out all pst commits and gives you the commit, the author, and the date, plus anything else included. Let's run that in the repo and see what we get.

```

┌─[slavetomints@parrot]─[~/Training/picoCTF/general-skills/time-machine/drop-in]
└──╼ $git log
commit 89d296ef533525a1378529be66b22d6a2c01e530 (HEAD -> master)
Author: picoCTF &lt;ops@picoctf.com&gt;
Date: Tue Mar 12 00:07:22 2024 +0000
picoCTF{t1m3m@ch1n3_186cd7d7}
```

FLAG: `picoCTF{t1m3m@ch1n3_186cd7d7}`
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwMzYyMjA2OTBdfQ==
-->