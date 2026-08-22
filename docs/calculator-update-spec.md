# Holiday Island Cost Calculator — Accuracy, Transparency, and Resident Guidance

## Objective

Update `calculator.html` and any associated JavaScript/CSS/data files so the Holiday Island transition cost calculator is mathematically correct, easy for an ordinary resident to understand, and transparent about the difference between:

1. the simplified methodology used in the Holiday Island feasibility study,
2. actual Arkansas property-tax calculation rules, and
3. assumptions used by this resident-facing calculator.

Do not redesign the entire website. Preserve the existing visual style, navigation, terminology, and overall calculator structure unless a change is necessary for accuracy or clarity.

The goal is NOT to make the proposed transition look more or less favorable. The goal is to make the calculator accurately explain the assumptions and allow residents to reproduce the estimate themselves.

---



# 1. Critical terminology correction

The current calculator says:

> "County-assessed value of your property"

This is misleading because the calculator expects the property's FULL MARKET VALUE and then applies the 20% Arkansas assessment ratio and 5-mill rate.

Change the label to:

> **County estimated market value of your property**

Use this explanatory text directly below the field:

> **Enter the "Estimated Market Value" shown by your county assessor — land plus any home or structure. Do not enter the "Full Assessed Value (20%)" or "Taxable Value." The calculator applies the 20% assessment ratio and proposed 5-mill rate for you.**

Add a small expandable/help section titled:

> **Which number should I enter?**

The help text should say:

> Your county assessor may show several different values. For this calculator, enter the **Estimated Market Value**.
>
> Example:
>
> - Estimated Market Value: $355,950 ← **ENTER THIS**
> - Full Assessed Value (20%): $71,190
> - Taxable Value: $62,825
>
> Do not enter the $71,190 or $62,825 figures into this calculator.
>
> The calculator uses the feasibility-study methodology of applying 20% assessment and a 5-mill tax rate to the full value you enter.

Do not call $71,190 the "taxable value." They are different concepts.

---



# 2. Explain the 5-mill calculation correctly

The calculator currently uses:

> entered property value × 0.001

Keep this mathematical methodology because it reproduces the simplified calculation used in the feasibility study.

Explain it clearly:

> **5-mill city property tax**
>
> For this feasibility-study estimate, the calculator multiplies the full market value you enter by 0.001.
>
> The calculation is:
>
> Full market value × 20% assessment × 0.5% tax rate = 0.1% of full market value.
>
> Example:
>
> $300,000 × 20% = $60,000 assessed value
>
> $60,000 × 0.005 = $300 annual tax
>
> Therefore:
>
> **$300,000 × 0.001 = $300/year**

Also explain:

> **5 mills = $5 of tax for every $1,000 of assessed value.**

Do not describe 5 mills as 0.5% of the property's market value. It is 0.5% of the assessed value.

---



# 3. Important Arkansas-tax disclaimer

Add a clearly visible but non-alarming note directly beneath the property-tax explanation:

> **Important:** This calculator reproduces the simplified property-tax methodology used in the Holiday Island feasibility study. Actual Arkansas property taxes are calculated using taxable assessed value and applicable local millage rates. Amendment 79 and other Arkansas property-tax provisions can cause a property's taxable assessed value to differ from a simple 20% calculation. Your actual future tax bill may therefore differ from this estimate.

Do NOT imply that the calculator is an official tax calculator.

Do NOT say that a resident's actual future tax bill will necessarily equal:

> market value × 0.001

That is the study's simplified estimate.

Arkansas Department of Finance and Administration material explains the general 20%-of-market-value assessment methodology and the role of millage, while Amendment 79 can limit increases in assessed value. Use those official sources in the site's Sources section.

---



# 4. Property input

Keep:

> House or developed property

and:

> Vacant lot

For the property value field, use:

> **County estimated market value**

For a vacant lot, the resident should enter the county's estimated market value of the land.

For a developed property, the resident should enter the county's estimated market value of the land plus improvements as shown by the assessor.

---



# 5. Vehicle input

Change:

> Total household vehicle value

to:

> **Total household vehicle market value (optional)**

Add:

> If your county assessor provides a market/appraised value for your vehicles, enter the total household value here. Do not enter the 20% assessed value.

Explain that the calculator applies the same simplified:

