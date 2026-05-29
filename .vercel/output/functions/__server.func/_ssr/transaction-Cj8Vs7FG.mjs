import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useHabitStore, f as formatIDR } from "./useHabitStore-IJOTKh8d.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { a as ArrowLeft, Q as QrCode, S as Send, R as Receipt, t as Smartphone, u as Sparkles, L as Lock, i as CircleCheck, X, j as Coffee, y as UtensilsCrossed, c as ArrowRight } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/zustand.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function MicroBudgetCard({ category, monthlyTotal, visitCount, suggestAmount, goalName, iconKey }) {
  const accept = useHabitStore((s) => s.acceptMicroBudget);
  const navigate = useNavigate();
  const [state, setState] = reactExports.useState("prompt");
  const [remaining, setRemaining] = reactExports.useState(0);
  const Icon = iconKey === "coffee" ? Coffee : UtensilsCrossed;
  const handleAccept = () => {
    accept(category, suggestAmount, goalName, iconKey);
    setRemaining(suggestAmount);
    setState("done");
  };
  if (state === "skipped") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      className: "rounded-2xl border-2 p-4 text-left",
      style: {
        background: state === "done" ? "var(--wondr-lime)" : "color-mix(in oklab, var(--wondr-teal) 12%, white)",
        borderColor: state === "done" ? "var(--wondr-black)" : "var(--wondr-teal)"
      },
      children: [
        state === "prompt" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em]", style: { color: "var(--wondr-teal-deep)" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
              " Smart Insight"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl flex items-center justify-center text-white", style: { background: "var(--wondr-teal)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[15px] font-black leading-snug mb-1", children: [
            "Kamu sudah habis ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--wondr-teal-deep)" }, children: formatIDR(monthlyTotal) }),
            " di ",
            category,
            " bulan ini."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-medium mb-3", children: [
            visitCount,
            "x transaksi. Kunci sisa budget jajanmu di kantong ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: goalName }),
            " biar nggak overbudget."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: handleAccept,
                className: "flex-1 rounded-xl py-3 font-black text-white text-sm flex items-center justify-center gap-1.5",
                style: { background: "var(--wondr-teal-deep)" },
                children: [
                  "Buat Limit ",
                  formatIDR(suggestAmount),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setState("skipped"),
                className: "px-4 py-3 rounded-xl text-xs font-bold text-muted-foreground",
                children: "Lewati"
              }
            )
          ] })
        ] }),
        state === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center", style: { background: "var(--wondr-black)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5", style: { color: "var(--wondr-lime)" } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-wider", children: "Kantong aktif" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-black leading-tight", children: goalName })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold mb-3", style: { color: "var(--wondr-black)" }, children: [
            "Sisa kantong ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: formatIDR(remaining) }),
            ". Transaksi ",
            category,
            " berikutnya otomatis dipotong dari sini, bukan saldo utama."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => navigate({ to: "/growth" }),
              className: "rounded-xl px-4 py-2 text-xs font-black text-white",
              style: { background: "var(--wondr-black)" },
              children: "Lihat kantong →"
            }
          )
        ] })
      ]
    },
    state
  ) });
}
function TransactionPage() {
  const [stage, setStage] = reactExports.useState("menu");
  const [scenario, setScenario] = reactExports.useState("cafe");
  const [comingSoon, setComingSoon] = reactExports.useState(null);
  const [routedResult, setRoutedResult] = reactExports.useState(null);
  const addTransaction = useHabitStore((s) => s.addTransaction);
  const transactions = useHabitStore((s) => s.transactions);
  const merchant = scenario === "cafe" ? {
    name: "Janji Jiwa Kemang",
    category: "Kafe",
    amount: 38e3,
    label: "Kopi Janji Jiwa"
  } : {
    name: "GoFood — Padang Sederhana",
    category: "Makanan",
    amount: 65e3,
    label: "GoFood Padang"
  };
  const startScan = (s) => {
    setScenario(s);
    setStage("scanning");
    setTimeout(() => setStage("confirm"), 1400);
  };
  const confirmPay = () => {
    const result = addTransaction({
      id: `t${Date.now()}`,
      label: merchant.label,
      category: merchant.category,
      amount: -merchant.amount,
      time: "Baru saja"
    });
    setRoutedResult(result);
    setStage("success");
  };
  const categoryCount = transactions.filter((t) => t.category === merchant.category).length;
  const categoryTotal = Math.abs(transactions.filter((t) => t.category === merchant.category).reduce((s, t) => s + t.amount, 0));
  const showMicroBudget = stage === "success" && !routedResult?.routed && categoryCount >= 1;
  const microConfig = scenario === "cafe" ? {
    suggestAmount: 3e5,
    goalName: "Budget Kopi",
    iconKey: "coffee"
  } : {
    suggestAmount: 5e5,
    goalName: "Budget Makanan",
    iconKey: "utensils"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
      stage !== "menu" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        setStage("menu");
        setRoutedResult(null);
      }, className: "p-2 -ml-2 rounded-full hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black", children: "Transaction" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-6", children: "Aktivitas saat ini · Present dimension" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
      stage === "menu" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, exit: {
        opacity: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionTile, { icon: QrCode, label: "QRIS", desc: "Scan & bayar", onClick: () => startScan("cafe"), primary: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionTile, { icon: Send, label: "Transfer", desc: "Antar bank", onClick: () => setComingSoon("Transfer antar bank") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionTile, { icon: Receipt, label: "Bill Pay", desc: "Listrik, air, internet", onClick: () => setComingSoon("Bill Pay") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionTile, { icon: Smartphone, label: "Pulsa & Data", desc: "Top up cepat", onClick: () => setComingSoon("Pulsa & Data") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border-2 border-border p-4 shadow-[var(--shadow-soft)] mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] font-black uppercase tracking-wider mb-2", style: {
            color: "var(--wondr-orange)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
            " Demo Habit Trigger"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Coba skenario QRIS untuk melihat Micro-Budgeting Nudge dan Goal Re-routing." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => startScan("cafe"), className: "w-full text-left rounded-xl bg-muted p-3 border-2 border-border hover:border-[color:var(--wondr-orange)] transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black", children: "Bayar kopi di Janji Jiwa" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground font-semibold", children: "Trigger: Micro-Budget Kafe" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => startScan("food"), className: "w-full text-left rounded-xl bg-muted p-3 border-2 border-border hover:border-[color:var(--wondr-orange)] transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black", children: "Bayar GoFood Padang" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground font-semibold", children: "Trigger: Micro-Budget Makanan" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black mb-3", children: "Riwayat transaksi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card border-2 border-border divide-y divide-border shadow-[var(--shadow-soft)]", children: transactions.slice(0, 6).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => alert(`${t.label}
${t.category} · ${t.time}
${formatIDR(t.amount)}${t.routed ? "\n\n(Dibayar dari kantong goal)" : ""}`), className: "w-full flex items-center justify-between p-3 text-left hover:bg-muted/40 first:rounded-t-2xl last:rounded-b-2xl transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-bold flex items-center gap-1.5", children: [
              t.label,
              t.routed && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3", style: {
                color: "var(--wondr-teal-deep)"
              } })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground font-semibold", children: [
              t.category,
              " · ",
              t.time
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-sm font-black ${t.amount > 0 ? "text-emerald-600" : "text-foreground"}`, children: [
            t.amount > 0 ? "+" : "",
            formatIDR(t.amount)
          ] })
        ] }, t.id)) })
      ] }, "menu"),
      stage === "scanning" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, className: "text-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-64 h-64 mx-auto rounded-3xl border-2 border-primary bg-card overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute left-0 right-0 h-1 bg-primary", animate: {
            top: ["0%", "100%", "0%"]
          }, transition: {
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-32 h-32 text-primary/40 absolute inset-0 m-auto" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm text-muted-foreground", children: "Memindai QRIS…" })
      ] }, "scan"),
      stage === "confirm" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border-2 border-border p-5 mb-4 shadow-[var(--shadow-card)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-black mb-1", children: "Bayar ke" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-black", children: merchant.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mb-4", children: [
            merchant.category,
            " · QRIS"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Nominal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-black", children: formatIDR(merchant.amount) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: confirmPay, className: "w-full rounded-2xl py-4 text-white font-black shadow-[var(--shadow-premium)]", style: {
          background: "var(--wondr-orange)"
        }, children: "Bayar sekarang" })
      ] }, "confirm"),
      stage === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        scale: 0.98,
        opacity: 0
      }, animate: {
        scale: 1,
        opacity: 1
      }, className: "pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
            scale: 0
          }, animate: {
            scale: 1
          }, transition: {
            type: "spring",
            damping: 12
          }, className: "w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-emerald-600", strokeWidth: 2.5 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Transaksi berhasil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
            formatIDR(merchant.amount),
            " ke ",
            merchant.name
          ] })
        ] }),
        routedResult?.routed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-4 mb-3 text-white", style: {
          background: "var(--wondr-black)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] mb-1.5", style: {
            color: "var(--wondr-lime)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5" }),
            " Dibayar dari kantong"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold leading-snug", children: [
            "Dana ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: formatIDR(merchant.amount) }),
            " diambil dari kantong ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: routedResult.goalName }),
            ". Sisa kantong ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: formatIDR(routedResult.remaining ?? 0) }),
            "."
          ] })
        ] }),
        showMicroBudget && /* @__PURE__ */ jsxRuntimeExports.jsx(MicroBudgetCard, { category: merchant.category, monthlyTotal: categoryTotal, visitCount: categoryCount, suggestAmount: microConfig.suggestAmount, goalName: microConfig.goalName, iconKey: microConfig.iconKey }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setStage("menu");
          setRoutedResult(null);
        }, className: "mt-5 w-full rounded-2xl bg-muted py-3 text-sm font-black", children: "Selesai" })
      ] }, "success")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: comingSoon && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, exit: {
      opacity: 0
    }, onClick: () => setComingSoon(null), className: "fixed inset-0 z-50 flex items-end justify-center bg-[var(--navy)]/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      y: 300
    }, animate: {
      y: 0
    }, exit: {
      y: 300
    }, onClick: (e) => e.stopPropagation(), className: "w-full max-w-md rounded-t-3xl bg-background p-6 pb-8 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black", children: comingSoon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setComingSoon(null), className: "p-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Fitur ini akan tersedia di rilis berikutnya. Sementara, lanjutkan demo QRIS untuk melihat trigger Micro-Budget." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setComingSoon(null), className: "w-full rounded-2xl bg-primary text-primary-foreground font-black py-3.5", children: "Mengerti" })
    ] }) }) })
  ] });
}
function ActionTile({
  icon: Icon,
  label,
  desc,
  onClick,
  primary
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: `rounded-2xl border-2 p-4 flex flex-col items-start gap-2 active:scale-95 transition text-left ${primary ? "bg-gradient-to-br from-primary/10 to-card border-primary/30" : "bg-card border-border hover:border-primary/30"} shadow-[var(--shadow-soft)]`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-6 h-6 ${primary ? "text-primary" : "text-[var(--navy)]"}`, strokeWidth: 2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground font-semibold", children: desc })
    ] })
  ] });
}
export {
  TransactionPage as component
};
