import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useHabitStore, f as formatIDR } from "./useHabitStore-IJOTKh8d.mjs";
import { N as NudgeIcon } from "./NudgeIcon-DTV2Df68.mjs";
import { P as PiggyBank, p as Plus, E as Earth, w as TrendingDown, x as TrendingUp, h as ChevronRight, u as Sparkles, X, q as Repeat } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import "../_libs/zustand.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const RATES = [{
  code: "USD",
  country: "Amerika Serikat",
  rate: 15420,
  change: -0.8,
  hint: "Terendah 7 hari"
}, {
  code: "SGD",
  country: "Singapura",
  rate: 11890,
  change: 0.2
}, {
  code: "MYR",
  country: "Malaysia",
  rate: 3450,
  change: -0.3
}, {
  code: "JPY",
  country: "Jepang",
  rate: 102,
  change: 1.1
}];
function GrowthPage() {
  const goals = useHabitStore((s) => s.goals);
  const transactions = useHabitStore((s) => s.transactions);
  const showNudge = useHabitStore((s) => s.showNudge);
  const toggleAuto = useHabitStore((s) => s.toggleAutoTransfer);
  const topUpGoal = useHabitStore((s) => s.topUpGoal);
  const [showRecurring, setShowRecurring] = reactExports.useState(false);
  const [showNewGoal, setShowNewGoal] = reactExports.useState(false);
  const [detailGoal, setDetailGoal] = reactExports.useState(null);
  const [rateDetail, setRateDetail] = reactExports.useState(null);
  const autoTxns = transactions.filter((t) => t.auto);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black", children: "Growth" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-5", children: "Perencanaan masa depan · Future dimension" }),
    autoTxns.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-gradient-to-br from-accent/10 via-card to-card border border-accent/30 p-5 mb-5 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-wider text-accent font-bold mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PiggyBank, { className: "w-3.5 h-3.5" }),
        " Auto-Transfer Aktif"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: autoTxns.slice(0, 3).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => alert(`${t.label}
${t.time}
${formatIDR(t.amount)}`), className: "w-full flex items-center justify-between rounded-xl bg-background/60 p-2.5 text-left hover:bg-background transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold", children: t.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: t.time })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-accent", children: formatIDR(Math.abs(t.amount)) })
      ] }, t.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold", children: "Tabungan Perencanaan (Tapenas)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowNewGoal(true), className: "text-xs flex items-center gap-1 text-primary font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
        " Baru"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-6", children: goals.map((g) => {
      const pct = Math.round(g.current / g.target * 100);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDetailGoal(g), className: "w-full text-left rounded-2xl bg-card border border-border p-4 hover:border-primary/40 transition shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(NudgeIcon, { iconKey: g.iconKey, size: "md", tone: "accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", children: g.name }),
                g.locked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black uppercase tracking-wider text-white px-1.5 py-0.5 rounded", style: {
                  background: "var(--wondr-black)"
                }, children: "Locked" }),
                g.createdFrom === "payday" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded", style: {
                  background: "var(--wondr-teal)",
                  color: "var(--wondr-black)"
                }, children: "Shield" }),
                g.routedCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded", style: {
                  background: "var(--wondr-lime)",
                  color: "var(--wondr-black)"
                }, children: [
                  "Routed · ",
                  g.routedCategory
                ] }),
                g.autoTransfer && !g.locked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-1.5 py-0.5 rounded", children: "Auto" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
                formatIDR(g.current),
                " / ",
                formatIDR(g.target)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-black text-primary", children: [
            pct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          width: 0
        }, animate: {
          width: `${pct}%`
        }, className: "h-full rounded-full bg-gradient-to-r from-primary to-orange-500" }) })
      ] }, g.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-gradient-to-br from-[var(--navy)] to-[var(--navy-soft)] text-white p-5 mb-5 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-cyan-300 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { className: "w-3.5 h-3.5" }),
        " Multicurrency Wallet"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold mb-1", children: "Your Financial Passport" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70 mb-4", children: "Untuk traveler & diaspora — transaksi mata uang asing tanpa biaya konversi tinggi." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: RATES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setRateDetail(r), className: "w-full flex items-center justify-between rounded-xl bg-white/10 hover:bg-white/15 p-2.5 transition text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold", children: [
            r.code,
            "/IDR · ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 font-normal", children: r.country })
          ] }),
          r.hint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-cyan-300 mt-0.5", children: r.hint })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-bold", children: [
              "Rp ",
              r.rate.toLocaleString("id-ID")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-[10px] flex items-center gap-0.5 justify-end font-semibold ${r.change < 0 ? "text-cyan-300" : "text-orange-300"}`, children: [
              r.change < 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }),
              Math.abs(r.change),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-white/50" })
        ] })
      ] }, r.code)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => showNudge("travel"), className: "rounded-xl bg-primary text-primary-foreground font-bold py-2.5 text-xs", children: "Aktifkan wallet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => showNudge("diaspora_rate"), className: "rounded-xl bg-white/15 text-white font-semibold py-2.5 text-xs", children: "Set rate alert" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-wider text-primary font-bold mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
        " Behavioral Loop"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Setiap transaksi jadi data baru untuk engine. Semakin sering pakai wondr, rekomendasi makin presisi." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GoalDetailSheet, { goal: detailGoal, onClose: () => setDetailGoal(null), onTopUp: (amt) => detailGoal && topUpGoal(detailGoal.id, amt), onToggleAuto: () => detailGoal && toggleAuto(detailGoal.id) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RateDetailSheet, { rate: rateDetail, onClose: () => setRateDetail(null), onAlert: () => {
      setRateDetail(null);
      showNudge("diaspora_rate");
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RecurringModal, { open: showRecurring, onClose: () => setShowRecurring(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewGoalModal, { open: showNewGoal, onClose: () => setShowNewGoal(false) })
  ] });
}
function GoalDetailSheet({
  goal,
  onClose,
  onTopUp,
  onToggleAuto
}) {
  const [amount, setAmount] = reactExports.useState(5e5);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: goal && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, exit: {
    opacity: 0
  }, onClick: onClose, className: "fixed inset-0 z-50 flex items-end justify-center bg-[var(--navy)]/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    y: 400
  }, animate: {
    y: 0
  }, exit: {
    y: 400
  }, transition: {
    type: "spring",
    damping: 28
  }, onClick: (e) => e.stopPropagation(), className: "w-full max-w-md rounded-t-3xl bg-background border-t border-border p-6 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NudgeIcon, { iconKey: goal.iconKey, size: "md", tone: "accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: goal.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            formatIDR(goal.current),
            " / ",
            formatIDR(goal.target)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted p-3 mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold", children: "Auto-transfer dari nudge" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "Engine otomatis pindahkan dana ke goal ini" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onToggleAuto, className: `relative w-11 h-6 rounded-full transition ${goal.autoTransfer ? "bg-primary" : "bg-muted-foreground/30"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-0.5 w-5 h-5 rounded-full bg-white transition ${goal.autoTransfer ? "left-5" : "left-0.5"}` }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Top up manual" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(Number(e.target.value)), className: "w-full mt-1 mb-3 rounded-xl bg-muted border border-border p-3 font-bold" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mb-4", children: [1e5, 5e5, 1e6].map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setAmount(a), className: "rounded-lg bg-muted text-xs font-semibold py-2 hover:bg-muted/70", children: formatIDR(a) }, a)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
      onTopUp(amount);
      onClose();
    }, className: "w-full rounded-2xl bg-primary text-primary-foreground font-bold py-3.5 shadow-[var(--shadow-premium)]", children: "Top up sekarang" })
  ] }) }) });
}
function RateDetailSheet({
  rate,
  onClose,
  onAlert
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: rate && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, exit: {
    opacity: 0
  }, onClick: onClose, className: "fixed inset-0 z-50 flex items-end justify-center bg-[var(--navy)]/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    y: 400
  }, animate: {
    y: 0
  }, exit: {
    y: 400
  }, transition: {
    type: "spring",
    damping: 28
  }, onClick: (e) => e.stopPropagation(), className: "w-full max-w-md rounded-t-3xl bg-background border-t border-border p-6 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold", children: [
          rate.code,
          " · ",
          rate.country
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-black mt-1", children: [
          "Rp ",
          rate.rate.toLocaleString("id-ID")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-xs font-semibold ${rate.change < 0 ? "text-emerald-600" : "text-rose-600"}`, children: [
          rate.change < 0 ? "▼" : "▲",
          " ",
          Math.abs(rate.change),
          "% hari ini"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onAlert, className: "w-full rounded-2xl bg-primary text-primary-foreground font-bold py-3.5", children: "Pasang rate alert" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "w-full rounded-2xl bg-muted font-semibold py-3.5", children: "Tukar nanti" })
    ] })
  ] }) }) });
}
function RecurringModal({
  open,
  onClose
}) {
  const [amount, setAmount] = reactExports.useState(5e5);
  const [freq, setFreq] = reactExports.useState("weekly");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, exit: {
    opacity: 0
  }, onClick: onClose, className: "fixed inset-0 z-50 flex items-end justify-center bg-[var(--navy)]/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    y: 400
  }, animate: {
    y: 0
  }, exit: {
    y: 400
  }, transition: {
    type: "spring",
    damping: 28
  }, onClick: (e) => e.stopPropagation(), className: "w-full max-w-md rounded-t-3xl bg-background border-t border-border p-6 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Repeat, { className: "w-4 h-4" }),
        " Auto-debit recurring"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Nominal per debit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(Number(e.target.value)), className: "w-full mt-1 rounded-xl bg-muted border border-border p-3 font-bold" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Frekuensi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 mt-1", children: ["weekly", "monthly"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFreq(f), className: `rounded-xl py-2.5 text-sm font-semibold border ${freq === f ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border"}`, children: f === "weekly" ? "Mingguan" : "Bulanan" }, f)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "w-full rounded-2xl bg-primary text-primary-foreground font-bold py-3.5", children: "Aktifkan auto-debit" })
    ] })
  ] }) }) });
}
function NewGoalModal({
  open,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, exit: {
    opacity: 0
  }, onClick: onClose, className: "fixed inset-0 z-50 flex items-end justify-center bg-[var(--navy)]/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    y: 400
  }, animate: {
    y: 0
  }, exit: {
    y: 400
  }, transition: {
    type: "spring",
    damping: 28
  }, onClick: (e) => e.stopPropagation(), className: "w-full max-w-md rounded-t-3xl bg-background border-t border-border p-6 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: "Buat saving goal baru" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Nama goal (mis. Macbook Pro)", className: "w-full rounded-xl bg-muted border border-border p-3 text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Target nominal", type: "number", className: "w-full rounded-xl bg-muted border border-border p-3 text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Target tanggal", type: "date", className: "w-full rounded-xl bg-muted border border-border p-3 text-sm text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "w-full rounded-2xl bg-primary text-primary-foreground font-bold py-3.5", children: "Buat goal" })
    ] })
  ] }) }) });
}
export {
  GrowthPage as component
};
