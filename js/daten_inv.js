

// daten_inv.js
window.INV_EXTRA_DATA = [
  {
    source: "INV",
    beschreibung: "Sonderbestand XYZ",
    material: "XYZ",
    eNummer: "E00099999",
    charge: "",
    palette: "",
    bestand: "12"
  }
];


function berechneBestandMitStk(material, menge) {
  if (!material || isNaN(menge)) return null;

  const key = material.toLowerCase().trim();

  if (MATERIAL_GEWICHT_PRO_STK[key]) {
    const kgProStk = MATERIAL_GEWICHT_PRO_STK[key];
    const gesamtKg = menge * kgProStk;

    return {
      wert: gesamtKg,
      text: `${gesamtKg} kg – (${menge} Stk.)`
    };
  }

  if (MATERIAL_PRO_STK[key]) {
    const proStk = MATERIAL_PRO_STK[key];
    const gesamt = menge * proStk;

    return {
      wert: gesamt,
      text: `${gesamt} Stk – (${menge} Einh.)`
    };
  }

  return null;
}
