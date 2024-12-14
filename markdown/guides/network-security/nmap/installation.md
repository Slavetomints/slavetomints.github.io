# Installing Nmap

So, the first step to testing whether Nmap is installed on your system is to run this simple command on your machine:

```

┌─[slavetomints@parrot]─[~]
└──╼ $nmap --version
Nmap version 7.94SVN ( https://nmap.org )
Platform: x86_64-pc-linux-gnu
Compiled with: liblua-5.4.4 openssl-3.0.15 libssh2-1.10.0 libz-1.2.13 libpcre2-10.42 libpcap-1.10.3 nmap-libdnet-1.12 ipv6
Compiled without:
Available nsock engines: epoll poll select
```
This check firstly if Nmap exists and then if it does it checks the version of Nmap installed. If nothing shows up, then you might need to install Nmap. For `Linux` systems you can install Nmap using your package manager
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTYzMzkyODQxMl19
-->