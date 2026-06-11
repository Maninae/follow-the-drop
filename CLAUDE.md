# Follow the Drop — Architecture Guide

A choose-your-own-adventure water cycle site for first graders. You play
as a water drop moving through a directed graph of illustrated scenes.
Pure static site (no build step, no dependencies) — deployable on GitHub
Pages as-is.

## Aesthetic contract

National-park interpretive sign × children's picture book. Warm cream
paper panels with subtle grain, forest-ink text, clay-red accents.
Fonts: "Baloo 2" (display) + "Andika" (body — designed for early
readers). Scene art is FLUX-generated gouache/watercolor PNGs
(1536×768), full-bleed behind the UI; the `assets/scenes/*.svg` files
are an earlier handcrafted fallback set, kept but unreferenced. Do not
drift toward generic flat dashboards or dark techy themes.

## Module map

| File | Responsibility |
|------|----------------|
| `index.html` | Static shell: stage, header, story panel, fact card, passport modal, intro |
| `css/base.css` | Design tokens (colors, fonts, grain texture), shared button styles |
| `css/scene.css` | Stage + scene image, hotspots, fact-card popover, blur-crossfade transition classes |
| `css/panels.css` | Header, story panel + choices, passport modal, intro overlay, mobile breakpoints |
| `js/data.js` | THE CONTENT. `SCENES` graph, `START_SCENE`, `SCENE_ORDER` |
| `js/main.js` | Coordinator: owns state (current scene, visited set), wires all events |
| `js/render.js` | Stateless DOM rendering: scene, hotspots, choices, fact card placement |
| `js/transitions.js` | Blur-crossfade between scenes, image preloading |
| `js/passport.js` | Visited-scene persistence (localStorage) + stamp book rendering |
| `js/narrate.js` | Read-aloud via Web Speech API |
| `assets/scenes/*.svg` | One illustration per scene, 1536×768 viewBox |
| `build/regenerate-images.py` | Optional: repaint scenes as AI-generated gouache PNGs (see header) |

State lives only in `main.js`; every other JS file is stateless helpers.
Scripts load via plain `<script>` tags in dependency order (data →
helpers → main). No modules, no bundler — keep it that way.

## The scene graph (js/data.js)

Each scene node has:
- `title`, `emoji`, `stamp` (passport stamp name), `body` (2–3 short
  read-aloud sentences, first-grade level)
- `image` — path to its illustration
- `hotspots` — 2–3 of `{x, y, label, fact}`. x/y are PERCENTAGES of the
  image; the named thing must visually exist at that spot in the art.
- `next` — forward choices `{to, label, question, x, y}` ("where does
  the water go?"), rendered as blue trail signs planted IN the scene at
  (x%, y%) — the sign must sit on the thing it names (the soil sign on
  the soil, the stream sign on the stream)
- `back` — backward choices (same shape), rendered as quiet cream signs

The first non-empty `question` among `next` choices shows in the story
panel as a clay-colored prompt. Sign/hotspot positions must avoid the
story panel's bottom-left corner (roughly x &lt; 35%, y &gt; 55% on
desktop); on phones, CSS clamps all in-scene elements to y ≤ 52%.

The graph is a cycle: nature loop (cloud → rain/snow → land → river →
lake/ocean → evaporation → cloud) plus a human loop (river/groundwater →
treatment → tap → drain → river). Every scene must remain reachable and
must have at least one `next` so the journey never dead-ends.

## Adding a scene

1. Add the node to `SCENES` in `js/data.js` and its id to `SCENE_ORDER`
   (order controls the passport grid).
2. Wire `next`/`back` links in both directions from neighboring scenes.
3. Generate `assets/scenes/<id>.png` (1536×768) with FLUX.1-schnell
   using the house style prompt (see `build/regenerate-images.py` for
   the prompt template). Describe element positions in the prompt, then
   VERIFY: screenshot the rendered scene and adjust hotspot/sign
   coordinates to where the model actually painted things.
4. Add the prompt to `build/regenerate-images.py` so repaints include it.

## Writing voice

Short sentences. Sound effects ("Drip! Drop!", "Wheee!"). Second person
— the reader IS the drop. Facts are real and concrete, never dumbed
into vagueness. One idea per sentence. Read everything aloud in your
head; a 6-year-old is listening.
