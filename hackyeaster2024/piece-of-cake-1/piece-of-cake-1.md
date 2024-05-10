# [HE2024] Piece of Cake 1

We have an encrypted string and we know it's using a basic ROT algorithm. However, we also know it's using a different rotation for each character.

We know the flag starts with `he2024{`, so let's compute the first rotations.

```py
encoded = "ii35;6Ykf|h~j8adgf7ve5uuiw37wflaj}x`9rbgj|7"
expected = "he2024{"

deltas = []
for i in range(len(expected)):
    deltas.append(ord(encoded[i]) - ord(expected[i]))

print(deltas)
# [1, 4, 1, 5, 9, 2, 6]
```

We notice that the first rotations are the first decimals of PI (`3.1415926...`).

Let's use the other decimals of PI to decode the rest of the flag.

```py
encoded = "ii35;6Ykf|h~j8adgf7ve5uuiw37wflaj}x`9rbgj|7"
pi = "14159265358979323846264338327950288419716939937510"

decoded = ""
for i in range(len(encoded)):
    decoded += chr(ord(encoded[i]) - int(pi[i]))

print(decoded)
# he2024{That_wa5_a_b1t_1rrat10nal_but_0kaaay.}
```

