# Adds the Recall card to the Labs page and widens the copy beyond hotels.
# Run from alto/labs:  python3 add-recall.py
p = 'labs-page.html'
s = open(p).read()

def rep(a, b):
    global s
    assert s.count(a) == 1, a[:60]
    s = s.replace(a, b)

rep('Alongside the systems we set up for clients, Altiora Labs develops our own products for hospitality in the UAE. Each one starts with a real problem we have seen in hotels, venues and events.',
    'Alongside the systems we set up for clients, Altiora Labs builds our own products, from hotel guest experiences to everyday tools. Each one starts with a real problem worth solving well.')
rep('<p>Every product begins with something we have seen slow down a hotel, venue or event team.</p>',
    '<p>Every product begins with a real problem we have seen people struggle with.</p>')
rep('<h3>Shape it with operators</h3><p>We design it alongside the people who will use it, before anything reaches a guest.</p>',
    '<h3>Shape it with real users</h3><p>We design it alongside the people who will use it, before it reaches the public.</p>')
rep('<p>A small pilot with a partner first. A product launches only when it works in real operations.</p>',
    '<p>A small pilot or beta comes first. A product launches only when it works in real life.</p>')

css = '''.lb .proj+.proj{margin-top:24px}
.lb .rcl{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:190px;aspect-ratio:1}
.lb .rcl i{display:block;border-radius:11px;border:1px solid #24402F;background:#12261C}
.lb .rcl i.s{animation:rclOn 7.2s infinite;animation-delay:var(--d)}
@keyframes rclOn{0%,7%{background:#D4AF37;border-color:#D4AF37}9%,50%{background:#12261C;border-color:#24402F}51%,56%{background:#6FC497;border-color:#6FC497}59%,100%{background:#12261C;border-color:#24402F}}
'''
rep('.lb .grid3{display:grid', css + '.lb .grid3{display:grid')
rep('.lb .chip i{animation:none}}', '.lb .chip i{animation:none}.lb .rcl i.s{animation:none;background:#D4AF37;border-color:#D4AF37}}')

info = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>'
tiles = ''.join('<i class="s" style="--d:%s"></i>' % d if d else '<i></i>' for d in
                ['', '0.9s', '', '2.7s', '', '', '', '', '1.8s'])
# order of lighting: tile 2 (0.9s)... first lit is tile 6 at 0s
tiles = ('<i></i><i class="s" style="--d:.9s"></i><i></i>'
         '<i class="s" style="--d:2.7s"></i><i></i><i></i>'
         '<i class="s" style="--d:0s"></i><i></i><i class="s" style="--d:1.8s"></i>')
card = '''</article>

<article class="proj rv" aria-labelledby="lb-recall">
<div class="pc">
<div class="chips"><span class="chip au"><i></i>Free beta soon</span><span class="chip">Web and Android</span></div>
<h2 id="lb-recall">Recall</h2>
<p class="tag">One focused session a day. Then put it down.</p>
<p class="lead">Short daily exercises for memory and focus. About six minutes, with no feed, no streak alarms and no endless levels.</p>
<ul><li>Sequence, N-back and Hold, with more in the phone app</li><li>Each exercise adjusts to your level every day</li><li>Your progress is yours to download or delete at any time</li></ul>
<div class="ctas"><a class="btn pri" href="mailto:hello@altioraai.com?subject=Recall%20beta"><span>Join the free beta</span></a></div>
<p class="note">''' + info + '''<span>100 free places in the first beta. A training app, not a medical product.</span></p>
</div>
<div class="art">
<span class="chip lk">About 6 minutes a day</span>
<div class="rcl" role="img" aria-label="Recall: tiles light up in a sequence, then are repeated in the same order">''' + tiles + '''</div>
</div>
</article>'''
a = s.index('<!--TSR-->')
b = s.index('</article>', a)
s = s[:b] + card + s[b + len('</article>'):]
open(p, 'w').write(s)
print('ok')
