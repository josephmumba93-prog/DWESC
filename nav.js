// ============================================================================
// DW Engineering IPSS System — Shared Navigation
// ============================================================================
// Include AFTER supabase-config.js and auth-guard.js on every protected page.
// Call renderSidebar(profile) and renderUserChrome(profile) once requireAuth()
// has resolved, so every page gets an identical, role-gated sidebar + topbar.
// ============================================================================

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { href: "dashboard.html", label: "Dashboard", roles: ["admin","finance","procurement","sales","store","technician"], color: "var(--navy)" },
    ],
  },
  {
    label: "Procurement",
    items: [
      { href: "suppliers.html", label: "Suppliers", roles: ["admin","procurement"], color: "var(--role-procurement)" },
      { href: "purchase-orders.html", label: "Purchase Orders", roles: ["admin","procurement"], color: "var(--role-procurement)" },
      { href: "goods-receipts.html", label: "Goods Receipts", roles: ["admin","procurement","store"], color: "var(--role-procurement)" },
    ],
  },
  {
    label: "Inventory",
    items: [
      { href: "items.html", label: "Items &amp; Parts", roles: ["admin","store"], color: "var(--role-store)" },
      { href: "stock.html", label: "Stock Levels", roles: ["admin","store","procurement","sales","technician"], color: "var(--role-store)" },
      { href: "stock-adjustments.html", label: "Stock Adjustments", roles: ["admin","store"], color: "var(--role-store)" },
    ],
  },
  {
    label: "Customers &amp; Sales",
    items: [
      { href: "customers.html", label: "Customers", roles: ["admin","sales"], color: "var(--role-sales)" },
      { href: "quotations.html", label: "Quotations", roles: ["admin","sales"], color: "var(--role-sales)" },
      { href: "sales-orders.html", label: "Sales Orders", roles: ["admin","sales"], color: "var(--role-sales)" },
    ],
  },
  {
    label: "Service",
    items: [
      { href: "job-cards.html", label: "Job Cards", roles: ["admin","technician","sales"], color: "var(--role-technician)" },
    ],
  },
  {
    label: "Finance",
    items: [
      { href: "invoices.html", label: "Invoices", roles: ["admin","finance","sales","technician"], color: "var(--role-finance)" },
      { href: "payments.html", label: "Payments", roles: ["admin","finance"], color: "var(--role-finance)" },
      { href: "reports.html", label: "Reports", roles: ["admin","finance"], color: "var(--role-finance)" },
    ],
  },
  {
    label: "Administration",
    items: [
      { href: "users.html", label: "Users &amp; Roles", roles: ["admin"], color: "var(--role-admin)" },
      { href: "settings.html", label: "Company Settings", roles: ["admin"], color: "var(--role-admin)" },
    ],
  },
];

const currencyFmt = (n) =>
  "ZMW " + Number(n || 0).toLocaleString("en-ZM", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Renders the role-gated sidebar nav into #sidebarNav.
 * Requires the page to have a <nav class="sidebar"> with an empty
 * <div id="sidebarNav"></div> inside it (see dashboard.html for the shell).
 */
function renderSidebar(profile) {
  const nav = document.getElementById("sidebarNav");
  if (!nav) return;

  const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";
  let html = "";

  NAV_SECTIONS.forEach((section) => {
    const visibleItems = section.items.filter((item) => roleCan(profile, item.roles));
    if (visibleItems.length === 0) return;

    html += `<div class="sidebar-section-label">${section.label}</div>`;
    visibleItems.forEach((item) => {
      const isActive = item.href === currentPage;
      html += `
        <a class="sidebar-link ${isActive ? "active" : ""}" href="${item.href}">
          <span class="dot" style="background:${item.color}"></span>
          ${item.label}
        </a>`;
    });
  });

  nav.innerHTML = html;
}

/**
 * Renders the topbar user info (name + role badge) and wires up the
 * sign-out button. Requires #userName, #roleBadge, and #signOutBtn
 * elements to exist on the page (see dashboard.html for the shell).
 */
function renderUserChrome(profile) {
  const nameEl = document.getElementById("userName");
  const badgeEl = document.getElementById("roleBadge");
  const signOutEl = document.getElementById("signOutBtn");

  if (nameEl) nameEl.textContent = profile.full_name;

  if (badgeEl) {
    const meta = ROLE_META[profile.role] || { label: profile.role, color: "#999" };
    badgeEl.textContent = meta.label;
    badgeEl.style.background = meta.color;
  }

  if (signOutEl) signOutEl.addEventListener("click", signOutAndRedirect);
}
