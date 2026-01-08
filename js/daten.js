
/* =====================================================
   KONFIGURATION
===================================================== */
const STORAGE_KEY = "materialData";
const HISTORY_KEY = "materialHistory";
const LOGIN_USER = "DiloUsta58";
const LOGIN_PASS = "64579";
const EDIT_KEY = "64579";
const AUTO_LOCK_MINUTES = 10;
const PROTECTED_FIELDS = ["material", "e"];
const IS_ADMIN = true;

/* =====================================================
   STATUS
===================================================== */
let listVisible = false;
let editEnabled = localStorage.getItem("editEnabled") === "true";
let lockTimer = null;
let fsVisible = false;
let loggedIn = sessionStorage.getItem("loggedIn") === "true";
let isAdmin  = loggedIn; // Admin-Login = gleiches Konto




/* =====================================================
   KE-TABELLE – SPALTENZUORDNUNG (MIT AKTIONS-SPALTEN)
===================================================== */
const KE_COLUMN_MAP = {
  material: 1,
  e: 2,
  charge: 3,
  palette: 4,
  regal: 5,
  bestand: 6,
  bemerkung: 7
};


/* =========================
   FS – SPALTENINDEX
========================= */
const FS_COLUMN_MAP = {
  kurz: 0,
  bezeichnung: 1,
  material: 2,
  stueck: 3,
  e: 4,
  kuerzel: 5,
  bestand: 6,
  dpc: 7
};


/* =====================================================
   DATEN
===================================================== */
/* =====================================================
   DATEN (INITIAL + STORAGE GETRENNT)
===================================================== */
let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (!Array.isArray(data)) {
  data = structuredClone(defaultData); // oder DEFAULT_KE_DATA
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


/* =====================================================
   LOGIN – ENTER-FÄHIG / SESSION-SICHER
   (angepasst an bestehende Logik, ungekürzt)
===================================================== */
function login(e) {
  // ✅ Enter aus Formular abfangen (kein Seiten-Reload)
  if (e) e.preventDefault();

  const user = userInput.value.trim();
  const pass = passInput.value.trim();

  // ❌ einfache Validierung
  if (!user || !pass) {
    alert("Bitte Benutzer und Passwort eingeben");
    return;
  }

  // ✅ Login-Prüfung
  if (user === LOGIN_USER && pass === LOGIN_PASS) {
    loggedIn = true;
    isAdmin = true;   // ✅ Admin-Rechte setzen

    /* sessionStorage:
       - bleibt bei Reload (F5) erhalten
       - endet bei Tab / Browser schließen */
    sessionStorage.setItem("loggedIn", "true");

    // 🔒 Login-UI ausblenden
    loginBox.style.display = "none";
    app.style.display = "block";

    // Tabelle initial leeren
    tableBody.innerHTML = "";

    // 🔓 KE-Bereich freigeben
    document.getElementById("toggleListBtn").style.display = "inline-block";

    // 🔓 FS-Bereich freigeben
    document.getElementById("fsToggleBtn").style.display = "inline-block";

    // Beide Listen initial verborgen
    document.getElementById("KeSection").style.display = "none";
    document.getElementById("fsSection").style.display = "none";

    listVisible = false;
    fsVisible = false;

    // 🔧 Admin-Reset-Button anzeigen
    document.getElementById("resetMaterialDataBtn").style.display = "inline-block";

    /* 📜 Änderungshistorie nur für Admin sichtbar */
    if (user === LOGIN_USER) {
      document.getElementById("historySection").style.display = "block";
    }

    // 🔄 Initialisierungen
    initCategories();     // Kategorien laden
    syncUI();             // UI-Zustand synchronisieren
    updateToggleButton(); // Toggle-Buttons aktualisieren
    syncAdminUI();        // Admin-spezifische UI

  } else {
    alert("Login fehlgeschlagen");
  }
}


function logout() {
  loggedIn = false;
  isAdmin = false;

  listVisible = false;
  fsVisible = false;
  editEnabled = false;
  /* Beim Logout Session korrekt beenden */
  sessionStorage.removeItem("loggedIn");

   // KE sperren
    document.getElementById("KeSection").style.display = "none";
    document.getElementById("toggleListBtn").style.display = "none";


    document.getElementById("fsSection").style.display = "none";
    document.getElementById("fsToggleBtn").style.display = "none";
    document.getElementById("resetMaterialDataBtn").style.display = "none";
    
    localStorage.removeItem("editEnabled");
    app.style.display = "none";
    loginBox.style.display = "block";
    tableBody.innerHTML = "";
    syncAdminUI();
}

/* Enter auslösen */
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();   // verhindert Seitenreload
  login();              // deine bestehende Login-Funktion
});


