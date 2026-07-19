# Changelog

## v105 — Quiz flags fixed and docked

- Fixed: quiz flag images never appeared — the shared image loader expects a sized/base URL pair and was being handed a plain list, so the overlay image never received a valid source. Flags now load at w640 with a w320 fallback.
- Find-the-country questions now dock their mystery flag inside the quiz panel instead of floating it over the map, so the whole map stays visible while you hunt, on desktop and mobile alike. The floating overlay remains for identification questions and answer reveals — and reveals after find questions deliberately skip it, keeping the just-revealed country in view.

## v104 — Countries first in Explore

- The Explore section of the control panel now leads with Full List of Countries, followed by Territorial & Identity Disputes, Monarchies & Royals, British Monarchy and Flags.

## v103 — Flags

- New "Flags" browser under Explore: every sovereign state's flag in a tappable A–Z grid (England, Scotland and Wales fly their own); tapping a flag flies to the country and opens its info card.
- Flags quiz in the house style — ten questions mixing colour posers ("Which of these colours is NOT in the flag of…?" with tappable colour chips, the flag revealed alongside the answer), pick-the-correct-flag from four flag images, find-the-country-of-this-flag on the map, and straight identification — with deep cuts, flag-thumbnail review, retry-missed and keyboard support throughout.
- The world map quiz now deals flags as a fourth question type alongside identify, find and capital.
- Colour questions draw from a curated set of 170 flags with clean palettes so every answer is defensible; Northern Ireland (no official flag since 1973) and Afghanistan (flag contested) sit outside the flag pools.

## v102 — Brighter key-site rings

- British Monarchy key-site markers are now a bright off-yellow dashed ring over a soft dark halo, clearly visible against both the highlighted realm and the base map while staying understated.

## v101 — Whole-portrait framing for the British Monarchy

- British Monarchy card portraits are ~50-70% larger and completely uncropped: full-length paintings display whole in a rounded frame at their natural aspect, so heads, crowns and regalia are always entirely visible.
- Quiz portrait-identification images likewise show the whole painting rather than a cropped window.
- Modern Monarchies & Royals portraits keep their circular frame, and country flags are unaffected.

## v100 — The British Monarchy

- New "British Monarchy" browser under Explore: the continuous royal line from Æthelstan (927) to Charles III — 57 chronological entries across ten houses, with house dividers, reign dates, disputed reigns (Lady Jane Grey) and the Interregnum marked.
- Opening it veils the world outside Britain and Ireland with a coastline-accurate spotlight mask and frames the isles for the whole game.
- Each reign drives the map: the monarch's actual realm is highlighted (Ireland joins under Henry II, Wales under Edward I, Scotland at the Union of the Crowns, the Republic departs after partition) and key sites — Eamont, Hastings, Runnymede, Bannockburn, Bosworth, Tilbury, the Boyne, Culloden — are marked with labelled rings where history offers one.
- The info card shows each monarch's portrait (live from Wikipedia — paintings for the pre-photography reigns), house, reign and a synopsis.
- Quiz with four leak-proofed question styles: who came to the throne first, which house, redacted mystery-reign clues, and portrait identification (the portrait card asks "Who is this?" rather than captioning its own answer). Deep-cuts toggle unlocks the Wessex and Danish obscurities; full review, retry, keyboard and auto-collapse integration.
- Shared masking engine upgraded to handle Æ and accented names safely; disputes and royals regression-tested through it.

## v99 — Cinematic travel reverted

- Removed the distance-scaled flight durations from v98; all map transitions are back to their original quick timings.

## v98 — Cinematic map travel

- Every automated flight across the map now scales its duration with the distance covered: short hops stay quick (~1.5s), continental moves take ~3-4s, and hemisphere-crossing jumps glide for up to ~6.5s, giving the map time to render mid-flight and the transition room to breathe.
- Applied at the engine level, so it permeates every feature — disputes, royals, country list, quiz reveals and repositions, and the zoom-out control — without touching individual call sites. Respects the reduced-motion preference.

## v97 — Zoom-out button pixel-aligned

- The zoom-out globe now measures the real zoom control at runtime and pins itself beside the − button with their bottoms exactly aligned, on any device or theme.

## v96 — Zoom-out button repositioned

- The full zoom-out globe now sits directly beside the − button instead of below the zoom control, clearing the Monarchies & Royals panel and the other left-side widgets.

## v95 — Bigger popup flags

- World-map popup flags are three times larger (45px tall) and sit above the country name, served from a sharper source image.

## v94 — Labels, unified selection style, popup flags and zoom-out

