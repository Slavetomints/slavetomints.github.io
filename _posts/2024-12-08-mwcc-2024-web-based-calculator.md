---
title: Web Based Calculator
date: 2024-12-08 19:47:00 -0600
categories: [Capture The Flags, Mountain West Cyber Challenge]
tags: [ctf, mountain west cyber challenge, web, writeups]
description: Mountain West Cyber Challenge Web Based Calculator Challenge
---

> Challenge description:
>
> We think we covered every edge case for this simple calculator application. We even ran a few web application scanners across it. Can you trigger any errors?
{: .prompt-info }

Now, having made a web calculator myself, I know some of the common pitfalls of math. So, the first thing I did, was try to divide by 0.  

```terminal

Error in `/var/www/html/index.php' line 23: Division by zero#0  ErrorHandler(2, Division by zero, /var/www/html/index.php, 23, Array ([_GET] => Array ([num1] => 8,[type] => /,[num2] => 0),[_POST] => Array (),[_COOKIE] => Array ([_ga_80NV3P8RT8] => GS1.1.1733585598.2.0.1733585598.0.0.0,[_ga] => GA1.1.1871894201.1733580405),[_FILES] => Array (),[flag] => CTF{10fab33dcc3a388e780ea1da0ed75fec},[num1] => 8,[type] => /,[num2] => 0,[possible] => Array ([0] => +,[1] => -,[2] => x,[3] => /))) called at [/var/www/html/index.php:23]

```

And once you decipher the error mess that the calculator returns, you'll find the flag.

FLAG: `CTF{10fab33dcc3a388e780ea1da0ed75fec}`
