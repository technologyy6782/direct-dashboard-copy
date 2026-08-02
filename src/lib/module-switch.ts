// LOCKED top-level module architecture.
// These 33 entries are the ONLY navigation modules. Every related page, CRUD
// screen, report, KPI, workflow, analytics view and setting lives INSIDE its
// owning module and must never be promoted to a separate navigation item.
// Do not split, rename, duplicate or reorganize this list.

export type ModuleGroup = { group: string; items: { label: string; path: string }[] };

export type ModuleDefinition = {
  label: string;
  path: string;
  navigation?: string[];
};

export const MODULES: ModuleDefinition[] = [
  { label: "Boss Dashboard", path: "/boss/dashboard" },
  { label: "CEO Dashboard", path: "/ceo/dashboard" },
  { label: "Vala AI", path: "/ai-console" },
  { label: "Server Manager", path: "/server-manager" },
  { label: "AI API Manager", path: "/api-manager" },
  { label: "Development Manager", path: "/dev-manager" },
  { label: "Product Manager", path: "/super-admin/product-manager" },
  { label: "Demo Manager", path: "/demo-manager" },
  { label: "Task Manager", path: "/task-manager" },
  { label: "Promise Tracker", path: "/promise-tracker" },
  { label: "Assist Manager", path: "/assist-manager" },
  { label: "AMS Manager", path: "/ams", navigation: ["Tickets", "Awards", "Achievements", "Leaderboards", "Reports", "Settings"] },
  { label: "Marketplace Manager", path: "/marketplace-manager", navigation: ["Overview", "Products", "Categories", "Pricing", "Orders", "Inventory", "Reviews", "SEO", "Analytics", "Reports", "Settings"] },
  { label: "Marketing Manager", path: "/marketing-manager" },
  { label: "SEO Manager", path: "/seo-manager" },
  { label: "Lead Manager", path: "/lead-manager" },
  { label: "Sales & Support", path: "/sales-support" },
  { label: "Customer Support", path: "/client-success" },
  { label: "Franchise Owner", path: "/franchise/dashboard" },
  { label: "Reseller Manager", path: "/reseller-manager" },
  { label: "Influencer Manager", path: "/influencer-manager" },
  { label: "Influencer Dashboard", path: "/influencer-dashboard" },
  { label: "Continent Admin", path: "/continent/dashboard" },
  { label: "Country Admin", path: "/country/dashboard" },
  { label: "Finance Manager", path: "/finance" },
  { label: "Legal Manager", path: "/legal-manager" },
  { label: "Developer Dashboard", path: "/developer-dashboard" },
  { label: "Pro Manager", path: "/product-demo-manager" },
  { label: "Pro User Dashboard", path: "/prime-user" },
  { label: "Basic User Dashboard", path: "/user-dashboard" },
  { label: "Home", path: "/home-workspace" },
  { label: "Security", path: "/security-command" },
  { label: "Settings", path: "/system-settings" },
];

// Single flat group — the module switch dashboard shows only these modules.
export const MODULE_GROUPS: ModuleGroup[] = [{ group: "Modules", items: MODULES }];
