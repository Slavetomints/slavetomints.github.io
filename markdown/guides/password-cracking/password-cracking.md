# Password Cracking

  

You hear it all the time, some company has had a data breach where X million number of people had their passwords exposed. But surely the companies don't store their passwords in [plaintext](https://slavetomints.github.io/guides/guides/vocabulary.html#plaintext) right? That's just asking for a catastrophic data breach to happen. So how do companies keep your data secure even if a breach happens?

  

Introduce [password hashing](https://slavetomints.github.io/guides/guides/vocabulary.html#hashing). A hashed password is simply a password that has had a special hashing algorithm applied to it, like a complex math problem. The reason that these hashes are secure is that they are considered `one-way` algorithms, so they can't be reversed if someone get's their hand on the algorithm. When you first enter in a password to a website or application, it makes a hash of that password and stores it on the server. Later, when you want to login to the same account, it makes a hash of the password you entered into the website and compares it to the original hash. If they are the same then you get in!

  

Some common hashing algorithms used on websites today are [`b-crypt`](https://slavetomints.github.io/guides/guides/vocabulary.html#bcrypt), [`MD5`](https://slavetomints.github.io/guides/guides/vocabulary.html#md5), and [`SHA-256`](https://slavetomints.github.io/guides/guides/vocabulary.html#sha-256).

So if the hashed passwords are of no use to the attackers, how do they get the plaintext passwords? The answer is [password cracking](https://slavetomints.github.io/guides/guides/vocabulary.html#password-cracking). Using tools like `John the Ripper` and `Hashcat` an attacker can use various methods to get the plaintext password. There's two main methods to password cracking: wordlists and brute-force.

  

## Wordlists

A [wordlist](https://slavetomints.github.io/guides/guides/vocabulary.html#wordlist) is simply a text file full of words. When an attacker uses a wordlist to crack hashed passwords, the tool generates the hashed value of the first word in the wordlist and checks it against the hashes they're trying to crack. If it matches, then it know which plaintext word matches. If it doesn't match, then it goes on to the next word, and so on an so forth.

  

A famous wordlist included by default on Linux distros such as Kali and Parrot is [`rockyou.txt`](https://slavetomints.github.io/guides/guides/vocabulary.html#rockyou.txt). It is a wordlist of about 14.5 million passwords, all taken from `rockyou.com` in a 2009 databreach, where an attacker used SQL injection to break into the database of the site. The reason it is to famous is that at the time it was one of the largest breaches where all of the passwords were stored in plaintext.

  

## Brute Force

  

Sometimes though, the password isn't in a wordlist, and generating a wordlist is too computationally complex for the task at hand. Then you move on to [brute forcing](https://slavetomints.github.io/guides/guides/vocabulary.html#brute-force) the passwords, where you attempt to generate every single possible combination of characters until you get a match. This obviously takes longer but will reliably catch shorter passwords. This is why having long and complex passwords are important.

  

## Sources

  

Neskey, Corey. “Are Your Passwords in the Green?” Hive Systems, Hive Systems, 27 June 2024, www.hivesystems.com/blog/are-your-passwords-in-the-green.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTU4OTExMjE0NV19
-->