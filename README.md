# Schachtraining Artur — Website

Professionelle, statische Website für den Schachtrainer **CM Artur Steinhauer**
(Marke: *Schachtraining Artur*, Domain: `schachtraining-artur.com`).

Kein Build-Prozess, keine Abhängigkeiten – reines HTML, CSS und ein wenig
Vanilla-JavaScript. Einfach die Dateien auf einen beliebigen Webspace laden.

## Struktur

```
index.html              Startseite
training.html           Training & Angebote
ueber-mich.html         Über mich
preise.html             Preise
vereine-schulen.html    Für Vereine & Schulen
kontakt.html            Kontakt (Anfrageformular)
impressum.html          Impressum (§ 5 DDG)
datenschutz.html        Datenschutzerklärung (DSGVO)
robots.txt / sitemap.xml
assets/
  css/styles.css        Design-System (Farben, Layout, Komponenten)
  js/main.js            Mobile-Navigation, Scroll-Effekte, Kontaktformular
  img/favicon.svg       Favicon (Springer)
```

## Lokal ansehen

Einfach `index.html` im Browser öffnen – oder einen kleinen Server starten:

```bash
python -m http.server 8000
# dann http://localhost:8000 aufrufen
```

## Kontaktformular

Das Formular auf `kontakt.html` kommt **ohne Server/Backend** aus: Beim Absenden
öffnet sich das E-Mail-Programm des Besuchers mit einer fertig ausgefüllten
Nachricht an `info@schachtraining-artur.com` (`mailto:`).

Wenn später ein „echter“ Formularversand gewünscht ist (Absenden ohne
E-Mail-Programm), lässt sich das Formular mit einem Dienst wie **Formspree**,
**Web3Forms** oder einem eigenen Backend verbinden – dazu in `main.js` den
`mailto`-Teil durch einen `fetch`-POST ersetzen.

## Hinweise / Empfehlungen

- **Google Fonts** werden aktuell vom Google-CDN geladen (in der
  Datenschutzerklärung erwähnt). Für maximale DSGVO-Konformität können die
  Schriften *Fraunces* und *Inter* lokal unter `assets/fonts/` selbst gehostet
  werden; dann die `<link>`-Tags in den HTML-Dateien entsprechend anpassen.
- Ein echtes **Portraitfoto** von Artur auf `ueber-mich.html` (ersetzt den
  Platzhalter mit den Initialen „AS“) würde die Seite zusätzlich aufwerten.
- Die **Impressum-Angaben** (c/o IP-Management, Hamburg) und Kontaktdaten
  stammen aus dem Briefing – vor Veröffentlichung bitte auf Richtigkeit prüfen.

## Anpassen

Farben, Abstände und Typografie sind zentral als CSS-Variablen in
`assets/css/styles.css` (Block `:root`) definiert.
