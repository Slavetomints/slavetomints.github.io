---
title: Bandit Level 13 → Level 14
date: 2025-01-18 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 13 → Level 14
---

> ssh bandit13@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in **/etc/bandit_pass/bandit14 and can only be read by user bandit14**. For this level, you don’t get the next password, but you get a private SSH key that can be used to log into the next level. 
{: .prompt-info }

## SSH and Identity Files

Hm, so we need to log in to bandit14 without the password using this private SSH RSA key. That's pretty simple for us. Let's first verify that it is in fact a valid key here. *Note: The key you are going to see here has been obfuscated*

```terminal
bandit13@bandit:~$ ls
sshkey.private
bandit13@bandit:~$ file sshkey.private 
sshkey.private: PEM RSA private key
bandit13@bandit:~$ cat sshkey.private 
-----BEGIN RSA PRIVATE KEY-----
ThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEn
GEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAll
EnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChA
llEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEC
hAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmTh
EChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOm
ThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFr
OmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKey
FrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlK
eyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuA
lKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcT
uAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeA
cTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtH
eAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoT
tHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsN
oTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThI
sNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGET
hIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnG
EThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllE
nGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAl
lEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThECh
AllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThE
ChAllEnGEThIsNoTtHeAcTuAlKeyFrOmThEChAllEnGE
-----END RSA PRIVATE KEY-----
```

Alrighty, let's copy it onto a file on our machine and give it the same name. And in order to use in with `ssh`, we'll need to specify `-i sshkey.private`, where the `-i` signifies out the identity file as the one associated to the private key.

### Whoops

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $ssh bandit14@bandit.labs.overthewire.org -p 2220 -i sshkey.private 
                         _                     _ _ _   
                        | |__   __ _ _ __   __| (_) |_ 
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_ 
                        |_.__/ \__,_|_| |_|\__,_|_|\__|
                                                       

                      This is an OverTheWire game server. 
            More information on http://www.overthewire.org/wargames

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0644 for 'sshkey.private' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "sshkey.private": bad permissions
bandit14@bandit.labs.overthewire.org's password: 
```

## Linux File Permissions

Uh oh, looks like our key is too open with its permissions, so we can't use it. Let's take a look at the permissions for the file.

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $ls -lsa sshkey.private 
4 -rw-r--r-- 1 slavetomints slavetomints 1679 Jan 18 01:01 sshkey.private
```
 
 So, when it comes to file permissions on Linux, we need to look at the `-rw-r--r--` section. The firs three parts, that is the `rw-` has to do with the owner of the file. This signifies that they can read and write to the file, but there is a dash where the x should be, so they can not execute the file. Next we have `r--` which pertains to the group specified for the file. Since there's only an r, it means that anyone in the group is allowed to read the file, but they can't write to or execute it. And the last three are for everybody. Since this is the same as the group permissions, it's a little pedantic to go over it again.

So now we need to make it so only we can read it, and we'll use `chmod` to do so. Before we do so, we need to assign some numerical codes to the read, write, and execute options, which will be outlined in the table.

| Permission | Symbol | Number |
| :-------: | :-------: | :--------: |
| Read | r | 4 |
| Write | w | 2 |
| Execute | x | 1 |

### Example

So let's say we have a file where we want the owner to be able to read, write and execute the file, the group to be able to read and execute the file, and everyone to read the file. What we would do is add the numbers for each group in order to select the correct permissions.

Owner: `read(4) + write(2) + execute(1) = 7`

Group: `read(4) + execute(1) = 5`

Everybody: `read(4) = 4`

Those permissions would be represented as the number `754` and the final command would look like `chmod 754 file.txt`.

## The Solution

Back to our key, we need to lock it down some more, so let's make it so that only the owner of the file can read it, and nobody else can access it. This makes our command look like the following:

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $chmod 400 sshkey.private 
┌─[slavetomints@parrot]─[~]
└──╼ $ls -lsa sshkey.private 
4 -r-------- 1 slavetomints slavetomints 1679 Jan 18 01:01 sshkey.private
```

We can now see that the file can only be read by the owner, and if we try to use it again for the SSH, we should expect to get in.

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $ssh bandit14@bandit.labs.overthewire.org -p 2220 -i sshkey.private 
                         _                     _ _ _   
                        | |__   __ _ _ __   __| (_) |_ 
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_ 
                        |_.__/ \__,_|_| |_|\__,_|_|\__|
                                                       

                      This is an OverTheWire game server. 
            More information on http://www.overthewire.org/wargames


      ,----..            ,----,          .---.
     /   /   \         ,/   .`|         /. ./|
    /   .     :      ,`   .'  :     .--'.  ' ;
   .   /   ;.  \   ;    ;     /    /__./ \ : |
  .   ;   /  ` ; .'___,/    ,' .--'.  '   \' .
  ;   |  ; \ ; | |    :     | /___/ \ |    ' '
  |   :  | ; | ' ;    |.';  ; ;   \  \;      :
  .   |  ' ' ' : `----'  |  |  \   ;  `      |
  '   ;  \; /  |     '   :  ;   .   \    .\  ;
   \   \  ',  /      |   |  '    \   \   ' \ |
    ;   :    /       '   :  |     :   '  |--"
     \   \ .'        ;   |.'       \   \ ;
  www. `---` ver     '---' he       '---" ire.org


Welcome to OverTheWire!

-----Cut For Brevity-------

  Enjoy your stay!

bandit14@bandit:~$ 
```

No password for this challenge, we'll see it in the next challenge
