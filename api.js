/* Standard skin: colorful but lighter than premium */
:root{
  --std-accent:#111827;
  --std-pink:#fb7185;
  --std-violet:#8b5cf6;
  --std-cyan:#22d3ee;
}

.plan-standard{
  background:
    radial-gradient(900px 520px at 15% 5%, rgba(251,113,133,.20), transparent 60%),
    radial-gradient(900px 520px at 85% 15%, rgba(139,92,246,.18), transparent 60%),
    linear-gradient(to bottom, #ffffff, #ffffff);
  color:#111;
}

.plan-standard .hero-card{
  background: rgba(255,255,255,.86);
  border-color: rgba(17,24,39,.10);
}
.plan-standard .tcard{
  background: rgba(255,255,255,.92);
  border-color: rgba(17,24,39,.10);
}
.plan-standard .music-btn{
  background:#fff;
  border-color: rgba(17,24,39,.12);
}
.plan-standard .kbd{ background:#fff; }

/* simple reveal */
.reveal{
  opacity:0;
  transform: translateY(10px);
  transition: opacity .5s ease, transform .5s ease;
}
.reveal.is-visible{ opacity:1; transform: translateY(0); }

.plan-standard .gimg img{
  transition: transform .35s ease;
}
.plan-standard .gimg:hover img{ transform: scale(1.03); }
