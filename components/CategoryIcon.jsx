import { Keyboard, Mouse, Monitor, Headphones, Lamp, HardDrive, Package } from "lucide-react";

// One flat tint per category, used on tiles and product artwork.
export const categoryStyles = {
  Keyboards: { icon: Keyboard, tile: "bg-[#E8EDFF] text-[#2547F5]" },
  Mice: { icon: Mouse, tile: "bg-[#FFF1D6] text-[#A8620A]" },
  Displays: { icon: Monitor, tile: "bg-[#DDF3EA] text-[#0F7A55]" },
  Audio: { icon: Headphones, tile: "bg-[#FBE3EA] text-[#B4234A]" },
  "Desk setup": { icon: Lamp, tile: "bg-[#EAE6FB] text-[#5B3FC4]" },
  Storage: { icon: HardDrive, tile: "bg-[#E1EDF7] text-[#1F5F8B]" },
};

const fallback = { icon: Package, tile: "bg-slate-100 text-slate-600" };

export function getCategoryStyle(category) {
  return categoryStyles[category] || fallback;
}

export default function CategoryIcon({ category, className = "h-6 w-6", ...props }) {
  const { icon: Icon } = getCategoryStyle(category);
  return <Icon className={className} aria-hidden="true" {...props} />;
}
