import { ReactNode } from "react";

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 w-full flex justify-center bg-[oklch(0.97_0.005_250)] overflow-hidden z-0">
      
      <div className="w-full max-w-md h-full relative pb-28 bg-background shadow-[var(--shadow-elevated)] md:h-[calc(100vh-2rem)] md:my-4 md:rounded-[2rem] overflow-y-auto overflow-x-hidden">
        {children}
      </div>
      
    </div>
  );
}