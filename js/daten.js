/* =====================================================
   GLOBALE DOM-REFERENZEN (ROBUSTE FALLBACKS)
===================================================== */
const app = document.getElementById("app");
const loginBox = document.getElementById("loginBox");
const userInput = document.getElementById("userInput");
const passInput = document.getElementById("passInput");
const keyInput = document.getElementById("keyInput");
const unlockBtn = document.getElementById("unlockBtn");
const status = document.getElementById("status");

const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");

/* =====================================================
   SAFE EVENT BINDING
===================================================== */
function safeOn(el, evt, fn) {
  if (el && el.addEventListener) el.addEventListener(evt, fn);
}

/* =====================================================
   KONFIGURATION STORAGE_KEYS
===================================================== */
const STORAGE_KEY = "materialData";
const HISTORY_KEY = "materialHistory";




const LOGIN_USER = "DiloUsta58";
const LOGIN_PASS = "64579";
const EDIT_KEY = "64579";
const AUTO_LOCK_MINUTES = 1;
const PROTECTED_FIELDS = ["material", "e"];

/* =====================================================
   STATUS
===================================================== */

let editEnabled = localStorage.getItem("editEnabled") === "true";
let lockTimer = null;
let loggedIn = sessionStorage.getItem("loggedIn") === "true";
let isAdmin = loggedIn;
let globalSearchTerm = "";
let historyData = [];
let useEdit = false;

/* =====================================================
   COLUMN MAPS
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

const FS_COLUMN_MAP = {
  kurz: 0,
  bezeichnung: 1,
  material: 2,
  stueck: 3,
  eNummer: 4,
  kuerzel: 5,
  bestand: 6,
  dpc: 7
};

/* =====================================================
   DATEN LADEN
===================================================== */
let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (!Array.isArray(data)) {
  data = structuredClone(defaultData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
/*ZENTRALE FUNKTION: UI verstecken*/
function hideAllSections() {
  Object.values(tabs).forEach(cfg => {
    const el = document.getElementById(cfg.section);
    if (el) el.classList.remove("active");
  });

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });
}
/* TABELLEN LEEREN (optional, aber empfohlen)*/
function clearAllTables() {
  const bodies = [
    "tableBody",     // KE
    "fsTableBody",
    "fmTableBody",
    "historyBodyIExport"
  ];

  bodies.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });
}

/* =====================================================
   ZENTRALE SUCH-UPDATE-FUNKTION
===================================================== */
function setTabCount(tab, count) {
  const btn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
  if (!btn) return;

  const label = btn.dataset.label;

  if (globalSearchTerm && count > 0) {
    btn.textContent = `${label} (${count})`;
  } else {
    btn.textContent = label;
  }
}

function updateSearchCounts() {
  const term = globalSearchTerm;

  // KE
  const keCount = term
    ? kedata.filter(r =>
        Object.values(r).some(v =>
          String(v).toLowerCase().includes(term)
        )
      ).length
    : kedata.length;
  setTabCount("ke", keCount);

  // FS
  const fsCount = term
    ? fsData.filter(r =>
        Object.values(r).some(v =>
          String(v).toLowerCase().includes(term)
        )
      ).length
    : fsData.length;
  setTabCount("fs", fsCount);

  // FM
  const fmCount = term
    ? fmData.filter(r =>
        Object.values(r).some(v =>
          String(v).toLowerCase().includes(term)
        )
      ).length
    : fmData.length;
  setTabCount("fm", fmCount);
}



/* =====================================================
   RESET KE SECTION
===================================================== */
function resetKE() {
  if (!confirm("KE-Daten wirklich zurücksetzen?")) return;

  localStorage.removeItem("materialData");
  data   = structuredClone(defaultData);

  renderKE();
}

/* =====================================================
   LOGIN / LOGOUT
===================================================== */
function login(e) {
  if (e) e.preventDefault();

  const user = userInput.value.trim();
  const pass = passInput.value.trim();

  if (user === LOGIN_USER && pass === LOGIN_PASS) {
    loggedIn = true;
    isAdmin = true;
    editEnabled = false;
    localStorage.setItem("editEnabled", "false");
    sessionStorage.setItem("loggedIn", "true");

    loginBox.style.display = "none";
    app.style.display = "block";
    document.getElementById("historySection").style.display = "none";
    document.getElementById("lastUpdate").style.display = "block";
    document.getElementById("fmSection").style.display = "block";

    initCategories();
    syncAdminUI();
    loadInventurDate();
    TabController.init();
  } else {
    alert("Login fehlgeschlagen");
  }
}

function logout() {
  sessionStorage.removeItem("loggedIn");
  localStorage.removeItem("editEnabled");
  localStorage.removeItem("activeTab");

  loggedIn = false;
  editEnabled = false;
  document.getElementById("historySection").style.display = "none";
  document.getElementById("lastUpdate").style.display = "none";
  document.getElementById("fmSection").style.display = "none";


  // 🔍 Suche & Highlight zurücksetzen
  globalSearchTerm = "";
  if (search) search.value = "";

  // 🧹 Tabellen leeren
  ["tableBody", "fsTableBody", "fmTableBody"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });

  // 🧭 Tabs & Sections deaktivieren
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  document.querySelectorAll(".tab-section").forEach(sec => {
    sec.classList.remove("active");
  });

  // UI wechseln
  app.style.display = "none";
  loginBox.style.display = "block";
}