- Capitalised across all states: Show Capital Cities, Territorial & Identity Disputes (button and panel title), and Start 10-Question Quiz.
- Monarchies & Royals selections — in both browse and quiz reveals — now use the same distinctive highlight as the Full List of Countries: highlighter-yellow wash with slow black marching-ants dashes on a white halo (unresolved entries get matching circles). The gold all-monarchies overlay is unchanged.
- Country popups on the world map now show a small national flag beside the country name (ISO-driven via flagcdn, with fixes for France, Norway, Kosovo and the UK home nations; hidden gracefully if unavailable).
- New zoom-out control beneath the +/- buttons: one tap returns to the full extent of the current map mode, available at all times.

## v93 — Flags shown whole

- Country card images (flags and lead photos) are no longer cropped: they display at their natural aspect ratio, scaled to fit the card, so nothing is cut off around the edges. Monarch portraits keep their circular crop.

## v92 — Calmer marching ants

- The animated dashed border on selected countries now moves at half speed.

## v91 — Distinctive country selection

- The selected country in the Full List now gets a bright highlighter-yellow wash, a black dashed border with a thin white halo, and gently animated "marching ants" dashes so the selection is unmistakable (animation respects reduced-motion preferences).

## v90 — Standard dashed country outline

- The Full List country highlight is now a standard white dashed outline (with a soft dark under-stroke for contrast) instead of round dots.

## v89 — Country highlight made unmissable

- Selected countries in the Full List are now outlined with white round dots over a dark halo casing, so the outline reads clearly on land, ocean and border colours alike.
- The highlight pane sits above every other overlay, and a geometry fallback rebuilds the outline from the map layers if a country's stored features are ever empty.

## v88 — Full List of Countries

- New "Full List of Countries" browser under Explore: every sovereign state on the map, A–Z with capitals, in a scrollable panel (the United Kingdom appears as its four home nations, matching the rest of the game).
- Selecting a country outlines it in teal and flies to it with room to breathe — the largest-landmass framing keeps France on France and Norway on Norway rather than zooming out to overseas territories.
- The shared info card shows a short live Wikipedia summary with the country's lead image, and the country information widget in the bottom right updates as if the country had been clicked on the map.
- Summaries are cached per session and degrade gracefully offline; ambiguous article titles (Georgia, Ireland, Palestine and friends) resolve to the correct country articles.

## v87 — Controls collapsed for the whole Royals quiz

- The control panel now collapses the moment a Monarchies & Royals quiz starts and stays collapsed for the duration of the game — through every question, Play again and retry rounds — expanding automatically only when the quiz is closed.
- A panel the player had collapsed themselves stays collapsed after the quiz, and a manual toggle mid-game is still respected.

## v86 — Auto-collapsing controls in the Royals quiz

- When the first answer card appears in a Monarchies & Royals quiz, the control panel collapses automatically to clear the screen.
- The collapse is polite: it happens once per quiz, respects a panel the player had already collapsed, hands ownership back if the player toggles it manually mid-quiz, and restores the panel automatically when the quiz ends.

## v85 — Quiz card docking, naming polish, and data audit

- Royals and disputes quiz answer cards now dock to the bottom-right, clear of the quiz panel and the portrait; browse-mode card positioning is unchanged.
- Photo questions always display the pictured monarch's name (the name only) beneath the portrait.
- "Monarchies & Royals" is now capitalised consistently across the toggle button, panel title and quiz-complete screen.
- Data audit (verified 13 July 2026): full roster of 43 confirmed, including Jamaica's continuing realm status and Emir Mishal of Kuwait; Qatar entry unaffected by the death of Father Emir Sheikh Hamad (12 July 2026). Three corrections: Sālote was Tupou VI's grandmother (not great-grandmother), Morocco's Alaouite dating softened to the seventeenth century, and Kuwait's parliamentary role stated precisely (approval of each crown prince).

## v84 — Portrait reliability and layout fixes

- Monarch photos now load through a fallback chain: the high-resolution request falls back automatically to Wikipedia's guaranteed-served thumbnail, and hides only if both fail — restoring portraits everywhere and making them immune to future sizing changes.
- While a quiz portrait is on screen, the info card docks to the bottom-left instead of colliding with it mid-screen (the card remains draggable).
- Odd-one-out photo questions show the portrait with the monarch's name as a caption beneath it, as designed — previously only the name appeared because the photo request itself was failing.
- Image error/load handlers are cleaned up when photos hide, and lazy-loading was removed from the card portrait.

## v83 — Face the monarch

