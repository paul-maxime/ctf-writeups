# [HE2023] Rotation

- The challenge is called rotation, which suggests `ROT13`, but it obviously doesn't work, the characters don't make sense: `96` can't become `he`.
- The text hints that the rotor must have been _too fast_.
- Instead of `ROT13`, we can try `ROT47`, which rotates lowercase, uppercase AND numbers.
- After rotating the encrypted flag once using `ROT47`, we get the flag.
