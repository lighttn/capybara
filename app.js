(function () {
  const GUIDE = window.GUIDE;
  const mainTabsEl = document.getElementById("main-tabs");
  const subTabsEl = document.getElementById("sub-tabs");
  const contentEl = document.getElementById("content");
  const searchEl = document.getElementById("search");

  const state = { main: GUIDE[0].id, sub: GUIDE[0].sections[0].id, level: "all", query: "" };

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Escape and dim trailing "# comments" in code examples
  function highlight(code) {
    return code
      .split("\n")
      .map((line) => {
        const i = line.startsWith("#") ? 0 : line.indexOf(" #");
        const before = i < 0 ? "" : line.slice(0, i);
        const quotes = (before.match(/"/g) || []).length + (before.match(/'/g) || []).length;
        if (i < 0 || quotes % 2) return esc(line);
        return esc(before) + '<span class="cm">' + esc(line.slice(i)) + "</span>";
      })
      .join("\n");
  }

  const findMain = (id) => GUIDE.find((g) => g.id === id) || GUIDE[0];

  function readHash() {
    const [m, s] = location.hash.replace(/^#\/?/, "").split("/");
    const main = findMain(m);
    state.main = main.id;
    state.sub = (main.sections.find((x) => x.id === s) || main.sections[0]).id;
  }

  function go(main, sub) {
    history.replaceState(null, "", `#/${main}/${sub}`);
    state.main = main;
    state.sub = sub;
    render();
  }

  function renderMainTabs() {
    // Only update aria-selected on existing tabs (HTML is static — extra tabs live alongside)
    mainTabsEl.querySelectorAll("[data-main]").forEach((btn) => {
      btn.setAttribute("aria-selected", !state.query && btn.dataset.main === state.main ? "true" : "false");
    });
  }

  function renderSubTabs() {
    const main = findMain(state.main);
    subTabsEl.innerHTML =
      `<p class="side-title">${esc(main.label)} topics</p>` +
      main.sections
        .map(
          (s) => `<button role="tab" class="sub-tab" aria-selected="${!state.query && s.id === state.sub}" data-sub="${s.id}">
          <span class="ico">${s.icon}</span><span class="lbl">${esc(s.label)}</span><span class="n">${s.items.length}</span>
        </button>`
        )
        .join("");
  }

  function card(item, crumb) {
    const lang = item.lang || (crumb.mainId === "python" ? "python" : "bash");
    return `<article class="card ${item.danger ? "is-danger" : ""}">
      <header>
        <h3><code>${esc(item.cmd)}</code></h3>
        <div class="badges">
          ${item.danger ? '<span class="badge danger" title="Can delete data or change your system">⚠ careful</span>' : ""}
          <span class="badge lvl-${item.level}">${item.level}</span>
        </div>
      </header>
      ${crumb.show ? `<p class="crumb">${esc(crumb.main)} › ${esc(crumb.sub)}</p>` : ""}
      <p class="desc">${esc(item.desc)}</p>
      <div class="code">
        <div class="code-bar"><span>${lang}</span><button class="copy" data-copy="${esc(item.ex)}">Copy</button></div>
        <pre><code>${highlight(item.ex)}</code></pre>
        ${item.out ? `<div class="out"><span>output</span><pre>${esc(item.out)}</pre></div>` : ""}
      </div>
    </article>`;
  }

  const levelOk = (item) => state.level === "all" || item.level === state.level;

  function filterBar() {
    const levels = ["all", "beginner", "intermediate", "advanced"];
    return `<div class="filters" role="group" aria-label="Filter by level">${levels
      .map((l) => `<button class="chip ${state.level === l ? "on" : ""}" data-level="${l}">${l}</button>`)
      .join("")}</div>`;
  }

  function renderSection() {
    const main = findMain(state.main);
    const sec = main.sections.find((s) => s.id === state.sub);
    const items = sec.items.filter(levelOk);
    contentEl.innerHTML = `
      <section class="section-head">
        <p class="eyebrow">${main.icon} ${esc(main.label)}</p>
        <h2>${sec.icon} ${esc(sec.label)}</h2>
        <p class="intro">${esc(sec.intro)}</p>
        ${sec.tips ? `<div class="tips"><strong>Beginner tips</strong><ul>${sec.tips.map((t) => `<li>${t}</li>`).join("")}</ul></div>` : ""}
        ${filterBar()}
      </section>
      <div class="grid">${
        items.length
          ? items.map((i) => card(i, { mainId: main.id })).join("")
          : `<p class="empty">No ${state.level} commands in this topic.</p>`
      }</div>`;
  }

  function renderSearch() {
    const q = state.query.toLowerCase();
    const results = [];
    GUIDE.forEach((g) =>
      g.sections.forEach((s) =>
        s.items.forEach((i) => {
          const hay = (i.cmd + " " + i.desc + " " + i.ex + " " + s.label).toLowerCase();
          if (q.split(/\s+/).every((w) => hay.includes(w)) && levelOk(i)) results.push({ g, s, i });
        })
      )
    );
    contentEl.innerHTML = `
      <section class="section-head">
        <p class="eyebrow">Search</p>
        <h2>${results.length} result${results.length === 1 ? "" : "s"} for “${esc(state.query)}”</h2>
        ${filterBar()}
      </section>
      <div class="grid">${
        results.length
          ? results
              .map(({ g, s, i }) => card(i, { show: true, main: g.label, sub: s.label, mainId: g.id }))
              .join("")
          : `<p class="empty">Nothing found. Try a simpler word like “copy”, “list” or “loop”.</p>`
      }</div>`;
  }

  function render() {
    renderMainTabs();
    renderSubTabs();
    state.query ? renderSearch() : renderSection();
  }

  mainTabsEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-main]");
    if (!b) return;
    clearSearch();
    const main = findMain(b.dataset.main);
    go(main.id, main.sections[0].id);
  });

  subTabsEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-sub]");
    if (!b) return;
    clearSearch();
    go(state.main, b.dataset.sub);
    if (window.innerWidth < 860) contentEl.scrollIntoView({ behavior: "smooth" });
  });

  contentEl.addEventListener("click", async (e) => {
    const chip = e.target.closest("[data-level]");
    if (chip) {
      state.level = chip.dataset.level;
      return render();
    }
    const btn = e.target.closest(".copy");
    if (!btn) return;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = "Copied ✓";
    } catch {
      btn.textContent = "Press Ctrl+C";
    }
    btn.classList.add("done");
    setTimeout(() => {
      btn.textContent = "Copy";
      btn.classList.remove("done");
    }, 1400);
  });

  function clearSearch() {
    state.query = "";
    searchEl.value = "";
  }

  searchEl.addEventListener("input", () => {
    state.query = searchEl.value.trim();
    render();
  });

  document.addEventListener("keydown", (e) => {
    if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && document.activeElement !== searchEl)) {
      e.preventDefault();
      searchEl.focus();
      searchEl.select();
    } else if (e.key === "Escape" && document.activeElement === searchEl) {
      clearSearch();
      searchEl.blur();
      render();
    }
  });

  window.addEventListener("hashchange", () => {
    readHash();
    render();
  });

  readHash();
  render();
})();
