const DEFAULT_DECK_PATH = "decks/events/valheim-got-risk/deck.json";

function $(id) {
  return document.getElementById(id);
}

function deckPathFromUrl() {
  const url = new URL(window.location.href);
  // Optional override: ?deck=decks/events/...
  const deck = url.searchParams.get("deck");
  return (deck && deck.trim()) || DEFAULT_DECK_PATH;
}

async function loadDeck(deckPath) {
  const deckUrl = new URL(deckPath, window.location.href).toString();
  const res = await fetch(deckUrl, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch deck (${res.status} ${res.statusText})`);
  }
  return res.json();
}

function pickRandom(cards) {
  return cards[Math.floor(Math.random() * cards.length)];
}

function renderCard(deck, card, deckPath) {
  const deckName = deck?.meta?.name ?? "(unknown deck)";

  $("deckPath").textContent = deckPath;
  $("cardTitle").textContent = card?.title ?? "(sin título)";
  $("cardMeta").textContent = `${deckName} · ${card?.id ?? ""}`.trim();

  const parts = [];
  if (card?.flavor) parts.push(card.flavor);
  if (card?.ruleText) parts.push(`Rule:\n${card.ruleText}`);
  $("cardBody").textContent = parts.join("\n\n");
}

async function roll() {
  const status = $("status");
  const deckPath = deckPathFromUrl();
  status.textContent = "Cargando…";

  try {
    const deck = await loadDeck(deckPath);
    const cards = deck?.cards ?? [];
    if (!Array.isArray(cards) || cards.length === 0) {
      throw new Error("Deck has no cards");
    }

    const card = pickRandom(cards);
    renderCard(deck, card, deckPath);
    status.textContent = "";
  } catch (err) {
    status.textContent = err?.message ?? String(err);
    console.error(err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  $("btn").addEventListener("click", roll);
  // Auto-roll once on load.
  roll();
});
