/* =========================
   STORAGE KEY – FS
========================= */
const FS_KEY = "fs_lager_data_v1";


/* =========================
   INITIALDATEN – FS (NICHT DIREKT ÄNDERN)
========================= */
const DEFAULT_FS_DATA = [
{
    kurz: "Penny",
    bezeichnung: "Penny Melt Liner",
    material: "F4A",
    stueck: 256,
    eNummer: "E00010323",
    kuerzel: "1150",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "30#",
    bezeichnung: "30# Melting Liner F4XADG0560",
    material: "F4X",
    stueck: 144,
    eNummer: "E32346800",
    kuerzel: "560",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "50#",
    bezeichnung: "50# Melting Liner F4XADG0561",
    material: "F4X",
    stueck: 144,
    eNummer: "E32347200",
    kuerzel: "561",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "60#",
    bezeichnung: "60# Melting Liner F4X 758",
    material: "F4X",
    stueck: 144,
    eNummer: "E32347400",
    kuerzel: "758",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "75#",
    bezeichnung: "75# Melting Liner F4AXADG0759",
    material: "F4X",
    stueck: 100,
    eNummer: "E32347600",
    kuerzel: "759",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "110 CS",
    bezeichnung: "110# Melting Liner F4XADG0926",
    material: "F4X",
    stueck: 100,
    eNummer: "E32347800",
    kuerzel: "926",
    bestand: "",
    dpc: ""
  },
    {
    kurz: "110 AL",
    bezeichnung: "110# Melting Liner F4XADG0926",
    material: "A4A",
    stueck: 100,
    eNummer: "E32346200",
    kuerzel: "926",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "150cs",
    bezeichnung: "50kg Melting Liner with… F3AADG0996",
    material: "F4A996",
    stueck: 32,
    eNummer: "E32348000",
    kuerzel: "996",
    bestand: "",
    dpc: ""
  },
    {
    kurz: "150Alu",
    bezeichnung: "50kg Melting Liner with… A4AADG0996",
    material: "A4A",
    stueck: 32,
    eNummer: "E32348004",
    kuerzel: "996",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "171#",
    bezeichnung: "171# Melting Liner F3AADG0827",
    material: "F4A",
    stueck: 32,
    eNummer: "E32350100",
    kuerzel: "1171",
    bestand: "",
    dpc: ""
  },
    {
    kurz: "205#",
    bezeichnung: "205# A4AADG1170",
    material: "A4A",
    stueck: 32,
    eNummer: "E32348005",
    kuerzel: "A4A1170",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "205# Backup",
    bezeichnung: "205 Back up AUB932",
    material: "A4B932",
    stueck: 9,
    eNummer: "E32350600",
    kuerzel: "A4B932",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "120kg",
    bezeichnung: "120kg Alumina A4AADG1159",
    material: "A4A1239",
    stueck: 18,
    eNummer: "E32346120",
    kuerzel: "1239",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "155kg",
    bezeichnung: "155kg Alumina",
    material: "A4A",
    stueck: 9,
    eNummer: "E32346155",
    kuerzel: "A4A1444",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "FUX1198",
    bezeichnung: "3761 Spritzschutz FUX1198",
    material: "F4X",
    stueck: 48,
    eNummer: "E32348006",
    kuerzel: "F4X1198",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "120kg",
    bezeichnung: "120kg Backup A4BADG1160",
    material: "A4B",
    stueck: 5,
    eNummer: "E32349120",
    kuerzel: "1154",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "135",
    bezeichnung: "Liner",
    material: "A4D",
    stueck: 0,
    eNummer: "E32349135",
    kuerzel: "12011",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "135",
    bezeichnung: "Backup 155kg 1095",
    material: "A4D",
    stueck: 135,
    eNummer: "E32349136",
    kuerzel: "12011",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "Cover F4A",
    bezeichnung: "Cover F4A",
    material: "F4A",
    stueck: 144,
    eNummer: "E32380310",
    kuerzel: "F4A1052",
    bestand: "",
    dpc: ""
  }
];





/* =========================
   AKTIVE DATEN (STORAGE ODER DEFAULT)
========================= */
let fsData = JSON.parse(localStorage.getItem(FS_KEY));

