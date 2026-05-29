import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useHabitStore, f as formatIDR } from "./useHabitStore-IJOTKh8d.mjs";
import { c as categoryColor, C as CategoryIcon } from "./CategoryIcon-CgTeZTdH.mjs";
import { N as NudgeIcon } from "./NudgeIcon-DTV2Df68.mjs";
import { u as Sparkles, x as TrendingUp, g as ChevronLeft, h as ChevronRight, c as ArrowRight, T as Target, W as Wallet } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { R as ResponsiveContainer, d as PieChart, P as Pie, c as Cell, T as Tooltip, a as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, A as Area } from "../_libs/recharts.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zustand.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const CATEGORY_DATA = [{
  name: "Makanan",
  value: 21e5
}, {
  name: "Travel",
  value: 185e4
}, {
  name: "Belanja",
  value: 68e4
}, {
  name: "Wellness",
  value: 45e4
}, {
  name: "Kafe",
  value: 42e4
}, {
  name: "Transport",
  value: 32e4
}];
const TREND_DATA = [{
  m: "Des",
  in: 11.5,
  out: 8.2
}, {
  m: "Jan",
  in: 12,
  out: 7.8
}, {
  m: "Feb",
  in: 12.5,
  out: 9.1
}, {
  m: "Mar",
  in: 12.5,
  out: 8.4
}, {
  m: "Apr",
  in: 13,
  out: 9.6
}, {
  m: "Mei",
  in: 12.5,
  out: 5.8
}];
const TOP_MERCHANTS = [{
  name: "Janji Jiwa",
  category: "Kafe",
  visits: 8,
  total: 304e3
}, {
  name: "GoFood",
  category: "Makanan",
  visits: 12,
  total: 85e4
}, {
  name: "Grab",
  category: "Transport",
  visits: 18,
  total: 32e4
}, {
  name: "AirAsia",
  category: "Travel",
  visits: 1,
  total: 185e4
}, {
  name: "Tokopedia",
  category: "Belanja",
  visits: 4,
  total: 48e4
}];
function InsightPage() {
  const navigate = useNavigate();
  const [slide, setSlide] = reactExports.useState(0);
  const showNudge = useHabitStore((s) => s.showNudge);
  const slides = [/* @__PURE__ */ jsxRuntimeExports.jsx(ProfilingSlide, {}, "0"), /* @__PURE__ */ jsxRuntimeExports.jsx(SpendingSlide, {}, "1"), /* @__PURE__ */ jsxRuntimeExports.jsx(AllocationSlide, {}, "2")];
  const totalSpend = CATEGORY_DATA.reduce((a, b) => a + b.value, 0);
  const habitScore = 78;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black", children: "Insight" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-5", children: "Pola masa lalu · Past dimension" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => alert("Habit Score breakdown:\n• Saving Rate: 82%\n• Budget Adherence: 71%\n• Goal Progress: 80%"), className: "w-full text-left rounded-3xl bg-gradient-to-br from-[var(--navy)] to-[var(--navy-soft)] text-white p-5 mb-5 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-white/60 font-semibold", children: "Habit Score" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-cyan-300" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl font-black", children: habitScore }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/70 pb-2", children: "/ 100" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-xs text-cyan-300 flex items-center gap-1 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }),
          " +6 vs bulan lalu"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Saving", v: 82 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Budget", v: 71 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Goal", v: 80 })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden bg-card border border-border mb-5 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        x: 30
      }, animate: {
        opacity: 1,
        x: 0
      }, exit: {
        opacity: 0,
        x: -30
      }, transition: {
        duration: 0.3
      }, className: "p-5 min-h-[260px]", children: slides[slide] }, slide) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSlide((s) => Math.max(0, s - 1)), disabled: slide === 0, className: "p-1.5 rounded-full bg-muted disabled:opacity-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: slides.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 rounded-full transition-all ${i === slide ? "w-6 bg-primary" : "w-1.5 bg-muted"}` }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSlide((s) => Math.min(slides.length - 1, s + 1)), disabled: slide === slides.length - 1, className: "p-1.5 rounded-full bg-muted disabled:opacity-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-5 mb-5 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-bold", children: "Spending Breakdown" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: formatIDR(totalSpend) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: "Mei 2026" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44 -mx-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: CATEGORY_DATA, dataKey: "value", innerRadius: 48, outerRadius: 75, paddingAngle: 2, stroke: "none", children: CATEGORY_DATA.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: categoryColor(c.name) }, c.name)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          fontSize: 12
        }, formatter: (v) => formatIDR(v) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 mt-2", children: CATEGORY_DATA.map((c) => {
        const pct = Math.round(c.value / totalSpend * 100);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
          to: "/insight/$category",
          params: {
            category: c.name
          }
        }), className: "w-full flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-muted/60 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full", style: {
            background: categoryColor(c.name)
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold flex-1 text-left", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            pct,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold w-24 text-right", children: formatIDR(c.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground" })
        ] }, c.name);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-5 mb-5 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-bold", children: "Tren 6 Bulan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold", children: "Pemasukan vs Pengeluaran (Rp jt)" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44 -mx-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: TREND_DATA, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gIn", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#10B981", stopOpacity: 0.35 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#10B981", stopOpacity: 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gOut", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#FF8500", stopOpacity: 0.35 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#FF8500", stopOpacity: 0 })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "#f1f5f9", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "m", stroke: "#94a3b8", fontSize: 11, axisLine: false, tickLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#94a3b8", fontSize: 11, axisLine: false, tickLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "in", stroke: "#10B981", strokeWidth: 2, fill: "url(#gIn)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "out", stroke: "#FF8500", strokeWidth: 2, fill: "url(#gOut)" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold mb-3", children: "Top Merchants" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card border border-border divide-y divide-border shadow-[var(--shadow-soft)]", children: TOP_MERCHANTS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
        to: "/insight/$category",
        params: {
          category: m.category
        }
      }), className: "w-full flex items-center gap-3 p-3 text-left hover:bg-muted/40 first:rounded-t-2xl last:rounded-b-2xl transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryIcon, { category: m.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: m.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
            m.category,
            " · ",
            m.visits,
            "x"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", children: formatIDR(m.total) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
      ] }, m.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl p-5 bg-gradient-to-br from-primary/10 via-card to-card border border-primary/30 mb-5 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
        " Smart Recommendation"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NudgeIcon, { iconKey: "heart-pulse", size: "md", tone: "primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold mb-1", children: "Pola wellness terdeteksi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pendaftaran marathon + 3 sesi olahraga minggu ini. Buat goal Marathon Jakarta dengan auto-transfer Rp 500.000/bulan." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => showNudge("wellness"), className: "w-full rounded-2xl bg-primary text-primary-foreground font-bold py-3 text-sm flex items-center justify-center gap-2", children: [
        "Set goal & budget ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold mb-3", children: "Pattern Detection" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PatternRow, { iconKey: "plane", title: "Travel pattern", desc: "3 trip terdeteksi 6 bulan terakhir", onClick: () => showNudge("travel") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PatternRow, { iconKey: "coffee", title: "Kafe rutin", desc: "Rata-rata 7x/minggu · tren naik", onClick: () => showNudge("cafe_qris") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PatternRow, { iconKey: "utensils", title: "Food delivery", desc: "Rp 2,1 jt bulan ini · over budget", onClick: () => showNudge("high_food") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/nudges", className: "block text-center text-xs font-semibold text-primary py-3", children: "Lihat semua riwayat nudge →" })
  ] });
}
function Mini({
  label,
  v
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-white/10 p-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-white/60 uppercase tracking-wide font-semibold", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-base font-black mt-0.5", children: [
      v,
      "%"
    ] })
  ] });
}
function ProfilingSlide() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-primary font-bold mb-2", children: "Your Spending DNA" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black mb-2", children: "Urban Explorer" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Kamu termasuk 12% pengguna wondr yang aktif eksplor kota, suka kopi specialty, dan rutin traveling tiap quarter." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Target, label: "Total trx", value: "142" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Wallet, label: "Avg/hari", value: "4.7" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: TrendingUp, label: "Streak", value: "23 hari" })
    ] })
  ] });
}
function SpendingSlide() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-primary font-bold mb-2", children: "Top Preference" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-4", children: "Kategori favoritmu" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: CATEGORY_DATA.slice(0, 4).map((c) => {
      const total = CATEGORY_DATA.reduce((a, b) => a + b.value, 0);
      const pct = Math.round(c.value / total * 100);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
            pct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          width: 0
        }, animate: {
          width: `${pct * 2}%`
        }, className: "h-full", style: {
          background: categoryColor(c.name)
        } }) })
      ] }, c.name);
    }) })
  ] });
}
function AllocationSlide() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-primary font-bold mb-2", children: "Allocation Trend" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-3", children: "Pengeluaran 6 bulan" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 -mx-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: TREND_DATA, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gA", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#FF8500", stopOpacity: 0.4 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#FF8500", stopOpacity: 0 })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "m", stroke: "#94a3b8", fontSize: 11, axisLine: false, tickLine: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        fontSize: 12
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "out", stroke: "#FF8500", strokeWidth: 2, fill: "url(#gA)" })
    ] }) }) })
  ] });
}
function Stat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 mx-auto text-primary mb-1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-black text-foreground", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: label })
  ] });
}
function PatternRow({
  iconKey,
  title,
  desc,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: "w-full flex items-center gap-3 rounded-2xl bg-card border border-border p-3 text-left active:scale-[0.98] hover:border-primary/30 transition shadow-[var(--shadow-soft)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NudgeIcon, { iconKey, size: "md", tone: "accent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: desc })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground" })
  ] });
}
export {
  InsightPage as component
};
