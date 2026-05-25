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
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40">
      <div className="mx-3 mb-3 rounded-3xl bg-card/90 backdrop-blur-xl border border-border shadow-[var(--shadow-card)]">
        <div className="grid grid-cols-4">
          {tabs.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center justify-center py-3 text-muted-foreground"
              activeProps={{ className: "text-accent" }}
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5 mb-1" strokeWidth={2.2} />
                  <span className="text-[10px] font-medium">{label}</span>
                  {isActive && <span className="w-1 h-1 mt-1 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />}
                </>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
