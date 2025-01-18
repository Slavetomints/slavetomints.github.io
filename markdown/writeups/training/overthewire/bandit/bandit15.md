# bandit15

> ssh bandit15@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level can be retrieved by submitting the password of the current level to **port 30001 on localhost** using SSL/TLS encryption.

Alright! Lets talk SSL/TLS, and more specifically the `openssl` command. 

First off, Wikipedia describes SSL/TLS as

> **Transport Layer Security** (**TLS**) is a [cryptographic protocol](https://en.wikipedia.org/wiki/Cryptographic_protocol "Cryptographic protocol") designed to provide communications security over a computer network, such as the [Internet](https://en.wikipedia.org/wiki/Internet "Internet"). The [protocol](https://en.wikipedia.org/wiki/Communication_protocol "Communication protocol") is widely used in applications such as [email](https://en.wikipedia.org/wiki/Email "Email"), [instant messaging](https://en.wikipedia.org/wiki/Instant_messaging "Instant messaging"), and [voice over IP](https://en.wikipedia.org/wiki/Voice_over_IP "Voice over IP"), but its use in securing [HTTPS](https://en.wikipedia.org/wiki/HTTPS "HTTPS") remains the most publicly visible.

It doesnt mention SSL anywhere in that snippet, and that is because SSL was deprecated in 2015 with RFC 7568 which stated that:
> The Secure Sockets Layer version 3.0 (SSLv3), as specified in [RFC](https://datatracker.ietf.org/doc/html/rfc6101)
   [6101](https://datatracker.ietf.org/doc/html/rfc6101), is not sufficiently secure.  This document requires that SSLv3
   not be used.  The replacement versions, in particular, Transport
   Layer Security (TLS) 1.2 ([RFC 5246](https://datatracker.ietf.org/doc/html/rfc5246)), are considerably more secure and
   capable protocols.

However, it will still work for the purposes of todays challenge.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIxMTA2Nzg4NzIsODk1Nzg2MTI4LC0yMD
g4NzQ2NjEyXX0=
-->