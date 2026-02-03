

async function sha256(text) {
  const enc = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

const APP_VERSION = "2.6.2";  
const VERSION_KEY = "app_version";

/* =====================================================
   SERVER-VERSION PRÜFEN
===================================================== */
async function checkServerVersion() {
  const versionEl = document.getElementById("appVersion");

  try {
    const res = await fetch("https://dilousta58.github.io/lager/version.json", {
      cache: "no-store"
    });

    if (!res.ok) {
      versionEl.className = "version-checking";
      return;
    }

    const data = await res.json();
    const serverV = data.version;

    if (!serverV) {
      versionEl.className = "version-checking";
      return;
    }

    if (serverV === APP_VERSION) {
      versionEl.className = "version-ok";     // grün
    } else {
      versionEl.className = "version-outdated"; // rot
      showServerUpdateNotice(APP_VERSION, serverV, data.changelog);
    }

  } catch (err) {
    versionEl.className = "version-checking"; // gelb
  }
}


/* =====================================================
   SERVER-UPDATE-HINWEIS ANZEIGEN
===================================================== */
function showServerUpdateNotice(localV, serverV, changelog) {
  const box = document.createElement("div");
  box.className = "update-notice";
  box.innerHTML = `
    <div class="update-box">
      <h3>Neue Version verfügbar</h3>
      <p>Installiert: <b>${localV}</b></p>
      <p>Server-Version: <b>${serverV}</b></p>
      ${changelog ? `<p>Änderungen: ${changelog}</p>` : ""}
      <button id="updateNowBtn">Jetzt aktualisieren</button>
    </div>
  `;
  document.body.appendChild(box);

  document.getElementById("updateNowBtn").onclick = () => {
    location.reload(true);
  };
}


/* =====================================================
   APP-VERSION PRÜFEN
===================================================== */

function checkAppVersion() {
  const saved = localStorage.getItem(VERSION_KEY);

  // Erstmalige Nutzung → Version speichern
  if (!saved) {
    localStorage.setItem(VERSION_KEY, APP_VERSION);
    return;
  }

  // Version unterschiedlich → Update-Hinweis
  if (saved !== APP_VERSION) {
    showUpdateNotice(saved, APP_VERSION);
  }
}

/* =====================================================
   UPDATE-HINWEIS ANZEIGEN
===================================================== */

function showUpdateNotice(oldV, newV) {
  const box = document.createElement("div");
  box.className = "update-notice";
  box.innerHTML = `
    <div class="update-box">
      <h3>Neue Version verfügbar</h3>
      <p>Installiert: <b>${oldV}</b></p>
      <p>Aktuell: <b>${newV}</b></p>
      <button id="updateNowBtn">Jetzt aktualisieren</button>
    </div>
  `;
  document.body.appendChild(box);

  document.getElementById("updateNowBtn").onclick = () => {
    localStorage.setItem(VERSION_KEY, newV);
    location.reload(true);
  };
}


/* =========================
   ZENTRALE LOGIN-UI-STEUERUNG
========================= */
function syncLoginUI() {
  if (!loginBox || !app) return;

  if (loggedIn) {
    loginBox.style.display = "none";
    app.style.display = "block";
  } else {
    app.style.display = "none";
    loginBox.style.display = "block";
  }
}


/* =====================================================
   LOGIN / LOGOUT
===================================================== */
async function login(e) {
  if (e) e.preventDefault();

  /* =========================
     LOADER START
  ========================= */
  LoadingManager.show("Anmeldung wird geprüft…");

  const user = userInput.value.trim();
  const pass = passInput.value.trim();

  if (!window.AUTH_CONFIG || !Array.isArray(AUTH_CONFIG.users)) {
    LoadingManager.hide();
    alert("Auth-Konfiguration fehlt");
    return;
  }

  /* =========================
     VERSION ANZEIGEN
  ========================= */
  const versionEl = document.getElementById("appVersion");
  versionEl.textContent = `v${APP_VERSION}`;
  versionEl.className = "version-checking";


  /* =========================
     HASH
  ========================= */
  const passHash = await sha256(pass);
  LoadingManager.step(20, "Zugangsdaten geprüft…");

  const account = AUTH_CONFIG.users.find(
    u => u.username === user && u.passwordHash === passHash
  );

  if (!account) {
    LoadingManager.hide();
    alert("Login fehlgeschlagen");
    return;
  }

  /* =========================
     STATUS
  ========================= */
  loggedIn = true;
  isAdmin = account.role === "admin";
  editEnabled = false;

  sessionStorage.setItem("loggedIn", "true");
  sessionStorage.setItem("role", account.role);
  localStorage.setItem("editEnabled", "false");

  LoadingManager.step(20, "Benutzerrechte geladen…");

  /* =========================
     UI EINBLENDEN
  ========================= */
  loginBox.style.display = "none";
  app.style.display = "block";

  checkAppVersion();
  checkServerVersion();

  document.getElementById("lastUpdate").style.display = "block";
  LoadingManager.step(15, "Oberfläche initialisiert…");

  /* =========================
     INIT (KEIN RENDER!)
  ========================= */
  initCategories();
  LoadingManager.step(10, "Kategorien geladen…");

  syncAdminUI();
  LoadingManager.step(10, "Admin-UI synchronisiert…");

  loadInventurDate();
  LoadingManager.step(10, "Inventur geladen…");

  /* =========================
     TAB-CONTROLLER (ALLEIN!)
  ========================= */
    TabController.init();
    /* 🔥 Tabellen explizit neu rendern */
    renderKE();
    renderFS();
    renderFM();
    loadInventurDate();


    /* 🔁 Letzten Tab korrekt anzeigen */
    const lastTab = localStorage.getItem("activeTab") || "ke";
    TabController.show(lastTab);

  LoadingManager.step(10, "Tabs vorbereitet…");

  /* =========================
     LOGOUT-WATCHER
  ========================= */
  lastUserActivity = Date.now();
  startLogoutWatcher();

  /* =========================
     LOADER ENDE
  ========================= */
  LoadingManager.hide();

}


/* =====================================================
   LOGOUT
===================================================== */
function logout() {

  hideLogoutTimer();
  stopLogoutWatcher(); // 🔴 WICHTIG: nur EIN Watcher darf existieren

  /* =========================
     SESSION RESET
  ========================= */
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("role");
  localStorage.removeItem("editEnabled");

  loggedIn = false;
  isAdmin = false;
  editEnabled = false;
  AppState.isEditing = false;

  /* =========================
     Alle Tabs deaktivieren
  ========================= */
  document.querySelectorAll(".tab-btn").forEach(btn =>
    btn.classList.remove("active")
  );

  document.querySelectorAll(".tab-section").forEach(sec =>
    sec.classList.remove("active")
  );

  /* =========================
     TABELLEN LEEREN
  ========================= */
  ["tableBody", "fsTableBody", "fmTableBody", "historyBody"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });

  /* =========================
     ADMIN UI AUS
  ========================= */
  document.querySelectorAll(".admin-btn").forEach(btn => {
    btn.style.display = "none";
  });

  /* =========================
     SUCHEN / FILTER
  ========================= */
  globalSearchTerm = "";
  if (search) search.value = "";
  if (categoryFilter) categoryFilter.value = "";

  /* =========================
     EDIT-MODUS SICHER AUS
  ========================= */
  disableEditMode("", true);

  /* =========================
     UI → LOGIN
  ========================= */
  app.style.display = "none";
  loginBox.style.display = "block";
}

