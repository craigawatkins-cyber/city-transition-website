/*
  Single source of truth for every dollar figure that appears on more than
  one page of this site. Update numbers here when the study is revised —
  every page and the calculator read from this file so nothing drifts out
  of sync. All figures are sourced from two public presentations by Mayor
  Kees: the 5-2-2026 feasibility study ("Session 1") and the 7-11/7-13-2026
  "Session 2" police/fire follow-up. See about-this-site.html for sources.
*/

const HI_DATA = {
  meta: {
    session1Date: "May 2, 2026 (updated May 6, 2026)",
    session2Date: "July 11, 2026 (revised July 13, 2026)",
    population: 2452,
  },

  // ---- Current (2026) combined budget, City + HISID ----
  currentBudget: {
    cityOperating: 637401,
    hisidOperating: 4274877,
    combinedOperating: 4912278,
    combinedWithCapital: 6108005, // total incl. capital improvements
    // Note: the source PDF's default text extraction misaligned this table by one
    // row, which had attached $200,231 to the city subtotal and left per-line
    // figures unverifiable. Re-extracting with pdftotext -table fixed the
    // alignment: these per-line figures now sum exactly to $637,401, and
    // $637,401 + hisidOperating ($4,274,877) reconciles exactly to the
    // slide's stated Combined figure ($4,912,278), confirming the correction.
    cityDepartments: [
      { name: "Administration", amount: 200231 },
      { name: "Buildings & Construction", amount: 23209 },
      { name: "Code Enforcement / Animal Control", amount: 77417 },
      { name: "District Court", amount: 9550 },
      { name: "Planning & Zoning", amount: 8353 },
      { name: "Public Safety (sheriff contract share)", amount: 221600 },
      { name: "Solid Waste", amount: 2566 },
      { name: "Streets & Roads", amount: 94475 },
    ],
    hisidDepartments: [
      { name: "Administration", amount: 890343 },
      { name: "Sewer & Water", amount: 1086322 },
      { name: "Roads (net of city contribution)", amount: 292826 },
      { name: "Fire Department (net of city contribution)", amount: 474081 },
      { name: "Recreation", amount: 1531305 },
    ],
  },

  // ---- Peer city comparison (2026 budgets) ----
  peerCities: [
    { name: "Holiday Island", population: 2452, budget: 6108005, note: "Includes recreation & water" },
    { name: "West Fork", population: 3131, budget: 4454884, note: "Excludes recreation & water" },
    { name: "Green Forest", population: 2972, budget: 3496800, note: "Excludes recreation & water" },
    { name: "Carlisle", population: 2180, budget: 2858886, note: "Excludes recreation & water" },
  ],

  // ---- Roads ----
  roads: {
    totalMiles: 71,
    typicalPeerMiles: 10,
    pctPavedOrConcrete: 40,
    pavedResurfaceCycleYears: [25, 30],
    chipSealResurfaceCycleYears: [5, 15],
    grantReceived: 300000,
    grantAwarded: 400000,
  },

  // ---- Fire ----
  fire: {
    holidayIslandBudget: 574081,
    typicalPeerBudgetHigh: 250000,
    febStats: {
      totalCalls: 67,
      structure: 2,
      brush: 6,
      illegalBurn: 30,
      vehicle: 1,
      smoke: 14,
      other: 21,
      totalFireCalls: 35,
      emsCalls: 13,
      liftAssist: 4,
      mvc: 0,
      pctMedicalOrLift: 78,
    },
  },

  // ---- Parks & Recreation ----
  parksRec: {
    currentAnnualSubsidy: 500000,
    nationalPerCapita: 81.19,
    nationalTypicalAnnual: 203000,
    proposedUsdAnnualFeeImproved: 187.85, // flat, all properties (see fees below)
    proposedUsdMonthlyFee: 15.65,
  },

  // ---- Water & Sewer ----
  waterSewer: {
    milesOfLine: 71,
    bondMaturesYear: 2031,
    likelyPaidOffWithinMonths: 18,
  },

  // ---- Arkansas municipal revenue facts ----
  revenue: {
    propertyTaxMillCapCity: 5, // mills, constitutional cap
    assessedValuePct: 20, // % of appraised value that is "assessed value"
    countyRoadTaxMills: 3,
    countyRoadTaxReturnedToCityMills: 1.5,
    franchiseFeeCapPct: 4.25,
    salesTaxYieldOrganicPerPersonPer1Pct: 239,
    salesTaxYieldVacationTownPerPersonPer1Pct: 82,
    proposedSalesTaxPct: 2.5,
    proposedSalesTaxEstAnnualRevenue: 502660,
  },

  // ---- HISID assessment (what's being replaced) ----
  hisidAssessment: {
    netAnnualCollected: 2300000,
    vacantLotsContribution: 840000,
    vacantLotsUnderPropertyTaxEst: 33000,
    typicalImprovedAssessment: 834.60,
    typicalUnimprovedAssessment: 513.60,
  },

  // ---- Public Safety (police vs. sheriff) ----
  publicSafety: {
    sheriffContract: {
      deputies: 2,
      hoursPerWeekContracted: 80,
      hourlyRate: 31.28,
      annualCost: 130125,
      actualHoursDeliveredLow: 55,
      actualHoursDeliveredHigh: 70,
      febCoverageHours: 183,
      febTotalHoursInMonth: 744,
      febPctCovered: 25,
      febZeroCoverageDays: 9,
      febUnderThreeHoursDays: 6,
    },
    policeDept: {
      officersFullTime: 4,
      officersPartTime: 1,
      nationalBenchmarkPer1000: 3.8,
      nationalAveragePer1000: 2.4,
      startupCostLow: 280000,
      startupCostHigh: 300000,
      startupCostDetailed: 282700,
      annualEmployeeCost: 332022,
      annualOperatingCost: 76200,
      totalOperatingBudget: 449044,
      totalWithCapital: 509044,
      earlierThreeOfficerEstimate: 475931,
      startupFundingBridge: 357044,
    },
    // Most current (Session 2, revised 7-13-26) USD fee estimates — canonical
    // for the live calculator and all prose on the site.
    usdFeeCurrent: {
      billableUnits: 1645,
      sheriff: { annual: 632, monthly: 53, totalRevenue: 1040044 },
      police: { annual: 888, monthly: 74, totalRevenue: 1460971 },
    },
    // Original May 2 worked examples — published for reference only, not
    // used in live calculations. Kept so the site never appears to silently
    // contradict the original deck.
    usdFeePublishedMay2: {
      billableUnits: 1491,
      sheriff: { annual: 634.80, monthly: 52.90 },
      police: { annual: 860.78, monthly: 71.73 },
    },
    petitionSignaturesRequired: 325,
    petitionPctOfElectors: 25,
  },

  // ---- Resident cost-impact calculator constants (see calculator.js) ----
  // These reproduce the source's own "How will this impact me?" table,
  // generalized into formulas. Flat figures are exactly as published;
  // the property-tax lines use the source's own stated formula
  // (assessed value x 20% x 5 mills = value x 0.001).
  calculator: {
    hisidRemovedImproved: -834.60,
    hisidRemovedUnimproved: -513.60,
    recreationUsdAnnual: 187.85,
    publicSafetyUsdAnnual: { sheriff: 632, police: 888 }, // improved properties only
    millRate: 0.001, // 20% assessed x 0.005 (5 mills)
    salesTaxHouseholdEstAnnual: 270, // flat estimate, improved/household properties only
  },

  // ---- Published worked examples (for the static reference table) ----
  // Net annual change, using the ORIGINAL May 2 fee figures, exactly as
  // presented in the source deck.
  publishedExamples: [
    {
      label: "$20K vacant lot (unimproved)",
      assessmentRemoved: -513.60, recreationUsd: 187.85, publicSafetyUsd: 0,
      propertyTax: 20.00, personalPropertyTax: 0, salesTax: 0,
      netSheriff: -305.75, netPolice: -305.75,
    },
    {
      label: "$150K house (improved)",
      assessmentRemoved: -834.60, recreationUsd: 187.85,
      publicSafetyUsdSheriff: 634.80, publicSafetyUsdPolice: 860.78,
      propertyTax: 150.00,
      personalPropertyTaxSheriff: 20.00, personalPropertyTaxPolice: 30.00,
      salesTax: 270.00,
      netSheriff: 428.05, netPolice: 664.03,
    },
    {
      label: "$300K house (improved)",
      assessmentRemoved: -834.60, recreationUsd: 187.85,
      publicSafetyUsdSheriff: 634.80, publicSafetyUsdPolice: 860.78,
      propertyTax: 300.00,
      personalPropertyTaxSheriff: 40.00, personalPropertyTaxPolice: 40.00,
      salesTax: 270.00,
      netSheriff: 598.05, netPolice: 824.03,
    },
  ],

  // ---- Peer improvement districts (legal background) ----
  peerDistricts: [
    { name: "Horseshoe Bend", outcome: "SID dissolved after a lawsuit; city took over recreational amenities in 2025." },
    { name: "Ozark Acres", outcome: "Settled a lawsuit by moving toward incorporating and phasing out the SID by 2028." },
    { name: "Cherokee Village", outcome: "A judge's order requires the SID to be dissolved by the end of 2026." },
    { name: "Holiday Island", outcome: "Settled one lawsuit in 2011; currently involved in another that is still being litigated." },
  ],

  // ---- Five proposed city funds ----
  funds: [
    { name: "General Fund", funding: "Base city revenue & property tax", note: "Administration, legal, code enforcement admin, elections, insurance, solid waste." },
    { name: "Public Safety Fund", funding: "Public Safety Urban Service District fee (water bill)", note: "Police or sheriff contract, fire department, code enforcement." },
    { name: "Sewer & Water Fund", funding: "Usage-based water & sewer rates", note: "Must fund a new state-mandated capital replacement reserve." },
    { name: "Parks & Recreation Fund", funding: "Parks & Rec Urban Service District fee (water bill)", note: "Golf, pools, marina, community center, trails, campgrounds." },
    { name: "Street (Roads) Fund", funding: "Fuel-tax turnback, county road-tax return, general fund transfer, grants", note: "71 miles of city roads." },
  ],

  // ---- Timeline ----
  timeline: [
    { year: "2026", items: [
      "Prepare legal documents to transition the Road Department to the city.",
      "Transition the Road Department.",
      "Submit an ordinance to the county clerk placing a 2.5% sales tax on the November ballot.",
      "Election on the sales tax question — if it fails, further transition planning pauses.",
    ]},
    { year: "2027", items: [
      "Once the sewer bond is retired, transition the Water Department.",
      "Decide whether to pursue a police department or a sheriff/deputy agreement.",
      "Circulate a petition to form a Public Safety Urban Service District (325 signatures needed) — if it fails, this transition pauses.",
      "If successful, the City Council establishes the Public Safety USD and planning begins for the Fire Department transition.",
    ]},
    { year: "2028", items: [
      "Circulate a petition to form a Parks & Recreation Urban Service District — if it fails, this transition pauses.",
      "If successful, plan and transition recreational amenities.",
      "HISID begins its formal dissolution process.",
    ]},
  ],
};
