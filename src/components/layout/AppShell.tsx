// @ts-nocheck
import { type ReactNode } from "react";
import { WorkspaceBar } from "./WorkspaceBar";
import { UnifiedShell } from "./UnifiedShell";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <UnifiedShell>
      <WorkspaceBar />
      {children}
    </UnifiedShell>
  );
}
