# bandit1

> ssh bandit1@bandit.labs.overthewire.org -p 2220
> The password for the next level is stored in a file called **-** located in the home directory

Using the password we got from the last challenge, lets ssh into the game server as `bandit1`

```

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

```

bandit1@bandit:~$ cat -
      
```
Huh, that's odd. What happened is that `-` is used for a few different things in UNIX/UNIX-like systems,  to specify flags for a command `(ls -sa)`, as a replacement for standard input and output `(
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1MzQzMTE4NjhdfQ==
-->