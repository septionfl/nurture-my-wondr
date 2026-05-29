import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useHabitStore, f as formatIDR, N as NUDGES, a as formatRelative } from "./useHabitStore-IJOTKh8d.mjs";
import { N as NudgeIcon } from "./NudgeIcon-DTV2Df68.mjs";
import { a as ArrowLeft, u as Sparkles, f as Check, X, k as Eye } from "../_libs/lucide-react.mjs";
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
function NudgesPage() {
  const navigate = useNavigate();
  const history = useHabitStore((s) => s.nudgeHistory);
  const showNudge = useHabitStore((s) => s.showNudge);
  const [filter, setFilter] = reactExports.useState("all");
  const stats = reactExports.useMemo(() => {
    const shown = history.length;
    const accepted = history.filter((h) => h.action === "accepted").length;
    const dismissed = history.filter((h) => h.action === "dismissed").length;
    const moved = history.filter((h) => h.action === "accepted" && h.amount).reduce((a, h) => a + (h.amount ?? 0), 0);
    const rate = shown ? Math.round(accepted / Math.max(shown, 1) * 100) : 0;
    return {
      shown,
      accepted,
      dismissed,
      moved,
      rate
    };
  }, [history]);
  const filtered = history.filter((h) => filter === "all" ? true : h.action === filter);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
      to: "/dashboard"
    }), className: "flex items-center gap-2 text-sm font-semibold mb-4 -ml-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
      " Beranda"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black", children: "Riwayat Nudge" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-5", children: "Semua interaksi engine wondr" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-gradient-to-br from-[var(--navy)] to-[var(--navy-soft)] text-white p-5 mb-5 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-wider text-cyan-300 font-bold mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
        " Engine Performance"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black", children: stats.shown }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-white/60 uppercase tracking-wide", children: "Total nudge" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-black", children: [
            stats.rate,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-white/60 uppercase tracking-wide", children: "Acceptance" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-black", children: formatIDR(stats.moved) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-white/60 uppercase tracking-wide", children: "Auto-transfer" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-4", children: [{
      k: "all",
      l: `Semua (${stats.shown})`
    }, {
      k: "accepted",
      l: `Diterima (${stats.accepted})`
    }, {
      k: "dismissed",
      l: `Dilewati (${stats.dismissed})`
    }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(f.k), className: `px-3 py-1.5 rounded-full text-xs font-semibold border transition ${filter === f.k ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border text-muted-foreground"}`, children: f.l }, f.k)) }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card border border-border p-8 text-center text-sm text-muted-foreground", children: "Belum ada nudge di kategori ini." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filtered.map((h) => {
      const n = NUDGES[h.key];
      const badge = h.action === "accepted" ? {
        text: "Diterima",
        cls: "bg-emerald-50 text-emerald-700",
        Icon: Check
      } : h.action === "dismissed" ? {
        text: "Dilewati",
        cls: "bg-rose-50 text-rose-700",
        Icon: X
      } : {
        text: "Dilihat",
        cls: "bg-slate-100 text-slate-600",
        Icon: Eye
      };
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => showNudge(h.key), className: "w-full text-left rounded-2xl bg-card border border-border p-4 flex items-start gap-3 hover:border-primary/30 transition shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NudgeIcon, { iconKey: n.iconKey, size: "md", tone: "accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold truncate", children: n.headline }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badge.cls}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(badge.Icon, { className: "w-2.5 h-2.5" }),
              " ",
              badge.text
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground line-clamp-2", children: n.body }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: formatRelative(h.timestamp) }),
            h.amount && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-primary", children: formatIDR(h.amount) })
          ] })
        ] })
      ] }, h.id);
    }) })
  ] });
}
export {
  NudgesPage as component
};
