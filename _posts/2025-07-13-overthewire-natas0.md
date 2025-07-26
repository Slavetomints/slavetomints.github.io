---
title: natas0
date: 2025-07-13
categories: [Capture The Flags, OverTheWire]
tags: [ctf, overthewire, natas, writeups]
description: OverTheWire natas0 Challenge
---


> Challenge description:
>
>
 http://natas0.natas.labs.overthewire.org
{: .prompt-info }

Okay, so let's load up the site!

![the landing page](/assets/img/overthewire/natas0-0.png)

Hm, well I don't see it on the page, so let's look at the `html` that makes up the site.

```html
<html>

<head>
    <!-- This stuff in the header has nothing to do with the level -->
    <link rel="stylesheet" type="text/css" href="http://natas.labs.overthewire.org/css/level.css">
    <link rel="stylesheet" href="http://natas.labs.overthewire.org/css/jquery-ui.css" />
    <link rel="stylesheet" href="http://natas.labs.overthewire.org/css/wechall.css" />
    <script src="http://natas.labs.overthewire.org/js/jquery-1.9.1.js"></script>
    <script src="http://natas.labs.overthewire.org/js/jquery-ui.js"></script>
    <script src=http://natas.labs.overthewire.org/js/wechall-data.js></script>
    <script src="http://natas.labs.overthewire.org/js/wechall.js"></script>
    <script>
        var wechallinfo = { "level": "natas0", "pass": "natas0" };
    </script>
</head>

<body>
    <h1>natas0</h1>
    <div id="content">
        You can find the password for the next level on this page.

        <!--The password for natas1 is {hidden in accordance with game rules} -->
    </div>
</body>

</html>
```

And look at that, the password was in a comment on the source code, which is a real problem you'll find in the world.

