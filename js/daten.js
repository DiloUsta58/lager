
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

/* =====================================================
   STATUS
===================================================== */
let loggedIn = false;
let listVisible = false;
let editEnabled = localStorage.getItem("editEnabled") === "true";
let lockTimer = null;
let fsVisible = false;


/* =========================
   SPALTEN-ZUORDNUNG (KE / FS)
   Index basiert auf <th>-Reihenfolge
========================= */

/* KE-TABELLE (Materialliste) */
const KE_COLUMN_MAP = {
  material: 0,
  e: 1,
  regal: 2,
  bestand: 3
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
let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultData;

/* =====================================================
   LOGIN / LOGOUT
===================================================== */
function login() {
  const user = userInput.value;
  const pass = passInput.value;

  if (user === LOGIN_USER && pass === LOGIN_PASS) {
    loggedIn = true;
    /* sessionStorage bleibt bei Reload ✔ / endet bei Tab schließen ✔*/
    sessionStorage.setItem("loggedIn", "true");

    loginBox.style.display = "none";
    app.style.display = "block";
    tableBody.innerHTML = "";
    // KE-Bereich freigeben
    document.getElementById("toggleListBtn").style.display = "inline-block";
    // FS-Bereich freigeben
    document.getElementById("fsToggleBtn").style.display = "inline-block";

    document.getElementById("KeSection").style.display = "none";
    document.getElementById("fsSection").style.display = "none";
 
    listVisible = false;   
    fsVisible = false;


    initCategories();
    syncUI();
    updateToggleButton();


  } else {
    alert("Login fehlgeschlagen");
  }
}

function logout() {
  loggedIn = false;
  listVisible = false;
  editEnabled = false;
  /* Beim Logout Session korrekt beenden */
  sessionStorage.removeItem("loggedIn");


   // KE sperren
    document.getElementById("KeSection").style.display = "none";
    document.getElementById("toggleListBtn").style.display = "none";

    // FS sperren
    fsVisible = false;
    document.getElementById("fsSection").style.display = "none";
    document.getElementById("fsToggleBtn").style.display = "none";

    localStorage.removeItem("editEnabled");
    app.style.display = "none";
    loginBox.style.display = "block";
    tableBody.innerHTML = "";
}

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
}

function lockEditing() {
  editEnabled = false;
  localStorage.removeItem("editEnabled");
  clearTimeout(lockTimer);
  syncUI();
  render();
  reapplyKEColumns();
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
      tableBody.innerHTML +=
        `<tr class="category"><td colspan="5">${m.cat}</td></tr>`;
      lastCat = m.cat;
    }

    tableBody.innerHTML += `
      <tr>
        ${cell(highlight(m.material, query.material || query.all), i, "material")}
        ${cell(highlight(m.e, query.e || query.all), i, "e")}
        ${cell(highlight(m.shelf, query.regal || query.all), i, "shelf")}
        ${cell(m.bestand, i, "bestand")}
        <td></td>
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

function editCell(icon, index, field) {
  if (PROTECTED_FIELDS.includes(field) && !editEnabled) return;

  const td = icon.closest("td");
  const oldValue = data[index][field];

  td.innerHTML = `<input class="edit-input" value="${oldValue}">`;
  const input = td.querySelector("input");
  input.focus();

  input.addEventListener("blur", () => {
    data[index][field] = input.value;
    save();
    saveHistory({
      time: new Date().toISOString(),
      field,
      oldValue,
      newValue: input.value
    });
    render();
    reapplyKEColumns();
  });
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




syncUI();
updateToggleButton();


document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("loggedIn") === "true") {
    loggedIn = true;

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";

    // optional: initiale Views
    updateToggleButton?.();
  }
});