/* =====================================================
   LISTE EIN / AUS
===================================================== */


function toggleKE() {
  if (!loggedIn) return;

  listVisible = !listVisible;

  const KeSection = document.getElementById("KeSection");
  const btn = document.getElementById("toggleListBtn");

  if (listVisible) {
    KeSection.style.display = "block";
    render();                 // 🔴 FEHLTE
    reapplyKEColumns();       // 🔴 FEHLTE
  } else {
    KeSection.style.display = "none";
    tableBody.innerHTML = "";
  }

  btn.textContent = listVisible
    ? "📋 Rohstoffliste ausblenden"
    : "📋 Rohstoffliste anzeigen";
}


function toggleFS() {
  if (!loggedIn) return;

  fsVisible = !fsVisible;

  const fsSection = document.getElementById("fsSection");
  const btn = document.getElementById("fsToggleBtn");

  fsSection.style.display = fsVisible ? "block" : "none";
  btn.textContent = fsVisible
    ? "FS-Liste ausblenden"
    : "FS-Liste anzeigen";
}

function updateToggleButton() {
  toggleListBtn.textContent = listVisible
    ? "📋 Rohstoffliste ausblenden"
    : "📋 Rohstoffliste anzeigen";
}

/* =====================================================
   HISTORIE ANZEIGE
===================================================== */

function toggleHistory() {
  if (!editEnabled) {
    alert("Nur für Administratoren sichtbar.");
    return;
  }

  const table = document.getElementById("historyTable");
  table.style.display = table.style.display === "none" ? "table" : "none";
  if (table.style.display === "table") renderHistory();
}

function renderHistory() {
  const body = document.getElementById("historyBody");
  body.innerHTML = "";

  const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

  history.slice().reverse().forEach(h => {
    body.innerHTML += `
      <tr>
        <td>${new Date(h.time).toLocaleString()}</td>
        <td>${h.field}</td>
        <td>${h.oldValue ?? ""}</td>
        <td>${h.newValue ?? ""}</td>
      </tr>
    `;
  });
}

/* =====================================================
   HISTORIE LÖSCHEN
===================================================== */

function clearHistory() {
  if (!editEnabled) {
    alert("Keine Berechtigung.");
    return;
  }

  if (!confirm("Soll die gesamte Änderungshistorie gelöscht werden?")) return;

  localStorage.removeItem(HISTORY_KEY);
  document.getElementById("historyBody").innerHTML = "";
}




