/* =========================
   STORAGE KEY – FM
========================= */
const FM_STORAGE_KEY = "fmData";

/* =========================
   Editier Bereich – FS
========================= */
const FM_EDITABLE_FIELDS = [
  "bestand",
  "bemerkung"
];
/* =====================================================
   STATUS
===================================================== */


const DEFAULT_FM_DATA = [
  {
    pos1: 1,
    artikel1: "E00034311",
    artikel2: "E00034067",
    artikel: "052J",
    koernung: "60",
    abmessung: "6 x 610",
    verpackung: "250",
    pos_Nr: "1",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 2,
    artikel1: "E00034312",
    artikel2: "E00034068",
    artikel: "052J",
    koernung: "80",
    abmessung: "6 x 610",
    verpackung: "250",
    pos_Nr: "2",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 3,
    artikel1: "E00034307",
    artikel2: "E00034066",
    artikel: "052J",
    koernung: "60",
    abmessung: "15 x 457",
    verpackung: "250",
    pos_Nr: "3",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 4,
    artikel1: "E00034308",
    artikel2: "E00034065",
    artikel: "052J",
    koernung: "80",
    abmessung: "15 x 457",
    verpackung: "250",
    pos_Nr: "4",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 5,
    artikel1: "E00034328",
    artikel2: "E00010411",
    artikel: "051XP P50",
    koernung: "50",
    abmessung: "25 x 760",
    verpackung: "50",
    pos_Nr: "5",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 6,
    artikel1: "E00034304",
    artikel2: "E00034072",
    artikel: "052J",
    koernung: "60",
    abmessung: "25 x 760",
    verpackung: "100",
    pos_Nr: "6",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 7,
    artikel1: "E00034305",
    artikel2: "E00034063",
    artikel: "052J",
    koernung: "80",
    abmessung: "25 x 760",
    verpackung: "100",
    pos_Nr: "7",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 8,
    artikel1: "E00034323",
    artikel2: "E00034061",
    artikel: "051XP",
    koernung: "60",
    abmessung: "50 x 1067",
    verpackung: "10",
    pos_Nr: "8",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 9,
    artikel1: "E00034317",
    artikel2: "E00034062",
    artikel: "052J",
    koernung: "60",
    abmessung: "50 x 1067",
    verpackung: "20",
    pos_Nr: "9",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 10,
    artikel1: "E00034318",
    artikel2: "E00034071",
    artikel: "052J",
    koernung: "80",
    abmessung: "50 x 1067",
    verpackung: "20",
    pos_Nr: "10",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },

  {
    pos1: 11,
    artikel1: "E00034310",
    artikel2: "E00034052",
    artikel: "052J",
    koernung: "80",
    abmessung: "50 x 2500",
    verpackung: "100",
    pos_Nr: "11",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 12,
    artikel1: "E00034321",
    artikel2: "E00034051",
    artikel: "051XP",
    koernung: "60",
    abmessung: "50 x 2500",
    verpackung: "50",
    pos_Nr: "12",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 13,
    artikel1: "E00034322",
    artikel2: "E00034053",
    artikel: "051XP",
    koernung: "80",
    abmessung: "50 x 2500",
    verpackung: "50",
    pos_Nr: "13",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 14,
    artikel1: "E00034300",
    artikel2: "E00034058",
    artikel: "552JFF",
    koernung: "120",
    abmessung: "48 x 2500",
    verpackung: "20",
    pos_Nr: "14",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },

  {
    pos1: 15,
    artikel1: "E00034301",
    artikel2: "E00034060",
    artikel: "552JFF",
    koernung: "180",
    abmessung: "48 x 2500",
    verpackung: "20",
    pos_Nr: "15",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 16,
    artikel1: "E00034325",
    artikel2: "E00034074",
    artikel: "051XP",
    koernung: "60",
    abmessung: "50 x 3500",
    verpackung: "50",
    pos_Nr: "16",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },

  {
    pos1: 17,
    artikel1: "E00034309",
    artikel2: "E000XXXXX",
    artikel: "052J",
    koernung: "180",
    abmessung: "15 x 457",
    verpackung: "250",
    pos_Nr: "17",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 18,
    artikel1: "E00034306",
    artikel2: "E000XXXXX",
    artikel: "052J",
    koernung: "180",
    abmessung: "25 x 760",
    verpackung: "100",
    pos_Nr: "18",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },

  {
    pos1: 19,
    artikel1: "E00034303",
    artikel2: "E00034059",
    artikel: "552JFF",
    koernung: "180",
    abmessung: "50 x 2500",
    verpackung: "20",
    pos_Nr: "19",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 20,
    artikel1: "E00034302",
    artikel2: "E00034057",
    artikel: "552JFF",
    koernung: "120",
    abmessung: "50 x 2500",
    verpackung: "20",
    pos_Nr: "20",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },

  {
    pos1: 21,
    artikel1: "E00034313",
    artikel2: "E000XXXXX",
    artikel: "052J",
    koernung: "60",
    abmessung: "25 x 3500",
    verpackung: "????",
    pos_Nr: "21",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 22,
    artikel1: "E00034314",
    artikel2: "E000XXXXX",
    artikel: "052J",
    koernung: "80",
    abmessung: "25 x 3500",
    verpackung: "????",
    pos_Nr: "22",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },

  {
    pos1: 23,
    artikel1: "E00034327",
    artikel2: "E000XXXXX",
    artikel: "071XP",
    koernung: "80",
    abmessung: "50 x 2500",
    verpackung: "????",
    pos_Nr: "23",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 24,
    artikel1: "E00034324",
    artikel2: "E000XXXXX",
    artikel: "071XP",
    koernung: "60",
    abmessung: "50 x 1067",
    verpackung: "????",
    pos_Nr: "24",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },

  {
    pos1: 25,
    artikel1: "E00034336",
    artikel2: "E000XXXXX",
    artikel: "P36",
    koernung: "60",
    abmessung: "150 x 3500",
    verpackung: "????",
    pos_Nr: "25",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 26,
    artikel1: "E00034329",
    artikel2: "E000XXXXX",
    artikel: "????",
    koernung: "60+",
    abmessung: "18 x 2030",
    verpackung: "????",
    pos_Nr: "26",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },

  {
    pos1: 27,
    artikel1: "E00034330",
    artikel2: "E000XXXXX",
    artikel: "????",
    koernung: "80+",
    abmessung: "18 x 2040",
    verpackung: "????",
    pos_Nr: "27",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 28,
    artikel1: "E00034331",
    artikel2: "E000XXXXX",
    artikel: "????",
    koernung: "80",
    abmessung: "18 x 2010",
    verpackung: "????",
    pos_Nr: "28",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },

  {
    pos1: 29,
    artikel1: "E00034332",
    artikel2: "E000XXXXX",
    artikel: "????",
    koernung: "60+",
    abmessung: "30 x 3500",
    verpackung: "????",
    pos_Nr: "29",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 30,
    artikel1: "E00034333",
    artikel2: "E000XXXXX",
    artikel: "????",
    koernung: "36+",
    abmessung: "30 x 3500",
    verpackung: "????",
    pos_Nr: "30",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },

  {
    pos1: 31,
    artikel1: "E00034334",
    artikel2: "E000XXXXX",
    artikel: "????",
    koernung: "80",
    abmessung: "25 x 3500",
    verpackung: "????",
    pos_Nr: "31",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 32,
    artikel1: "E00034335",
    artikel2: "E000XXXXX",
    artikel: "????",
    koernung: "60",
    abmessung: "25 x 3500",
    verpackung: "????",
    pos_Nr: "32",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },

  {
    pos1: 33,
    artikel1: "E00034326",
    artikel2: "E00034075",
    artikel: "051XP",
    koernung: "80",
    abmessung: "50 x 3500",
    verpackung: "????",
    pos_Nr: "33",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  },
  {
    pos1: 34,
    artikel1: "E00034320",
    artikel2: "E000XXXXX",
    artikel: "????",
    koernung: "80",
    abmessung: "6 x 610",
    verpackung: "????",
    pos_Nr: "34",
    bestand: 0,
    bemerkung: "",
    _isDefault: true
  }
];

