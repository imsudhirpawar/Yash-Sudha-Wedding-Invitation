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
    full: "Yash Deshmukh",
    role: "The Groom",
    parents: "Son of Mr. Rajendra Deshmukh & Mrs. Sunita Deshmukh",
    words:
      "A gentle soul with a restless heart — he found his calm the day he found her.",
  },
  bride: {
    name: "Sudharani",
    full: "Sudharani Patil",
    role: "The Bride",
    parents: "Daughter of Mr. Mahesh Patil & Mrs. Vaishali Patil",
    words:
      "Sunshine in a saree — she turns ordinary days into festivals of joy.",
  },
};

/** Wedding muhurat — 22 November 2026, 8:12 PM IST */
export const weddingDate = new Date("2026-11-22T20:12:00+05:30");

export const events = [
  {
    icon: "🌼",
    name: "Haldi Ceremony",
    date: "Friday, 20 November 2026",
    time: "10:00 AM onwards",
    venue: "Deshmukh Nivas, Ramdaspeth, Nagpur",
    note: "Turmeric, laughter and a whole lot of yellow.",
  },
  {
    icon: "🌿",
    name: "Mehndi Night",
    date: "Friday, 20 November 2026",
    time: "5:00 PM onwards",
    venue: "Patil House Courtyard, Dharampeth, Nagpur",
    note: "Henna, dhol and stories that stain the heart.",
  },
  {
    icon: "🎶",
    name: "Sangeet Sandhya",
    date: "Saturday, 21 November 2026",
    time: "7:30 PM onwards",
    venue: "Grand Emerald Banquet, Wardha Road, Nagpur",
    note: "Two families, one dance floor. Bring your best moves.",
  },
  {
    icon: "🐘",
    name: "Baraat & Swagat",
    date: "Sunday, 22 November 2026",
    time: "5:30 PM onwards",
    venue: "Shree Krishna Lawns, Nagpur",
    note: "The groom arrives — with drums, lights and joy.",
  },
  {
    icon: "🔥",
    name: "Shubh Vivah",
    date: "Sunday, 22 November 2026",
    time: "8:12 PM (Muhurat)",
    venue: "Shree Krishna Lawns, Nagpur",
    note: "Seven vows, seven steps, one forever.",
  },
  {
    icon: "✨",
    name: "Reception",
    date: "Monday, 23 November 2026",
    time: "7:00 PM onwards",
    venue: "The Regal Hall, Civil Lines, Nagpur",
    note: "Dinner, blessings and the first dance as one.",
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
  name: "Shree Krishna Lawns",
  address: "Plot 14, Wardha Road, Besa, Nagpur, Maharashtra 440037",
  mapsQuery: "Shree+Krishna+Lawns+Wardha+Road+Nagpur",
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
