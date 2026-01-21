/* =====================================================
   SEARCH UI CONTROLLER
   - nur UI + Events
   - keine Logik
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  if (!window.App || typeof App.performSearch !== "function") {
    console.error("Search API nicht verfügbar");
    return;
  }

  const search    = document.getElementById("search");
  const clear     = document.getElementById("searchClear");
  const next      = document.getElementById("searchNext");
  const prev      = document.getElementById("searchPrev");
  const searchNav = document.getElementById("searchNav");

  if (!search || !clear || !searchNav) return;

  function updateNav() {
    searchNav.style.display = hasSearchHits() ? "flex" : "none";
  }

  /* INPUT */
  search.addEventListener("input", () => {
    clear.style.display = search.value ? "inline" : "none";
    App.performSearch(search.value);
    requestAnimationFrame(updateNav);
  });

  /* CLEAR */
  clear.addEventListener("click", () => {
    search.value = "";
    clear.style.display = "none";
    App.clearSearch();
    updateNav();
  });

  /* BUTTONS */
  next?.addEventListener("click", App.searchNext);
  prev?.addEventListener("click", App.searchPrev);

  /* KEYBOARD */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      search.value = "";
      clear.style.display = "none";
      App.clearSearch();
      updateNav();
    }
    if (e.key === "ArrowDown") App.searchNext();
    if (e.key === "ArrowUp") App.searchPrev();
    if (e.key === "Enter") App.searchNext();
  });

  updateNav();
});