/* ZENTRALE ADMIN-PRÜFUNG */
function requireAdminUnlock() {
  if (editEnabled) return true;

  const key = prompt("Admin-Key erforderlich:");
  if (!key) return false;

  if (key === EDIT_KEY) {
    editEnabled = true;
    useEdit = true;
    localStorage.setItem("editEnabled", "true");
    unlockEditing();
    startAutoLock();
    syncAdminUI();
    syncEditToggleButton();    
    return true;
  }

  alert("Falscher Admin-Key");
  return false;
}



/*Die Scroll-Funktion */
function scrollToFirstHighlight() {
  if (!globalSearchTerm) return;

  const activeSection = document.querySelector(".tab-section.active");
  if (!activeSection) return;

  const scrollContainer = activeSection.querySelector(".table-scroll");
  if (!scrollContainer) return;

  const firstHit = activeSection.querySelector(
    "tr:not(.inventory-sum) .search-hit"
  );
  if (!firstHit) return;

  const containerRect = scrollContainer.getBoundingClientRect();
  const hitRect = firstHit.getBoundingClientRect();

  scrollContainer.scrollTo({
    top:
      hitRect.top -
      containerRect.top +
      scrollContainer.scrollTop -
      20,
    behavior: "smooth"
  });
}


/* Button schaltet Edit-Modus*/
function toggleEdit() {
  editEnabled = !editEnabled;
  localStorage.setItem("editEnabled", editEnabled ? "true" : "false");

  // aktiven Tab neu rendern
  const tab = TabController.getActive();
  if (tab) TabController.show(tab);
}

/* =====================================================
   TAB CONTROLLER (BEREINIGT)
===================================================== */
window.TabController = (() => {
  const tabs = {
    ke: {
      section: "keSection",
      render: () => {
        renderKE();
        reapplyKEColumns();
        document.getElementById("fmSection").style.display = "none";
        document.getElementById("historySection").style.display = "block";
      }
    },
    fs: {
      section: "fsSection",
      render: () => {
      document.getElementById("fmSection").style.display = "none";
      document.getElementById("historySection").style.display = "none";
    if (window.renderFS) {
      window.renderFS();
    } else {
      console.warn("renderFS() noch nicht geladen");
    }
      }
    },

    fm: {
    section: "fmSection",
    render: () => {
    loadFMData();
    renderFM();
    document.getElementById("fmSection").style.display = "block";
    document.getElementById("historySection").style.display = "none";
    }
  },
    inv: {
    section: "inventarSection",
    render: () => {
      renderInventur();
      document.getElementById("fmSection").style.display = "none";
      document.getElementById("historySection").style.display = "none";
    }
  },
    history: {
      section: "historySection",
      render: () => {
        document.getElementById("fmSection").style.display = "none";

        if (editEnabled) renderHistoryKE();
      },
        },
    historySectionIExport: {
      section: "historySectionIExport",
      render: () => {
      document.getElementById("fmSection").style.display = "none";  
      document.getElementById("historySection").style.display = "none";      
      renderHistory();
      }
    }
  };

  let active = "ke";

  function show(tab) {
    if (!tabs[tab]) return;
    active = tab;

    Object.entries(tabs).forEach(([key, cfg]) => {
      const el = document.getElementById(cfg.section);
      if (el) el.classList.toggle("active", key === tab);
    });

    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tab);
    });

    tabs[tab].render();
    localStorage.setItem("activeTab", tab);
  }

  function init() {
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => show(btn.dataset.tab));
    });

    const saved = localStorage.getItem("activeTab") || "ke";
    show(saved);
  }
  return { init, show, getActive: () => active};   // 🔑 NEU 
})();

/* =====================================================
   KE RENDERING
===================================================== */
function renderKE() {
  if (!loggedIn) return;
  tableBody.innerHTML = "";

  let lastCat = null;

  data.forEach(m => {
    if (m.cat !== lastCat) {
      tableBody.innerHTML +=
        `<tr class="category"><td colspan="9">${m.cat}</td></tr>`;
      lastCat = m.cat;
    }

    tableBody.innerHTML += `
      <tr class="data-row ${row._isDefault ? "default-row" : ""}">
        <td></td>
        <td>${m.material || ""}</td>
        <td>${m.e || ""}</td>
        <td>${m.charge || ""}</td>
        <td>${m.palette || ""}</td>
        <td>${m.shelf || ""}</td>
        <td>${m.bestand || ""}</td>
        <td>${m.bemerkung || ""}</td>
        <td></td>
      </tr>
    `;
  });
}

