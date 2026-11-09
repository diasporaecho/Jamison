/* Agnes Jamison Teaching Abroad Guide — rendering and tools.
   Content lives in assets/data.js. This file only renders it. */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const byId = Object.fromEntries(COUNTRIES.map(c => [c.id, c]));
  const SRC_KEYS = Object.keys(SOURCES);

  /* ---------- safe storage */
  const store = {
    get(k, d) { try { const v = localStorage.getItem("agnes:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("agnes:" + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };

  /* ---------- formatting */
  const usd = n => (n < 0 ? "−$" : "$") + Math.round(Math.abs(n)).toLocaleString("en-US");
  const num = n => Math.round(n).toLocaleString("en-US");
  const toUSD = (amt, cur) => amt / (FX[cur] || 1);
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  function src(ids) {
    if (!ids || !ids.length) return "";
    return ids.filter(id => SOURCES[id]).map(id => {
      const n = SRC_KEYS.indexOf(id) + 1;
      return `<a class="src" href="${esc(SOURCES[id].u)}" target="_blank" rel="noopener" title="${esc(SOURCES[id].t)}">[${n}]</a>`;
    }).join(" ");
  }
  const advisoryPill = a => a.level == null ? `<span class="pill neutral">Not verified</span>`
    : `<span class="pill ${a.level === 1 ? "good" : a.level === 2 ? "warn" : "bad"}"><span class="lvl">Level ${a.level}</span></span>`;
  const sum = o => Object.values(o).reduce((a, b) => a + b, 0);

  /* ---------- binds */
  $$('[data-bind="researchDate"]').forEach(e => e.textContent = RESEARCH_DATE);
  $$('[data-bind="fxDate"]').forEach(e => e.textContent = FX_DATE);
  $$('[data-bind="baseIncome"]').forEach(e => e.textContent = "$" + num(BASE_INCOME));

  /* ---------- assumptions */
  $("#assumptions").innerHTML = ASSUMPTIONS.map(a => `<div><dt>${esc(a.k)}</dt><dd>${esc(a.v)}</dd></div>`).join("");

  /* ---------- scenario maths (shared) */
  function scenario(c) {
    const s = c.salary, b = c.budget;
    const net = s.gross * (1 - s.tax / 100);
    const exp = sum(b) - (s.housing ? b.rent : 0) - (s.insurance ? b.insurance : 0);
    return { net, exp, save: net - exp };
  }
  function retireScenario(c, income) {
    const net = income * (1 - c.retireTax / 100);
    const exp = sum(c.budget);
    return { net, exp, save: net - exp };
  }
  function upfront(c, opts) {
    const u = c.upfront, b = c.budget;
    const housing = opts.housing, months = opts.reserve;
    const exp = opts.exp;
    const rows = [
      ["One-way flight", u.flight],
      ["Temporary housing (4 weeks)", housing ? 0 : u.temp],
      ["Rental deposit (2 months)", housing ? 0 : opts.rent * 2],
      ["Furnishings and setup", u.furnish],
      ["Documents: background check, apostilles, translations", u.credentials],
      ["Visa and permit fees (yours)", u.visaFees],
      ["Shipping / extra baggage", u.shipping],
      ["Legal help", u.legal],
      ["Living costs while settling in (6 weeks)", exp * 1.5],
      [`Emergency reserve (${months} months) + flight home`, exp * months + u.flight]
    ];
    return { rows, total: rows.reduce((a, r) => a + r[1], 0) };
  }

  /* ---------- leaders and picks */
  const LEADERS = [
    { id: "prt", city: "Porto or the Cascais coast", why: "The easiest European residence on a pension: the D7 visa asks for €920 a month. Excellent healthcare, calm streets, a gentle Atlantic climate and a path to permanent residence after 5 years.", trade: "Lisbon-area rents are high; citizenship now takes 10 years; immigration appointments can be slow." },
    { id: "esp", city: "Valencia", why: "The richest everyday life on the list: walkable, sunny, seaside, with superb public and private healthcare and a large international community.", trade: "The Non-Lucrative Visa needs €2,400 a month and forbids any paid work, including tutoring." },
    { id: "mex", city: "Mérida or Mexico City", why: "Closest to family, a few hours' flight from home, with permanent residence available directly to qualifying retirees and a lower cost of living.", trade: "Income tests are high for direct permanent residence; safety varies by state (Yucatán is Level 1, Mexico City Level 2)." }
  ];
  $("#leaders").innerHTML = LEADERS.map((l, i) => {
    const c = byId[l.id], sc = retireScenario(c, BASE_INCOME);
    return `<article class="leader"><span class="rank">${["I", "II", "III"][i]}</span>
      <h3>${c.name}</h3><span class="leader-city">${l.city}</span>
      <p>${l.why}</p><p class="muted"><em>Consider:</em> ${l.trade}</p>
      <p class="small">On $${num(BASE_INCOME)} a month, about <strong class="${sc.save < 0 ? "neg" : "pos"}">${usd(sc.save)}</strong> remains after a comfortable budget.</p></article>`;
  }).join("");
  const PICKS = [
    ["Best overall", "Portugal · Porto", "Low visa threshold, healthcare, safety."],
    ["Easiest visa on a pension", "Panama", "Pensionado: $1,000 a month; U.S. dollars."],
    ["Finest daily life", "Spain · Valencia", "Sea, gardens, food, culture."],
    ["Income goes furthest", "Thailand · Chiang Mai", "Retirement visa from age 50."],
    ["Closest to family", "Mexico · Mérida", "Short flights; permanent residence."]
  ];
  $("#picks").innerHTML = PICKS.map(p => `<div class="pick"><span>${p[0]}</span><strong>${p[1]}</strong><p>${p[2]}</p></div>`).join("");

  /* ---------- country filter */
  let selected = new Set(store.get("countries", COUNTRIES.map(c => c.id)).filter(id => byId[id]));
  if (!selected.size) selected = new Set(COUNTRIES.map(c => c.id));
  const chipWrap = $("#countryChips");
  chipWrap.innerHTML = COUNTRIES.map(c => `<button type="button" class="chip" data-cid="${c.id}" aria-pressed="${selected.has(c.id)}"><span class="code">${c.code}</span>${c.short}</button>`).join("");
  chipWrap.addEventListener("click", e => {
    const b = e.target.closest("[data-cid]"); if (!b) return;
    const id = b.dataset.cid;
    if (selected.has(id)) { if (selected.size > 1) selected.delete(id); } else selected.add(id);
    applyCountryFilter();
  });
  $("#resetCountries").addEventListener("click", () => { selected = new Set(COUNTRIES.map(c => c.id)); applyCountryFilter(); });
  function applyCountryFilter() {
    $$("[data-cid]", chipWrap).forEach(b => b.setAttribute("aria-pressed", selected.has(b.dataset.cid)));
    $$("[data-country]").forEach(el => el.setAttribute("data-hidden-by-filter", !selected.has(el.dataset.country)));
    store.set("countries", [...selected]);
  }

  /* ---------- rankings */
  let track = store.get("track2", "retire");
  const maxScore = t => CRITERIA.reduce((a, c) => a + 5 * c.w[t], 0);
  function renderRank() {
    $$(".seg [data-track]").forEach(b => b.setAttribute("aria-selected", b.dataset.track === track));
    const rows = COUNTRIES.map(c => {
      const s = c.scores[track];
      const total = CRITERIA.reduce((a, k) => a + s[k.id] * k.w[track], 0);
      return { c, s, total };
    }).sort((a, b) => b.total - a.total);
    $("#rankTable").innerHTML = `<thead><tr><th>#</th><th>Country</th>${CRITERIA.map(k => `<th class="num" title="${k.label}">${k.label}${k.w[track] !== 1 ? ` <span class="mono">×${k.w[track]}</span>` : ""}</th>`).join("")}<th class="num">Weighted score</th></tr></thead>
      <tbody>${rows.map((r, i) => `<tr data-country="${r.c.id}"><td class="mono">${i + 1}</td><td><strong>${r.c.name}</strong></td>
        ${CRITERIA.map(k => `<td class="score"><span class="dot s${r.s[k.id]}">${r.s[k.id]}</span></td>`).join("")}
        <td class="num"><span class="total">${r.total.toFixed(1)}</span><div class="bar"><i style="width:${(r.total / maxScore(track) * 100).toFixed(0)}%"></i></div></td></tr>`).join("")}</tbody>`;
    applyCountryFilter();
  }
  $$(".seg [data-track]").forEach(b => b.addEventListener("click", () => { track = b.dataset.track; store.set("track2", track); renderRank(); }));
  renderRank();

  /* ---------- retirement tables */
  $("#visaTestTable").innerHTML = `<thead><tr><th>Country</th><th>Main retirement route</th><th>Income test</th><th class="num">≈ USD / month</th><th>Placeholder income</th><th>Paid work allowed?</th></tr></thead><tbody>` +
    COUNTRIES.map(c => {
      const v = c.retireVisa, ok = BASE_INCOME >= v.minUSD * 1.2, close = BASE_INCOME >= v.minUSD;
      const rv = c.visas.find(x => x.track === "retire");
      return `<tr data-country="${c.id}"><td><strong>${c.short}</strong></td><td>${v.name} ${src(v.src)}</td><td>${v.test}</td><td class="num">${usd(v.minUSD)}</td>
        <td><span class="pill ${ok ? "good" : close ? "warn" : "bad"}">${ok ? "Comfortably meets" : close ? "Meets, thin margin" : "Falls short"}</span></td><td class="small">${rv ? rv.work : "—"}</td></tr>`;
    }).join("") + "</tbody>";
  $("#retireTable").innerHTML = `<thead><tr><th>Country</th><th class="num">Income</th><th class="num">Est. tax</th><th class="num">After tax</th><th class="num">Comfortable budget</th><th class="num">Remaining / month</th></tr></thead><tbody>` +
    COUNTRIES.map(c => { const r = retireScenario(c, BASE_INCOME);
      return `<tr data-country="${c.id}"><td><strong>${c.short}</strong></td><td class="num">${usd(BASE_INCOME)}</td><td class="num">${c.retireTax}%</td><td class="num">${usd(r.net)}</td><td class="num">${usd(r.exp)}</td><td class="num ${r.save < 0 ? "neg" : "pos"}"><strong>${usd(r.save)}</strong></td></tr>`;
    }).join("") + "</tbody>";

  /* ---------- teaching */
  let roles = new Set(ROLES.map(r => r.id));
  $("#roleChips").innerHTML = ROLES.map(r => `<button type="button" class="chip" data-rid="${r.id}" aria-pressed="true">${r.label}</button>`).join("") +
    `<button type="button" class="chip chip-reset" id="resetRoles">All roles</button>`;
  $("#roleChips").addEventListener("click", e => {
    if (e.target.id === "resetRoles") { roles = new Set(ROLES.map(r => r.id)); }
    else {
      const b = e.target.closest("[data-rid]"); if (!b) return;
      const id = b.dataset.rid;
      if (roles.size === ROLES.length) roles = new Set([id]);            // first click focuses one role
      else if (roles.has(id)) { roles.delete(id); if (!roles.size) roles = new Set(ROLES.map(r => r.id)); }
      else roles.add(id);
    }
    applyRoleFilter();
  });
  function applyRoleFilter() {
    $$("[data-rid]").forEach(b => b.setAttribute("aria-pressed", roles.has(b.dataset.rid)));
    $$("tr[data-role]").forEach(tr => tr.hidden = !roles.has(tr.dataset.role));
    $$(".routes").forEach(t => {
      const any = $$("tr[data-role]", t).some(tr => !tr.hidden);
      const msg = t.parentElement.nextElementSibling;
      if (msg && msg.classList.contains("empty-note")) msg.hidden = any;
    });
  }
  const openIds = new Set(["uae", "tha", "mex"]);
  const verdictClass = v => /Best|Good/.test(v) ? "good" : /Weaker|Not realistic|Hard|Rarely|Low|Tight|Only/.test(v) ? "warn" : "neutral";
  $("#teachingCards").innerHTML = COUNTRIES.map(c => {
    const t = c.teaching;
    return `<details class="cblock" data-country="${c.id}"${openIds.has(c.id) ? " open" : ""}>
      <summary><h3>${c.name}</h3><span class="code">${c.code}</span>${advisoryPill(c.advisory)}<span class="tag">${c.tagline}</span></summary>
      <div class="cbody">
        <p class="prose">${t.summary}</p>
        <div class="facts">
          <div><h4>Credentials, permits and checks</h4><p>${t.credentials} ${src(t.src)}</p></div>
          <div><h4>TEFL, CELTA and other qualifications</h4><p>${t.tefl}</p></div>
          <div><h4>Hiring season</h4><p>${t.hiring}</p></div>
          <div><h4>Secure a job before moving?</h4><p>${t.jobFirst}</p></div>
          <div><h4>Age or nationality limits</h4><p>${t.restrictions}</p></div>
          <div><h4>U.S. advisory</h4><p>${c.advisory.text} ${src(c.advisory.src)}</p></div>
        </div>
        <div class="table-scroll"><table class="routes"><thead><tr><th>Route</th><th>Requirements</th><th>Advertised pay</th><th>Fit for Agnes</th></tr></thead>
          <tbody>${t.routes.map(r => `<tr data-role="${r.role}"><td><strong>${r.label}</strong></td><td>${r.req}</td><td>${r.pay} ${src(r.src)}</td><td><span class="pill ${verdictClass(r.verdict)}">${r.verdict}</span></td></tr>`).join("")}</tbody></table></div>
        <p class="empty-note" hidden>No route of the selected type is realistic in ${c.short}.</p>
      </div></details>`;
  }).join("");

  /* ---------- pay table */
  $("#payTable").innerHTML = `<thead><tr><th>Country</th><th>Role (advertised)</th><th class="num">Local currency</th><th class="num">USD / month</th><th>Benefits mentioned</th></tr></thead><tbody>` +
    PAY.map(p => {
      const c = byId[p.c];
      let local = "Not verified", usdTxt = "—";
      if (p.hi != null) {
        const f = v => p.cur === "USD" ? "$" + num(v) : p.cur + " " + num(v);
        local = (p.lo != null ? f(p.lo) + "–" : "up to ") + f(p.hi) + (p.per === "yr" ? " /yr" : " /mo");
        const m = v => toUSD(v, p.cur) / (p.per === "yr" ? 12 : 1);
        usdTxt = (p.lo != null ? usd(m(p.lo)) + "–" : "up to ") + usd(m(p.hi));
      }
      return `<tr data-country="${c.id}"><td><strong>${c.short}</strong></td><td>${p.type} ${src(p.src)}</td><td class="num">${local}</td><td class="num">${usdTxt}</td><td>${p.ben}</td></tr>`;
    }).join("") + "</tbody>";

  $("#scenarioTable").innerHTML = `<thead><tr><th>Country</th><th>Representative offer (scenario)</th><th class="num">Gross</th><th class="num">Est. tax</th><th class="num">Take-home</th><th class="num">Expenses</th><th class="num">Left / month</th></tr></thead><tbody>` +
    COUNTRIES.map(c => {
      const s = scenario(c);
      return `<tr data-country="${c.id}"><td><strong>${c.short}</strong></td><td>${c.salary.label} ${src(c.salary.src)}</td><td class="num">${usd(c.salary.gross)}</td><td class="num">${c.salary.tax}%</td><td class="num">${usd(s.net)}</td><td class="num">${usd(s.exp)}</td><td class="num ${s.save < 0 ? "neg" : "pos"}"><strong>${usd(s.save)}</strong></td></tr>`;
    }).join("") + "</tbody>";

  /* ---------- jobs */
  $("#platforms").innerHTML = PLATFORMS.map(p => `<a href="${p.u}" target="_blank" rel="noopener"><strong>${p.n}</strong><span>${p.d}</span></a>`).join("");
  $("#schoolLists").innerHTML = COUNTRIES.map(c => `<details class="cblock" data-country="${c.id}"${openIds.has(c.id) ? " open" : ""}>
    <summary><h3>${c.name}</h3><span class="code">${c.code}</span></summary>
    <div class="cbody"><div class="school-list">${c.schools.map(s => `<div class="school">
      <strong>${s.name}</strong><span class="meta">${s.city} · ${s.curriculum}</span>
      <p>${s.why} ${src(s.src)}</p>
      <p><a href="${s.url}" target="_blank" rel="noopener">${s.urlType}</a></p>
      <p><span class="pill ${/^No verified/.test(s.opening) ? "neutral" : "warn"}">${s.opening}</span></p></div>`).join("")}</div></div></details>`).join("");

  /* ---------- cities */
  $("#cityCards").innerHTML = COUNTRIES.map(c => `<details class="cblock" data-country="${c.id}"${openIds.has(c.id) ? " open" : ""}>
    <summary><h3>${c.name}</h3><span class="code">${c.code}</span></summary>
    <div class="cbody"><div class="cities-grid">${c.cities.map(ct => `<div class="city">
      <h5>${ct.name}</h5>
      <div><h4>Schools</h4><p>${ct.schools}</p></div>
      <div><h4>Neighbourhoods to investigate</h4><p>${ct.hoods}</p></div>
      <div><h4>Commute</h4><p>${ct.commute}</p></div>
      <div><h4>Housing cost</h4><p>${ct.rent}</p></div>
      <div><h4>Transit and walkability</h4><p>${ct.transit}</p></div>
      <div><h4>Healthcare and airport</h4><p>${ct.health}</p></div>
      <div><h4>Climate and air</h4><p>${ct.climate}</p></div>
      <div><h4>Language and community</h4><p>${ct.language}</p></div>
      <div class="pc"><p><span class="pill good">Plus</span> ${ct.pros}</p><p><span class="pill warn">Minus</span> ${ct.cons}</p></div>
    </div>`).join("")}</div></div></details>`).join("");

  /* ---------- budgets */
  function tiers(b) {
    const comfortable = sum(b);
    const modest = b.rent * 0.8 + b.utilities + b.comms + b.groceries * 0.85 + b.dining * 0.5 + b.transport + b.insurance + b.health + b.visa + b.leisure * 0.5 + b.trips * 0.5;
    const higher = b.rent * 1.4 + b.utilities * 1.2 + b.comms + b.groceries * 1.15 + b.dining * 1.8 + b.transport * 1.5 + b.insurance * 1.3 + b.health * 1.5 + b.visa + b.leisure * 1.8 + b.trips * 1.8;
    return { modest, comfortable, higher };
  }
  $("#tierTable").innerHTML = `<thead><tr><th>Country</th><th class="num">Rent</th><th class="num">Utilities + AC/heat</th><th class="num">Internet + phone</th><th class="num">Food</th><th class="num">Transport</th><th class="num">Insurance + care</th><th class="num">Visa, leisure, trips home</th><th class="num">Modest</th><th class="num">Comfortable</th><th class="num">Higher comfort</th><th>Basis</th></tr></thead><tbody>` +
    COUNTRIES.map(c => {
      const b = c.budget, t = tiers(b);
      return `<tr data-country="${c.id}"><td><strong>${c.short}</strong></td><td class="num">${usd(b.rent)}</td><td class="num">${usd(b.utilities)}</td><td class="num">${usd(b.comms)}</td><td class="num">${usd(b.groceries + b.dining)}</td><td class="num">${usd(b.transport)}</td><td class="num">${usd(b.insurance + b.health)}</td><td class="num">${usd(b.visa + b.leisure + b.trips)}</td>
        <td class="num">${usd(t.modest)}</td><td class="num"><strong>${usd(t.comfortable)}</strong></td><td class="num">${usd(t.higher)}</td><td class="small">${c.budgetNote}</td></tr>`;
    }).join("") + "</tbody>";

  /* calculator */
  const ids = ["cSalary", "cSS", "cTax", "cOther", "cRent", "cLiving", "cIns", "cHousing", "cInsured", "cReserve"];
  const el = Object.fromEntries(ids.map(i => [i, $("#" + i)]));
  const sel = $("#calcCountry");
  sel.innerHTML = COUNTRIES.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
  function loadPreset(id) {
    const c = byId[id], b = c.budget;
    el.cSalary.value = BASE_INCOME; el.cSS.value = 0; el.cOther.value = 0; el.cTax.value = c.retireTax; el.cRent.value = b.rent;
    el.cIns.value = b.insurance; el.cLiving.value = sum(b) - b.rent - b.insurance;
    el.cHousing.checked = false; el.cInsured.checked = false;
    $("#calcNote").textContent = "Preset: placeholder income of $" + num(BASE_INCOME) + " a month and the comfortable budget for " + c.name + ". " + (c.upfront.note || "");
  }
  function calc() {
    const c = byId[sel.value];
    const v = k => Math.max(0, parseFloat(el[k].value) || 0);
    const gross = v("cSalary") + v("cSS") + v("cOther");
    const net = gross * (1 - Math.min(v("cTax"), 90) / 100);
    const rv = c.retireVisa, passive = v("cSalary") + v("cSS");
    const st = passive >= rv.minUSD * 1.2 ? ["good", "Comfortably meets"] : passive >= rv.minUSD ? ["warn", "Meets, with a thin margin"] : ["bad", "Falls short of"];
    $("#visaCheck").innerHTML = `<span class="pill ${st[0]}">${st[1]}</span> the ${rv.name} income test (about ${usd(rv.minUSD)}/month from pension and Social Security).`;
    const rent = el.cHousing.checked ? 0 : v("cRent");
    const ins = el.cInsured.checked ? 0 : v("cIns");
    const exp = v("cLiving") + rent + ins;
    const save = net - exp;
    $("#oNet").textContent = usd(net);
    $("#oExp").textContent = usd(exp);
    $("#oSave").textContent = usd(save);
    $("#oSave").className = "kpi-val " + (save < 0 ? "neg" : "pos");
    $("#oYear").textContent = usd(save * 12);
    const months = parseInt(el.cReserve.value, 10);
    $("#cReserveVal").textContent = months + (months === 1 ? " month" : " months");
    const u = upfront(c, { housing: el.cHousing.checked, reserve: months, exp, rent: v("cRent") });
    $("#upfrontTable").innerHTML = u.rows.map(r => `<tr><td>${r[0]}</td><td class="num">${usd(r[1])}</td></tr>`).join("") +
      `<tr class="tot"><td>Total to have before moving</td><td class="num">${usd(u.total)}</td></tr>`;
    store.set("calc2", { country: sel.value, vals: Object.fromEntries(ids.map(k => [k, el[k].type === "checkbox" ? el[k].checked : el[k].value])) });
  }
  const saved = store.get("calc2", null);
  if (saved && byId[saved.country]) {
    sel.value = saved.country; loadPreset(saved.country);
    ids.forEach(k => { if (saved.vals && k in saved.vals) { if (el[k].type === "checkbox") el[k].checked = !!saved.vals[k]; else el[k].value = saved.vals[k]; } });
  } else { sel.value = "prt"; loadPreset("prt"); }
  sel.addEventListener("change", () => { loadPreset(sel.value); calc(); });
  ids.forEach(k => el[k].addEventListener("input", calc));
  calc();

  /* ---------- visas */
  let vtrack = "all";
  function renderVisas() {
    $$(".seg [data-vtrack]").forEach(b => b.setAttribute("aria-selected", b.dataset.vtrack === vtrack));
    $("#visaCards").innerHTML = COUNTRIES.map(c => {
      const list = c.visas.filter(v => vtrack === "all" || v.track === vtrack || (vtrack === "retire" && v.track === "indep"));
      return `<details class="cblock" data-country="${c.id}" open><summary><h3>${c.name}</h3><span class="code">${c.code}</span></summary>
      <div class="cbody">${list.length ? list.map(v => `<div class="visa"><h4>${v.name} <span class="pill ${v.track === "retire" ? "good" : "neutral"}">${v.track === "job" ? "Teaching job" : v.track === "retire" ? "Retirement / income" : "Remote work income"}</span> ${src(v.src)}</h4>
        <dl><dt>Eligibility</dt><dd>${v.eligibility}</dd><dt>Income or savings</dt><dd>${v.money}</dd><dt>Government fees</dt><dd>${v.fees}</dd>
        <dt>Where to apply</dt><dd>${v.where}</dd><dt>Processing</dt><dd>${v.time}</dd><dt>Duration and renewal</dt><dd>${v.duration}</dd>
        <dt>Physical presence</dt><dd>${v.presence}</dd><dt>Work, online teaching, tutoring</dt><dd>${v.work}</dd><dt>Dependents</dt><dd>${v.dependents}</dd>
        <dt>If the job ends</dt><dd>${v.jobLoss}</dd></dl></div>`).join("") : `<p class="empty-note">No researched route of this type for ${c.short}.</p>`}</div></details>`;
    }).join("");
    applyCountryFilter();
  }
  $$(".seg [data-vtrack]").forEach(b => b.addEventListener("click", () => { vtrack = b.dataset.vtrack; renderVisas(); }));
  renderVisas();

  /* ---------- residency, property, safety */
  $("#resTable").innerHTML = `<thead><tr><th>Country</th><th>Temporary residence</th><th>Permanent residence</th><th>Citizenship</th><th>Dual citizenship</th><th>Ordinary path</th></tr></thead><tbody>` +
    COUNTRIES.map(c => { const r = c.residency; return `<tr data-country="${c.id}"><td><strong>${c.short}</strong></td><td>${r.temp}</td><td>${r.pr}</td><td>${r.cit} ${c.id === "prt" ? src(["s5"]) : ""}</td><td>${r.dual}</td><td><span class="pill ${r.limited ? "bad" : "good"}">${r.limited ? "Limited" : "Available"}</span></td></tr>`; }).join("") + "</tbody>";
  $("#propTable").innerHTML = `<thead><tr><th>Country</th><th>Foreign ownership</th><th>Immigration benefit from buying</th><th>Search sites</th></tr></thead><tbody>` +
    COUNTRIES.map(c => `<tr data-country="${c.id}"><td><strong>${c.short}</strong></td><td>${c.property.ownership}</td><td>${c.property.immigration}</td><td>${c.property.sites.join(", ")}</td></tr>`).join("") + "</tbody>";
  $("#safetyTable").innerHTML = `<thead><tr><th>Country</th><th>U.S. advisory</th><th>Healthcare</th><th>Everyday safety for a woman</th></tr></thead><tbody>` +
    COUNTRIES.map(c => `<tr data-country="${c.id}"><td><strong>${c.short}</strong></td><td>${advisoryPill(c.advisory)}<br><span class="small">${c.advisory.text}</span> ${src(c.advisory.src)}</td><td>${c.health}</td><td>${c.women}</td></tr>`).join("") + "</tbody>";

  /* ---------- checklist */
  let checks = store.get("checks", {});
  $("#checklist").innerHTML = CHECKLIST.map((p, pi) => `<div class="phase"><h4>${p.phase}</h4><ul>${p.items.map((it, ii) => {
    const id = `ck-${pi}-${ii}`;
    return `<li><label for="${id}"><input type="checkbox" id="${id}" data-ck="${id}"${checks[id] ? " checked" : ""}><span>${it}</span></label></li>`;
  }).join("")}</ul></div>`).join("");
  function progress() {
    const all = $$("[data-ck]"), done = all.filter(i => i.checked).length;
    $("#progressBar").style.width = (done / all.length * 100) + "%";
    $("#progressText").textContent = `${done} of ${all.length} done`;
  }
  $("#checklist").addEventListener("change", e => {
    const i = e.target.closest("[data-ck]"); if (!i) return;
    checks[i.dataset.ck] = i.checked; store.set("checks", checks); progress();
  });
  $("#clearChecks").addEventListener("click", () => { $("#clearConfirm").hidden = false; });
  $("#clearNo").addEventListener("click", () => { $("#clearConfirm").hidden = true; });
  $("#clearYes").addEventListener("click", () => {
    checks = {}; store.set("checks", checks); $$("[data-ck]").forEach(i => i.checked = false); $("#clearConfirm").hidden = true; progress();
  });
  progress();

  /* ---------- final picks */
  const FINAL = [
    { id: "prt", city: "Porto, or Cascais on the Lisbon coast", role: "Optional: substitute teaching or tutoring once her D7 permit allows" },
    { id: "esp", city: "Valencia", role: "Volunteering; paid work not allowed on the Non-Lucrative Visa" },
    { id: "mex", city: "Mérida, or Mexico City", role: "Optional: tutoring or part-time posts as a permanent resident" }
  ];
  $("#finalPicks").innerHTML = FINAL.map((f, i) => {
    const c = byId[f.id], r = retireScenario(c, BASE_INCOME);
    const up = upfront(c, { housing: false, reserve: 6, exp: r.exp, rent: c.budget.rent });
    return `<article class="card final"><span class="eyebrow">${["First", "Second", "Third"][i]} choice</span><h3>${c.name}</h3><p><strong>${f.city}</strong></p><p class="small muted">${f.role}</p>
      <dl><dt>Visa income test</dt><dd>${usd(c.retireVisa.minUSD)}/mo</dd><dt>Comfortable monthly budget</dt><dd>${usd(r.exp)}</dd>
      <dt>Funds to have before moving</dt><dd>${usd(up.total)}</dd><dt>Left on $${num(BASE_INCOME)}/mo</dt><dd class="${r.save < 0 ? "neg" : "pos"}">${usd(r.save)}</dd></dl></article>`;
  }).join("");

  /* ---------- resources */
  $("#resourceGroups").innerHTML = RESOURCES.map(g => `<div class="res-group"><h3>${g.group}</h3><ul>${g.items.map(r =>
    `<li><a href="${r.u}" target="_blank" rel="noopener">${esc(r.n)}</a><span>${esc(r.d)}</span></li>`).join("")}</ul></div>`).join("");

  /* ---------- sources */
  $("#sourceList").innerHTML = SRC_KEYS.map(k => `<li id="src-${k}"><a href="${SOURCES[k].u}" target="_blank" rel="noopener">${esc(SOURCES[k].t)}</a><span class="stype">${SOURCES[k].type}</span></li>`).join("");

  applyCountryFilter();
  applyRoleFilter();

  /* ---------- sticky offsets follow the real header height */
  const topbar = $("#top");
  const setTopH = () => document.documentElement.style.setProperty("--topbar-h", topbar.offsetHeight + "px");
  setTopH(); window.addEventListener("resize", setTopH);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setTopH);

  /* ---------- mobile nav */
  const menuBtn = $("#menuBtn"), nav = $("#siteNav");
  menuBtn.addEventListener("click", () => { const o = nav.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", o); });
  nav.addEventListener("click", e => { if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); } });

  /* ---------- print view */
  const pt = $("#printToggle");
  function setPrint(on) {
    document.body.classList.toggle("print-mode", on);
    pt.setAttribute("aria-pressed", on);
    pt.textContent = on ? "Exit print view" : "Print view";
    if (on) $$("details.cblock").forEach(d => d.open = true);
  }
  pt.addEventListener("click", () => setPrint(!document.body.classList.contains("print-mode")));
  window.addEventListener("beforeprint", () => $$("details.cblock").forEach(d => d.open = true));
})();
