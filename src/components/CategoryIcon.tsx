import {
  Coffee, UtensilsCrossed, Plane, HeartPulse, ShoppingBag, Car, Wallet, PiggyBank, Receipt,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, { icon: LucideIcon; tone: string }> = {
  Kafe: { icon: Coffee, tone: "bg-amber-50 text-amber-600" },
  Makanan: { icon: UtensilsCrossed, tone: "bg-rose-50 text-rose-600" },
  Travel: { icon: Plane, tone: "bg-sky-50 text-sky-600" },
  Wellness: { icon: HeartPulse, tone: "bg-emerald-50 text-emerald-600" },
  Belanja: { icon: ShoppingBag, tone: "bg-violet-50 text-violet-600" },
  Transport: { icon: Car, tone: "bg-indigo-50 text-indigo-600" },
  Pemasukan: { icon: Wallet, tone: "bg-emerald-50 text-emerald-600" },
  "Auto-Save": { icon: PiggyBank, tone: "bg-cyan-50 text-cyan-700" },
};

export function CategoryIcon({ category, size = 40 }: { category: string; size?: number }) {
  const entry = MAP[category] ?? { icon: Receipt, tone: "bg-slate-50 text-slate-600" };
  const Icon = entry.icon;
  return (
    <div className={`rounded-xl flex items-center justify-center ${entry.tone}`} style={{ width: size, height: size }}>
      <Icon className="w-1/2 h-1/2" strokeWidth={2.2} />
    </div>
  );
}

export const categoryColor = (category: string): string => {
  switch (category) {
    case "Kafe": return "#F59E0B";
    case "Makanan": return "#F43F5E";
    case "Travel": return "#0EA5E9";
    case "Wellness": return "#10B981";
    case "Belanja": return "#8B5CF6";
    case "Transport": return "#6366F1";
    default: return "#94A3B8";
  }
};
