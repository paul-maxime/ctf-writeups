# [HE2023] Tom's Diary

- The challenge is a text file, containing a base64 string which is supposed to contain the secret flag, and a bunch of weird slashes.

- If we try to decode the base64 string, we notice that it starts with `PK` and contains `flag.txt`, so this is probably a zip file.

- We save that zip file.

```sh
echo -n "<the string>" | base64 --decode > secret.zip
```

- The zip file is password-protected. Weird, there doesn't seem to be any password in the text file and we don't need to use bruteforce according to the challenge.

- However, these weird slashes are very suspicious. After searching for "slash backslash encryption", we find the "Tom Tom Code", which is a cipher using only `"/"` and `"\"`.

- Using https://www.dcode.fr/code-tom-tom, we decode the weird string:

```
\/\ \\\/ / \/\ /\\ /\ \/\ //\ /\/ /\// //\/ /\// /\/ //\ /\\\ \\/\

->

S L A S H E S F O R P R O F I T
```

- We open the zip file using the password `slashesforprofit`. It contains the flag.
