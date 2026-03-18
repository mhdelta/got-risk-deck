# risk

Contenido de datos para una futura web app.

## Mazos

- `decks/events/valheim-got-risk/` — Mazo de 50 eventos (JSON + schema + README)

## Script: evento aleatorio

### Python (local)

Imprime 1 evento aleatorio desde el mazo en JSON.

- Mostrar carta completa:
	- `python scripts/random_event.py`
- Solo el texto de regla:
	- `python scripts/random_event.py --rule`
- Salida en JSON:
	- `python scripts/random_event.py --json`

### JavaScript (browser con internet)

Abre DevTools → Console y pega el contenido de `scripts/random-event-browser.js`.
