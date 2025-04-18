---
title: Bandit Level 15 → Level 16
date: 2025-01-18 14:00:00 +/-0600
category: [OverTheWire, Bandit]
tags: [overthewire, bandit, writeups, training]
description: OverTheWire Bandit Level 15 → Level 16
---

> ssh bandit15@bandit.labs.overthewire.org -p 2220
>  
>  The password for the next level can be retrieved by submitting the password of the current level to **port 30001 on localhost** using SSL/TLS encryption.
{: .prompt-info }

## SSL/TLS

Alright! Let's talk SSL/TLS, and more specifically the `openssl` command. 

First off, Wikipedia describes SSL/TLS as

> **Transport Layer Security** (**TLS**) is a [cryptographic protocol](https://en.wikipedia.org/wiki/Cryptographic_protocol "Cryptographic protocol") designed to provide communications security over a computer network, such as the [Internet](https://en.wikipedia.org/wiki/Internet "Internet"). The [protocol](https://en.wikipedia.org/wiki/Communication_protocol "Communication protocol") is widely used in applications such as [email](https://en.wikipedia.org/wiki/Email "Email"), [instant messaging](https://en.wikipedia.org/wiki/Instant_messaging "Instant messaging"), and [voice over IP](https://en.wikipedia.org/wiki/Voice_over_IP "Voice over IP"), but its use in securing [HTTPS](https://en.wikipedia.org/wiki/HTTPS "HTTPS") remains the most publicly visible.

It doesn't mention SSL anywhere in that snippet, and that is because SSL was deprecated in 2015 with RFC 7568 which stated that:
> The Secure Sockets Layer version 3.0 (SSLv3), as specified in [RFC](https://datatracker.ietf.org/doc/html/rfc6101)
   [6101](https://datatracker.ietf.org/doc/html/rfc6101), is not sufficiently secure.  This document requires that SSLv3
   not be used.  The replacement versions, in particular, Transport
   Layer Security (TLS) 1.2 ([RFC 5246](https://datatracker.ietf.org/doc/html/rfc5246)), are considerably more secure and
   capable protocols.

However, it will still work for the purposes of today's challenge. We are going to be using the `s_client -connect` command with `openssl`, which opens a standard SSL/TLS client with the specified host and port. And since all we need to do is, We are going to be connecting to localhost on port 30001, so our full command will look like `openssl s_client -connect localhost:30001`. And once we have the connection open, we'll just paste in the password for bandit15.

## The Solution

```terminal
bandit15@bandit:~$ openssl s_client -connect localhost:30001
CONNECTED(00000003)

---cut for brevity---

read R BLOCK
{removed in accordance with game rules}
Correct!
{removed in accordance with game rules}

closed
```