/* =====================================================
   STORAGE
===================================================== */
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function saveHistory(entry) {
  const h = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  h.push(entry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
}

/* =====================================================
   KEY-STEUERUNG
===================================================== */
function unlockEditing() {
  if (keyInput.value !== EDIT_KEY) {
        alert("Falscher Key");
        return;
      }
  editEnabled = true;
  localStorage.setItem("editEnabled", "true");
  startAutoLock();
  syncUI();
  render();
  reapplyKEColumns();
  syncAdminUI();   // 🔑 Button einblenden
}

function lockEditing() {
  editEnabled = false;
  localStorage.removeItem("editEnabled");
  clearTimeout(lockTimer);
  syncUI();
  render();
  reapplyKEColumns();
  syncAdminUI();   // 🔑 Button einblenden
}

function startAutoLock() {
  clearTimeout(lockTimer);
  lockTimer = setTimeout(lockEditing, AUTO_LOCK_MINUTES * 60000);
}

function syncUI() {
  unlockBtn.disabled = editEnabled;
  status.textContent = editEnabled
    ? "🔓 Bearbeitung aktiv"
    : "🔒 Geschützt";
}

/* =====================================================
   SICHTBARE KE-SPALTEN ZÄHLEN
===================================================== */
function getVisibleKEColumnCount() {
  const table = document.querySelector(".KE-table");
  if (!table) return 1;

  const headerCells = table.querySelectorAll("thead th");
  let count = 0;

  headerCells.forEach(th => {
    if (th.style.display !== "none") {
      count++;
    }
  });

  return count;
}

/* =====================================
   KE – KOMPLETTE SPALTE EIN / AUS - 
================================= */
function toggleKEColumn(colIndex, visible) {
  const table = document.querySelector(".KE-table");
  if (!table) return;

  table.querySelectorAll("tr").forEach(row => {
    const cell = row.children[colIndex];
    if (cell) {
      cell.style.display = visible ? "" : "none";
    }
  });
}

/* =========================
   FS – KOMPLETTE SPALTE EIN / AUS
========================= */
function toggleFSColumn(colIndex, visible) {
  const table = document.querySelector(".fs-table");
  if (!table) return;

  table.querySelectorAll("tr").forEach(row => {
    const cell = row.children[colIndex];
    if (cell) {
      cell.style.display = visible ? "" : "none";
    }
  });
}



/* =====================================================
   KATEGORIEN INITIALISIEREN
===================================================== */
function initCategories() {
  categoryFilter.innerHTML = '<option value="">Alle Kategorien</option>';
  [...new Set(data.map(d => d.cat))].forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
}

/* =====================================================
   SUCHE
===================================================== */
function parseQuery(q) {
  const obj = {};
  if (!q || !q.trim()) return obj;

  q.trim().split(/\s+/).forEach(p => {
    const [k, v] = p.includes(":") ? p.split(":") : ["all", p];
    if (v) obj[k] = v.toLowerCase();
  });

  return obj;
}

function highlight(text, q) {
  if (!q) return text;
  return text.replace(
    new RegExp(`(${q})`, "gi"),
    '<span class="highlight">$1</span>'
  );
}


/* =====================================================
   RENDERING MIT KATEGORIEN (1:1 LOGIK WIE FRÜHER)
===================================================== */
function render() {
  if (!loggedIn || !listVisible) return;

  tableBody.innerHTML = "";

  // ✅ HIER EINMALIG DEFINIEREN
  const colCount =
    document.querySelector(".KE-table thead tr").children.length;

  const query = parseQuery(search.value);
  const catFilter = categoryFilter.value;
  const noSearch = Object.keys(query).length === 0;

  let lastCat = null;

  data.forEach((m, i) => {
    if (catFilter && m.cat !== catFilter) return;

    const hay = (m.material + m.e + m.shelf).toLowerCase();

    const hit =
      noSearch ||
      (query.material && m.material.toLowerCase().includes(query.material)) ||
      (query.e && m.e.toLowerCase().includes(query.e)) ||
      (query.regal && m.shelf.toLowerCase().includes(query.regal)) ||
      (query.all && hay.includes(query.all));

    if (!hit) return;

    if (m.cat !== lastCat) {
      const colCount = document
        .querySelector(".KE-table thead tr")
        .querySelectorAll("th:not([style*='display: none'])")
        .length;

      tableBody.innerHTML +=
        `<tr class="category"><td colspan="${colCount}">${m.cat}</td></tr>`;
      lastCat = m.cat;
    }

      tableBody.innerHTML += `
        <tr class="${m._isDefault ? 'default-row' : ''}">
          <!-- ➕ LINKS -->
          <td class="row-action left">
            <span class="row-btn add" onclick="addRowAfter(${i})">＋</span>
            ${
              m._isDefault
                ? `<span class="row-lock" title="Standard-Eintrag (nicht löschbar)">🔒</span>`
                : ""
            }
          </td>
                ${cell(highlight(m.material, query.material || query.all), i, "material")}
                ${cell(highlight(m.e, query.e || query.all), i, "e")}
                ${cell(m.charge, i, "charge")}
                ${cell(m.palette, i, "palette")}
                ${cell(highlight(m.shelf, query.regal || query.all), i, "shelf")}
                ${cell(m.bestand, i, "bestand")}
                ${cell(m.bemerkung, i, "bemerkung")}
          <!-- ➖ RECHTS -->
            <td class="row-action right">
              ${
                !m._isDefault
                  ? `<span class="row-btn remove" onclick="removeRow(${i})">−</span>`
                  : ""
              }
            </td>
        </tr>
      `;
  });
}


/* =====================================================
   INLINE EDIT
===================================================== */
function cell(value, index, field) {
  const protectedField = PROTECTED_FIELDS.includes(field);
  const canEdit = !protectedField || editEnabled;

  return `
    <td class="${protectedField ? "protected" : ""}">
      <div class="edit-wrapper">
        <span>${value}</span>
        ${
          canEdit
            ? `<span class="edit-icon" onclick="editCell(this, ${index}, '${field}')">✏️</span>`
            : ""
        }
      </div>
    </td>
  `;
}

/* =====================================================
   ZELLE EDITIEREN – ENTER + MOBILE-BUTTON
===================================================== */
function editCell(icon, index, field) {
  // 🔒 Geschützte Felder nur bei freigegebenem Edit
  if (PROTECTED_FIELDS.includes(field) && !editEnabled) return;

  // Aktuelle Tabellenzelle ermitteln
  const td = icon.closest("td");
  if (!td) return;

  const oldValue = data[index][field];

  // Edit-UI erzeugen
  td.innerHTML = `
    <div class="edit-wrapper">
      <input class="edit-input" value="${oldValue || ""}">
      <button class="edit-apply" type="button">Übernehmen</button>
    </div>
  `;

  const input = td.querySelector(".edit-input");
  const btn   = td.querySelector(".edit-apply");

  if (!input) return;

  input.focus();

  // Zentrale Commit-Funktion (EINMAL definiert)
  const commitEdit = () => {
    const newValue = input.value;

    // Nur speichern, wenn sich wirklich etwas geändert hat
    if (newValue !== oldValue) {
      data[index][field] = newValue;
      save();

      saveHistory({
        time: new Date().toISOString(),
        field,
        oldValue,
        newValue
      });
    }

    render();
    reapplyKEColumns();
  };

  // ✅ ENTER-Taste bestätigt
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitEdit();
    }
  });

  // ✅ Fokus-Verlust bestätigt (Desktop-Klick außerhalb)
  input.addEventListener("blur", () => {
    commitEdit();
  });

  // ✅ Mobile-Button bestätigt (falls sichtbar)
  if (btn) {
    btn.addEventListener("click", e => {
      e.preventDefault();
      commitEdit();
    });
  }
}


