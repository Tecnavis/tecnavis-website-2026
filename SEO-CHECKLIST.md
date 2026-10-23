# Tecnavis — SEO / AEO / AIO checklist

The website side is done (this zip). The "near me" results come mostly from the **off-site** steps below, so do them in this order.

## 0. Before you upload
- [ ] Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `contact.html` and `index.html` with your real key (otherwise the form can't send).
- [ ] Upload everything, including `sitemap.xml`, `robots.txt`, `llms.txt` and `.htaccess` (Apache/cPanel only — delete it on Nginx/Netlify/Vercel and set the same redirects in the host's panel).
- [ ] Make sure `http://tecnavis.in`, `https://tecnavis.in` and `http://www.tecnavis.in` all end up at `https://www.tecnavis.in/`.
- [ ] Open `https://www.tecnavis.in/robots.txt` and `/sitemap.xml` in a browser to confirm they load.
- [ ] Your existing `img/tecnavis-logo.png` may be a wide logo; the zip contains a small icon version under the same name. Keep your own file if the footer logo looks wrong.

## 1. Google Business Profile (the "near me" engine) — most important
- [ ] Claim/verify at business.google.com. Name exactly: **Tecnavis Web Solutions** (no keywords added).
- [ ] Primary category: **Web designer** or **Software company**; add secondary: Website developer, E-commerce service, Mobile app developer (pick those Google offers).
- [ ] Website: `https://www.tecnavis.in/` · Phone: +91 62824 14031 · Hours: Mon–Sat 9:30–18:00 — identical to the site.
- [ ] Add your real street address (or set a service area if clients don't visit). **Then copy your profile's "Share" short link (g.page / maps.app.goo.gl) and replace the search-style Maps link on the site** — search for `google.com/maps/search` in all `.html` files, `llms.txt` and the `hasMap` line in the JSON-LD block at the top of every page. Add the same link to `sameAs` there.
- [ ] Add services with descriptions, 10+ photos (team, office, work), your logo and cover image.
- [ ] Post an update every week or two (new project, offer, tip).
- [ ] Ask every happy client for a Google review (use the "Get more reviews" link). Reply to each one. Reviews are the biggest ranking lever for "near me".

## 2. Consistency (NAP)
Use exactly: **Tecnavis Web Solutions Pvt Ltd · Malappuram, Kerala 676505 · +91 62824 14031 · info@tecnavis.in** on: Justdial, Sulekha, IndiaMART, Clutch, GoodFirms, LinkedIn, Facebook, Instagram, Bing Places, Apple Business Connect. Link each back to the site.

## 3. Search engines
- [ ] Google Search Console → add `https://www.tecnavis.in/` → submit `sitemap.xml` → "Request indexing" for the 6 pages.
- [ ] Bing Webmaster Tools → import from Search Console. (Bing feeds ChatGPT search and Copilot answers.)
- [ ] Bing Places for Business → import from Google Business Profile.

## 4. AEO / AIO (answer engines and AI assistants)
Already in the site: question-style FAQs with matching FAQPage schema, plain-text facts in HTML (not hidden behind JS), `llms.txt`, and AI crawlers explicitly allowed in `robots.txt`. To strengthen it:
- [ ] Keep NAP and service descriptions identical everywhere (AI tools cross-check sources).
- [ ] Get listed on 3–5 reputable directories and write one case study per quarter on `work.html`.
- [ ] If you'd rather not let AI training crawlers in, change `Allow` to `Disallow` for `GPTBot`, `Google-Extended`, `Applebot-Extended` in `robots.txt` (search-answer bots like `OAI-SearchBot` can stay allowed).

## 5. Ongoing
- [ ] Re-test pages in Google's Rich Results Test and PageSpeed Insights after upload.
- [ ] Add a Malayalam-friendly or location page (e.g. "Web developers in Kozhikode/Perinthalmanna") only if you genuinely serve those areas — one real page each, not copies.
- [ ] Update `lastmod` dates in `sitemap.xml` when pages change.

Not included on purpose: star ratings and map coordinates in the schema (add them only once you have real reviews and a verified address — fake ratings can get a site penalised).