> market value × 20% × 5 mills

methodology to personal property/vehicles.

If the feasibility study's underlying model does not distinguish individual vehicle types, retain the simple household-value input.

---



# 6. Correct the real-estate calculation

For a property value of:

> $355,950

the calculator MUST calculate:

> $355,950 × 0.001 = $355.95

Do not round this to $355.59.

Display:

> **+$355.95**

The result should be calculated from the entered value rather than hardcoded.

Use normal currency formatting with two decimal places.

---



# 7. Correct total for the current example

Using these inputs:

- Improved/developed property
- Property market value: $355,950
- Vehicle market value: $12,000
- Sheriff/deputy contract option
- Estimated sales-tax household impact: $270

The calculation should be:


| Line item                                        | Annual amount |
| ------------------------------------------------ | ------------- |
| HISID assessment goes away                       | -$834.60      |
| Recreation Urban Service District fee            | +$187.85      |
| Public Safety Urban Service District fee         | +$632.00      |
| 5-mill city property tax — real estate           | +$355.95      |
| 5-mill city property tax — vehicles              | +$12.00       |
| Estimated household impact of new 2.5% sales tax | +$270.00      |
| **Estimated net annual change**                  | **+$623.20**  |


Monthly equivalent:

> **+$51.93/month**

Make sure the calculator produces this result when those values are entered.

---



# 8. Sales-tax terminology

The current wording:

> Estimated share of new 2.5% sales tax

can be misunderstood.

Change it to:

> **Estimated household impact of new 2.5% sales tax**

Then explain:

> This is a modeled estimate based on the feasibility study's assumed household spending. It is not a fixed annual charge assessed to the household. Actual sales-tax impact will depend on the amount and type of taxable purchases a household makes.

Keep the current $270 assumption if that is the figure used by the feasibility study.

Do not represent $270 as an official amount that every household will pay.

---



# 9. Consider allowing residents to calculate their own sales-tax impact

If the existing architecture makes this reasonably easy, add an optional expandable field:

> **Want to estimate your own sales-tax impact?**

Input:

> Estimated annual taxable spending: $________

Then calculate:

> Annual taxable spending × 2.5%

However, DO NOT remove the feasibility-study $270 estimate.

Instead, show:

> **Study estimate:** $270/year

and optionally:

> **Your estimate:** $____/year

Clearly distinguish the two.

If adding this feature would complicate the existing calculator substantially, leave it out for this update.

---



# 10. Homestead credit — correct the existing explanation

The current page contains language suggesting the homestead credit was "roughly $600" and that some 2026 legislation was pushing it toward $675.

Do not leave that wording in place.

Update it so the website does not present outdated or uncertain information.

Use:

> ### Arkansas Homestead Tax Credit
>
> Arkansas provides a homestead property-tax credit for eligible primary residences. The credit applies against the property's eligible real-property tax liability rather than functioning as a separate $675 credit specifically for the proposed city tax.
>
> The exact amount and application should be confirmed with the Carroll County Assessor or Arkansas Department of Finance and Administration because state law and implementation can change.
>
> **Do not subtract the full homestead credit from the proposed 5-mill city tax in this calculator.** A homeowner does not receive a second $675 credit simply because a new city taxing jurisdiction is created.

The calculator should NOT currently subtract $675 from the proposed 5-mill tax unless there is authoritative documentation showing exactly how the new city tax would interact with the credit.

This is extremely important.

---



# 11. Amendment 79 explanation

The website currently discusses Amendment 79.

Keep this information but make it technically precise.

Explain:

> Arkansas Amendment 79 can limit increases in assessed value for qualifying property. For homestead property, increases in assessed value resulting from reappraisal are generally limited to 5% per year, subject to statutory exceptions including newly discovered property, new construction, and substantial improvements.

Also explain the senior/disabled freeze carefully:

> Arkansas law provides an assessed-value freeze for qualifying homestead property owners who are 65 or older or disabled, subject to the applicable requirements.

Do not imply that everyone 65+ automatically receives the freeze without applying.

Do not say that the city's property-tax bill will necessarily "stay flat" because of the freeze. The taxable/assessed value protection does not mean all components of a future property-tax bill are guaranteed to remain unchanged.

---



# 12. Distinguish three different values

