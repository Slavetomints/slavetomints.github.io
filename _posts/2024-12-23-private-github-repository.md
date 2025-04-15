---
title: Private Github Repository
date: 2024-12-23 19:47:00 +/-0600
categories: [Capture The Flags, 1337Up Live 2024]
tags: [ctf, 1337up, osint, writeups]
pin: true
---

Challenge description:

> Bob Robizillo created a public instructions for Tiffany, so she can start work on new secret project. can you access the secret repository?

Unfortunately, or, rather fortunately, there is no way to see a private GitHub repository unless you've been invited as a collaborator. So lets leverage our amazing OSINT skills to find any trace of Mr. Robizillo on the Internet. Now, your results may vary, but for me `"Robizillo" site:github.com` turned up nothing, so I then tied with a more general search `"Robizillo"`. And now we see why the first search turned up nothing, it's a github gist! Lets t ake a look at what it says.

![A GitHub Gist, where Bob Robizillo asks TIffany to add a key to her account](/assets/img/1337up-2024/private-github-repository/image1.png)

Hm, the provided "key" doesn't seem to be an actual SSH/RSA Key, I wonder if it's an encrypted message of some sorts. My favorite site to use for decryption is [CyberChef](https://gchq.github.io/CyberChef/), so lets copy and paste the encrypted message into there. 

Now, when using CyberChef, you create a 'recipe' using blocks that do various functions. One of the more useful ones to always start with is the `magic` block, as it try's to automatically detect what you can do to it. It's very helpful for when you have no idea where to even begin, or if you are stuck and don't know where to go next. For this time around, it recommended we do `From Base64` and then `Unzip`, so lets load that into the recipe and see what we get!

![A Picture of CyberChef, the current recipe is From Base64 and then Unzip](/assets/img/1337up-2024/private-github-repository/image2.png)

Looks like there was a file hidden in the message! Let's download the file and see what we get. Once its on our machine we'll use `cat id_rsa` to output it to the commandline

![output of cat id_rsa, its a openssh private key](/assets/img/1337up-2024/private-github-repository/image3.png)

Looks like we now have a private key for ssh. Remember back to the message that Bob Robizillo said TIffany would have to add it in order to work on the repository. Lets add the key to our session and try to clone the `1337up` repository Bob mentioned in his earlier message. Since we know Bob's username is `bob-193`, we can be pretty sure that the repository is hidden in there. First things first, we need to add the key. `ssh-add id_rsa` takes care of that perfectly, and `git clone git@ithub.com:bob-193/1337up` gets us the repository!

![Adding the key to our session](/assets/img/1337up-2024/private-github-repository/image4.png)

![Cloning Bob Robizillo's 1337up repository](/assets/img/1337up-2024/private-github-repository/image5.png)

Checking inside the repository shows up a file named `readme.md`, which reads:

> Hey, Tiffany! You will need to save this repo in your user space and implement changes we agreed earlier.

![Poking around the repository](/assets/img/1337up-2024/private-github-repository/image6.png)

Hm, thats not very helpful. A further inspection of `git log` shows only the one commit, and there's nothing hidden in the `.git` directory. Is this the end of the line? We know we need to find Tiffany's username since she made a fork of the repository. We know she did because Bob alluded to it in his first message, and now in the recent `readme.md`. If only we had a way to authenticate a key... but wait! we do! Lets take a closer look at the `ssh` command.

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $ssh 
usage: ssh [-46AaCfGgKkMNnqsTtVvXxYy] [-B bind_interface]
           [-b bind_address] [-c cipher_spec] [-D [bind_address:]port]
           [-E log_file] [-e escape_char] [-F configfile] [-I pkcs11]
           [-i identity_file] [-J [user@]host[:port]] [-L address]
           [-l login_name] [-m mac_spec] [-O ctl_cmd] [-o option] [-p port]
           [-Q query_option] [-R address] [-S ctl_path] [-W host:port]
           [-w local_tun[:remote_tun]] destination [command [argument ...]]
```

Now, most of that isn't going to be useful to us, except for the `-i` option Checking the manpage for `ssh` also shows up the `-T` option. Lets take a closer look at each.

The `-T` option tells ssh to no allocate a pseudo-terminal for the connection. Since we don't need a terminal for authenticating, theres no reason to allocate one. This should show the difference between using and not using it.

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $ssh git@github.com
PTY allocation request failed on channel 0
Hi Slavetomints! You've successfully authenticated, but GitHub does not provide shell access.
Connection to github.com closed.
┌─[✗]─[slavetomints@parrot]─[~]
└──╼ $ssh -T git@github.com
Hi Slavetomints! You've successfully authenticated, but GitHub does not provide shell access.
```

It's not required to use it, but it helps to keep the terminal a little bit clearer. Now, the `-i` option specifies an identity file to use, such as the `id_rsa` file we have. So, now we can try to authenticate with GitHub using that identity only. The full command now is `ssh -T -i id_rsa git@github.com`.

![Authenticating with GitHub](/assets/img/1337up-2024/private-github-repository/image7.png)

This is great! Now we know Tiffany's username, so we can clone over her fork of the `1337up` repository!

![Cloning Tiffany's fork of 1337up](/assets/img/1337up-2024/private-github-repository/image8.png)

Let's poke around a bit in here. we see the same `readme.md` from earlier, but now there's also a `config/` directory. Going into that and checking it out reveals a `.env` file which unfortunately doesn't contain a flag. 

![Poking around Tiffany's 1337 repository](/assets/img/1337up-2024/private-github-repository/image9.png)

However, `git log` does show that theres been 4 commits on this repo. While its possible to use `git diff [<options>] [<commit>]` to see the changes in a commit, I prefer to use VSCodes built in git log functionality. And looking at the changelogs there for previous commits reveals...

![git log on the repository](/assets/img/1337up-2024/private-github-repository/image10.png)

![VsCode](/assets/img/1337up-2024/private-github-repository/image11.png)

![The changelog for the commits in VSCode](/assets/img/1337up-2024/private-github-repository/image12.png)

Another repository! Ugh this is getting kind tedious, but nevertheless, lets clone that one and check it out

![cloning the other repository](/assets/img/1337up-2024/private-github-repository/image13.png)

![finding the flag!](/assets/img/1337up-2024/private-github-repository/image14.png)

Finally! We've found the flag, but we should clean up first. All we'll need to do is run `ssh-add -d is_rsa` to remove that key, because we don't need it anymore, and we're all good! Hopefully you learned a thing or two about git and GitHub on your way here.

FLAG: INTIGRITI{9e0121bb8bce15ead3d7f529a81b77b4}
