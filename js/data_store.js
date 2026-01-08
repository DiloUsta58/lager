
/* =====================================================
   DATEN
===================================================== */
const HISTORY_TABLE_KEY = "lagerTabelle";

const defaultData = [

/* =======================
   MATERIAL KERAMIK
======================= */
{ cat: "Material Keramik", material: "Alodur 0,1 - 0,15", e: "E32873900", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Alodur 0,25 - 0,5", e: "E32874100", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Alodur 0,5 - 1", e: "E32874200", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Tabular 14/28", e: "E32873100", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "DPC 200 mesh", e: "E32809100", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "DPC 300 mesh", e: "E32809200", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "DPC 300FG", e: "E32809301", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "ZFG", e: "E32809300", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Nabalox", e: "E32870500", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "F-240", e: "E32870800", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "F-280", e: "E32874280", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "ZrO2 (ehemals Q1)", e: "E32871400", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Cobalt Aluminat", e: "E32808800", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Rhoseal", e: "E32873000", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Rhoseal HT", e: "E32873200", shelf: "", bestand: "",_isDefault: true, _isClone: false },

/* =======================
   MATERIAL KERNFERTIGUNG
======================= */
{ cat: "Material Kernfertigung", material: "Remet FS 120 Mesh LHT", e: "E00010380", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Amosil FW4", e: "E00010376", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Amosil 550", e: "E00010377", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Sikron SF6000", e: "E00001155", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Zirkon", e: "E00004495", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "A800", e: "E00000452", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Al-Stearat", e: "E00001142", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Ca-Stearat", e: "E00000451", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Nabalox No202 II", e: "", shelf: "", bestand: "",_isDefault: true, _isClone: false },

/* =======================
   MATERIAL WACHS
======================= */
{ cat: "Material Wachs", material: "Modellwachs A7 FR 60", e: "E32880700", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Wachs", material: "Paracast FW 14896", e: "E32882600", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Wachs", material: "B559", e: "E32882300", shelf: "", bestand: "",_isDefault: true, _isClone: false },

/* =======================
   MATERIAL KERNBEARBEITUNG
======================= */

{ cat: "Material Kernbearbeitung", material: "SGT5 Blade 3889", e: "32838890", shelf: "CIC", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernbearbeitung", material: "3876-2", e: "E32899602", shelf: "", bestand: "",_isDefault: true, _isClone: false },
/* ===========================
   MATERIAL SCHMELZE / BAFFLE
============================ */
{ cat: "Material FS/KE", material: "Baffle Ø 688mm", e: "E00007106", shelf: "Holz/CGT", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material FS/KE", material: "Baffle Ø 910mm", e: "E00007344", shelf: "Holz/CGT", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material FS/KE", material: "Hartfilzplatte 1000x1500", e: "E00033020", shelf: "", bestand: "",_isDefault: true, _isClone: false },

/* =======================
   MATERIAL FM / TRENNEREI
======================= */
{ cat: "Material FM / Trennerei", material: "Korund NK 60", e: "E32853200", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material FM / Trennerei", material: "Korund NK 90", e: "E32853500", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material FM / Trennerei", material: "Nussschalengranulat", e: "E00010320B", shelf: "", bestand: "",_isDefault: true, _isClone: false },

/* =======================
   MATERIAL FLÜSSIGKEITEN
======================= */
{ cat: "Material Flüssigkeiten Keramik", material: "W640", e: "E32874640", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Flüssigkeiten Keramik", material: "Latex", e: "E32874500", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Flüssigkeiten Keramik", material: "Ludox", e: "E32874300", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Flüssigkeiten Keramik", material: "Isopropanol", e: "E00006517", shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Flüssigkeiten Keramik", material: "Symperonic", e: "E32871300", shelf: "", bestand: "",_isDefault: true, _isClone: false }


];