/* =====================================================
   INVENTUR-LIST LOAD
===================================================== */
function collectInventurData() {
  const rows = [];

  /* =====================
     KE – AUS LOCALSTORAGE
  ===================== */
  data.forEach(r => {
    rows.push({
      source: "KE",
      beschreibung: r.material || "",
      material: r.material || "",
      eNummer: r.e || "",
      charge: r.charge || "",
      palette: r.palette || "",
      bestand: r.bestand || ""
    });
  });

  /* =====================
     FS – STORAGE
  ===================== */
  fsData.forEach(r => {
    rows.push({
      source: "FS",
      beschreibung: r.bezeichnung || r.kurz || "",
      material: r.material || "",
      eNummer: r.eNummer || "",
      charge: "",
      palette: "",
      bestand: r.bestand || ""
    });
  });

  /* =====================
     FM – STORAGE
  ===================== */
  fmData.forEach(r => {
    rows.push({
      source: "FM",
      beschreibung: `${r.artikel} ${r.abmessung}`,
      material: r.artikel || "",
      eNummer: r.artikel1 || "",
      charge: "",
      palette: "",
      bestand: r.bestand || ""
    });
  });

  /* =====================
     SPÄTER: datenX_inv.js
  ===================== */
  if (window.INV_EXTRA_DATA) {
    window.INV_EXTRA_DATA.forEach(r => rows.push(r));
  }

  return rows;
}

/* =====================================================
   INVENTUR – GRUPPIERUNG NACH E-NUMMER
===================================================== */
function groupInventurByENummer(rows) {
  const map = new Map();

  rows.forEach(r => {
    const key = r.eNummer || "OHNE_E";

    if (!map.has(key)) {
      map.set(key, {
        source: new Set([r.source]),
        beschreibung: r.beschreibung,
        eNummer: r.eNummer,
        charge: r.charge,
        palette: r.palette,
        bestand: r.bestand
      });
    } else {
      const g = map.get(key);
      g.bestand += r.bestand;
      g.source.add(r.source);
    }
  });

  return Array.from(map.values()).map(r => ({
    ...r,
    source: Array.from(r.source).join(", ")
  }));
}

/* =====================================================
   INVENTUR – SUMMEN JE QUELLE
===================================================== */
function calculateInventurTotals(rows) {
  const totals = {};

  rows.forEach(r => {
    const val = Number(r.bestand) || 0;
    if (!totals[r.source]) totals[r.source] = 0;
    totals[r.source] += val;
  });

  return totals;
}

/* =====================================================
   Inventur-Stichtag / speichern & laden
===================================================== */
const INVENTUR_DATE_KEY = "inventur_stichtag";

function saveInventurDate() {
  const input = document.getElementById("inventurDate");
  if (!input.value) return;
  localStorage.setItem(INVENTUR_DATE_KEY, input.value);
}

function loadInventurDate() {
  const val = localStorage.getItem(INVENTUR_DATE_KEY);
  if (!val) return;

  const input = document.getElementById("inventurDate");
  if (input) input.value = val;
}



function renderInventur() {
  const body = document.getElementById("invTableBody");
  if (!body) return;

  body.innerHTML = "";

  /* =========================
     KE – DETAIL + PRODUKT-GESAMT
  ========================= */
  const keRows = buildKEInventurRows();


  /* =========================
     FS – KEINE SUMMEN
  ========================= */
  const fsRows = fsData.map(r => ({
    source: "FS",
    beschreibung: r.bezeichnung || r.kurz || "",
    eNummer: r.eNummer || "",
    charge: "",
    palette: "",
    bestand: r.bestand || "",
    gesamt: ""
  }));

  /* =========================
     FM – KEINE SUMMEN
  ========================= */
  const fmRows = fmData.map(r => ({
    source: "FM",
    beschreibung: `Pos ${r.pos_Nr}. /  ${r.artikel} / ${r.abmessung} / #${r.koernung}`,
    eNummer: r.artikel1 || "",
    charge: "",
    palette: "",
    bestand: r.bestand || "",
    gesamt: ""
  }));

  /* =========================
     GESAMTE INVENTUR (OHNE GLOBALSUMMEN)
  ========================= */
 const rows = [...keRows, ...fsRows, ...fmRows];

  setTabCount("inv", rows.length);

  
  /* =========================
     RENDER
  ========================= */
  rows.forEach(r => {
    body.innerHTML += `
      <tr class="${r.gesamt ? 'inventory-sum' : ''}">
        <td>${highlightText(r.source, globalSearchTerm)}</td>
        <td>${highlightText(r.beschreibung, globalSearchTerm)}</td>
        <td>${highlightText(r.eNummer, globalSearchTerm)}</td>
        <td>${highlightText(r.charge, globalSearchTerm)}</td>
        <td>${highlightText(r.palette, globalSearchTerm)}</td>
        <td>${r.bestand}</td>
        <td>${r.gesamt}</td>
      </tr>
    `;
  });
}


/*Neue KE-Inventur-Aufbereitung (ersetzt alte Gruppierung)*/