let fmData = loadFMData();
/* Daten Laden */
function loadFMData() {
  const stored = localStorage.getItem(FM_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return structuredClone(DEFAULT_FM_DATA);
    }
  }
  return structuredClone(DEFAULT_FM_DATA);
}

/* Daten Speichern */
function saveFMData() {
  localStorage.setItem(FM_STORAGE_KEY, JSON.stringify(fmData));
}

/* Edit funktion */
function fmCell(value, rowIndex, field) {
  const canEdit = FM_EDITABLE_FIELDS.includes(field);
  let extraClass = "";
  let tooltip = "";
/* ===== TOOLTIP FÜR GANZE SPALTE ===== */
  if (field === "bestand") {
    const pos = rowIndex + 1;
    const bestand = Number(value) || 0;

    tooltip = `Bestand: ${bestand}`;

    if (pos >= 1 && pos <= 34) {
      extraClass = bestand === 0
        ? "fm-bestand-zero"
        : "fm-bestand-ok";
    }
  }
/* ===== ENDE ===== */
  return `
    <td
      data-col="${field}"
      class="${extraClass} ${canEdit ? "" : "protected"}"
      title="${tooltip}"
    >
      <div class="edit-wrapper">
        <span>${value ?? ""}</span>
        ${
          canEdit
            ? `<span class="edit-icon"
                     onclick="editFM(this, ${rowIndex}, '${field}')">✏️</span>`
            : ""
        }
      </div>
    </td>
  `;
}


