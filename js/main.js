// ============================
// MedMap India — Main Page JS
// ============================

document.addEventListener("DOMContentLoaded", () => {
  renderDesertList();
  renderMapPins();
  renderFacilityCards();
  renderSpecialtyGrid();
  setupSearch();
});

// ---- Medical Deserts ----
function renderDesertList() {
  const deserts = HOSPITALS.filter(h => h.medicalDesertScore >= 7)
    .sort((a, b) => b.medicalDesertScore - a.medicalDesertScore);

  const container = document.getElementById("desertList");
  if (!container) return;

  container.innerHTML = deserts.map(h => `
    <div class="desert-item" onclick="openModal('${h.id}')">
      <div class="desert-name">${h.name}</div>
      <div class="desert-location">📍 ${h.city}, ${h.state}</div>
      <div class="desert-score">
        <div class="desert-score-bar">
          <div class="desert-score-fill" style="width:${h.medicalDesertScore * 10}%"></div>
        </div>
        <span class="desert-score-label">${getDesertLabel(h.medicalDesertScore)} (${h.medicalDesertScore}/10)</span>
      </div>
    </div>
  `).join("");

  document.getElementById("stat-deserts").textContent = deserts.length;
  const states = new Set(HOSPITALS.map(h => h.state));
  document.getElementById("stat-states").textContent = states.size;
}

// ---- Map Pins ----
function renderMapPins() {
  const container = document.getElementById("mapPins");
  if (!container) return;

  let tooltip = document.createElement("div");
  tooltip.className = "map-tooltip";
  tooltip.style.display = "none";
  document.body.appendChild(tooltip);

  container.innerHTML = HOSPITALS.map(h => {
    const { x, y } = coordToPercent(h.lat, h.lng);
    return `<div class="map-pin ${getPinClass(h.medicalDesertScore)}"
      style="left:${x}%;top:${y}%"
      data-id="${h.id}"
      data-name="${h.name}"
      data-city="${h.city}"
      data-score="${h.medicalDesertScore}"
      onclick="openModal('${h.id}')">
    </div>`;
  }).join("");

  container.querySelectorAll(".map-pin").forEach(pin => {
    pin.addEventListener("mouseenter", (e) => {
      tooltip.innerHTML = `<strong>${pin.dataset.name}</strong><br/>${pin.dataset.city}<br/>Desert Score: ${pin.dataset.score}/10`;
      tooltip.style.display = "block";
    });
    pin.addEventListener("mousemove", (e) => {
      tooltip.style.left = (e.clientX + 14) + "px";
      tooltip.style.top = (e.clientY - 10) + "px";
    });
    pin.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  });
}

// ---- Facility Cards ----
function renderFacilityCards() {
  const container = document.getElementById("facilityCards");
  if (!container) return;

  const recent = [...HOSPITALS].slice(0, 6);
  container.innerHTML = recent.map(h => `
    <div class="fac-card" onclick="openModal('${h.id}')">
      <div class="fac-card-head">
        <span class="fac-type-icon">${typeIcon(h.type)}</span>
        <div>
          <div class="fac-name">${h.name}</div>
          <div class="fac-loc">📍 ${h.city}, ${h.state}</div>
        </div>
      </div>
      <div class="fac-tags">
        <span class="fac-tag ${h.operator === 'private' ? 'private' : ''}">${h.operator}</span>
        ${h.medicalDesertScore >= 7 ? '<span class="fac-tag desert">⚠ Desert</span>' : ''}
        <span class="fac-tag">${h.numberDoctors} doctors</span>
        <span class="score-badge ${getScoreClass(h.medicalDesertScore)}">${getDesertLabel(h.medicalDesertScore)}</span>
      </div>
    </div>
  `).join("");
}

// ---- Specialty Grid ----
function renderSpecialtyGrid() {
  const container = document.getElementById("specialtyGrid");
  if (!container) return;

  const counts = {};
  HOSPITALS.forEach(h => {
    h.specialties.forEach(s => {
      counts[s] = (counts[s] || 0) + 1;
    });
  });

  const max = Math.max(...Object.values(counts));
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  container.innerHTML = sorted.map(([s, n]) => `
    <div class="spec-card">
      <div class="spec-name">${specialtyLabel(s)}</div>
      <div class="spec-count">${n}</div>
      <div class="spec-bar">
        <div class="spec-bar-fill" style="width:${(n/max)*100}%"></div>
      </div>
    </div>
  `).join("");
}

