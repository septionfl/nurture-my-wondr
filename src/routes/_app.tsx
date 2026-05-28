import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { MobileShell } from "@/components/MobileShell";
import { SmartNudgeModal } from "@/components/SmartNudgeModal";
import { PaydayShieldModal } from "@/components/PaydayShieldModal";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <MobileShell>
      <Outlet />
      <BottomNav />
      <SmartNudgeModal />
      <PaydayShieldModal />
    </MobileShell>
  );
}
