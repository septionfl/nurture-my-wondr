import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, d as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
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
function MobileShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 w-full flex justify-center bg-[oklch(0.97_0.005_250)] overflow-hidden z-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-md h-full relative pb-28 bg-background shadow-[var(--shadow-elevated)] md:h-[calc(100vh-2rem)] md:my-4 md:rounded-[2rem] overflow-y-auto overflow-x-hidden", children }) });
}
const appCss = "/assets/styles-SzH1MURu.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileShell, { children }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const $$splitComponentImporter$7 = () => import("../_app-BOoU4Qp_.mjs");
const Route$7 = createFileRoute("/_app")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./index-DPJeE0vo.mjs");
const Route$6 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "wondr by BNI — Nurture the Habit"
    }, {
      name: "description",
      content: "Fitur Nurture wondr — ubah transaksi jadi kebiasaan finansial."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./transaction-Cj8Vs7FG.mjs");
const Route$5 = createFileRoute("/_app/transaction")({
  head: () => ({
    meta: [{
      title: "Transaksi — wondr"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./nudges-BkaW-VRN.mjs");
const Route$4 = createFileRoute("/_app/nudges")({
  head: () => ({
    meta: [{
      title: "Riwayat Nudge — wondr"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./insight-PJA3GoKy.mjs");
const Route$3 = createFileRoute("/_app/insight")({
  head: () => ({
    meta: [{
      title: "Insight — wondr"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./growth-BGIw8tU0.mjs");
const Route$2 = createFileRoute("/_app/growth")({
  head: () => ({
    meta: [{
      title: "Growth — wondr"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./dashboard-DduEnwuO.mjs");
const Route$1 = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [{
      title: "Beranda — wondr"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./insight._category-BlRWltA_.mjs");
const Route = createFileRoute("/_app/insight/$category")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `${params.category} — Insight`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const AppRoute = Route$7.update({
  id: "/_app",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const AppTransactionRoute = Route$5.update({
  id: "/transaction",
  path: "/transaction",
  getParentRoute: () => AppRoute
});
const AppNudgesRoute = Route$4.update({
  id: "/nudges",
  path: "/nudges",
  getParentRoute: () => AppRoute
});
const AppInsightRoute = Route$3.update({
  id: "/insight",
  path: "/insight",
  getParentRoute: () => AppRoute
});
const AppGrowthRoute = Route$2.update({
  id: "/growth",
  path: "/growth",
  getParentRoute: () => AppRoute
});
const AppDashboardRoute = Route$1.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AppRoute
});
const AppInsightCategoryRoute = Route.update({
  id: "/$category",
  path: "/$category",
  getParentRoute: () => AppInsightRoute
});
const AppInsightRouteChildren = {
  AppInsightCategoryRoute
};
const AppInsightRouteWithChildren = AppInsightRoute._addFileChildren(
  AppInsightRouteChildren
);
const AppRouteChildren = {
  AppDashboardRoute,
  AppGrowthRoute,
  AppInsightRoute: AppInsightRouteWithChildren,
  AppNudgesRoute,
  AppTransactionRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  MobileShell as M,
  Route as R,
  router as r
};
