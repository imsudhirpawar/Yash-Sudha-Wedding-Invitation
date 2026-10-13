import g1 from "./assets/g1.jpg";
import g2 from "./assets/g2.jpg";
import g3 from "./assets/g3.jpg";
import g4 from "./assets/g4.jpg";
import hero from "./assets/hero.jpg";
import groomImg from "./assets/groom.jpg";
import brideImg from "./assets/bride.jpg";

export const portraits = { groom: groomImg, bride: brideImg };

export const couple = {
  groom: {
    name: "Yash",
    full: "Mr. Yash Ganesh Pandit",
    role: "The Groom",
    parents: "Son of Late Shri Ganesh Madhukar Pandit & Late Smt. Aarti Ganesh Pandit",
    words:
      "A restless heart, a gentle soul — he found his home, his happiness, and his forever in her.",
  },
  bride: {
    name: "Sudharani",
    full: "Ms. Sudharani Digambar Kasar",
    role: "The Bride",
    parents: "Daughter of Mr. Digambar Jagannath Kasar & Mrs. Padmashree Digambar Kasar",
    words:
      "She carried a thousand dreams in her heart, and he became the most beautiful of them all.",
  },
};

/** Wedding muhurat — 30 December 2026, 11:12 AM IST */
export const weddingDate = new Date("2026-12-30T11:12:00+05:30");

export const events = [
  {
    icon: "💍",
    name: "Engagement Ceremony",
    date: "Tuesday, 29 December 2026",
    time: "5:30 PM - 7:30 PM",
    venue: "The Heritage Banquet, Dombivli (E)",
    note: "A promise of love, a ring, and forever begins.",
  },
  {
    icon: "🌼",
    name: "Haldi Ceremony",
    date: "Tuesday, 29 December 2026",
    time: "8:00 PM - 10:00 PM",
    venue: "The Heritage Banquet, Dombivli (E)",
    note: "Turmeric, laughter and a whole lot of yellow.",
  },
  // {
  //   icon: "🎶",
  //   name: "Sangeet Sandhya",
  //   date: "Saturday, 21 November 2026",
  //   time: "7:30 PM onwards",
  //   venue: "The Heritage Banquet, Dombivli (E)",
  //   note: "Two families, one dance floor. Bring your best moves.",
  // },
  // {
  //   icon: "🐘",
  //   name: "Baraat & Swagat",
  //   date: "Wednesday, 30 December 2026",
  //   time: "5:30 PM onwards",
  //   venue: "The Heritage Banquet, Dombivli (E)",
  //   note: "The groom arrives — with drums, lights and joy.",
  // },
  {
    icon: "🔥",
    name: "Shubh Vivah",
    date: "Wednesday, 30 December 2026",
    time: "11:12 AM",
    venue: "The Heritage Banquet, Dombivli (E)",
    note: "Seven vows, seven steps, one forever.",
  },
  {
    icon: "✨",
    name: "Reception",
    date: "Wednesday, 30 December 2026",
    time: "1:00 PM - 3:00 PM",
    venue: "The Heritage Banquet, Dombivli (E)",
    note: "Lunch, blessings and the first dance as one.",
  },
];

export const gallery = [
  { src: hero, caption: "Us, always" },
  { src: g1, caption: "Haldi glow" },
  { src: g2, caption: "Mehndi mornings" },
  { src: g3, caption: "Sangeet nights" },
  { src: g4, caption: "The mandap awaits" },
  { src: groomImg, caption: "The groom" },
  { src: brideImg, caption: "The bride" },
];

export const heroImage = hero;

export const venue = {
  name: "The Heritage Banquet",
  address: "Ground Floor, Citi Mall, Near K V Pendharkar College, M.I, D.C, Kalyan Rd, Dombivli, Tata Power Company Limited, Dombivli East, Kalyan, Maharashtra 421203, India",
  mapsQuery: "place/The+Heritage+Banquet/@19.2132055,73.1015473,818m/data=!3m3!1e3!4b1!5s0x3be79596d7159c05:0x6390a95e5ecd9fd7!4m6!3m5!1s0x3be79596d7a03127:0x9c31914b11435d51!8m2!3d19.2132056!4d73.1061607!16s%2Fg%2F1vkxkqw2?hl=en-US&entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D",
};

export const story = [
  {
    year: "2019",
    title: "The First Hello",
    text: "A crowded college fest in Pune, one shared umbrella and a conversation that refused to end.",
  },
  {
    year: "2021",
    title: "Long Calls, Longer Miles",
    text: "Two cities, endless voice notes, and the quiet certainty that distance was only temporary.",
  },
  {
    year: "2024",
    title: "The Question",
    text: "On a monsoon evening at Khekranala, with chai in hand, Yash asked. Sudharani laughed, cried, and said yes.",
  },
  {
    year: "2026",
    title: "Forever Begins",
    text: "With the blessings of our families, we tie the sacred knot — and we would love you there.",
  },
];
