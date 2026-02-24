(function globalCourtEnhancements() {
  const key = "globalCourtState:" + window.location.pathname;
  const checks = [
    { label: "Headline is specific and outcome-focused.", points: 20 },
    { label: "Content has practical examples.", points: 20 },
    { label: "Sections are easy to scan.", points: 20 },
    { label: "Reader gets a clear next action.", points: 20 },
    { label: "SEO basics are covered (tags/meta).", points: 20 }
  ];

  function safeParseState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function persistState(indices) {
    try {
      localStorage.setItem(key, JSON.stringify(indices));
    } catch (error) {
      return;
    }
  }

  function computeVerdict(score) {
    if (score >= 80) return "Verdict: ready to publish.";
    if (score >= 60) return "Verdict: close, refine key sections.";
    return "Verdict: strengthen clarity and value first.";
  }

  function addImageAndLinkImprovements() {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
      if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
    });

    const externalLinks = document.querySelectorAll("a[target=\"_blank\"]");
    externalLinks.forEach((link) => {
      const rel = link.getAttribute("rel") || "";
      if (!/noopener/.test(rel) || !/noreferrer/.test(rel)) {
        link.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  function renderWidget() {
    const mount = document.body;
    if (!mount) return;

    if (document.querySelector(".gp-court-shell")) return;

    const shell = document.createElement("section");
    shell.className = "gp-court-shell";
    shell.setAttribute("aria-label", "Additional court widget");
    shell.innerHTML = [
      '<button class="gp-court-toggle" id="gpCourtToggle" type="button">Additional Court</button>',
      '<div class="gp-court-panel" id="gpCourtPanel" hidden>',
      '<div class="gp-court-head">',
      '<h3>Global Court</h3>',
      '<span class="gp-court-score" id="gpCourtScore">0 / 100</span>',
      "</div>",
      '<div class="gp-court-body">',
      "<p>Quick quality review for this page content.</p>",
      '<div class="gp-court-meter"><span id="gpCourtBar"></span></div>',
      '<ul class="gp-court-list" id="gpCourtList"></ul>',
      '<p class="gp-court-verdict" id="gpCourtVerdict"></p>',
      "</div>",
      "</div>"
    ].join("");

    mount.appendChild(shell);

    const toggle = document.getElementById("gpCourtToggle");
    const panel = document.getElementById("gpCourtPanel");
    const list = document.getElementById("gpCourtList");
    const scoreEl = document.getElementById("gpCourtScore");
    const bar = document.getElementById("gpCourtBar");
    const verdict = document.getElementById("gpCourtVerdict");

    if (!toggle || !panel || !list || !scoreEl || !bar || !verdict) return;

    const saved = safeParseState();

    checks.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "gp-court-item";
      li.innerHTML = [
        '<input type="checkbox" id="gpCourtCheck' + index + '" data-points="' + item.points + '">',
        '<label for="gpCourtCheck' + index + '">' + item.label + "</label>"
      ].join("");
      list.appendChild(li);
    });

    const inputs = list.querySelectorAll("input[type='checkbox']");
    inputs.forEach((input, idx) => {
      input.checked = saved.includes(idx);
    });

    function update() {
      let score = 0;
      const active = [];
      inputs.forEach((input, idx) => {
        if (input.checked) {
          score += Number(input.dataset.points || 0);
          active.push(idx);
        }
      });

      score = Math.min(100, score);
      scoreEl.textContent = score + " / 100";
      bar.style.width = score + "%";
      verdict.textContent = computeVerdict(score);
      persistState(active);
    }

    toggle.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
    });

    inputs.forEach((input) => {
      input.addEventListener("change", update);
    });

    update();
  }

  function init() {
    addImageAndLinkImprovements();
    renderWidget();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
