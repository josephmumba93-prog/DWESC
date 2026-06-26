// ============================================================================
// DW Engineering IPSS System — Supabase Configuration
// ============================================================================
// IMPORTANT: Replace the placeholder values below with your actual Supabase
// project URL and anon (public) key before deploying.
//
// Where to find these:
//   Supabase Dashboard -> Project Settings -> API
//   - "Project URL"      -> SUPABASE_URL
//   - "anon public" key  -> SUPABASE_ANON_KEY
//
// These values are safe to expose in frontend code. Security comes from
// Row Level Security (RLS) policies on the database, not from hiding
// these values.
// ============================================================================

const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co"; // <-- REPLACE THIS
const SUPABASE_ANON_KEY = "YOUR-ANON-PUBLIC-KEY-HERE";         // <-- REPLACE THIS

// Single shared client instance used across every page in the app.
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ----------------------------------------------------------------------------
// Role definitions — must match the `user_role` enum in the database schema.
// ----------------------------------------------------------------------------
const ROLES = {
  ADMIN: "admin",
  FINANCE: "finance",
  PROCUREMENT: "procurement",
  SALES: "sales",
  STORE: "store",
  TECHNICIAN: "technician",
};

// Display labels and accent colors per role, used for badges/nav theming.
const ROLE_META = {
  admin:       { label: "Administrator",  color: "#1E3A5F" },
  finance:     { label: "Finance",        color: "#2E7D5B" },
  procurement: { label: "Procurement",    color: "#1E3A5F" },
  sales:       { label: "Sales",          color: "#D64545" },
  store:       { label: "Store / Inventory", color: "#B8893E" },
  technician:  { label: "Service Technician", color: "#5B4B8A" },
};
