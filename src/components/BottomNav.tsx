import { Link } from "@tanstack/react-router";
import { Home, ArrowLeftRight, BarChart3, TrendingUp } from "lucide-react";

const tabs = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/transaction", label: "Transaksi", icon: ArrowLeftRight },
  { to: "/insight", label: "Insight", icon: BarChart3 },
  { to: "/growth", label: "Growth", icon: TrendingUp },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 px-3 pb-3 pointer-events-none">
      <div className="rounded-2xl bg-background/95 backdrop-blur-xl border border-border shadow-[var(--shadow-elevated)] pointer-events-auto">
        <div className="grid grid-cols-4">
          {tabs.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center justify-center py-3 text-muted-foreground transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5 mb-1" strokeWidth={2.2} />
                  <span className="text-[10px] font-semibold tracking-wide">{label}</span>
                  <span className={`h-0.5 mt-1 rounded-full transition-all ${isActive ? "w-6 bg-primary" : "w-0 bg-transparent"}`} />
                </>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
