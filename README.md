# ReviewHub

Angular frontend for the ReviewHub tutoring-desk system. What you see depends on who you
are:

- **Students** see the sessions they're enrolled in and the ones still open, and can book a slot. Everything else is read-only.
- **Teachers** see the sessions they run, and can edit them, on top of everything a student can do.
- **Admins** see all of it, plus user, room and subject management.

Opening a session shows its full detail: subject, room, responsible teacher, dated slots,
remaining capacity.

**Backend**: [anItalianGeek/reviewhub_restAPI](https://github.com/anItalianGeek/reviewhub_restAPI)

> Deployed on a Raspberry Pi inside the school network, so there's no public instance to
> link to.
