# Portfolio

Statisk portfolio-sida byggd med ren HTML/CSS/JS — inget byggsteg, inga
beroenden. Redo att laddas upp till GitHub Pages.

## Filstruktur

```
portfolio/
├── index.html          Sidans innehåll
├── css/style.css        All styling (ljust + mörkt läge)
├── js/script.js         Mobilmeny, scroll-animation, årtal i footern
├── assets/
│   └── shkokos-loppis.png   Skärmdump av projektet
└── README.md            Den här filen
```

## Innan du publicerar — sök igenom filen efter `REDIGERA`

Öppna `index.html` och byt ut följande (sök efter kommentarerna märkta
`<!-- REDIGERA -->` så hittar du dem snabbt):

- **Namn och titel** — just nu står det "Didar Karimi" i hero-sektionen,
  `<title>` och footern.
- **`USERNAME`** — förekommer i länkarna till GitHub och LinkedIn, byt till
  ditt eget användarnamn.
- **`din@epost.se`** — byt till din riktiga e-postadress (finns på två
  ställen: hero och kontaktsektionen).
- **Live-länken** för projektkortet (`href="#"` just nu) — peka till din
  deployade demo när du har en (se tidigare instruktioner för Vercel/Railway).
- **Om mig-texten** — skriven som platshållare i min röst, skriv om den med
  din egen bakgrund.
- **Andra projekt** — kopiera `<article class="project">`-blocket i
  `index.html` och fyll i. Ta bort `project-placeholder`-kortet när du har
  ett riktigt projekt att sätta i dess ställe.

## Lägga till fler skärmdumpar

Lägg bilden i `assets/` och referera till den som `assets/filnamn.png` i
`index.html`, precis som `shkokos-loppis.png` gör. Behåll en bredd runt
1400px så den ser skarp ut även på stora skärmar.

## Testa lokalt innan du pushar

Dubbelklicka på `index.html` så öppnas den direkt i webbläsaren — inget
byggsteg krävs. Vill du testa med en riktig lokal server (för att undvika
webbläsarens filsäkerhetsbegränsningar) kan du köra, i den här mappen:

```bash
npx serve .
```

## Publicera på GitHub Pages

**Om du redan har ett repo `USERNAME.github.io`:**

Kopiera in filerna ovan (`index.html`, `css/`, `js/`, `assets/`) i det
repot, ersätt eventuellt gammalt innehåll, och kör:

```bash
git add .
git commit -m "Uppdatera portfolio"
git push
```

**Om du inte har repot än:**

1. Skapa ett nytt repo på GitHub som heter exakt `USERNAME.github.io`
   (byt `USERNAME` mot ditt eget GitHub-användarnamn), publikt.
2. I den här mappen (`portfolio/`), kör:
   ```bash
   git init
   git add .
   git commit -m "Första versionen av portfolion"
   git branch -M main
   git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
   git push -u origin main
   ```
3. Vänta en till två minuter. Sidan är sedan live på
   `https://USERNAME.github.io`.

Varje gång du pushar till `main` uppdateras sidan automatiskt inom någon
minut — inget separat deploy-steg behövs.
