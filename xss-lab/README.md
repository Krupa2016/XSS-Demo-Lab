# XSS Demo Lab

A small, offline, self-contained playground for learning the three classic
types of Cross-Site Scripting (XSS): **Reflected**, **Stored**, and
**DOM-based**. Built with plain HTML, CSS, and JavaScript — no build tools,
no dependencies, no backend/server required.

## For learning only

Everything runs locally in your own browser. There is no real server, no
real database, and no real other users — the "stored" lab just uses
`localStorage`, and the "reflected"/"DOM" labs just read from the current
page's own URL. Nothing here ever leaves your machine.

Never run payloads like the ones in this lab against websites or systems
you don't own or don't have explicit written permission to test. Doing so
against third parties may be illegal.

## How to run

Just open `index.html` in a browser — double-click it or drag it into a
browser window. Optionally serve the folder with any static file server
(e.g. `python3 -m http.server`) — not required, everything works from the
local filesystem too.

## Structure

```
xss-lab/
├── index.html              Landing page, links to all 3 labs
├── css/style.css            Shared styling
├── js/common.js             Small helper that shows a "payload executed" flag
├── reflected/index.html     Reflected XSS: intro, how-to, hands-on lab
├── stored/index.html        Stored XSS: intro, how-to, hands-on lab
└── dom/index.html           DOM-based XSS: intro, how-to, hands-on lab
```

## What each lab covers

| Lab | Vulnerable flow | Try this payload |
|---|---|---|
| Reflected | URL `?q=` param → `innerHTML` | `<img src=x onerror=alert('xss')>` |
| Stored | Comment text saved to `localStorage` → re-rendered via `innerHTML` on every load | `<img src=x onerror=alert('stored-xss')>` |
| DOM-based | URL `#name=` fragment (never sent to a server) → `innerHTML` | `<img src=x onerror=alert('dom-xss')>` |

Each lab page shows its own vulnerable source snippet (in a collapsible
"Show vulnerable source" section) along with a one-line explanation of the
fix (prefer `textContent` over `innerHTML`, or HTML-encode user input
before inserting it into markup).

## Suggested next steps

- Try payloads that don't use `alert()` at all — e.g. ones that change
  `document.title`, or silently run other JS — to see that `alert()` isn't
  required for XSS to be dangerous, it's just a convenient proof-of-concept.
- Open dev tools and watch the DOM update live as you submit payloads.
- After trying to break each lab, open the source and patch it yourself:
  swap `innerHTML` for `textContent`, or write a tiny `escapeHtml()`
  helper and use it before any `innerHTML` assignment.
