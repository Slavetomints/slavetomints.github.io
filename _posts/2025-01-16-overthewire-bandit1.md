---
title: Bandit Level 1 → Level 2
date: 2025-01-16 14:00:00 +/-0600 
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 1 → Level 2
--- 

> ssh bandit1@bandit.labs.overthewire.org -p 2220
> 
> The password for the next level is stored in a file called **-** located in the home directory
{: .prompt-info }

## The Solution

Using the password we got from the last challenge, lets ssh into the game server as `bandit1`

```terminal

┌─[slavetomints@parrot]─[~]
└──╼ $ssh bandit1@bandit.labs.overthewire.org -p 2220
                         _                     _ _ _   
                        | |__   __ _ _ __   __| (_) |_ 
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_ 
                        |_.__/ \__,_|_| |_|\__,_|_|\__|
                                                       

                      This is an OverTheWire game server. 
            More information on http://www.overthewire.org/wargames

bandit1@bandit.labs.overthewire.org's password: 
```

Now, this one seems simple enough, actually it should be just as easy as the last challenge, just `cat` the file and get a move on. So let's try that.

```terminal

bandit1@bandit:~$ cat -
      
```
Huh, that's odd. What happened is that `-` is used for a few different things in UNIX/UNIX-like systems, most commonly to specify flags for a command such as `ls -sa`. Now what's happening is the terminal is waiting for the "rest" of the command, as it doesn't think that we are quite done yet.

The way around it is to specify exactly what we want to `cat`. See the following

```terminal

bandit1@bandit:~$ cat ./-
{hidden in accordance with game rules}
```

What this does is it uses `.` to specify the current directory, and then the file named `-` in it. And that how we can get the password for the next level.
