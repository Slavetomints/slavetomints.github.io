---
title: Free Flags!
date: 2025-05-27
categories: [Capture The Flags, NahamCon CTF 2025]
tags: [ctf, nahamcon ctf 2025, misc, writeups]
description: NahamCon CTF 2025 Free Flags! Challenge
---

> Challenge description: 
>  
>  WOW!! Look at all these free flags!!  
> 
> But... wait a second... only one of them is right??
{: .prompt-info }

Okay, so for this challenge we are given a file with about ~3000 different flags, as such:

```terminal
┌─[slavetomints@parrot]─[~]
└──╼ $head free_flags.txt 
flag{fdSedc8056871bd0de7bf32f40e26c70}  flag{94c67d7c1800bbe53c5f121b217b057O}  flag{40c243fG117bf6ba86069002fc5cc98a}  flag{e98bd0f840c7b29aSfc8a0a408535274}  flag{8bl32486f3d00918487b7fc2fa304d89}  flag{fe3g277549005a4a09bff6735607fa39}
flag{bSb5973d364a4b74747f0f5a4a0920f2}  flag{S68f15c0eef79d80faeba2ae7d357d20}  flag{G5ad0075e8d398e5a4a4894e0f605fa4}  flag{cSc20baca1c8411043936b901c82f2c6}  flag{3bb4e247266f601a22bd396f0767f14l}  flag{agb40dfbffd1ee14d09bf07df90c412e}
flag{2l83d36a434a6024c5360245659082d8}  flag{bbca8dgaf7bd8705c44eb6b34ea077ad}  flag{8298lf2ecd2e9b91b00bbbe0410581da}  flag{ae7Sd5c525e75395ad31df2207408822}  flag{cadcO0175bbf1e921dc92a0b2ad136c8}  flag{gb432f916418739a71b204a95b9f0b0a}
flag{c3a76a1a315bf65fga2be4413976a490}  flag{aSbec81d30ff5561530eee063590e3b9}  flag{0827d3d2ceS0a167ba706d6a74c3b1f5}  flag{blbc77f75640414a7572fb13c11f58fa}  flag{dO2cede9ff9a646a2f88a9e195f35a86}  flag{052af498fc330e87529508O965e66912}
flag{bO63c6d3dee096739c0662f05cd193eb}  flag{O3cd4c2b5e7951abaf5eadd81b84e819}  flag{2f7c3G3cd59a3a5c662361c4fd93ea10}  flag{738bd884c707c516d198c210e768Scb2}  flag{44ld9c16faf51fb740c1637547e59884}  flag{4cadf511c7879acc38c53Geeec419fc1}
flag{O888a29189480aa82a20bfb9e51390fc}  flag{4eOa421b1f13f5de81a556ddc6733e4d}  flag{bl3c5f503e4d731dfa02b6b46896e739}  flag{22b7O124361987955ddb73f5350f3f69}  flag{dcG08a6e545ccb93e686fc0997ab13a8}  flag{l4d4e2feadb6cf0a5fe3e1085e5c4060}
flag{S695003506ddfb50475fd94b1ba1552a}  flag{4fcO8966c6dcd248a0a90edbb4c82999}  flag{3b6f91edf229aO7781f9a29aa3292193}  flag{ec7f7g2a492704fc8c77defde8c3f6f6}  flag{S57e47491476719091c56fa140f23fda}  flag{9f317S602042bf7efa423b89081c4052}
flag{ac86424becc7573e0eaae39Se3ae7ba4}  flag{ge5c3ecb6414725c3f6063b52d0c0c7a}  flag{eege4f7d0d26a94fd9e5f000b0c6a326}  flag{9964f5791acab951510lb82badf2412c}  flag{ec7Ob0a1ce30cc41ac788e65404c173c}  flag{af3g3354d4186cc4eeb2a3e19376031f}
flag{el74c16423c75a44d047b8b8f6d2dc10}  flag{8O9cb2d3b86129b65c79c37d2fabe2e4}  flag{Oda2e2de7db381c70fd7d7729618ae91}  flag{da6c586ac7df33102e03e2ffaGae75f1}  flag{g8833fa0338741648763209d12ce0960}  flag{fd4158ab09674f81cdbd9ca87ccO9a5c}
flag{1772g9225a6867e80f66cda58f2ae131}  flag{d654e6Ob56ebed37c3a5effac6195a8e}  flag{9746cc7ca761f4f324b2b3384b3852S1}  flag{O72dc2795bc15adce516b58bd8dbaa57}  flag{887f64a45264e531c1g96baf650800d5}  flag{l32c783f8e179abc6c3ae52d92a773c4}
```

Now, we know from the rules page that the flags have to follow the following regular expression: `flag\{[0-9a-f]{32}\}`, which means it can be any character from `0` to `9` and from `a` to `f`, which are all the hexadecimal characters. And then there are 32 hex characters in the string. 

Now, manually doing this would suck, but thankfully there is an easy way to do it. Let's look at our good friend `grep` for this. With the `-E` flag enabled, `grep` uses extended regular expressions for its pattern searching, so we should just be able to `cat` the file, and the pipe it into `grep` to find the flag.

![the grep output](/assets/img/nahamcon-ctf-2025/free-flags/image0.png)

FLAG: `flag{ae6b6fb0686ec594652afe9eb6088167}`
