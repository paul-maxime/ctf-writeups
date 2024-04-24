function computeKaos(d14, b7, e2, g14, j6) {
  const j13 = (d14 + b7 * e2) % 64;
  const d11 = (e2 * g14) % 64;
  const f12 = (e2 * b7 + d14) % 64;
  const i10 = (j6 * g14 + b7) % 64;
  const b5 = (j13 + d11 + f12 + i10) % 64;
  const g6 = (g14 * b7 + d14) % 64;
  const h3 = (b7 * j6 * 7) % 64;
  const i7 = (f12 + d11 * g6 + h3) % 64;
  const d5 = (e2 + j6 + b7 + d14 + g14) % 64;
  const f4 = (e2 * g14 + d14 + j6) % 64;
  const j3 = (f12 + d11 + d5 + f4) % 64;
  const e6 = (f4 + d11 + i10) % 64;
  const i5 = (h3 + d5) % 64;
  const f10 = (j13 + f12 + d11 + f4 + 17) % 64;
  const b13 = (b7 * j6 * g14 + 5) % 64;
  const h13 = (h3 + g6 + f12 + d11 + b13 + b13) % 64;
  const c12 = (b13 + f12 + i10) % 64;
  const c6 = (h3 + g6 + b13 + 3) % 64;
  const c3 = (j6 + b7 + 34 + g14) % 64;
  const h11 = (c3 + h3 + f12) % 64;

  const b8 = String.fromCharCode(52 + b5);
  const c8 = String.fromCharCode(44 + i7);
  const d8 = String.fromCharCode(48 + j3);
  const e8 = String.fromCharCode(45 + e6);
  const f8 = String.fromCharCode(42 + i5);
  const g8 = String.fromCharCode(63 - f10);
  const h8 = String.fromCharCode(h13 + 93);
  const i8 = String.fromCharCode(c12 + 68);
  const j8 = String.fromCharCode(h13 + 74);

  const b9 = String.fromCharCode(i7 - 5);
  const c9 = String.fromCharCode(c6 * 6 + 2);
  const d9 = String.fromCharCode(i7 + b5 + j6 - 34);
  const e9 = String.fromCharCode(91 - c12);
  const f9 = String.fromCharCode(i7 + h11 - 10);
  const g9 = String.fromCharCode(b5 - 4);
  const h9 = String.fromCharCode(h11 + h13 + i5 + j3);
  const i9 = String.fromCharCode(h13 + e6);
  const j9 = String.fromCharCode(e6 * h11 - 25);

  if (b8 === "h" && c8 === "e" && d8 === "2") {
    console.log(d14, b7, e2, g14, j6);
    console.log(
      `${b8}${c8}${d8}${e8}${f8}${g8}${h8}${i8}${j8}` +
        `${b9}${c9}${d9}${e9}${f9}${g9}${h9}${i9}${j9}`
    );
  }
}

for (let d14 = 0; d14 <= 9; d14++) {
  for (let b7 = 0; b7 <= 9; b7++) {
    for (let e2 = 0; e2 <= 9; e2++) {
      for (let g14 = 0; g14 <= 9; g14++) {
        for (let j6 = 0; j6 <= 9; j6++) {
          computeKaos(d14, b7, e2, g14, j6);
        }
      }
    }
  }
}
