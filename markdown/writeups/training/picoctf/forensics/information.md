# Information

Challenge description:

> Files can always be changed in a secret way. Can you find the flag? 

In this challenge, we are presented with a lovely picture of a cat, so obviously we'll have to break out `exiftool` for this one.

```

┌─[slavetomints@parrot]─[~/training/picoCTF/forensics/information]
└──╼ $exiftool cat.jpg 
ExifTool Version Number         : 12.57
File Name                       : cat.jpg
Directory                       : .
File Size                       : 878 kB
File Modification Date/Time     : 2021:03:15 13:24:46-05:00
File Access Date/Time           : 2025:01:21 12:03:33-06:00
File Inode Change Date/Time     : 2025:01:21 12:03:33-06:00
File Permissions                : -rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.02
Resolution Unit                 : None
X Resolution                    : 1
Y Resolution                    : 1
Current IPTC Digest             : 7a78f3d9cfb1ce42ab5a3aa30573d617
Copyright Notice                : PicoCTF
Application Record Version      : 4
XMP Toolkit                     : Image::ExifTool 10.80
License                         : cGljb0NURnt0aGVfbTN0YWRhdGFfMXNfbW9kaWZpZWR9
Rights                          : PicoCTF
Image Width                     : 2560
Image Height                    : 1598
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 2560x1598
Megapixels                      : 4.1
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbODczMzc2MjQ1LDg1MTQ4ODkyMF19
-->