import {
  Camera,
  Gamepad2,
  Headphones,
  Laptop,
  Smartphone,
  Watch,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "./products";

type CategoryStyle = {
  icon: LucideIcon;
  /** Tailwind classes for the art panel background + icon colour */
  panel: string;
  blurb: string;
};

export const CATEGORY_STYLE: Record<Category, CategoryStyle> = {
  Audio: {
    icon: Headphones,
    panel:
      "bg-[#dcefee] text-[#0e6e6d] dark:bg-[#12333a] dark:text-[#5fd0cd]",
    blurb: "Headphones, earbuds and speakers",
  },
  Phones: {
    icon: Smartphone,
    panel:
      "bg-[#e1e6f4] text-[#2d4a8a] dark:bg-[#1a2647] dark:text-[#8eaaf0]",
    blurb: "Flagships and compact phones",
  },
  Laptops: {
    icon: Laptop,
    panel:
      "bg-[#e6e3f1] text-[#4b3f86] dark:bg-[#252043] dark:text-[#b2a6f0]",
    blurb: "Ultrabooks and creator machines",
  },
  Wearables: {
    icon: Watch,
    panel:
      "bg-[#f5e6dc] text-[#8a4a1f] dark:bg-[#3a2618] dark:text-[#f0b78c]",
    blurb: "Smartwatches and fitness bands",
  },
  Cameras: {
    icon: Camera,
    panel:
      "bg-[#e3ece2] text-[#3e6b3a] dark:bg-[#1c3020] dark:text-[#9cd394]",
    blurb: "Mirrorless and action cameras",
  },
  Gaming: {
    icon: Gamepad2,
    panel:
      "bg-[#f1e1e6] text-[#8a2f4c] dark:bg-[#3a1a26] dark:text-[#f19ab6]",
    blurb: "Handhelds and accessories",
  },
};
