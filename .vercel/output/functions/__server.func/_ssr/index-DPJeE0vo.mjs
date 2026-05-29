import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { W as WondrLogo } from "./WondrLogo-BMnx1_Hx.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { F as FingerprintPattern, r as ShieldCheck } from "../_libs/lucide-react.mjs";
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
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(false);
  const handleAuth = () => {
    setLoading(true);
    setTimeout(() => navigate({
      to: "/dashboard"
    }), 900);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen w-full overflow-hidden", style: {
    background: "var(--wondr-orange)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full", style: {
      background: "var(--wondr-teal)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-32 -right-20 w-[360px] h-[360px] rounded-full", style: {
      background: "var(--wondr-purple)",
      opacity: 0.9
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 right-10 w-24 h-24 rounded-full", style: {
      background: "var(--wondr-pink)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 min-h-screen flex flex-col justify-between items-center p-8 max-w-md mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-14 w-full flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl px-5 py-3 shadow-[var(--shadow-card)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WondrLogo, { size: 34 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm font-bold text-white/95", children: "jadiin maumu." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.3em] font-bold text-white/80 mb-2", children: "Fitur Baru" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black tracking-tight", children: "Nurture the Habit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/85 max-w-[280px] mx-auto", children: "Engine nudge yang ubah transaksi harianmu jadi kebiasaan finansial." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center pb-6 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { onClick: handleAuth, disabled: loading, whileTap: {
          scale: 0.94
        }, className: "relative w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-[var(--shadow-elevated)]", children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
            rotate: 360
          }, transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }, className: "w-10 h-10 border-4 border-[color:var(--wondr-orange)]/20 border-t-[color:var(--wondr-orange)] rounded-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FingerprintPattern, { className: "w-12 h-12", strokeWidth: 1.8, style: {
            color: "var(--wondr-orange)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute inset-0 rounded-full border-2 border-white/60", animate: {
            scale: [1, 1.35, 1.35],
            opacity: [0.7, 0, 0]
          }, transition: {
            duration: 2,
            repeat: Infinity
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-sm font-bold text-white", children: loading ? "Memuat konteks 3D…" : "Tap untuk Face ID / Fingerprint" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1.5 text-xs text-white/85", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
          "Aman & terenkripsi end-to-end"
        ] })
      ] })
    ] })
  ] });
}
export {
  Login as component
};
