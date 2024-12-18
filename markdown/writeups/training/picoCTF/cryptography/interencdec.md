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

And that gives us:

```

┌─[slavetomints@parrot]─[~]
└──╼ $ruby decode.rb 
0 - wpjvJAM{jhlzhy_k3jy9wa3k_lh60l00i}
1 - xqkwKBN{kimaiz_l3kz9xb3l_mi60m00j}
2 - yrlxLCO{ljnbja_m3la9yc3m_nj60n00k}
3 - zsmyMDP{mkockb_n3mb9zd3n_ok60o00l}
4 - atnzNEQ{nlpdlc_o3nc9ae3o_pl60p00m}
5 - buoaOFR{omqemd_p3od9bf3p_qm60q00n}
6 - cvpbPGS{pnrfne_q3pe9cg3q_rn60r00o}
7 - dwqcQHT{qosgof_r3qf9dh3r_so60s00p}
8 - exrdRIU{rpthpg_s3rg9ei3s_tp60t00q}
9 - fyseSJV{squiqh_t3sh9fj3t_uq60u00r}
10 - gztfTKW{trvjri_u3ti9gk3u_vr60v00s}
11 - haugULX{uswksj_v3uj9hl3v_ws60w00t}
12 - ibvhVMY{vtxltk_w3vk9im3w_xt60x00u}
13 - jcwiWNZ{wuymul_x3wl9jn3x_yu60y00v}
14 - kdxjXOA{xvznvm_y3xm9ko3y_zv60z00w}
15 - leykYPB{ywaown_z3yn9lp3z_aw60a00x}
16 - mfzlZQC{zxbpxo_a3zo9mq3a_bx60b00y}
17 - ngamARD{aycqyp_b3ap9nr3b_cy60c00z}
18 - ohbnBSE{bzdrzq_c3bq9os3c_dz60d00a}
19 - picoCTF{caesar_d3cr9pt3d_ea60e00b}
20 - qjdpDUG{dbftbs_e3ds9qu3e_fb60f00c}
21 - rkeqEVH{ecguct_f3et9rv3f_gc60g00d}
22 - slfrFWI{fdhvdu_g3fu9sw3g_hd60h00e}
23 - tmgsGXJ{geiwev_h3gv9tx3h_ie60i00f}
24 - unhtHYK{hfjxfw_i3hw9uy3i_jf60j00g}
25 - voiuIZL{igkygx_j3ix9vz3j_kg60k00h}
26 - wpjvJAM{jhlzhy_k3jy9wa3k_lh60l00i}

FLAG: picoCTF{caesar_d3cr9pt3d_ea60e00b}
```

Pretty simple honestly, lol.

FLAG: `picoCTF{caesar_d3cr9pt3d_ea60e00b}`
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTkzNDk1MDc1OCwtMTg3NzYzNTI5LC0zOT
Q5NTQ4MDUsLTIwNTY5ODYxNDVdfQ==
-->