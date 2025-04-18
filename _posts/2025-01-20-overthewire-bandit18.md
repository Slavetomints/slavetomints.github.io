---
title: Bandit Level 18 → Level 19
date: 2025-01-20 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 18 → Level 19
---
> ssh bandit18@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in a file **readme** in the homedirectory. Unfortunately, someone has modified **.bashrc** to log you out when you log in with SSH.
{: .prompt-info }

While this might seem pretty trivial at first, it's actually a pretty simple on to get around. For this, we'll need to just simply add a command we want to execute to the end of our original command, and it'll execute before we get logged out!

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $ssh bandit18@bandit.labs.overthewire.org -p 2220 ls
                         _                     _ _ _   
                        | |__   __ _ _ __   __| (_) |_ 
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_ 
                        |_.__/ \__,_|_| |_|\__,_|_|\__|
                                                       

                      This is an OverTheWire game server. 
            More information on http://www.overthewire.org/wargames

bandit18@bandit.labs.overthewire.org's password: 
readme
┌─[slavetomints@parrot]─[~]
└──╼ $ssh bandit18@bandit.labs.overthewire.org -p 2220 cat readme
                         _                     _ _ _   
                        | |__   __ _ _ __   __| (_) |_ 
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_ 
                        |_.__/ \__,_|_| |_|\__,_|_|\__|
                                                       

                      This is an OverTheWire game server. 
            More information on http://www.overthewire.org/wargames

bandit18@bandit.labs.overthewire.org's password: 
{removed in accordance with game rules}
```