if (!Array.isArray(fsData)) {
  fsData = structuredClone(DEFAULT_FS_DATA);
  localStorage.setItem(FS_KEY, JSON.stringify(fsData));
}

/* =========================
   SPEICHERN
========================= */
function saveFS() {
  localStorage.setItem(FS_KEY, JSON.stringify(fsData));
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

/* =========================
   STORAGE
========================= */
function saveFS() {
  localStorage.setItem(FS_KEY, JSON.stringify(fsData));
}

/* =========================
   RENDERING
========================= */
function renderFS() {
   if (!App.loggedIn) return;
  const body = document.getElementById("fsTableBody");
  body.innerHTML = "";

  /* ===== FILTER: GENAU HIER ===== */
  let fsFiltered = fsData;

  if (App.search) {
    fsFiltered = fsFiltered.filter(row =>
      Object.values(row).some(v =>
        String(v).toLowerCase().includes(App.search)
      )
    );
  }
  setTabCount("fs", fsFiltered.length);
  /* ===== ENDE FILTER ===== */

  fsFiltered.forEach((r, i) => {
    body.innerHTML += `
      <tr>
        <td data-label="Kurz Bezeichnung">
          ${highlightText(r.kurz || "", App.search)}
        </td>

        <td data-label="Bezeichnung">
          ${highlightText(r.bezeichnung || "", App.search)}
        </td>

        <td data-label="Material">
          ${highlightText(r.material || "", App.search)}
        </td>

        <td data-label="Stückzahl">
          ${highlightText(r.stueck || "", App.search)}
        </td>

        ${fsCell(
          highlightText(r.eNummer || "", App.search),
          i,
          "eNummer",
          "E-Nummer"
        )}

        <td data-label="Kürzel">
          ${highlightText(r.kuerzel || "", App.search)}
        </td>

        ${fsCell(
          highlightText(r.bestand || "", App.search),
          i,
          "bestand",
          "Bestand Konsilager"
        )}

        ${fsCell(
          highlightText(r.dpc || "", App.search),
          i,
          "dpc",
          "DPC"
        )}
      </tr>
    `;
  });
}



/* =========================
   INLINE EDIT
========================= */
function fsCell(value, index, field, label, colClass) {
  return `
    <td class="${colClass || ""}" data-label="${label}">
      <div class="edit-wrapper">
        <span>${value || ""}</span>
        <span class="edit-icon" onclick="editFS(this, ${index}, '${field}')">✏️</span>
      </div>
    </td>
  `;
}

function highlightText(text, term) {
  if (!term) return text;

  const source = String(text);
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regex = new RegExp(escaped, "gi");

  return source.replace(regex, match =>
    `<span class="search-hit">${match}</span>`
  );
}


function editFS(icon, index, field) {
  if (!requireAdminUnlock()) return;
  
  const td = icon.closest("td");
  const old = fsData[index][field];
  td.innerHTML = `<input class="edit-input" value="${old || ""}">`;
  const input = td.querySelector("input");
  input.focus();

  // ✅ ENTER / ESC Handling
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      input.blur(); // triggert onblur → speichern
    }
    if (e.key === "Escape") {
      e.preventDefault();
      if (typeof renderFS === "function") renderFS(); // Abbrechen
    }
  });

  input.onblur = () => {
    fsData[index][field] = input.value;
    saveFS();

    // 🔴 Änderungshistorie
    saveHistory({
      time: new Date().toISOString(),
      table: "FS",
      field,
      oldValue: old,
      newValue: input.value,
      row: fsData[index].bezeichnung
    });

    if (typeof renderFS === 'function') renderFS();
    if (typeof reapplyFsColumns === 'function') reapplyFsColumns();
  };
}


document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".fs-column-controls input[type=checkbox]")
    .forEach(cb => {
      cb.addEventListener("change", () => {
        const key = cb.dataset.col;
        const colIndex = FS_COLUMN_MAP[key];
        if (colIndex !== undefined) {
          toggleFSColumn(colIndex, cb.checked);
        }
      });
    });

  if (typeof renderFS === 'function') { renderFS(); }
  if (typeof reapplyFsColumns === 'function') { reapplyFsColumns(); }
});