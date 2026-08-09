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

  function update() {
    const inputs = currentInputs();
    vehicleValueField.hidden = !inputs.isImproved;

    const r = computeImpact(inputs);

    const rows = [
      ["HISID assessment goes away", r.hisidRemoved],
      ["Recreation Urban Service District fee", r.recreationUsd],
      [
        inputs.isImproved
          ? `Public Safety Urban Service District fee (${inputs.safetyOption === "police" ? "police dept." : "sheriff contract"})`
          : "Public Safety Urban Service District fee (vacant lots not billed)",
        r.publicSafetyUsd,
      ],
      ["5-mill city property tax (real estate)", r.realPropertyTax],
      ["5-mill city property tax (vehicles)", r.personalPropertyTax],
      ["Estimated share of new 2.5% sales tax", r.salesTaxImpact],
    ];

    resultBody.innerHTML = rows.map(([label, value]) => {
      const cls = value > 0 ? "positive" : value < 0 ? "negative" : "";
      const sign = value > 0 ? "+" : "";
      return `<tr><th scope="row">${label}</th><td class="num ${cls}">${sign}${formatMoney(value)}</td></tr>`;
    }).join("");

    const netSign = r.netChange > 0 ? "+" : "";
    totalEl.textContent = `${netSign}${formatMoney(r.netChange)} / year`;
    totalEl.className = "calc-total " + (r.netChange > 0 ? "is-positive" : r.netChange < 0 ? "is-negative" : "");

    const monthly = r.netChange / 12;
    const monthlySign = monthly > 0 ? "increase" : "decrease";
    totalSummaryEl.textContent = `Based on what you entered, your estimated net change is ${netSign}${formatMoney(r.netChange)} per year — about ${formatMoney(Math.abs(monthly))} a month ${r.netChange === 0 ? "" : monthlySign === "increase" ? "more" : "less"} than today.`;
  }

  propertyTypeInputs.forEach((el) => el.addEventListener("change", update));
  safetyOptionInputs.forEach((el) => el.addEventListener("change", update));
  homeValueInput.addEventListener("input", update);
  vehicleValueInput.addEventListener("input", update);

  update();
}

document.addEventListener("DOMContentLoaded", renderCalculator);
