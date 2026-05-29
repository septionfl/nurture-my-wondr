import { j as jsxRuntimeExports, r as reactExports } from "./_libs/react.mjs";
import { O as Outlet, L as Link, u as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { M as MobileShell } from "./_ssr/router-DhwQ_zzk.mjs";
import { u as useHabitStore, P as PERSONAS, f as formatIDR } from "./_ssr/useHabitStore-IJOTKh8d.mjs";
import { N as NudgeIcon } from "./_ssr/NudgeIcon-DTV2Df68.mjs";
import { n as House, b as ArrowLeftRight, e as ChartColumn, x as TrendingUp, u as Sparkles, X, r as ShieldCheck, c as ArrowRight, i as CircleCheck } from "./_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "./_libs/framer-motion.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/zustand.mjs";
import "./_libs/motion-dom.mjs";
import "./_libs/motion-utils.mjs";
const tabs = [
  { to: "/dashboard", label: "Home", icon: House },
  { to: "/transaction", label: "Transaksi", icon: ArrowLeftRight },
  { to: "/insight", label: "Insight", icon: ChartColumn },
  { to: "/growth", label: "Growth", icon: TrendingUp }
];
function BottomNav() {
  return (
    /* TAMBAHKAN md:bottom-4 DI SINI */
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed bottom-0 md:bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md z-40 px-3 pb-3 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-white border border-border shadow-[var(--shadow-elevated)] pointer-events-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4", children: tabs.map(({ to, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to,
        className: "flex flex-col items-center justify-center py-3 text-muted-foreground transition-colors",
        activeProps: { className: "text-[color:var(--wondr-orange)]" },
        children: ({ isActive }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 mb-1", strokeWidth: 2.2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-wide", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "h-1 mt-1 rounded-full transition-all",
              style: {
                width: isActive ? 18 : 0,
                background: "var(--wondr-teal)"
              }
            }
          )
        ] })
      },
      to
    )) }) }) })
  );
}
function SmartNudgeModal() {
  const nudge = useHabitStore((s) => s.pendingNudge);
  const dismiss = useHabitStore((s) => s.dismissNudge);
  const accept = useHabitStore((s) => s.acceptNudge);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: nudge && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-end justify-center bg-[var(--navy)]/40 backdrop-blur-sm",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: dismiss,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { y: 400 },
          animate: { y: 0 },
          exit: { y: 400 },
          transition: { type: "spring", damping: 28, stiffness: 280 },
          onClick: (e) => e.stopPropagation(),
          className: "w-full max-w-md rounded-t-3xl bg-background text-foreground p-6 pb-8 shadow-[var(--shadow-elevated)] border-t border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
                "Smart Nudge"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: dismiss,
                  className: "rounded-full p-1.5 hover:bg-muted transition-colors",
                  "aria-label": "Tutup",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(NudgeIcon, { iconKey: nudge.iconKey, size: "lg", tone: "primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold leading-tight mt-4 mb-2", children: nudge.headline }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-6", children: nudge.body }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: accept,
                  className: "w-full rounded-2xl bg-primary text-primary-foreground font-bold py-4 text-base shadow-[var(--shadow-premium)] active:scale-[0.98] transition",
                  children: nudge.primaryCta
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: dismiss,
                  className: "w-full rounded-2xl bg-transparent text-muted-foreground hover:text-foreground font-medium py-3 text-sm transition-colors",
                  children: nudge.secondaryCta
                }
              )
            ] })
          ]
        }
      )
    }
  ) });
}
function PaydayShieldModal() {
  const open = useHabitStore((s) => s.paydayShieldOpen);
  const dismiss = useHabitStore((s) => s.dismissPaydayShield);
  const accept = useHabitStore((s) => s.acceptPaydayShield);
  const persona = useHabitStore((s) => s.persona);
  const profile = PERSONAS[persona];
  const navigate = useNavigate();
  const [done, setDone] = reactExports.useState(null);
  const handleAccept = () => {
    const r = accept();
    setDone({ amount: r.amount });
  };
  const close = () => {
    setDone(null);
    dismiss();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-[60] bg-white flex flex-col",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -right-20 w-72 h-72 rounded-full", style: { background: "var(--wondr-orange)", opacity: 0.18 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-32 -left-16 w-56 h-56 rounded-full", style: { background: "var(--wondr-teal)", opacity: 0.18 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-10 right-10 w-40 h-40 rounded-full", style: { background: "var(--wondr-lime)", opacity: 0.25 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between px-5 pt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]", style: { color: "var(--wondr-orange-deep)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
            " Payday detected"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: close, className: "p-2 rounded-full hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1 px-6 pb-8 flex flex-col", children: !done ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "flex-1 flex flex-col",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center my-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { scale: 0.7, rotate: -8 },
                  animate: { scale: 1, rotate: 0 },
                  transition: { type: "spring", damping: 14 },
                  className: "w-28 h-28 rounded-3xl flex items-center justify-center shadow-[var(--shadow-elevated)] relative",
                  style: { background: "linear-gradient(135deg, var(--wondr-orange), var(--wondr-teal))" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-14 h-14 text-white", strokeWidth: 2.2 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "absolute -top-2 -right-2 w-6 h-6", style: { color: "var(--wondr-lime)" }, fill: "currentColor" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[26px] font-black leading-tight tracking-tight mb-2", children: profile.shieldHeadline }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium leading-relaxed mb-5", children: profile.shieldBody }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border-2 border-border bg-card p-4 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider font-black text-muted-foreground", children: persona === "wanda" ? "Pos rumah tangga" : "Rincian shield" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-black", style: { color: "var(--wondr-orange)" }, children: formatIDR(profile.shieldAmount) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: profile.shieldBreakdown.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full", style: { background: "var(--wondr-teal)" } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: b.label })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-muted-foreground", children: formatIDR(b.amount) })
                ] }, b.label)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground mb-5 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3", style: { color: "var(--wondr-orange)" } }),
                "Berdasarkan rata-rata pengeluaran rutin 3 bulan terakhir"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: handleAccept,
                    className: "w-full rounded-2xl py-4 text-white font-black text-base shadow-[var(--shadow-premium)] active:scale-[0.98] transition flex items-center justify-center gap-2",
                    style: { background: "var(--wondr-orange)" },
                    children: [
                      profile.shieldCta,
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: close, className: "w-full rounded-2xl py-3 text-sm font-bold text-muted-foreground", children: "Nanti saja" })
              ] })
            ]
          },
          "prompt"
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "flex-1 flex flex-col items-center justify-center text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  transition: { type: "spring", damping: 12 },
                  className: "w-28 h-28 rounded-full flex items-center justify-center mb-5",
                  style: { background: "var(--wondr-lime)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-16 h-16", strokeWidth: 2.4, style: { color: "var(--wondr-black)" } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black mb-2", children: "Shield aktif!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground max-w-xs", children: [
                formatIDR(done.amount),
                " dipindahkan ke kantong ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: profile.shieldGoalName }),
                ". Dana ini terkunci sampai jatuh tempo."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 w-full space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => {
                      close();
                      navigate({ to: "/growth" });
                    },
                    className: "w-full rounded-2xl py-3.5 font-black text-white",
                    style: { background: "var(--wondr-black)" },
                    children: "Lihat di Growth"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: close, className: "w-full rounded-2xl py-3 text-sm font-bold text-muted-foreground", children: "Kembali ke Beranda" })
              ] })
            ]
          },
          "done"
        ) })
      ]
    }
  ) });
}
function AppLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SmartNudgeModal, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaydayShieldModal, {})
  ] });
}
export {
  AppLayout as component
};
