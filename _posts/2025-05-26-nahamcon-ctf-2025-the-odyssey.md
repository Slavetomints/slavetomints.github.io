---
title: The Oddyssey
date: 2025-05-26
categories: [Capture The Flags, NahamCon CTF 2025]
tags: [ctf, nahamcon ctf 2025, misc, writeups]
description: NahamCon CTF 2025 The Oddyssey Challenge
---

> Challenge description:
>  
>  Remember reading The Odyssey in high school? Well I sure don't, because I never did my homework. But I really wanted to get back into the classics and give it a fair shake. The problem is I have a fourth grade reading level and that book is waaaaaay too long.  
> 
> To solve this, I made a server that reads out tiny chunks of The Odyssey, one at a time, so I can take my time reading it! How is Odysseus gonna get himself out of this one?
{: .prompt-info}

Let's take a look at this challenge! 

```terminal
┌─[slavetomints@parrot]─[~/ctfs/nahamcon-2025-ctf/warmups/oddyssey]
└──╼ $nc challenge.nahamcon.com 32015
BOOK I Tell me, O muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home; but do what he might he could not save his men, for they perished through their own sheer folly in eating the cattle of the Sun-god Hyperion; so the god prevented them from ever reaching home. Tell me, too,

Press enter to continue...

about all these things, O daughter of Jove, from whatsoever source you may know them. So now all who escaped death in battle or by shipwreck had got safely home except Ulysses, and he, though he was longing to return to his wife and country, was detained by the goddess Calypso, who had got him into a large cave and wanted to marry him. But as years went by, there came a time when the gods settled that he should go back to Ithaca; even then, however, when he was among his own people, his troubles were not yet over;

Press enter to continue...
```

Hm, this seems like it'll take a while to read the entirety of The Odyssey, I wonder if they just threw the flag somewhere in the middle of the text. What I did was just hold down return until it had cycled thorough all the text, and then searched for `flag{`, since it's the beginn ing of the flag format, and look what we got:

```plaintext
Press enter to continue...

hanging about the house all night and spying upon the women? Be off, you wretch, outside, and eat your supper there, or you shall be driven out with a firebrand." Ulysses scowled at her and answered, "flag{0b51aae6b09b85d1bb13b0b8c3003a6a}". Penelope remarked "that's kind of a weird thing to say in this context." To which Ulysses responded "yeah I don't know, it kinda just came to me ¯\_(ツ)_/¯" Then Ulysses said "My good woman, why should you be so angry with me? Is it because I am not clean, and my clothes are all in rags, and because I am obliged to go
``` 

FLAG: `flag{0b51aae6b09b85d1bb13b0b8c3003a6a}`
