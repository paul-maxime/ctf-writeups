# [HE2023] Code Locked

- The challenge is a web page asking for a password using a keypad.

- After reading the source code, in particular `main.js`, we notice that `checkWASM` is the function checking if the code is correct. That function calls a compiled WASM file, called `check.wasm`, but we won't need to read it.

- We know the password is a 8-digits code, and we seem to get the answer almost instantly.

- Instead of trying to understand the code, we can just bruteforce it! We open the browser console, then execute:

```js
for (let i = 0; i < 100000000; i++) {
    const code = String(i).padStart(8, "0");
    const result = checkWASM(code);
    if (result !== 'You did not open the lock!') {
        console.log(code, result);
    }
}
```

- We get the correct code and the flag after a few seconds.
