# 💧 Follow the Drop

**Be a drop of water.** A choose-your-own-adventure journey through the
water cycle, made for young explorers (ages 5–8).

**Play it:** https://maninae.github.io/follow-the-drop/

You start as a raindrop falling from a cloud. From there, every page asks
the question kids actually ask: *where does the water go next?* Sink into
the soil or ride the stream? Melt into a river or drift to the sea as an
iceberg? Follow your drop down the kitchen drain and find out how it gets
clean and comes back.

## What's inside

- **14 illustrated scenes** in a national-park-sign storybook style —
  clouds, glaciers, meadows, aquifers, rivers, the ocean, and the human
  side too: the treatment plant, the kitchen tap, the pipes under the street
- **A directed graph, not a list** — go forward ("where does it go?") or
  backward ("where did it come from?"); the cycle never ends, just like
  the real one
- **Tap-to-discover hotspots** — glowing circles hide real facts about
  herons, aquifers, snowflakes, and water towers
- **A Water Passport** — collect a stamp for every place your drop visits
- **Read-aloud button** on every page for pre-readers
- Watery blur transitions between scenes

## The map

Fourteen scenes in one connected cycle — the nature loop, plus the human
water loop that borrows from the river and gives it back
(forward edges shown; most are also walkable backward in-game):

```mermaid
flowchart TD
    cloud["☁️ Inside a Cloud"]
    rain["🌧️ Rain Falls!"]
    snow["❄️ Snow on the Mountains"]
    glacier["🧊 Rivers of Ice"]
    meadow["🌼 Down on the Ground"]
    groundwater["🪨 Hidden Water Underground"]
    trees["🌲 Trees Drink Too"]
    river["🏞️ Ride the River"]
    lake["🦆 Resting in the Lake"]
    ocean["🌊 The Big Blue Ocean"]
    evaporation["☀️ Up, Up, Up!"]
    treatment["🏭 Water-Cleaning Factory"]
    tap["🚰 Water at Home"]
    drain["🕳️ Down the Drain"]

    cloud -->|fall as rain| rain
    cloud -->|freeze| snow
    rain -->|splash| meadow
    snow -->|pack into ice| glacier
    snow -->|melt| river
    glacier -->|melt| river
    glacier -->|calve iceberg| ocean
    meadow -->|soak in| groundwater
    meadow -->|flow| river
    groundwater -->|roots drink| trees
    groundwater -->|spring| river
    groundwater -->|well pump| treatment
    trees -->|transpiration| cloud
    river --> lake
    river --> ocean
    river -->|town intake| treatment
    lake -->|sun| evaporation
    lake -->|outlet| river
    ocean -->|sun| evaporation
    evaporation -->|condense| cloud
    treatment --> tap
    tap -->|down the sink| drain
    drain -->|cleaned, returned| river

    classDef nature fill:#e8f2e4,stroke:#3e6b4e,color:#2c4f39
    classDef human fill:#fdeede,stroke:#c14f2c,color:#7a2f15
    classDef sky fill:#e3f1f7,stroke:#1f7a99,color:#155e78

    class rain,snow,glacier,meadow,groundwater,trees,river,lake,ocean nature
    class treatment,tap,drain human
    class cloud,evaporation sky
```

(Rendered copy: `docs/scene-graph.png`.)

## Running locally

It's a plain static site — no build, no dependencies:

```
python3 -m http.server -d . 8000
```

then open http://localhost:8000.

## Project notes

The scene graph and all copy live in `js/data.js`. Architecture details
are in `CLAUDE.md`. The SVG scene art can optionally be repainted as
AI-generated gouache illustrations with `build/regenerate-images.py`.
