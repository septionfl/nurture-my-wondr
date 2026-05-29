import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as Activity, r as ShieldCheck, v as TreePalm, E as Earth, H as HeartPulse, y as UtensilsCrossed, j as Coffee, w as TrendingDown, o as Plane, W as Wallet } from "../_libs/lucide-react.mjs";
const MAP = {
  wallet: Wallet,
  plane: Plane,
  "trending-down": TrendingDown,
  coffee: Coffee,
  utensils: UtensilsCrossed,
  "heart-pulse": HeartPulse,
  globe: Earth,
  palm: TreePalm,
  shield: ShieldCheck,
  activity: Activity
};
function getIcon(key) {
  return MAP[key] ?? Wallet;
}
function NudgeIcon({
  iconKey,
  size = "md",
  tone = "accent"
}) {
  const Icon = getIcon(iconKey);
  const sizeClass = {
    sm: "w-9 h-9 [&>svg]:w-4 [&>svg]:h-4",
    md: "w-11 h-11 [&>svg]:w-5 [&>svg]:h-5",
    lg: "w-14 h-14 [&>svg]:w-6 [&>svg]:h-6"
  }[size];
  const toneClass = {
    accent: "bg-accent/10 text-accent",
    primary: "bg-primary/10 text-primary",
    navy: "bg-[var(--navy)]/8 text-[var(--navy)]"
  }[tone];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-2xl flex items-center justify-center ${sizeClass} ${toneClass}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { strokeWidth: 2.2 }) });
}
export {
  NudgeIcon as N
};