// ---- Global Search ----
function setupSearch() {
  const input = document.getElementById("globalSearch");
  const results = document.getElementById("searchResults");
  if (!input || !results) return;

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { results.classList.add("hidden"); return; }

    const all = [
      ...HOSPITALS.map(h => ({ ...h, _type: "hospital" })),
      ...DOCTORS.map(d => ({ ...d, _type: "doctor" })),
      ...NGOS.map(n => ({ ...n, _type: "ngo" }))
    ];

    const hits = all.filter(item =>
      item.name.toLowerCase().includes(q) ||
      (item.city && item.city.toLowerCase().includes(q)) ||
      (item.state && item.state.toLowerCase().includes(q)) ||
      (item.specialty && item.specialty.toLowerCase().includes(q)) ||
      (item.specialties && item.specialties.some(s => s.toLowerCase().includes(q)))
    ).slice(0, 8);

    if (!hits.length) {
      results.innerHTML = `<div class="search-result-item"><div class="sri-sub">No results found.</div></div>`;
    } else {
      results.innerHTML = hits.map(item => `
        <div class="search-result-item" onclick="handleSearchClick('${item._type}','${item.id}')">
          <span class="sri-icon">${typeIcon(item._type)}</span>
          <div>
            <div class="sri-name">${item.name}</div>
            <div class="sri-sub">${item.city || ''}, ${item.state || ''}</div>
          </div>
          <span class="sri-tag tag-${item._type}">${item._type}</span>
        </div>
      `).join("");
    }

    results.classList.remove("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-section")) {
      results.classList.add("hidden");
    }
  });
}

function handleSearchClick(type, id) {
  document.getElementById("searchResults").classList.add("hidden");
  if (type === "hospital") openModal(id);
  else if (type === "doctor") {
    const doc = DOCTORS.find(d => d.id === id);
    if (doc) openDoctorModal(doc);
  }
}

function doSearch() {
  const q = document.getElementById("globalSearch")?.value?.trim();
  if (q) window.location.href = `pages/hospitals.html?q=${encodeURIComponent(q)}`;
}

function goToAgent(query) {
  window.location.href = `pages/agent.html?q=${encodeURIComponent(query)}`;
}

// ---- Modal ----
let modalEl = null;

function openModal(id) {
  const h = HOSPITALS.find(x => x.id === id);
  if (!h) return;

  if (!modalEl) {
    modalEl = document.createElement("div");
    modalEl.className = "modal-overlay";
    modalEl.innerHTML = `<div class="modal" id="modalInner"></div>`;
    modalEl.addEventListener("click", (e) => {
      if (e.target === modalEl) closeModal();
    });
    document.body.appendChild(modalEl);
  }

  document.getElementById("modalInner").innerHTML = `
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2>${h.name}</h2>
    <div class="modal-location">📍 ${h.address_city}, ${h.state} &nbsp;|&nbsp; ${typeIcon(h.type)} ${h.type} &nbsp;|&nbsp; <span class="score-badge ${getScoreClass(h.medicalDesertScore)}">${getDesertLabel(h.medicalDesertScore)}</span></div>
    <div class="modal-section">
      <div class="modal-section-title">Overview</div>
      <p style="color:var(--text2);font-size:0.88rem">${h.description}</p>
    </div>
    <div class="modal-info-grid">
      <div class="modal-info-item"><div class="modal-info-label">Capacity (Beds)</div><div class="modal-info-value text-accent">${h.capacity}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Doctors</div><div class="modal-info-value text-green">${h.numberDoctors}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Operator</div><div class="modal-info-value">${h.operator}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Est. Year</div><div class="modal-info-value">${h.yearEstablished}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Desert Score</div><div class="modal-info-value text-red">${h.medicalDesertScore}/10</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Volunteers</div><div class="modal-info-value">${h.acceptsVolunteers ? "✅ Yes" : "❌ No"}</div></div>
    </div>
    <div class="modal-section">
      <div class="modal-section-title">Specialties</div>
      <div class="modal-tags">${h.specialties.map(s => `<span class="modal-tag">${specialtyLabel(s)}</span>`).join("")}</div>
    </div>
    <div class="modal-section">
      <div class="modal-section-title">Equipment</div>
      <div class="modal-tags">${h.equipment.map(e => `<span class="modal-tag">${e}</span>`).join("")}</div>
    </div>
    <div class="modal-section">
      <div class="modal-section-title">Capabilities</div>
      <div class="modal-tags">${h.capabilities.map(c => `<span class="modal-tag">${c}</span>`).join("")}</div>
    </div>
    ${h.phone ? `<div class="modal-section"><div class="modal-section-title">Contact</div><div style="font-size:0.88rem;color:var(--text2)">${h.phone}${h.email ? " &nbsp;|&nbsp; " + h.email : ""}${h.website ? " &nbsp;|&nbsp; <a href='https://"+h.website+"' target='_blank'>"+h.website+"</a>" : ""}</div></div>` : ""}
  `;

  modalEl.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (modalEl) {
    modalEl.classList.remove("open");
    document.body.style.overflow = "";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