function buildKEInventurRows() {
  const map = new Map();

  data.forEach(r => {
    const material = (r.material || "").trim();
    if (!material) return;

    const eNummer = (r.e || "").trim();
    const charge = (r.charge || "").trim();
    const palette = (r.palette || "").trim();
    const bestand = Number(r.bestand);

    const hasDetail =
      eNummer || charge || palette || (!isNaN(bestand) && bestand > 0);

    if (!map.has(material)) {
      map.set(material, {
        rows: [],
        total: 0
      });
    }

    if (hasDetail) {
      map.get(material).rows.push({
        source: "KE",
        beschreibung: material,
        eNummer,
        charge,
        palette,
        bestand: !isNaN(bestand) ? bestand : "",
        gesamt: ""
      });
    }

    if (!isNaN(bestand) && bestand > 0) {
      map.get(material).total += bestand;
    }
  });

  const result = [];

  map.forEach((entry, material) => {
    // Detailzeilen
    entry.rows.forEach(r => result.push(r));

    // GENAU EINE Summenzeile pro Material
    result.push({
      source: "KE",
      beschreibung: material,
      eNummer: "",
      charge: "",
      palette: "",
      bestand: "",
      gesamt: entry.total > 0 ? entry.total + " kg" : ""
    });
  });

  return result;
}

  /* =========================
     Print-Funktion
  ========================= */

function updatePrintDate() {
  const el = document.getElementById("print-date");
  if (!el) return;

  const now = new Date();
  el.textContent = `Stand: ${now.toLocaleDateString("de-DE")} ${now.toLocaleTimeString("de-DE")}`;
  document.querySelector(".print-title").textContent =
  document.querySelector(".tab-btn.active")?.innerText || "Lagerübersicht";
}

function printTable() {
  updatePrintDate();
  window.print();
}



function highlightText(text, term) {
  if (!term) return text;

  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");

  return String(text).replace(regex, '<mark class="search-hit">$1</mark>');
}


/* =====================================================
   SPALTEN TOGGLE – KE
===================================================== */
function toggleKEColumn(colIndex, visible) {
  document.querySelectorAll(".KE-table tr").forEach(row => {
    const cell = row.children[colIndex];
    if (cell) cell.style.display = visible ? "" : "none";
  });
}

function reapplyKEColumns() {
  document
    .querySelectorAll(".ke-column-controls input[type=checkbox]")
    .forEach(cb => cb.dispatchEvent(new Event("change")));
}

/* =====================================================
   HISTORY KE
===================================================== */
function renderHistoryKE() {
  const body = document.getElementById("historyBody");
  body.innerHTML = "";


  const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  history.slice().reverse().forEach(h => {
    body.innerHTML += `
      <tr>
        <td>${new Date(h.time).toLocaleString()}</td>
        <td>${h.field}</td>
        <td>${h.oldValue || ""}</td>
        <td>${h.newValue || ""}</td>
      </tr>
    `;
  });
}
/* =====================================================
   HISTORY IMPORT / EXPORT
===================================================== */
function renderHistory() {
  const body = document.getElementById("historyBodyIExport");
  if (!body) return;

  body.innerHTML = "";

  historyData.forEach(entry => {
    body.innerHTML += `
      <tr>
        <td>${new Date(entry.timestamp).toLocaleString()}</td>
      </tr>
    `;
  });
}

/* LocalStorage-Fallback*/
function saveHistoryData() {
  localStorage.setItem("historyData", JSON.stringify(historyData));
}

function loadHistoryData() {
  const raw = localStorage.getItem("historyData");
  historyData = raw ? JSON.parse(raw) : [];
}



/* =====================================================
   UI
===================================================== */
function syncAdminUI() {
  const btn = document.getElementById("resetMaterialDataBtn");
  if (btn) btn.style.display = editEnabled ? "inline-block" : "none";

}

/* =====================================================
   START
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  if (loggedIn) {
    loginBox.style.display = "none";
    app.style.display = "block";
      

    initCategories(); 
    syncAdminUI();
    loadHistoryData();
    renderHistory();
    TabController.init();
  }
});
/* =====================================================
   EDIT-LOCK / AUTO-LOCK
   ===================================================== */
/* ENTER soll Freischalten / Sperren auslösen */
keyInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    toggleEditing();
  }
});

function toggleEditing() {
  if (editEnabled) {
    lockEditing();
  } else {
    unlockEditing();
  }
}

function unlockEditing() {
  if (useEdit) return false;  
  if (keyInput.value !== EDIT_KEY) {
    alert("Falscher Key");
    return;
  }

  editEnabled = true;
  localStorage.setItem("editEnabled", "true");

  startAutoLock();
  syncAdminUI();
  syncEditToggleButton();   // 🔑 HINZUFÜGEN
}

function lockEditing() {
  editEnabled = false;
  useEdit = false;
  localStorage.removeItem("editEnabled");

  clearTimeout(lockTimer);
  syncAdminUI();
  syncEditToggleButton();   // 🔑 HINZUFÜGEN
}

