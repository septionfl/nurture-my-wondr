import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PiggyBank, W as Wallet, C as Car, s as ShoppingBag, H as HeartPulse, o as Plane, y as UtensilsCrossed, j as Coffee, R as Receipt } from "../_libs/lucide-react.mjs";
const MAP = {
  Kafe: { icon: Coffee, tone: "bg-amber-50 text-amber-600" },
  Makanan: { icon: UtensilsCrossed, tone: "bg-rose-50 text-rose-600" },
  Travel: { icon: Plane, tone: "bg-sky-50 text-sky-600" },
  Wellness: { icon: HeartPulse, tone: "bg-emerald-50 text-emerald-600" },
  Belanja: { icon: ShoppingBag, tone: "bg-violet-50 text-violet-600" },
  Transport: { icon: Car, tone: "bg-indigo-50 text-indigo-600" },
  Pemasukan: { icon: Wallet, tone: "bg-emerald-50 text-emerald-600" },
  "Auto-Save": { icon: PiggyBank, tone: "bg-cyan-50 text-cyan-700" }
};
function CategoryIcon({ category, size = 40 }) {
  const entry = MAP[category] ?? { icon: Receipt, tone: "bg-slate-50 text-slate-600" };
  const Icon = entry.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl flex items-center justify-center ${entry.tone}`, style: { width: size, height: size }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-1/2 h-1/2", strokeWidth: 2.2 }) });
}
const categoryColor = (category) => {
  switch (category) {
    case "Kafe":
      return "#F59E0B";
    case "Makanan":
      return "#F43F5E";
    case "Travel":
      return "#0EA5E9";
    case "Wellness":
      return "#10B981";
    case "Belanja":
      return "#8B5CF6";
    case "Transport":
      return "#6366F1";
    default:
      return "#94A3B8";
  }
};
export {
  CategoryIcon as C,
  categoryColor as c
};
