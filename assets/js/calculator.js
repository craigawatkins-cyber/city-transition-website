/*
  "What will this cost me?" calculator.
  Formulas generalize the source study's own worked "How will this impact
  me?" table (5-2-2026 presentation). Constants live in assets/js/data.js
  so the calculator and the prose pages never disagree.

  netChange = hisidRemoved + recreationUsd + publicSafetyUsd
            + realPropertyTax + personalPropertyTax + salesTaxImpact
*/

function formatMoney(n) {
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  return sign + "$" + abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function computeImpact({ isImproved, homeValue, vehicleValue, safetyOption }) {
  const c = HI_DATA.calculator;

  // Real property (land + any structure) is taxed regardless of whether a
  // lot is improved — the source's own vacant-lot example pays 5-mill tax
  // on the lot's $20,000 value. Only vehicles are tied to improved/occupied
  // properties in the source model.
  const assessedValue = Number(homeValue) || 0;
  const vehicles = isImproved ? Number(vehicleValue) || 0 : 0;

  const hisidRemoved = isImproved ? c.hisidRemovedImproved : c.hisidRemovedUnimproved;
  const recreationUsd = c.recreationUsdAnnual;
  const publicSafetyUsd = isImproved ? c.publicSafetyUsdAnnual[safetyOption] : 0;
  const realPropertyTax = assessedValue * c.millRate;
  const personalPropertyTax = vehicles * c.millRate;
  const salesTaxImpact = isImproved ? c.salesTaxHouseholdEstAnnual : 0;

  const netChange = hisidRemoved + recreationUsd + publicSafetyUsd
    + realPropertyTax + personalPropertyTax + salesTaxImpact;

  return {
    hisidRemoved, recreationUsd, publicSafetyUsd,
    realPropertyTax, personalPropertyTax, salesTaxImpact,
    netChange,
  };
}

function renderCalculator() {
  const form = document.getElementById("impact-form");
  if (!form) return;

  const propertyTypeInputs = form.querySelectorAll('input[name="property-type"]');
  const safetyOptionInputs = form.querySelectorAll('input[name="safety-option"]');
  const homeValueField = document.getElementById("home-value-field");
  const vehicleValueField = document.getElementById("vehicle-value-field");
  const homeValueInput = document.getElementById("home-value");
  const vehicleValueInput = document.getElementById("vehicle-value");

  const resultBody = document.getElementById("calc-result-body");
  const totalEl = document.getElementById("calc-total");
  const totalSummaryEl = document.getElementById("calc-total-summary");
  const howCalculatedList = document.getElementById("calc-how-list");
  const customSpendingInput = document.getElementById("custom-taxable-spending");
  const customSalesTaxResultEl = document.getElementById("custom-sales-tax-result");

  function currentInputs() {
    const isImproved = form.querySelector('input[name="property-type"]:checked').value === "improved";
    const safetyOption = form.querySelector('input[name="safety-option"]:checked').value;
    return {
      isImproved,
      homeValue: homeValueInput.value,
      vehicleValue: vehicleValueInput.value,
      safetyOption,
    };
  }

  function renderHowCalculated(inputs, r) {
    if (!howCalculatedList) return;
    const enteredHome = Number(inputs.homeValue) || 0;
    const enteredVehicles = Number(inputs.vehicleValue) || 0;
    const steps = [
      `HISID assessment: ${formatMoney(r.hisidRemoved)}`,
      `Recreation Urban Service District fee: +${formatMoney(r.recreationUsd)}`,
      inputs.isImproved
        ? `Public Safety (${inputs.safetyOption === "police" ? "police dept." : "sheriff contract"}): +${formatMoney(r.publicSafetyUsd)}`
        : `Public Safety: $0.00 — vacant lots aren't billed`,
      `Real property: ${formatMoney(enteredHome)} market value × 0.001 = +${formatMoney(r.realPropertyTax)}`,
      inputs.isImproved
        ? `Vehicles: ${formatMoney(enteredVehicles)} market value × 0.001 = +${formatMoney(r.personalPropertyTax)}`
        : `Vehicles: $0.00 — vacant lots aren't billed`,
      `Sales tax: study's modeled household estimate = +${formatMoney(r.salesTaxImpact)}`,
      `Net change: ${r.netChange > 0 ? "+" : ""}${formatMoney(r.netChange)}/year (≈ ${formatMoney(Math.abs(r.netChange / 12))}/month)`,
    ];
    howCalculatedList.innerHTML = steps.map((step) => `<li>${step}</li>`).join("");
  }

  function update() {
    const inputs = currentInputs();
    vehicleValueField.hidden = !inputs.isImproved;

    const rawHomeValue = homeValueInput.value.trim();
    if (rawHomeValue === "" || Number.isNaN(Number(rawHomeValue))) {
      resultBody.innerHTML = "";
      totalEl.textContent = "";
      totalEl.className = "calc-total";
      totalSummaryEl.textContent = "Enter your property value to calculate the estimate.";
      if (howCalculatedList) howCalculatedList.innerHTML = "";
      return;
    }

    const r = computeImpact(inputs);

    const rows = [
      ["HISID assessment goes away", r.hisidRemoved, "current", "Current charge (ending)"],
      ["Recreation Urban Service District fee", r.recreationUsd, "study", "Proposed (study figure)"],
      [
        inputs.isImproved
          ? `Public Safety Urban Service District fee (${inputs.safetyOption === "police" ? "police dept." : "sheriff contract"})`
          : "Public Safety Urban Service District fee (vacant lots not billed)",
        r.publicSafetyUsd,
        "study",
        "Proposed (study figure)",
      ],
      ["5-mill city property tax (real estate)", r.realPropertyTax, "study", "Proposed (study figure)"],
      ["5-mill city property tax (vehicles)", r.personalPropertyTax, "study", "Proposed (study figure)"],
      ["Estimated household impact of new 2.5% sales tax", r.salesTaxImpact, "estimate", "Modeled estimate"],
    ];

    resultBody.innerHTML = rows.map(([label, value, badgeClass, badgeLabel]) => {
      const cls = value > 0 ? "positive" : value < 0 ? "negative" : "";
      const sign = value > 0 ? "+" : "";
      return `<tr><th scope="row">${label}</th><td class="num ${cls}">${sign}${formatMoney(value)}</td><td><span class="badge badge--${badgeClass}">${badgeLabel}</span></td></tr>`;
    }).join("");

    const netSign = r.netChange > 0 ? "+" : "";
    totalEl.textContent = `${netSign}${formatMoney(r.netChange)} / year`;
    totalEl.className = "calc-total " + (r.netChange > 0 ? "is-positive" : r.netChange < 0 ? "is-negative" : "");

    const monthly = r.netChange / 12;
    const monthlySign = monthly > 0 ? "increase" : "decrease";
    totalSummaryEl.textContent = `Based on what you entered, your estimated net change is ${netSign}${formatMoney(r.netChange)} per year — about ${formatMoney(Math.abs(monthly))} a month ${r.netChange === 0 ? "" : monthlySign === "increase" ? "more" : "less"} than today.`;

    renderHowCalculated(inputs, r);
  }

  function updateCustomSalesTax() {
    if (!customSalesTaxResultEl) return;
    const studyEstimate = HI_DATA.calculator.salesTaxHouseholdEstAnnual;
    const raw = customSpendingInput.value.trim();
    if (raw === "" || Number.isNaN(Number(raw))) {
      customSalesTaxResultEl.textContent = `Study estimate: ${formatMoney(studyEstimate)}/year`;
      return;
    }
    const yourEstimate = Number(raw) * (HI_DATA.revenue.proposedSalesTaxPct / 100);
    customSalesTaxResultEl.textContent = `Study estimate: ${formatMoney(studyEstimate)}/year · Your estimate: ${formatMoney(yourEstimate)}/year`;
  }

  propertyTypeInputs.forEach((el) => el.addEventListener("change", update));
  safetyOptionInputs.forEach((el) => el.addEventListener("change", update));
  homeValueInput.addEventListener("input", update);
  vehicleValueInput.addEventListener("input", update);
  if (customSpendingInput) customSpendingInput.addEventListener("input", updateCustomSalesTax);

  update();
  updateCustomSalesTax();
}

document.addEventListener("DOMContentLoaded", renderCalculator);
