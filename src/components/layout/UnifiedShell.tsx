// @ts-nocheck
/**
 * UNIFIED SHELL
 * =============
 * One UI/UX for every module in the project. Mirrors the affiliate /
 * role-dashboard chrome: brand sidebar (grouped module switcher + search),
 * sticky top bar with breadcrumb + quick actions, and a max-width content
 * canvas. All colours come from the Software Vala design tokens.
 */
import { type ReactNode, useMemo, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, Bell, MessageSquare, Sparkles, Home, ChevronRight, Menu, X, Store } from "lucide-react";
import logoAsset from "@/assets/softwarevala-logo-official.jpg.asset.json";
import { MODULE_GROUPS } from "@/lib/module-switch";
import { cn } from "@/lib/utils";

function useCurrentPath() {
  return useRouterState({ select: (s) => s.location.pathname });
}

function titleFor(path: string) {
  for (const g of MODULE_GROUPS) {
    for (const it of g.items) if (it.path === path) return { group: g.group, label: it.label };
  }
  const seg = path.split("/").filter(Boolean).pop() ?? "dashboard";
  return {
    group: "Workspace",
    label: seg.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}

export function UnifiedShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const path = useCurrentPath();
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = titleFor(path);

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return MODULE_GROUPS;
    return MODULE_GROUPS.map((g) => ({
      ...g,
      items: g.items.filter((i) => i.label.toLowerCase().includes(needle) || i.path.includes(needle)),
    })).filter((g) => g.items.length > 0);
  }, [q]);

  const go = (to: string) => {
    setMobileOpen(false);
    navigate({ href: to });
  };

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-border lg:static lg:flex",
          mobileOpen ? "flex" : "hidden",
        )}
      >
        <div className="px-5 pt-5 pb-4 border-b border-border flex items-center gap-2.5">
          <img
            src={logoAsset.url}
            alt="Software Vala"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-[oklch(0.45_0.2_260)]/60 shadow-sm"
          />
          <div className="min-w-0">
            <div className="text-sm font-bold tracking-tight leading-tight truncate">
              Software Vala<span className="text-[oklch(0.55_0.22_25)]">™</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground truncate">
              {current.group}
            </div>
          </div>
          <button
            className="ml-auto lg:hidden text-muted-foreground"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-3 pt-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Find a module…"
              className="w-full rounded-lg bg-surface pl-9 pr-3 py-2 text-xs placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring border border-border"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-5">
          <div className="space-y-1">
            <NavItem label="Home" icon={Home} active={path === "/"} onClick={() => go("/")} />
          </div>
          {groups.map((g) => (
            <div key={g.group}>
              <div className="px-3 pb-2 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                {g.group}
              </div>
              <div className="space-y-1">
                {g.items.map((it) => (
                  <NavItem
                    key={it.path}
                    label={it.label}
                    active={path === it.path}
                    onClick={() => go(it.path)}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="m-3 rounded-xl bg-gradient-brand p-4 text-brand-foreground shadow-glow">
          <div className="text-xs uppercase tracking-wider opacity-80">Upgrade</div>
          <div className="mt-1 font-semibold">Go Pro</div>
          <p className="mt-1 text-xs opacity-80">Unlock advanced analytics & AI tools.</p>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/80 backdrop-blur px-4 lg:px-6 h-16">
          <button
            className="lg:hidden rounded-lg border border-border bg-surface p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
            <button onClick={() => go("/")} className="hover:text-foreground transition">
              <Home className="h-3.5 w-3.5" />
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="hidden sm:inline truncate">{current.group}</span>
            <ChevronRight className="hidden sm:inline h-3 w-3" />
            <span className="text-foreground font-medium truncate">{current.label}</span>
          </nav>

          <div className="relative flex-1 max-w-xl ml-2 hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search across modules…"
              className="w-full rounded-xl bg-surface pl-10 pr-3 py-2.5 text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring border border-border"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="hidden lg:inline-flex items-center gap-2 rounded-lg bg-surface px-3 py-2 text-xs font-medium text-foreground/90 hover:bg-surface-2 transition border border-border">
              <Store className="h-3.5 w-3.5" />
              Marketplace
            </button>
            <button className="hidden md:inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-3 py-2 text-xs font-medium text-brand-foreground shadow-glow hover:opacity-95 transition">
              <Sparkles className="h-3.5 w-3.5" />
              AI Chat
            </button>
            <IconBtn icon={MessageSquare} title="Messages" />
            <IconBtn icon={Bell} title="Notifications" />
          </div>
        </header>

        <main className="flex-1 min-w-0 px-4 lg:px-6 py-6">
          <div className="max-w-[1600px] w-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition text-left",
        active
          ? "bg-brand text-brand-foreground shadow-glow"
          : "text-sidebar-foreground/80 hover:bg-white/5 hover:text-foreground",
      )}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <span className="truncate">{label}</span>
      {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />}
    </button>
  );
}

function IconBtn({ icon: Icon, title }) {
  return (
    <button
      title={title}
      className="rounded-lg border border-border bg-surface p-2 text-foreground/80 hover:bg-surface-2 hover:text-foreground transition"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export default UnifiedShell;
