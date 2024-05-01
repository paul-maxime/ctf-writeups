# [HE2024] Dizzazzembly

The input seems to be [disassembled python bytecode](https://docs.python.org/3/library/dis.html).

Since it's pretty short, we can convert it back to python code manually:

```py
# 1-2-3
leet = 1337
flag = input('enter the flag:')
l = list(flag)

# 5-6
for i in range(len(l)):
  l[i] = chr(ord(l[i]) - leet % 10)

# 7
leet = leet // 10

# 8-9
for i in range(len(l) // 2):
  l[i] = chr(ord(l[i]) + leet % 10)

# 10
leet = leet // 10

# 11-12
for i in range(len(l) // 2, len(l)):
  l[i] = chr(ord(l[i]) - leet % 10)

# 13
leet = leet // 10

# 14-15
for i in range(len(l)):
  l[i] = chr(ord(l[i]) ^ (i % (leet % 10)))

# 17
print(''.join(l))
```

Then we can just reverse the operations to decrypt instead of encrypt:

```python
flag = "da.,.0w`-vv[evv[luj^&dUZ'pp*pp)cXb'ds"
l = list(flag)

leet = 13
for i in range(len(l) // 2, len(l)):
  l[i] = chr(ord(l[i]) + leet % 10)

leet = 133
for i in range(len(l) // 2):
  l[i] = chr(ord(l[i]) - leet % 10)

leet = 1337
for i in range(len(l)):
  l[i] = chr(ord(l[i]) + leet % 10)

print(''.join(l))
```

The last loop (lines `14-15`) is useless since `(i % (leet % 10)` will always be `0` for `leet = 1`, so we don't need to include it.

Executing this code prints `he2024{d1zz_izz_pyth0n_d1zz4zz3mbl1n}`.
