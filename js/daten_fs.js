
/* =====================================================
   FS – FIRELINER LAGER 22 (DATEN + LOGIK)
===================================================== */

const FS_KEY = "fs_lager_data";

/* =========================
   DATEN (1:1 AUS FOTO)
========================= */
let fsData = JSON.parse(localStorage.getItem(FS_KEY)) || [
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
    eNummer: "32346800",
    kuerzel: "560",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "50#",
    bezeichnung: "50# Melting Liner F4XADG0561",
    material: "F4X",
    stueck: 144,
    eNummer: "32347200",
    kuerzel: "561",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "60#",
    bezeichnung: "60# Melting Liner F4X 758",
    material: "F4X",
    stueck: 144,
    eNummer: "32347400",
    kuerzel: "758",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "75#",
    bezeichnung: "75# Melting Liner F4AXADG0759",
    material: "F4X",
    stueck: 100,
    eNummer: "32347600",
    kuerzel: "759",
    bestand: "",
    dpc: ""
  },
  {
    kurz: "110 CS",
    bezeichnung: "110# Melting Liner F4XADG0926",
    material: "F4X",
    stueck: 100,
    eNummer: "32347800",
    kuerzel: "926",
    bestand: "",
    dpc: ""
  },
    {
    kurz: "110 AL",
    bezeichnung: "110# Melting Liner F4XADG0926",
    material: "A4A",
    stueck: 100,
    eNummer: "32346200",
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
  body.innerHTML = "";

  fsData.forEach((r, i) => {
    body.innerHTML += `
      <tr>
        <td data-label="Kurz Bezeichnung">${r.kurz || ""}</td>
        <td data-label="Bezeichnung">${r.bezeichnung || ""}</td>
        <td data-label="Material">${r.material || ""}</td>
        <td data-label="Stückzahl">${r.stueck || ""}</td>
        ${fsCell(r.eNummer, i, "eNummer", "E-Nummer")}
        <td data-label="Kürzel">${r.kuerzel || ""}</td>
        ${fsCell(r.bestand, i, "bestand", "Bestand Konsilager")}
        ${fsCell(r.dpc, i, "dpc", "DPC")}
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


function editFS(icon, index, field) {
  const td = icon.closest("td");
  const old = fsData[index][field];
  td.innerHTML = `<input class="edit-input" value="${old || ""}">`;
  const input = td.querySelector("input");
  input.focus();
  input.onblur = () => {
    fsData[index][field] = input.value;
    saveFS();

    // 🔴 NEU: Änderungshistorie
    saveHistory({
      time: new Date().toISOString(),
      table: "FS",
      field,
      oldValue: old,
      newValue: input.value,
      row: fsData[index].bezeichnung
    });

    renderFS();
    reapplyFsColumns();
  };
}

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

function reapplyFsColumns() {
  document.querySelectorAll(".fs-column-controls input")
    .forEach(cb => cb.dispatchEvent(new Event("change")));
}

document.addEventListener("DOMContentLoaded", () => {
  renderFS();
  reapplyFsColumns();
});


