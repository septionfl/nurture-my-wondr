import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useHabitStore, P as PERSONAS, f as formatIDR } from "./useHabitStore-IJOTKh8d.mjs";
import { C as CategoryIcon } from "./CategoryIcon-CgTeZTdH.mjs";
import { W as WondrLogo } from "./WondrLogo-BMnx1_Hx.mjs";
import { u as useEmblaCarousel } from "../_libs/embla-carousel-react.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { N as NudgeIcon } from "./NudgeIcon-DTV2Df68.mjs";
import { m as History, B as Bell, U as User, l as EyeOff, k as Eye, u as Sparkles, L as Lock, S as Send, Q as QrCode, W as Wallet, p as Plus, Z as Zap, b as ArrowLeftRight, e as ChartColumn, x as TrendingUp, d as ArrowUpRight, c as ArrowRight, a as ArrowLeft } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "../_libs/embla-carousel-reactive-utils.mjs";
import "../_libs/embla-carousel.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const CarouselContext = reactExports.createContext(null);
function useCarousel() {
  const context = reactExports.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = reactExports.forwardRef(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = reactExports.useState(false);
  const [canScrollNext, setCanScrollNext] = reactExports.useState(false);
  const onSelect = reactExports.useCallback((api2) => {
    if (!api2) {
      return;
    }
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = reactExports.useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = reactExports.useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );
  reactExports.useEffect(() => {
    if (!api || !setApi) {
      return;
    }
    setApi(api);
  }, [api, setApi]);
  reactExports.useEffect(() => {
    if (!api) {
      return;
    }
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref,
          onKeyDownCapture: handleKeyDown,
          className: cn("relative", className),
          role: "region",
          "aria-roledescription": "carousel",
          ...props,
          children
        }
      )
    }
  );
});
Carousel.displayName = "Carousel";
const CarouselContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        className: cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        ),
        ...props
      }
    ) });
  }
);
CarouselContent.displayName = "CarouselContent";
const CarouselItem = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        role: "group",
        "aria-roledescription": "slide",
        className: cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        ),
        ...props
      }
    );
  }
);
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = reactExports.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute  h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollPrev,
        onClick: scrollPrev,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Previous slide" })
        ]
      }
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = reactExports.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollNext,
        onClick: scrollNext,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Next slide" })
        ]
      }
    );
  }
);
CarouselNext.displayName = "CarouselNext";
const CTA_BY_GOAL = {
  bali: "80% to your Bali goal — save Rp 500K this week?"
};
function HabitCarousel() {
  const goals = useHabitStore((s) => s.goals);
  const [api, setApi] = reactExports.useState();
  const [current, setCurrent] = reactExports.useState(0);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);
  const slides = goals.length + 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "-mx-5 mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] uppercase tracking-[0.18em] font-black text-muted-foreground flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3", style: { color: "var(--wondr-orange)" } }),
        " Habit Tracker"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/growth", className: "text-[11px] font-black", style: { color: "var(--wondr-orange)" }, children: "Semua →" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Carousel,
      {
        setApi,
        opts: { align: "start", containScroll: "trimSnaps" },
        className: "px-5",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CarouselContent, { className: "-ml-3", children: [
          goals.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselItem, { className: "pl-3 basis-[78%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GoalSlide, { goal: g }) }, g.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselItem, { className: "pl-3 basis-[78%]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate({ to: "/growth" }),
              className: "w-full h-full min-h-[170px] rounded-3xl border-2 border-dashed border-border bg-card flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-[color:var(--wondr-orange)] hover:text-foreground transition",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl flex items-center justify-center", style: { background: "var(--wondr-lime)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-6 h-6", style: { color: "var(--wondr-black)" }, strokeWidth: 2.6 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black", children: "Buat goal baru" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold", children: "1-click templat" })
              ]
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-1.5 mt-3", children: Array.from({ length: slides }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => api?.scrollTo(i),
        className: "h-1.5 rounded-full transition-all",
        style: {
          width: i === current ? 18 : 6,
          background: i === current ? "var(--wondr-orange)" : "var(--color-border)"
        },
        "aria-label": `Slide ${i + 1}`
      },
      i
    )) })
  ] });
}
function GoalSlide({ goal }) {
  const navigate = useNavigate();
  const pct = goal.target > 0 ? Math.round(goal.current / goal.target * 100) : 0;
  const accent = goal.accent ?? "var(--wondr-orange)";
  const nudge = CTA_BY_GOAL[goal.id];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: () => navigate({ to: "/growth" }),
      className: "w-full text-left rounded-3xl p-4 relative overflow-hidden min-h-[170px] flex flex-col justify-between active:scale-[0.99] transition border-2",
      style: { background: "white", borderColor: "var(--color-border)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-8 -top-8 w-28 h-28 rounded-full", style: { background: accent, opacity: 0.18 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NudgeIcon, { iconKey: goal.iconKey, size: "md", tone: "accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1", children: [
            goal.locked && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded text-white", style: { background: "var(--wondr-black)" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5" }),
              " Locked"
            ] }),
            goal.routedCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded", style: { background: "var(--wondr-lime)", color: "var(--wondr-black)" }, children: [
              "Routed · ",
              goal.routedCategory
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          nudge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black mb-1.5", style: { color: accent }, children: nudge }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-black leading-tight", children: goal.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground font-semibold mb-2", children: [
            formatIDR(goal.current),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-50", children: [
              "/ ",
              formatIDR(goal.target)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full overflow-hidden", style: { background: "color-mix(in oklab, " + accent + " 18%, white)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { width: 0 },
              animate: { width: `${pct}%` },
              transition: { duration: 0.8 },
              className: "h-full rounded-full",
              style: { background: accent }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-black", style: { color: accent }, children: [
              pct,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold text-muted-foreground flex items-center gap-1", children: [
              "Top up ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ] })
          ] })
        ] })
      ]
    }
  );
}
const OPTIONS = [
  { id: "beni", label: "Beni" },
  { id: "wanda", label: "Wanda" }
];
function PersonaToggle() {
  const persona = useHabitStore((s) => s.persona);
  const setPersona = useHabitStore((s) => s.setPersona);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-1 rounded-full p-1 border-2 border-border bg-card", role: "tablist", "aria-label": "Demo persona", children: OPTIONS.map((o) => {
    const active = persona === o.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        role: "tab",
        "aria-selected": active,
        onClick: () => setPersona(o.id),
        className: "px-2.5 py-0.5 rounded-full text-[10px] font-black transition",
        style: {
          background: active ? "var(--wondr-black)" : "transparent",
          color: active ? "white" : "var(--color-muted-foreground)"
        },
        children: o.label
      },
      o.id
    );
  }) });
}
const SCENARIOS = [{
  key: "payday",
  label: "Gajian (Payday Shield)"
}, {
  key: "bali_goal",
  label: "Goal Bali"
}, {
  key: "diaspora_rate",
  label: "Diaspora"
}, {
  key: "wellness",
  label: "Wellness"
}, {
  key: "travel",
  label: "Travel"
}];
function Dashboard() {
  const navigate = useNavigate();
  const balance = useHabitStore((s) => s.balance);
  const goals = useHabitStore((s) => s.goals);
  const transactions = useHabitStore((s) => s.transactions);
  const triggered = useHabitStore((s) => s.triggeredNudges);
  const showNudge = useHabitStore((s) => s.showNudge);
  const triggerPayday = useHabitStore((s) => s.triggerPaydayShield);
  const persona = useHabitStore((s) => s.persona);
  const profile = PERSONAS[persona];
  const [hide, setHide] = reactExports.useState(false);
  const lockedTotal = goals.filter((g) => g.locked).reduce((s, g) => s + g.current, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-10 pb-3 flex items-center justify-between bg-white sticky top-0 z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(WondrLogo, { size: 22 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/nudges", className: "relative p-2 rounded-full hover:bg-muted transition", "aria-label": "Riwayat nudge", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-5 h-5 text-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => alert("Notifikasi (mock)"), className: "relative p-2 rounded-full hover:bg-muted transition", "aria-label": "Notifikasi", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5 text-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 rounded-full", style: {
            background: "var(--wondr-orange)"
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => alert("Profile"), className: "ml-1 w-9 h-9 rounded-full flex items-center justify-center text-white", style: {
          background: "var(--wondr-black)"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: "Selamat pagi," }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-black tracking-tight", children: profile.greeting })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PersonaToggle, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => alert("Detail rekening wondr"), className: "w-full text-left rounded-3xl p-5 text-white shadow-[var(--shadow-card)] mb-4 active:scale-[0.99] transition relative overflow-hidden", style: {
        background: "var(--wondr-orange)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-10 -top-10 w-40 h-40 rounded-full", style: {
          background: "var(--wondr-teal)",
          opacity: 0.85
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-4 bottom-6 w-16 h-16 rounded-full", style: {
          background: "var(--wondr-pink)",
          opacity: 0.55
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wider text-white/90 font-bold", children: "wondr Taplus · 0223383830" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { onClick: (e) => {
              e.stopPropagation();
              setHide(!hide);
            }, className: "text-white p-1 -mr-1", children: hide ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-black tracking-tight mb-3", children: hide ? "Rp •••••••" : formatIDR(balance) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11px] font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
              triggered.length,
              " habit ter-track minggu ini"
            ] }),
            lockedTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-white/90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
              " ",
              formatIDR(lockedTotal),
              " terkunci"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HabitCarousel, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-2 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { icon: Send, label: "Transfer", bg: "var(--wondr-teal)", onClick: () => navigate({
          to: "/transaction"
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { icon: QrCode, label: "QRIS", bg: "var(--wondr-orange)", onClick: () => navigate({
          to: "/transaction"
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { icon: Wallet, label: "Top Up", bg: "var(--wondr-purple)", onClick: () => alert("Top Up (mock)") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { icon: Plus, label: "Lainnya", bg: "var(--wondr-pink)", fg: "var(--wondr-black)", onClick: () => alert("Menu lainnya") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl p-5 mb-5 relative overflow-hidden", style: {
        background: "var(--wondr-lime)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-3 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider", style: {
          background: "var(--wondr-black)",
          color: "var(--wondr-lime)"
        }, children: "Baru" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-black mb-2", style: {
          color: "var(--wondr-black)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
          " Fitur wondr"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black leading-tight mb-1", style: {
          color: "var(--wondr-black)"
        }, children: "Nurture the Habit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium mb-3", style: {
          color: "var(--wondr-black)",
          opacity: 0.75
        }, children: "Engine 1-click yang ubah trigger transaksi jadi kantong otomatis." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: triggerPayday, className: "px-3.5 py-2 rounded-full text-xs font-black text-white", style: {
            background: "var(--wondr-black)"
          }, children: "Demo Payday Shield →" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/nudges", className: "px-3.5 py-2 rounded-full text-xs font-black border-2", style: {
            borderColor: "var(--wondr-black)",
            color: "var(--wondr-black)"
          }, children: "Riwayat" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2 font-black", children: "Demo Trigger Engine" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 -mx-1 px-1", children: SCENARIOS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => s.key === "payday" ? triggerPayday() : showNudge(s.key), className: "px-3 py-1.5 rounded-full bg-white border-2 border-border text-xs font-bold whitespace-nowrap transition", children: s.label }, s.key)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2 font-black", children: "3 Dimensi Nurture" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DimensionTile, { to: "/transaction", icon: ArrowLeftRight, label: "Transaction", sub: "Present", bg: "var(--wondr-orange)", fg: "#fff" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DimensionTile, { to: "/insight", icon: ChartColumn, label: "Insight", sub: "Past", bg: "var(--wondr-teal)", fg: "var(--wondr-black)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DimensionTile, { to: "/growth", icon: TrendingUp, label: "Growth", sub: "Future", bg: "var(--wondr-purple)", fg: "#fff" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black", children: "Aktivitas Terbaru" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/insight", className: "text-xs font-bold flex items-center gap-1", style: {
            color: "var(--wondr-orange)"
          }, children: [
            "Detail ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card border-2 border-border divide-y divide-border overflow-hidden", children: transactions.slice(0, 5).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => alert(`${t.label}
${t.category}
${formatIDR(t.amount)}
${t.time}${t.routed ? "\n\n(Dibayar dari kantong goal)" : ""}`), className: "w-full flex items-center gap-3 p-3 text-left hover:bg-muted/40 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryIcon, { category: t.category, size: 40 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-bold truncate flex items-center gap-1.5", children: [
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
      ] })
    ] })
  ] });
}
function QuickAction({
  icon: Icon,
  label,
  bg,
  fg = "#fff",
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: "flex flex-col items-center gap-1.5 active:scale-95 transition", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl flex items-center justify-center shadow-[var(--shadow-soft)]", style: {
      background: bg,
      color: fg
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5", strokeWidth: 2.4 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold", children: label })
  ] });
}
function DimensionTile({
  to,
  icon: Icon,
  label,
  sub,
  bg,
  fg
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "rounded-2xl p-3 flex flex-col items-start gap-3 active:scale-95 transition relative overflow-hidden", style: {
    background: bg,
    color: fg,
    minHeight: 110
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-white/25 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4", strokeWidth: 2.4 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-wider font-black opacity-80", children: sub }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black leading-tight", children: label })
    ] })
  ] });
}
export {
  Dashboard as component
};
