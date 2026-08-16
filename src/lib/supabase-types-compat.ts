/**
 * Loose Supabase schema types for the merged modules.
 *
 * The generated 800KB `Database` type made project-wide typechecking take
 * minutes (and time out). The merged modules are all `@ts-nocheck`, so they
 * gain nothing from the precise shape — only the names need to resolve.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type LooseSchema = {
  Tables: Record<string, { Row: any; Insert: any; Update: any; Relationships: any }>
  Views: Record<string, { Row: any }>
  Functions: Record<string, { Args: any; Returns: any }>
  Enums: Record<string, any>
  CompositeTypes: Record<string, any>
}

export type Database = {
  __InternalSupabase: { PostgrestVersion: string }
  public: LooseSchema
} & Record<string, LooseSchema>

export type Tables<T extends string = string, U extends string = string> = any
export type TablesInsert<T extends string = string, U extends string = string> = any
export type TablesUpdate<T extends string = string, U extends string = string> = any
export type Enums<T extends string = string, U extends string = string> = any
export type CompositeTypes<T extends string = string, U extends string = string> = any

export const Constants = {
  public: {
    Enums: {
      activity_action_type: [
        "login",
        "logout",
        "page_navigation",
        "demo_interaction",
        "copy_attempt",
        "link_edit",
        "approval_request",
        "force_logout",
        "task_update",
        "lead_action",
        "chat_message",
        "file_access",
        "settings_change",
        "error",
      ],
      activity_status: ["success", "fail", "blocked", "pending", "warning"],
      ai_module: [
        "seo",
        "chatbot",
        "dev_assist",
        "ocr",
        "image_gen",
        "translation",
        "analytics",
        "other",
      ],
      ai_provider: ["openai", "gemini", "claude", "lovable_ai", "other"],
      app_role: [
        "super_admin",
        "demo_manager",
        "franchise",
        "reseller",
        "client",
        "prime",
        "developer",
        "influencer",
        "marketing_manager",
        "client_success",
        "seo_manager",
        "lead_manager",
        "task_manager",
        "rnd_manager",
        "performance_manager",
        "finance_manager",
        "legal_compliance",
        "hr_manager",
        "support",
        "ai_manager",
        "admin",
        "api_security",
        "r_and_d",
        "master",
        "safe_assist",
        "assist_manager",
        "promise_tracker",
        "promise_management",
        "area_manager",
        "server_manager",
        "product_demo_manager",
        "boss_owner",
        "ceo",
        "reseller_manager",
      ],
      critical_action_type: [
        "delete_data",
        "edit_financial",
        "add_user",
        "remove_user",
        "change_role",
        "server_action",
        "bulk_operation",
        "export_data",
        "change_settings",
        "ai_action",
      ],
      demo_lifecycle_status: ["pending", "active", "disabled", "archived"],
      demo_status: ["active", "inactive", "maintenance", "down"],
      demo_tech_stack: [
        "php",
        "node",
        "java",
        "python",
        "react",
        "angular",
        "vue",
        "other",
      ],
      developer_verification_status: [
        "submitted",
        "under_review",
        "verified",
        "rejected",
        "pending_documents",
      ],
      lead_industry: [
        "retail",
        "healthcare",
        "finance",
        "education",
        "real_estate",
        "manufacturing",
        "hospitality",
        "logistics",
        "technology",
        "other",
      ],
      lead_priority: ["hot", "warm", "cold"],
      lead_source_type: [
        "website",
        "demo",
        "influencer",
        "reseller",
        "referral",
        "social",
        "direct",
        "other",
      ],
      lead_status_type: [
        "new",
        "assigned",
        "contacted",
        "follow_up",
        "qualified",
        "negotiation",
        "closed_won",
        "closed_lost",
      ],
      offer_event_type: ["festival", "sports", "custom"],
      promise_status: [
        "pending_approval",
        "assigned",
        "promised",
        "in_progress",
        "breached",
        "completed",
      ],
      remote_assist_mode: ["view_only", "guided_cursor"],
      remote_assist_status: [
        "pending",
        "active",
        "ended",
        "expired",
        "cancelled",
      ],
    },
  },
} as const
