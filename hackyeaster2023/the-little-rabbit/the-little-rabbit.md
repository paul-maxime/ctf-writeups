# [HE2023] The Little Rabbit

- The challenge is a text file containing a title and 4 encrypted lines.

- We know each line was encrypted using a _One-Time-Pad_, however, they all used the same key.

- We also know something else was applied to the plaintext before it was encrypted.

- The title is _The Little Rabbit Ohaal_. `Ohaal` means `Bunny` in rot13, so we can easily assume a rot13 was applied to the plaintext before being encrypted.

- We know the text contains `he2023{` somewhere, so the first step would be to know which line and which offset.

- Using the script [find-line-and-offset.mjs](find-line-and-offset.mjs), we try to detect some readable text.

```js
Offset 12:
[ 'he2023{', 'xe`e\x0E{b', 'qw40\x0B::', 'tle Bun' ]
[ 'xe`e\x0E{b', 'he2023{', 'mwse7e.', 'll of h' ]
[ 'qw40\x0B::', 'mwse7e.', 'he2023{', 'ing in ' ]
[ 'tle Bun', 'll of h', 'ing in ', 'he2023{' ]
```

- We got some! The flag is on the 4th line, offset 12.

- Now we can use [decrypt-flag.mjs](decrypt-flag.mjs) to try decrypt the line and offset we want, using any known plaintext.

```js
"he2023{" (line 4, offset 12)
->
[
  'tle Bun',
  'll of h',
  'ing in ',
  'he2023{'
]
```

- The first line looks like "little Bunny", so we can exploit that plaintext next.

```js
"little Bunny" (line 1, offset 9)
->
[
  'little Bunny',
  'y all of him',
  ' thing in th',
  'if he2023{cr'
]
```

- We got more characters, but we need a complete sentence if we want to decode the entire flag. Let's try to search for `"little Bunny" "all of him" "thing in"` on google.

- After a little search, we find [The Pet Rabbit, by Lizzie Lawson](http://www.public-domain-poetry.com/lizzie-lawson/pet-rabbit-22969).

- Let's try to use the second line of that poem (which is the longest one) to decrypt everything else.

```js
"And nearly all of him is white except one bit of brown."
(line 2, offset 0)
->
[
  'I have a little Bunny with a coat as soft as down,',
  'And nearly all of him is white except one bit of brown.',
  'The first thing in the morning when I get out of bed,',
  'I wonder if he2023{cr1b_dr4ggin_4_pr0fit!} is the flag.'
]
```

- Here we go, we got the flag on the 4th line!
