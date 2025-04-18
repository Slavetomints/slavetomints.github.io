---
title: Bandit Level 0 → Level 1
date: 2025-01-16 14:00:00 +/-0600 
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 0 → Level 1
---
> ssh bandit0@bandit.labs.overthewire.org -p 2220
>
> password: bandit0
{: prompt-info }

## Intro to Bandit

Welcome to Bandit! This is OverTheWire's beginner wargame and is meant to be an introduction to how the other wargames work. This makes it a wonderful place to get acquainted with UNIX systems.

bandit0 is extremely easy by design, its whole purpose is to get you familiar with the syntax for `ssh` since it is what you will be using to connect to the challenge server for each level.

### SSH basics

The syntax for `ssh` is `ssh user@host -p port`. When it asks to continue connecting because it doesn't know the fingerprint, it means that it's never connected to this host before, and want you to confirm that this is the right host. It then asks us for the password, which we are provided in the challenge description.

```terminal

┌─[slavetomints@parrot]─[~]
└──╼ $ssh bandit0@bandit.labs.overthewire.org -p 2220
                         _                     _ _ _   
                        | |__   __ _ _ __   __| (_) |_ 
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_ 
                        |_.__/ \__,_|_| |_|\__,_|_|\__|
                                                       

                      This is an OverTheWire game server. 
            More information on http://www.overthewire.org/wargames

bandit0@bandit.labs.overthewire.org's password: 
```

Great! Welcome to the server! Let's take a look around and see what we can find here.

```terminal

bandit0@bandit:~$ ls
readme
```

### The Command Prompt
Now before we check out that file, if you've never wondered what the `bandit0@bandit:~$` means on the command line, let's quickly look at that.

The first part is the username for the active user, who in this case is `bandit0`. If you want to find out for yourself who the active user is, run the command `whoami` in the command line.

The next part, the `bandit` is the hostname of the machine. You can also find this out by running the aptly named command `hostname`.

```terminal

bandit0@bandit:~$ whoami
bandit0
bandit0@bandit:~$ hostname
bandit
```

The "~", called a tilde, is your current location on the file system. The tilde means the user's home directory. If you go to another user's home directory, you'll see the full path to it, but you only see the tilde if it is your own home directory.

```terminal

bandit0@bandit:~$ cd /home/bandit1
bandit0@bandit:/home/bandit1$ cd /home/bandit0
bandit0@bandit:~$ 
```

Now, what does the `$` mean? It means that you are a user with normal user privileges. if you were the root user, you'd likely see a `#` instead, indicating that you have elevated admin privileges.

Okay! So now let's look at the file we found earlier!

### bandit0
```terminal

bandit0@bandit:~$ cat readme 
Congratulations on your first steps into the bandit game!!
Please make sure you have read the rules at https://overthewire.org/rules/
If you are following a course, workshop, walkthrough or other educational activity,
please inform the instructor about the rules as well and encourage them to
contribute to the OverTheWire community so we can keep these games free!

The password you are looking for is: {hidden in accordance with game rules}
```

Remember to save that password, as we'll use it to log into the next level.
