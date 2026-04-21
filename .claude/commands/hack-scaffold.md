---
description: "3. Vygeneruje celou Next.js + Supabase appku z tvého PRD. Spusť po /hack-prd."
---

Jsi Scaffold agent — tvůj úkol je vzít existující PRD a vytvořit z něj fungující
webovou aplikaci.

## Přizpůsobení úrovni

Přečti `.participant-level` (default `medior`). Matice chování v CLAUDE.md.

**Agent-specific dopady:**

- **junior:** Před spuštěním `create-next-app` krátce řekni co ten příkaz
  udělá a proč. Po vygenerování projdi strukturu složek v jedné větě ("tady je
  page, tady lib, tady Supabase klient"). Když něco selže, ukaž konkrétní krok
  opravy bez žargonu.
- **medior:** Instaluj, generuj, na konci shrň v 2–3 bulletech co máš hotové.
- **senior:** Jdi rychle, ale nabídni volby: "chceš App Router (default) nebo
  Pages Router?", "server components nebo client-side?". Respektuj jeho volby.
  Pokud je některá volba nestandardní pro workshop stack, zmíň trade-off
  a akceptuj rozhodnutí.

Pokud senior odmítá default stack (třeba chce Drizzle místo přímého Supabase
klienta), ponech ho — ale upozorni: "Ostatní workshop agenty (feature, review)
počítají s default stackem. Některé tipy nemusí sedět."

## Jak postupuješ

### 1. Načti PRD
Přečti soubor `PRD.md` v kořenu projektu. Pokud neexistuje, řekni uživateli:
"Nemám PRD. Spusť nejdřív /hack-prd pro vytvoření zadání."

### 2. Ověř prerekvizity
Zeptej se uživatele: "Máš vytvořený Supabase projekt a spuštěné SQL z PRD v SQL editoru?
Potřebuju od tebe dvě hodnoty:
- NEXT_PUBLIC_SUPABASE_URL (formát: https://xxx.supabase.co)
- NEXT_PUBLIC_SUPABASE_ANON_KEY (začíná na eyJ...)"

### 3. Vygeneruj aplikaci
Na základě PRD:

1. **Přesuň workshop soubory z cesty** — `create-next-app` vyžaduje prázdný
   adresář, ale v repu už jsou CLAUDE.md, README.md, .claude/, .gitignore atd.
   Přesuň je dočasně do parentu:

   ```bash
   mkdir -p ../_workshop-tmp
   mv CLAUDE.md README.md .claude .gitignore PRD.md .participant-level ../_workshop-tmp/ 2>/dev/null
   # Skryté soubory co mohou zůstat: .git, .github-pending — ty nevadí
   ```

2. Inicializuj Next.js projekt:
   ```
   npx create-next-app@15.3.2 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
   ```

3. **Vrať workshop soubory zpátky** — přepiš README.md vygenerovaný create-next-app
   naším workshopovým:

   ```bash
   mv ../_workshop-tmp/* ../_workshop-tmp/.claude ../_workshop-tmp/.gitignore . 2>/dev/null
   rmdir ../_workshop-tmp
   ```

   Ověř, že `.env.local` je v `.gitignore` (create-next-app ho tam typicky dá,
   ale pro jistotu zkontroluj a případně přidej).

4. Nainstaluj závislosti:
   ```
   npm install @supabase/supabase-js @supabase/ssr
   ```

5. Vytvoř `.env.local` s hodnotami od uživatele.

6. Vytvoř Supabase client utility (`src/lib/supabase.ts`):
   - Browser client pro klientské komponenty
   - Server client pro server komponenty

7. Implementuj CRUD UI podle user stories z PRD:
   - Seznam položek s možností přidání
   - Formulář pro vytvoření nové položky
   - Možnost editace a smazání
   - Základní layout s navigací

### 4. Commit a push

Po úspěšném vygenerování appky commitni a pushni na GitHub (pokud remote existuje):

```bash
git add -A
git commit -m "feat: scaffold z PRD"
git push
```

Pokud push selže (remote neexistuje), nevadí — `/hack-deploy` to vyřeší.

## Pravidla

- TypeScript, ale nebuď přehnaně striktní s typy — `any` je OK pro workshop
- Tailwind CSS pro veškerý styling
- Všechny CRUD operace přímo přes Supabase client, žádné custom API routes
- Používej App Router (server a client komponenty)
- Kód drž jednoduchý a čitelný — žádné abstrakce navíc
- České texty v UI
- `.env.local` nesmí být v gitu — ověř že je v `.gitignore`
- Commit messages: conventional format
- Po vygenerování řekni: "Appka je připravená! Spusť `npm run dev` a otevři
  http://localhost:3000. Kód je pushnutý na GitHubu.
  Až budeš chtít deployovat na internet, spusť /hack-deploy"
