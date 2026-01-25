async function sha256(text) {
  const enc = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

/* =====================================================
   LOGIN / LOGOUT
===================================================== */
async function login(e) {
  if (e) e.preventDefault();

  const user = userInput.value.trim();
  const pass = passInput.value.trim();

  if (!window.AUTH_CONFIG || !Array.isArray(AUTH_CONFIG.users)) {
    alert("Auth-Konfiguration fehlt");
    return;
  }

  const passHash = await sha256(pass);

  const account = AUTH_CONFIG.users.find(
    u => u.username === user && u.passwordHash === passHash
  );

  if (!account) {
    alert("Login fehlgeschlagen");
    return;
  }

  /* =========================
     LOGIN OK
  ========================= */
  loggedIn = true;
  isAdmin = account.role === "admin";
  editEnabled = false;

  sessionStorage.setItem("loggedIn", "true");
  sessionStorage.setItem("role", account.role);
  localStorage.setItem("editEnabled", "false");

  /* =========================
     UI
  ========================= */
  loginBox.style.display = "none";
  app.style.display = "block";

    /* =========================
     TABELLEN
      document.getElementById("keSection").style.display = "block";
      document.getElementById("historySection").style.display = "none";
      document.getElementById("fsSection").style.display = "block";
      document.getElementById("fmSection").style.display = "block";
      document.getElementById("inventarSection").style.display = "block";
      document.getElementById("historySectionIExport").style.display = "block";
      
      ========================= */ 
      
  document.getElementById("lastUpdate").style.display = "block";
  initCategories();
  syncAdminUI();          // reagiert jetzt auf isAdmin
  loadInventurDate();
  TabController.init();

  /* Logout-Watcher starten & stoppen */
  lastUserActivity = Date.now();
  startLogoutWatcher();
}


function logout() {
  /* =========================
     SESSION / STATUS
  ========================= */
  hideLogoutTimer();
  stopLogoutWatcher();

  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("role");

  localStorage.removeItem("editEnabled");
  localStorage.removeItem("activeTab");

  loggedIn = false;
  isAdmin = false;
  editEnabled = false;
  
  /* =========================
     UI – SECTIONS AUS
  ========================= */
  const ke = document.getElementById("keSection");
  const hs = document.getElementById("historySection");
  const fs = document.getElementById("fsSection");
  const fm = document.getElementById("fmSection");
  const inv = document.getElementById("inventarSection");
  const his = document.getElementById("historySectionIExport");
  const lu = document.getElementById("lastUpdate");

  if (ke) ke.style.display = "none";
  if (hs) hs.style.display = "none";
  if (fs) fs.style.display = "none";
  if (fm) fm.style.display = "none";
  if (inv) inv.style.display = "none";
  if (his) his.style.display = "none";
  if (lu) lu.style.display = "none";

  /* =========================
     SUCHE RESET
  ========================= */
  globalSearchTerm = "";
  if (typeof search !== "undefined" && search) {
    search.value = "";
  }

  /* =========================
     TABELLEN LEEREN
  ========================= */
  ["tableBody", "fsTableBody", "fmTableBody"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });

  /* =========================
     TABS & SECTIONS DEAKTIVIEREN
  ========================= */
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  document.querySelectorAll(".tab-section").forEach(sec => {
    sec.classList.remove("active");
  });

  /* =========================
     ADMIN-UI VERSTECKEN
  ========================= */
  document.querySelectorAll(".admin-btn").forEach(btn => {
    btn.style.display = "none";
  });

  /* =========================
     UI ZURÜCK ZUM LOGIN
  ========================= */
  app.style.display = "none";
  loginBox.style.display = "block";
  disableEditMode();
}

