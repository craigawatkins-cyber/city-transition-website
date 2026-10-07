#!/usr/bin/perl
# Numbers the citations on every page and rebuilds each page's source list.
#
# In the HTML, mark a citation with an empty marker naming one or more sources:
#     <sup class="cite" data-src="lrp may"></sup>
# Then run from the repo root:
#     perl tools/build-citations.pl *.html
# The script numbers sources in order of first appearance on each page, fills in
# the superscript links, and regenerates the "Sources cited on this page" block
# just before </main>. It is safe to run repeatedly.
use strict; use warnings;

my $LRP = 'https://drive.google.com/file/d/1ul3-1l40UpRCqN19zxTP7dAHxp4odrPl/view';
my $CITY = 'https://www.cityofholidayisland.com';

# key => [ text, url (optional) ]
my %SRC = (
  lrp       => ['City of Holiday Island &amp; Holiday Island Suburban Improvement District, <em>Long Range Plan</em>, September 22, 2026 (Resolution 2026-015).', $LRP],
  may       => ['Mayor Dan Kees, <em>"Can the City Do It All?" — A Feasibility Study</em>, presented May 2, 2026 (updated May 6, 2026). Earlier feasibility estimate, not an adopted figure. Posted on the City website under About/Contact → Services.', "$CITY/services-1"],
  july      => ['Mayor Dan Kees, <em>"The Future Holiday Island — Session 2: Protecting Our Citizens,"</em> presented July 11, 2026 (revised July 13, 2026). Earlier feasibility estimate, not an adopted figure. Presented in a public forum.', ''],
  sotc      => ['City of Holiday Island, "State of the City: Planning for Holiday Island\'s Future," January 2026.', "$CITY/post/january-16-2026-state-of-the-city-planning-for-holiday-island-s-future"],
  mcf       => ['City of Holiday Island, "Moving the City Forward," August 2026.', "$CITY/post/moving-the-city-forward"],
  ann       => ['City of Holiday Island, "Long Range Plan Now Available: Your Input Is Needed," October 2026.', "$CITY/post/long-range-plan-now-available-your-input-is-needed"],
  arconst   => ['Arkansas Constitution, Article 12, § 4 (5-mill limit on municipal property tax).', 'https://law.justia.com/constitution/arkansas/article-12/section-4/'],
  ar2026    => ['Ark. Code Ann. § 26-26-303(c) (real property assessed at 20% of market value).', ''],
  homestead => ['Ark. Code Ann. § 26-26-1118(a)(1)(A), as amended by Act 174 of 2026 (HB1103): homestead property-tax credit of $675 a year for assessment years beginning on or after January 1, 2026 (previously $600).', 'https://www.arkleg.state.ar.us/Bills/Detail?ddBienniumSession=2025%2F2026F&amp;id=HB1103'],
  sidlaw    => ['Ark. Code Ann. § 14-92-201 et seq. (suburban improvement districts), including §§ 14-92-210, 14-92-220 and 14-92-239 on operating and maintaining district improvements, and § 14-92-225 on assessments.', ''],
  dfarelief => ['Arkansas Department of Finance and Administration, Property Tax Relief Programs (homestead credit; Amendment 79 assessment freeze for owners 65+ or disabled).', 'https://www.dfa.arkansas.gov/office/arkansas-assessment-coordination-division/real-property/property-tax-relief/'],
  ap        => ['City of Holiday Island ordinances; Arkansas Advertising and Promotion Commission statute, Ark. Code Ann. § 26-75-601 et seq.', ''],
  calc      => ['This site\'s own arithmetic from the rates cited on this page, for an illustrative household with a $200,000 home and $30,000 a year in taxable spending. Not a published figure.', ''],
  proj      => ['This site\'s own projection using the May 2026 feasibility study\'s formula (population × $82 per resident per 1% of sales tax). Not a published figure.', ''],
  # Why a city / region
  nwa       => ['Talk Business &amp; Politics, "Northwest Arkansas ranks 9th-fastest growing U.S. metro," April 2026, reporting U.S. Census Bureau population estimates as of July 1, 2025.', 'https://talkbusiness.net/2026/04/northwest-arkansas-ranks-9th-fastest-growing-u-s-metro-first-time-in-top-10-since-at-least-2020/'],
  irs503    => ['Internal Revenue Service, Topic No. 503, Deductible Taxes.', 'https://www.irs.gov/taxtopics/tc503'],
  salt      => ['Kiplinger, "SALT Deduction Gets an Update for 2026 Taxes" (state and local tax deduction cap of $40,400 for 2026 under Public Law 119-21).', 'https://kiplinger.com/taxes/salt-deduction-gets-an-update-for-2026-taxes'],
  stateaid  => ['Arkansas State Aid Street Committee, State Aid City Street Program Overview.', 'https://citystreet.arkansas.gov/wp-content/uploads/State-Aid-City-Street-Program-Overview.pdf'],
  adpht     => ['Arkansas Department of Parks, Heritage and Tourism, Office of Outdoor Recreation, Arkansas Outdoor Grants (Matching Grants and FUN Park Grants).', 'https://adpht.arkansas.gov/office-of-outdoor-recreation/arkansas-outdoor-grants/'],
  cdbg      => ['Arkansas Economic Development Commission, Community Development Block Grant program.', 'https://arkansasedc.com/footer/divisions/community-development-block-grant'],
  # Tax comparison
  dfarates  => ['Arkansas Department of Finance and Administration, state and local sales/use tax rates.', 'https://www.dfa.arkansas.gov/office/taxes/excise-tax-administration/sales-use-tax/sales-use-tax-rates/state-sales-use-tax-rates/'],
  avalara   => ['Avalara, Arkansas city and county sales tax rate lookup.', 'https://www.avalara.com/taxrates/en/state-rates/arkansas.html'],
  sth       => ['SalesTaxHandbook, Arkansas rates by city and county.', 'https://www.salestaxhandbook.com/arkansas/rates'],
  ownwellar => ['Ownwell, property tax data for Carroll, Washington, Izard, Van Buren, Marion, Pulaski and Sebastian counties, Arkansas.', 'https://www.ownwell.com/trends/arkansas/carroll-county'],
  ownwelllr => ['Ownwell, Little Rock, Arkansas city-specific property tax data.', 'https://www.ownwell.com/trends/arkansas/pulaski-county/little-rock'],
  ownwellmo => ['Ownwell, property tax data for St. Louis and Stone County, Missouri.', 'https://www.ownwell.com/trends/missouri/st.-louis-county'],
  modor     => ['Missouri Department of Revenue, sales/use tax rate tables.', 'https://dor.mo.gov/taxation/business/tax-types/sales-use/rate-tables/'],
  taxfound  => ['Tax Foundation, Texas, Illinois and Missouri tax data.', 'https://taxfoundation.org/location/texas/'],
  tad       => ['Tarrant Appraisal District, property tax rate history.', 'https://www.tad.org/resources/rates'],
  smartasset=> ['SmartAsset, Jackson County, Missouri property tax calculator.', 'https://smartasset.com/taxes/jackson-county-missouri-property-tax-calculator'],
  ilpolicy  => ['Illinois Policy, Chicago\'s August 2026 regional transit sales tax increase.', 'https://www.illinoispolicy.org/press-releases/regional-transportation-authority-sales-tax-hike-pushes-chicagos-burden-to-10-5-second-highest-in-the-nation/'],
  civicfed  => ['Civic Federation, Chicago effective property tax rate.', 'https://www.civicfed.org/node/4141'],
  kcur      => ['KCUR, "Kansas City voters renew earnings tax," April 2026.', 'https://www.kcur.org/politics-elections-and-government/2026-04-07/kansas-city-voters-renew-earnings-tax-city-revenue-elections'],
  stlpr     => ['St. Louis Public Radio, "St. Louis voters pass earnings tax," April 2026.', 'https://www.stlpr.org/government-politics-issues/2026-04-07/st-louis-voters-pass-earnings-tax'],
  stlearn   => ['City of St. Louis, earnings tax information.', 'https://www.stlouis-mo.gov/government/departments/collector/earnings-tax/general-fund-revenues.cfm'],
  tfarinc   => ['Tax Foundation, Arkansas individual income tax rate cut to 3.7% for 2026.', 'https://taxfoundation.org/blog/arkansas-income-tax-cut-rates/'],
  ffbcity   => ['City of Fairfield Bay, government history and services.', 'https://fairfieldbayar.com/government/about'],
  ffbchamber=> ['Fairfield Bay Chamber of Commerce, city services, utilities and community organizations directory.', 'https://www.ffbchamber.com/'],
  visitffb  => ['Visit Fairfield Bay, amenities and community overview.', 'https://visitfairfieldbay.com/about/'],
  engage    => ['Engage Arkansas, Volunteer Community of the Year recipients.', 'https://engagearkansas.org/vcoy/'],
  censusffb => ['Census Reporter, Fairfield Bay, Arkansas population and demographics (American Community Survey 2024 five-year estimates).', 'https://censusreporter.org/profiles/16000US0522660-fairfield-bay-ar/'],
  dfatable  => ['Arkansas Department of Finance and Administration, List of Cities and Counties with Local Sales and Use Tax, October–December 2026.', 'https://www.dfa.arkansas.gov/wp-content/uploads/cityCountyTaxTable_Oct_Dec_2026.pdf'],
  ownwelltx => ['Ownwell, city-level property tax data for Dallas and Fort Worth, Texas.', 'https://www.ownwell.com/trends/texas/dallas-county/dallas'],
  westfork  => ['City of West Fork, Arkansas, public documents (budgets).', 'https://www.westforkar.gov/page/public-documents'],
  greenforest => ['City of Green Forest, Arkansas, City Council.', 'https://www.greenforestar.net/page/city-council'],
  carlisle  => ['City of Carlisle, Arkansas, city website and council records.', 'https://www.carlislear.gov/'],
  millage   => ['Carroll County Tax Collector, millage rates for Holiday Island (school district 21H) as printed on county tax statements: 51.8 mills for 2025 taxes due in 2026, 48.1 mills for 2024 taxes due in 2025.', ''],
  aob       => ['Holiday Island Suburban Improvement District, 2026 Assessment of Benefits notice (annual assessment by property classification; 0% increase for 2026).', ''],
  # Growth plan
  ama       => ['American Medical Association, Economic Impact Study.', 'https://www.ama-assn.org/about/ama-research/economic-impact-study'],
  mainstreet=> ['Main Street Arkansas, Economic Impact Report 2023–2024 (2023: $21.4 million invested and 335 net new jobs; 2024: $103.3 million and 647).', 'https://www.arkansasheritage.com/docs/default-source/default-document-library/msa-economic-impact-report-2023-2024.pdf'],
  tulsa     => ['Tulsa Remote.', 'https://www.tulsaremote.com/'],
  nwalwh    => ['Northwest Arkansas Council, "Life Works Here" incentive.', 'https://findingnwa.com/incentive/'],
  esh       => ['Eureka Springs Hospital.', 'https://www.eurekaspringshospital.com/'],
);

