import { createLucideIcon } from "lucide-react";

// Custom Home Icon
export const HomeIcon = createLucideIcon("HomeIcon", [
  ["path", { d: "M3 12l9-9 9 9", key: "1" }],
  ["path", { d: "M9 21V12h6v9", key: "2" }],
]);

// Custom Credit Card Icon
export const CreditCardIcon = createLucideIcon("CreditCardIcon", [
  ["rect", { x: "2", y: "5", width: "20", height: "14", rx: "2", key: "1" }],
  ["line", { x1: "2", y1: "10", x2: "22", y2: "10", key: "2" }],
  ["line", { x1: "6", y1: "15", x2: "6.01", y2: "15", key: "3" }],
  ["line", { x1: "10", y1: "15", x2: "14", y2: "15", key: "4" }],
]);

// Custom Explore Icon (Compass-like)
export const ExploreIcon = createLucideIcon("ExploreIcon", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1" }],
  ["polygon", { points: "16 8 12 12 8 16 12 12 16 8", key: "2" }],
]);
