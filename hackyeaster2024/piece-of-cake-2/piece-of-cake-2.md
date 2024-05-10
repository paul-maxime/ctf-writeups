# [HE2024] Piece of Cake 2

This one is similar to _Piece of Cake 1_.

However, this time, we need to use _e_ instead of _pi_ and we need to search much further.

```py
encoded = "he876:|I94kcxk6uohyp9t4cn}ti:vtcir7foowg8tbk8sfy~4166~"
expected = "he2024{"
file = "part1.txt" # https://archive.org/details/EulersNumberE7.5BillionDigits

sequence = ""
for i in range(len(expected)):
    sequence += str(ord(encoded[i]) - ord(expected[i]))
print(sequence)

def test_decode(key):
    decoded = ""
    for i in range(len(encoded)):
        decoded += chr(ord(encoded[i]) - int(key[i]))
    return decoded

with open(file, "r") as f:
    chunk = ""
    while 1:
        previous = chunk
        chunk = f.read(4096)
        if chunk == "":
            break
        chunks = previous + chunk
        index = chunks.find(sequence, 0, 4096 + len(sequence))
        if index < 0:
            continue
        decoded = test_decode(chunks[index:index+64])
        if decoded.endswith("}"):
            print(decoded)
```

```
0067461
he2024{C2.i[rh5sf_tk6t1\hxtf5uk]ar1egln`1l_k0n`rx4.01}
he2024{G13c[pc5nkfvh3r3[g{nh6mm\bj6]olse0n]e2lbxy+../}
he2024{G74j\tj4nfcqn5t.`nvne1uo]bk5eokwg2sai2newx0*26}
he2024{G81hbwg/qlhtg4m+bi}od7pk^dn._hmue1laf8r^ux,+52}
he2024{G00d_th1ng_th3s3_numb3rs_ar3_not_1mag1nary....}
he2024{H94faqd0mhdtg3n,]jxpc5pp]bn6emkr^4t_k2scrz2+14}
he2024{I2+iZqj2mjcyl4l2_g}na1nncan.`ghre0k^g/l_p{2/4.}
he2024{A80b^qc/qkbwh3l3\nwpg1vk^`o1]jhrf2oZd5lcu|0-15}
```