(function initSearch() {
  function waitForAPI() {
    if (window.top?.App?.performSearch) start();
    else setTimeout(waitForAPI, 50);
  }

  function start() {
    const App = window.top.App;

    const search = document.getElementById("search");
    const clear = document.getElementById("searchClear");
    const next = document.getElementById("searchNext");
    const prev = document.getElementById("searchPrev");

    if (!search || !clear) return;

    search.addEventListener("input", () => {
      clear.style.display = search.value ? "inline" : "none";
      App.performSearch(search.value);
    });

    clear.addEventListener("click", () => {
      search.value = "";
      clear.style.display = "none";
      App.clearSearch?.();
    });

    next?.addEventListener("click", () => App.searchNext?.());
    prev?.addEventListener("click", () => App.searchPrev?.());

    /* Tastatur-Navigation im Suchfeld */
    search.addEventListener("keydown", e => {
      if (!window.top.hasSearchHits?.()) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          App.searchNext?.();
          break;
        case "ArrowUp":
          e.preventDefault();
          App.searchPrev?.();
          break;
        case "Enter":
          e.preventDefault();
          e.shiftKey ? App.searchPrev?.() : App.searchNext?.();
          break;
      }
    });

    /* ESC global */
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        search.value = "";
        clear.style.display = "none";
        App.clearSearch?.();
      }
    });
  }

  waitForAPI();
})();