function syncEditToggleButton() {
  const btn = document.getElementById("editToggleBtn");
  if (!btn) return;

  if (editEnabled) {
    btn.textContent = "🔒 Sperren";
  } else {
    btn.textContent = "🔓 Freischalten";
  }
}


function startAutoLock() {
  clearTimeout(lockTimer);
  lockTimer = setTimeout(
    lockEditing,
    AUTO_LOCK_MINUTES * 60000
  );
}

/* Auto-Lock bei Aktivität */
["click", "keydown", "mousemove"].forEach(evt =>
  document.addEventListener(evt, () => {
    if (editEnabled) startAutoLock();
  })
);

/* =====================================================
   KATEGORIEN (KE)
===================================================== */
function initCategories() {
  if (!categoryFilter || !Array.isArray(data)) return;

  categoryFilter.innerHTML =
    '<option value="">Alle Kategorien</option>';

  const cats = [
    ...new Set(
      data
        .map(d => d.cat)
        .filter(Boolean)
    )
  ];

  cats.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
}


/* =====================================================
   SUCHE (KE)
===================================================== */
function parseQuery(q) {
  const obj = {};
  if (!q || !q.trim()) return obj;

  q.trim().split(/\s+/).forEach(p => {
    const [k, v] = p.includes(":")
      ? p.split(":")
      : ["all", p];
    if (v) obj[k] = v.toLowerCase();
  });

  return obj;
}

/* =====================================================
   HISTORY – TOGGLE / CLEAR
===================================================== */
function toggleHistory() {
  if (!editEnabled) {
    alert("Nur für Administratoren.");
    return;
  }

  const table = document.getElementById("historyTable");
  if (!table) return;

  table.style.display =
    table.style.display === "none"
      ? "table"
      : "none";

  if (table.style.display === "table") {
    renderHistoryKE();
  }
}

function clearHistory() {
  if (!editEnabled) {
    alert("Keine Berechtigung.");
    return;
  }

  if (!confirm("Historie wirklich löschen?")) return;

  localStorage.removeItem(HISTORY_KEY);
  document.getElementById("historyBody").innerHTML = "";
}

