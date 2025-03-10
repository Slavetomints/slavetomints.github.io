# Rhythmic Cipher

Challenge description:

> A secret group has been exchanging messages using an unusual method—hiding words in plain sight through an old cipher. Their latest transmission has been intercepted.
> 
> Can you decode their message and uncover what they are trying to say?
> 
>  Flag Format:
> VishwaCTF{word1_word2}

So here we are given two tiny little GIFs, so lets take a look at them!

![gif 1](assets/gif1.gif)
![gif 2](assets/gif2.gif)

Immediately when given a GIF my first though is to extract each frame from it, so I can see it better. It doesn't matter what you use, just don't be clinking on random links. The extracted images of interest are as follows:

## gif1.gif
![Elon Musk](assets/1-1.gif)
![Gif 1-2](assets/1-2.gif)
![Gif 1-3](assets/1-3.gif)
![Gif 1-4](assets/1-4.gif)
![Gif 1-5](assets/1-5.gif)
![Gif 1-6](assets/1-6.gif)
![Gif 1-7](assets/1-7.gif)
![Gif 1-8](assets/1-8.gif)

## gif2.gif
![Gif 2-1](assets/2-1.gif)
![Gif 2-2](assets/2-2.gif)
![Gif 2-3](assets/2-3.gif)
![Gif 2-4](assets/2-4.gif)
![Gif 2-5](assets/2-5.gif)

## Elementary My Dear Watson!

I've seen this before, this looks like the `Dancing Man cipher`, which first debuted in Sir Arthur Conan Doyle's "The Adventure of the Dancing Men". It is a simple substitution cipher that has a different position of the characters arms and legs for different letters and numbers, the key is as follows:

![dancing men cipher](https://www.geocachingtoolbox.com/pages/codeTables/dancingMen.png)
Going back through each frame, we'll end up with `CIPHERED` and `DANCE`, which makes our flag!

FLAG: `VishwaCTF{CIPHERED_DANCE}`
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTU1MzI2NTA4OF19
-->