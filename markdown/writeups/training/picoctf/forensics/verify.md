# Verify

> People keep trying to trick my players with imitation flags. I want to make sure they get the real thing! I'm going to provide the SHA-256 hash and a decrypt script to help you know that my flags are legitimate. `ssh -p 62638 ctf-player@rhea.picoctf.net` Using the password `1ad5be0d`. Accept the fingerprint with `yes`, and `ls` once connected to begin. Remember, in a shell, passwords are hidden!
> 
> -   Checksum: 5848768e56185707f76c1d74f34f4e03fb0573ecc1ca7b11238007226654bcda
> -   To decrypt the file once you've verified the hash, run `./decrypt.sh files/<file>`.

Alrighty, lets SSH in and see what we have!

```

ctf-player@pico-chall$ ls
checksum.txt  decrypt.sh  files
```

Hm, seems like not too much. Let's check out the shell script there.

```bash

#!/bin/bash

# Check if the user provided a file name as an argument
if [ $# -eq 0 ]; then
  echo "Expected usage: decrypt.sh <filename>"
  exit 1
fi

# Store the provided filename in a variable
file_name="$1"

# Check if the provided argument is a file and not a folder
if [ ! -f "/home/ctf-player/drop-in/$file_name" ]; then
  echo "Error: '$file_name' is not a valid file. Look inside the 'files' folder with 'ls -R'!"
  exit 1
fi

# If there's an error reading the file, print an error message
if ! openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -salt -in "/home/ctf-player/drop-in/$file_name" -k picoCTF; then
  echo "Error: Failed to decrypt '$file_name'. This flag is fake! Keep looking!"
fi
```

Pretty simple it seems, looks like we cant call the entire `files/` directory, which makes this mildly harder, but lets see how many files there are in there.

