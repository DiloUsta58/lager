/* =====================================================
   AUTOMATISCHES BACKUP VOR IMPORT
===================================================== */

  function createBackup() {
  const backup = {
    timestamp: new Date().toISOString(),
    ke: data,
    fs: fsData,
    fm: fmData,
    history: historyData
  };

  localStorage.setItem(
    "backup_before_import",
    JSON.stringify(backup)
  );
}

/* =====================================================
   IMPORT
===================================================== */
window.top.importAllData = function (input) {
  if (!input || !input.files || !input.files.length) return;

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    let jsonText = reader.result;

    if (typeof jsonText === "string") {
      jsonText = jsonText.trim().replace(/^\uFEFF/, "");
    }

    let json;
    try {
      json = JSON.parse(jsonText);
    } catch (e) {
      alert("Datei ist kein gültiges JSON");
      return;
    }

    /* ===== ORIGINALLOGIK – UNVERÄNDERT ===== */

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
};


/* =====================================================
   EXPORT – ZENTRAL
===================================================== */

window.top.exportAllData = function () {
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
};

