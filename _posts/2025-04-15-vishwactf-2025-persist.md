---
title: Persist
date: 2025-04-15 23:44:20 +/-0600
categories: [Capture The Flags, VishwaCTF 2025]
tags: [ctf, vishwactf, forensics, writeups]
description: VishwaCTF 2025 Persist Challenge 
---
> Challenge description:
>  
>  User, “I logged onto my computer on FRIDAY and noticed something on the home screen before the computer shut down. Could it have been malware?”
{: .prompt-info }

Alrighty, so this challenge is all about looking through registry files, we're given HKCU (HKEY_CURRENT_USER) and HKLM (HKEY_LOCAL_MACHINE).

## What is a Registry File?
A registry file in Windows in its most basic description is a database for apps and programs to use to better function. Wikipedia defines it as:
> The **Windows Registry** is a [hierarchical database](https://en.wikipedia.org/wiki/Hierarchical_database "Hierarchical database") that stores [low-level](https://en.wikipedia.org/wiki/High-_and_low-level "High- and low-level") settings for the [Microsoft Windows](https://en.wikipedia.org/wiki/Microsoft_Windows "Microsoft Windows") operating system and for applications that opt to use the registry. The [kernel](https://en.wikipedia.org/wiki/Kernel_(operating_system) "Kernel (operating system)"), [device drivers](https://en.wikipedia.org/wiki/Device_driver "Device driver"), [services](https://en.wikipedia.org/wiki/Windows_service "Windows service"), [Security Accounts Manager](https://en.wikipedia.org/wiki/Security_Accounts_Manager "Security Accounts Manager"), and [user interfaces](https://en.wikipedia.org/wiki/Graphical_user_interface "Graphical user interface") can all use the registry. The registry also allows access to [counters](https://en.wikipedia.org/wiki/Instrumentation_(computer_programming) "Instrumentation (computer programming)") for profiling system performance.

## So... what do we do now?
Since the user mentioned seeing something on the home screen before the computer shut down, lets take a look at the recent documents in Windows File Explorer, as maybe it had something to do with that. Let's look first in the HKCU since we want the registry file for the user, not the machine. We'll go until we see `/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/`, and then we know were in the right spot.

```
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/MRUListEx,BINARY,​%05​%00​%00​%00​%08​%00​%00​%00​%07​%00​%00​%00​%06​%00​%00​%00​%04​%00​%00​%00​%03​%00​%00​%00​%02​%00​%00​%00​%01​%00​%00​%00​%00​%00​%00​%00​%FF​%FF​%FF​%FF,
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/2,BINARY,R​%00e​%00g​%00i​%00s​%00t​%00r​%00y​%00E​%00x​%00p​%00l​%00o​%00r​%00e​%00r​%00.​%00z​%00i​%00p​%00​%00​%00z​%002​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00RegistryExplorer.lnk​%00​%00V​%00​%08​%00​%04​%00​%EF​%BE​%00​%00​%00​%00​%00​%00​%00​%00*​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00R​%00e​%00g​%00i​%00s​%00t​%00r​%00y​%00E​%00x​%00p​%00l​%00o​%00r​%00e​%00r​%00.​%00l​%00n​%00k​%00​%00​%00$​%00​%00​%00,
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/4,BINARY,{​%00b​%003​%00l​%001​%00e​%00f​%00.​%00t​%00x​%00t​%00​%00​%00^​%002​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00{b3l1ef.lnk​%00D​%00​%08​%00​%04​%00​%EF​%BE​%00​%00​%00​%00​%00​%00​%00​%00*​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00{​%00b​%003​%00l​%001​%00e​%00f​%00.​%00l​%00n​%00k​%00​%00​%00​%1A​%00​%00​%00,
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/6,BINARY,_​%00i​%00n​%00.​%00t​%00x​%00t​%00​%00​%00R​%002​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00_in.lnk​%00<​%00​%08​%00​%04​%00​%EF​%BE​%00​%00​%00​%00​%00​%00​%00​%00*​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00_​%00i​%00n​%00.​%00l​%00n​%00k​%00​%00​%00​%16​%00​%00​%00,
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/7,BINARY,_​%00r​%003​%00g​%00.​%00t​%00x​%00t​%00​%00​%00V​%002​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00_r3g.lnk​%00​%00>​%00​%08​%00​%04​%00​%EF​%BE​%00​%00​%00​%00​%00​%00​%00​%00*​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00_​%00r​%003​%00g​%00.​%00l​%00n​%00k​%00​%00​%00​%18​%00​%00​%00,
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/8,BINARY,p​%000​%00w​%00e​%00r​%00}​%00.​%00t​%00x​%00t​%00​%00​%00\​%002​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00p0wer}.lnk​%00​%00B​%00​%08​%00​%04​%00​%EF​%BE​%00​%00​%00​%00​%00​%00​%00​%00*​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00p​%000​%00w​%00e​%00r​%00}​%00.​%00l​%00n​%00k​%00​%00​%00​%1A​%00​%00​%00,
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/5,BINARY,S​%00i​%00l​%00e​%00n​%00t​%00​%00F​%00i​%00l​%00e​%00s​%00​%00​%00n​%002​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00Silent Files.lnk​%00​%00N​%00​%08​%00​%04​%00​%EF​%BE​%00​%00​%00​%00​%00​%00​%00​%00*​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00S​%00i​%00l​%00e​%00n​%00t​%00​%00F​%00i​%00l​%00e​%00s​%00.​%00l​%00n​%00k​%00​%00​%00​%00​%00​%00,
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/.jpg,KEY,,2025-01-10 13:51:10
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/.lnk,KEY,,2025-02-27 17:19:22
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/.lnk/MRUListEx,BINARY,​%FF​%FF​%FF​%FF,
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/.reg,KEY,,2025-01-05 11:22:18
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/.reg/MRUListEx,BINARY,​%00​%00​%00​%00​%FF​%FF​%FF​%FF,
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/.reg/0,BINARY,H​%00K​%00C​%00U​%00.​%00r​%00e​%00g​%00​%00​%00V​%002​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00HKCU.lnk​%00​%00>​%00​%08​%00​%04​%00​%EF​%BE​%00​%00​%00​%00​%00​%00​%00​%00*​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00H​%00K​%00C​%00U​%00.​%00l​%00n​%00k​%00​%00​%00​%18​%00​%00​%00,
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/.txt,KEY,,2025-02-27 17:35:52
```
{: file="HKCU" }

Now more astute eyes might've seen some 1337speak there in the file, lets cut out that section and take a closer look.

```
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/4,BINARY,{​%00b​%003​%00l​%001​%00e​%00f​%00.​%00t​%00x​%00t​%00​%00​%00^​%002​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00{b3l1ef.lnk​%00D​%00​%08​%00​%04​%00​%EF​%BE​%00​%00​%00​%00​%00​%00​%00​%00*​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00{​%00b​%003​%00l​%001​%00e​%00f​%00.​%00l​%00n​%00k​%00​%00​%00​%1A​%00​%00​%00,
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/6,BINARY,_​%00i​%00n​%00.​%00t​%00x​%00t​%00​%00​%00R​%002​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00_in.lnk​%00<​%00​%08​%00​%04​%00​%EF​%BE​%00​%00​%00​%00​%00​%00​%00​%00*​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00_​%00i​%00n​%00.​%00l​%00n​%00k​%00​%00​%00​%16​%00​%00​%00,
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/7,BINARY,_​%00r​%003​%00g​%00.​%00t​%00x​%00t​%00​%00​%00V​%002​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00_r3g.lnk​%00​%00>​%00​%08​%00​%04​%00​%EF​%BE​%00​%00​%00​%00​%00​%00​%00​%00*​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00_​%00r​%003​%00g​%00.​%00l​%00n​%00k​%00​%00​%00​%18​%00​%00​%00,
/Software/Microsoft/Windows/CurrentVersion/Explorer/RecentDocs/8,BINARY,p​%000​%00w​%00e​%00r​%00}​%00.​%00t​%00x​%00t​%00​%00​%00\​%002​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00p0wer}.lnk​%00​%00B​%00​%08​%00​%04​%00​%EF​%BE​%00​%00​%00​%00​%00​%00​%00​%00*​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00​%00p​%000​%00w​%00e​%00r​%00}​%00.​%00l​%00n​%00k​%00​%00​%00​%1A​%00​%00​%00,
```
{: file="HKCU" }

Looks like a sneaky attempt to hide the flag in the registry, lets add on the header and submit!

FLAG : `VishwaCTF{b3l1ef_in_r3g_p0wer}`
