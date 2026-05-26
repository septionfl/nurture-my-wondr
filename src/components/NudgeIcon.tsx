import {
  Wallet, Plane, TrendingDown, Coffee, UtensilsCrossed, HeartPulse, Globe2,
  Palmtree, ShieldCheck, Activity, type LucideIcon,
} from "lucide-react";
import type { NudgeIconKey } from "@/stores/useHabitStore";

const MAP: Record<string, LucideIcon> = {
  wallet: Wallet,
  plane: Plane,
  "trending-down": TrendingDown,
  coffee: Coffee,
  utensils: UtensilsCrossed,
  "heart-pulse": HeartPulse,
  globe: Globe2,
  palm: Palmtree,
  shield: ShieldCheck,
  activity: Activity,
};

export function getIcon(key: string): LucideIcon {
  return MAP[key] ?? Wallet;
}

export function NudgeIcon({
  iconKey,
  size = "md",
  tone = "accent",
}: {
  iconKey: NudgeIconKey | string;
  size?: "sm" | "md" | "lg";
  tone?: "accent" | "primary" | "navy";
}) {
  const Icon = getIcon(iconKey);
  const sizeClass = {
    sm: "w-9 h-9 [&>svg]:w-4 [&>svg]:h-4",
    md: "w-11 h-11 [&>svg]:w-5 [&>svg]:h-5",
    lg: "w-14 h-14 [&>svg]:w-6 [&>svg]:h-6",
  }[size];
  const toneClass = {
    accent: "bg-accent/10 text-accent",
    primary: "bg-primary/10 text-primary",
    navy: "bg-[var(--navy)]/8 text-[var(--navy)]",
  }[tone];
  return (
    <div className={`rounded-2xl flex items-center justify-center ${sizeClass} ${toneClass}`}>
      <Icon strokeWidth={2.2} />
    </div>
  );
}