for my $f (@ARGV) {
  open(my $in, '<:raw', $f) or die "$f: $!"; local $/; my $s = <$in>; close $in;
  my $nl = $s =~ /\r\n/ ? "\r\n" : "\n";
  my (%num, @order);
  $s =~ s{<sup class="cite" data-src="([^"]+)">.*?</sup>}{
    my @keys = split ' ', $1;
    my @links;
    for my $k (@keys) {
      die "$f: unknown source key '$k'\n" unless $SRC{$k};
      unless ($num{$k}) { push @order, $k; $num{$k} = scalar @order; }
      push @links, qq{<a href="#ref-$num{$k}" aria-label="Source $num{$k}">$num{$k}</a>};
    }
    qq{<sup class="cite" data-src="$1">} . join(',', @links) . '</sup>';
  }gse;

  $s =~ s{[ \t]*<!-- refs:start -->.*?<!-- refs:end -->\r?\n}{}s;
  if (@order) {
    my @li;
    for my $k (@order) {
      my ($text, $url) = @{ $SRC{$k} };
      my $link = $url ? qq{ <a href="$url" target="_blank" rel="noopener">Link</a>} : '';
      push @li, qq{        <li id="ref-$num{$k}">$text$link</li>};
    }
    my $block = join($nl,
      '  <!-- refs:start -->',
      '  <section class="references" id="references" aria-labelledby="references-heading">',
      '    <div class="container">',
      '      <h2 id="references-heading">Sources cited on this page</h2>',
      '      <ol>',
      @li,
      '      </ol>',
      '    </div>',
      '  </section>',
      '  <!-- refs:end -->', '');
    $s =~ s{(</main>)}{$block$1} or die "$f: no </main>\n";
  }
  open(my $out, '>:raw', $f) or die; print $out $s; close $out;
  printf "%-24s %d sources\n", $f, scalar @order;
}
