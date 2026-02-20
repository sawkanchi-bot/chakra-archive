export interface ChakraInfo {
  id: string;
  name: string;
  sanskrit: string;
  color: string;
  cssVar: string;
  location: string;
  element: string;
  description: string;
  mantra: string;
  angle: number; // position on circle
}

export const chakras: ChakraInfo[] = [
  {
    id: "root",
    name: "Root",
    sanskrit: "Muladhara",
    color: "#FF3B3B",
    cssVar: "--chakra-root",
    location: "Base of Spine",
    element: "Earth",
    description: "Foundation of survival, raw power, and primal energy. The anchor to the physical world.",
    mantra: "LAM",
    angle: 270,
  },
  {
    id: "sacral",
    name: "Sacral",
    sanskrit: "Svadhisthana",
    color: "#FF7A00",
    cssVar: "--chakra-sacral",
    location: "Lower Abdomen",
    element: "Water",
    description: "Source of passion, creativity, and flowing motion. Where desire becomes creation.",
    mantra: "VAM",
    angle: 310,
  },
  {
    id: "solar",
    name: "Solar Plexus",
    sanskrit: "Manipura",
    color: "#FFD500",
    cssVar: "--chakra-solar",
    location: "Upper Abdomen",
    element: "Fire",
    description: "Seat of willpower, confidence, and inner fire. The furnace of transformation.",
    mantra: "RAM",
    angle: 350,
  },
  {
    id: "heart",
    name: "Heart",
    sanskrit: "Anahata",
    color: "#00E676",
    cssVar: "--chakra-heart",
    location: "Center of Chest",
    element: "Air",
    description: "Bridge between physical and spiritual. Harmony, compassion, and unconditional balance.",
    mantra: "YAM",
    angle: 30,
  },
  {
    id: "throat",
    name: "Throat",
    sanskrit: "Vishuddha",
    color: "#00B3FF",
    cssVar: "--chakra-throat",
    location: "Throat",
    element: "Ether",
    description: "Voice of truth and expression. Clarity of purpose spoken into existence.",
    mantra: "HAM",
    angle: 70,
  },
  {
    id: "third-eye",
    name: "Third Eye",
    sanskrit: "Ajna",
    color: "#5E5CFF",
    cssVar: "--chakra-third-eye",
    location: "Between Eyes",
    element: "Light",
    description: "Gateway to inner vision and mystic insight. Perception beyond the physical realm.",
    mantra: "OM",
    angle: 110,
  },
  {
    id: "crown",
    name: "Crown",
    sanskrit: "Sahasrara",
    color: "#B026FF",
    cssVar: "--chakra-crown",
    location: "Top of Head",
    element: "Cosmic Energy",
    description: "Connection to the infinite. Pure consciousness ascending beyond form.",
    mantra: "AUM",
    angle: 150,
  },
];