Add an educational explanation that residents can understand:

### Market value

What the county estimates the property is worth.

### Full assessed value

Generally 20% of market value for Arkansas real property.

### Taxable value

The value actually used to calculate property taxes after applicable Arkansas property-tax provisions and limitations.

Use the resident's example:

> $355,950 market value
>
> $71,190 full assessed value
>
> $62,825 taxable value

Explain that these numbers can all legitimately be different.

Do not tell residents to use taxable value for this particular calculator unless the underlying feasibility-study methodology is changed.

---



# 13. Make the calculator explicitly identify what is a study assumption

For every line item, distinguish between:

### Based on proposed/study figures

- HISID assessment eliminated
- Recreation USD fee
- Public Safety USD fee
- 5-mill proposed city property tax
- Estimated 2.5% sales-tax impact

Use a small "Source/assumption" indicator where appropriate.

Residents should be able to understand:

> "This is an actual existing charge."

versus:

> "This is a proposed amount."

versus:

> "This is an estimate/assumption."

---



# 14. Result heading

Change:

> Your estimated impact

to:

> **Your estimated annual household impact**

Immediately underneath:

> This is a planning estimate based on the current feasibility-study figures and the assumptions you entered. It is not an adopted tax bill.

Display:

> **+$623.20/year**

and:

> **≈ $51.93/month**

for the example above.

---



# 15. Add an expandable "How did you calculate this?" section

Make the calculator transparent enough that a resident can independently reproduce the result.

Example:

### How your estimate was calculated

**1. HISID assessment**

Your current HISID assessment:

> -$834.60

**2. Recreation**

Proposed Recreation Urban Service District fee:

> +$187.85

**3. Public Safety**

Sheriff/deputy contract:

> +$632.00

**4. Real property**

$355,950 market value × 0.001:

> +$355.95

**5. Vehicles**

$12,000 vehicle market value × 0.001:

> +$12.00

**6. Sales tax**

Study's modeled household estimate:

> +$270.00

**Net change**

> +$623.20/year

This makes the calculator auditable.

---



# 16. Sources

Use primary/official sources wherever possible.

At minimum, cite:

### Arkansas Department of Finance and Administration

Use the Arkansas DFA assessment material explaining:

- market value
- 20% assessment
- millage
- property-tax calculation

Source:

