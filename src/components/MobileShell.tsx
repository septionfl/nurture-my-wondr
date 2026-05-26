import { ReactNode } from "react";

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[oklch(0.97_0.005_250)]">
      <div className="w-full max-w-md min-h-screen relative pb-28 bg-background shadow-[var(--shadow-elevated)] md:my-4 md:rounded-[2rem] md:min-h-[calc(100vh-2rem)] overflow-hidden">
        {children}
      </div>
    </div>
  );
}
