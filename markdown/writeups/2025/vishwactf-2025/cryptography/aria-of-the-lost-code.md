# Aria of the Lost Code

Challenge description: 

> A shattered data shard from an ancient relic has been recovered. It hums with a cryptic resonance, revealing a fragmented inscription in an unknown script. After intense decryption efforts, a single phrase emerged:
>
> "The melody echoes beyond the void."
>
> Can you uncover the true message hidden within?
> 
> Flag Format:
> VishwaCTF{A4v4_a4a_4aa4a_Aa_44a4a4a4}

All we are given for this challenge is a single image with some patterns on it:

![the challenge](assets/Chall_crypto.png)

Now, I highly doubt that this is a novel encoding, so lets do a quick reverse image search to look for similar ciphers. And as a result of that I found the following:

![hymmnos](assets/Hymmnos.png)

Looks like we have the cipher down, now all we need to do is decrypt it and we'll be on our way!

FLAG: `VishwaCTF{H4v3_y0u_7ri3d_Ar_70n3l1c0}`
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQyNDUwNDAzMiw1NzIwNzYwNzRdfQ==
-->