/* =====================================================
   EVENTS & START
===================================================== */
function debounce(fn, delay = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(null, args), delay);
  };
}

const debouncedRender = debounce(render, 300);

search.addEventListener("input", debouncedRender);
categoryFilter.addEventListener("change", render);

["click", "keydown", "mousemove"].forEach(evt =>
  document.addEventListener(evt, () => {
    if (editEnabled) startAutoLock();
  })
);

/* Listener KE/WA ...*/
document.querySelectorAll(".ke-column-controls input[type=checkbox]")
  .forEach(cb => {
    cb.addEventListener("change", () => {
      const key = cb.dataset.col;
      const colIndex = KE_COLUMN_MAP[key];

      if (colIndex !== undefined) {
        toggleKEColumn(colIndex, cb.checked);
      }
    });
  });


function reapplyKEColumns() {
  document.querySelectorAll(".ke-column-controls input")
    .forEach(cb => cb.dispatchEvent(new Event("change")));
}

/* Zeile hinzufügen*/
function addRowAfter(index) {
  if (!loggedIn) return;
  // optional: if (!isAdmin) return;

  const base = data[index];

  const newRow = {
    cat: base.cat,
    material: base.material,
    e: base.e,
    charge: "",
    palette: "",
    shelf: "",
    bestand: "",
    bemerkung: "",
    _isDefault: false,
    _isClone: true
  };

  data.splice(index + 1, 0, newRow);

  save();
  render();
}

/*Zeile löschen*/
function removeRow(index) {
  if (!loggedIn) return;

  const row = data[index];

  // ❌ Default-Zeilen niemals löschen
  if (row._isDefault) {
    alert("Dieser Standard-Eintrag kann nicht gelöscht werden.");
    return;
  }

  const ok = confirm("Diese Zeile wirklich löschen?");
  if (!ok) return;

  data.splice(index, 1);

  save();
  render();
}




/* =====================================================
   DARK / LIGHT MODE
===================================================== */

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");

  if (current === "dark") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    updateThemeButton();
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    updateThemeButton();
  }
}

function updateThemeButton() {
  const btn = document.getElementById("themeToggleBtn");
  if (!btn) return;

  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  btn.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";
}


syncUI();
updateToggleButton();


document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  if (sessionStorage.getItem("loggedIn") === "true") {
    loggedIn = true;
    isAdmin = true; // ✅ 
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";

    loginBox.style.display = "none";
    app.style.display = "block";

    // Sichtbarkeit korrekt setzen
    document.getElementById("toggleListBtn").style.display = "inline-block";
    document.getElementById("fsToggleBtn").style.display = "inline-block";
    document.getElementById("historySection").style.display = "block";
    document.getElementById("categoryFilter").style.display = "block";

    initCategories();
    syncUI();
    syncAdminUI();

    updateThemeButton();
    // optional: initiale Views
    updateToggleButton?.();
    syncAdminUI();
  }
});

/* =====================================================
   ADMIN: INITIALDATEN NEU LADEN
===================================================== */
function resetMaterialData() {
  if (!loggedIn || !isAdmin) return;

  const ok = confirm(
    "ACHTUNG!\n\nAlle aktuellen Materialdaten werden gelöscht\nund aus den Initialdaten neu geladen.\n\nFortfahren?"
  );

  if (!ok) return;

  localStorage.removeItem("materialData");
  location.reload();
}

function syncAdminUI() {
 const btn = document.getElementById("resetMaterialDataBtn");
  if (!btn) return;

  /* 🔑 NUR sichtbar wenn Key aktiv */
  btn.style.display = editEnabled ? "inline-block" : "none"


}