async function editFM(icon, rowIndex, field) {
  AppState.isEditing = true;
  /* Feld darf überhaupt editiert werden */
  if (!FM_EDITABLE_FIELDS.includes(field)) return;

  /* 🔐 Zentrale Edit-Freigabe (Admin ohne Key, Edit mit Key) */
  if (!await requireEditSaveUnlock()) return;

  const td = icon.closest("td");
  if (!td) return;

  const span = td.querySelector("span");
  if (!span) return;

  const oldValue = span.textContent ?? "";

  /* ✨ Edit startet → Aktivität */
  registerEditActivity();

  /* Input erzeugen */
  const input = document.createElement("input");
  input.type = "text";
  input.value = oldValue;
  input.className = "cell-input";

  /* Span ersetzen */
  span.replaceWith(input);
  input.focus();
  input.addEventListener("focus", () => {
    AppState.isEditing = true;
  });

  function save() {
    AppState.isEditing = false;
    const newValue = input.value.trim();

    /* Speichern zählt als Aktivität */
    registerEditActivity();

    if (newValue !== oldValue) {
      fmData[rowIndex][field] = newValue;
      saveFMData();
    }

    renderFM();
  }

  /* ⌨️ Tippen hält Edit aktiv */
  input.addEventListener("input", registerEditActivity);

  input.addEventListener("blur", () => {
    setTimeout(save, 0);
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") input.blur();
    if (e.key === "Escape") {
        AppState.isEditing = false;   // 🔑 HINZUFÜGEN
        renderFM();
      }
  });
}



function renderFM() {
  if (!loggedIn) return;
  const tbody = document.getElementById("fmTableBody");

  if (AppState.isEditing) return;
  tbody.innerHTML = "";

  /* ===== FILTER ===== */
  let fmFiltered = fmData;

  if (globalSearchTerm) {
    fmFiltered = fmFiltered.filter(row =>
      Object.values(row).some(v =>
        String(v).toLowerCase().includes(globalSearchTerm)
      )
    );
  }

  setTabCount("fm", fmFiltered.length);
  /* ===== ENDE FILTER ===== */

fmFiltered.forEach((row, i) => {
  const bestand = Number(row.bestand) || 0;
  const bestandText = bestand.toLocaleString("de-DE");

  tbody.innerHTML += `
    <tr title="Lagerbestand: ${bestandText}">
        <td data-col="pos1">${highlightText(row.pos1 ?? "", globalSearchTerm)}</td>
        <td data-col="artikel1">${highlightText(row.artikel1 ?? "", globalSearchTerm)}</td>
        <td data-col="artikel2">${highlightText(row.artikel2 ?? "", globalSearchTerm)}</td>
        <td data-col="artikel">${highlightText(row.artikel ?? "", globalSearchTerm)}</td>
        <td data-col="koernung">${highlightText(row.koernung ?? "", globalSearchTerm)}</td>
        <td data-col="abmessung">${highlightText(row.abmessung ?? "", globalSearchTerm)}</td>
        <td data-col="verpackung">${highlightText(row.verpackung ?? "", globalSearchTerm)}</td>
        <td data-col="verpackung">${highlightText(row.pos_Nr ?? "", globalSearchTerm)}</td>
        ${fmCell(row.bestand, i, "bestand")}
        ${fmCell(row.bemerkung, i, "bemerkung")}
      </tr>
    `;
  });
}

/* =====================================================
   RESET FM SECTION (ADMIN)
===================================================== */
function resetFM() {
  /* =========================
     ADMIN-PRÜFUNG
  ========================= */
  if (!requireAdminUnlock()) return;

  /* =========================
     BESTÄTIGUNG
  ========================= */
  if (!confirm("FM-Daten wirklich zurücksetzen?")) return;

  /* =========================
     RESET
  ========================= */
  localStorage.removeItem("fmData");

  fmData = structuredClone(DEFAULT_FM_DATA);
  renderFM();
}

