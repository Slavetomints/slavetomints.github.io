# bandit0

Welcome to Bandit! This is OverTheWire's beginner wargame and is meant to be an introduction to how the other wargames work. This makes it a wonderful place to get acquainted with UNIX systems.

bandit0 is extremely easy by design, its whole purpose is to get you familiar with the syntax for `ssh` since it is what you will be using to connect to the challenge server for each level.

The syntax for `ssh` is `ssh user@host -p port`. When it asks to continue connecting because it doesn't know the fingerprint it means that it's never connected to this host before, and want you to confirm that this is the right host. It then asks us for the password, which we are provided in the challenge description.

```

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

```

bandit0@bandit:~$ ls
readme

```

Now, if you've never wondered what the `bandit0@bandit:~$` means on the command line, let's quickly look at that.

The first part is the username for the active user, who in this case is `bandit0`. If you want to find out for yourself who the active user is, run the command `whoami` in the command line.

The next part, the `bandit` is the hostname of the machine. You can also find this out by running the aptly named command `hostname`.

```

bandit0@bandit:~$ whoami
bandit0
bandit0@bandit:~$ hostname
bandit

```

The "~", called a tilde, is your current location on the file syst
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc0NzM5MDU3NywxMDA2Njk2NjIyXX0=
-->