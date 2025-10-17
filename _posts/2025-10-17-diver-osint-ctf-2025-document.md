---
title: document
date: 2025-10-17
categories: [Capture The Flags, Diver OSINT CTF 2025]
tags: [ctf, diver osint ctf 2025, osint, writeups]
description: Diver OSINT CTF 2025 document Challenge
---


> Challenge description:
>
>The US Navy Commander Fleet Activities Yokosuka (CFAY) operates a shuttle bus service between Haneda airport/Narita airport and the base for US military personnel. Answer the name of the person who created the document about the boarding location of the bus in 2023.
>
>Flag Format: Diver25{George Washington}
>
> https://cnrj.cnic.navy.mil/Portals/80/CFA_Yokosuka/FAQs.pdf?ver=9xaFCoTG0-tMupFtJFmcrQ%3d%3d
{: .prompt-info }

Okay, quick and easy challenge, my favorite. One thing you might not know about the documents you create is that it generally saves metadata about the document, including the author.

A simple tool to check a file for metadata is `exiftool`. Let's use it here

```terminal
❯ exiftool FAQs.pdf
ExifTool Version Number         : 13.36
File Name                       : FAQs.pdf
Directory                       : .
File Size                       : 512 kB
File Modification Date/Time     : 2023:06:11 23:38:56-05:00
File Access Date/Time           : 2025:08:27 15:46:53-05:00
File Inode Change Date/Time     : 2025:06:12 21:04:03-05:00
File Permissions                : -rw-r--r--
File Type                       : PDF
File Type Extension             : pdf
MIME Type                       : application/pdf
PDF Version                     : 1.7
Linearized                      : No
Author                          : Mitchell.Donovan
Create Date                     : 2023:06:09 14:02:37+09:00
Modify Date                     : 2023:06:09 14:02:37+09:00
Producer                        : Microsoft: Print To PDF
Title                           : Microsoft Word - FAQs
Page Count                      : 1
```

And look at that, right where we hoped for it to be, the author's name.

FLAG: `Diver25{Mitchell.Donovan}`