/* =========================
   STORAGE KEY – FS
========================= */
const FS_KEY = "fs_lager_data_v1";
/* console.log("FS STORAGE RAW AT LOAD =", localStorage.getItem("fs_lager_data_v1")); */

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
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "30#",
    bezeichnung: "30# Melting Liner F4XADG0560",
    material: "F4XADG0560",
    stueck: 144,
    eNummer: "E32346800",
    kuerzel: "560",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "50#",
    bezeichnung: "50# Melting Liner F4XADG0561",
    material: "F4XADG0561",
    stueck: 144,
    eNummer: "E32347200",
    kuerzel: "561",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "60#",
    bezeichnung: "60# Melting Liner F4XADG0758",
    material: "F4XADG0758",
    stueck: 144,
    eNummer: "E32347400",
    kuerzel: "758",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "75#",
    bezeichnung: "75# Melting Liner F4XADG0759",
    material: "F4XADG0759",
    stueck: 100,
    eNummer: "E32347600",
    kuerzel: "759",
    bestand: "0",
    dpc: "0"
  },
   {
    kurz: "45kg Melting Liner",
    bezeichnung: "45 kg Melting Liner A4AADG1351",
    material: "A4AADG1351",
    stueck: 32,
    eNummer: "EXXXXXXXX",
    kuerzel: "1351",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "55kg Melting Liner",
    bezeichnung: "55kg Melting Liner A4AADG1350",
    material: "A4AADG1350",
    stueck: 32,
    eNummer: "EXXXXXXXX",
    kuerzel: "1350",
    bestand: "0",
    dpc: "0"
  },
     {
    kurz: "75kg RECESSED RADIUS LINER",
    bezeichnung: "45 kg Melting Liner A4AADG1344",
    material: "A4AADG1344",
    stueck: 32,
    eNummer: "EXXXXXXXX",
    kuerzel: "1344",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "110 CS",
    bezeichnung: "110# Melting Liner F4XADG0926",
    material: "F4XADG0926",
    stueck: 100,
    eNummer: "E32347800",
    kuerzel: "926 CS",
    bestand: "0",
    dpc: "0"
  },
    {
    kurz: "110 AL",
    bezeichnung: "110# Melting Liner A4AADG0926",
    material: "A4AADG0926",
    stueck: 100,
    eNummer: "E32346200",
    kuerzel: "926",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "150cs",
    bezeichnung: "50kg Melting Liner F4AADG0996",
    material: "F4AADG0996 CS",
    stueck: 32,
    eNummer: "E32348000",
    kuerzel: "996",
    bestand: "0",
    dpc: "0"
  },
    {
    kurz: "150Alu",
    bezeichnung: "50kg Melting Liner A4AADG0996",
    material: "A4AADG0996 AL",
    stueck: 32,
    eNummer: "E32348004",
    kuerzel: "996",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "171#",
    bezeichnung: "171# Melting Liner A4AADG1171",
    material: "A4AADG1171",
    stueck: 32,
    eNummer: "E32350100",
    kuerzel: "1171",
    bestand: "0",
    dpc: "0"
  },
    {
    kurz: "205# ALUMICON",
    bezeichnung: "205# A4AADG1170",
    material: "A4AADG",
    stueck: 32,
    eNummer: "E32348005",
    kuerzel: "1170",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "205# Backup",
    bezeichnung: "205 Back up AUB932",
    material: "A4B932",
    stueck: 9,
    eNummer: "E32350600",
    kuerzel: "932",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "120kg",
    bezeichnung: "120kg Alumina A4AADG1239",
    material: "A4AADG1239",
    stueck: 18,
    eNummer: "E32346120",
    kuerzel: "1239",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "155kg",
    bezeichnung: "155kg MELTING LINER A4AADG1444",
    material: "A4AADG1444",
    stueck: 9,
    eNummer: "E32346155",
    kuerzel: "1444",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "FUX1198",
    bezeichnung: "3761 Spritzschutz FUX1198",
    material: "F4X",
    stueck: 48,
    eNummer: "E32348006",
    kuerzel: "F4X1198",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "120kg",
    bezeichnung: "120kg Backup A4BADG1154",
    material: "A4BADG1154",
    stueck: 5,
    eNummer: "E32349120",
    kuerzel: "1154",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "135",
    bezeichnung: "Liner",
    material: "A4D",
    stueck: 0,
    eNummer: "E32349135",
    kuerzel: "12011",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "135",
    bezeichnung: "Backup 155kg 1095",
    material: "A4D",
    stueck: 135,
    eNummer: "E32349136",
    kuerzel: "12011",
    bestand: "0",
    dpc: "0"
  },
  {
    kurz: "Cover F4A",
    bezeichnung: "Cover F4A",
    material: "F4A",
    stueck: 144,
    eNummer: "E32380310",
    kuerzel: "F4A1052",
    bestand: "0",
    dpc: "0"
  }
];

/* =========================
   FS – HILFSFUNKTIONEN
========================= */
function fsBestandClass(value) {
  const num = Number(value);

  if (!num || num <= 0) return "fs-zero";
  if (num === 1) return "fs-low";
  return "fs-positive";
}


/* kurzer Pulse-Effek */
function pulseFSCell(index, field) {
  const rows = document.querySelectorAll("#fsTableBody tr");
  const row = rows[index];
  if (!row) return;

  const cellMap = {
    bestand: 6, // Spaltenindex anpassen falls nötig
    dpc: 7
  };

  const cellIndex = cellMap[field];
  if (cellIndex == null) return;

  const td = row.children[cellIndex];
  if (!td) return;

  td.classList.remove("fs-pulse");
  void td.offsetWidth; // 🔑 Reflow erzwingen
  td.classList.add("fs-pulse");
}


