# [HE2023] Coney Island Hackers 2

https://stackoverflow.com/q/28547205

```js
"[object Object]"[5] // c
"[object Object]"[1] // o
"undefined"[1] // n
"undefined"[3] // e
"ʸ"
"undefined"[5] // i
"false"[3] // s
"false"[2] // l
"false"[1] // a
"undefined"[1] // n
"undefined"[2] // d
```

```js
const dic = ''+[][0]+!1+{};
const str = "coneʸisland";
[...str].map(c => `α[${dic.indexOf(c)}]`).join("+");

α=''+[][0]+!1+{};α[19]+α[15]+α[1]+α[3]+"ʸ"+α[5]+α[12]+α[11]+α[10]+α[1]+α[2]
```
