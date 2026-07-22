# Changelog

## v115 — The joint reign retires from name questions

- William III & Mary II no longer appears in any name-answer question — neither as the subject of mystery-reign or portrait questions (where the only two-name option answers itself) nor as a distractor in them (where it self-eliminates beside a one-person portrait or a he/she synopsis). The joint reign still features in the browser, the throne-order question (a dates question, where the format leaks nothing) and the royal-house question.

## v114 — Zoom cluster, compact

- The fast-zoom buttons move beside the standard pair instead of above and below: a 2×2 grid — [+][++] over [−][−−] — restoring the control's original two-row height, so the quiz panel and info cards below clear it again without moving anything. The globe (fit-all) button now sits to the right of the cluster, vertically centred.

## v113 — Fast zoom

- Two fast-zoom buttons join the standard Leaflet pill, top to bottom: ++ / + / − / −−. Each fast press jumps 20% of the current mode's zoom range — five presses cover minimum to maximum — computed live from the mode's limits and snapped and clamped by Leaflet's own zoomSnap and bounds. The globe (fit-all) button self-aligns to the taller pill.

## v112 — Mainland framing

- Quiz reveal zooms now anchor on the country’s home landmass instead of fitting every overseas dependency into frame — answering a Netherlands question no longer zooms out across the Atlantic to include Bonaire. The camera uses the same largest-part-plus-neighbours framing the country browser and flag tiles already use (parts within 250 km of the mainland merge, so island chains like Japan’s Ryukyus still frame naturally); far-flung territories stay highlighted, they just don’t drag the view.
- This also fixes the main world quiz, which had always framed the Netherlands, France and the United States at full span on reveals, and the “show me the area” pan clue, which for the Netherlands used to centre its general area over the open ocean.

## v111 — Reveals that get out of the way

- Portrait questions in the Royals and British Monarchy quizzes clear the portrait the moment they are answered — the info card carries it from there, and the map reveal gets the space back.
- Flag reveals glide the flag smoothly to the far right edge of the screen as the country reveals itself: “Which country does this flag belong to?” animates from centre to edge (pure-CSS transform, honouring prefers-reduced-motion; a no-op on phones where the flag already sits at the right), while colour and pick-the-flag reveals appear already docked. The control panel auto-collapses when this happens, via the same shared restore flag the royals modes use — ending the quiz brings it back.
- Fixed: British Monarchy “mystery reign” and portrait questions could hand the answer over — the synopsis or the portrait reveals the monarch’s gender, and only one of the four options was a woman. Name options are now gender-matched: the five queens regnant (Mary I, Elizabeth I, Anne, Victoria, Elizabeth II) draw their distractors from each other, and William III & Mary II reign jointly under William’s portrait in the kings’ pool. The world Royals quiz was already safe — its answers are countries, not names.

## v110 — The panel learns its place

- The control panel is now viewport-aware: it caps its height to the screen and scrolls internally (thin scrollbar) instead of growing past the bottom edge on smaller resolutions. Mouse-wheel scrolling inside the panel does not zoom the map.
- It also yields to the learn-about widget: a live clearance tracks the widget's real rendered height (ResizeObserver, plus resize and toggle hooks), so expanding the widget — or a long country summary loading into it — reclaims space from the panel instantly, and collapsing gives it back. The widget keeps its existing 68vh/520px cap, making the right-edge partition one-directional and stable: widget first, panel takes the rest.
- On extremely short viewports the panel keeps a 110px minimum so its header and collapse control stay reachable; in that corner case the widget may cover part of the panel, which then scrolls.

## v109 — Ten times lighter

- The world map loads from a self-hosted bundle: both admin-0 layers share one simplified, quantized TopoJSON (data/world_admin0.topo.json) and capitals ship as a 216-row file (data/world_capitals.json). About 0.82 MB gzipped in total instead of ~9.8 MB, ~3.5 MB parsed instead of ~31 MB, and ~175,000 rendered points instead of 1.1 million — faster boot and smoother pan/zoom, since the SVG renderer re-projects six times fewer points on every zoom step.
- Decoded by a small inline TopoJSON reader with no new runtime dependency, verified byte-for-byte identical to topojson-client's output across all 556 features.
- Repeat visits read the data from the browser Cache API (https contexts) — effectively instant. Remote fallbacks and the Ireland county sources are cached the same way. Bump WORLD_DATA_VERSION when regenerating data to invalidate old caches.
- A loose index.html with no data/ folder falls back automatically to the original remote Natural Earth GeoJSON — behaviour identical to v108.
- The tiny-countries fetch is skipped: that file has returned 404 at both mirrors, so the helper layer never actually loaded; the two dead requests per boot are gone. The consumer code remains for a future revival.
- New: tools/build_world_data.js regenerates the bundle from the Natural Earth sources, pinning the game's data by self-hosting instead of tracking a mutable upstream branch.

## v108 — Honest clues

- Fixed: the “It’s beside / nearest to” clue could name absurd countries — a Colombian flag question hinted “beside the Netherlands” 41% of the time, because Bonaire’s bounding box sits inside Colombia’s and box overlap counted as zero distance. The shortlist is now re-measured by true point-to-point coastline distance, and only genuine near-ties (within 30 km of the closest) can be named.
- Fixed: the clue could spoil the answer by naming the country’s own units — “Find Belgium” could hint “beside Brussels”, and the New Zealand flag question hinted “beside Tokelau” every single time. A candidate’s own units are excluded, and sub-national map units are never offered as clue answers at all.
- Clue geography anchors on the principal landmass: Natural Earth bakes Tokelau into New Zealand’s admin-0 geometry and the Caribbean municipalities into the Netherlands’, which otherwise relocated clues to the wrong ocean (“nearest to Saint Kitts and Nevis” for the Netherlands — true of Sint Eustatius, useless for finding the Netherlands).
- Applies to the main world quiz and the Flags quiz alike; verified by a distribution harness running the real clue engine over the real datasets (Ireland’s clue is now, reliably, “Northern Ireland”).

## v107 — Ulster Banner

- Northern Ireland now flies the Ulster Banner in flag play, replacing the Union Flag placeholder, and joins the quizzes on the same footing as the other home nations: tier-1 pool, find and identify questions, and colour questions (white, red, yellow). The quiz-integrity concern that kept NI out was specific to the Union Jack — a distinct flag removes it.

## v106 — Sovereignty-aware flags

- Fixed: find-the-flag questions rejected clicks on a country's sub-national map units — Belgium's Flemish Region, Walloon Region and Brussels being the reported case, with some twenty more sovereigns affected (Bosnia's entities, Zanzibar, Réunion, Svalbard, the Azores...). Flag play now groups every map unit under the sovereign whose flag it flies: a click anywhere in the country counts, and the whole country highlights on the reveal. The map itself is untouched — units keep their own borders, labels and popups.
- Fixed: England, Scotland and Wales showed the Union Jack in flag play. Natural Earth stamps ISO_A2_EH = GB on all the home nations, which outranked the name-based overrides; the override map now wins, so each nation flies its own flag.
- New: Northern Ireland joins the flag browser under the Union Flag — it has had no distinct official flag since 1973 — and sits out the quizzes.
- Grouping is by resolved flag rather than Natural Earth's sovereignty codes, which keeps Palestine (with Gaza and the West Bank as clickable units) its own entry rather than folding into Israel, where the dataset files it.
- World-quiz flag questions now come only from sovereign entries, with sovereign names as answer options — no more Belgian flag questions answered “Walloon Region”.
- Main world-quiz find questions also accept any unit of the answer's sovereign (clicking the Azores counts for Portugal).

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
