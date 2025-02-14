import { createLucideIcon } from "lucide-react";

// 1. Chat
export const Chat = createLucideIcon("ChatIcon", [
  [
    "path",
    {
      d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
      key: "1",
    },
  ],
]);

// 2. Courses (Graduation cap)
export const Courses = createLucideIcon("CoursesIcon", [
  ["path", { d: "M22 10 12 15 2 10l10-5 10 5z", key: "1" }],
  ["path", { d: "M2 10v6", key: "2" }],
  ["path", { d: "M22 10v6", key: "3" }],
  ["path", { d: "M12 15v6", key: "4" }],
]);

// 3. Document (folded corner)
export const Document = createLucideIcon("DocumentIcon", [
  [
    "path",
    {
      d: "M14 2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8z",
      key: "1",
    },
  ],
  ["polyline", { points: "14 2 14 8 20 8", key: "2" }],
]);

// 4. Grid
export const Grid = createLucideIcon("GridIcon", [
  [
    "rect",
    {
      x: "3",
      y: "3",
      width: "7",
      height: "7",
      rx: "1",
      ry: "1",
      key: "1",
    },
  ],
  [
    "rect",
    {
      x: "14",
      y: "3",
      width: "7",
      height: "7",
      rx: "1",
      ry: "1",
      key: "2",
    },
  ],
  [
    "rect",
    {
      x: "14",
      y: "14",
      width: "7",
      height: "7",
      rx: "1",
      ry: "1",
      key: "3",
    },
  ],
  [
    "rect",
    {
      x: "3",
      y: "14",
      width: "7",
      height: "7",
      rx: "1",
      ry: "1",
      key: "4",
    },
  ],
]);

// 5. Heart
export const Heart = createLucideIcon("HeartIcon", [
  [
    "path",
    {
      d: "M20.8 4a5.5 5.5 0 0 0-7.78 0L12 5.09 10.2 4a5.5 5.5 0 0 0-7.78 7.78l9.8 9.8 9.8-9.8A5.5 5.5 0 0 0 20.8 4Z",
      key: "1",
    },
  ],
]);

// 6. Megaphone
export const MegaPhone = createLucideIcon("MegaPhoneIcon", [
  ["path", { d: "M3 11l18-5v12l-18-5v-2z", key: "1" }],
  [
    "path",
    {
      d: "M11.7 15 11 19a1 1 0 0 0 1.44.9c.27-.13.5-.34.65-.6l1.36-2.28",
      key: "2",
    },
  ],
]);

// 7. WhiteLabel (using a tag icon as an example)
export const WhiteLabel = createLucideIcon("WhiteLabelIcon", [
  [
    "path",
    {
      d: "M2 2v6a2 2 0 0 0 .59 1.42l8.98 8.98a2 2 0 0 0 2.83 0l6.34-6.34a2 2 0 0 0 0-2.83L11.76 2.59A2 2 0 0 0 10.34 2H2z",
      key: "1",
    },
  ],
  ["line", { x1: "6.5", y1: "6.5", x2: "6.51", y2: "6.5", key: "2" }],
]);
