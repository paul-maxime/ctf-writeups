import rot13 from "rot13-cipher";

const hex = [
  "626b34041c11143a444e1b342c0e341036592d39044a0c102505145b57030c1b0e15290a533231071f71040465221023026b",
  "7a2a304a14115a311d5b4d3d320e66520a11392e124a1000621a414310014e070245350f147431150a7105142273103a4328132f01181e",
  "733e334a0615513203170a263d1632100f506c3f1d18461c2015554316074e1f1c47264c257427061f71080a2273103a4328043c47",
  "626b2b081412463144411e733e0574004b0237280d5b09393315004103050f2a5d6a240943272513592c4a142373153c11670534050d1e",
];

const encrypted = hex.map((x) => Buffer.from(x, "hex"));
const plaintext = Buffer.from(rot13("he2023{"));

for (let offset = 0; offset < 50; offset++) {
  console.log(`Offset ${offset}:`);

  const possible_keys = encrypted.map((line) =>
    plaintext.map((c, i) => line[i + offset] ^ c)
  );

  for (const key of possible_keys) {
    const decrypted = encrypted
      .map((line) => key.map((c, i) => line[i + offset] ^ c))
      .map((buf) => rot13(buf.toString("ascii")));
    console.log(decrypted);
  }
}
