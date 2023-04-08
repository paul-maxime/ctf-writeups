# [HE2023] Going Round

- We have an encrypted flag, `ip0232j{1t_x_v0z4b3bm__v4xvq}a`, and a website, that was used to encrypt that flag.

- If we try to encrypt the encrypted flag, we get something that looks similar to a flag: `tq2023{rx1b_z_d0f4f3_uz_b4ude}`. `2023`, `{` and `}` are correct. That website seems to apply some kind of cipher that moves characters around and increment them.

- That kind of cipher might loop. If we encrypt enough times, we might end up with the flag. Especially when the challenge is called "going round".

- Let's try to encrypt our string a bunch of times to see if we get the flag.

```
ip0232j{1t_x_v0z4b3bm__v4xvq}a
tq2023{rx1b_z_d0f4f3_uz_b4ude}
ub0232v{1f_j_h0l4n3ny__h4jhc}m
fc2023{dj1n_l_p0r4r3_gl_n4gpq}
gn0232h{1r_v_t0x4z3zk__t4vto}y
ro2023{pv1z_x_b0d4d3_sx_z4sbc}
sz0232t{1d_h_f0j4l3lw__f4hfa}k
da2023{bh1l_j_n0p4p3_ej_l4eno}
el0232f{1p_t_r0v4x3xi__r4trm}w
pm2023{nt1x_v_z0b4b3_qv_x4qza}
qx0232r{1b_f_d0h4j3ju__d4fdy}i
by2023{zf1j_h_l0n4n3_ch_j4clm}
cj0232d{1n_r_p0t4v3vg__p4rpk}u
nk2023{lr1v_t_x0z4z3_ot_v4oxy}
ov0232p{1z_d_b0f4h3hs__b4dbw}g
zw2023{xd1h_f_j0l4l3_af_h4ajk}
ah0232b{1l_p_n0r4t3te__n4pni}s
li2023{jp1t_r_v0x4x3_mr_t4mvw}
mt0232n{1x_b_z0d4f3fq__z4bzu}e
xu2023{vb1f_d_h0j4j3_yd_f4yhi}
yf0232z{1j_n_l0p4r3rc__l4nlg}q
jg2023{hn1r_p_t0v4v3_kp_r4ktu}
kr0232l{1v_z_x0b4d3do__x4zxs}c
vs2023{tz1d_b_f0h4h3_wb_d4wfg}
wd0232x{1h_l_j0n4p3pa__j4lje}o
he2023{fl1p_n_r0t4t3_in_p4irs}
```

- Looks like we did get the flag without having to understand the algorithm. Nice.

- Seems like it was just swapping characters + doing a `ROT`, so there's probably a faster way to decrypt the password.
