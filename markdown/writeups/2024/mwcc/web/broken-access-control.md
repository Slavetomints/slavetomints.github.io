# broken-access-control

Challenge description:

> You are John, a student at the school. There is a flag hidden somewhere in the website. You might need to gain access to admin privileges for the information you seek. Here are your credentials for the website: username: John password: johndoe123 

![the login page](assets/image0.png)

Hm, lets try something before we log in. In the browser we can see that we're at `https://dockeridgohere.challenge.hackazon.org/login`, what if we went to `https://doesanyonereadthese.challenge.hackazon.org/admin`.

![holy shit](assets/image1.png)

Holy shit that actually worked.

FLAG: `CTF{5468697365626f6f6b6973666f727468}`