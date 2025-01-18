# bandit13

> ssh bandit13@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level is stored in **/etc/bandit_pass/bandit14 and can only be read by user bandit14**. For this level, you don’t get the next password, but you get a private SSH key that can be used to log into the next level. 

Hm, so we need to log in to bandit14 without the password using this private SSH RSA key. That's pretty simple for us. Lets first verify that it is in fact a valid key here. *Note: The key you are going to see here has been obfuscated*

```

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

Alrighty, lets copy it onto a file on our machine and give it the same name. And in order to use in with `ssh`, we'll need to specify `-i sshkey.private`, where the `-i` signifies out the identity file as the one associated to the private key.

```

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

Uh oh, looks like our key is too open with its permissions, so we cant use it. Lets take a look at the permissions for the file.

```

┌─[slavetomints@parrot]─[~]
└──╼ $ls -lsa sshkey.private 
4 -rw-r--r-- 1 slavetomints slavetomints 1679 Jan 18 01:01 sshkey.private
```
 
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjc1MDIxMDMyLC0xNTkzNTAyMDA0LDE5MD
A0MjA3NTYsLTIwODg3NDY2MTJdfQ==
-->