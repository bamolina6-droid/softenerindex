const form = document.getElementById("calc-form");
const results = document.getElementById("results");
const errorEl = document.getElementById("error");

const fmt = new Intl.NumberFormat("en-US");

function show(el) {
  el.classList.remove("hidden");
}

function hide(el) {
  el.classList.add("hidden");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  hide(errorEl);

  const payload = {
    hardness: Number(form.hardness.value),
    hardnessUnit: form.hardnessUnit.value,
    people: Number(form.people.value),
    ironPpm: Number(form.ironPpm.value || 0),
    regenerationDays: Number(form.regenerationDays.value || 7),
  };

  try {
    const res = await fetch("/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Calculation failed");
    }

    render(data);
  } catch (err) {
    hide(results);
    errorEl.textContent = err.message;
    show(errorEl);
  }
});

function render(data) {
  document.getElementById("r-index").textContent = data.softenerIndex;
  document.querySelector(".index-badge").style.setProperty("--pct", data.softenerIndex);
  document.getElementById("r-class").textContent = data.classification;
  document.getElementById("r-hardness").textContent = `${data.effectiveHardnessGpg} gpg`;
  document.getElementById("r-usage").textContent = `${fmt.format(data.dailyUsageGallons)} gal/day`;
  document.getElementById("r-grains").textContent = `${fmt.format(data.dailyGrains)} grains/day`;
  document.getElementById("r-capacity").textContent = `${fmt.format(data.recommendedCapacityGrains)} grains`;
  document.getElementById("r-regen").textContent =
    data.regenerationFrequencyDays === null
      ? "—"
      : `${data.regenerationFrequencyDays} day(s)`;
  document.getElementById("r-salt").textContent = `${data.estimatedSaltPerRegenLbs} lbs`;
  show(results);
}
