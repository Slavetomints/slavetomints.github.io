---
title: Weak Crypto
date: 2024-12-23 19:47:00 -0600
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

&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
    &lt;title&gt;Admin Panel&lt;/title&gt;
    &lt;link href="static/bootstrap.min.css" rel="stylesheet"&gt;
    &lt;link href="static/admin.css" rel="stylesheet"&gt;
    &lt;script src="static/bootstrap.min.js"&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div class="container"&gt;
        &lt;div class="row vertical-center"&gt;
            &lt;div class="col-md-4 col-md-offset-4"&gt;
                &lt;div class="panel panel-default"&gt;
                    &lt;div class="panel-heading"&gt;
                        &lt;h3 class="panel-title text-center"&gt;&lt;b&gt;Admin Panel&lt;/b&gt;&lt;/h3&gt;
                    &lt;/div&gt;
                    &lt;div class="panel-body"&gt;
                        &lt;form id="login_form" handled="true" method="#" action="#"&gt;
                            &lt;fieldset&gt;
                                &lt;div class="form-group"&gt;
                                    &lt;input class="form-control" placeholder="Username" name="username" id="username" type="text" disabled=""&gt;
                                &lt;/div&gt;
                                &lt;div class="form-group"&gt;
                                    &lt;input class="form-control" placeholder="Password" name="password" id="password" type="password" disabled=""&gt;
                                &lt;/div&gt;
                                &lt;input type="submit" name="submit" id="submit" class="btn btn-block btn-primary" disabled=""&gt;
                            &lt;/fieldset&gt;
                        &lt;/form&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;div class="text-center"&gt;&lt;a href="api/user"&gt;You can verify your user status here&lt;/a&gt;&lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
  &lt;/body&gt;
&lt;/html&gt;

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
