# BabyRev
Author: Cappybara

Challenge description: 

> You’ve just run across an old program, seemingly innocent at first. It asks for a password, and if you enter it correctly, you might think you've won. But there's more lurking beneath the surface. Something about this challenge doesn’t add up.
>  
> The program not only demands the correct password, but also a secret code—one that isn’t easily discovered. Is it hidden within the code? Or perhaps something you’ll have to figure out for yourself?

For this challenge, we are going to be using `Ghidra`. `Ghidra` is a reverse engineering tool made by the National Security Agency (NSA), completely free to use. After we've loaded up the project and add in the file, it gives us this code for the `main` function.


```c

undefined8 main(void)

{
  int iVar1;
  long in_FS_OFFSET;
  int secretCode;
  uint local_3c;
  char password [40];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  puts("Welcome to baby rev challenge\nInput the password:\n");
  fgets(password,0x20,stdin);
  puts("Input the secret code now:\n");
  __isoc99_scanf(&DAT_0010211f,&secretCode);
  if (secretCode == 0x539) {
    iVar1 = strcmp(password,"Sup3rS3cr3tP455W0rd\n");
    if (iVar1 == 0) {
      puts("Correct!\nHere is your flag\n");
      for (local_3c = 0; local_3c < 0x1b; local_3c = local_3c + 1) {
        putchar((int)(char)((char)local_3c + 0x69U ^
                           (byte)*(undefined4 *)(flag + (long)(int)local_3c * 4)));
      }
    }
    else {
      puts("Wrong password!");
    }
  }
  else {
    puts("Wrong code!");
  }
  if (local_10 == *(long *)(in_FS_OFFSET + 0x28)) {
    return 0;
  }
                    /* WARNING: Subroutine does not return */
  __stack_chk_fail();
}

```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjE3NDQ4NDk3XX0=
-->