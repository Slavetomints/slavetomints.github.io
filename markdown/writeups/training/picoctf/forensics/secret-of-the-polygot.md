# Secret of the Polygot

Challenge description:

> The Network Operations Center (NOC) of your local institution picked up a suspicious file, they're getting conflicting information on what type of file it is. They've brought you in as an external expert to examine the file. Can you extract all the information from this strange file? Download the suspicious file [here](https://artifacts.picoctf.net/c_titan/8/flag2of2-final.pdf).

Alrighty! Lets first check the file type using the `file` command!

```

┌─[slavetomints@parrot]─[~]
└──╼ $file flag2of2-final.pdf 
flag2of2-final.pdf: PNG image data, 50 x 50, 8-bit/color RGBA, non-interlaced
```

Hm, that's odd, let's `cp` it into a PNG file and render it

![that... half the flag](assets/image0.png)

Hm, odd again. I wonder what happens if I try to load in the PDF?

![there's the other half!](assets/image1.png)

Huh, that was weird.

FLAG: `picoCTF{f1u3n7_1n_pn9_&_pdf_249d05c0}`
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI4ODI5NzgyMl19
-->