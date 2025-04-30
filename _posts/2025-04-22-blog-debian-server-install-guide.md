---
title: Debian Server Installation Guide
date: 2025-04-22 22:32:52
categories: [Blog]
tags: [homelab, debian]
description: Let's install Debian 12!
---

### What's Debian?
So, if you're new to Linux or even UNIX-like systems in general, you get a pass here. If not... I'd like to see the rock you've been living under.

Debian is a distribution of GNU/Linux, and without going into the fine details about it (which I totally can in a future post if that's your jam) you can think of it as a "flavor" of Linux. It is considered to be a more stable version of Linux, and less prone to breaking, which is perfect for our needs.

## Creating the Bootable Media
There are two paths here for creating bootable media, the first is to use a tool like Rufus or balenaEtcher to format a USB, or use Ventoy. We'll go over both here.

### First Off
Before we even think about making the media, we need the ISO file for it. That can be found [here](https://www.debian.org/download). Once we download the file, we should calculate the checksum and compare it to the one provided by them. If they match, that's great, we have the right one. If they don't match, then that might mean that the image has been tampered with, and it should be immediately reported to the Debian Security Team. They give us the following SHA-512 checksum:

```plaintext
cb089def0684fd93c9c2fbe45fd16ecc809c949a6fd0c91ee199faefe7d4b82b64658a264a13109d59f1a40ac3080be2f7bd3d8bf3e9cdf509add6d72576a79b  debian-12.10.0-amd64-netinst.iso
```
So with this, let's put it in a file named `checksums.txt`, and check the SHA-512 output of our ISO file with the `-c ` flag set. That reads from the checksum file provided, and then calculates the checksum of the file on our system.

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $sha512sum -c checksums.txt 
debian-12.10.0-amd64-netinst.iso: OK
```

Sweet, looks like we're all good to continue the process of creating the boot drive

### Rufus / balenaEtcher
So if you just need it the one time, it might be best to just use one of these two programs. Make sure you find a USB stick that can both hold the ISO file, and some extra space. You can download balenaEtcher [here](https://etcher.balena.io/), and Rufus [here](https://rufus.ie/en/). In this guide, I'll go over the steps for balenaEtcher, but the steps for Rufus are very simple as well.

![balenaEtcher](/assets/img/blog/balenaEtcher.png)

First, make sure to pick an empty drive, as the process will wipe everything from the drive. It should auto select your USB if it's the only one you have plugged in, but otherwise you can easily pick the one you want to use.

Next you're going to have to select your ISO, so navigate to the ISO and select it.

![finishing the ISO](/assets/img/blog/dolphinDebianISO.png)

And finally, your screen should look like this:

![balenaEtcher ready to go](/assets/img/blog/balenaReady.png)

Now it's time to let it run. Go get some water, or like touch grass in the meantime.

---

Once it's done, you should see this on your screen:

![balenaEtcher done!](/assets/img/blog/balenaDone.png)

Now you're ready for the next step!

### Ventoy

If you're going to be doing installs of multiple operating systems, like I am, it might get tedious to have to continuously remake a boot drive whenever you need it. This is where Ventoy excels, all you need to do is format the drive once, and the rest is as easy as drag-n-drop. Let's look at that now.

Once you've downloaded Ventoy for your OS, start the program. We're going to be using the GUI version today. Once it loads, you should see this screen:

![](/assets/img/blog/ventoyStart.png)

Click the install button and you're all set! Once it's done, all you need to do is just drag the ISO file you want into the USB, and it'll be there when you are ready to install.

## The Installation
Alright, so our USB drive in hand, we plug it into the computer and reboot into the UEFI. We need to make sure that we're booting into the media we created. Since I used Ventoy, we'll go through that. 

Once you boot into Ventoy, it's a pretty easy process to pick the ISO file you want to boot up

From there, we'll select the Debian image that we saved onto there, and then boot it into normal mode.

Finally, we can get started on the actual installation. You should now see this screen:

![](/assets/img/blog/debianInstall.png)

We'll select graphical install to make things simpler for us.

### The Basic Stuff
It's going to ask you a few things right out of the bat, language, location, keyboard layout. That just helps with configuring the computer to work the way you intend for it to work. You don't want it showing the wrong time or sending the wrong keystrokes!

### Network Configuration
After that it'll ask you to set a hostname, which is what the computer calls itself, and can be used to identify it to the network. It is also what you see after the `@` in the terminal prompt.

Next, it'll ask you for a domain name, either you make one up on the spot because you don't need to worry about it, or you set it up based on your homelab/company needs. For example, if the hostname is `debian1`, and you set the domain name to be `homelab.lab`, then the fully qualified domain name (FQDN) for that computer is `debian1.homelab.lab`. For the basic user this doesn't matter, but if you're setting up an homelab you might want to take this into consideration.

### User Access
Now it's time to set up the user accounts, but first we need to set a `root` password. You can think of `root` as the admin account of the system. If you don't set a root password, then the user account will be given the ability to act as admin, and that's a bad practice. The admin account and the user account should always be separated. Make sure to give it a strong password using multiple types of characters.

Once you've done that, it'll ask you for the name, username and password you'd like to use on the system. The name helps to identify who the account belongs to, the username is what the user wants to go by, and make sure to set a strong password.

### Partitioning
Now that the meat and potatoes are out of the way, it'll ask for your timezone, and then about partitioning.

For some people, partitioning is where they get to let their creativity shine, for others it's a terrifying ordeal. Thankfully, there are guided partitioning schemas now, so I'll select the option `Guided - use entire disk and set up encrypted LVM`, that way my data is secure.

Then, select the disk you want to use, if there are multiple, pick the one that's not the USB stick. It'll also ask you if you want to split up the partitions based on different schemas, but I recommend for new users to just select the first option, as it makes things much simpler.

Now, since I selected to use an encrypted disk, I'll also need to set up a password for that. Make sure that it is also strong and complex too.

### Finishing Up

Once it's done and the partitions are the way you like it, go ahead and write the changes to disk!

After that's done it'll begin to install the base OS, and configure the package manager, which you can select the defaults for unless you have special preferences.

Finally, you'll select your desktop environment. By default, it comes with `GNOME`, but I recommend trying out different ones. I personally like `MATE`. But of course, if it's a web server or an SSH server, then you'll probably want that to be headless (without a desktop).

It'll have you install GRUB, which is a  bootloader, in order to have you boot up the OS. If you have another OS, it will temporarily make the OS unusable until you configure GRUB later to boot it. 

Finally! You're done! Reboot and enjoy your new OS!
