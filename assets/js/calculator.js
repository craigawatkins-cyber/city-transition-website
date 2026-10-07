/*
  "What will this cost me?" calculator.
  Formulas generalize the source study's own worked "How will this impact
  me?" table (5-2-2026 presentation). Constants live in assets/js/data.js
  so the calculator and the prose pages never disagree.

  One deliberate difference from the study's table: the study added a full
  5-mill city property tax as a new charge. The City has levied 4 mills since
  2026, so only the fifth mill is counted as new here. The existing 4 mills
  are shown for reference and left out of the total.

  netChange = hisidRemoved + recreationUsd + publicSafetyUsd
            + realPropertyTax + personalPropertyTax + salesTaxImpact
*/

function formatMoney(n) {
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  return sign + "$" + abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function signedMoney(n) {
  return (n > 0 ? "+" : "") + formatMoney(n);
}

function computeImpact({ isImproved, homeValue, vehicleValue, safetyOption }) {
  const c = HI_DATA.calculator;

  // Real property (land + any structure) is taxed regardless of whether a
  // lot is improved — the source's own vacant-lot example pays property tax
  // on the lot's $20,000 value. Only vehicles are tied to improved/occupied
  // properties in the source model.
  const assessedValue = Number(homeValue) || 0;
  const vehicles = isImproved ? Number(vehicleValue) || 0 : 0;

  const hisidRemoved = isImproved ? c.hisidRemovedImproved : c.hisidRemovedUnimproved;
  const recreationUsd = c.recreationUsdAnnual;
  const publicSafetyUsd = isImproved ? c.publicSafetyUsdAnnual[safetyOption] : 0;
  // New = the planning-assumption rate minus what the City already levies.
  const realPropertyTax = assessedValue * c.newMillRate;
  const personalPropertyTax = vehicles * c.newMillRate;
  const existingCityPropertyTax = (assessedValue + vehicles) * c.currentMillRate;
  const salesTaxImpact = isImproved ? c.salesTaxHouseholdEstAnnual : 0;

  const netChange = hisidRemoved + recreationUsd + publicSafetyUsd
    + realPropertyTax + personalPropertyTax + salesTaxImpact;

  return {
    hisidRemoved, recreationUsd, publicSafetyUsd,
    realPropertyTax, personalPropertyTax, salesTaxImpact,
    existingCityPropertyTax,
    netChange,
  };
}

function renderCalculator() {
  const form = document.getElementById("impact-form");
  if (!form) return;

  const propertyTypeInputs = form.querySelectorAll('input[name="property-type"]');
  const safetyOptionInputs = form.querySelectorAll('input[name="safety-option"]');
  const vehicleValueField = document.getElementById("vehicle-value-field");
  const homeValueInput = document.getElementById("home-value");
  const vehicleValueInput = document.getElementById("vehicle-value");

  const resultBody = document.getElementById("calc-result-body");
  const phaseBody = document.getElementById("calc-phase-body");
  const totalEl = document.getElementById("calc-total");
  const totalSummaryEl = document.getElementById("calc-total-summary");
  const existingNoteEl = document.getElementById("calc-existing-note");
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
      `Real property, one additional mill: ${formatMoney(enteredHome)} market value × 0.0002 = +${formatMoney(r.realPropertyTax)}`,
      inputs.isImproved
        ? `Vehicles, one additional mill: ${formatMoney(enteredVehicles)} market value × 0.0002 = +${formatMoney(r.personalPropertyTax)}`
        : `Vehicles: $0.00 — vacant lots aren't billed`,
      `Sales tax: study's modeled household estimate = +${formatMoney(r.salesTaxImpact)}`,
      `Net change: ${signedMoney(r.netChange)}/year (≈ ${formatMoney(Math.abs(r.netChange / 12))}/month)`,
      `Not counted, because you already pay it: the City's existing 4 mills, about ${formatMoney(r.existingCityPropertyTax)}/year on the values entered`,
    ];
    howCalculatedList.innerHTML = steps.map((step) => `<li>${step}</li>`).join("");
  }

  function renderPhases(inputs, r) {
    if (!phaseBody) return;
    const sewer = HI_DATA.calculator.sewerLoanAssessmentReduction;
    const newMill = r.realPropertyTax + r.personalPropertyTax;
    const tbd = '<span class="badge badge--future">Amount not yet set</span>';
    const rows = [
      ["2027 · Roads", "HISID assessment is reduced because road costs move to the City", tbd],
      ["2027", "City property tax, if the council sets 5 mills in place of today's 4", signedMoney(newMill) + " / year"],
      ["2027", "2.5% sales tax, if voters approve it on November 3", inputs.isImproved ? signedMoney(r.salesTaxImpact) + " / year (estimate)" : "$0.00 in this model"],
      ["2027/28 · Water &amp; sewer", "Assessment is reduced when the sewer loan is paid, and the Sewer Debt charge comes off the water bill", signedMoney(-sewer) + " / year"],
      ["2028 · Public safety &amp; fire", "Public Safety fee starts on the water bill, if the petition succeeds; assessment is reduced again", inputs.isImproved ? signedMoney(r.publicSafetyUsd) + " / year fee; reduction " + tbd : "No fee for vacant lots; reduction " + tbd],
      ["2029 · Recreation", "Recreation fee starts; assessment is reduced again", signedMoney(r.recreationUsd) + " / year (early estimate); reduction " + tbd],
      ["2030+ · HISID phase-out", "The remaining assessment is eliminated", "<strong>Net " + signedMoney(r.netChange) + " / year</strong> compared with today"],
    ];
    phaseBody.innerHTML = rows.map(([when, what, amount]) =>
      `<tr><th scope="row">${when}</th><td>${what}</td><td>${amount}</td></tr>`).join("");
  }

  function update() {
    const inputs = currentInputs();
    vehicleValueField.hidden = !inputs.isImproved;

    const rawHomeValue = homeValueInput.value.trim();
    if (rawHomeValue === "" || Number.isNaN(Number(rawHomeValue))) {
      resultBody.innerHTML = "";
      if (phaseBody) phaseBody.innerHTML = "";
      totalEl.textContent = "";
      totalEl.className = "calc-total";
      totalSummaryEl.textContent = "Enter your property value to calculate the estimate.";
      if (existingNoteEl) existingNoteEl.textContent = "";
      if (howCalculatedList) howCalculatedList.innerHTML = "";
      return;
    }

    const r = computeImpact(inputs);

    const rows = [
      ["HISID assessment goes away", r.hisidRemoved, "current", "Current charge (ending)"],
      ["Recreation Urban Service District fee", r.recreationUsd, "estimate", "Early estimate (set in 2029)"],
      [
        inputs.isImproved
          ? `Public Safety Urban Service District fee (${inputs.safetyOption === "police" ? "police dept." : "sheriff contract"})`
          : "Public Safety Urban Service District fee (vacant lots not billed)",
        r.publicSafetyUsd,
        "study",
        "Proposed (study figure)",
      ],
      ["City property tax, one additional mill (real estate)", r.realPropertyTax, "study", "Planning assumption (4 to 5 mills)"],
      ["City property tax, one additional mill (vehicles)", r.personalPropertyTax, "study", "Planning assumption (4 to 5 mills)"],
      ["Estimated household impact of proposed 2.5% sales tax", r.salesTaxImpact, "estimate", "Modeled estimate"],
    ];

    resultBody.innerHTML = rows.map(([label, value, badgeClass, badgeLabel]) => {
      const cls = value > 0 ? "positive" : value < 0 ? "negative" : "";
      return `<tr><th scope="row">${label}</th><td class="num ${cls}">${signedMoney(value)}</td><td><span class="badge badge--${badgeClass}">${badgeLabel}</span></td></tr>`;
    }).join("");

    const monthly = r.netChange / 12;
    totalEl.textContent = `${signedMoney(monthly)} / month`;
    totalEl.className = "calc-total " + (r.netChange > 0 ? "is-positive" : r.netChange < 0 ? "is-negative" : "");

    const direction = r.netChange > 0 ? "more" : r.netChange < 0 ? "less" : "";
    totalSummaryEl.textContent = r.netChange === 0
      ? "Based on what you entered, a completed transition would leave your annual costs about where they are today."
      : `Based on what you entered, that is about ${formatMoney(Math.abs(r.netChange))} a year ${direction} than today once the transition is complete. It does not arrive at once: the changes phase in from 2027, as shown below.`;

    if (existingNoteEl) {
      existingNoteEl.textContent = `Not counted as new: the City's existing 4-mill property tax, about ${formatMoney(r.existingCityPropertyTax)} a year on the values you entered. You already pay it, so it is not part of the change.`;
    }

    renderPhases(inputs, r);
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
