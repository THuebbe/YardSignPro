export interface EventConfig {
  eventName: string;
  eventDate: Date | null;
  eventType: string;
  signColor: string;
  textColor: string;
  message: string;
  fontStyle: string;
  decorations: string[];
}

export const DEFAULT_EVENT_CONFIG: EventConfig = {
  eventName: "",
  eventDate: null,
  eventType: "Birthday",
  signColor: "#4ade80", // Green
  textColor: "#ffffff", // White
  message: "Happy Birthday!",
  fontStyle: "font-serif",
  decorations: [],
};

export const EVENT_TYPES = [
  "Birthday",
  "Anniversary",
  "Graduation",
  "Wedding",
  "Baby Shower",
  "Retirement",
  "Congratulations",
  "Welcome Home",
  "Other",
];

export const FONT_STYLES = [
  { name: "Serif", value: "font-serif" },
  { name: "Sans Serif", value: "font-sans" },
  { name: "Monospace", value: "font-mono" },
  { name: "Cursive", value: "font-cursive" },
  { name: "Fantasy", value: "font-fantasy" },
];

export const DECORATIONS = [
  { name: "Balloons", value: "balloons" },
  { name: "Confetti", value: "confetti" },
  { name: "Stars", value: "stars" },
  { name: "Hearts", value: "hearts" },
  { name: "Flowers", value: "flowers" },
];
