# Gives the Recall card on the Labs page Recall's own palette, icon and icon-based animation.
# Colours sampled from Recall's app icon (altiora-recall.expo.app/pwa/icon-512.png).
# Run from alto/labs:  python3 recall-theme.py
p = 'labs-page.html'
s = open(p).read()

def rep(a, b):
    global s
    assert s.count(a) == 1, a[:70]
    s = s.replace(a, b)

old_css = '''.lb .rcl{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:190px;aspect-ratio:1}
.lb .rcl i{display:block;border-radius:11px;border:1px solid #24402F;background:#12261C}
.lb .rcl i.s{animation:rclOn 7.2s infinite;animation-delay:var(--d)}
@keyframes rclOn{0%,7%{background:#D4AF37;border-color:#D4AF37}9%,50%{background:#12261C;border-color:#24402F}51%,56%{background:#6FC497;border-color:#6FC497}59%,100%{background:#12261C;border-color:#24402F}}
'''
new_css = '''/* Recall card: Recall's own palette (navy, tile, blue, gold) */
.lb .proj.rc{background:linear-gradient(160deg,#161F27,#0F151B);border-color:#27333E}
.lb .proj.rc .art{background:radial-gradient(circle at 50% 50%,rgba(134,182,214,.14),transparent 62%),#0F151B;border-color:#27333E}
.lb .proj.rc .chip{border-color:#27333E;color:#8C9AA7}
.lb .proj.rc .chip.au{border-color:rgba(134,182,214,.5);color:#86B6D6}
.lb .proj.rc .chip.au i{background:#86B6D6}
.lb .proj.rc .ttl{display:flex;align-items:center;gap:14px;margin-top:18px}
.lb .proj.rc .ttl h2{margin-top:0}
.lb .proj.rc .tag{color:#F0B85A}
.lb .proj.rc .lead,.lb .proj.rc .note{color:#8C9AA7}
.lb .proj.rc li{color:#DCE4EA}
.lb .proj.rc li:before{border-color:#86B6D6}
.lb .proj.rc .note svg{color:#86B6D6}
.lb .proj.rc .btn.pri{background:#86B6D6;color:#0F151B}
.lb .proj.rc .btn.pri:hover{box-shadow:0 12px 30px -12px rgba(134,182,214,.75)}
.lb .rcl-ic{width:46px;height:46px;flex:none;display:block;border-radius:12px;box-shadow:0 0 0 1px #27333E}
/* Recall animation: the icon's rising path lights up, bottom to top */
.lb .rcl{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:190px;aspect-ratio:1}
.lb .rcl i{display:block;border-radius:20%;background:#1E2A35}
.lb .rcl i.p1{animation:rcl1 6s infinite}
.lb .rcl i.p2{animation:rcl2 6s infinite}
.lb .rcl i.p3{animation:rcl3 6s infinite}
@keyframes rcl1{0%,6%{background:#1E2A35;transform:scale(1)}10%{background:#86B6D6;transform:scale(1.08)}14%,82%{background:#86B6D6;transform:scale(1)}90%,100%{background:#1E2A35}}
@keyframes rcl2{0%,18%{background:#1E2A35;transform:scale(1)}22%{background:#86B6D6;transform:scale(1.08)}26%,82%{background:#86B6D6;transform:scale(1)}90%,100%{background:#1E2A35}}
@keyframes rcl3{0%,30%{background:#1E2A35;transform:scale(1)}34%{background:#F0B85A;transform:scale(1.1)}38%,82%{background:#F0B85A;transform:scale(1)}90%,100%{background:#1E2A35}}
'''
rep(old_css, new_css)
rep('.lb .rcl i.s{animation:none;background:#D4AF37;border-color:#D4AF37}}',
    '.lb .rcl i.p1,.lb .rcl i.p2{animation:none;background:#86B6D6}.lb .rcl i.p3{animation:none;background:#F0B85A}}')

rep('<article class="proj rv" aria-labelledby="lb-recall">', '<article class="proj rc rv" aria-labelledby="lb-recall">')

icon = ('<svg class="rcl-ic" viewBox="0 0 512 512" aria-hidden="true" focusable="false">'
        '<rect width="512" height="512" fill="#0F151B"/>'
        '<g fill="#1E2A35"><rect x="96" y="96" width="96" height="96" rx="20"/><rect x="208" y="96" width="96" height="96" rx="20"/>'
        '<rect x="96" y="208" width="96" height="96" rx="20"/><rect x="320" y="208" width="96" height="96" rx="20"/>'
        '<rect x="208" y="320" width="96" height="96" rx="20"/><rect x="320" y="320" width="96" height="96" rx="20"/></g>'
        '<rect x="320" y="96" width="96" height="96" rx="20" fill="#F0B85A"/>'
        '<rect x="208" y="208" width="96" height="96" rx="20" fill="#86B6D6"/>'
        '<rect x="96" y="320" width="96" height="96" rx="20" fill="#86B6D6"/></svg>')
rep('<h2 id="lb-recall">Recall</h2>', '<div class="ttl">' + icon + '<h2 id="lb-recall">Recall</h2></div>')

old_tiles = ('<i></i><i class="s" style="--d:.9s"></i><i></i><i class="s" style="--d:2.7s"></i><i></i><i></i>'
             '<i class="s" style="--d:0s"></i><i></i><i class="s" style="--d:1.8s"></i>')
new_tiles = '<i></i><i></i><i class="p3"></i><i></i><i class="p2"></i><i></i><i class="p1"></i><i></i><i></i>'
rep(old_tiles, new_tiles)
rep('aria-label="Recall: tiles light up in a sequence, then are repeated in the same order"',
    'aria-label="Recall: tiles light up in a rising path, bottom to top"')
open(p, 'w').write(s)
print('ok')
