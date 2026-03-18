// This file is meant to be loaded in a browser.
// It exposes `window.printRandomEvent(url?)`, which fetches the deck JSON and prints one random card.

const DEFAULT_DECK_URL =
  "https://raw.githubusercontent.com/mhdelta/got-risk-deck/main/decks/events/valheim-got-risk/deck.json";

async function printRandomEvent(url = DEFAULT_DECK_URL) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch deck (${res.status} ${res.statusText})`);
  }

  const deck = await res.json();
  const cards = deck?.cards ?? [];
  if (!Array.isArray(cards) || cards.length === 0) {
    throw new Error("Deck has no cards");
  }

  const card = cards[Math.floor(Math.random() * cards.length)];

  const deckName = deck?.meta?.name ?? "(unknown deck)";
  console.log(`[${deckName}]`);
  console.log(`${card.id ?? ""} — ${card.title ?? ""}`);
  if (card.flavor) console.log(`\n${card.flavor}`);
  console.log(`\nRule:\n${card.ruleText ?? ""}`);

  // Also return it for programmatic use.
  return card;
}

// Make it easy to call after loading this file via a <script> tag.
// (Kept simple on purpose: no modules/build steps.)
window.printRandomEvent = printRandomEvent;

// Auto-run once when loaded via <script>, but guard against double-inclusion.
// Set `window.RISK_RANDOM_EVENT_AUTORUN = false` before loading to disable.
if (window.RISK_RANDOM_EVENT_AUTORUN !== false && !window.__RISK_RANDOM_EVENT_AUTORAN) {
  window.__RISK_RANDOM_EVENT_AUTORAN = true;
  printRandomEvent().catch(console.error);
}
