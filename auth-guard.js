// ============================================================================
// DW Engineering IPSS System — Auth Guard & Session Helper
// ============================================================================
// Include this AFTER supabase-config.js on every protected page.
// Call requireAuth() at the top of each page's script to enforce login
// and load the current user's profile (name + role) before rendering.
// ============================================================================

/**
 * Ensures a valid session exists. Redirects to login.html if not.
 * Returns the current user's profile row ({ id, full_name, role, ... })
 * on success, fetched fresh from the `profiles` table.
 */
async function requireAuth() {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    window.location.href = "login.html";
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, role, phone, active")
    .eq("id", session.user.id)
    .single();

  if (profileError || !profile) {
    console.error("Could not load user profile:", profileError);
    await supabase.auth.signOut();
    window.location.href = "login.html";
    return null;
  }

  if (!profile.active) {
    alert("Your account has been deactivated. Please contact your administrator.");
    await supabase.auth.signOut();
    window.location.href = "login.html";
    return null;
  }

  return profile;
}

/**
 * Restricts the current page to a set of allowed roles.
 * Call after requireAuth(). Redirects to dashboard.html with a message
 * if the user's role isn't in the allowed list. 'admin' always passes.
 *
 * Usage: guardRole(profile, ['procurement', 'admin']);
 */
function guardRole(profile, allowedRoles) {
  if (!profile) return false;
  if (profile.role === "admin") return true;
  if (allowedRoles.includes(profile.role)) return true;

  window.location.href = "dashboard.html?denied=1";
  return false;
}

/**
 * Signs the current user out and returns to the login page.
 */
async function signOutAndRedirect() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}

/**
 * Returns true if the profile's role is in the given list, or is admin.
 * Useful for conditionally showing/hiding nav items and buttons (not a
 * security boundary on its own — RLS is the real boundary — but keeps
 * the UI honest about what a user can actually do).
 */
function roleCan(profile, allowedRoles) {
  if (!profile) return false;
  return profile.role === "admin" || allowedRoles.includes(profile.role);
}
