# [HE2023] Fruity Cipher

- We have a long string with 30 different characters: 29 emojis and spaces.

- This is probably an english sentence, with each emoji matching a letter.

- The longest word is "🍉🧅🥦🍒🥥🥬🥭🍏🍠🍅🥭🍓🥝🍋🥭🍊", with 16 characters, so we are going to analyze that one first.

- We know that the word is 16-characters long, but we also know the 7th, 11th and 15th characters are the same, since they are the same emoji (🥭).

- With a small script, we can easily check every english words matching these criteria:

```js
import fs from "fs";

// words.txt from https://github.com/dwyl/english-words
const dictionary = fs
  .readFileSync("words.txt", "utf-8")
  .split("\n")
  .filter((word) => /^[a-z]+$/g.test(word));

console.log(
  dictionary.filter(
    (word) =>
      word.length === 16 &&
      word[6] === word[10] &&
      word[10] === word[14]
  )
);
```

- We get the following output:

```js
[
  'electrodepositor',
  'extrapatriarchal',
  'hypervitaminosis',
  'interferometries',
  'noncorroboratory',
  'nonprotractility',
  'protopatriarchal',
  'radiotelemetries',
  'roentgenometries',
  'serosanguinolent'
]
```

- These emojis are nearly all fruits, so the word that makes the most sense is `hypervitaminosis`, which is the flag we are looking for. We don't even need to translate the rest of the sentence.