/* =====================================================
   STORAGE HELPERS
===================================================== */
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function saveHistory(entry) {
  const h =
    JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  h.push(entry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
}

/* =====================================================
   ADMIN: RESET DATEN
===================================================== */
function resetMaterialData() {
  if (!loggedIn || !isAdmin) return;

  const ok = confirm(
    "ACHTUNG!\n\nAlle Daten werden zurückgesetzt."
  );
  if (!ok) return;

    if (!confirm("Alle gespeicherten Daten wirklich löschen?")) return;
        localStorage.clear();
        sessionStorage.clear();

        // In-Memory Reset
        fmData = structuredClone(DEFAULT_FM_DATA);
        fsData = structuredClone(DEFAULT_FS_DATA);
        data   = structuredClone(defaultData);

        // UI Reset
        globalSearchTerm = "";
        if (search) search.value = "";

        renderFM();
        renderFS();
        renderKE();
        renderInventur();
      // HARD RELOAD ohne App-Reinit
      location.href = location.pathname;
}

/* =====================================================
   DARK / LIGHT MODE
===================================================== */
function toggleTheme() {
  const root = document.documentElement;
  const dark = root.getAttribute("data-theme") === "dark";

  if (dark) {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }

  updateThemeButton();
}

function updateThemeButton() {
  const btn = document.getElementById("themeToggleBtn");
  if (!btn) return;

  const dark =
    document.documentElement.getAttribute("data-theme") === "dark";

  btn.textContent = dark
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
}

/* =====================================================
   THEME INIT
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
  updateThemeButton();
});

/* =====================================================
   KE – SUCH & FILTER EVENTS
===================================================== */
const debouncedRender = (() => {
  let t;
  return () => {
    clearTimeout(t);
    t = setTimeout(render, 250);
  };
})();


safeOn(search, "input", () => {
  globalSearchTerm = search.value.trim().toLowerCase();

  if (!TabController) return;

  switch (TabController.active) {
    case "ke":
      renderKE();
      break;

    case "fs":
      if (typeof renderFS === "function") {
        renderFS();
      }
      break;

    case "fm":
      renderFM();
      break;
  }

  globalSearchTerm = search.value.trim().toLowerCase();

  const current = TabController.getActive();
  if (current) {
    TabController.show(current);
  }
    // ✅ NACH dem Rendern zum ersten Treffer springen
  requestAnimationFrame(scrollToFirstHighlight);

});

safeOn(categoryFilter, "change", () => {
  renderKE();
});


/* =====================================================
   KE – SPALTEN CHECKBOXEN
===================================================== */
document
  .querySelectorAll(".ke-column-controls input[type=checkbox]")
  .forEach(cb => {
    cb.addEventListener("change", () => {
      const key = cb.dataset.col;
      const colIndex = KE_COLUMN_MAP[key];
      if (colIndex !== undefined) {
        toggleKEColumn(colIndex, cb.checked);
      }
    });
  });

/* =====================================================
   KE – ZEILE HINZUFÜGEN
===================================================== */
function addRowAfter(index) {
  if (!loggedIn) return;

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
  renderKE();
  reapplyKEColumns();
}

/* =====================================================
   KE – ZEILE LÖSCHEN
===================================================== */
function removeRow(index) {
  if (!loggedIn) return;
  
  // ❌ Default-Zeilen niemals löschen
  const row = data[index];
  if (row._isDefault) {
    alert("Standard-Einträge können nicht gelöscht werden.");
    return;
  }

  if (!confirm("Diese Zeile wirklich löschen?")) return;

  data.splice(index, 1);
  save();
  renderKE();
  reapplyKEColumns();
}

/* =====================================================
   KE – INLINE EDIT
===================================================== */
function cell(value, index, field) {

  const protectedField = PROTECTED_FIELDS.includes(field);
  const canEdit = !protectedField || editEnabled;

  // 🔹 Bemerkung-Farblogik
  let extraClass = "";
  if (field === "bemerkung" && typeof value === "string") {
    const v = value.trim().toLowerCase();
    if (v === "frei") {
      extraClass = "ke-bemerkung-frei";
    } else if (v === "ungeprüft" || v === "ungeprueft") {
      extraClass = "ke-bemerkung-ungeprueft";
    } else if (v === "gesperrt" || v === "gesperrt") {
      extraClass = "ke-bemerkung-gesperrt";
    }
  }

  return `
    <td class="${protectedField ? "protected" : ""} ${extraClass}">
      <div class="edit-wrapper">
        <span>${highlightText(value ?? "", globalSearchTerm)}</span>
        ${
          canEdit
            ? `<span class="edit-icon"
                 onclick="editCell(this, ${index}, '${field}')">✏️</span>`
            : ""
        }
      </div>
    </td>
  `;
}

/* Überprüfung ob eintrag vorhanden ist */
function findDuplicateKE({ charge, palette }) {
  return data.findIndex((row, i) =>
    i !== index && // wichtig: nicht mit sich selbst vergleichen
    String(row.charge).trim() === String(charge).trim() &&
    String(row.palette).trim() === String(palette).trim()
  );
}




function editCell(icon, index, field) {
  if (PROTECTED_FIELDS.includes(field) && !editEnabled) return;
  if (!requireAdminUnlock()) return;
  
  const td = icon.closest("td");
  if (!td) return;

  const oldValue = data[index][field] ?? "";

  td.innerHTML = `
    <div class="edit-wrapper">
      <input class="edit-input" value="${oldValue}">
      <button class="edit-apply" type="button">✅</button>
    </div>
  `;

  const input = td.querySelector(".edit-input");
  const btn = td.querySelector(".edit-apply");
  input.focus();

const commit = () => {
  const newValue = input.value;

  if (newValue !== oldValue) {

    // 🔍 NUR prüfen, wenn Charge oder Palette geändert wird
    if (field === "charge" || field === "palette") {

      const testCharge =
        field === "charge" ? newValue : data[index].charge;
      const testPalette =
        field === "palette" ? newValue : data[index].palette;

      const dupIndex = data.findIndex((row, i) =>
        i !== index &&
        String(row.charge).trim() === String(testCharge).trim() &&
        String(row.palette).trim() === String(testPalette).trim()
      );

      if (dupIndex !== -1) {
        alert(`Eintrag bereits vorhanden (Zeile ${dupIndex + 1})`);
        scrollToKERow(dupIndex);
        renderKE();
        reapplyKEColumns();
        return;
      }
    }

    // ✅ kein Duplikat → speichern
    data[index][field] = newValue;
    save();
    saveHistory({
      time: new Date().toISOString(),
      field,
      oldValue,
      newValue
    });
  }

  renderKE();
  reapplyKEColumns();
};

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
    }
  });

  input.addEventListener("blur", commit);
  btn.addEventListener("click", commit);
}

/* =====================================================
   KE – HILFSFUNKTION HIGHLIGHT
===================================================== */
function highlight(text, q) {
  if (!q) return text;
  return text.replace(
    new RegExp(`(${q})`, "gi"),
    '<span class="highlight">$1</span>'
  );
}

/* =====================================================
   KE – FILTER LOGIK
===================================================== */
function getFilteredData() {
  let result = [...data];

  const cat = categoryFilter?.value;
  if (cat) {
    result = result.filter(r => r.cat === cat);
  }

  const q = search?.value?.toLowerCase().trim();
  if (q) {
    result = result.filter(r =>
      Object.values(r).some(v =>
        String(v).toLowerCase().includes(q)
      )
    );
  }

  return result;
}

