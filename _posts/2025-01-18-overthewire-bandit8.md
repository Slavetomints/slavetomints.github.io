---
title: Bandit Level 8 → Level 9
date: 2025-01-18 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 8 → Level 9
---

> ssh bandit8@bandit.labs.overthewire.org -p 2220
>
> The password for the next level is stored in the file **data.txt** and is the only line of text that occurs only once
{: .prompt-info }

Similar to the last level, this level utilizes the file `data.txt` however this time it has a bunch of decoy passwords instead, and we are looking for the only unique one. 

The first idea you might have is to use the command `cat data.txt | uniq -u`, but this will not work as it sees every line as its own unique line. What we need to do first is sort them so that `uniq` can properly work it out. 

The `sort` command does exactly that, it sorts the content so that all like lines are in next to each other. So we can then pipe that into the `uniq` and get our answer.

```terminal
bandit8@bandit:~$ sort data.txt | uniq -u
{removed in accordance with game rules}
```

