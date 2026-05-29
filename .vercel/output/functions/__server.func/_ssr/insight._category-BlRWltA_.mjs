import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useHabitStore, f as formatIDR } from "./useHabitStore-IJOTKh8d.mjs";
import { C as CategoryIcon, c as categoryColor } from "./CategoryIcon-CgTeZTdH.mjs";
import { R as Route } from "./router-DhwQ_zzk.mjs";
import { a as ArrowLeft, x as TrendingUp, w as TrendingDown } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, b as BarChart, C as CartesianGrid, X as XAxis, T as Tooltip, B as Bar } from "../_libs/recharts.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
const WEEKLY = {
  Kafe: [{
    w: "W1",
    v: 95
  }, {
    w: "W2",
    v: 120
  }, {
    w: "W3",
    v: 80
  }, {
    w: "W4",
    v: 125
  }],
  Makanan: [{
    w: "W1",
    v: 480
  }, {
    w: "W2",
    v: 620
  }, {
    w: "W3",
    v: 510
  }, {
    w: "W4",
    v: 490
  }],
  Travel: [{
    w: "W1",
    v: 0
  }, {
    w: "W2",
    v: 1850
  }, {
    w: "W3",
    v: 0
  }, {
    w: "W4",
    v: 0
  }],
  Wellness: [{
    w: "W1",
    v: 100
  }, {
    w: "W2",
    v: 150
  }, {
    w: "W3",
    v: 100
  }, {
    w: "W4",
    v: 100
  }],
  Belanja: [{
    w: "W1",
    v: 200
  }, {
    w: "W2",
    v: 180
  }, {
    w: "W3",
    v: 150
  }, {
    w: "W4",
    v: 150
  }],
  Transport: [{
    w: "W1",
    v: 80
  }, {
    w: "W2",
    v: 90
  }, {
    w: "W3",
    v: 80
  }, {
    w: "W4",
    v: 70
  }]
};
const TOTALS = {
  Kafe: {
    now: 42e4,
    prev: 38e4
  },
  Makanan: {
    now: 21e5,
    prev: 178e4
  },
  Travel: {
    now: 185e4,
    prev: 0
  },
  Wellness: {
    now: 45e4,
    prev: 2e5
  },
  Belanja: {
    now: 68e4,
    prev: 72e4
  },
  Transport: {
    now: 32e4,
    prev: 29e4
  }
};
function CategoryDetail() {
  const {
    category
  } = Route.useParams();
  const navigate = useNavigate();
  const transactions = useHabitStore((s) => s.transactions).filter((t) => t.category === category);
  const data = WEEKLY[category] ?? [];
  const totals = TOTALS[category] ?? {
    now: 0,
    prev: 0
  };
  const delta = totals.prev === 0 ? 100 : Math.round((totals.now - totals.prev) / totals.prev * 100);
  const up = delta >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
      to: "/insight"
    }), className: "flex items-center gap-2 text-sm font-semibold mb-4 -ml-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
      " Insight"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryIcon, { category, size: 56 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black", children: category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Detail bulan ini" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-5 mb-5 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1", children: "Total Mei 2026" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-3 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-black", children: formatIDR(totals.now) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-xs pb-1.5 flex items-center gap-1 font-bold ${up ? "text-rose-600" : "text-emerald-600"}`, children: [
          up ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }),
          Math.abs(delta),
          "% vs bulan lalu"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44 -mx-2 mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "#f1f5f9", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "w", stroke: "#94a3b8", fontSize: 11, axisLine: false, tickLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          fontSize: 12
        }, formatter: (v) => `Rp ${(v * 1e3).toLocaleString("id-ID")}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "v", fill: categoryColor(category), radius: [6, 6, 0, 0] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold mb-3", children: "Transaksi terkait" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card border border-border divide-y divide-border shadow-[var(--shadow-soft)] mb-5", children: transactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 text-center text-xs text-muted-foreground", children: "Belum ada transaksi." }) : transactions.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => alert(`${t.label}
${t.time}
${formatIDR(t.amount)}`), className: "w-full flex items-center justify-between p-3 text-left hover:bg-muted/40 first:rounded-t-2xl last:rounded-b-2xl transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: t.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: t.time })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-sm font-bold ${t.amount > 0 ? "text-emerald-600" : "text-foreground"}`, children: [
        t.amount > 0 ? "+" : "",
        formatIDR(t.amount)
      ] })
    ] }, t.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/growth", className: "block w-full rounded-2xl bg-primary text-primary-foreground font-bold py-3.5 text-center text-sm shadow-[var(--shadow-premium)] mb-3", children: [
      "Buat budget untuk ",
      category
    ] })
  ] });
}
export {
  CategoryDetail as component
};
