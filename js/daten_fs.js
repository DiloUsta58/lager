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
    material: "F4AADG1150",
    stueck: 256,
    eNummer: "E00010323",
    kuerzel: "1150",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "30#",
    bezeichnung: "30# Melting Liner F4XADG0560",
    material: "F4XADG0560",
    stueck: 144,
    eNummer: "E32346800",
    kuerzel: "560",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "50#",
    bezeichnung: "50# Melting Liner F4XADG0561",
    material: "F4XADG0561",
    stueck: 144,
    eNummer: "E32347200",
    kuerzel: "561",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "60#",
    bezeichnung: "60# Melting Liner F4XADG0758",
    material: "F4XADG0758",
    stueck: 144,
    eNummer: "E32347400",
    kuerzel: "758",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "75#",
    bezeichnung: "75# Melting Liner F4XADG0759",
    material: "F4XADG0759",
    stueck: 100,
    eNummer: "E32347600",
    kuerzel: "759",
    bestand: "",
    dpc: ""
  },
   {
    kurz: "45kg Melting Liner",
    bezeichnung: "45 kg Melting Liner A4AADG1351",
    material: "A4AADG1351",
    stueck: 32,
    eNummer: "EXXXXXXXX",
    kuerzel: "1351",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "55kg Melting Liner",
    bezeichnung: "55kg Melting Liner A4AADG1350",
    material: "A4AADG1350",
    stueck: 32,
    eNummer: "EXXXXXXXX",
    kuerzel: "1350",
    bestand: "",
    dpc: ""
  },
     {
    kurz: "75kg RECESSED RADIUS LINER",
    bezeichnung: "45 kg Melting Liner A4AADG1344",
    material: "A4AADG1344",
    stueck: 32,
    eNummer: "EXXXXXXXX",
    kuerzel: "1344",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "110 CS",
    bezeichnung: "110# Melting Liner F4XADG0926",
    material: "F4XADG0926",
    stueck: 100,
    eNummer: "E32347800",
    kuerzel: "926 CS",
    bestand: "",
    dpc: ""
  },
    {
    kurz: "110 AL",
    bezeichnung: "110# Melting Liner A4AADG0926",
    material: "A4AADG0926",
    stueck: 100,
    eNummer: "E32346200",
    kuerzel: "926",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "150cs",
    bezeichnung: "50kg Melting Liner F4AADG0996",
    material: "F4AADG0996 CS",
    stueck: 32,
    eNummer: "E32348000",
    kuerzel: "996",
    bestand: "",
    dpc: ""
  },
    {
    kurz: "150Alu",
    bezeichnung: "50kg Melting Liner A4AADG0996",
    material: "A4AADG0996 AL",
    stueck: 32,
    eNummer: "E32348004",
    kuerzel: "996",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "171#",
    bezeichnung: "171# Melting Liner A4AADG1171",
    material: "A4AADG1171",
    stueck: 32,
    eNummer: "E32350100",
    kuerzel: "1171",
    bestand: "",
    dpc: ""
  },
    {
    kurz: "205# ALUMICON",
    bezeichnung: "205# A4AADG1170",
    material: "A4AADG",
    stueck: 32,
    eNummer: "E32348005",
    kuerzel: "1170",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "205# Backup",
    bezeichnung: "205 Back up AUB932",
    material: "A4B932",
    stueck: 9,
    eNummer: "E32350600",
    kuerzel: "932",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "120kg",
    bezeichnung: "120kg Alumina A4AADG1239",
    material: "A4AADG1239",
    stueck: 18,
    eNummer: "E32346120",
    kuerzel: "1239",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "155kg",
    bezeichnung: "155kg MELTING LINER A4AADG1444",
    material: "A4AADG1444",
    stueck: 9,
    eNummer: "E32346155",
    kuerzel: "1444",
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
    bezeichnung: "120kg Backup A4BADG1154",
    material: "A4BADG1154",
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
  const body = document.getElementById("fsTableBody");
  if (AppState.isEditing) return;
  body.innerHTML = "";

  /* ===== FILTER: GENAU HIER ===== */
  let fsFiltered = fsData;

  if (globalSearchTerm) {
    fsFiltered = fsFiltered.filter(row =>
      Object.values(row).some(v =>
        String(v).toLowerCase().includes(globalSearchTerm)
      )
    );
  }
  setTabCount("fs", fsFiltered.length);
  /* ===== ENDE FILTER ===== */

  fsFiltered.forEach((r, i) => {
    body.innerHTML += `
      <tr>
        <td data-label="Kurz Bezeichnung">
          ${highlightText(r.kurz || "", globalSearchTerm)}
        </td>

        <td data-label="Bezeichnung">
          ${highlightText(r.bezeichnung || "", globalSearchTerm)}
        </td>

        <td data-label="Material">
          ${highlightText(r.material || "", globalSearchTerm)}
        </td>

        <td data-label="Stückzahl">
          ${highlightText(r.stueck || "", globalSearchTerm)}
        </td>

        ${fsCell(
          highlightText(r.eNummer || "", globalSearchTerm),
          i,
          "eNummer",
          "E-Nummer"
        )}

        <td data-label="Kürzel">
          ${highlightText(r.kuerzel || "", globalSearchTerm)}
        </td>

        ${fsCell(
          highlightText(r.bestand || "", globalSearchTerm),
          i,
          "bestand",
          "Bestand Konsilager"
        )}

        ${fsCell(
          highlightText(r.dpc || "", globalSearchTerm),
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

async function editFS(icon, index, field) {
AppState.isEditing = true;
  /* 🔐 Zentrale Edit-Freigabe */
  if (!await requireEditSaveUnlock()) return;

  const td = icon.closest("td");
  if (!td) return;

  const oldValue = fsData[index][field] ?? "";

  td.innerHTML = `<input class="edit-input" value="${oldValue}">`;
  const input = td.querySelector("input");
  input.focus();
  input.addEventListener("focus", () => {
    AppState.isEditing = true;
  });
  /* ✨ Edit startet → Aktivität */
  registerEditActivity();

  /* ⌨️ Tippen hält Edit aktiv */
  input.addEventListener("input", registerEditActivity);

  /* ENTER / ESC */
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      input.blur();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      AppState.isEditing = false;   // 🔑 HINZUFÜGEN
      if (typeof renderFS === "function") renderFS();
    }

  });

  input.onblur = () => {
    setTimeout(() => {
      AppState.isEditing = false;

      const newValue = input.value;

      registerEditActivity();

      fsData[index][field] = newValue;
      saveFS();

      saveHistory({
        time: new Date().toISOString(),
        table: "FS",
        field,
        oldValue,
        newValue,
        row: fsData[index].bezeichnung
      });

      if (typeof renderFS === "function") renderFS();
      if (typeof reapplyFsColumns === "function") reapplyFsColumns();
    }, 0);
  };
}

/* =====================================================
   RESET FS SECTION (ADMIN)
===================================================== */
function resetFS() {
  /* =========================
     ADMIN-PRÜFUNG
  ========================= */
  if (!requireAdminUnlock()) return;

  /* =========================
     BESTÄTIGUNG
  ========================= */
  if (!confirm("FS-Daten wirklich zurücksetzen?")) return;

  /* =========================
     RESET
  ========================= */
  localStorage.removeItem("fs_lager_data_v1");

  fsData = structuredClone(DEFAULT_FS_DATA);
  renderFS();
}
