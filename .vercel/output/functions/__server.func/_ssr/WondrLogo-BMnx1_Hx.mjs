import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function WondrLogo({ size = 22, withBni = true, light = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1.5 leading-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "wondr-mark",
          style: { fontSize: size, color: light ? "#fff" : "var(--wondr-orange)", lineHeight: 1 },
          children: "wondr"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "block rounded-full mt-0.5",
          style: { width: size * 0.45, height: Math.max(2, size * 0.09), background: "var(--wondr-teal)" }
        }
      )
    ] }),
    withBni && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "font-extrabold tracking-tight",
        style: { fontSize: size * 0.5, color: light ? "rgba(255,255,255,0.85)" : "var(--navy)", letterSpacing: "-0.02em" },
        children: "by BNI"
      }
    )
  ] });
}
export {
  WondrLogo as W
};
