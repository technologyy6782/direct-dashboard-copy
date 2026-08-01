// @ts-nocheck
/**
 * UNIFIED SHELL
 * =============
 * Module workspace chrome. The Control Panel (module switch dashboard) lives
 * at /control-panel and owns the global module sidebar. Inside a module we
 * render NO global sidebar — the module keeps its own internal sidebar, so
 * only ONE sidebar is ever on screen. The header exposes
 * "← Back to Control Panel" which returns to the panel with its search /
 * scroll state preserved.
 */
import { type ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, Bell, MessageSquare, Sparkles, ChevronLeft, Store } from "lucide-react";
import logoAsset from "@/assets/softwarevala-logo-official.jpg.asset.json";
import { MODULES } from "@/lib/module-switch";

function titleFor(path: string) {
  const match = MODULES.filter((m) => m.path !== "/" && path.startsWith(m.path)).sort(
    (a, b) => b.path.length - a.path.length,
  )[0];
  if (match) return match.label;
  const seg = path.split("/").filter(Boolean)[0] ?? "workspace";
  return seg.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function UnifiedShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const title = titleFor(path);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur lg:px-6">
        <button
          onClick={() => navigate({ to: "/control-panel" })}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground/90 transition hover:bg-surface-2"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Back to Control Panel</span>
          <span className="sm:hidden">Back</span>
        </button>

        <div className="flex min-w-0 items-center gap-2">
          <img src={logoAsset.url} alt="Software Vala" className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-[oklch(0.45_0.2_260)]/60" />
          <span className="truncate text-sm font-semibold">{title}</span>
        </div>

        <div className="relative ml-2 hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder={`Search in ${title}…`}
            className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="hidden lg:inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground/90 transition hover:bg-surface-2">
            <Store className="h-3.5 w-3.5" />
            Marketplace
          </button>
          <button className="hidden md:inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-3 py-2 text-xs font-medium text-brand-foreground shadow-glow transition hover:opacity-95">
            <Sparkles className="h-3.5 w-3.5" />
            AI Chat
          </button>
          <IconBtn icon={MessageSquare} title="Messages" />
          <IconBtn icon={Bell} title="Notifications" />
        </div>
      </header>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}

function IconBtn({ icon: Icon, title }) {
  return (
    <button
      title={title}
      className="rounded-lg border border-border bg-surface p-2 text-foreground/80 transition hover:bg-surface-2 hover:text-foreground"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export default UnifiedShell;
