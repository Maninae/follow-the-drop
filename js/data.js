// Scene graph for Follow the Drop.
// Each scene is a node. `next` = forward choices ("where does the water go?"),
// `back` = backward choices ("where did the water come from?").
// Hotspot x/y are percentages of the scene image (left/top).

const SCENES = {

  rain: {
    title: "Rain Falls!",
    emoji: "🌧️",
    stamp: "Rainy Valley",
    image: "assets/scenes/rain.svg",
    body: "Drip! Drop! You are a tiny drop of water, falling from a big gray cloud. Down, down, down you go — past the hills, toward the green valley below.",
    hotspots: [
      { x: 22, y: 18, label: "The cloud",
        fact: "A cloud is made of millions and millions of tiny water drops, all floating together. When the drops get too big and heavy, they fall — that's rain!" },
      { x: 60, y: 45, label: "Falling drops",
        fact: "A raindrop falls about as fast as you ride a bike. It can take a drop ten whole minutes to fall from a tall cloud to the ground!" },
      { x: 82, y: 72, label: "The little town",
        fact: "Rain waters gardens, fills creeks, and washes the streets. The people down there need rain just as much as the plants do." }
    ],
    next: [
      { to: "meadow", label: "Splash into the meadow", question: "Where will you land?" }
    ],
    back: [
      { to: "cloud", label: "Up in the cloud", question: "Where did you come from?" }
    ]
  },

  cloud: {
    title: "Inside a Cloud",
    emoji: "☁️",
    stamp: "Cloud Castle",
    image: "assets/scenes/cloud.svg",
    body: "Whoosh! You float high in the sky inside a puffy white cloud. You are so tiny and light up here. Brrr — as the air gets colder, you squeeze together with other drops and grow bigger and bigger…",
    hotspots: [
      { x: 45, y: 30, label: "Puffy cloud",
        fact: "When water vapor in the sky gets cold, it turns back into tiny drops. That's called condensation. You can see it happen on a cold glass of juice!" },
      { x: 15, y: 55, label: "The wind",
        fact: "Wind pushes clouds across the sky like big slow ships. A cloud can travel over mountains and oceans before its rain falls." },
      { x: 78, y: 60, label: "Birds flying by",
        fact: "Some birds fly as high as the clouds! Geese have been seen flying higher than the tallest mountains on Earth." }
    ],
    next: [
      { to: "rain", label: "Fall as rain", question: "You're getting heavy! What happens next?" },
      { to: "snow", label: "Freeze into snow", question: "" }
    ],
    back: [
      { to: "evaporation", label: "Rising from the sea", question: "How did you get up here?" },
      { to: "trees", label: "Breathed out by trees", question: "" }
    ]
  },

  snow: {
    title: "Snow on the Mountains",
    emoji: "❄️",
    stamp: "Snowy Peaks",
    image: "assets/scenes/snow.svg",
    body: "It's so cold up here that you froze into a beautiful snowflake! You drift down softly and land on a mountain top. Now you rest in a thick white blanket of snow, waiting for spring.",
    hotspots: [
      { x: 50, y: 25, label: "Snowflakes",
        fact: "Every snowflake has six sides, but no two snowflakes are exactly the same. Each one is a tiny frozen piece of art!" },
      { x: 25, y: 65, label: "Pine trees",
        fact: "Pine trees stay green all winter. Their branches bend like springs so heavy snow slides right off." },
      { x: 75, y: 50, label: "The snowpack",
        fact: "Mountain snow is like a giant water savings bank. It melts slowly in spring and gives rivers water all summer long." }
    ],
    next: [
      { to: "glacier", label: "Get packed into a glacier", question: "Spring is coming. What happens to you?" },
      { to: "river", label: "Melt and rush downhill", question: "" }
    ],
    back: [
      { to: "cloud", label: "Up in the cloud", question: "Where did you come from?" }
    ]
  },

  glacier: {
    title: "Rivers of Ice",
    emoji: "🧊",
    stamp: "Glacier Gap",
    image: "assets/scenes/glacier.svg",
    body: "You've been squeezed into a glacier — a giant river of ice that moves sooo slowly. You might stay frozen here for a hundred years! Glaciers creep down the mountain just a tiny bit every day.",
    hotspots: [
      { x: 40, y: 35, label: "Blue ice",
        fact: "Glacier ice looks blue because it is squeezed so tight. It's some of the oldest water on Earth — older than your great-great-great grandparents!" },
      { x: 70, y: 70, label: "Icebergs",
        fact: "When a glacier reaches the sea, big chunks crack off and float away. Those are icebergs! Most of an iceberg hides under the water." },
      { x: 15, y: 50, label: "Cracks in the ice",
        fact: "Glaciers groan, pop, and crack as they move. Scientists listen to the sounds to learn how fast the ice is going." }
    ],
    next: [
      { to: "river", label: "Melt into a rushing river", question: "After many years, you melt! Where do you go?" },
      { to: "ocean", label: "Float to the sea as an iceberg", question: "" }
    ],
    back: [
      { to: "snow", label: "Snow on the peaks", question: "How did you get here?" }
    ]
  },

  meadow: {
    title: "Down on the Ground",
    emoji: "🌼",
    stamp: "Wildflower Meadow",
    image: "assets/scenes/meadow.svg",
    body: "Plip! You land in a meadow full of wildflowers. Now you have a big choice. You can sink down into the soft soil… or roll downhill and join the stream. Which way will you go?",
    hotspots: [
      { x: 30, y: 75, label: "Wildflowers",
        fact: "Flowers drink rain through their roots like you drink through a straw. After rain, a meadow gets extra colorful!" },
      { x: 65, y: 60, label: "The stream",
        fact: "Little streams join other streams to make big rivers — like small roads joining a highway. Water always flows downhill." },
      { x: 45, y: 88, label: "The soil",
        fact: "Soil is full of tiny holes, like a sponge. Rain slips through the holes and sinks deep underground." }
    ],
    next: [
      { to: "groundwater", label: "Sink into the soil", question: "Which way will you go?" },
      { to: "river", label: "Flow into the stream", question: "" }
    ],
    back: [
      { to: "rain", label: "Falling rain", question: "How did you get here?" }
    ]
  },

  groundwater: {
    title: "The Hidden Water Underground",
    emoji: "🪨",
    stamp: "Secret Aquifer",
    image: "assets/scenes/groundwater.svg",
    body: "Shhh… you're in a secret world under the ground! You trickle down between rocks and sand until you join a huge hidden pool called an aquifer. It's dark, cool, and very quiet down here.",
    hotspots: [
      { x: 35, y: 30, label: "Roots",
        fact: "Tree roots reach down into the wet soil to drink. A big oak tree can drink a whole bathtub of water every day!" },
      { x: 55, y: 70, label: "The aquifer",
        fact: "An aquifer is water hiding in the spaces between underground rocks and sand. There is more fresh water underground than in all the world's rivers and lakes!" },
      { x: 82, y: 35, label: "The well",
        fact: "People dig wells to reach the water underground. A pump pulls it up so families and farms can use it." }
    ],
    next: [
      { to: "trees", label: "Get drunk up by tree roots", question: "Where do you go from down here?" },
      { to: "river", label: "Bubble out of a spring", question: "" },
      { to: "treatment", label: "Get pumped up a well", question: "" }
    ],
    back: [
      { to: "meadow", label: "Soaking through the meadow", question: "How did you get here?" }
    ]
  },

  trees: {
    title: "Trees Drink Too",
    emoji: "🌲",
    stamp: "Whispering Forest",
    image: "assets/scenes/trees.svg",
    body: "Sluuurp! A tall tree drinks you up through its roots. You climb up, up, up inside the trunk, all the way to a leaf. Then — whoosh — the leaf breathes you out into the air as invisible water vapor!",
    hotspots: [
      { x: 50, y: 40, label: "The leaves",
        fact: "Leaves have teeny tiny doors that open to let water out. This is called transpiration — it means trees breathe out water!" },
      { x: 20, y: 35, label: "Morning mist",
        fact: "That misty fog over a forest in the morning? A lot of it is water that the trees breathed out. A whole forest can make its own clouds!" },
      { x: 75, y: 75, label: "Forest animals",
        fact: "Deer, squirrels, and birds all need the forest's water. Animals can smell rain coming before it arrives!" }
    ],
    next: [
      { to: "cloud", label: "Float up and join a cloud", question: "You're vapor now! Where to?" }
    ],
    back: [
      { to: "groundwater", label: "Underground, with the roots", question: "How did you get here?" }
    ]
  },

  river: {
    title: "Ride the River",
    emoji: "🏞️",
    stamp: "Rushing River",
    image: "assets/scenes/river.svg",
    body: "Wheee! You're riding a rushing river, tumbling over rocks and zooming around bends. Fish dart below you, and a heron watches from the bank. Rivers are nature's water highways!",
    hotspots: [
      { x: 40, y: 60, label: "Jumping salmon",
        fact: "Salmon are amazing swimmers. They swim up the river — against the current! — to lay their eggs in the same stream where they were born." },
      { x: 75, y: 45, label: "The heron",
        fact: "A heron stands very, very still in the water, then — snap! — catches a fish with its long beak. Rivers are full of food for birds." },
      { x: 15, y: 70, label: "Smooth stones",
        fact: "River rocks are smooth because water has been rolling and rubbing them for thousands of years. Water is soft, but it can shape stone!" }
    ],
    next: [
      { to: "lake", label: "Rest in a calm lake", question: "Where does the river take you?" },
      { to: "ocean", label: "Race all the way to the ocean", question: "" },
      { to: "treatment", label: "Get scooped up for the town", question: "" }
    ],
    back: [
      { to: "meadow", label: "A stream in the meadow", question: "Where did the river start?" },
      { to: "snow", label: "Melting mountain snow", question: "" },
      { to: "drain", label: "Cleaned water from the town", question: "" }
    ]
  },

  lake: {
    title: "Resting in the Lake",
    emoji: "🦆",
    stamp: "Mirror Lake",
    image: "assets/scenes/lake.svg",
    body: "Ahhh. The river slows down and spreads out into a calm, quiet lake. The water is so still it looks like a mirror. All around the edges, animals come to drink. You're helping everyone!",
    hotspots: [
      { x: 20, y: 55, label: "Deer drinking",
        fact: "Deer visit the lake in the early morning and evening to drink. A deer drinks water just like a dog does — lap, lap, lap with its tongue." },
      { x: 55, y: 60, label: "Duck family",
        fact: "Ducks have special oil on their feathers that makes water roll right off. That's why they never get soggy!" },
      { x: 80, y: 75, label: "The reeds",
        fact: "Reeds and cattails grow where the water is shallow. They are like an apartment building for frogs, dragonflies, and baby fish." }
    ],
    next: [
      { to: "evaporation", label: "Warm up in the sun and rise", question: "Where do you go from the lake?" },
      { to: "river", label: "Slip out where the river leaves", question: "" }
    ],
    back: [
      { to: "river", label: "The rushing river", question: "How did you get here?" }
    ]
  },

  ocean: {
    title: "The Big Blue Ocean",
    emoji: "🌊",
    stamp: "Pacific Point",
    image: "assets/scenes/ocean.svg",
    body: "You made it to the ocean — the biggest water on Earth! Waves crash against the cliffs and seabirds soar above you. Almost all of the world's water lives here in the salty sea.",
    hotspots: [
      { x: 30, y: 60, label: "The waves",
        fact: "The ocean holds 97 out of every 100 drops of water on Earth. But it's salty — too salty to drink!" },
      { x: 60, y: 35, label: "A whale spout",
        fact: "That puff of mist is a whale breathing out! Whales are the biggest animals that have ever lived, and the ocean is their whole world." },
      { x: 80, y: 55, label: "The cliffs",
        fact: "Waves have been carving these cliffs for millions of years, one splash at a time. The beach's sand is made of tiny pieces of broken-down rock and shell." }
    ],
    next: [
      { to: "evaporation", label: "Warm up in the sunshine", question: "The sun is shining on you. What happens?" }
    ],
    back: [
      { to: "river", label: "A river reaching the sea", question: "How did you get here?" },
      { to: "glacier", label: "An iceberg, melting", question: "" }
    ]
  },

  evaporation: {
    title: "Up, Up, Up!",
    emoji: "☀️",
    stamp: "Sunbeam Lift",
    image: "assets/scenes/evaporation.svg",
    body: "The warm sun shines down on you, and something magical happens — you turn into vapor! You're invisible now, lighter than air, floating up into the big blue sky like a balloon.",
    hotspots: [
      { x: 50, y: 20, label: "The sun",
        fact: "The sun is the engine of the whole water cycle. Its warmth lifts billions of drops into the sky every single day — for free!" },
      { x: 40, y: 65, label: "Sparkling water",
        fact: "When water turns into vapor, that's called evaporation. It happens to puddles, pools, and even your wet swimsuit on a sunny day." },
      { x: 75, y: 40, label: "Invisible vapor",
        fact: "Water vapor is real water, but the pieces are too tiny to see. Right now there is invisible water floating in the air all around you!" }
    ],
    next: [
      { to: "cloud", label: "Cool off and become a cloud", question: "You float higher and higher. Then what?" }
    ],
    back: [
      { to: "ocean", label: "The sunny ocean", question: "Where were you before?" },
      { to: "lake", label: "The calm lake", question: "" }
    ]
  },

  treatment: {
    title: "The Water-Cleaning Factory",
    emoji: "🏭",
    stamp: "Clean Water Works",
    image: "assets/scenes/treatment.svg",
    body: "You've been scooped up and sent to a water treatment plant! Here, friendly workers and big machines clean you until you sparkle. You get filtered, swirled, and checked — now you're safe to drink!",
    hotspots: [
      { x: 35, y: 55, label: "The round pools",
        fact: "In these big pools, dirt and tiny bits get stuck together and sink to the bottom. The clean water on top moves on to the next step." },
      { x: 65, y: 45, label: "The filters",
        fact: "The water passes through layers of sand and charcoal, like the world's fanciest strainer. Even teeny tiny specks get caught!" },
      { x: 85, y: 65, label: "The water tower",
        fact: "Clean water gets pumped up into tall towers. Being up high gives the water a push, so it can zoom through pipes to every house in town." }
    ],
    next: [
      { to: "tap", label: "Zoom through pipes to a kitchen", question: "You're clean and ready! Where to?" }
    ],
    back: [
      { to: "river", label: "Scooped from the river", question: "How did you get here?" },
      { to: "groundwater", label: "Pumped up from a well", question: "" }
    ]
  },

  tap: {
    title: "Water at Home",
    emoji: "🚰",
    stamp: "Kitchen Sink",
    image: "assets/scenes/tap.svg",
    body: "Squeak! Someone turns the faucet, and out you pour — right into a glass in a cozy kitchen. You help people drink, cook noodles, wash hands, and water the plants on the windowsill. Busy day!",
    hotspots: [
      { x: 45, y: 45, label: "The faucet",
        fact: "Water travels through pipes under the streets to reach your house, like a secret underground delivery service that never stops." },
      { x: 25, y: 60, label: "The glass of water",
        fact: "Your body is more than half water! Drinking water keeps you strong, helps you think, and even helps you grow." },
      { x: 70, y: 55, label: "The cooking pot",
        fact: "We use water for almost everything in the kitchen — boiling pasta, making soup, rinsing strawberries, and washing the dishes after." }
    ],
    next: [
      { to: "drain", label: "Swirl down the drain", question: "Glug! Where do you go after the sink?" }
    ],
    back: [
      { to: "treatment", label: "The water-cleaning factory", question: "How did you get here?" }
    ]
  },

  drain: {
    title: "Down the Drain",
    emoji: "🕳️",
    stamp: "Pipe Maze",
    image: "assets/scenes/drain.svg",
    body: "Glug glug glug! Down the drain you go, into a maze of pipes under the city. But this isn't goodbye — you ride the pipes to a wastewater plant, where you get scrubbed clean and sent back to the river. The journey never ends!",
    hotspots: [
      { x: 30, y: 35, label: "The pipes",
        fact: "Under every street is a hidden world of pipes. Some bring clean water to houses, and others carry used water away. They never get mixed up!" },
      { x: 60, y: 55, label: "The wastewater plant",
        fact: "At the wastewater plant, helpful machines — and even helpful germs! — eat up the yucky stuff. The water leaves much cleaner than it arrived." },
      { x: 85, y: 70, label: "Back to the river",
        fact: "After it's cleaned, the water flows back into the river to keep traveling. Water is never used up — it just keeps moving, around and around!" }
    ],
    next: [
      { to: "river", label: "Flow back to the river, clean!", question: "You're clean again! Where now?" }
    ],
    back: [
      { to: "tap", label: "The kitchen sink", question: "How did you get here?" }
    ]
  }

};

const START_SCENE = "rain";
const SCENE_ORDER = [
  "rain", "cloud", "snow", "glacier", "meadow", "groundwater", "trees",
  "river", "lake", "ocean", "evaporation", "treatment", "tap", "drain"
];
