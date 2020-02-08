from PIL import Image
import os
import json
import numpy as np

im = np.array(Image.open("hospital.png"))
print(im.shape)
im = im[2:61,1:60]
for i in range(0, len(im)):
    for k in range(0, len(im[i])):
        # bool = list(np.equal(im[i][k], [255,255,255,255]))
        if int(im[i][k][0]) > 200 and int(im[i][k][1]) > 200 and int(im[i][k][2]) > 200 and int(im[i][k][3]) > 200:
            im[i][k] = np.array([255,255,255,255])
        else:
            im[i][k] = np.array([230, 210, 30, 255])


for i in range(0, len(im)):
    for k in range(0, len(im[i])):
        if int(im[i][k][0]) == 255 and int(im[i][k][1]) == 255 and int(im[i][k][2]) == 255 and int(im[i][k][3]) == 255:
            im[i][k] = np.array([255,255,255,0])
        else:
            break
for i in range(0, len(im)):
    for k in range(len(im[i]) - 1, -1, -1):
        if int(im[i][k][0]) == 255 and int(im[i][k][1]) == 255 and int(im[i][k][2]) == 255 and int(im[i][k][3]) == 255:
            im[i][k] = np.array([255,255,255,0])
        else:
            break
pil_img = Image.fromarray(im)
pil_img.save('highlight.png')