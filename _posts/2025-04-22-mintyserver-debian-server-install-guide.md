---
title: Debian Server Installation Guide
date: 2025-04-22 22:32:52
categories: [mintyserver.lab, Building the Lab]
tags: [homelab, debian]
description: Let's install Debian 12 for the Plex Server!
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

![ventoy starting](/assets/img/mintyserver/ventoyStart.jpeg)

From there we'll select the Debian image that we saved onto there, and then boot it into normal mode.

After that it's a pretty standard Debian install, hostname was `mintyserver-plex`, to specify that it's the Plex server. We are not going to install a desktop, and instead keep it only as an SSH server. The last notable thing we are going to do is manually partition the server out. Since all the media is being stored on an external drive, we can afford some more swap space than normal. 

Now, I am aware that a general convention for swap is 1.5x the amount of RAM the system has installed, but seeing as the server only has 8GB of RAM I decided to allocate a whole 24GB of swap for any transcoding issues that occur. 

## Testing... Testing...
Sweet, so let's go back to our computer and connect right in!

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $ssh slavetomints@plex.mintyserver.lab 
ssh: connect to host plex.mintyserver.lab port 22: No route to host
```

> Note: for now all the domain names are a result of `/etc/hosts` shenanigans, once we install some more services, I plan to get a DNS server up and running on the lab to organize all of this.
{: .prompt-info }

Hm, seems like it's not connected to the network, which would be correct. Since we haven't run any ethernet cable to the server, and it has a WLAN card, let's go ahead and set up Wi-Fi for the server temporarily.

### Wireless Access
Alright, so on the server, we don't have `nmcli`, or `nmtui`, which are both very popular network managers used. For this we'll be using `wpa_supplicant` to connect to the network. First off, we'll need to configure the `/etc/wpa_supplilcant.conf` file:

```plaintext
ctrl_interface=DIR=/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
    ssid="SSID"
    psk="PASSWORD"
}
```
{: file="/etc/wpa_supplicant.conf"}

Alright, so line by line let's go over this. 

1. `ctrl_interface=DIR=/run/wpa_supplicant GROUP=netdev`
This line allows it to work with CLI tools, and also allows those in the `netdev` group to edit the file without needing `root` access. 
2.  `update_config=1`
This line allows those other tools to edit this file and save configs.
3.  `country=US`
This is included for regulatory compliance
4. `network={...`
This is where you throw in the SSID and password of the wireless network to connect.


Once all of that is done, lets run the command `sudo wpa_supplicant -B -i wlp0s20f3 -c /etc/wpa_supplicant.conf`. The `-B` flag specifies background mode, so we can still use the CLI without having logs pollute the terminal. `-i wlp0s20f3` specifies the interface, and `-c /etc/wpa_supplicant.conf` specifies the configuration file we're using.

Now remember, this is only a temporary solution until I can run Ethernet down to the server, and we won't be using it for the long term.

After that, we need to get an IP from the router, so the command `sudo dhclient wlp0s20f3` will do just that. Now running `ip a` we see:

```terminal
slavetomints@mintyserver-plex:~$ ip address | grep 192
    inet 192.168.1.75/24 brd 192.168.1.255 scope global dynamic wlp0s20f3
```

Heck yeah! we got an IP. Let's try that SSH connection again

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $ssh slavetomints@plex.mintyserver.lab 
slavetomints@plex.mintyserver.lab's password: 

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
slavetomints@mintyserver-plex:~$ 
```

We did it!