/* =========================
   AKTIVE DATEN (ROBUST)
========================= */

let fsData;

(function initFS() {
  const raw = localStorage.getItem(FS_KEY);

  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        fsData = parsed;
        console.log("✅ FS geladen aus localStorage (fsData)");
        return;
      }
    } catch (e) {
      console.warn("⚠️ FS: JSON defekt → Defaults werden geladen", e);
    }
  } else {
    console.warn("⚠️ FS: Kein Storage-Eintrag → Defaults werden geladen");
  }

  // ⚠️ HIER werden Defaults geladen
  fsData = structuredClone(DEFAULT_FS_DATA);
})();

/* =========================
Beim Import IMMER normalisieren
fsData = importedData.map(normalizeFSRow);
saveFS();
renderFS();

Nach Init:
fsData = fsData.map(normalizeFSRow);
========================= */

function normalizeFSRow(row) {
  return {
    kurz: row.kurz ?? row.short ?? "",
    bezeichnung: row.bezeichnung ?? row.name ?? "",
    material: row.material ?? row.materialNr ?? "",
    stueck: row.stueck ?? row.menge ?? "",
    eNummer: row.eNummer ?? row.e_nummer ?? "",
    kuerzel: row.kuerzel ?? "",
    bestand: row.bestand ?? row.lagerbestand ?? "",
    dpc: row.dpc ?? ""
  };
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

function formatENummerDisplayFS(value) {
  const str = String(value ?? "");
  if (!str) return "";
  if (!window.matchMedia("(max-width: 1024px)").matches) return str;
  if (str.length <= 4) return str;
  return "…" + str.slice(4);
}

/* =========================
   RENDERING
========================= */
function renderFS() {
  /* console.log("FS BEFORE RENDER", fsData); */

  const body = document.getElementById("fsTableBody");
  if (!body || AppState.isEditing) return;

  body.innerHTML = "";

  /* ===== FILTER ===== */
  let fsFiltered = fsData;

  if (globalSearchTerm) {
    const term = globalSearchTerm.toLowerCase();
    fsFiltered = fsFiltered.filter(row =>
      Object.values(row).some(v =>
        String(v ?? "").toLowerCase().includes(term)
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
          highlightText(formatENummerDisplayFS(r.eNummer || ""), globalSearchTerm),
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
          "Bestand Konsilager",
          fsBestandClass(r.bestand)
        )}

        ${fsCell(
          highlightText(r.dpc || "", globalSearchTerm),
          i,
          "dpc",
          "Bestand DPC",
          fsBestandClass(r.dpc)
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
  if (!await requireEditSaveUnlock()) {
    AppState.isEditing = false;
    return;
  }

  const td = icon.closest("td");
  if (!td) {
    AppState.isEditing = false;
    return;
  }

  const oldValue = fsData[index]?.[field] ?? "";

  td.innerHTML = `
    <div class="edit-wrapper">
      <input class="edit-input" value="${oldValue}">
      <button class="edit-apply" type="button">✔️</button>
    </div>
  `;


  const btn = td.querySelector(".edit-apply");
  const input = td.querySelector("input");
  /* 🔧 Bestand/DPC: Dezimalzahl mit 2 Stellen */
  if (field === "bestand" || field === "dpc") {
    input.setAttribute("inputmode", "decimal");
    input.setAttribute("pattern", "[0-9]+([,.][0-9]{0,2})?");
    input.addEventListener("input", () => {
      let v = input.value;
      v = v.replace(/\./g, ",").replace(/[^\d,]/g, "");
      const parts = v.split(",");
      const intPart = parts[0] || "";
      const decPart = parts[1] ? parts[1].slice(0, 2) : "";
      const endsWithComma = v.endsWith(",");
      if (decPart !== "" || endsWithComma) {
        v = `${intPart},${decPart}`;
      } else {
        v = intPart;
      }
      input.value = v;
    });
  }

  input.focus();

  /* ✨ Edit startet */
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
      AppState.isEditing = false;
      if (typeof renderFS === "function") renderFS();
    }
  });

    const commit = () => {
      AppState.isEditing = false;

      const newValue = input.value.trim();
      registerEditActivity();

      fsData[index][field] = newValue;
      saveFS();

      if (typeof renderFS === "function") renderFS();
      if (typeof reapplyFsColumns === "function") reapplyFsColumns();

      if (field === "bestand" || field === "dpc") {
        setTimeout(() => pulseFSCell(index, field), 0);
      }
    };

    /* ENTER */
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        commit();
      }
    });

    /* ESC */
    input.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        e.preventDefault();
        AppState.isEditing = false;
        renderFS();
      }
    });

    /* Button klick */
    btn.addEventListener("click", commit);

    /* Blur */
    input.addEventListener("blur", () => {
      setTimeout(commit, 0);
    });

}


/* =====================================================
   RESET FS SECTION (ADMIN)
===================================================== */
function resetFS() {
  if (!requireAdminUnlock()) return;
  if (!confirm("FS-Daten wirklich zurücksetzen?")) return;

  fsData = structuredClone(DEFAULT_FS_DATA);
  localStorage.setItem(FS_KEY, JSON.stringify(fsData));
  renderFS();
}
