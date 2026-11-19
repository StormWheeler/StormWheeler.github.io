# Handover: Recall promo film and the Karim demo account

From the Altiora website session, 19 Nov 2026. For the Recall app session, and for anyone picking up the Recall film.

**Asset folder (Google Drive):** Recall → "Recall promo film – assets (19 Nov 2026)"
https://drive.google.com/drive/folders/1gU-uF9QcL1sRGnNFZ2ruj3tnX2ZZFVN9

## 1. What changed in Recall's database (project altiora-recall-test, ref sijjjhnqfldfnxhhzzdh)

All of this was done with the owner's go-ahead, so a real session could be recorded for the promo film.

| Change | Detail |
|---|---|
| Test account renamed | `people` row c25e3900-c305-4b8a-bc4e-8e10bd648804 was "Recall Test"; it is now **Karim** (`name_key` karim). The matching `testers` rows were renamed too, and a `profile_changes` row records the rename. Its earlier progress history was kept. |
| Demo sign-in added | A new `auth.users` user, **recall-demo@example.com** (id a510c9bc-66b9-4b1f-bedd-34207545a6dc, email confirmed, password sign-in), plus its `auth.identities` row. Karim's `people.user_id` now points to it and `code_hash` was cleared, exactly as `link_my_email` would do. The address cannot receive mail. The password is not written down anywhere; to sign in again, set a new one on that user. |
| Activity on Karim | 19 Nov: one full daily session (Settle, Lane, Watch, Words) driven by a script, plus several Practice runs of Settle, Lane, Watch and Words. The automated scores are not human (see 2). |
| Beta places | Karim counts as one of the 105 places (it already did as "Recall Test"). |

**To retire it later:** delete auth user a510c9bc-… in Supabase Auth, then delete or rename the Karim `people` row and its `testers`, `progress` and `events` rows.

## 2. Findings for the Recall app (please check)

1. **Lane scoring looks wrong.** A script that identified every shape correctly (from the Ionicons glyph: ellipse and radio-button-on = round; square and triangle = angular) and pressed the matching side scored only **19–28% "sorted right"**, whatever the timing (0.15 s to 1.05 s after the shape appeared). Using the on-screen buttons instead of the arrow keys gave the same result. With the sides deliberately swapped it scored **0%**. So input is registering and the mapping is right, but most correct answers aren't counted. Worth testing on a real phone; if a human also scores low, the scoring is likely off by one shape (for example, checking the answer against the next shape, or against the shape after it is removed).
2. **Watch reaction times look impossible.** Taps made 190–300 ms after the counter first showed a number were scored as **7–18 ms average reaction**. This may be headless-browser timing, but it is worth checking that the start time is taken when the counter actually becomes visible, not when the first frame is drawn or later.
3. **Minor:** the You tab still says "Sign in with your email to carry on from any device" for an account that has an email linked.

## 3. Things the film depends on

- **Copy we use word for word:** the Today screen after a session: "Today's session is done. Your progress is saved. Now put the phone down and get on with your day." Please tell the owner before changing it; it is the film's payoff.
- The film also shows Settle ("Breathe in through your nose"), Lane, Words, and the "Good afternoon, Karim" header.
- **Still needed:** the beta join link, and confirmation that the beta is open to the public. The end card currently says "Free beta · Web and Android".

## 4. Film status

- **Cut v5** (9:16, 19 s, no sound): a one-take AI opening (a man with coffee picks up his phone), real app footage (Settle, Lane, Words, the "session is done" screen), an AI walk-out, and the end card. Captions: "Your phone wants hours." / "Recall wants six minutes." / "Settle." / "Focus." / "Remember." / "Then put it down."
- **Higgsfield:** 904.25 credits before the face fix; now 874.25. The opening draft is job 8f561b80-cf37-402e-a577-7711a4bc40e9 (30 credits, 10 s, 480p). The walk-out draft is 218a7ecd-1ac0-42d7-8155-74fd9cbd9a32. All job IDs are in JOBS.md. Drafts can be upgraded to 1080p with draft_job_id within 7 days (by 26 Nov), about 80 credits per 5 s.
- **Next, waiting for the owner's OK:** voiceover and music (about 5 credits), then 1080p versions of the AI shots (about 240 credits).
- **Proposed voiceover (not yet approved):** "Your phone wants hours of your day." / "This one wants six minutes." / (no voice over the app) / "And then… it tells you to stop." / "Put it down." / "Altiora Recall. Free beta, on web and Android."

## 5. Guardrails

Recall is a training app, not a medical product: no claims about brain health, memory loss, IQ or treatment. Fictional people only. No prices; Altiora AI is pre-licence.

## 6. Files in the Drive folder

| File | What it is |
|---|---|
| 10_ai_opening_one_take_draft.mp4 | AI opening draft (480p, 10 s) |
| 11_ai_walkout_draft.mp4 | AI walk-out draft (480p) |
| 12_endcard_background.png, 13_recall_icon.png | End card parts |
| 20_app_home_session_done.png | Karim's Today screen after the session, full resolution |
| 22_app_lane_hires.mp4, 23_app_words_hires.mp4 | Real app, Practice mode, 1080 wide, about 15 fps |
| 24_ and 25_app_full_session_…_lowres.mp4 | The whole real daily session (390 px wide, reference only) |
| 30_edit_kit.zip | Edit and recording scripts: build.py and build_v5.py (ffmpeg edit), session.js (plays and records a session), frames2mp4.py, glyphs.json, login.js |

Not yet in the folder (too large to upload from the cloud session): the cut v5 preview, the cut v5 master, and the high-res Settle take. These can be rebuilt with the kit from the files above.

Fonts: Archivo and Source Sans 3, from npm packages @expo-google-fonts/archivo and @expo-google-fonts/source-sans-3.