```

ctf-player@pico-chall$ ls -R
.:
checksum.txt  decrypt.sh  files

./files:
0Djw1Yn9  3qWq1TN3  7HasXrdt  AIoQddOi	E8SGu5PF  GSByhhKZ  IdIvJbNq  MO79elKL	Pg5nkeLx  Ub08FosM  XiZaGi61  ZHxc5WzX	dj997w8b  hYDkehPF  lsXXPRi9  oZhnBkIw	rkCAdhvs  uEVOrs3Q  x0smR87K
0hCC1ddM  46AqjzCq  7YwKDwt5  AirkohNr	EC92VSv1  GgtJe3SU  IdXxcFb9  Ml44INPY	Q3OZ8GkE  UjetrHPP  XpWKp9fz  ZQjoMAN3	e35XNxx0  hjLl30gf  lzTkstGC  ofqt9Mts	rsApvRKS  uK4wLELm  x3Gv21XB
0kEeuzpD  46WNzKYd  7gssXCp6  AqMzf0n2	EFIHChZt  Gq2ZRgLe  JGXKRz8A  My9Kp8ZA	RLZkIXH2  UlRpvG8u  XpaaSf35  ZhGjuu2v	e7AcpKRs  hpeUQBPR  m1U53qWB  otwDYtcz	rsEKIPjs  uKWNyaNo  xF6kBrl5
11fCd9FK  4QGcXMTp  7ywOJtA5  BPvvZjS9	EfBLA0Qb  GsgAtvrb  JPCV0NEQ  N3SNvAmC	RXJ0t0my  Ux5G59vK  Y5Tn1wLV  Znx4Xpfi	eYBYpOHG  hsZLoSXk  m8GvPwVf  pKj5t2Dw	s7VlhxlU  uWeO6kne  xFDlSCmJ
127Gabqy  4QVModrw  86u6DjxN  BVY8OQ0e	EpxyA87A  H50vrxOK  JfwqmDD1  N8R1ys84	RodAuF8c  UxPuU73P  Y9H1DmrO  Zq2mCXwh	etQnybdM  iFnFKpVL  mHLTMNSO  pffmnkBL	sWpLgx0J  ubWRKwlP  xcfp3yIm
1KCxp56l  4sJHXNNF  8AI0vFUP  BWdbr5cq	EvgtHmNG  HN6EEPc6  JjgW49uM  NS7Qnwir	RxzpvEH8  VLGyhdAs  YBq98P0M  aMljWfFE	fJ6pvukO  ieJLcMYO  mOIEj8VU  pnhMXO3p	sbihxrWK  ug9WJt2k  y89nYsgz
1lJlucQi  4xecXhZ4  8BmF7YU3  CEspEjyg	EzK7W5rA  HQFxiOEu  Jk5RiJP3  NZTSTH5A	Rzf7hI8S  VOEJzNP2  YCzWDWAo  atHaAoUC	fTqruZ68  j07bNrl3  mOUnwqiD  pxKORB4V	sj0iqSJG  ulBpZa7K  yTT0lx6G
29LfqZCV  5TUD0SZF  8KBG6Ho5  CT7LNb1T	FBFyrGdK  HVBNhFQc  JvkRSvoY  NrlytMB2	T65EuxFS  VOjYeNtB  YHlglizc  bGh0uZeD	fXqCnhTW  jB1c5scq  mpNouhjz  q30YVhab	tR0Y5yfI  un6ZHz0e  yXiVuruK
2FIADT9u  5Vj9ClxH  8TaaNFiI  CUDvSkny	FMc2LmnC  HgS1N97B  JyETK0zB  Ns3xXxB5	T7D6cFax  VWTwNKu3  YZ24V6Jg  bdUnh7m6	fnv5I86x  jFbRb7wj  nBZMpkJM  r6FsLTvB	tRkHgp0K  uo9aUJdP  yisohBrh
2LTy7YRY  5poCHpW5  8eee7195  CzbvRGDo	FPmOVdK9  HzafQHON  KnqxU8ZR  NscGxWxZ	TULtDWAh  WEDxO3X6  YaSTJVDY  bheCko97	gPLfq6Wg  jNNQQzb1  nEq3tDyr  r92m1UDg	tS6DeoZw  uzg6XOFM  yyGB4b75
2UMAS2p2  69PdHGt5  8sUHOjM7  Datqg1v2	FZDr0uXM  I1455zff  Kpk2NGCY  OMqqj7Xk	TmPsi9q5  Wi5SEOjH  YxjAss19  bsKASoce	gXXhG1vR  jTcfKktD  nHzcMsWi  rBM6NRwG	tbovFK8G  vBUBdOuy  zBZlq5zB
2rKgMv8c  6KbViYDH  8yTBxI4v  DcsLfXjS	FldcZKRx  I6LbUYfM  KxGAs4Ts  OiKl3wW4	TvSkqj9G  Wx4RUTW9  Yyz79m2P  cGRwaMk0	gi2BZ2Sh  kB6sCehC  ndS20AY1  rEZeIuRn	tiXMolZ2  vJehPgVf  zPynJW9E
3KUshLDa  6SMm8dlr  9FtSmvK5  DcyUooAk	FtGO80xL  IFy9a5p5  L2ZBdVNv  OnPMhqJ5	TwgSNfHW  X6JD0WpV  Z19ftqro  cVFYrGoy	gs4P5nzm  kapgdCsi  nkMZhFIu  rRttgMHP	tikqdZ3g  vXYnwV3P  ztuBoBBF
3UW4pd1W  6dNjhwX0  9KG1pS7T  Ddb2Td4s	FxmX4w7K  IG04o3sP  L47wcoKw  OpmMaJBF	U2opJXlp  XAdjt2s8  Z63uS2wX  ceBDSnSU	gvBJbOsO  lV8Ixto4  nq6y1LoG  rSWW6ipO	tuGNi15d  vbxNxmUk
3ilcq3gx  6rbLdRBE  9UZV3xac  Dns88jCD	GBDcO5Pa  IHGEu9Zb  LSMiaalf  P26pCl75	UC2HzmsF  XSRu1xaq  ZBZF2RzY  dF9EQHIP	hExecvBn  lYqT3IRy  ny6ypPJY  rdA3ruK2	u2mrJxJP  voEWTNSE
3prn067q  7BqS9rvi  9tbrqt4Y  Dp46Djws	GQXRJmJu  IYT9PkO0  MMGIrZ55  PcqBeajv	UZPyoYgq  XZuonMvs  ZF0A0VNq  dca0Qs7E	hFMuiSEO  loxycTNs  oWBj99A2  rfAqPrsA	uDAtsQX0  wuXahgtz
```

Oh... Just a few ya know.

Since none of them have file extensions, lets see what the `file` command can pull from them.

