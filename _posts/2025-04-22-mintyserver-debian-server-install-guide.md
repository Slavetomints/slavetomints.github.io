---
title: Debian Server Installation Guide
date: 2025-04-22 22:32:52
categories: [mintyserver.lab, Building the Lab]
tags: [homelab, debian]
description: Let's install Debian 12!
---

Alright, so as outlined in the beginning post, we're going to be migrating over to Debian for our server, and simply operate it headlessly rather than have a GUI, so let's look over the installation process for Debian 12 as an SSH server, and optimize the hardware we have with Plex in mind.

### What's Debian?
So, if you're new to Linux or even UNIX-like systems in general, you get a pass here. If not... I'd like to see the rock you've been living under.

Debian is a distribution of GNU/Linux, and without going into the fine details about it (which I totally can in a future post if that's your jam) you can think of it as a "flavor" of Linux. It is considered to be a more stable version of Linux, and less prone to breaking, which is perfect for our needs.

## Creating the Bootable Media
There are two paths here for creating bootable media, the first is to use a tool like Rufus or balenaEtcher to format a USB, or use Ventoy. We'll go over both here.

### First Off
Before we even think about making the media, we need the ISO file for it. That can be found [here](https://www.debian.org/download). Once we download the file, we should calculate the checksum and compare it to the one provided by them. If they match that's great we have the right one. If they don't match then that might mean that the image has been tampered with and it should be immediately reported to the Debian Security Team. They give us the following SHA-512 checksum:

```plaintext
cb089def0684fd93c9c2fbe45fd16ecc809c949a6fd0c91ee199faefe7d4b82b64658a264a13109d59f1a40ac3080be2f7bd3d8bf3e9cdf509add6d72576a79b  debian-12.10.0-amd64-netinst.iso
```
So with this let's put it in a file named `checksums.txt`, and check the SHA-512 output of our ISO file with the `-c ` flag set. That reads from the checksum file provided, and then calculates the checksum of the file on our system.

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $sha512sum -c checksums.txt 
debian-12.10.0-amd64-netinst.iso: OK
```

Sweet, looks like we're all good to continue the process of creating the boot drive

### Rufus / balenaEtcher
So if you just need it the one time, it might be best to just use one of these two programs. Make sure you find a USB stick that can both hold the ISO file, and some extra space. You can download balenaEtcher [here](https://etcher.balena.io/), and Rufus [here](https://rufus.ie/en/). In this guide, I'll go over the steps for balenaEtcher, but the steps for Rufus are very simple as well.

![balenaEtcher](/assets/img/mintyserver/balenaEtcher.png)

First make sure to pick an empty drive, as the process will wipe everything from the drive. It should auto select your USB if it's the only one you have plugged in, but otherwise you can easily pick the one you want to use.

Next you're going to have to select your ISO, so navigate to the ISO and select it.

![finishing the ISO](/assets/img/mintyserver/dolphinDebianISO.png)

And finally your screen should look like this:

![balenaEtcher ready to go](/assets/img/mintyserver/balenaReady.png)

Now it's time to let it run. Go get some water, or like touch grass in the meantime.

---

Once it's done you should see this on your screen:

![balenaEtcher done!](/assets/img/mintyserver/balenaDone.png)

Now you're ready for the next step!

### Ventoy

If you're going to be doing installs of multiple operating systems, like I am, it might get tedious to have to continuously remake a boot drive whenever you need it. This is where Ventoy excels, all you need to do is format the drive once, and the rest is as easy as drag-n-drop. Let's look at that now.

Once you've downloaded Ventoy for your OS, start the program. We're going to be using the GUI version today. Once it loads, you should see this screen:

![](/assets/img/mintyserver/ventoyStart.png)

Click the install button and you're all set! Once it's done all you need to do is just drag the ISO file you want into the USB and it'll be there when you are ready to install.

## The Installation
Alright, so our USB drive in hand, we plug it into the computer and reboot into the UEFI. We need to make sure that we're booting into the media we created. Since I used Ventoy, we'll go through that. 

Once you boot into Ventoy, it's a pretty easy process to pick the ISO file you want to boot up

From there we'll select the Debian image that we saved onto there, and then boot it into normal mode.

![](/assets/img/mintyserver/debianInstall.png)

After that it's a pretty standard Debian install. We are not going to install a desktop, and instead keep it only as an SSH server. The last notable thing we are going to do is manually partition the server out. Since all the media is being stored on an external drive, we can afford some more swap space than normal. 

Now, I am aware that a general convention for swap is 1.5x the amount of RAM the system has installed, but seeing as the server only has 8GB of RAM I decided to allocate a whole 24GB of swap for any transcoding issues that occur. 

And thats about it, once we're here, make sure you can get an IP address and then you can SSH in and remotely work with the server!