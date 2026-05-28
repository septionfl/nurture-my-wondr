import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Plus, Sparkles, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useHabitStore, formatIDR, Goal } from "@/stores/useHabitStore";
import { NudgeIcon } from "./NudgeIcon";

const CTA_BY_GOAL: Record<string, string> = {
  bali: "80% to your Bali goal — save Rp 500K this week?",
};

export function HabitCarousel() {
  const goals = useHabitStore((s) => s.goals);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const slides = goals.length + 1;

  return (
    <div className="-mx-5 mb-5">
      <div className="px-5 flex items-center justify-between mb-2">
        <div className="text-[10px] uppercase tracking-[0.18em] font-black text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" style={{ color: "var(--wondr-orange)" }} /> Habit Tracker
        </div>
        <Link to="/growth" className="text-[11px] font-black" style={{ color: "var(--wondr-orange)" }}>
          Semua →
        </Link>
      </div>
      <Carousel
        setApi={setApi}
        opts={{ align: "start", containScroll: "trimSnaps" }}
        className="px-5"
      >
        <CarouselContent className="-ml-3">
          {goals.map((g) => (
            <CarouselItem key={g.id} className="pl-3 basis-[78%]">
              <GoalSlide goal={g} />
            </CarouselItem>
          ))}
          <CarouselItem className="pl-3 basis-[78%]">
            <button
              onClick={() => navigate({ to: "/growth" })}
              className="w-full h-full min-h-[170px] rounded-3xl border-2 border-dashed border-border bg-card flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-[color:var(--wondr-orange)] hover:text-foreground transition"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "var(--wondr-lime)" }}>
                <Plus className="w-6 h-6" style={{ color: "var(--wondr-black)" }} strokeWidth={2.6} />
              </div>
              <div className="text-sm font-black">Buat goal baru</div>
              <div className="text-[10px] font-semibold">1-click templat</div>
            </button>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center gap-1.5 mt-3">
        {Array.from({ length: slides }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === current ? 18 : 6,
              background: i === current ? "var(--wondr-orange)" : "var(--color-border)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function GoalSlide({ goal }: { goal: Goal }) {
  const navigate = useNavigate();
  const pct = goal.target > 0 ? Math.round((goal.current / goal.target) * 100) : 0;
  const accent = goal.accent ?? "var(--wondr-orange)";
  const nudge = CTA_BY_GOAL[goal.id];

  return (
    <button
      onClick={() => navigate({ to: "/growth" })}
      className="w-full text-left rounded-3xl p-4 relative overflow-hidden min-h-[170px] flex flex-col justify-between active:scale-[0.99] transition border-2"
      style={{ background: "white", borderColor: "var(--color-border)" }}
    >
      <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full" style={{ background: accent, opacity: 0.18 }} />
      <div className="relative flex items-start justify-between">
        <NudgeIcon iconKey={goal.iconKey} size="md" tone="accent" />
        <div className="flex flex-col items-end gap-1">
          {goal.locked && (
            <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded text-white" style={{ background: "var(--wondr-black)" }}>
              <Lock className="w-2.5 h-2.5" /> Locked
            </span>
          )}
          {goal.routedCategory && (
            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: "var(--wondr-lime)", color: "var(--wondr-black)" }}>
              Routed · {goal.routedCategory}
            </span>
          )}
        </div>
      </div>
      <div className="relative">
        {nudge && (
          <div className="text-[10px] font-black mb-1.5" style={{ color: accent }}>
            {nudge}
          </div>
        )}
        <div className="text-base font-black leading-tight">{goal.name}</div>
        <div className="text-[11px] text-muted-foreground font-semibold mb-2">
          {formatIDR(goal.current)} <span className="opacity-50">/ {formatIDR(goal.target)}</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "color-mix(in oklab, " + accent + " 18%, white)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full"
            style={{ background: accent }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs font-black" style={{ color: accent }}>{pct}%</span>
          <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
            Top up <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </button>
  );
}