/* =====================================================
   KE – RENDER OVERRIDE MIT FILTER
===================================================== */
const _renderOriginal = renderKE;
renderKE = function () {
  if (!loggedIn) return;

  tableBody.innerHTML = "";

  const filtered = getFilteredData();
  setTabCount("ke", filtered.length);
  
  let lastCat = null;

  filtered.forEach(row => {
    const index = data.indexOf(row);

    if (row.cat !== lastCat) {
      tableBody.innerHTML +=
        `<tr class="category"><td colspan="9">${row.cat}</td></tr>`;
      lastCat = row.cat;
    }

    tableBody.innerHTML += `
      <tr class="data-row ${row._isDefault ? "default-row" : "🔒"}">
                <!-- ➕ LINKS -->
                <td class="row-action left">
                  <span class="row-btn add" onclick="addRowAfter(${index})">＋</span>
                </td>
                    ${cell(row.material, index, "material")}
                    ${cell(row.e, index, "e")}
                    ${cell(row.charge, index, "charge")}
                    ${cell(row.palette, index, "palette")}
                    ${cell(row.shelf, index, "shelf")}
                    ${cell(row.bestand, index, "bestand")}
                    ${cell(row.bemerkung, index, "bemerkung")}
                <!-- ➖ RECHTS -->
                  <td class="row-action right">
                    ${
                      !row._isDefault
                        ? `<span class="row-btn remove" onclick="removeRow(${index})">−</span>`
                        : ""
                    }
                  </td>

      </tr>
    `;
  });
};

/* =====================================================
   KEYBOARD SHORTCUTS
===================================================== */
document.addEventListener("keydown", e => {
  if (!loggedIn) return;

  /* ESC = Sperren */
  if (e.key === "Escape" && editEnabled) {
    lockEditing();
  }

  /* CTRL + F = Fokus Suche */
  if (e.ctrlKey && e.key.toLowerCase() === "f") {
    e.preventDefault();
    search?.focus();
  }

  /* CTRL + L = Logout */
  if (e.ctrlKey && e.key.toLowerCase() === "l") {
    e.preventDefault();
    logout();
  }
});

/* =====================================================
   ROBUSTE DOM-HILFEN
===================================================== */
function $(id) {
  return document.getElementById(id);
}

function $$(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

/* =====================================================
   INITIAL UI STATE
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  
  syncAdminUI();

  if (search) search.value = "";
  if (categoryFilter) categoryFilter.value = "";
});


/* =====================================================
   FEHLERABSICHERUNG – REQUIRED ELEMENTS
===================================================== */
(function sanityCheck() {
  const required = [
    app,
    loginBox,
    userInput,
    passInput,
    tableBody
  ];

  const missing = required.filter(el => !el);
  if (missing.length) {
    console.error(
      "Initialisierung fehlgeschlagen – DOM-Elemente fehlen:",
      missing
    );
  }
})();

/* =====================================================
   VISIBILITY HELPERS
===================================================== */
function show(el) {
  if (el) el.style.display = "";
}

function hide(el) {
  if (el) el.style.display = "none";
}

/* =====================================================
   LOGIN STATE RESTORE
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  if (loggedIn) {
    hide(loginBox);
    show(app);
  } else {
    hide(app);
    show(loginBox);
  }
});

/* =====================================================
   STORAGE MIGRATION (FUTURE-SAFE)
===================================================== */
(function migrateStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("Invalid data");

    /* Beispiel für zukünftige Migrationen */
    parsed.forEach(r => {
      if (!("bemerkung" in r)) r.bemerkung = "";
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch (e) {
    console.warn("Storage Migration übersprungen:", e.message);
  }
})();

/* =====================================================
   DEBUG (OPTIONAL)
===================================================== */
window.__APP_DEBUG__ = {
  get data() {
    return data;
  },
  get fsData() {
    return window.fsData;
  },
  lockEditing,
  unlockEditing,
  renderKE,
  renderFS
};

/* =====================================================
   SPALTEN-PERSISTENZ (KE)
===================================================== */
const KE_COL_STATE_KEY = "keColumnState";

function saveKEColumnState() {
  const state = {};
  document
    .querySelectorAll(".ke-column-controls input[type=checkbox]")
    .forEach(cb => {
      state[cb.dataset.col] = cb.checked;
    });
  localStorage.setItem(KE_COL_STATE_KEY, JSON.stringify(state));
}

function restoreKEColumnState() {
  const raw = localStorage.getItem(KE_COL_STATE_KEY);
  if (!raw) return;

  try {
    const state = JSON.parse(raw);
    document
      .querySelectorAll(".ke-column-controls input[type=checkbox]")
      .forEach(cb => {
        if (cb.dataset.col in state) {
          cb.checked = !!state[cb.dataset.col];
        }
      });
    reapplyKEColumns();
  } catch (e) {
    console.warn("KE Column State konnte nicht geladen werden");
  }
}

/* Speichern bei Änderung */
document
  .querySelectorAll(".ke-column-controls input[type=checkbox]")
  .forEach(cb => cb.addEventListener("change", saveKEColumnState));

/* Wiederherstellen beim Start */
document.addEventListener("DOMContentLoaded", restoreKEColumnState);

/* =====================================================
   SPALTEN-PERSISTENZ (FS)
===================================================== */
const FS_COL_STATE_KEY = "fsColumnState";

function saveFSColumnState() {
  const state = {};
  document
    .querySelectorAll(".fs-column-controls input[type=checkbox]")
    .forEach(cb => {
      state[cb.dataset.col] = cb.checked;
    });
  localStorage.setItem(FS_COL_STATE_KEY, JSON.stringify(state));
}

function restoreFSColumnState() {
  const raw = localStorage.getItem(FS_COL_STATE_KEY);
  if (!raw) return;

  try {
    const state = JSON.parse(raw);
    document
      .querySelectorAll(".fs-column-controls input[type=checkbox]")
      .forEach(cb => {
        if (cb.dataset.col in state) {
          cb.checked = !!state[cb.dataset.col];
        }
      });
    if (typeof reapplyFsColumns === "function") {
      reapplyFsColumns();
    }
  } catch (e) {
    console.warn("FS Column State konnte nicht geladen werden");
  }
}

document
  .querySelectorAll(".fs-column-controls input[type=checkbox]")
  .forEach(cb => cb.addEventListener("change", saveFSColumnState));

document.addEventListener("DOMContentLoaded", restoreFSColumnState);

/* =====================================================
   UNLOAD-SICHERUNG
===================================================== */
window.addEventListener("beforeunload", () => {
  try {
    save();
    saveKEColumnState();
    saveFSColumnState();
  } catch (_) {
    /* still */
  }
});

/* =====================================================
   RESIZE-STABILISIERUNG
===================================================== */
let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (TabController?.show) {
      const active =
        localStorage.getItem("activeTab") || "ke";
      TabController.show(active);
    }
  }, 200);
});

