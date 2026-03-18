// Paste this into your browser DevTools console (or run in a modern JS runtime with fetch).
// It fetches the deck JSON from GitHub and prints one random card.
//
// Optional: override deckUrl to point at a different deck.

const deckUrl =
  "https://raw.githubusercontent.com/mhdelta/got-risk-deck/main/decks/events/valheim-got-risk/deck.json";

async function printRandomEvent(url = deckUrl) {
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

printRandomEvent();
