# [HE2023] Jason

- Seems to be a JSON service.
- After typing a few weird things, `[]` seems to return the first result and `.` an `{`.
- Seems to be `jq`, a command line tool!

```js
 | keys | .[2]
covert | keys | .[0]
covert.flag
```

```json
{
    "name": "Jason",
    "surname": "Hamstat",
    "covert": {
        "flag": "he2023{...}"
    }
}
```