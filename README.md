# risk

Contenido de datos para una futura web app.

## Mazos

- `decks/events/valheim-got-risk/` — Mazo de 50 eventos (JSON + schema + README)

## Script: evento aleatorio

Imprime 1 evento aleatorio desde el mazo en JSON.

- Mostrar carta completa:
	- `powershell -ExecutionPolicy Bypass -File .\scripts\random-event.ps1`
- Solo el texto de regla:
	- `powershell -ExecutionPolicy Bypass -File .\scripts\random-event.ps1 -Raw`
- Salida en JSON:
	- `powershell -ExecutionPolicy Bypass -File .\scripts\random-event.ps1 -AsJson`
- Usar otro mazo:
	- `powershell -ExecutionPolicy Bypass -File .\scripts\random-event.ps1 -DeckPath .\decks\events\valheim-got-risk\deck.json`
