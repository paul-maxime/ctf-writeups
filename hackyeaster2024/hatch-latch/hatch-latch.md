# [HE2024] Hatch Latch

The original code encrypts the flag with two random keys (a xor value and an offset).

```py
from random import *

flag="REDACTED" # we are looking for this
cipher=[]
kee=randint(1,10000)
off=randint(1,5)
for f in flag:
    cipher.append(str((ord(f) - off) ^ kee))

print(cipher) # we have this
```

We don't know the flag, but we know the output.

There are only 10000 possible xor values and 5 possibles offsets, so we bruteforce everything until we get a string looking like the flag.

```python
cipher = ['6255', '6248', '6181', '6183', '6181', '6203', '6258', '6255', '6203', '6267', '6250', '6255', '6230', '6203', '6250', '6250', '6202', '6200', '6200', '6230', '6254', '6245', '6203', '6241', '6267', '6202', '6251', '6256']

# Convert those strings to integers
for i in range(len(cipher)):
    cipher[i] = int(cipher[i])

# Function to test a single combination
def test(kee, off):
    str = ""
    for i in range(len(cipher)):
        str += chr((cipher[i] ^ kee) + off)
    if str.startswith("he2024"):
        print(kee, off, str)

# Test all 50000 possible combinations
for kee in range(1, 10000 + 1):
    for off in range(1, 5 + 1):
        test(kee, off)
```

For `kee = 6154` and `off = 3`, we get `he2024{h4tch_4cc355_gr4nt3d}`.
