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
ThIsNoTtHeAcTuAlKeyFrOmThEChAllEnF
-----END RSA PRIVATE KEY-----
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5MTgwMDU1NTQsMTkwMDQyMDc1NiwtMj
A4ODc0NjYxMl19
-->