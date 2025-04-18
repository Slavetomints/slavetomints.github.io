---
title: Bandit Level 3 → Level 4
date: 2025-01-16 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 3 → Level 4
---

> ssh bandit3@bandit.labs.overthewire.org -p 2220
> 
> The password for the next level is stored in a hidden file in the **inhere** directory.
{: .prompt-info }

After `ssh`ing into the server, let's check out that directory.

```terminal

bandit3@bandit:~$ ls
inhere
bandit3@bandit:~$ cd inhere
bandit3@bandit:~/inhere$ ls
bandit3@bandit:~/inhere$ 
```

Hm, nothing, let's talk a little bit about `ls`. 

## ls
`ls` is short for the word `list`, and it does just that. it lists all the files and directories in the specified directory. If no directory is given, then it uses the current one. By default, hidden files and directories (those with a period in front of them), do not show up as they are considered "hidden". The man page shows this for the `-a` flag

```
  -a, --all                  do not ignore entries starting with .
```

## The Solution
So, rerunning the earlier command with that flag we get.

```terminal

bandit3@bandit:~/inhere$ ls -a
.  ..  ...Hiding-From-You
```

The `.` and `..` are the current directory and the directory one level higher up respectively, like how they would be used with `cd`. Wwhy is `.` the current directory, and why is `..` the directory one level up? It's from very early Unix, and exemplified in [this 1974 paper by Dennis Ritchie and Ken Thompson](https://people.eecs.berkeley.edu/~brewer/cs262/unix.pdf).

Now that we know what the name of the file is, lets use cat to figure it out.

```terminal

bandit3@bandit:~/inhere$ cat ...Hiding-From-You 
{hidden in accordance with game rules}
```

## Behind The Scenes
### Why `.` and `..` Are Hidden Using `ls` By Deafult

Rob Pike, a Canadian programmer that worked on Unix in the early years, had [this to say on the topic on his blog](https://web.archive.org/web/20141205101508/https://plus.google.com/+RobPikeTheHuman/posts/R58WgWwN9jp):
> A lesson in shortcuts.  
 >
> Long ago, as the design of the Unix file system was being worked out, the entries . and .. appeared, to make navigation easier. I'm not sure but I believe .. went in during the Version 2 rewrite, when the file system became hierarchical (it had a very different structure early on). When one typed ls, however, these files appeared, so either Ken or Dennis added a simple test to the program. It was in assembler then, but the code in question was equivalent to something like this:  
> 
> `if (name[0] == '.') continue;`
> 
> This statement was a little shorter than what it should have been, which is  
> 
> `if (strcmp(name, ".") == 0 || strcmp(name, "..") == 0) continue; 
>  
>  but hey, it was easy.  
>
> Two things resulted.  
> 
> First, a bad precedent was set. A lot of other lazy programmers introduced bugs by making the same simplification. Actual files beginning with periods are often skipped when they should be counted.  
>
> Second, and much worse, the idea of a "hidden" or "dot" file was created. As a consequence, more lazy programmers started dropping files into everyone's home directory. I don't have all that much stuff installed on the machine I'm using to type this, but my home directory has about a hundred dot files and I don't even know what most of them are or whether they're still needed. Every file name evaluation that goes through my home directory is slowed down by this accumulated sludge.  
>  
> I'm pretty sure the concept of a hidden file was an unintended consequence. It was certainly a mistake.  
> 
> How many bugs and wasted CPU cycles and instances of human frustration (not to mention bad design) have resulted from that one small shortcut about 40 years ago?  
> 
> Keep that in mind next time you want to cut a corner in your code.  
> 
> (For those who object that dot files serve a purpose, I don't dispute that but counter that it's the files that serve the purpose, not the convention for their names. They could just as easily be in $HOME/cfg or $HOME/lib, which is what we did in Plan 9, which had no dot files. Lessons can be learned.)
>
> Aug 2, 2012

The more you know!
