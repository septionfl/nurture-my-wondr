import { ReactNode } from "react";

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="w-full max-w-md min-h-screen relative pb-28">
        {children}
      </div>
    </div>
  );
}