[https://www.dfa.arkansas.gov/wp-content/uploads/AACD-Annual-Report-2024-3.pdf](https://www.dfa.arkansas.gov/wp-content/uploads/AACD-Annual-Report-2024-3.pdf)

### Arkansas DFA property-tax FAQs

Use:

[https://www.dfa.arkansas.gov/wp-content/uploads/faqs-2023.pdf](https://www.dfa.arkansas.gov/wp-content/uploads/faqs-2023.pdf)

This supports the explanation of Amendment 79, the 5% homestead assessment cap, and the 65+/disabled assessed-value freeze.

### Arkansas Constitution / Amendment 79

Use the official Arkansas Secretary of State publication:

[https://www.sos.arkansas.gov/uploads/elections/Arkansas_Election_Laws_and_Constitution_2025_Edition.pdf](https://www.sos.arkansas.gov/uploads/elections/Arkansas_Election_Laws_and_Constitution_2025_Edition.pdf)

### Arkansas Code of Rules

Use the official Arkansas Code of Rules homestead material where applicable:

[https://codeofarrules.arkansas.gov/](https://codeofarrules.arkansas.gov/)

### Arkansas DFA local sales-tax information

For general local sales-tax information:

[https://www.dfa.arkansas.gov/office/taxes/excise-tax-administration/sales-use-tax/recent-changes-in-local-taxes/](https://www.dfa.arkansas.gov/office/taxes/excise-tax-administration/sales-use-tax/recent-changes-in-local-taxes/)

### Holiday Island feasibility study

Continue linking to the actual May/July 2026 feasibility-study presentations used to establish:

- $834.60 HISID assessment
- $513.60 vacant-lot assessment
- $187.85 Recreation USD
- $632 sheriff/deputy Public Safety USD
- $888 police-department Public Safety USD
- 5-mill city property tax
- 2.5% sales tax
- $270 modeled household sales-tax impact

Do not present those figures as Arkansas law. They are proposal/study figures.

---



# 17. Source labels

Do not simply put a giant list of URLs at the bottom.

Use human-readable source labels such as:

> **Source: Arkansas Department of Finance and Administration — Property Assessment & Tax Calculation**

and make the label clickable.

For proposal figures:

> **Source: Holiday Island municipal transition feasibility study — May/July 2026 presentations**

For legal/tax rules:

> **Source: Arkansas Department of Finance and Administration / Arkansas Constitution**

Residents should be able to tell which source supports which claim.

---



# 18. Do not make these claims

Do NOT state or imply:

- "Your actual city property tax will be exactly 0.1% of your home's market value."
- "Your taxable value is always exactly 20% of market value."
- "Everyone gets a $675 credit against the new city tax."
- "The senior/disabled freeze means your entire future property-tax bill cannot increase."
- "Every household will pay exactly $270/year in sales tax."
- "The 5-mill tax is 0.5% of your home's market value."
- "The calculator is an official Arkansas tax calculator."
- "These are final city rates."

The website should consistently call the figures:

> **proposed**
>
> **estimated**
>
> **modeled**
>
> **feasibility-study figures**

as appropriate.

---



# 19. Validation/test cases

Before considering the work complete, test the calculator with these cases.

### Test 1 — $300,000 house

Property value:

> $300,000

Expected real-estate tax:

> $300.00



### Test 2 — $355,950 house

Property value:

> $355,950

Expected real-estate tax:

> $355.95



### Test 3 — $355,950 house + $12,000 vehicles

Expected:

> Real estate: $355.95
>
> Vehicles: $12.00



### Test 4 — $20,000 vacant lot

Expected real-estate tax:

> $20.00

No public safety fee.

No household sales-tax estimate.

### Test 5 — $150,000 house

Expected real-estate tax:

> $150.00



### Test 6 — $0 vehicle value

Vehicle tax:

> $0.00



### Test 7 — blank property value

Do not produce NaN, undefined, or misleading output.

Show:

> "Enter your property value to calculate the estimate."



### Test 8 — $355,950 + $12,000 vehicles + sheriff option

Expected total:

> **+$623.20/year**
>
> **≈ +$51.93/month**

---



# 20. Accessibility and resident usability

The calculator is intended for ordinary residents, not tax professionals.

Use plain language.

Avoid unexplained terms such as:

- ad valorem
- assessed valuation
- taxable assessed valuation

unless they are explained.

Make the "Which value should I enter?" explanation extremely easy to find.

Use labels that remain understandable on mobile devices.

All explanatory text should be readable without requiring residents to understand the underlying tax code.

---



# 21. Preserve neutrality

The site is intended to provide an independent resident-facing explanation of the proposed transition.

The calculator should not persuade residents that the transition is good or bad.

It should answer:

> "What might this cost my household?"

The result should show both increases and reductions.

Keep:

> HISID assessment goes away

as a negative line item because it represents a charge that would no longer exist.

Keep the proposed fees/taxes as positive line items.

Do not hide or minimize any component.

---



# 22. Final implementation requirement

Before finishing, inspect the complete calculator implementation and verify that:

1. The input label says **Estimated Market Value**, not "assessed value."
2. The instructions explicitly tell residents not to enter the 20% assessed value.
3. The 5-mill formula produces $300 for a $300,000 property.
4. The 5-mill formula produces $355.95 for a $355,950 property.
5. The current example produces $623.20/year with $12,000 vehicles and the sheriff option.
6. The website distinguishes market value, full assessed value, and taxable value.
7. The site clearly says the calculator reproduces the feasibility-study methodology rather than guaranteeing an actual future tax bill.
8. Amendment 79 is explained accurately.
9. The homestead-credit language is not speculative or outdated.
10. The sales-tax $270 figure is clearly labeled as a modeled estimate.
11. Primary government sources are linked for Arkansas tax-law explanations.
12. Feasibility-study sources are linked separately for proposed Holiday Island figures.
13. No unsupported legal/tax claims are introduced.
14. Existing site navigation and styling remain intact.
15. No unrelated pages are changed unless necessary to correct a shared source/reference.

After making the changes, report:

- files changed,
- calculations changed,
- wording changed,
- sources added,
- and the results of all seven test cases above.

