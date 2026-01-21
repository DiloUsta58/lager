(function () {
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  function applyThemeToAllFrames(theme) {
    // Top-Dokument
    applyTheme(theme);

    // Alle Frames explizit setzen
    const frames = window.top.frames;
    for (let i = 0; i < frames.length; i++) {
      try {
        frames[i].document.documentElement.setAttribute(
          "data-theme",
          theme
        );
      } catch (e) {
        // Frame evtl. noch nicht geladen
      }
    }
  }

  // 🔑 ZENTRALE TOGGLE-FUNKTION
  window.top.toggleTheme = function () {
    const current =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";

    localStorage.setItem("theme", current);
    applyThemeToAllFrames(current);
    updateThemeButton();
  };

  function updateThemeButton() {
    const btn = document.getElementById("themeToggleBtn");
    if (!btn) return;

    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    btn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  }

  // 🔄 Initialisierung (für Reloads)
  document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("theme") || "light";
    applyTheme(saved);
    updateThemeButton();
  });
})();
