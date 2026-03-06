/* Shared app look for all first-party pages */
:root{
  --glass: rgba(255,255,255,.82);
  --glass2: rgba(255,255,255,.90);
}

body{
  background:
    radial-gradient(900px 520px at 15% 5%, rgba(251,113,133,.18), transparent 60%),
    radial-gradient(900px 520px at 85% 15%, rgba(139,92,246,.16), transparent 60%),
    radial-gradient(1100px 650px at 50% 110%, rgba(34,211,238,.10), transparent 62%),
    linear-gradient(to bottom, #ffffff, #ffffff);
}

/* header/footer glass */
.header{
  background: rgba(255,255,255,.86);
  backdrop-filter: blur(12px);
}
.footer{
  background: rgba(255,255,255,.72);
  backdrop-filter: blur(10px);
}

/* page head card */
.pagehead{
  border: 1px solid var(--border);
  border-radius: 28px;
  background: var(--glass);
  box-shadow: 0 24px 70px rgba(0,0,0,.10);
  padding: 18px;
  position: relative;
  overflow:hidden;
}
.pagehead:before{
  content:"";
  position:absolute; inset:-2px;
  background:
    radial-gradient(520px 260px at 18% 0%, rgba(251,113,133,.22), transparent 60%),
    radial-gradient(520px 260px at 85% 18%, rgba(139,92,246,.18), transparent 62%),
    radial-gradient(620px 320px at 50% 120%, rgba(34,211,238,.12), transparent 60%);
  opacity:.8;
  pointer-events:none;
}
.pagehead > *{ position:relative; }

.pagehead .title{
  font-size: 28px;
  font-weight: 980;
  letter-spacing: -.02em;
  margin: 0;
}
.pagehead .desc{
  color: var(--muted);
  margin-top: 8px;
  line-height: 1.6;
}

.section-card{
  border:1px solid var(--border);
  border-radius: 26px;
  background: var(--glass2);
  box-shadow: 0 18px 55px rgba(0,0,0,.08);
}

.badge{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:8px 10px;
  border-radius:999px;
  border:1px solid var(--border);
  background: rgba(255,255,255,.75);
  font-weight: 800;
  font-size: 12px;
}

.cards3{ grid-template-columns: repeat(3,1fr); }
@media (max-width:900px){ .cards3{ grid-template-columns:1fr; } }