/* ==================
   HISTORIE – BASIS
=============== */

function saveHistoryData() {
  localStorage.setItem("historyData", JSON.stringify(historyData));
}

function loadHistoryData() {
  const raw = localStorage.getItem("historyData");
  historyData = raw ? JSON.parse(raw) : [];
}


/* =============
   EXPORT
============ */
function exportAllData() {
  // 🔹 Historie erweitern (Snapshot)
  const historyEntry = {
    timestamp: new Date().toISOString(),
    keCount: data.length,
    fsCount: fsData.length,
    fmCount: fmData.length,
    note: "Export"
  };

  historyData.push(historyEntry);

  saveHistoryData();
  renderHistory();

  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),

    ke: data,
    fs: fsData,
    fm: fmData,

    history: historyData
  };

  const blob = new Blob(
    [JSON.stringify(payload, null, 2)],
    { type: "application/json" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `lager_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
}

/* =============
   IMPORT
============ */
function importAllData() {
  const input = document.getElementById("importFile");
  if (!input || !input.files || !input.files.length) return;

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    let jsonText = reader.result;

    // BOM / Whitespaces entfernen
    if (typeof jsonText === "string") {
      jsonText = jsonText.trim().replace(/^\uFEFF/, "");
    }

    let json;
    try {
      json = JSON.parse(jsonText);
    } catch (e) {
      console.error("JSON-Fehler:", e);
      alert("Datei ist kein gültiges JSON");
      return;
    }

    /* ===== AB HIER KEIN try/catch MEHR ===== */

    data   = Array.isArray(json.ke) ? json.ke : [];
    fsData = Array.isArray(json.fs) ? json.fs : [];
    fmData = Array.isArray(json.fm) ? json.fm : [];

    historyData = Array.isArray(json.history) ? json.history : [];

    saveData();
    saveFSData();
    saveFMData();
    saveHistoryData();

    renderKE();
    renderFS();
    renderFM();
    renderInventur();
    renderHistory();

    alert("Daten erfolgreich geladen");
  };

  reader.readAsText(file);
  input.value = "";
}


function saveData() {
  localStorage.setItem("keData", JSON.stringify(data));
}

function saveFSData() {
  localStorage.setItem("fsData", JSON.stringify(fsData));
}

function saveFMData() {
  localStorage.setItem("fmData", JSON.stringify(fmData));
}

function saveHistoryData() {
  localStorage.setItem("historyData", JSON.stringify(historyData));
}


window.addEventListener("DOMContentLoaded", () => {

  syncEditToggleButton();
  if (editEnabled) {
    startAutoLock();
  }


  const el = document.getElementById("lastUpdate");
  const lastModified = new Date(document.lastModified);
  const dd = String(lastModified.getDate()).padStart(2, "0");
  const mm = String(lastModified.getMonth() + 1).padStart(2, "0");
  const yyyy = lastModified.getFullYear();
  const hh = String(lastModified.getHours()).padStart(2, "0");
  const min = String(lastModified.getMinutes()).padStart(2, "0");
  const formatted = `${dd}.${mm}.${yyyy} ( ${hh}:${min} )`;
  el.textContent = formatted;
});

/* =====================================================
   EOF – daten.js vollständig
===================================================== */