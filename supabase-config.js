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

const SUPABASE_URL = "https://fueppeslsrvqhjdrwhww.supabase.co"; // <-- REPLACE THIS
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1ZXBwZXNsc3J2cWhqZHJ3aHd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0NjAzMjUsImV4cCI6MjA5ODAzNjMyNX0.UqW5w3gubKj4aX8swTezYGrhXifgFuOAt4ZRzq9AW-o";         // <-- REPLACE THIS

// Single shared client instance used across every page in the app.
// NOTE: named `supabaseClient`, not `supabase` -- the Supabase JS library
// itself defines a global called `window.supabase`, so naming our own
// variable `supabase` causes a "already been declared" crash in the browser.
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
