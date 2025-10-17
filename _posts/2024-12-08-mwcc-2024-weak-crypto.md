---
title: Weak Crypto
date: 2024-12-08 19:47:00 -0600
categories: [Capture The Flags, Mountain West Cyber Challenge]
tags: [ctf, mountain west cyber challenge, web, writeups]
description: Mountain West Cyber Challenge Weak Crypto Challenge
---

> Challenge description:
>
> We were recently hacked, so we needed to take our entire login application offline. All users who access the site are forced to be anonymous users only based on their session token.
> 
> Can you verify that our fix is effective?
> 
> Note: The login functionality and form are actually disabled, there is no brute forcing required to solve this challenge; focus on the session token
{: .prompt-info }

Hm, that sounds no great, lets take  quick look at the html to verify that we cant enter anything in.

```html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin Panel</title>
    <link href="static/bootstrap.min.css" rel="stylesheet">
    <link href="static/admin.css" rel="stylesheet">
    <script src="static/bootstrap.min.js"></script>
  </head>
  <body>
    <div class="container">
        <div class="row vertical-center">
            <div class="col-md-4 col-md-offset-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title text-center"><b>Admin Panel</b></h3>
                    </div>
                    <div class="panel-body">
                        <form id="login_form" handled="true" method="#" action="#">
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Username" name="username" id="username" type="text" disabled="">
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Password" name="password" id="password" type="password" disabled="">
                                </div>
                                <input type="submit" name="submit" id="submit" class="btn btn-block btn-primary" disabled="">
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div class="text-center"><a href="api/user">You can verify your user status here</a></div>
            </div>
        </div>
    </div>
  </body>
</html>

```

Yep, seems like we cant access anything, lets go take a look at those cookies.

![finding the cookies](/assets/img/mwcc-2024/weak-crypto/image0.png)

That cookie looks like it might be encoded, and Cyber Chef think so too. Usin a Base64 decoder we can turn `eyJ1c2VyIjogImFub255bW91cyJ9` into `{"user": "anonymous"}`.

Let's verify who we are by clicking on the link. We see that we go to `/api/user`

Now, this might seem insecure, and yep that's right. Lets attempt some privilage escalation by making out own little cookie. We cant forget to encode it too. `{"user": "admin"}` becomes `eyJ1c2VyIjogImFkbWluIn0=`

And now if we revisit the verification api...

```json

{
  "flag": "CTF{c75b3e039425dfcf0c5ef0dfdd5b00a3}"
}

```

Gottem

FLAG: `CTF{c75b3e039425dfcf0c5ef0dfdd5b00a3}`
