#!/usr/bin/env python3
"""Print one random event card from a deck JSON.

Usage:
  python scripts/random_event.py
  python scripts/random_event.py --deck-path decks/events/valheim-got-risk/deck.json
  python scripts/random_event.py --deck-url https://raw.githubusercontent.com/mhdelta/got-risk-deck/main/decks/events/valheim-got-risk/deck.json

Notes:
  - If both --deck-path and --deck-url are provided, --deck-path wins.
"""

from __future__ import annotations

import argparse
import json
import random
import sys
import urllib.request
from pathlib import Path

DEFAULT_DECK_PATH = Path(__file__).resolve().parent.parent / "decks" / "events" / "valheim-got-risk" / "deck.json"
DEFAULT_DECK_URL = (
    "https://raw.githubusercontent.com/mhdelta/got-risk-deck/main/"
    "decks/events/valheim-got-risk/deck.json"
)


def _load_from_path(deck_path: Path) -> dict:
    data = deck_path.read_text(encoding="utf-8")
    return json.loads(data)


def _load_from_url(deck_url: str) -> dict:
    with urllib.request.urlopen(deck_url) as resp:
        data = resp.read().decode("utf-8")
    return json.loads(data)


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Print a random event card.")
    parser.add_argument("--deck-path", type=str, default=str(DEFAULT_DECK_PATH))
    parser.add_argument("--deck-url", type=str, default=DEFAULT_DECK_URL)
    parser.add_argument("--json", action="store_true", help="Output only the card as JSON")
    parser.add_argument("--rule", action="store_true", help="Output only the ruleText")
    args = parser.parse_args(argv)

    deck_path = Path(args.deck_path)

    if deck_path.exists():
        deck = _load_from_path(deck_path)
    else:
        deck = _load_from_url(args.deck_url)

    cards = deck.get("cards") or []
    if not cards:
        raise SystemExit("Deck has no cards")

    card = random.choice(cards)

    if args.json:
        print(json.dumps(card, ensure_ascii=False, indent=2))
        return 0

    if args.rule:
        print(card.get("ruleText", ""))
        return 0

    deck_name = (deck.get("meta") or {}).get("name") or "(unknown deck)"
    print(f"[{deck_name}]")
    print(f"{card.get('id', '')} — {card.get('title', '')}")
    print("")
    flavor = card.get("flavor")
    if flavor:
        print(flavor)
        print("")
    print("Rule:")
    print(card.get("ruleText", ""))

    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main(sys.argv[1:]))
    except BrokenPipeError:
        # Allow piping to commands like `head` without stacktraces.
        raise SystemExit(0)
