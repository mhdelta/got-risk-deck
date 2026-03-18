# risk

Contenido de datos para una futura web app.

## Mazos

- `decks/events/valheim-got-risk/` — Mazo de 50 eventos (JSON + schema + README)

## Script: evento aleatorio

## GitHub Pages (link para tus amigos)

Este repo incluye una página simple ([index.html](index.html)) que muestra un evento aleatorio del mazo.

1) En GitHub: **Settings → Pages → Build and deployment**
- Source: **Deploy from a branch**
- Branch: **main** (o tu rama) / Folder: **/(root)**
2) Comparte el link que te da GitHub Pages (formato típico):
- `https://<OWNER>.github.io/<REPO>/`

### Python (local)

Imprime 1 evento aleatorio desde el mazo en JSON.

- Mostrar carta completa:
	- `python scripts/random_event.py`
- Solo el texto de regla:
	- `python scripts/random_event.py --rule`
- Salida en JSON:
	- `python scripts/random_event.py --json`

### JavaScript (browser con internet)

Opción A (recomendada): 2 líneas que funcionan incluso en sitios con Trusted Types (no inyecta `<script>`):

```js
const deckUrl = "https://raw.githubusercontent.com/mhdelta/got-risk-deck/main/decks/events/valheim-got-risk/deck.json";
fetch(deckUrl, { cache: "no-store" }).then(r => { if (!r.ok) throw new Error(`Failed to fetch deck (${r.status} ${r.statusText})`); return r.json(); }).then(deck => { const cards = deck?.cards ?? []; if (!Array.isArray(cards) || cards.length === 0) throw new Error("Deck has no cards"); const card = cards[Math.floor(Math.random() * cards.length)]; const deckName = deck?.meta?.name ?? "(unknown deck)"; console.log(`[${deckName}]`); console.log(`${card.id ?? ""} — ${card.title ?? ""}`); if (card.flavor) console.log(`\n${card.flavor}`); console.log(`\nRule:\n${card.ruleText ?? ""}`); return card; }).catch(console.error);
```

Opción B: cargar este repo como script remoto (puede fallar por CSP `script-src` del sitio). Pega 2 líneas:

```js
const url = "https://cdn.jsdelivr.net/gh/mhdelta/got-risk-deck@main/scripts/random-event-browser.js";
(() => { const s = document.createElement("script"); const u = url + "?v=" + Date.now(); let src = u; try { const tt = window.trustedTypes; if (tt?.createPolicy) { const p = tt.createPolicy("risk", { createScriptURL: x => x }); src = p.createScriptURL(u); } } catch {} s.src = src; document.head.appendChild(s); })();
```

Para sacar otra carta después: ejecuta `printRandomEvent()`.

Notas:
- Esto NO puede saltarse el CSP/Trusted Types del sitio actual: si estás en una página tipo `chrome://...`, extensiones, o un sitio con `connect-src 'self'`, se bloquearán `fetch()` y/o scripts remotos.
- En ese caso, abre una web normal (por ejemplo `https://example.com`) y pega el snippet ahí.
