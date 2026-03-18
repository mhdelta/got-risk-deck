[CmdletBinding()]
param(
  [Parameter(Mandatory = $false)]
  [string]$DeckPath = (Join-Path $PSScriptRoot "..\decks\events\valheim-got-risk\deck.json"),

  [Parameter(Mandatory = $false)]
  [switch]$AsJson,

  [Parameter(Mandatory = $false)]
  [switch]$Raw
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $DeckPath)) {
  throw "Deck file not found: $DeckPath"
}

try {
  $deck = Get-Content -LiteralPath $DeckPath -Raw -Encoding UTF8 | ConvertFrom-Json
} catch {
  throw "Failed to read/parse JSON deck at '$DeckPath'. $($_.Exception.Message)"
}

if (-not $deck.cards -or $deck.cards.Count -lt 1) {
  throw "Deck has no cards: $DeckPath"
}

$card = Get-Random -InputObject $deck.cards

if ($AsJson) {
  $card | ConvertTo-Json -Depth 10
  exit 0
}

if ($Raw) {
  Write-Output $card.ruleText
  exit 0
}

$deckName = $deck.meta.name
if (-not $deckName) { $deckName = "(unknown deck)" }

Write-Output "[$deckName]"
Write-Output "$($card.id) — $($card.title)"
Write-Output ""
if ($card.flavor) {
  Write-Output $card.flavor
  Write-Output ""
}
Write-Output "Rule:"
Write-Output $card.ruleText
