# [HE2023] Crash Bash

- The goal is to enter the command `/printflag.sh B4sh_br0TH3rs`, but some characters are forbidden, including all lowercase letters.

```bash
crashbash$ pwd
Invalid input, bash crashed!
```

- However, uppercase letters are allowed, so we are going to exploit that to write most of the command.

- Using the syntax `${variable,,}` in bash, we can convert any variable from uppercase to lowercase.

```bash
crashbash$ VAR="PWD" && ${VAR,,}
/tmp/ojwfwoqkpfhzwctiushvljkhzkvpwnnz
```

- Nice, we managed to execute a command! Now we need to write `/printflag.sh`. However, there's an issue: `"."` is forbidden.

```bash
crashbash$ VAR="/PRINTFLAG.SH" && ${VAR,,}
Invalid input, bash crashed!
```

- Maybe there is an env variable containing `"."` we could use?

```bash
crashbash$ VAR="ENV" && ${VAR,,}
REMOTE_HOST=123.123.123.123
HOSTNAME=5f91b08df6b8
PWD=/tmp/pghqzrrwsjcaxwjelijvvtiorwuzjvqp
HOME=/root
SHLVL=1
LC_CTYPE=C.UTF-8
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
_=/usr/bin/env
```

- There is! `$REMOTE_HOST` seems to contain our current IP address. Let's use that to extract our precious `"."`.

- We use `${REMOTE_HOST:3:1}` to only retrieve the 4th character of that variable, since our IP starts with `"123."`.

```bash
crashbash$ A="/PRINTFLAG" B="SH" && ${A,,}${REMOTE_HOST:3:1}${B,,}
You may not pass!
```

- Alright, we managed to execute the shell script! Now we only need to add the password, which is pretty easy, nothing new.

```bash
A="/PRINTFLAG" B="SH" C="SH_BR" D="RS" && ${A,,}${REMOTE_HOST:3:1}${B,,} B4${C,,}0TH3${D,,}
```

- After executing the shell script with the password, we get the flag.
