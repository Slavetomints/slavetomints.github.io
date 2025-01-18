# bandit15

> ssh bandit15@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level can be retrieved by submitting the password of the current level to **port 30001 on localhost** using SSL/TLS encryption.

Alright! Lets talk SSL/TLS, and more specifically the `openssl` command. 

First off, Wikipedia describes SSL/TLS as

> **Transport Layer Security** (**TLS**) is a [cryptographic protocol](https://en.wikipedia.org/wiki/Cryptographic_protocol "Cryptographic protocol") designed to provide communications security over a computer network, such as the [Internet](https://en.wikipedia.org/wiki/Internet "Internet"). The [protocol](https://en.wikipedia.org/wiki/Communication_protocol "Communication protocol") is widely used in applications such as [email](https://en.wikipedia.org/wiki/Email "Email"), [instant messaging](https://en.wikipedia.org/wiki/Instant_messaging "Instant messaging"), and [voice over IP](https://en.wikipedia.org/wiki/Voice_over_IP "Voice over IP"), but its use in securing [HTTPS](https://en.wikipedia.org/wiki/HTTPS "HTTPS") remains the most publicly visible.

It doesnt mention SSL anywhere in that snippet, and that is because 
<!--stackedit_data:
eyJoaXN0b3J5IjpbMzUzNDI5MjE4LDg5NTc4NjEyOCwtMjA4OD
c0NjYxMl19
-->