/* =====================================================
   ADMIN-UI SYNCHRONISIEREN
===================================================== */
function syncAdminUI() {
  /* =========================
     ADMIN-BUTTONS
  ========================= */
  document.querySelectorAll(".admin-btn").forEach(btn => {
    btn.style.display = isAdmin ? "" : "none";
  });

  /* =========================
     EDIT-MODUS STATUS
     (NUR STATUS, KEINE AUFRUFE)
  ========================= */
  if (!isAdmin) {
    editEnabled = false;
    localStorage.setItem("editEnabled", "false");
  }

  /* =========================
     TAB-SICHTBARKEIT
  ========================= */
  document.querySelectorAll(".tab-btn").forEach(btn => {
    const tab = btn.dataset.tab;

    // History nur für Admin
    if (tab === "historySectionIExport") {
      btn.style.display = isAdmin ? "" : "none";
    }
  });
}

/* =====================================================
   ZENTRALE APP-INITIALISIERUNG
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
  const role = sessionStorage.getItem("role");

  document.getElementById("footerVersion").textContent = `Version: ${APP_VERSION}`;

  if (isLoggedIn && role) {
    // ✅ SESSION OK → APP STARTEN
    loggedIn = true;
    isAdmin = role === "admin";
    editEnabled = localStorage.getItem("editEnabled") === "true";

    loginBox.style.display = "none";
    app.style.display = "block";
    // Versionsanzeige aktualisieren
    document.getElementById("appVersion").textContent = APP_VERSION;

    syncAdminUI();
    initCategories();
    loadInventurDate();
    TabController.init();

    lastUserActivity = Date.now();
    startLogoutWatcher();
  } else {
    // ❌ KEINE SESSION → LOGIN
    loggedIn = false;
    isAdmin = false;
    editEnabled = false;

    app.style.display = "none";
    loginBox.style.display = "block";
    checkAppVersion();
    checkServerVersion();
  }
});

