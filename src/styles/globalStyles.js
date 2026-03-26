export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
:root{--bg:#F0F3F9;--white:#FFFFFF;--ink:#0A1628;--ink2:#1E2A3B;--muted:#6B7B8D;--royal:#1A3A7A;--royal-dark:#12285A;--royal-light:#2B54A8;--royal-glow:rgba(26,58,122,0.15);--gold:#C9A84C;--radius:24px;--shadow:0 2px 20px rgba(10,22,40,0.06)}
html{scroll-behavior:smooth;scroll-padding-top:100px}
body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;margin:0}
::selection{background:var(--royal);color:#fff}
.font-anton{font-family:'Outfit',sans-serif;font-weight:800;text-transform:uppercase;letter-spacing:-0.02em}
.font-space{font-family:'Outfit',sans-serif;font-weight:500}
.font-dm{font-family:'Inter',sans-serif}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(26,58,122,0.3)}70%{box-shadow:0 0 0 12px rgba(26,58,122,0)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.reveal-h{opacity:0;transform:translateY(30px)}.reveal-v{opacity:1;transform:translateY(0);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
.img-arch{border-radius:120px 120px 24px 24px;object-fit:cover}
.card{background:var(--white);border-radius:var(--radius);padding:32px;box-shadow:var(--shadow);transition:transform .4s,box-shadow .4s}
.card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(10,22,40,0.1)}
.btn-royal{display:inline-flex;align-items:center;gap:8px;background:var(--royal);color:#fff;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;padding:14px 28px;border-radius:14px;border:none;cursor:pointer;transition:all .3s;text-decoration:none}
.btn-royal:hover{background:var(--royal-dark);transform:translateY(-2px);box-shadow:0 8px 24px rgba(26,58,122,0.3)}
.btn-outline{display:inline-flex;align-items:center;gap:8px;border:2px solid var(--ink);color:var(--ink);font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;padding:12px 26px;border-radius:14px;background:transparent;cursor:pointer;transition:all .3s;text-decoration:none}
.btn-outline:hover{background:var(--ink);color:#fff}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:#b0bec5;border-radius:8px}
#progress{position:fixed;top:0;left:0;height:4px;background:linear-gradient(90deg,var(--royal),var(--royal-light),var(--gold));z-index:9999;transition:width .1s}
`;
