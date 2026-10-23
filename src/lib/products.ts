export const CATEGORIES = [
  "Audio",
  "Phones",
  "Laptops",
  "Wearables",
  "Cameras",
  "Gaming",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Spec = { label: string; value: string };

export type Product = {
  id: string;
  title: string;
  brand: string;
  category: Category;
  shortDescription: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  stock: number;
  releaseDate: string; // ISO date
  image?: string;
  specs: Spec[];
  /** Set for products added through the app */
  createdBy?: string;
  createdAt?: string;
};

export const SEED_PRODUCTS: Product[] = [
  {
    id: "drift-anc-headphones",
    title: "Drift ANC Headphones",
    brand: "Halcyon",
    category: "Audio",
    shortDescription:
      "Over-ear headphones with adaptive noise cancelling and 40-hour battery.",
    description:
      "Drift uses six microphones to measure ambient noise 200 times a second and adjusts cancellation to match, so a train carriage and a quiet office both fade out. Memory-foam cushions spread clamping force for long sessions, and a fast-charge cable gives five hours of playback from ten minutes plugged in. Multipoint Bluetooth keeps a laptop and phone connected at once.",
    price: 249,
    rating: 4.7,
    reviews: 1284,
    stock: 42,
    releaseDate: "2026-03-12",
    specs: [
      { label: "Driver", value: "40 mm dynamic" },
      { label: "Battery", value: "40 h (ANC on)" },
      { label: "Bluetooth", value: "5.4, multipoint" },
      { label: "Codecs", value: "AAC, LDAC, LC3" },
      { label: "Weight", value: "254 g" },
    ],
  },
  {
    id: "pebble-buds-pro",
    title: "Pebble Buds Pro",
    brand: "Halcyon",
    category: "Audio",
    shortDescription:
      "Pocket-sized earbuds with spatial audio and a wireless charging case.",
    description:
      "Pebble Buds Pro sit flush in the ear and weigh under five grams each. Head-tracked spatial audio places sound around you for films, while transparency mode lets voices through without removing a bud. The case charges on any Qi pad and adds three full recharges.",
    price: 159,
    rating: 4.5,
    reviews: 932,
    stock: 120,
    releaseDate: "2026-05-02",
    specs: [
      { label: "Driver", value: "11 mm dynamic" },
      { label: "Battery", value: "8 h buds, 32 h with case" },
      { label: "Water resistance", value: "IPX5" },
      { label: "Charging", value: "USB-C, Qi wireless" },
      { label: "Weight", value: "4.8 g per bud" },
    ],
  },
  {
    id: "boom-cube-speaker",
    title: "Boom Cube Speaker",
    brand: "Ostro",
    category: "Audio",
    shortDescription:
      "Rugged portable speaker that floats, with 360° sound and 20-hour battery.",
    description:
      "Boom Cube is built for beaches and campsites: it is dust-tight, survives a two-metre drop, and floats if it lands in the pool. Two passive radiators push bass well beyond its size, and you can pair two cubes for stereo.",
    price: 99,
    rating: 4.3,
    reviews: 611,
    stock: 75,
    releaseDate: "2025-11-20",
    specs: [
      { label: "Output", value: "30 W" },
      { label: "Battery", value: "20 h" },
      { label: "Rating", value: "IP67, floats" },
      { label: "Pairing", value: "Stereo pair, party mode" },
      { label: "Weight", value: "560 g" },
    ],
  },
  {
    id: "nova-x-smartphone",
    title: "Nova X Smartphone",
    brand: "Lumen",
    category: "Phones",
    shortDescription:
      "6.7-inch flagship with a 120 Hz OLED display and triple 50 MP cameras.",
    description:
      "Nova X pairs a bright LTPO OLED panel with a camera system that shares one 50 MP sensor size across wide, ultra-wide and 3× telephoto, so colours match whichever lens you use. The 5,000 mAh battery comfortably lasts a full day, and seven years of software updates are included.",
    price: 899,
    rating: 4.8,
    reviews: 2210,
    stock: 30,
    releaseDate: "2026-09-04",
    specs: [
      { label: "Display", value: '6.7" LTPO OLED, 120 Hz' },
      { label: "Storage", value: "256 GB" },
      { label: "Cameras", value: "50 + 50 + 50 MP" },
      { label: "Battery", value: "5,000 mAh, 65 W" },
      { label: "Updates", value: "7 years" },
    ],
  },
  {
    id: "mini-s-compact-phone",
    title: "Mini S Compact Phone",
    brand: "Lumen",
    category: "Phones",
    shortDescription:
      "A one-handed 5.9-inch phone that keeps the flagship chip and main camera.",
    description:
      "Mini S is for people who want a small phone without a small spec sheet. It shares the Nova X processor and main camera in a body that fits a jeans pocket, with an aluminium frame and a matte glass back that resists fingerprints.",
    price: 649,
    rating: 4.4,
    reviews: 540,
    stock: 18,
    releaseDate: "2026-06-18",
    specs: [
      { label: "Display", value: '5.9" OLED, 120 Hz' },
      { label: "Storage", value: "128 GB" },
      { label: "Camera", value: "50 MP main, 12 MP ultra-wide" },
      { label: "Battery", value: "4,100 mAh" },
      { label: "Weight", value: "168 g" },
    ],
  },
  {
    id: "atlas-14-ultrabook",
    title: "Atlas 14 Ultrabook",
    brand: "Kestrel",
    category: "Laptops",
    shortDescription:
      "1.2 kg aluminium laptop with an all-day battery and a 2.8K display.",
    description:
      "Atlas 14 is machined from a single block of recycled aluminium and stays silent under everyday work thanks to a fanless design. The 2.8K panel covers the full DCI-P3 colour range, the keyboard has 1.5 mm of travel, and two USB4 ports drive an external monitor and charge from the same cable.",
    price: 1299,
    rating: 4.6,
    reviews: 780,
    stock: 22,
    releaseDate: "2026-04-08",
    specs: [
      { label: "Display", value: '14" 2.8K, 90 Hz' },
      { label: "Memory", value: "16 GB LPDDR5X" },
      { label: "Storage", value: "1 TB NVMe" },
      { label: "Battery", value: "Up to 18 h" },
      { label: "Weight", value: "1.2 kg" },
    ],
  },
  {
    id: "forge-16-creator-laptop",
    title: "Forge 16 Creator Laptop",
    brand: "Kestrel",
    category: "Laptops",
    shortDescription:
      "16-inch workstation with a dedicated GPU for editing, 3D and code.",
    description:
      "Forge 16 is built for long renders and big builds: a dedicated graphics chip, 32 GB of memory and a vapour-chamber cooler that keeps clocks steady. The 16-inch mini-LED screen reaches 1,000 nits for HDR grading, and an SD card reader saves a dongle on shoots.",
    price: 2199,
    rating: 4.7,
    reviews: 356,
    stock: 9,
    releaseDate: "2026-07-22",
    specs: [
      { label: "Display", value: '16" mini-LED, 165 Hz' },
      { label: "Memory", value: "32 GB DDR5" },
      { label: "Graphics", value: "Dedicated, 12 GB" },
      { label: "Storage", value: "2 TB NVMe" },
      { label: "Weight", value: "2.1 kg" },
    ],
  },
  {
    id: "pulse-smartwatch",
    title: "Pulse Smartwatch",
    brand: "Orbit",
    category: "Wearables",
    shortDescription:
      "Health-focused watch with ECG, sleep staging and a week of battery.",
    description:
      "Pulse tracks heart rhythm, blood oxygen and skin temperature, then turns them into a single readiness score each morning. Dual-band GPS records accurate routes in cities, and the always-on display still lasts seven days between charges.",
    price: 329,
    rating: 4.5,
    reviews: 1012,
    stock: 64,
    releaseDate: "2026-02-14",
    specs: [
      { label: "Display", value: '1.4" AMOLED, always-on' },
      { label: "Sensors", value: "ECG, SpO₂, temperature" },
      { label: "GPS", value: "Dual-band L1 + L5" },
      { label: "Battery", value: "7 days" },
      { label: "Water", value: "5 ATM" },
    ],
  },
  {
    id: "loop-fitness-band",
    title: "Loop Fitness Band",
    brand: "Orbit",
    category: "Wearables",
    shortDescription:
      "Slim activity tracker for steps, heart rate and sleep, with no screen.",
    description:
      "Loop has no screen and no notifications, which is the point: it records activity, heart rate and sleep quietly and shows everything in the app. The woven band is comfortable enough to forget overnight, and a charge lasts two weeks.",
    price: 79,
    rating: 4.1,
    reviews: 402,
    stock: 150,
    releaseDate: "2025-12-01",
    specs: [
      { label: "Sensors", value: "Optical HR, accelerometer" },
      { label: "Battery", value: "14 days" },
      { label: "Water", value: "5 ATM" },
      { label: "Band", value: "Woven nylon" },
      { label: "Weight", value: "19 g" },
    ],
  },
  {
    id: "frame-mirrorless-camera",
    title: "Frame Mirrorless Camera",
    brand: "Vanta",
    category: "Cameras",
    shortDescription:
      "26 MP APS-C body with in-body stabilisation and 4K 60p video.",
    description:
      "Frame packs a stabilised 26 MP sensor into a compact body with a deep grip and two command dials. Subject detection tracks eyes, animals and vehicles, and it records 10-bit 4K 60p internally for colour grading.",
    price: 1149,
    rating: 4.6,
    reviews: 288,
    stock: 14,
    releaseDate: "2026-01-25",
    specs: [
      { label: "Sensor", value: "26 MP APS-C" },
      { label: "Stabilisation", value: "5-axis, 7 stops" },
      { label: "Video", value: "4K 60p, 10-bit" },
      { label: "Burst", value: "15 fps mechanical" },
      { label: "Weight", value: "455 g" },
    ],
  },
  {
    id: "orbit-action-cam",
    title: "Orbit 360 Action Cam",
    brand: "Vanta",
    category: "Cameras",
    shortDescription:
      "Waterproof action camera that films in 360° and reframes later.",
    description:
      "Shoot everything around you, then pick the angle afterwards in the app. Horizon lock keeps footage level even when the camera rolls, and the invisible-stick effect makes it look like a drone followed you.",
    price: 399,
    rating: 4.2,
    reviews: 517,
    stock: 38,
    releaseDate: "2026-08-10",
    specs: [
      { label: "Video", value: "5.7K 360°" },
      { label: "Waterproof", value: "10 m without case" },
      { label: "Stabilisation", value: "Horizon lock" },
      { label: "Battery", value: "80 min recording" },
      { label: "Weight", value: "180 g" },
    ],
  },
  {
    id: "rift-handheld-console",
    title: "Rift Handheld Console",
    brand: "Ostro",
    category: "Gaming",
    shortDescription:
      "PC-grade handheld with a 7-inch 120 Hz screen and hall-effect sticks.",
    description:
      "Rift runs your existing PC game library on a 7-inch OLED screen. Hall-effect sticks won't drift, trackpads make mouse-driven games playable, and it docks to a TV over a single USB-C cable.",
    price: 549,
    rating: 4.4,
    reviews: 673,
    stock: 26,
    releaseDate: "2026-10-01",
    specs: [
      { label: "Display", value: '7" OLED, 120 Hz' },
      { label: "Memory", value: "16 GB" },
      { label: "Storage", value: "512 GB + microSD" },
      { label: "Controls", value: "Hall-effect sticks, trackpads" },
      { label: "Battery", value: "3–8 h" },
    ],
  },
];

export function getRelatedProducts(all: Product[], product: Product, limit = 3) {
  const sameCategory = all.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );
  const others = all.filter(
    (p) => p.id !== product.id && p.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
