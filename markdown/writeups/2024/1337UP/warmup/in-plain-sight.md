# In Plain Sight

Challenge description:

> Barely hidden tbh..

We're given this photo

![kibby!](meow.jpg)

So lets do some good digital forensics and run `binwalk` on it

![binwalk pt.1](image0.png)

Aha! So there's some hidden zip files in there. Lets use the extract option with `binwalk` by adding `-e` to the end of the command.

![binwalk pt.mine](image1.png)

Alas, it appears the zip files contents are locked. Maybe someone else has already figured out a password? Lets check out `Aperi'Solve`

![locked!](image2.png)

![Aperi'Solve](image3.png)

It's right, I never wouldve gotten that. Let's throw that into the file and we get a blank white image. Hm. maybe `Aperi'Solve` isn't done yet 

![flagged!](image4.png)

Looks like the flag was hiding, but we found it nonetheless.

FLAG: `INTIGRITI{w4rmup_fl46z}`