/* =====================================================
   DATEN
===================================================== */
const HISTORY_TABLE_KEY = "lagerTabelle";

const defaultData = [

/* =======================
   MATERIAL KERAMIK
======================= */
{ cat: "Material Keramik", material: "Alodur WRG 0,1 - 0,15 mm", enummer: "E32873900",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Alodur WRG 0,25 - 0,50 mm", enummer: "E32874100",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Alodur WRG 0,5 - 1,0 mm", enummer: "E32874200",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Tabular T 60 (14/28) 0,6 - 1mm Alfatab 30", enummer: "E32873100",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "DPC 200 mesh", enummer: "E32809100",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Zirkonsand DPC 300 (Mesh 300)", enummer: "E32809200",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "DPC 300FG", enummer: "E32809301",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Zircon Fine Grind (ZFG)", enummer: "E32809300",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Nabalox No. 113 (Aluminiumoxid)", enummer: "E32870500",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Edelkorund F240", enummer: "E32870800",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "F280", enummer: "E32874280",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Zirkonia ZrO² Z-211-D (Q1)", enummer: "E32871400",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Cobalt Aluminat", enummer: "E32808800",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Rhoseal", enummer: "E32873000",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Keramik", material: "Rhoseal HT", enummer: "E32873200",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },

/* =======================
   MATERIAL KERNFERTIGUNG
======================= */
{ cat: "Material Kernfertigung", material: "Remet FS 120 Mesh LHT", enummer: "E00010380",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Amosil FW4", enummer: "E00010376",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Amosil 550", enummer: "E00010377",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Sikron SF6000", enummer: "E00001155",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Zirkonmehl DPC 8, kalziniert", enummer: "E00004495",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Aluminiumhydroxid gepulvert (A800 EIMER)", enummer: "E00000452",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Al-Stearat", enummer: "E00001142",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Calciumstearat", enummer: "E00000451",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernfertigung", material: "Nabalox No202 II", enummer: "",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },

/* =======================
   MATERIAL WACHS
======================= */
{ cat: "Material Wachs", material: "Modellwachs A7 FR 60", enummer: "E32880700",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Wachs", material: "Paracast FW 14896", enummer: "E32882600",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Wachs", material: "Systemwachs B559 (Blau)", enummer: "E32882300",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },

/* =======================
   MATERIAL KERNBEARBEITUNG
======================= */
{ cat: "Material Kernbearbeitung", material: "SGT5 Blade 3889", enummer: "32838890",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernbearbeitung", material: "3876-2", enummer: "E32899602",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernbearbeitung", material: "3889-AK", enummer: "E32838894",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernbearbeitung", material: "3889-EK", enummer: "E32838892",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernbearbeitung", material: "3889-Mitte", enummer: "E32838893",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Kernbearbeitung", material: "3896", enummer: "E32838891",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },

/* ===========================
   MATERIAL SCHMELZE / BAFFLE
============================ */
{ cat: "Material FS/KE", material: "Baffle Ø 688mm", enummer: "E00007106",wahrendatum: "" , shelf: "Holz/CGT", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material FS/KE", material: "Baffle Ø 910mm", enummer: "E00007344",wahrendatum: "" , shelf: "Holz/CGT", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material FS/KE", material: "Hartfilzplatte 1000x1500", enummer: "E00033020",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },

/* =======================
   MATERIAL FM / TRENNEREI
======================= */
{ cat: "Material FM", material: "Korund NK 60", enummer: "E32853200",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material FM", material: "Korund NK 90", enummer: "E32853500",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },

/* =======================
   MATERIAL TRENNEREI
======================= */
{ cat: "Trennerei TR", material: "Nussschalengranulat", enummer: "E00010320B",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Trennerei TR", material: "Trenscheiben Tyrolit", enummer: "E000000000",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Trennerei TR", material: "Trenscheiben Pferd", enummer: "E000000000",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },

/* =======================
   MATERIAL FLÜSSIGKEITEN
======================= */
{ cat: "Material Flüssigkeiten Keramik", material: "W640 XC8", enummer: "E32874640",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Flüssigkeiten Keramik", material: "Latex Dow DL460E", enummer: "E32874500",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Flüssigkeiten Keramik", material: "Ludox PX30 PIC", enummer: "E32874300",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Flüssigkeiten Keramik", material: "Isopropanol", enummer: "E00006517",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false },
{ cat: "Material Flüssigkeiten Keramik", material: "Symperonic", enummer: "E32871300",wahrendatum: "" , shelf: "", bestand: "",_isDefault: true, _isClone: false }


];