```

ctf-player@pico-chall$ file files/*
files/0Djw1Yn9: ASCII text
files/0hCC1ddM: ASCII text
files/0kEeuzpD: ASCII text
files/11fCd9FK: ASCII text
files/127Gabqy: ASCII text
files/1KCxp56l: ASCII text
files/1lJlucQi: ASCII text
files/29LfqZCV: ASCII text
files/2FIADT9u: ASCII text
files/2LTy7YRY: ASCII text
files/2UMAS2p2: ASCII text
files/2rKgMv8c: ASCII text
files/3KUshLDa: ASCII text
files/3UW4pd1W: ASCII text
files/3ilcq3gx: ASCII text
files/3prn067q: ASCII text
files/3qWq1TN3: ASCII text
files/46AqjzCq: ASCII text
files/46WNzKYd: ASCII text
files/4QGcXMTp: ASCII text
files/4QVModrw: ASCII text
files/4sJHXNNF: ASCII text
files/4xecXhZ4: ASCII text
files/5TUD0SZF: ASCII text
files/5Vj9ClxH: ASCII text
files/5poCHpW5: ASCII text
files/69PdHGt5: ASCII text
files/6KbViYDH: ASCII text
files/6SMm8dlr: ASCII text
files/6dNjhwX0: ASCII text
files/6rbLdRBE: ASCII text
files/7BqS9rvi: ASCII text
files/7HasXrdt: ASCII text
files/7YwKDwt5: ASCII text
files/7gssXCp6: ASCII text
files/7ywOJtA5: ASCII text
files/86u6DjxN: ASCII text
files/8AI0vFUP: ASCII text
files/8BmF7YU3: ASCII text
files/8KBG6Ho5: ASCII text
files/8TaaNFiI: ASCII text
files/8eee7195: openssl enc'd data with salted password
files/8sUHOjM7: ASCII text
files/8yTBxI4v: ASCII text
files/9FtSmvK5: ASCII text
files/9KG1pS7T: ASCII text
files/9UZV3xac: ASCII text
files/9tbrqt4Y: ASCII text
files/AIoQddOi: ASCII text
files/AirkohNr: ASCII text
files/AqMzf0n2: ASCII text
files/BPvvZjS9: ASCII text
files/BVY8OQ0e: ASCII text
files/BWdbr5cq: ASCII text
files/CEspEjyg: ASCII text
files/CT7LNb1T: ASCII text
files/CUDvSkny: ASCII text
files/CzbvRGDo: ASCII text
files/Datqg1v2: ASCII text
files/DcsLfXjS: ASCII text
files/DcyUooAk: ASCII text
files/Ddb2Td4s: ASCII text
files/Dns88jCD: ASCII text
files/Dp46Djws: ASCII text
files/E8SGu5PF: ASCII text
files/EC92VSv1: ASCII text
files/EFIHChZt: ASCII text
files/EfBLA0Qb: ASCII text
files/EpxyA87A: ASCII text
files/EvgtHmNG: ASCII text
files/EzK7W5rA: ASCII text
files/FBFyrGdK: ASCII text
files/FMc2LmnC: ASCII text
files/FPmOVdK9: ASCII text
files/FZDr0uXM: ASCII text
files/FldcZKRx: ASCII text
files/FtGO80xL: ASCII text
files/FxmX4w7K: ASCII text
files/GBDcO5Pa: ASCII text
files/GQXRJmJu: ASCII text
files/GSByhhKZ: ASCII text
files/GgtJe3SU: ASCII text
files/Gq2ZRgLe: ASCII text
files/GsgAtvrb: ASCII text
files/H50vrxOK: ASCII text
files/HN6EEPc6: ASCII text
files/HQFxiOEu: ASCII text
files/HVBNhFQc: ASCII text
files/HgS1N97B: ASCII text
files/HzafQHON: ASCII text
files/I1455zff: ASCII text
files/I6LbUYfM: ASCII text
files/IFy9a5p5: ASCII text
files/IG04o3sP: ASCII text
files/IHGEu9Zb: ASCII text
files/IYT9PkO0: ASCII text
files/IdIvJbNq: ASCII text
files/IdXxcFb9: ASCII text
files/JGXKRz8A: ASCII text
files/JPCV0NEQ: ASCII text
files/JfwqmDD1: ASCII text
files/JjgW49uM: ASCII text
files/Jk5RiJP3: ASCII text
files/JvkRSvoY: ASCII text
files/JyETK0zB: ASCII text
files/KnqxU8ZR: ASCII text
files/Kpk2NGCY: ASCII text
files/KxGAs4Ts: ASCII text
files/L2ZBdVNv: ASCII text
files/L47wcoKw: ASCII text
files/LSMiaalf: ASCII text
files/MMGIrZ55: ASCII text
files/MO79elKL: ASCII text
files/Ml44INPY: ASCII text
files/My9Kp8ZA: ASCII text
files/N3SNvAmC: ASCII text
files/N8R1ys84: ASCII text
files/NS7Qnwir: ASCII text
files/NZTSTH5A: ASCII text
files/NrlytMB2: ASCII text
files/Ns3xXxB5: ASCII text
files/NscGxWxZ: ASCII text
files/OMqqj7Xk: ASCII text
files/OiKl3wW4: ASCII text
files/OnPMhqJ5: ASCII text
files/OpmMaJBF: ASCII text
files/P26pCl75: ASCII text
files/PcqBeajv: ASCII text
files/Pg5nkeLx: ASCII text
files/Q3OZ8GkE: ASCII text
files/RLZkIXH2: ASCII text
files/RXJ0t0my: ASCII text
files/RodAuF8c: ASCII text
files/RxzpvEH8: ASCII text
files/Rzf7hI8S: ASCII text
files/T65EuxFS: ASCII text
files/T7D6cFax: ASCII text
files/TULtDWAh: ASCII text
files/TmPsi9q5: ASCII text
files/TvSkqj9G: ASCII text
files/TwgSNfHW: ASCII text
files/U2opJXlp: ASCII text
files/UC2HzmsF: ASCII text
files/UZPyoYgq: ASCII text
files/Ub08FosM: ASCII text
files/UjetrHPP: ASCII text
files/UlRpvG8u: ASCII text
files/Ux5G59vK: ASCII text
files/UxPuU73P: ASCII text
files/VLGyhdAs: ASCII text
files/VOEJzNP2: ASCII text
files/VOjYeNtB: ASCII text
files/VWTwNKu3: ASCII text
files/WEDxO3X6: ASCII text
files/Wi5SEOjH: ASCII text
files/Wx4RUTW9: ASCII text
files/X6JD0WpV: ASCII text
files/XAdjt2s8: ASCII text
files/XSRu1xaq: ASCII text
files/XZuonMvs: ASCII text
files/XiZaGi61: ASCII text
files/XpWKp9fz: ASCII text
files/XpaaSf35: ASCII text
files/Y5Tn1wLV: ASCII text
files/Y9H1DmrO: ASCII text
files/YBq98P0M: ASCII text
files/YCzWDWAo: ASCII text
files/YHlglizc: ASCII text
files/YZ24V6Jg: ASCII text
files/YaSTJVDY: ASCII text
files/YxjAss19: ASCII text
files/Yyz79m2P: ASCII text
files/Z19ftqro: ASCII text
files/Z63uS2wX: ASCII text
files/ZBZF2RzY: ASCII text
files/ZF0A0VNq: ASCII text
files/ZHxc5WzX: ASCII text
files/ZQjoMAN3: ASCII text
files/ZhGjuu2v: ASCII text
files/Znx4Xpfi: ASCII text
files/Zq2mCXwh: ASCII text
files/aMljWfFE: ASCII text
files/atHaAoUC: ASCII text
files/bGh0uZeD: ASCII text
files/bdUnh7m6: ASCII text
files/bheCko97: ASCII text
files/bsKASoce: ASCII text
files/cGRwaMk0: ASCII text
files/cVFYrGoy: ASCII text
files/ceBDSnSU: ASCII text
files/dF9EQHIP: ASCII text
files/dca0Qs7E: ASCII text
files/dj997w8b: ASCII text
files/e35XNxx0: ASCII text
files/e7AcpKRs: ASCII text
files/eYBYpOHG: ASCII text
files/etQnybdM: ASCII text
files/fJ6pvukO: ASCII text
files/fTqruZ68: ASCII text
files/fXqCnhTW: ASCII text
files/fnv5I86x: ASCII text
files/gPLfq6Wg: ASCII text
files/gXXhG1vR: ASCII text
files/gi2BZ2Sh: ASCII text
files/gs4P5nzm: ASCII text
files/gvBJbOsO: ASCII text
files/hExecvBn: ASCII text
files/hFMuiSEO: ASCII text
files/hYDkehPF: ASCII text
files/hjLl30gf: ASCII text
files/hpeUQBPR: ASCII text
files/hsZLoSXk: ASCII text
files/iFnFKpVL: ASCII text
files/ieJLcMYO: ASCII text
files/j07bNrl3: ASCII text
files/jB1c5scq: ASCII text
files/jFbRb7wj: ASCII text
files/jNNQQzb1: ASCII text
files/jTcfKktD: ASCII text
files/kB6sCehC: ASCII text
files/kapgdCsi: ASCII text
files/lV8Ixto4: ASCII text
files/lYqT3IRy: ASCII text
files/loxycTNs: ASCII text
files/lsXXPRi9: ASCII text
files/lzTkstGC: ASCII text
files/m1U53qWB: ASCII text
files/m8GvPwVf: ASCII text
files/mHLTMNSO: ASCII text
files/mOIEj8VU: ASCII text
files/mOUnwqiD: ASCII text
files/mpNouhjz: ASCII text
files/nBZMpkJM: ASCII text
files/nEq3tDyr: ASCII text
files/nHzcMsWi: ASCII text
files/ndS20AY1: ASCII text
files/nkMZhFIu: ASCII text
files/nq6y1LoG: ASCII text
files/ny6ypPJY: ASCII text
files/oWBj99A2: ASCII text
files/oZhnBkIw: ASCII text
files/ofqt9Mts: ASCII text
files/otwDYtcz: ASCII text
files/pKj5t2Dw: ASCII text
files/pffmnkBL: ASCII text
files/pnhMXO3p: ASCII text
files/pxKORB4V: ASCII text
files/q30YVhab: ASCII text
files/r6FsLTvB: ASCII text
files/r92m1UDg: ASCII text
files/rBM6NRwG: ASCII text
files/rEZeIuRn: ASCII text
files/rRttgMHP: ASCII text
files/rSWW6ipO: ASCII text
files/rdA3ruK2: ASCII text
files/rfAqPrsA: ASCII text
files/rkCAdhvs: ASCII text
files/rsApvRKS: ASCII text
files/rsEKIPjs: ASCII text
files/s7VlhxlU: ASCII text
files/sWpLgx0J: ASCII text
files/sbihxrWK: ASCII text
files/sj0iqSJG: ASCII text
files/tR0Y5yfI: ASCII text
files/tRkHgp0K: ASCII text
files/tS6DeoZw: ASCII text
files/tbovFK8G: ASCII text
files/tiXMolZ2: ASCII text
files/tikqdZ3g: ASCII text
files/tuGNi15d: ASCII text
files/u2mrJxJP: ASCII text
files/uDAtsQX0: ASCII text
files/uEVOrs3Q: ASCII text
files/uK4wLELm: ASCII text
files/uKWNyaNo: ASCII text
files/uWeO6kne: ASCII text
files/ubWRKwlP: ASCII text
files/ug9WJt2k: ASCII text
files/ulBpZa7K: ASCII text
files/un6ZHz0e: ASCII text
files/uo9aUJdP: ASCII text
files/uzg6XOFM: ASCII text
files/vBUBdOuy: ASCII text
files/vJehPgVf: ASCII text
files/vXYnwV3P: ASCII text
files/vbxNxmUk: ASCII text
files/voEWTNSE: ASCII text
files/wuXahgtz: ASCII text
files/x0smR87K: ASCII text
files/x3Gv21XB: ASCII text
files/xF6kBrl5: ASCII text
files/xFDlSCmJ: ASCII text
files/xcfp3yIm: ASCII text
files/y89nYsgz: ASCII text
files/yTT0lx6G: ASCII text
files/yXiVuruK: ASCII text
files/yisohBrh: ASCII text
files/yyGB4b75: ASCII text
files/zBZlq5zB: ASCII text
files/zPynJW9E: ASCII text
files/ztuBoBBF: ASCII text
```

Hm, seems like `files/8eee7195` is a little different, lets check the SHA-256 hashes of each file and check it against the checksum we were provided.

```

ctf-player@pico-chall$ sha256sum files/* | grep "5848768e56185707f76c1d74f34f4e03fb0573ecc1ca7b11238007226654bcda"
5848768e56185707f76c1d74f34f4e03fb0573ecc1ca7b11238007226654bcda  files/8eee7195
```

Seems like that same file showed up again! Let's try to decrypt it.

```

ctf-player@pico-chall$ ./decrypt.sh files/8eee7195 
picoCTF{trust_but_verify_8eee7195}
```

Bingo!

FLAG: `picoCTF{trust_but_verify_8eee7195}`
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTA3Njc0MjEwOV19
-->