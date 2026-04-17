# Vibe Coding Workshop Kit

Workshop materiály pro **Hack Your Way 2026** — "Od nápadu k deploynuté appce za 3 hodiny"

## Quick Start

```bash
# 1. Naklonuj tento kit do nového adresáře pro svůj projekt
git clone https://github.com/[TBD]/workshop-kit.git moje-appka
cd moje-appka

# 2. Spusť Claude Code
claude

# 3. Ověř, že máš vše připravené
/hack-check

# 4. Začni s PRD agentem
/hack-prd
```

## Dostupné příkazy

V Claude Code napiš `/hack` a uvidíš autocomplete se všemi příkazy.

### Základní track — projdeš v tomhle pořadí

| Příkaz | Co dělá | Kdy použít |
|--------|---------|------------|
| `/hack-check` | Ověří prerekvizity (Node, Git, účty...) | Ještě před workshopem |
| `/hack-prd` | Provede tě tvorbou produktového zadání | Na začátku — první krok |
| `/hack-scaffold` | Z PRD vygeneruje celou appku | Po dokončení PRD |
| `/hack-deploy` | Pomůže s GitHubem a Vercel deployem | Když chceš appku na internet |
| `/hack-feature` | Pomůže přidat novou feature | Kdykoliv chceš vylepšit appku |
| `/hack-review` | Druhý pár očí — projde změny a najde problémy | Po každé větší feature |

### Advanced track — pro rychlejší, volitelné

| Příkaz | Co dělá | Kdy použít |
|--------|---------|------------|
| `/hack-feature-pro` | Orchestrátor — rozdělí task mezi backend + frontend + test subagenty | Větší feature, co se dotýká DB i UI |
| `/hack-test` | Nastaví Vitest a napíše první testy | Když máš hotovou základní appku a chceš seriózní projekt |
| `/hack-ci` | Nastaví GitHub Actions pipeline (lint + typecheck + test + build) | Po `/hack-test`, nebo samostatně bez testů |

## Úroveň účastníka

Agenti se přizpůsobují tvé úrovni (junior / medior / senior). `/hack-check` se
tě na úroveň zeptá a uloží ji do `.participant-level`. Ostatní agenti si soubor
přečtou a upraví chování — junior dostane víc hand-holdingu, senior víc challenge.

Default je `medior`. Úroveň kdykoliv přepíšeš otevřením `.participant-level`
v editoru. Můžeš ji také změnit řečí — napiš agentovi "zjednoduš mi to" nebo
"nemusíš mi to vysvětlovat" a přizpůsobí se.

## Prerekvizity

- [Node.js 18+](https://nodejs.org)
- [Git](https://git-scm.com)
- [Claude Code](https://docs.claude.com/en/docs/claude-code) (vyžaduje Claude Pro/Max)
- [Supabase účet](https://supabase.com) (free tier)
- [Vercel účet](https://vercel.com) (free tier)
- [GitHub účet](https://github.com)

## Stack

- **Next.js** — React framework (App Router, TypeScript)
- **Supabase** — PostgreSQL databáze + autentizace
- **Tailwind CSS** — styling
- **Vercel** — hosting a automatický deploy

## Typický flow

```
/hack-prd          →  Vytvořím PRD s datovým modelem
                          Spustím SQL v Supabase SQL Editoru
/hack-scaffold     →  Vygeneruji celou appku
                          npm run dev → vidím appku lokálně
/hack-deploy       →  Push na GitHub + deploy na Vercel
                          Mám živou URL!
/hack-feature      →  Přidávám features, iteruji
/hack-review       →  Nechám druhou AI posoudit změny
                          git push → auto-redeploy
```

### Když jsi rychle hotový

```
/hack-test         →  Vitest + první testy
/hack-ci           →  GitHub Actions pipeline
/hack-feature-pro  →  Větší feature s orchestrátorem
```
