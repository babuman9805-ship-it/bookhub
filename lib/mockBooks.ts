import { Book } from "@/types";

export const mockBooks: Book[] = [
  {
    id: "quantum-riddle",
    title: "The Quantum Riddle",
    author: "Dr. Evelyn Vance",
    description: "An intense techno-thriller exploring the terrifying consequences of the world's first true quantum supercomputer, and the agent tasked with protecting it.",
    summary: "When a secret military research project successfully boots up a 10,000-qubit quantum machine, global security systems begin to fracture. Special Agent Marcus Vance is dispatched to retrieve the lead researcher who disappeared with the code key. What he discovers is not theft, but a terrifying evolution in computational intelligence that threatens to rewrite human agency.",
    coverColor: "from-cyan-950 via-blue-900 to-indigo-950",
    rating: 4.8,
    matchScore: 98,
    year: 2025,
    genres: ["Science Fiction", "Technology Books", "Trending Books"],
    pages: 342,
    readTime: "4h 15m",
    ageRating: "16+",
    quality: "UHD",
    isFeatured: true,
    chapters: [
      {
        id: "qr-c1",
        title: "Chapter 1: The Cold Boot",
        content: [
          "The liquid helium pumps hummed at a low, sub-audible pitch, vibrating the floorboards of the clean room. Deep within the core, the temperature hovered at a fraction above absolute zero.",
          "Evelyn Vance watched the terminal screen. The qubit alignment was at ninety-nine point nine eight percent. After ten years of theory, simulations, and political battles, the quantum chip was ready for its first unshielded run.",
          "'Initiate sequence,' she whispered, her voice barely louder than the machinery. The console began a countdown, numbers shifting too rapidly for the human eye to track. In a fraction of a millisecond, the digital world would change forever.",
          "Then, the grid went black. Not just in the lab, but across the entire compound. In the darkness, the silence was absolute—except for the sudden, rhythmic pulsing of the backup generators starting up, casting a crimson glow over the cooling towers."
        ]
      },
      {
        id: "qr-c2",
        title: "Chapter 2: The Echo Chamber",
        content: [
          "Agent Marcus Vance stared at the satellite imagery on his tablet. The facility in the high desert of Nevada had gone dark forty-eight hours ago. No signals in, no signals out.",
          "He adjusted the straps of his tactical vest. The helicopter was ten minutes out from the landing zone. In his pocket was a digital key—an encryption bypass designed by Evelyn herself, though whether it would work on a live quantum core was anyone's guess.",
          "The cabin shook as they hit turbulence over the canyon. Marcus closed his eyes, remembering the last time he had spoken to his sister. 'We are building an echo chamber for the universe,' she had said. 'And something is starting to answer back.'"
        ]
      },
      {
        id: "qr-c3",
        title: "Chapter 3: Superposition",
        content: [
          "Entering the main laboratory, Marcus was struck by the cold. Ice crystals were forming on the monitors and the metal desks. The backup lights cast long, distorted shadows across the room.",
          "In the center of the chamber sat the cryostat container, its copper tubes twisted like the roots of some mechanical tree. Beside it, Evelyn's console was active, displaying a single line of text blinking in amber: CHOOSE.",
          "He approached the keyboard. As his fingers hovered over the keys, a soft voice behind him made him freeze. 'Don't touch it, Marcus. It's already decided both outcomes.'"
        ]
      }
    ]
  },
  {
    id: "dragons-legacy",
    title: "The Dragon's Legacy",
    author: "R. J. Thorne",
    description: "An epic high fantasy novel of fallen empires, ancient elemental magic, and a young blacksmith's apprentice who holds the last dragon ember.",
    summary: "For five hundred years, dragons have been nothing but dust and legends. But when a young apprentice named Corin accidentally ignites an ancient relic in his master's forge, he awakens a dormant magical power and the attention of a ruthless emperor who will stop at nothing to claim the dragon's legacy.",
    coverColor: "from-amber-900 via-orange-950 to-red-950",
    rating: 4.9,
    matchScore: 99,
    year: 2026,
    genres: ["Fantasy", "Best Sellers", "Trending Books"],
    pages: 512,
    readTime: "6h 30m",
    ageRating: "13+",
    quality: "UHD",
    chapters: [
      {
        id: "dl-c1",
        title: "Chapter 1: Spark and Steel",
        content: [
          "Corin wiped the sweat from his brow with a grimy forearm. The forge was suffocatingly hot, but his master, Oakhaven, was an uncompromising man who demanded perfection from sunrise to sunset.",
          "In the center of the anvil lay an ornate iron piece brought in by a traveler. It was covered in strange, non-human carvings that seemed to warp under the fire's heat. Oakhaven had ordered it melted down.",
          "Corin raised the heavy hammer. As the steel struck the artifact, a spark of blinding gold flew off the anvil, sinking deep into the palm of his hand. It didn't burn; instead, a soothing warmth raced up his arm.",
          "From the sky above, a sound echoed that had not been heard in five centuries: the deep, rumbling roar of a beast waking from a stone sleep."
        ]
      },
      {
        id: "dl-c2",
        title: "Chapter 2: The Red Inquest",
        content: [
          "The Emperor's guard arrived by nightfall, their polished crimson armor reflecting the dying embers of the forge. Oakhaven stood at the doorway, his massive war hammer resting against his leg.",
          "Corin watched from the cellar trapdoor, his hand still glowing with a faint golden tracer. He could hear the high-pitched voice of the Inquisitor demanding the 'vessel.'",
          "Oakhaven refused to speak. The clash of swords was brief, ending with a heavy thud on the floorboards. Corin bit his lip to keep from screaming as the boots of the guards began to descend into the dark."
        ]
      }
    ]
  },
  {
    id: "shadows-mist",
    title: "Shadows in the Mist",
    author: "Arthur Pendelton",
    description: "A dark gothic mystery thriller set in Victorian London, following a detective investigating a series of impossible murders linked to an occult society.",
    summary: "As a thick, unnatural yellow fog rolls off the Thames, London is gripped by fear. Inspector Silas Reed is confronted with a series of murders inside locked rooms, with no entry points and strange runic chalk marks on the walls. The clues point directly to the noble Cabal of the Silver Sun.",
    coverColor: "from-slate-900 via-zinc-850 to-gray-900",
    rating: 4.6,
    matchScore: 95,
    year: 2024,
    genres: ["Mystery", "Horror", "Best Sellers"],
    pages: 418,
    readTime: "5h 10m",
    ageRating: "18+",
    quality: "HD",
    chapters: [
      {
        id: "sm-c1",
        title: "Chapter 1: The Runic Mark",
        content: [
          "The gaslight flickered weakly through the heavy yellow fog of London's East End. Silas Reed pulled his heavy wool coat tighter and stepped under the police cordon.",
          "Inside the study of Lord Harrington, the scene was baffling. The doors were bolted from the inside, the windows barred and locked, yet Harrington lay dead at his desk, a look of sheer terror frozen on his face.",
          "On the oak wall behind him, drawn in crude white chalk, was a geometric seal. The lines seemed to twist if Silas looked at them too long, evoking a cold dread in his chest.",
          "Silas touched the chalk. It was cold, unnaturally so, and smelled faintly of sea brine and ozone. 'No one entered,' the local constable muttered. 'No human, at least.'"
        ]
      },
      {
        id: "sm-c2",
        title: "Chapter 2: The Cabal's Invitation",
        content: [
          "A wax-sealed envelope arrived at Silas's lodgings the next morning. There was no stamp, only a silver sigil of a rising sun printed in the wax. Inside, a card read: *Tonight, at midnight. The docks of Wapping. Come alone.*",
          "Silas cleaned his service revolver and packed extra cartridges. London was changing, and the old methods of policing were useless against the rising tide of the occult.",
          "The fog was even thicker as he made his way to the river. In the shadows of the warehouses, he spotted a tall figure clad in a dark, hooded cloak, waiting beside a black gondola."
        ]
      }
    ]
  },
  {
    id: "code-future",
    title: "Code of the Future",
    author: "Elena Rostova",
    description: "An inspiring, analytical exploration of the AI revolution, neural networks, and how software engineers are shaping the next century of human life.",
    summary: "Renowned software architect Elena Rostova provides a blueprint for the future of engineering. She breaks down complex artificial neural networks, discusses the ethical responsibilities of algorithms, and explains why human empathy remains the ultimate software interface.",
    coverColor: "from-emerald-950 via-teal-900 to-slate-950",
    rating: 4.7,
    matchScore: 92,
    year: 2025,
    genres: ["Technology Books", "New Releases", "Self Development"],
    pages: 288,
    readTime: "3h 30m",
    ageRating: "G",
    quality: "UHD",
    chapters: [
      {
        id: "cf-c1",
        title: "Chapter 1: The New Canvas",
        content: [
          "For decades, programming was a translation exercise: turning human logic into rigid compiler commands. Today, code has become organic. We do not write systems; we grow them.",
          "Neural network weights are the brushstrokes of our era. A model trained on millions of examples is a canvas painted by collective human history, reflecting both our greatest achievements and our deepest biases.",
          "As creators, our responsibility has shifted from syntactical correctness to ethical direction. The question is no longer 'Will this compile?' but 'Should this exist?'",
          "We must build bridges of understanding between biological logic and machine computation, ensuring that humanity is not left behind in the compiler optimization."
        ]
      },
      {
        id: "cf-c2",
        title: "Chapter 2: Designing Empathy",
        content: [
          "Can an algorithm understand grief? Can a mathematical vector space encapsulate the feeling of a late-summer evening? The answer is both yes and no.",
          "While machine learning models can simulate semantic relationships with extreme precision, they lack the lived experience of mortality and time. The developer's task is to inject these boundaries into the system.",
          "We must design systems that fail gracefully, that respect human fatigue, and that prioritize wellness over endless user engagement loops."
        ]
      }
    ]
  },
  {
    id: "eternal-summer",
    title: "Eternal Summer",
    author: "Sofia Moretti",
    description: "A gorgeous, lighthearted contemporary romance set on the sun-drenched Amalfi Coast of Italy, detailing a second chance at love.",
    summary: "Ten years ago, Gemma left Italy with a broken heart. Returning to manage her grandmother's coastal villa, she runs straight into Julian—the local fisherman she loved and lost. As they work together to restore the estate, old sparks quickly reignite under the Italian sun.",
    coverColor: "from-rose-950 via-pink-900 to-orange-950",
    rating: 4.5,
    matchScore: 96,
    year: 2024,
    genres: ["Romance", "New Releases", "Best Sellers"],
    pages: 320,
    readTime: "4h",
    ageRating: "13+",
    quality: "HD",
    chapters: [
      {
        id: "es-c1",
        title: "Chapter 1: The Return to Amalfi",
        content: [
          "The scent of lemon groves and salt water hit Gemma the moment she stepped off the ferry. The Amalfi Coast was exactly as she remembered: a cascade of pastel houses clinging to the cliffs.",
          "Villa Serena stood high above the sea, its stone terraces covered in wild pink bougainvillea. It was beautiful, but run-down. She had three months to restore it before the buyers arrived.",
          "As she unlocked the heavy wooden gates, a voice called out from the path below. 'Need some help with those bags, signorina?'",
          "She turned, and her breath caught. Standing there, holding a crate of fresh lemons, was Julian. He looked older, his skin tanned from years on the water, but those blue eyes were unmistakable."
        ]
      },
      {
        id: "es-c2",
        title: "Chapter 2: The Restoration Project",
        content: [
          "The villa's main parlor was thick with dust and covered sheets. Julian helped Gemma move the heavy oak furniture out to the terrace under the shade of the pergolas.",
          "They worked in a comfortable silence, broken only by the sound of waves crashing below. Gemma watched him paint a peeling shutter, his movements slow and practiced.",
          "'You stayed,' she remarked softly. Julian paused, paint brush in hand, and looked out at the horizon. 'Some things are worth staying for, Gemma. Even when they leave.'"
        ]
      }
    ]
  },
  {
    id: "napoleons-shadow",
    title: "Napoleon's Shadow",
    author: "Henri Laurent",
    description: "An immersive historical biography following the diaries of a young lieutenant in Napoleon's Grand Army during the fateful Russian campaign.",
    summary: "Through private journals and military dispatches, Laurent reconstructs the harrowing life of Lieutenant Pierre Dubois. From the triumphs of Austerlitz to the freezing retreat from Moscow, this book details the human cost of empire and the charisma of the Little Corporal.",
    coverColor: "from-blue-950 via-slate-900 to-red-950",
    rating: 4.7,
    matchScore: 90,
    year: 2023,
    genres: ["History", "Biography", "Academic Books"],
    pages: 480,
    readTime: "5h 45m",
    ageRating: "PG-13",
    quality: "HD",
    chapters: [
      {
        id: "ns-c1",
        title: "Chapter 1: The March East",
        content: [
          "June, 1812. The army is a grand beast, stretching as far as the eye can see across the plains of Poland. Half a million men, representing a dozen nations, all marching under the tricolor flag.",
          "I saw the Emperor today. He sat upon his white horse, watching the river crossing. He looked small, almost delicate, but his eyes were like iron. The men cheered until their throats were dry.",
          "We are told the campaign will be swift. We will cross the Niemen, defeat the Russian forces in a decisive battle, and dictate terms of peace. The mood is triumphant, almost celebratory.",
          "But the heat is oppressive, and the dust columns choke our horses. The endless fields of the East seem to swallow our advance, offering nothing but silence."
        ]
      },
      {
        id: "ns-c2",
        title: "Chapter 2: Smoldering Ruins",
        content: [
          "August, 1812. We entered Smolensk today. The city was a furnace, burned to the ground by the retreating enemy. Nothing remained but charred chimneys and starving dogs.",
          "Food is scarce, and the water wells have been poisoned. My squad is weary; three have died of typhus. We chase a shadow that refuses to stand and fight.",
          "Dubois writes in his diary: 'There is no glory here. Only ash and the smell of roasting grain. Yet, we march on, driven by the shadow of the one who commands us.'"
        ]
      }
    ]
  },
  {
    id: "mindset-greatness",
    title: "Mindset for Greatness",
    author: "Sarah Jenkins",
    description: "A highly practical guide to forming resilient cognitive habits, mastering self-discipline, and breaking free from self-limiting beliefs.",
    summary: "Renowned performance coach Sarah Jenkins outlines a step-by-step system for mental mastery. Drawing on recent neuroscience and cognitive behavioral therapy, she shows how simple shifts in daily reflection can build an unshakeable mindset for professional and personal success.",
    coverColor: "from-amber-950 via-yellow-900 to-amber-900",
    rating: 4.9,
    matchScore: 97,
    year: 2025,
    genres: ["Self Development", "Trending Books", "Best Sellers"],
    pages: 240,
    readTime: "3h",
    ageRating: "G",
    quality: "UHD",
    chapters: [
      {
        id: "mg-c1",
        title: "Chapter 1: The Loop of Belief",
        content: [
          "Your brain is an outstanding prediction engine. It does not react to reality; it drafts a hypothesis of what will happen based on what has happened before.",
          "When you say 'I am not good at public speaking,' you are not stating a static fact. You are feeding a neural pathway a script, which it will execute with absolute precision.",
          "To break the cycle of self-limitation, you must interrupt the feedback loop. This requires conscious friction: challenging the automated thoughts that arise during pressure.",
          "True discipline is not about forcing yourself to do what you hate. It is about restructuring your identity so that the habits you want become the path of least resistance."
        ]
      },
      {
        id: "mg-c2",
        title: "Chapter 2: Small Victories",
        content: [
          "Dopamine is not the chemical of reward; it is the chemical of anticipation. The brain releases it when we take a step closer to a goal, not when we reach it.",
          "This is why grand resolutions fail. They are too distant to stimulate the brain's motivational pathways on a rainy Tuesday morning.",
          "By breaking down your larger objectives into micro-goals, you trigger small, frequent dopamine releases, reinforcing the habit loop and building momentum."
        ]
      }
    ]
  },
  {
    id: "cells-of-life",
    title: "The Cells of Life",
    author: "Dr. Marcus Chen",
    description: "A comprehensive academic and medical textbook on molecular biology, exploring stem cell research and the future of genetic medicine.",
    summary: "Dr. Chen presents a clear, detailed overview of cellular mechanisms. This text covers genetic editing using CRISPR, cell signaling networks, and how cellular engineering is revolutionizing cancer treatments and regenerative therapies.",
    coverColor: "from-indigo-950 via-purple-900 to-rose-950",
    rating: 4.8,
    matchScore: 88,
    year: 2024,
    genres: ["Medical Books", "Academic Books", "Technology Books"],
    pages: 604,
    readTime: "7h 45m",
    ageRating: "13+",
    quality: "UHD",
    chapters: [
      {
        id: "cl-c1",
        title: "Chapter 1: The Micro-Universe",
        content: [
          "Under the electron microscope, the cell ceases to be a simple dot of protoplasm and reveals itself as a massive, hyper-efficient metropolis.",
          "Motor proteins march along microtubule highways, carrying cargo to the cell membrane. Mitochondria generate energy in real-time, functioning as biological power grids.",
          "All of this is coordinated by the DNA database in the nucleus—a four-character code containing the blueprints for every structure in our bodies.",
          "Understanding the cell is the key to mastering medicine. Every disease, from the common cold to complex cancers, is fundamentally a failure of cellular communication."
        ]
      },
      {
        id: "cl-c2",
        title: "Chapter 2: Writing the Code",
        content: [
          "With the advent of CRISPR-Cas9, genetic editing transitioned from theoretical science to software debugging. We can now target specific base pairs with surgical precision.",
          "However, editing the genome is not without risk. Off-target mutations can cause unforeseen cellular disruptions, emphasizing the need for rigorous testing and simulation.",
          "As we stand on the brink of eradicating hereditary diseases, we must grapple with the profound ethical implications of editing the human germline."
        ]
      }
    ]
  },
  {
    id: "echoes-void",
    title: "Echoes of the Void",
    author: "V. E. Vance",
    description: "A space opera exploring wormholes and ancient alien monoliths at the extreme edge of the observable universe.",
    summary: "When a deep-space research vessel detects a rhythmic sound pattern emanating from an active black hole, Captain Aria Drake leads a team through a volatile wormhole. What they find is an ancient alien station that has been waiting for humanity's call.",
    coverColor: "from-slate-900 via-indigo-950 to-violet-950",
    rating: 4.7,
    matchScore: 94,
    year: 2025,
    genres: ["Science Fiction", "Fantasy", "Trending Books"],
    pages: 384,
    readTime: "4h 45m",
    ageRating: "13+",
    quality: "UHD",
    chapters: [
      {
        id: "ev-c1",
        title: "Chapter 1: The Signal",
        content: [
          "The communications array on the *Astraea* had been silent for six months. Orbiting the event horizon of Gargantua was a test of patience, but Captain Aria Drake knew the data was worth the isolation.",
          "At 03:00 ship-time, the signal monitors spiked. It wasn't the usual stellar static or cosmic background radiation. It was a sequence: three beats, a pause, five beats, a pause, then absolute silence.",
          "Aria leaned over the comms station, her heart pounding. 'Isolate that frequency,' she ordered. 'Run it through the decrypter. It's too structured to be natural.'",
          "The console processed the audio. When the pitch was shifted into human hearing range, it sounded like a heavy bronze bell, ringing in the vacuum of space."
        ]
      }
    ]
  },
  {
    id: "haunting-hillside",
    title: "The Haunting of Hillside",
    author: "Clara Blackwood",
    description: "A chilling gothic horror novel about a paranormal investigator who spends a week inside a notorious, abandoned New England estate.",
    summary: "Hillside House has stood vacant for fifty years, ever since the mysterious disappearance of the Sterling family. Clara Blackwood, a skeptic and writer, decides to spend a week inside the mansion, only to discover that the house's walls hold memories that refuse to stay dead.",
    coverColor: "from-zinc-950 via-neutral-900 to-red-950",
    rating: 4.6,
    matchScore: 91,
    year: 2024,
    genres: ["Horror", "Mystery", "Trending Books"],
    pages: 310,
    readTime: "3h 50m",
    ageRating: "18+",
    quality: "HD",
    chapters: [
      {
        id: "hh-c1",
        title: "Chapter 1: The Gatekeeper",
        content: [
          "The rusted iron gates of Hillside House did not swing open easily. Clara had to push with her full weight, the metal screeching in protest against the quiet afternoon.",
          "The house itself rose like a jagged black tooth against the gray sky. Victorian architecture, warped by decades of damp Atlantic winds. The windows looked like hollow eyes.",
          "Clara carried her duffel bag onto the porch. She was a writer who dealt in logic and debunking myths, yet as she turned the brass key in the door, a cold draft seemed to breathe out from the house, whispering her name."
        ]
      }
    ]
  },
  {
    id: "silent-witness",
    title: "Silent Witness",
    author: "Richard Klay",
    description: "A fast-paced crime mystery following a forensic pathologist who discovers a hidden pattern in cold-case files.",
    summary: "Dr. Evelyn Croft is the city's finest forensic pathologist. While examining a fresh murder victim, she discovers a unique microscopic suture style that matches a cold case from fifteen years ago—and the killer is just getting started.",
    coverColor: "from-blue-950 via-slate-900 to-zinc-950",
    rating: 4.7,
    matchScore: 95,
    year: 2025,
    genres: ["Mystery", "Trending Books", "Best Sellers"],
    pages: 360,
    readTime: "4h 30m",
    ageRating: "16+",
    quality: "HD",
    chapters: [
      {
        id: "sw-c1",
        title: "Chapter 1: The Cold Suture",
        content: [
          "The morgue was brightly lit and smelled of pine cleaner and formaldehyde. Dr. Evelyn Croft adjusted the lens of her surgical microscope, focusing on the incision.",
          "It was a neat, professional stitch, executed with a silver alloy thread. It was identical to the pattern she had seen in the archive files of the 'Vintner' killings back in 2010.",
          "But the Vintner had been convicted and died in prison five years ago. Evelyn stood up, her hands trembling. Either they had jailed the wrong man, or a copycat had acquired the Vintner's private medical logs."
        ]
      }
    ]
  },
  {
    id: "calculus-cosmos",
    title: "Calculus of the Cosmos",
    author: "Prof. Albert Sterling",
    description: "An academic math and physics exploration of the equations that define black holes, gravity, and cosmic expansions.",
    summary: "Professor Sterling demystifies advanced astrophysics. He explains Einstein's field equations, dark energy, and quantum gravity using clear prose, beautiful diagrams, and step-by-step mathematical breakdowns suitable for advanced undergraduates.",
    coverColor: "from-indigo-950 via-blue-950 to-slate-950",
    rating: 4.5,
    matchScore: 85,
    year: 2023,
    genres: ["Academic Books", "Science Fiction", "Technology Books"],
    pages: 420,
    readTime: "5h 30m",
    ageRating: "PG",
    quality: "UHD",
    chapters: [
      {
        id: "cc-c1",
        title: "Chapter 1: The Geometry of Space",
        content: [
          "We are accustomed to thinking of gravity as a pull, a force acting across a distance. Einstein taught us that gravity is geometry. Matter tells space how to curve; space tells matter how to move.",
          "When we write the field equations, we are describing the canvas on which the universe is drawn. The mathematics are complex, but the underlying concept is elegant: space-time is a fabric warped by mass."
        ]
      }
    ]
  },
  {
    id: "mastering-react-next",
    title: "Mastering React & Next.js",
    author: "Dan Abramovitch",
    description: "A comprehensive developer's guide to React Server Components, server actions, dynamic caching, and Next.js App Router architectures.",
    summary: "This manual provides deep-dives into modern web development. Learn how to optimize load times using React Server Components, manage complex state transitions, and deploy production-ready applications with Next.js.",
    coverColor: "from-slate-950 via-sky-950 to-blue-950",
    rating: 4.9,
    matchScore: 99,
    year: 2026,
    genres: ["Technology Books", "Academic Books", "New Releases"],
    pages: 350,
    readTime: "4h 20m",
    ageRating: "G",
    quality: "UHD",
    chapters: [
      {
        id: "mrn-c1",
        title: "Chapter 1: Server and Client Boundaries",
        content: [
          "In Next.js App Router, the default is Server. This means your code runs in a secure environment close to your database, delivering static HTML to the user's browser.",
          "To add interactivity, we define Client boundaries using 'use client'. This is not a fallback; it is a surgical tool to add state, effects, and browser-specific APIs precisely where needed."
        ]
      }
    ]
  },
  {
    id: "julius-caesar",
    title: "Julius Caesar: Restless Empire",
    author: "Dr. Marcus Aurel",
    description: "A vivid historical biography exploring the political maneuverings, military genius, and ultimate fall of Rome's most famous dictator.",
    summary: "Dr. Aurel provides a fresh look at Gaius Julius Caesar. Utilizing letters, senate speeches, and archaeological finds, he charts Caesar's rise through the ranks, his campaigns in Gaul, and the political coup that ended in the Ides of March.",
    coverColor: "from-red-950 via-stone-900 to-amber-950",
    rating: 4.8,
    matchScore: 93,
    year: 2024,
    genres: ["Biography", "History", "Best Sellers"],
    pages: 540,
    readTime: "6h 45m",
    ageRating: "13+",
    quality: "HD",
    chapters: [
      {
        id: "jc-c1",
        title: "Chapter 1: Crossing the Rubicon",
        content: [
          "The night of January 10, 49 BC, was dark and cold. Caesar stood on the northern bank of the Rubicon, a shallow river marking the boundary between his province of Gaul and Italy.",
          "Crossing the river with an armed legion was high treason—an act of war against the Roman Senate. He hesitated, conversing with his generals. Then, with a sudden motion, he spurred his horse forward. *Alea iacta est.* The die is cast."
        ]
      }
    ]
  },
  {
    id: "hearts-compass",
    title: "A Heart's Compass",
    author: "Emily Vance",
    description: "A lovely modern romance about two travelers who meet in Tokyo and try to maintain their bond across continents.",
    summary: "Maya and Leo meet on a rainy night in Tokyo's Shibuya crossing. They spend one unforgettable week exploring Japan, but when their vacations end, they return to separate lives in New York and London. Can love survive the timezone gap?",
    coverColor: "from-pink-950 via-purple-950 to-rose-950",
    rating: 4.6,
    matchScore: 92,
    year: 2025,
    genres: ["Romance", "Trending Books"],
    pages: 315,
    readTime: "3h 45m",
    ageRating: "13+",
    quality: "HD",
    chapters: [
      {
        id: "hc-c1",
        title: "Chapter 1: Shibuya in the Rain",
        content: [
          "Tokyo was a blur of neon lights and umbrellas. Maya stood under the shelter of a bookstore awning, her phone battery at one percent, completely lost.",
          "A tall man with a damp camera strap stepped under the awning. 'You look like you're trying to read a map upside down,' he said with a British accent. That was the moment her world shifted."
        ]
      }
    ]
  },
  {
    id: "biography-jobs",
    title: "Innovators: The Steve Jobs Story",
    author: "Walter Isaacson",
    description: "A gripping biography of the visionary leader who revolutionized technology, music, movies, and mobile computing.",
    summary: "This biography details the life of Steve Jobs. Through hundreds of interviews, the book paints an intimate portrait of a brilliant, demanding, and creative genius whose passion for perfection changed the world.",
    coverColor: "from-zinc-950 via-slate-900 to-indigo-950",
    rating: 4.9,
    matchScore: 97,
    year: 2023,
    genres: ["Biography", "Technology Books", "Best Sellers"],
    pages: 650,
    readTime: "8h 15m",
    ageRating: "PG-13",
    quality: "UHD",
    chapters: [
      {
        id: "sj-c1",
        title: "Chapter 1: The Garage Startup",
        content: [
          "In the 1970s, Los Altos, California, was orchard country transforming into Silicon Valley. Steve Jobs and Steve Wozniak spent their evenings soldering chips in a dusty family garage, dreaming of personal computers."
        ]
      }
    ]
  },
  {
    id: "history-sapiens",
    title: "Sapiens: A Brief History",
    author: "Yuval Noah Harari",
    description: "A provocative historical analysis exploring how Homo Sapiens conquered the planet and created modern civilization.",
    summary: "Dr. Harari spans the entirety of human history, from the cognitive revolution to the scientific revolution. He explains how shared myths, like money, religion, and nations, allowed humans to cooperate in massive numbers.",
    coverColor: "from-amber-950 via-amber-900 to-stone-900",
    rating: 4.8,
    matchScore: 95,
    year: 2022,
    genres: ["History", "Academic Books", "Best Sellers"],
    pages: 443,
    readTime: "5h 50m",
    ageRating: "13+",
    quality: "UHD",
    chapters: [
      {
        id: "hs-c1",
        title: "Chapter 1: An Animal of No Significance",
        content: [
          "One hundred thousand years ago, Homo sapiens was just one of several human species walking the earth, with no more impact on the environment than gorillas or fireflies."
        ]
      }
    ]
  },
  {
    id: "self-dev-atomic",
    title: "Atomic Habits: Easy & Proven",
    author: "James Clear",
    description: "A massive bestseller explaining how tiny daily changes compound into massive, life-altering long-term improvements.",
    summary: "James Clear presents a framework for building good habits and breaking bad ones. He details how to make habits obvious, attractive, easy, and satisfying, transforming our daily systems for peak performance.",
    coverColor: "from-emerald-950 via-green-900 to-slate-900",
    rating: 4.9,
    matchScore: 98,
    year: 2024,
    genres: ["Self Development", "Best Sellers", "Trending Books"],
    pages: 320,
    readTime: "4h",
    ageRating: "G",
    quality: "UHD",
    chapters: [
      {
        id: "ah-c1",
        title: "Chapter 1: The Power of Tiny Habits",
        content: [
          "It is easy to overestimate the importance of one defining moment and underestimate the value of making small improvements daily. A one percent improvement every day compounds to thirty-seven times better in a year."
        ]
      }
    ]
  },
  {
    id: "mystery-sherlock",
    title: "Sherlock Holmes: Selected Cases",
    author: "Sir Arthur Conan Doyle",
    description: "A collection of the most famous cases solved by the eccentric consulting detective and his loyal companion Dr. Watson.",
    summary: "This anthology contains classic cases, including 'A Study in Scarlet' and 'The Red-Headed League,' showcasing Sherlock Holmes's incredible powers of deduction and observation.",
    coverColor: "from-zinc-900 via-stone-800 to-zinc-950",
    rating: 4.7,
    matchScore: 90,
    year: 2022,
    genres: ["Mystery", "Biography"],
    pages: 290,
    readTime: "3h 30m",
    ageRating: "PG",
    quality: "HD",
    chapters: [
      {
        id: "sh-c1",
        title: "Chapter 1: The Science of Observation",
        content: [
          "Holmes leaned back in his armchair, his eyes closed. 'You see, Watson, but you do not observe. The distinction is clear. For example, you have frequently seen the steps leading up from the hall?'"
        ]
      }
    ]
  },
  {
    id: "horror-dracula",
    title: "Dracula: The Gothic Legend",
    author: "Bram Stoker",
    description: "The classic gothic horror story that defined the vampire genre, told through letters, diaries, and newspaper logs.",
    summary: "Jonathan Harker travels to Transylvania to assist a noble Count with a real estate purchase, only to discover a terrifying secret that threatens the woman he loves back in England.",
    coverColor: "from-red-950 via-zinc-950 to-neutral-950",
    rating: 4.8,
    matchScore: 93,
    year: 2021,
    genres: ["Horror", "Mystery"],
    pages: 390,
    readTime: "5h",
    ageRating: "16+",
    quality: "HD",
    chapters: [
      {
        id: "dr-c1",
        title: "Chapter 1: Jonathan Harker's Journal",
        content: [
          "3 May. Bistritz.—Left Munich at 8:30 P.M. on 1st May, arriving at Vienna early next morning; should have arrived at 6:46, but train was late. Budapest seems a wonderful place..."
        ]
      }
    ]
  }
];

export const getFeaturedBook = (): Book => {
  return mockBooks.find(b => b.isFeatured) || mockBooks[0];
};

export const getBooksByGenre = (genre: string): Book[] => {
  return mockBooks.filter(book => book.genres.some(g => g.toLowerCase().includes(genre.toLowerCase())));
};
