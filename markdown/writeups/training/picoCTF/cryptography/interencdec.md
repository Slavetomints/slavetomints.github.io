# Interencdec

Challenge description:

> Can you get the real meaning from this file. Download the file [here](https://artifacts.picoctf.net/c_titan/1/enc_flag).

Alrighty, lets download the file and see what we get.

```

┌─[slavetomints@parrot]─[~]
└──╼ $wget https://artifacts.picoctf.net/c_titan/1/enc_flag
--2024-12-18 02:59:49--  https://artifacts.picoctf.net/c_titan/1/enc_flag
Resolving artifacts.picoctf.net (artifacts.picoctf.net)... 18.160.102.10, 18.160.102.59, 18.160.102.92, ...
Connecting to artifacts.picoctf.net (artifacts.picoctf.net)|18.160.102.10|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 73 [application/octet-stream]
Saving to: ‘enc_flag’

enc_flag                                        100%[=====================================================================================================>]      73  --.-KB/s    in 0s      

2024-12-18 02:59:50 (63.8 MB/s) - ‘enc_flag’ saved [73/73]

┌─[slavetomints@parrot]─[~]
└──╼ $ls
enc_flag
┌─[slavetomints@parrot]─[~]
└──╼ $cat enc_flag 
YidkM0JxZGtwQlRYdHFhR3g2YUhsZmF6TnFlVGwzWVROclgyeG9OakJzTURCcGZRPT0nCg==
```

Looks like some standard Base64 encoding, lets decode it and see what we get

```

┌─[slavetomints@parrot]─[~]
└──╼ $echo "YidkM0JxZGtwQlRYdHFhR3g2YUhsZmF6TnFlVGwzWVROclgyeG9OakJzTURCcGZRPT0nCg==" | base64 -d
b'd3BqdkpBTXtqaGx6aHlfazNqeTl3YTNrX2xoNjBsMDBpfQ=='
```

Hm, it looks like its pretty obfuscated still. Let's get rid of those quotes and the leading "b", and try running it through base64 again.

```

┌─[slavetomints@parrot]─[~/training/picoCTF/cryptogtaphy/interencdec]
└──╼ $echo "d3BqdkpBTXtqaGx6aHlfazNqeTl3YTNrX2xoNjBsMDBpfQ==" | base64 -d
wpjvJAM{jhlzhy_k3jy9wa3k_lh60l00i}
```

Hey, I recognize that format! It looks like its been rotated, so lets try to bruteforce the rotation with a simple script.

```ruby

encoded_variable = "wpjvJAM{jhlzhy_k3jy9wa3k_lh60l00i}"
flag = ''

(0..26).each do |num|
  current_word = ''
  encoded_variable.each_char do |char|
    if char.match?(/[a-zA-Z]/)  # Check if the character is a letter
      base = char.ord < 91 ? 'A'.ord : 'a'.ord  # Determine ASCII base (uppercase/lowercase)
      current_word += ((char.ord - base + num) % 26 + base).chr
    else
      current_word += char  # Keep non-letter characters unchanged
    end
  end
  puts "#{num} - #{current_word}"
  current_word.start_with?("picoCTF") ? flag = current_word : next
end

puts "\n"
puts "FLAG: #{flag}"
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE4Nzc2MzUyOSwtMzk0OTU0ODA1LC0yMD
U2OTg2MTQ1XX0=
-->