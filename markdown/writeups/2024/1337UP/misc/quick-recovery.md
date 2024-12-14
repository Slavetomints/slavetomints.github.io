# Quick Recovery

Challenge description:

> Hey, check this QR code ASAP! It's highly sensitive so I scrambled it, but you shouldn't have a hard time reconstructing - just make sure to update the a_order to our shared PIN. The b_order is the reverse of that 😉

Downloading the attached file and extrating its contents leads us to have a `gen.py` file and a `obscured.png` file. What is the png?

![the original qr code](assets/qr_code.png)

Huh, that looks pretty scrambled. Well, lets run the python script! 

*Note: You will need to install pillow with pip if you haven't already.*

```
┌─[slavetomints@parrot]─[~/CTFS/1337UP2024/misc/quick_recovery]
└──╼ $python gen.py 
Traceback (most recent call last):
  File "/home/slavetomints/CTFS/1337UP2024/misc/quick_recovery/gen.py", line 5, in <module>
    qr_code_image = Image.open("qr_code.png")
                    ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/slavetomints/.pyenv/versions/3.11.2/lib/python3.11/site-packages/PIL/Image.py", line 3469, in open
    fp = builtins.open(filename, "rb")
         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
FileNotFoundError: [Errno 2] No such file or directory: '/home/slavetomints/CTFS/1337UP2024/misc/quick_recovery/qr_code.png'
```
Hm, looks like it needs to read from `qr_code.png`, lets copy the `obscured.png` file and rename the copy.

Lets take a closer look at the python code

```python
from PIL import Image, ImageDraw
from itertools import permutations
import subprocess

qr_code_image = Image.open("qr_code.png")
width, height = qr_code_image.size
half_width, half_height = width // 2, height // 2

squares = {
    "1": (0, 0, half_width, half_height),
    "2": (half_width, 0, width, half_height),
    "3": (0, half_height, half_width, height),
    "4": (half_width, half_height, width, height)
}


def split_square_into_triangles(img, box):
    x0, y0, x1, y1 = box
    a_triangle_points = [(x0, y0), (x1, y0), (x0, y1)]
    b_triangle_points = [(x1, y1), (x1, y0), (x0, y1)]

    def crop_triangle(points):
        mask = Image.new("L", img.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.polygon(points, fill=255)
        triangle_img = Image.new("RGBA", img.size)
        triangle_img.paste(img, (0, 0), mask)
        return triangle_img.crop((x0, y0, x1, y1))

    return crop_triangle(a_triangle_points), crop_triangle(b_triangle_points)


triangle_images = {}
for key, box in squares.items():
    triangle_images[f"{key}a"], triangle_images[f"{key}b"] = split_square_into_triangles(
        qr_code_image, box)

a_order = ["1", "2", "3", "4"]  # UPDATE ME
b_order = ["4", "3", "2", "1"]  # UPDATE ME

final_positions = [
    (0, 0),
    (half_width, 0),
    (0, half_height),
    (half_width, half_height)
]

reconstructed_image = Image.new("RGBA", qr_code_image.size)

for i in range(4):
    a_triangle = triangle_images[f"{a_order[i]}a"]
    b_triangle = triangle_images[f"{b_order[i]}b"]
    combined_square = Image.new("RGBA", (half_width, half_height))
    combined_square.paste(a_triangle, (0, 0))
    combined_square.paste(b_triangle, (0, 0), b_triangle)
    reconstructed_image.paste(combined_square, final_positions[i])

reconstructed_image.save("obscured.png")
print("Reconstructed QR code saved as 'obscured.png'")
```

it looks like the `a_order` and `b_order` are influencing how the image gets rearranged, lets change them to 

```python
a_order = ["1", "3", "2", "4"]  # UPDATE ME
b_order = ["4", "2", "3", "1"]  # UPDATE ME
```

![better image](assets/obscured.png)

Hey!, now while it is split in half, lets take a screenshot of each half and rearrange those so that its in order. Sure, we could try finding the correct arrangement of numbers, but for a first try I'll take it. 

![QR1](assets/qr1.png)

![QR2](assets/qr2.png)

FLAG: `INTIGRITI{7h475_h0w_y0u_r3c0n57ruc7_qr_c0d3}`