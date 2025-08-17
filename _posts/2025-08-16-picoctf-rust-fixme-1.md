---
title: Rust fixme 1
date: 2025-08-15
categories: [Capture The Flags, PicoCTF]
tags: [ctf, picoctf, general skills, writeups]
description: PicoCTF Rust fixme 1 Challenge
---


> Challenge description:
> 
>Have you heard of Rust? Fix the syntax errors in this Rust file to print the flag!
{: .prompt-info }

Alrighty, this is a pretty simple challenge, find the syntax errors, and fix them. First you need to copy the project file over and then extract it. All you need to do to run the project is type `cargo run`. This will compile the Rust, and then attempt to run it. It will also tell you any issues we have with the code upon compilation.

```terminal
picoCTF/rust-fixme-1/fixme1 [📦 v0.1.0][🦀 v1.87.0]
❯ cargo run
    Updating crates.io index
  Downloaded crossbeam-epoch v0.9.18
  Downloaded xor_cryptor v1.2.3
  Downloaded either v1.13.0
  Downloaded crossbeam-deque v0.8.5
  Downloaded rayon-core v1.12.1
  Downloaded rayon v1.10.0
  Downloaded 6 crates (337.7KiB) in 0.38s
   Compiling crossbeam-utils v0.8.20
   Compiling rayon-core v1.12.1
   Compiling either v1.13.0
   Compiling crossbeam-epoch v0.9.18
   Compiling crossbeam-deque v0.8.5
   Compiling rayon v1.10.0
   Compiling xor_cryptor v1.2.3
   Compiling rust_proj v0.1.0 (/home/slavetomints/training/picoCTF/rust-fixme-1/fixme1)
error: expected `;`, found keyword `let`
 --> src/main.rs:5:37
  |
5 |     let key = String::from("CSUCKS") // How do we end statements in Rust?
  |                                     ^ help: add `;` here
...
8 |     let hex_values = ["41", "30", "20", "63", "4a", "45", "54", "76", "01", "1c", "7e", "59", "6...
  |     --- unexpected token

error: argument never used
  --> src/main.rs:26:9
   |
25 |         ":?", // How do we print out a variable in the println function?
   |         ---- formatting specifier missing
26 |         String::from_utf8_lossy(&decrypted_buffer)
   |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ argument never used

error[E0425]: cannot find value `ret` in this scope
  --> src/main.rs:18:9
   |
18 |         ret; // How do we return in rust?
   |         ^^^ help: a local variable with a similar name exists: `res`

For more information about this error, try `rustc --explain E0425`.
error: could not compile `rust_proj` (bin "rust_proj") due to 3 previous errors
```

Alright, looks like there was a missing `;`. It's time to look at the code.

```rust
use xor_cryptor::XORCryptor;

fn main() {
    // Key for decryption
    let key = String::from("CSUCKS") // How do we end statements in Rust?

    // Encrypted flag values
    let hex_values = ["41", "30", "20", "63", "4a", "45", "54", "76", "01", "1c", "7e", "59", "63", "e1", "61", "25", "7f", "5a", "60", "50", "11", "38", "1f", "3a", "60", "e9", "62", "20", "0c", "e6", "50", "d3", "35"];

    // Convert the hexadecimal strings to bytes and collect them into a vector
    let encrypted_buffer: Vec<u8> = hex_values.iter()
        .map(|&hex| u8::from_str_radix(hex, 16).unwrap())
        .collect();

    // Create decrpytion object
    let res = XORCryptor::new(&key);
    if res.is_err() {
        ret; // How do we return in rust?
    }
    let xrc = res.unwrap();

    // Decrypt flag and print it out
    let decrypted_buffer = xrc.decrypt_vec(encrypted_buffer);
    println!(
        ":?", // How do we print out a variable in the println function? 
        String::from_utf8_lossy(&decrypted_buffer)
    );
}
```

Alright let's add the missing `;`. That should fix that issue.

There's another simple issue. This seems to be an issue with the `ret;` line. This is because in order to return in Rust you need to use `return` keyword. Now that issue is fixed.

Now for the last issue, The error message says `error: argument never used` if we look at the code snippet it's this:

```rust
let decrypted_buffer = xrc.decrypt_vec(encrypted_buffer);
println!(
    ":?", // How do we print out a variable in the println function? 
    String::from_utf8_lossy(&decrypted_buffer)
);
```

In order to use the variable, we need to add brackets to the string. We'll put them around the `:?` because those are special formatters to also print debug information, but you can just replace them as well.

With all of these fixes, time to look at the new code:

```rust
use xor_cryptor::XORCryptor;

fn main() {
    // Key for decryption
    let key = String::from("CSUCKS"); // How do we end statements in Rust?

    // Encrypted flag values
    let hex_values = ["41", "30", "20", "63", "4a", "45", "54", "76", "01", "1c", "7e", "59", "63", "e1", "61", "25", "7f", "5a", "60", "50", "11", "38", "1f", "3a", "60", "e9", "62", "20", "0c", "e6", "50", "d3", "35"];

    // Convert the hexadecimal strings to bytes and collect them into a vector
    let encrypted_buffer: Vec<u8> = hex_values.iter()
        .map(|&hex| u8::from_str_radix(hex, 16).unwrap())
        .collect();

    // Create decrpytion object
    let res = XORCryptor::new(&key);
    if res.is_err() {
        return; // How do we return in rust?
    }
    let xrc = res.unwrap();

    // Decrypt flag and print it out
    let decrypted_buffer = xrc.decrypt_vec(encrypted_buffer);
    println!(
        "{:?}", // How do we print out a variable in the println function? 
        String::from_utf8_lossy(&decrypted_buffer)
    );
}
```

If we run it again, we get the following:

```terminal
picoCTF/rust-fixme-1/fixme1 [📦 v0.1.0][🦀 v1.87.0]
❯ cargo run
   Compiling rust_proj v0.1.0 (/home/slavetomints/training/picoCTF/rust-fixme-1/fixme1)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.13s
     Running `target/debug/rust_proj`
"picoCTF{4r3_y0u_4_ru$t4c30n_n0w?}"
```

FLAG: `picoCTF{4r3_y0u_4_ru$t4c30n_n0w?}`