- New photo questions in the royals quiz: two per round, showing a large portrait (350px, fetched live from Wikipedia) centred over the map in a gold frame.
- Single-country monarchs ask "This monarch is the head of state of which country?" — pure face recognition.
- Shared monarchs (King Charles III's realms) invert the question: "head of state of three of these countries — which one is NOT?", with three realms plus one Commonwealth member that keeps its own crown (Malaysia, Brunei, Lesotho, Eswatini or Tonga). The reveal highlights the odd one out and shows its own monarch's card.
- The pictured monarch's name appears while the photo loads (and stays as a caption on odd-one-out questions); if no image is available the name card stands in, so the question always works.
- Portrait plumbing now serves any display size from one cached Wikipedia lookup per monarch.

## v82 — Portrait polish

- Monarch portraits are 50% larger (112px) and stay circular, with the crop window anchored near the top of the image so heads are no longer clipped by the round frame.
- Portraits now request a sharper Wikipedia thumbnail sized for high-DPI screens, capped at each image's original width.

## v81 — Royals zoom fix and monarch portraits

- Fixed royals browse and quiz zooming for countries with far-flung territories or antimeridian parts: Netherlands (Caribbean municipalities), Norway (Svalbard and Jan Mayen), New Zealand (Chatham Islands) and similar no longer fly out to a world view. The camera now frames the home landmass, merging only nearby parts, with the authored circle as a fallback.
- Added monarch portraits to the info card, top-centre: the current lead image from each monarch's Wikipedia article is fetched live (29 unique articles across the 43 states), cached per session, and hidden gracefully if unavailable. Dispute cards are unaffected.

## v80 — Monarchies & royals

- New "Monarchies & royals" browse panel: all 43 sovereign states with a royal head of state, with a gold overlay on the world map, per-country highlight and fly-to, and an info card showing monarch, house and accession year (details verified July 2026).
- New royals quiz with five leak-proofed question styles: name the monarch of a highlighted country, reverse monarch-to-country, title questions (Emir, Grand Duke, Yang di-Pertuan Agong...), Commonwealth-realm spotting, and redacted "mystery monarchy" clues.
- Realm-aware question logic: King Charles III's fifteen realms never appear in ambiguous reverse questions and get dedicated realm-identification questions instead.
- Country polygons resolve from the world layer at runtime via alias lists (the UK merges its four home nations); unresolved entries fall back to a circle so every monarchy still works.
- The clue redaction engine is now shared between disputes and royals, masking country, monarch, house and demonym tokens with the same collapse-and-absorb rules; the disputes quiz behaviour is unchanged.
- Difficulty tiers with an "Include deep cuts" toggle, and full integration with scoring, review, retry and keyboard shortcuts.

## v79 — Disputes quiz leak-proofing

- Parties questions no longer state the dispute name, which sometimes contained the answer (e.g. Israeli–Palestinian territories); they now ask about the highlighted region instead.
- Clue redactions collapse multi-word names into a single blank, so word count no longer telegraphs answers like the South China Sea.
- Redactions absorb adjacent giveaway words (Sea, Heights, Plateau, North/South, "Las"...) and verbatim name phrases made of generic words (e.g. the Kurils' "Northern Territories").

## v78 — Disputes quiz

- Added a 10-question multiple-choice quiz to the territorial disputes panel.
- Three question styles: name the highlighted region, pick the parties involved, and identify a "mystery region" from its redacted synopsis (two per round).
- Added difficulty tiers to the interstate disputes, with a headline/regional default pool and an optional "Include deep cuts" toggle.
- Every answer reveals the dispute's synopsis card, and missed questions feed the existing review/retry flow.
- Internal identity and autonomy entries remain browse-only, and quiz prompts stay framing-neutral (no "who does it belong to" questions).

## v77 — Offshore island recognition

- Added recognition overlays for major offshore island regions.
- Added Balearic Islands, Corsica, Sardinia, Sicily, Madeira, Azores, Crete, Åland, Gotland and Bornholm.
- Brought the Canary Islands into the same general offshore-island system.
- Kept island regions clearly part of their parent sovereign countries.

## v76 — Territorial and identity disputes

- Expanded the disputes layer into territorial and identity/autonomy questions.
- Added examples such as Flanders/Wallonia, Republika Srpska, Catalonia, Basque Country, Québec, Greenland, Somaliland, Iraqi Kurdistan, West Papua, Bangsamoro and others.
- Updated UI text to explain that inclusion does not endorse any claim.

## v75 — Australia sweep transition

- Improved Australia subgame entry transition to behave more like the other subgames.

## v74 — Australia subgame

- Added Australia to the control panel under Canada.
- Added Australian states/territories with click interaction, labels, capital markers, info widget and quiz support.
