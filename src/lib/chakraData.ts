export interface ChakraInfo {
  id: string;
  name: string;
  codeName: string;
  sanskrit: string;
  color: string;
  cssVar: string;
  location: string;
  element: string;
  description: string;
  mantra: string;
  yPercent: number;
  xOffset: number; // 3D offset from center (-1 to 1)
  depthScale: number; // perspective depth (0.8 to 1.2)
}

export const chakras: ChakraInfo[] = [
  {
    id: "crown",
    name: "Crown",
    codeName: "ASCENSION NODE",
    sanskrit: "Sahasrara",
    color: "#C44DFF",
    cssVar: "--chakra-crown",
    location: "Top of Head",
    element: "Cosmic Energy",
    description: "Connection to the infinite. Pure consciousness ascending beyond form.",
    mantra: "AUM",
    yPercent: 6,
    xOffset: 0.3,
    depthScale: 0.85,
  },
  {
    id: "third-eye",
    name: "Third Eye",
    codeName: "VISION NODE",
    sanskrit: "Ajna",
    color: "#7B79FF",
    cssVar: "--chakra-third-eye",
    location: "Between Eyes",
    element: "Light",
    description: "Gateway to inner vision and mystic insight. Perception beyond the physical realm.",
    mantra: "OM",
    yPercent: 16,
    xOffset: 0.15,
    depthScale: 0.9,
  },
  {
    id: "throat",
    name: "Throat",
    codeName: "VOICE NODE",
    sanskrit: "Vishuddha",
    color: "#1AC8FF",
    cssVar: "--chakra-throat",
    location: "Throat",
    element: "Ether",
    description: "Voice of truth and expression. Clarity of purpose spoken into existence.",
    mantra: "HAM",
    yPercent: 27,
    xOffset: -0.1,
    depthScale: 0.95,
  },
  {
    id: "heart",
    name: "Heart",
    codeName: "CORE NODE",
    sanskrit: "Anahata",
    color: "#00FF8A",
    cssVar: "--chakra-heart",
    location: "Center of Chest",
    element: "Air",
    description: "Bridge between physical and spiritual. Harmony, compassion, and unconditional balance.",
    mantra: "YAM",
    yPercent: 38,
    xOffset: 0.05,
    depthScale: 1.0,
  },
  {
    id: "solar",
    name: "Solar Plexus",
    codeName: "FLAME NODE",
    sanskrit: "Manipura",
    color: "#FFE014",
    cssVar: "--chakra-solar",
    location: "Upper Abdomen",
    element: "Fire",
    description: "Seat of willpower, confidence, and inner fire. The furnace of transformation.",
    mantra: "RAM",
    yPercent: 48,
    xOffset: -0.15,
    depthScale: 1.05,
  },
  {
    id: "sacral",
    name: "Sacral",
    codeName: "SURGE NODE",
    sanskrit: "Svadhisthana",
    color: "#FF8C1A",
    cssVar: "--chakra-sacral",
    location: "Lower Abdomen",
    element: "Water",
    description: "Source of passion, creativity, and flowing motion. Where desire becomes creation.",
    mantra: "VAM",
    yPercent: 58,
    xOffset: 0.1,
    depthScale: 1.1,
  },
  {
    id: "root",
    name: "Root",
    codeName: "INSTINCT NODE",
    sanskrit: "Muladhara",
    color: "#FF4A4A",
    cssVar: "--chakra-root",
    location: "Base of Spine",
    element: "Earth",
    description: "Foundation of survival, raw power, and primal energy. The anchor to the physical world.",
    mantra: "LAM",
    yPercent: 68,
    xOffset: -0.05,
    depthScale: 1.15,
  },
];
