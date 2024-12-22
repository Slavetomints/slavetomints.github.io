# Super SSH

Challenge description:

> Using a Secure Shell (SSH) is going to be pretty important. Can you ssh as ctf-player to titan.picoctf.net at port 50473 to get the flag? You'll also need the password f3b61b38. If asked, accept the fingerprint with yes. If your device doesn't have a shell, you can use: https://webshell.picoctf.org If you're not sure what a shell is, check out our Primer: https://primer.picoctf.com/#_the_shell

Looks like a super simple ssh challenge. Let's jump right in!

The syntax for `ssh` is `ssh user@host -p port`. When it asks to continue connecting because it doesn't know the fingerprint it means that it's never connected to this host before, and want you to confirm that this is the right host. It then asks us for the password, which we are provided in the challenge description.

```

┌─[slavetomints@parrot]─[~/Training/picoCTF/general-skills/super-ssh]
└──╼ $ssh ctf-player@titan.picoctf.net -p 50473
The authenticity of host '[titan.picoctf.net]:50473 ([3.139.174.234]:50473)' can't be established.
ED25519 key fingerprint is SHA256:4S9EbTSSRZm32I+cdM5TyzthpQryv5kudRP9PIKT7XQ.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '[titan.picoctf.net]:50473' (ED25519) to the list of known hosts.
ctf-player@titan.picoctf.net's password:
Welcome ctf-player, here's your flag: picoCTF{s3cur3_c0nn3ct10n_3e293eea}
Connection to titan.picoctf.net closed.
```

Well......that was easy

FLAG: `picoCTF{s3cur3_c0nn3ct10n_3e293eea}`
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzMTg1NzU4MDBdfQ==
-->