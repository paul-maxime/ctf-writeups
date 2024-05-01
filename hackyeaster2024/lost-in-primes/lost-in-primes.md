# [HE2024] Lost in Primes

We are looking for a prime that hasn't been proven on [factordb.com](http://factordb.com/), with more than 27000 digits.

The `leaked_part.png` tells us that this number contains `11111111` and `00000000`, multiple times. It _probably_ only contains `1`s and `0`s, even though we cannot be sure.

We can easily download the probable primes from the `factordb.com` website, from `Status -> Probable primes -> List`.

Finding the correct prime can be done just as easily using `grep`.

```bash
# Download the first 5000 probable primes with more than 27000 digits.
wget 'factordb.com/listtype.php?t=1&mindig=27000&perpage=5000&start=0&download=1' -O first-5000

# Find a prime containing both "11111111" and "00000000".
cat first-5000 | grep '11111111' | grep '00000000' > prime

# Make sure there's only one result.
wc -l prime

# Display the prime!
cat prime
```

Now that we have our prime, we need a flag. Even though it is pretty difficult to see at first, by resizing the console a little bit, we notice that the prime is... a QR code inside an egg!

To make it easier to read, we can use `sed` to replace `0`s with two spaces (`  `) and `1`s with two full block unicode characters (`██`).

```bash
cat prime | sed 's/0/  /g' | sed 's/1/██/g'
```

![Egg in terminal](egg-terminal.png)
