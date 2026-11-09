/* ==========================================================================
   Agnes Jamison — Teaching Abroad Guide · DATA FILE
   --------------------------------------------------------------------------
   This is the ONE file to edit when research, budgets, salaries or links
   change. Every number shown on the site comes from here.
   - Update RESEARCH_DATE when you re-check facts.
   - Update FX when exchange rates move (units of local currency per 1 USD).
   - Each claim can carry src: ["s12"] which links to an entry in SOURCES.
   ========================================================================== */

const RESEARCH_DATE = "November 8, 2026";
const FX_DATE = "November 6, 2026 (Banque de France daily reference rates; THB and MXN cross-calculated through EUR)";
const FX = { USD: 1, EUR: 0.8957, THB: 33.55, AED: 3.6725, MXN: 18.70, PAB: 1 };

/* ---------- Profile assumptions (written in Agnes's voice; replace with her real details) */
const ASSUMPTIONS = [
  { k: "Timing", v: "I move after retiring from U.S. teaching. My retirement date is still to be set." },
  { k: "Income", v: "A state teacher pension, possibly Social Security, plus savings. The examples use $4,000 a month in total, which is a placeholder, not my real figure." },
  { k: "Citizenship", v: "U.S. only; no EU passport or ancestry claim." },
  { k: "Age", v: "Not provided. Several retirement visas set minimum ages (Thailand 50, UAE 55), so this matters." },
  { k: "Teaching", v: "Optional. I may want part-time teaching, tutoring or volunteering, which many retirement visas do not allow." },
  { k: "Household", v: "Moving alone, no pets or dependents." },
  { k: "Housing", v: "Rents first; buying is covered for later." },
  { k: "Not yet answered", v: "Health, medication, race and culture questions. Nothing is assumed or published." }
];

/* ---------- Ranking criteria (scores 1–5, explained on the site) */
const CRITERIA = [
  { id: "legal",    label: "Qualifies for residence", w: { retire: 1.5, job: 1.5 } },
  { id: "jobs",     label: "Can keep teaching", w: { retire: 0.5, job: 1.5 } },
  { id: "income",   label: "Cost of living", w: { retire: 1, job: 1 } },
  { id: "savings",  label: "How far income stretches", w: { retire: 1, job: 1 } },
  { id: "safety",   label: "Healthcare and safety", w: { retire: 1.5, job: 1 } },
  { id: "life",     label: "Everyday lifestyle", w: { retire: 1, job: 1 } },
  { id: "housing",  label: "Housing", w: { retire: 0.75, job: 0.75 } },
  { id: "longterm", label: "Long-term security", w: { retire: 1, job: 1 } }
];
const BASE_INCOME = 4000; /* placeholder monthly retirement income (USD) used in scenarios */

/* ---------- Countries */
const COUNTRIES = [
{
  id: "uae", name: "United Arab Emirates", short: "UAE", code: "AE", currency: "AED",
  tagline: "Highest pay and savings for licensed teachers, but a Level 3 U.S. advisory since March 2026 and no ordinary path to permanent status.",
  advisory: { level: 3, text: "Level 3, Reconsider Travel (terrorism and armed conflict). Reissued October 23, 2026.", src: ["s26"] },
  scores: {
    retire: { legal: 2, jobs: 1, income: 2, savings: 2, safety: 2, life: 3, housing: 3, longterm: 2 },
    job:   { legal: 5, jobs: 5, income: 5, savings: 5, safety: 2, life: 3, housing: 5, longterm: 1 },
    indep: { legal: 1, jobs: 2, income: 2, savings: 2, safety: 2, life: 3, housing: 2, longterm: 1 }
  },
  retireVisa: { name: "UAE retirement visa (55+)", minUSD: 4085, test: "AED 15,000/month income, or AED 1 million savings, or AED 1 million property", src: ["s71"] },
  retireTax: 0,
  teaching: {
    summary: "The UAE recruits licensed U.S. K–12 teachers in large numbers. Schools sponsor the residence visa and usually provide housing (or an allowance), annual flights, medical insurance and an end-of-service payment. Salaries are tax-free locally.",
    credentials: "A bachelor's degree and a recognised teaching qualification are required by KHDA (Dubai) and ADEK (Abu Dhabi); a home-state license plus about 2 years' experience is the usual bar. All teachers need a UAE teaching license through the federal Teacher Licensing System. Degrees and certificates must be attested: verified at home, then by the UAE embassy, then by the UAE Ministry of Foreign Affairs. Licensing typically takes 6 to 12 weeks after documents are complete.",
    src: ["s21", "s22", "s23"],
    tefl: "TEFL alone does not replace a teaching license here. Teachers of English as a subject may additionally need CELTA, TESOL or similar.",
    hiring: "Main hiring runs January to March for an August start, with interviews online.",
    jobFirst: "Yes. You cannot legally work without employer sponsorship; never move first.",
    restrictions: "Some advertised posts specify a gender (for example, single-sex government or charter schools). No official teacher age cap was verified.",
    routes: [
      { role: "international", label: "Private international schools (American, British, IB)", req: "License + 2 yrs + attestation", pay: "AED 12,300–20,400/mo base", src: ["s23"], verdict: "Best fit" },
      { role: "local", label: "Charter and government (ADEK/ESE) schools", req: "License + experience; often gender-specific posts", pay: "Similar bands; listings around AED 14,790–15,300/mo", src: ["s24", "s62"], verdict: "Good fit" },
      { role: "language", label: "Language centres", req: "Degree + CELTA/TESOL", pay: "Lower; not verified", src: [], verdict: "Weaker" },
      { role: "university", label: "Universities and colleges", req: "Usually a master's or higher", pay: "Not researched", src: [], verdict: "Only with a master's" },
      { role: "online", label: "Online teaching / private tutoring", req: "Tutoring needs its own permit or license; your work visa covers your school only", pay: "—", src: [], verdict: "Check rules first" }
    ]
  },
  salary: { gross: 4085, tax: 0, housing: true, insurance: true, label: "Abu Dhabi international school, AED 15,000/mo base, housing and insurance provided", src: ["s23"] },
  budget: { rent: 1700, utilities: 200, comms: 90, groceries: 450, dining: 250, transport: 120, insurance: 150, health: 30, visa: 0, leisure: 250, trips: 180 },
  budgetNote: "Rent and utility figures for Abu Dhabi are estimates, not sourced figures. Many contracts provide furnished housing or AED 50,000–100,000 a year in allowance.",
  upfront: { flight: 1100, temp: 0, furnish: 300, credentials: 300, visaFees: 0, shipping: 400, legal: 0, note: "Schools usually pay the flight, visa and first housing; budget for attestation, which you often pay before arrival." },
  visas: [
    { name: "Retirement residence visa", track: "retire", eligibility: "Age 55 or older, or at least 15 years of work in or outside the UAE", money: "AED 15,000/mo income (about $4,085), or AED 1 million fixed deposit, or AED 1 million property, or half deposit and half property", fees: "Varies by emirate", where: "In the UAE through the emirate's residency authority", time: "Weeks", duration: "5 years, renewable", presence: "Keep residence active; long absences can cancel it", work: "Not a work visa", dependents: "Spouse and children may be sponsored", jobLoss: "—", src: ["s71"] },
    { name: "Employer-sponsored residence visa", track: "job", eligibility: "A job offer from a licensed school; the school applies.", money: "None from you", fees: "Paid by employer (confirm in contract)", where: "Entry permit issued before travel; medical, Emirates ID and visa stamping after arrival", time: "Licensing 6–12 weeks plus visa steps", duration: "Usually 2 years, renewable", presence: "Residence visas generally lapse after long absences abroad; confirm current rule", work: "Only for your sponsoring school", dependents: "Possible if salary meets the sponsor threshold", jobLoss: "Visa is cancelled; a grace period applies. Changing schools needs the new school to sponsor you and the old one to cancel.", src: ["s22"] }
  ],
  residency: { temp: "Employer-sponsored residence, renewable while employed.", pr: "No general permanent residence. Long-term 'Golden' visas exist for some categories, including some educators; eligibility for classroom teachers was not verified.", cit: "Naturalisation for foreigners is extremely limited.", dual: "Not relevant in practice.", limited: true },
  cities: [
    { name: "Abu Dhabi", schools: "Many American and IB schools sit in Khalifa City, Mohammed Bin Zayed City and on Al Reem and Saadiyat islands.", hoods: "Khalifa City, Al Reem Island, Al Raha Beach", commute: "Car or school bus; taxis are cheap. Long drives from the island to the mainland suburbs.", rent: "Usually school-provided or allowance-funded", transit: "Low walkability; buses exist, most people drive or taxi", health: "Large private hospitals; Abu Dhabi International Airport (AUH)", climate: "Very hot June–September; dust and sandstorms", language: "English widely used at work", pros: "Highest savings, calmer pace than Dubai", cons: "Car-dependent, summer heat, advisory level" },
    { name: "Dubai", schools: "Schools cluster in Al Barsha, Al Sufouh, Jumeirah and Dubai Silicon Oasis.", hoods: "Al Barsha, Jumeirah Village Circle, Dubai Silicon Oasis", commute: "Metro along Sheikh Zayed Road; traffic is heavy at school-run times", rent: "Higher than Abu Dhabi; allowance may not cover central areas", transit: "Metro is good on its line; elsewhere car or taxi", health: "Extensive private care; DXB airport", climate: "As Abu Dhabi", language: "English everywhere", pros: "Biggest social scene and job market", cons: "Higher costs eat into savings" },
    { name: "Al Ain", schools: "International schools serving mostly local Emirati students.", hoods: "Near your school; ask about staff compounds", commute: "Short drives", rent: "Lowest of the three", transit: "Car-dependent", health: "Hospitals in city; airport via Abu Dhabi (about 1.5 hrs)", climate: "Very hot, drier", language: "More Arabic in daily life", pros: "Strong savings, quieter", cons: "Smaller expat community" }
  ],
  schools: [
    { name: "ADEK-licensed schools via Teach Away", city: "Abu Dhabi", curriculum: "American / IB / charter", why: "Volume hiring of licensed U.S. teachers", url: "https://www.teachaway.com/teaching-public-schools-abu-dhabi", urlType: "Recruiter listing (verified page)", opening: "Listings seen for August 2026 starts; no current opening verified for 2027" },
    { name: "Aldar Education", city: "Abu Dhabi", curriculum: "Mixed, incl. charter schools", why: "Large operator with charter schools", url: "https://www.aldareducation.com", urlType: "Official site (careers page not verified)", opening: "No verified opening" },
    { name: "Taaleem", city: "Dubai / Abu Dhabi", curriculum: "American, British, IB", why: "Advertised AED 10,000–18,000 for teachers", url: "https://www.taaleem.ae", urlType: "Official site (careers page not verified)", opening: "No verified opening", src: ["s25"] },
    { name: "GEMS Education", city: "Dubai", curriculum: "Many curricula", why: "Largest operator; wide salary range", url: "https://www.gemseducation.com", urlType: "Official site (careers page not verified)", opening: "No verified opening" }
  ],
  property: { ownership: "Foreigners can buy in designated freehold areas. Mortgages for non-residents are limited.", immigration: "Property above certain values can support a long-term visa; thresholds not verified for this guide.", sites: ["Bayut", "Property Finder"] },
  health: "Employer health insurance is standard and mandatory in Dubai and Abu Dhabi. Private hospitals are modern. Check that the policy covers pre-existing conditions and outpatient care.",
  women: "Street crime is low. Strict laws cover public behaviour, dress in some places, alcohol and social-media posts. Ride-hailing is reliable after dark."
},
{
  id: "tha", name: "Thailand", short: "Thailand", code: "TH", currency: "THB",
  tagline: "Strong international-school market, low living costs and good savings at top schools. Permanent status is hard to get.",
  advisory: { level: 2, text: "Level 2, Exercise Increased Caution (unrest risk; avoid the Cambodian border area).", src: ["s52b"] },
  scores: {
    retire: { legal: 4, jobs: 1, income: 5, savings: 5, safety: 4, life: 4, housing: 4, longterm: 1 },
    job:   { legal: 4, jobs: 4, income: 4, savings: 4, safety: 3, life: 4, housing: 4, longterm: 2 },
    indep: { legal: 3, jobs: 3, income: 5, savings: 5, safety: 3, life: 4, housing: 4, longterm: 1 }
  },
  retireVisa: { name: "Non-Immigrant O retirement visa (50+)", minUSD: 1937, test: "THB 65,000/month income, or THB 800,000 in a Thai bank", src: ["s70"] },
  retireTax: 10,
  teaching: {
    summary: "Bangkok has one of Asia's largest international-school markets. Top schools want licensed teachers and pay well with housing allowances; Thai private and bilingual schools hire more widely at lower pay.",
    credentials: "You need a Non-Immigrant B visa, then a work permit tied to your employer, and for most school posts a Teachers' Council of Thailand (Khurusapha) license or a temporary waiver. Do not teach until the work permit is issued. A U.S. criminal background check is needed for the visa. As of 2026, foreign teachers complete a mandatory 7-module online training to keep teaching status.",
    src: ["s17", "s18", "s19"],
    tefl: "A U.S. license is the strongest credential for international schools. TEFL helps for bilingual and language-school posts. Teachers without an education qualification get temporary license waivers (reported as two years at a time, up to three times).",
    hiring: "International schools recruit October to March for an August start; Thai schools also hire for May and November terms.",
    jobFirst: "Yes. Get the offer, then the Non-B visa abroad. Never work on a tourist entry.",
    restrictions: "Some listings specify native-speaker status or gender. Many schools prefer teachers under 60; no legal cap verified.",
    routes: [
      { role: "international", label: "Top-tier international schools", req: "License, experience; some ask for a master's", pay: "THB 80,000–150,000/mo + housing allowance THB 20,000–50,000", src: ["s27"], verdict: "Best fit" },
      { role: "international", label: "Mid-tier international schools", req: "License or degree + TEFL", pay: "From about THB 50,000–80,000/mo", src: ["s28"], verdict: "Good fit" },
      { role: "local", label: "Thai private / bilingual schools", req: "Degree; license or waiver", pay: "THB 40,000–60,000/mo; listings at THB 35,000–40,000", src: ["s27", "s29"], verdict: "Lower savings" },
      { role: "language", label: "Language schools", req: "Degree + TEFL", pay: "Similar to Thai schools or lower", src: [], verdict: "Weaker" },
      { role: "online", label: "Online teaching for foreign platforms", req: "Not covered by a school work permit; DTV permits remote work only for foreign employers", pay: "—", src: ["s20"], verdict: "Only on DTV" }
    ]
  },
  salary: { gross: 3279, tax: 12, housing: false, insurance: true, label: "Bangkok international school, THB 110,000/mo, insurance provided, housing allowance not assumed", src: ["s27"] },
  budget: { rent: 750, utilities: 100, comms: 35, groceries: 250, dining: 180, transport: 60, insurance: 120, health: 30, visa: 25, leisure: 150, trips: 200 },
  budgetNote: "Bangkok 1-bedroom benchmark: about THB 25,000/month. Expat areas such as Ari run $980–1,200.",
  upfront: { flight: 1200, temp: 1200, furnish: 300, credentials: 300, visaFees: 100, shipping: 300, legal: 0, note: "Many schools reimburse flights and pay work-permit costs." },
  visas: [
    { name: "Non-Immigrant O (retirement)", track: "retire", eligibility: "Age 50 or older", money: "THB 800,000 in the bank, or income of THB 65,000/mo (about $1,937)", fees: "Visa fee plus yearly extension fee", where: "Thai embassy or consulate (90-day visa), then extend at immigration in Thailand", time: "Weeks", duration: "90 days, then 1-year extensions renewed annually", presence: "Report address every 90 days; re-entry permit to travel", work: "Not a work visa; do not work without a permit", dependents: "Spouse possible", jobLoss: "—", src: ["s70"] },
    { name: "Non-Immigrant B + work permit + teacher license", track: "job", eligibility: "Job offer from a registered school", money: "None from you", fees: "Work permit and visa fees usually paid by school", where: "Non-B from a Thai embassy/consulate; permit and license in Thailand", time: "School has about 90 days after entry to secure license and permit", duration: "Matches your contract; extended yearly", presence: "Re-entry permit needed before leaving", work: "Only for your employer", dependents: "Dependent visas possible", jobLoss: "Permit ends with the job; you must leave or change status. A new employer starts a new permit.", src: ["s17", "s135"] },
    { name: "Destination Thailand Visa (DTV)", track: "indep", eligibility: "Remote work for foreign employers/clients, or approved activities", money: "THB 500,000 savings (about $14,900)", fees: "THB 10,000", where: "Apply online from outside Thailand", time: "Weeks", duration: "5 years, 180 days per entry, extendable once per entry", presence: "Exit and re-enter per stay", work: "No Thai employment; remote foreign work only", dependents: "Yes", jobLoss: "—", src: ["s20"] }
  ],
  residency: { temp: "Yearly extensions tied to your work permit.", pr: "Permanent residence exists but quotas are small and approval slow.", cit: "Naturalisation is rare for foreigners.", dual: "Not a practical consideration.", limited: true },
  cities: [
    { name: "Bangkok", schools: "Most top schools are along Sukhumvit and in the eastern suburbs; ISB is north in Nichada Thani; Patana is in Bang Na.", hoods: "Ari, Phrom Phong, On Nut (cheaper), Nichada Thani if teaching at ISB", commute: "BTS/MRT rail plus school buses; traffic is severe", rent: "About THB 25,000 benchmark; Ari $980–1,200", transit: "Excellent rail on its lines; heat limits walking", health: "Private hospitals (Bumrungrad, Samitivej); two airports", climate: "Hot all year, rainy season May–October; PM2.5 haze in dry months", language: "English in schools; basic Thai helps daily", pros: "Big job market, low costs, large expat community", cons: "Air quality, traffic, heat" },
    { name: "Chiang Mai", schools: "A handful of international schools on the city outskirts", hoods: "Nimman, Santitham, Hang Dong", commute: "Scooter or car; ride-hailing", rent: "Lower than Bangkok (not sourced)", transit: "Limited public transport", health: "Good private hospitals; international airport", climate: "Cooler nights; severe smoke season roughly February–April", language: "Less English outside schools", pros: "Slower pace, cheaper", cons: "Fewer jobs, smoke season" },
    { name: "Phuket", schools: "British and IB schools serving resort and expat families", hoods: "Kathu, Chalong, Rawai", commute: "Car or scooter", rent: "Varies with tourist season", transit: "Poor public transport", health: "Private hospitals; international airport", climate: "Tropical, monsoon May–October", language: "English common in tourist areas", pros: "Beach lifestyle", cons: "Tourist pricing, car dependence" }
  ],
  schools: [
    { name: "Canadian International School of Thailand", city: "Bangkok", curriculum: "IB PYP/MYP", why: "Hired homeroom teachers from THB 80,000+", url: "https://tesljobs.com/jobs/hllH1q3cVnZE", urlType: "Job listing (Jan 2026, for 2026–27)", opening: "Past listing; no current opening verified", src: ["s28"] },
    { name: "International School Bangkok (ISB)", city: "Bangkok (Nichada Thani)", curriculum: "American", why: "American curriculum fits a U.S. license", url: "https://www.isb.ac.th", urlType: "Official site (careers page not verified)", opening: "No verified opening" },
    { name: "NIST International School", city: "Bangkok (Sukhumvit)", curriculum: "IB", why: "Non-profit; strong packages reported", url: "https://www.nist.ac.th", urlType: "Official site (careers page not verified)", opening: "No verified opening" },
    { name: "Ruamrudee International School", city: "Bangkok (Minburi)", curriculum: "American / IB", why: "Mixed American and IB programmes", url: "https://www.rism.ac.th", urlType: "Official site (careers page not verified)", opening: "No verified opening" },
    { name: "Bangkok Patana School", city: "Bangkok (Bang Na)", curriculum: "British / IB", why: "Long-established; competitive", url: "https://www.patana.ac.th", urlType: "Official site (careers page not verified)", opening: "No verified opening" }
  ],
  property: { ownership: "Foreigners cannot own land. They can own condo units within the building's foreign-ownership quota (commonly 49% of floor area), paid with funds transferred from abroad. Verify with a Thai lawyer.", immigration: "Buying a condo does not give residence.", sites: ["DDproperty", "Hipflat"] },
  health: "Private hospitals in Bangkok are excellent and far cheaper than the U.S. School insurance is common; check outpatient and dental limits.",
  women: "Generally manageable with normal city precautions. Use registered taxis or Grab at night; be careful with drinks in nightlife areas."
},
{
  id: "mex", name: "Mexico", short: "Mexico", code: "MX", currency: "MXN",
  tagline: "U.S.-accredited schools close to home, a clear path to permanent residence and citizenship, but modest pay unless you land a top-tier package.",
  advisory: { level: 2, text: "Level 2 nationally, with state-by-state levels. Mexico City and Nuevo León (Monterrey) Level 2; Jalisco (Guadalajara) Level 3; Yucatán (Mérida) Level 1 as of the May 29, 2026 update.", src: ["s51", "s51b"] },
  scores: {
    retire: { legal: 3, jobs: 3, income: 4, savings: 4, safety: 3, life: 4, housing: 4, longterm: 5 },
    job:   { legal: 4, jobs: 3, income: 3, savings: 2, safety: 3, life: 4, housing: 3, longterm: 5 },
    indep: { legal: 3, jobs: 3, income: 4, savings: 4, safety: 3, life: 4, housing: 4, longterm: 5 }
  },
  retireVisa: { name: "Temporary residence (or permanent as a retiree)", minUSD: 4400, test: "About $4,400/month for temporary residence; about $7,560/month pension or $303,880 savings for direct permanent residence (San Diego consulate, 2026)", src: ["s12", "s72"] },
  retireTax: 10,
  teaching: {
    summary: "Mexico has some of the oldest U.S.-accredited schools abroad (ASF Mexico City, founded 1888). Top schools hire licensed Americans on 'overseas-hire' packages; many other bilingual schools pay local salaries that are hard to live on comfortably.",
    credentials: "A job offer lets the school request your work-authorised temporary residence. A U.S. license is the key credential for American schools. Degrees and background checks are typically apostilled; Spanish translations may be required.",
    src: ["s33", "s34"],
    tefl: "TEFL helps for bilingual and language-school roles. Not a substitute for a license at accredited American schools.",
    hiring: "Like most overseas schools, ASF Monterrey hires November through March for the next school year.",
    jobFirst: "Yes for a teaching job. Independent-income residence is applied for at a Mexican consulate before moving.",
    restrictions: "No age or nationality restriction verified.",
    routes: [
      { role: "international", label: "U.S.-accredited international schools (overseas hire)", req: "License + experience", pay: "About $25,000–35,000/yr reported for Mexico City", src: ["s36"], verdict: "Best fit" },
      { role: "local", label: "Bilingual private schools (local hire)", req: "Degree; license preferred", pay: "MX$20,000–29,000/mo listed ($1,070–1,550)", src: ["s35"], verdict: "Tight budget" },
      { role: "local", label: "Regional American schools (e.g. Chiapas)", req: "License required", pay: "US$860–1,050/mo + tuition for dependents", src: ["s37b"], verdict: "Low pay" },
      { role: "language", label: "Language institutes", req: "Degree + TEFL", pay: "Low; not verified", src: [], verdict: "Weaker" },
      { role: "online", label: "Online teaching for U.S. employers", req: "Allowed under economic-solvency residence if your status permits work; confirm", pay: "—", src: [], verdict: "Possible" }
    ]
  },
  salary: { gross: 2500, tax: 20, housing: false, insurance: true, label: "Mexico City overseas-hire package, $30,000/yr, insurance provided", src: ["s36"] },
  budget: { rent: 900, utilities: 60, comms: 40, groceries: 280, dining: 180, transport: 40, insurance: 110, health: 30, visa: 25, leisure: 140, trips: 120 },
  budgetNote: "Benito Juárez (Del Valle, Narvarte) runs about $700–950 for a 1-bedroom; Condesa $1,100–1,400 furnished.",
  upfront: { flight: 400, temp: 1300, furnish: 600, credentials: 300, visaFees: 600, shipping: 300, legal: 200, note: "Residency fees roughly doubled in 2026." },
  visas: [
    { name: "Permanent residence as a retiree", track: "retire", eligibility: "Retired, with pension or savings meeting the consulate test", money: "About $7,560/mo pension for 6 months, or about $303,880 average savings for 12 months (San Diego consulate, 2026); varies by consulate", fees: "Consular fee plus INM card fee (doubled in 2026)", where: "Mexican consulate in the U.S., then INM within 30 days", time: "Weeks to months", duration: "Permanent; no renewals", presence: "No minimum stay", work: "Permanent residents can generally work; confirm with INM", dependents: "Family unity routes", jobLoss: "—", src: ["s72"] },
    { name: "Temporary residence with work permission (job offer)", track: "job", eligibility: "Employer registered with INM files the offer", money: "None from you", fees: "Consular fee about $56 plus card fees in Mexico", where: "Mexican consulate in the U.S., then INM within 30 days of entry", time: "Weeks to a few months", duration: "1 year, renewable up to 4 years total", presence: "Keep your card valid; long absences can complicate renewals", work: "For the authorised employer; changing employers needs an INM update", dependents: "Family-unity routes", jobLoss: "Notify INM; status may need to change", src: ["s12"] },
    { name: "Temporary residence by economic solvency", track: "retire", eligibility: "Income or savings", money: "About $4,400/mo net income for 6 months, or about $75,000 average balance for 12 months (2026; varies by consulate)", fees: "Consular fee about $56; INM card fees roughly doubled in 2026", where: "Mexican consulate before moving", time: "Weeks", duration: "1 year, then up to 3 more", presence: "No strict minimum, but must live there for renewals", work: "Requires a separate work authorisation for Mexican employers", dependents: "Yes", jobLoss: "—", src: ["s12", "s13"] }
  ],
  residency: { temp: "Up to 4 years of temporary residence.", pr: "After 4 years of temporary residence you can apply for permanent residence without re-proving solvency.", cit: "Naturalisation is generally available after about 5 years of residence with Spanish and culture exams; confirm the current count with SRE.", dual: "Mexico allows dual citizenship; the U.S. does not require you to renounce.", limited: false },
  cities: [
    { name: "Mexico City", schools: "ASF is in Colonia Las Américas (west); many schools sit in the west and south of the city.", hoods: "Del Valle, Narvarte, San Pedro de los Pinos, Nápoles", commute: "Metro and Metrobús; traffic is heavy, so live near your school", rent: "$700–950 in Benito Juárez; MX$22,000 city benchmark", transit: "Very good in central areas", health: "Large private hospitals; MEX airport with many U.S. flights", climate: "Mild all year; rainy June–September; altitude 2,240 m; ozone episodes in spring", language: "Spanish needed for daily life", pros: "Culture, food, 4–5 hour flights home", cons: "Air quality, earthquakes, traffic" },
    { name: "Monterrey", schools: "ASFM is in Santa Catarina, near San Pedro Garza García", hoods: "San Pedro Garza García, Valle Oriente", commute: "Car-oriented", rent: "Mid-range; San Pedro is expensive", transit: "Limited", health: "Strong private hospitals; MTY airport", climate: "Very hot summers", language: "Spanish; business English common", pros: "Wealthy, organised, near Texas", cons: "Car-dependent, heat" },
    { name: "Mérida", schools: "Madison International School campus; smaller market", hoods: "García Ginerés, Centro, Montebello", commute: "Short drives", rent: "Lower than CDMX", transit: "Buses; car helpful", health: "Private hospitals; MID airport", climate: "Hot and humid; hurricane season June–November", language: "Spanish", pros: "Yucatán is Level 1; calm, affordable", cons: "Fewer jobs, heat" }
  ],
  schools: [
    { name: "The American School Foundation (ASF)", city: "Mexico City", curriculum: "American", why: "Oldest accredited American school abroad; recruits U.S. teachers", url: "https://www.teachaway.com/schools/american-school-foundation-ac", urlType: "Recruiter school profile", opening: "No verified opening", src: ["s33"] },
    { name: "American School Foundation of Monterrey", city: "Monterrey", curriculum: "American", why: "U.S.-accredited; hires November–March", url: "https://teachaway.com/schools/american-school-foundation-monterrey", urlType: "Recruiter school profile", opening: "No verified opening", src: ["s34"] },
    { name: "Greengates School", city: "Mexico City area", curriculum: "British / IB", why: "Posts on TES", url: "https://www.tes.com/jobs/browse/teaching-and-lecturing-mexico", urlType: "TES Mexico listings", opening: "Listings seen mid-2026; none verified now" },
    { name: "American School of Guadalajara", city: "Guadalajara", curriculum: "American", why: "Second-city option", url: "https://www.searchassociates.com", urlType: "Search via Search Associates", opening: "No verified opening" }
  ],
  property: { ownership: "Foreigners can own property directly inland. Within 100 km of borders or 50 km of coasts, they buy through a bank trust (fideicomiso). Use a notario and independent lawyer.", immigration: "Owning a home above a high value threshold can support temporary residence; it is a minor route.", sites: ["Inmuebles24", "Lamudi"] },
  health: "Private care is good and affordable in big cities. IMSS public enrolment is possible for residents. Check medication import rules with COFEPRIS.",
  women: "Street harassment is common in some areas. Use app-based rides at night, research neighbourhoods block by block and follow state-level advisories."
},
{
  id: "esp", name: "Spain", short: "Spain", code: "ES", currency: "EUR",
  tagline: "Best everyday lifestyle and long-term path, but non-EU teacher hiring is slow and pay is low. Strongest on retirement income.",
  advisory: { level: 2, text: "Level 2, Exercise Increased Caution (terrorism), as listed March 2026.", src: ["s52"] },
  scores: {
    retire: { legal: 3, jobs: 1, income: 3, savings: 3, safety: 5, life: 5, housing: 3, longterm: 4 },
    job:   { legal: 2, jobs: 3, income: 2, savings: 1, safety: 4, life: 5, housing: 3, longterm: 4 },
    indep: { legal: 3, jobs: 3, income: 3, savings: 2, safety: 4, life: 5, housing: 3, longterm: 4 }
  },
  retireVisa: { name: "Non-Lucrative Visa", minUSD: 2680, test: "€2,400/month (€28,800/year) in passive income such as a pension", src: ["s1"] },
  retireTax: 15,
  teaching: {
    summary: "Spain has many British and international schools, and a government language-assistant programme open to Americans. Hiring a non-EU teacher requires the school to sponsor a work permit, which many skip in favour of EU candidates.",
    credentials: "International schools want a teaching qualification (a U.S. license qualifies for many). A work permit generally requires the employer to show it could not fill the role locally (labour-market test); top schools are more used to this. Teaching in Spanish public schools as a full teacher requires Spanish credential homologation and is not realistic short term.",
    src: ["s30", "s56"],
    tefl: "TEFL matters for academies. The Auxiliares de Conversación programme needs only a degree and native-level English.",
    hiring: "International schools January–May for September. Auxiliares: applications ran June 2–30, 2026 for the 2026–27 year; check for the 2027–28 window.",
    jobFirst: "Yes. Work authorisation must be in place before you start.",
    restrictions: "Auxiliares programme pages list an age range of 18 to under 45; confirm for the U.S. cohort.",
    routes: [
      { role: "international", label: "International schools (British, American, IB)", req: "Teaching qualification; sponsorship needed", pay: "€1,600–3,000/mo; listings €21,600–30,000/yr", src: ["s30", "s31"], verdict: "Possible, competitive" },
      { role: "assistant", label: "Auxiliares de Conversación (public schools)", req: "Degree, native English, under 45", pay: "€800/mo for 14 hrs/week (up to €1,000 in Madrid)", src: ["s3", "s4"], verdict: "Easy entry, low pay" },
      { role: "language", label: "Private language academies", req: "Degree + TEFL; work permit", pay: "€1,000–1,800/mo", src: ["s42b"], verdict: "Hard to get sponsorship" },
      { role: "university", label: "Universities", req: "Doctorate usually", pay: "—", src: [], verdict: "Not realistic" },
      { role: "online", label: "Online teaching for U.S. employers", req: "Digital Nomad Visa (foreign employer)", pay: "—", src: ["s2"], verdict: "Via DNV" }
    ]
  },
  salary: { gross: 2456, tax: 22, housing: false, insurance: false, label: "Valencia international school, €2,200/mo gross", src: ["s30"] },
  budget: { rent: 1100, utilities: 130, comms: 50, groceries: 330, dining: 180, transport: 45, insurance: 90, health: 30, visa: 15, leisure: 150, trips: 150 },
  budgetNote: "Valencia 1-bedroom: city average about €1,217 (Numbeo benchmark); outer districts lower.",
  upfront: { flight: 900, temp: 1800, furnish: 500, credentials: 300, visaFees: 200, shipping: 400, legal: 300, note: "Deposits are often 1–2 months plus agency fees." },
  visas: [
    { name: "Employer work permit (cuenta ajena)", track: "job", eligibility: "Job offer; employer passes labour-market test unless exempt", money: "None", fees: "Consular and permit fees (confirm)", where: "Employer files in Spain; you collect the visa at a U.S. consulate", time: "Often 2–4+ months", duration: "1 year initially, renewable", presence: "Live in Spain", work: "For the sponsoring employer initially", dependents: "Family reunification after a qualifying period", jobLoss: "Permit can be at risk; get legal advice", src: ["s56"] },
    { name: "Auxiliar de Conversación (student-status stay)", track: "job", eligibility: "Accepted into the ministry programme", money: "Programme stipend", fees: "Consular visa fee", where: "U.S. consulate", time: "Summer before start", duration: "Nov 1–May 31", presence: "During programme", work: "Programme hours only; limited extra work", dependents: "Limited", jobLoss: "—", src: ["s3"] },
    { name: "Non-Lucrative Visa", track: "retire", eligibility: "Passive income or savings", money: "€2,400/mo (€28,800/yr) for one person in 2026", fees: "Consular fee (varies)", where: "Spanish consulate for your U.S. state", time: "1–3 months", duration: "1 year, then renewals", presence: "Must live in Spain", work: "No work at all, including remote", dependents: "+€600/mo each", jobLoss: "—", src: ["s1"] },
    { name: "Digital Nomad Visa", track: "indep", eligibility: "Remote work for non-Spanish employers/clients", money: "About €34,188/yr (200% of 2026 minimum wage)", fees: "Varies", where: "Consulate or in Spain", time: "Weeks to months", duration: "Up to 3 years, renewable", presence: "Live in Spain", work: "Remote foreign work; limited Spanish clients", dependents: "Yes", jobLoss: "Must keep qualifying income", src: ["s2"] }
  ],
  residency: { temp: "Temporary residence while your permit is valid.", pr: "Long-term residence after 5 years of legal residence. Time on student status counts only partly; confirm.", cit: "10 years of legal residence for U.S. citizens, plus language and civics tests.", dual: "Spain normally asks non-Ibero-American applicants to renounce prior nationality; how the U.S. treats this needs professional advice.", limited: false },
  cities: [
    { name: "Valencia", schools: "International schools are mainly in the outskirts: Paterna/La Cañada (El Plantío), Godella, Puçol.", hoods: "Benimaclet, Campanar, Ruzafa (pricier); or live in Paterna/Godella near schools", commute: "Metrovalencia lines reach most school suburbs", rent: "€900–1,600 for studios/1-bedrooms; city average about €1,250", transit: "Excellent; flat and bikeable", health: "Strong public and private care; VLC airport", climate: "Mild winters, hot humid summers", language: "Spanish and Valencian", pros: "Best balance of cost and lifestyle", cons: "Rents rising fast" },
    { name: "Madrid", schools: "Many British/American schools in northern and western suburbs (Alcobendas, La Moraleja, Pozuelo, Las Rozas).", hoods: "Chamberí, Moncloa, or Pozuelo/Las Rozas near schools", commute: "Cercanías trains and school buses to suburbs", rent: "About €1,280 benchmark", transit: "Excellent", health: "Excellent; MAD airport with direct U.S. flights", climate: "Hot dry summers, cold winters", language: "Spanish", pros: "Most jobs, direct flights home", cons: "Highest rents" },
    { name: "Málaga", schools: "International schools along the Costa del Sol (Benalmádena, Marbella)", hoods: "Teatinos, El Palo, Fuengirola", commute: "Coastal train and car", rent: "About €1,050 benchmark", transit: "Good city buses, coastal train", health: "Good; AGP airport", climate: "Warmest winters in mainland Spain", language: "Spanish; English common on the coast", pros: "Sun, sea, expat network", cons: "Tourist-driven prices" }
  ],
  schools: [
    { name: "International school vacancies on TES (Spain)", city: "Madrid, Valencia, Barcelona", curriculum: "British / IB", why: "Live listings including El Plantío (Valencia) and Green Stone (Madrid)", url: "https://www.tes.com/jobs/browse/primary-early-years-practitioner-spain", urlType: "Job board (verified page)", opening: "Listings seen for 2026; none verified as open now", src: ["s31"] },
    { name: "Auxiliares de Conversación", city: "Nationwide", curriculum: "Spanish public schools", why: "Lowest barrier legal entry for Americans", url: "https://www.educacionfpydeportes.gob.es/en/servicios-al-ciudadano/catalogo/general/99/998188/ficha/998188-2026-2027.html", urlType: "Official ministry page", opening: "2026–27 window closed; 2027–28 window not yet announced", src: ["s3"] },
    { name: "International School of Barcelona", city: "Barcelona", curriculum: "IB", why: "Established IB school", url: "https://www.isb.cat", urlType: "Official site (not verified)", opening: "No verified opening" }
  ],
  property: { ownership: "No restrictions for U.S. buyers. Expect 10–15% in taxes and fees on resales. Check the Registro de la Propiedad and community debts.", immigration: "Spain closed its golden visa in 2025. Buying gives no residence.", sites: ["Idealista", "Fotocasa"] },
  health: "Public care through social security once employed; private insurance with no co-payments is required for the Non-Lucrative Visa.",
  women: "Generally safe; pickpocketing in tourist zones. Good public transport late at night in big cities."
},
{
  id: "prt", name: "Portugal", short: "Portugal", code: "PT", currency: "EUR",
  tagline: "Lowest-income residence route in Western Europe (D7 at €920/month), but teacher pay is low and citizenship now takes 10 years.",
  advisory: { level: null, text: "Current U.S. advisory level not verified for this guide; check travel.state.gov.", src: [] },
  scores: {
    retire: { legal: 5, jobs: 3, income: 4, savings: 3, safety: 5, life: 5, housing: 3, longterm: 4 },
    job:   { legal: 2, jobs: 2, income: 2, savings: 1, safety: 4, life: 4, housing: 2, longterm: 3 },
    indep: { legal: 5, jobs: 3, income: 4, savings: 3, safety: 4, life: 4, housing: 3, longterm: 3 }
  },
  retireVisa: { name: "D7 passive income visa", minUSD: 1027, test: "€920/month (100% of the 2026 minimum wage); savings of about €11,040 commonly expected", src: ["s6"] },
  retireTax: 15,
  teaching: {
    summary: "A small international-school market around Lisbon, Cascais and Porto. Non-EU hires happen but are limited.",
    credentials: "International schools typically want a PGCE or equivalent; a U.S. license is usually accepted. Employer sponsorship needed for a work visa.",
    src: ["s32"],
    tefl: "TEFL suits language schools, where pay is about $900–1,400/mo.",
    hiring: "January–April for September.",
    jobFirst: "For a teaching job, yes. With passive income, the D7 lets you move first and job-hunt later (confirm work rights on your residence permit).",
    restrictions: "None verified.",
    routes: [
      { role: "international", label: "International schools", req: "Teaching qualification", pay: "€25,000–40,000/yr (about €1,200–2,000/mo also reported)", src: ["s32"], verdict: "Possible, few posts" },
      { role: "language", label: "Language schools", req: "Degree + TEFL", pay: "$900–1,400/mo", src: ["s42"], verdict: "Low pay" },
      { role: "online", label: "Remote teaching for U.S. employers", req: "D8 Digital Nomad visa (€3,680/mo)", pay: "—", src: ["s7"], verdict: "If income is high enough" }
    ]
  },
  salary: { gross: 2010, tax: 23, housing: false, insurance: false, label: "Lisbon-area international school, €1,800/mo gross", src: ["s32"] },
  budget: { rent: 1150, utilities: 120, comms: 45, groceries: 300, dining: 160, transport: 45, insurance: 80, health: 30, visa: 20, leisure: 140, trips: 150 },
  budgetNote: "Porto 1-bedroom about €1,050; Lisbon city centre €1,331 (May 2026).",
  upfront: { flight: 900, temp: 1700, furnish: 500, credentials: 300, visaFees: 250, shipping: 400, legal: 400, note: "AIMA appointment waits reported from about 15 days rurally to about 120 days in Lisbon/Porto." },
  visas: [
    { name: "Work visa (employer)", track: "job", eligibility: "Job contract", money: "None", fees: "Consular fees", where: "VFS/consulate in U.S.", time: "Months", duration: "Converted to residence permit by AIMA", presence: "Live in Portugal", work: "Yes", dependents: "Family reunification (generally after 2 years' residence; exceptions)", jobLoss: "Seek advice", src: ["s5"] },
    { name: "D7 passive income visa", track: "retire", eligibility: "Regular passive income (pension, rental, investment)", money: "€920/mo (2026 minimum wage); savings of about €11,040 commonly expected", fees: "About €260 total", where: "Consulate/VFS in U.S.", time: "3–6 months", duration: "Residence permit 2 years, then 3", presence: "Limits on absences apply", work: "D7 residence permits generally allow work; confirm before taking paid teaching", dependents: "+50% spouse, +30% child", jobLoss: "—", src: ["s6"] },
    { name: "D8 digital nomad visa", track: "indep", eligibility: "Remote income from outside Portugal", money: "€3,680/mo average over 3 months + about €11,040 savings", fees: "Consular fees", where: "Consulate/VFS", time: "Weeks to months", duration: "Temporary stay up to 1 year, or residence route", presence: "Residence route requires living there", work: "Remote foreign work", dependents: "Yes", jobLoss: "Income must stay above threshold", src: ["s7"] }
  ],
  residency: { temp: "2-year then 3-year residence permits.", pr: "Permanent residence after 5 years.", cit: "Since May 19, 2026, naturalisation requires 10 years of legal residence for U.S. citizens, counted from your first residence permit, plus A2 Portuguese and civics tests.", dual: "Portugal allows dual citizenship.", limited: false },
  cities: [
    { name: "Lisbon and Cascais line", schools: "Several international schools along the Cascais line (Carcavelos, Oeiras) and in Sintra.", hoods: "Oeiras, Carcavelos, Campo de Ourique", commute: "Cascais train line; car to Sintra-area schools", rent: "City centre about €1,331", transit: "Good metro and trains", health: "Strong private hospitals; LIS airport with U.S. flights", climate: "Mild; damp winters with poor heating in older flats", language: "Portuguese; English common", pros: "Atlantic lifestyle, flights home", cons: "Rents near local salaries" },
    { name: "Porto", schools: "International schools in Foz and Boavista areas", hoods: "Matosinhos, Boavista, Cedofeita", commute: "Metro and buses", rent: "About €1,050", transit: "Good metro", health: "Good; OPO airport", climate: "Cooler and rainier than Lisbon", language: "Portuguese", pros: "Cheaper than Lisbon", cons: "Fewer jobs, wet winters" },
    { name: "Braga or Coimbra", schools: "Very few international posts", hoods: "City centres", commute: "Walkable", rent: "Lower (not sourced)", transit: "Buses; trains to Porto/Lisbon", health: "University hospitals", climate: "Cool winters", language: "Portuguese essential", pros: "Low cost", cons: "Few English-medium jobs" }
  ],
  schools: [
    { name: "St. Julian's School", city: "Carcavelos (Lisbon)", curriculum: "British / IB", why: "Largest Lisbon-area international school", url: "https://www.stjulians.com", urlType: "Official site (not verified)", opening: "No verified opening" },
    { name: "Carlucci American International School of Lisbon (CAISL)", city: "Sintra (Lisbon area)", curriculum: "American / IB", why: "American curriculum", url: "https://www.caisl.edu.pt", urlType: "Official site (not verified)", opening: "No verified opening" },
    { name: "Oporto British School", city: "Porto", curriculum: "British / IB", why: "Main Porto option", url: "https://www.obs.edu.pt", urlType: "Official site (not verified)", opening: "No verified opening" }
  ],
  property: { ownership: "No restrictions. Expect IMT transfer tax, stamp duty and notary fees. Check the land registry and municipal licence (licença de utilização).", immigration: "The golden visa no longer accepts real estate. Buying gives no residence.", sites: ["Idealista", "Imovirtual"] },
  health: "SNS public care once resident; private insurance often needed at first for the visa.",
  women: "Generally safe and calm; low-level theft in tourist areas."
},
{
  id: "pan", name: "Panama", short: "Panama", code: "PA", currency: "USD",
  tagline: "Uses the U.S. dollar and has a few strong American schools, but work permits are restrictive and teacher pay is modest outside top schools.",
  advisory: { level: 2, text: "Level 2, Exercise Increased Caution (listed March 2026).", src: ["s52c"] },
  scores: {
    retire: { legal: 5, jobs: 1, income: 4, savings: 4, safety: 3, life: 3, housing: 4, longterm: 4 },
    job:   { legal: 2, jobs: 2, income: 3, savings: 2, safety: 3, life: 3, housing: 3, longterm: 3 },
    indep: { legal: 3, jobs: 2, income: 3, savings: 3, safety: 3, life: 3, housing: 3, longterm: 3 }
  },
  retireVisa: { name: "Pensionado visa", minUSD: 1000, test: "Lifetime pension of $1,000/month", src: ["s16"] },
  retireTax: 8,
  teaching: {
    summary: "A handful of English-medium international schools in and around Panama City and the Pacific beach communities. Many professions are reserved for Panamanians, so the school must secure a work permit.",
    credentials: "Your employer must obtain a Ministry of Labor (MITRADEL) work permit before a job-based Friendly Nations application can go ahead. Foreign degrees may need recognition by the University of Panama for some professional visas.",
    src: ["s14", "s15"],
    tefl: "TEFL is typical for private English teaching ($1,000–1,300/mo).",
    hiring: "Recruitment January–February, with some hiring in May–June.",
    jobFirst: "Yes.",
    restrictions: "Restricted-profession rules apply; check that teaching at your school type is permitted.",
    routes: [
      { role: "international", label: "International schools (ISP, Balboa Academy, others)", req: "License + experience", pay: "Advertised up to GBP 38,000/yr (2025 recruiter ad)", src: ["s38b"], verdict: "Best option" },
      { role: "local", label: "Private bilingual schools", req: "Degree; license preferred", pay: "$1,000–1,300/mo", src: ["s37"], verdict: "Low pay" },
      { role: "online", label: "Online teaching for U.S. employers", req: "Depends on visa; Pensionado has no work permit", pay: "—", src: ["s16"], verdict: "Check visa" }
    ]
  },
  salary: { gross: 2500, tax: 18, housing: false, insurance: true, label: "Panama City international school, $2,500/mo (estimate; not verified)", src: [] },
  budget: { rent: 1200, utilities: 150, comms: 60, groceries: 380, dining: 170, transport: 60, insurance: 120, health: 30, visa: 20, leisure: 130, trips: 100 },
  budgetNote: "Panama City 1-bedroom benchmark about $1,200.",
  upfront: { flight: 450, temp: 1400, furnish: 600, credentials: 300, visaFees: 800, shipping: 300, legal: 1500, note: "Panama residency normally requires a Panamanian lawyer." },
  visas: [
    { name: "Friendly Nations residence via job offer", track: "job", eligibility: "U.S. citizen + Panamanian employer with an approved work permit", money: "Not applicable", fees: "Government + lawyer fees", where: "In Panama through a lawyer", time: "Work permit first, then residence (months)", duration: "2-year provisional, then permanent", presence: "Enter at least every 2 years", work: "Yes, with work permit", dependents: "Yes", jobLoss: "Seek advice; work permit tied to employer", src: ["s15"] },
    { name: "Pensionado", track: "retire", eligibility: "Lifetime pension", money: "$1,000/mo pension (lower with property)", fees: "Lawyer + government fees", where: "In Panama", time: "Months", duration: "Permanent", presence: "Minimal", work: "No work permit", dependents: "Yes", jobLoss: "—", src: ["s16"] }
  ],
  residency: { temp: "2-year provisional residence on Friendly Nations.", pr: "Permanent residence after the provisional period.", cit: "Naturalisation after years of permanent residence; Panama has historically required renouncing prior citizenship. Get legal advice.", dual: "Uncertain in practice; professional confirmation needed.", limited: false },
  cities: [
    { name: "Panama City", schools: "ISP is about 30–45 minutes outside the city; other schools in the former Canal Zone (Clayton) area.", hoods: "Clayton, Albrook, El Cangrejo, San Francisco", commute: "Live near your school; traffic is heavy", rent: "About $1,200", transit: "Metro lines 1–2; otherwise taxis", health: "Private hospitals (Punta Pacífica, San Fernando); PTY airport is a U.S. hub", climate: "Hot, humid, rainy May–December", language: "Spanish; English in business", pros: "USD economy, direct U.S. flights", cons: "Heat, traffic, pricier than expected" },
    { name: "Coronado and Pacific beaches", schools: "One U.S.-curriculum K–12 school serving beach communities", hoods: "Coronado, San Carlos", commute: "Car", rent: "Lower than the city", transit: "Car needed", health: "Clinics; hospitals in the city", climate: "Drier than the city", language: "More English among expats", pros: "Beach life", cons: "Few jobs" },
    { name: "Boquete / David", schools: "Very few", hoods: "Boquete town", commute: "Car", rent: "Low", transit: "Limited", health: "Hospitals in David", climate: "Cool highlands", language: "Spanish", pros: "Mild climate", cons: "Not a teaching market" }
  ],
  schools: [
    { name: "International School of Panama (ISP)", city: "Panama City outskirts", curriculum: "IB / American", why: "Largest international school; teacher reviews available", url: "https://www.internationalschoolsreview.com/international-schools/international-school-panama.htm", urlType: "Teacher review page (verified page)", opening: "No verified opening", src: ["s38"] },
    { name: "Balboa Academy", city: "Panama City", curriculum: "American", why: "U.S.-standards curriculum", url: "https://www.searchassociates.com", urlType: "Search via recruiters", opening: "No verified opening" },
    { name: "Crossroads Christian Academy", city: "Panama City", curriculum: "American, Christian", why: "Advertised 2026–27 posts in the U.S. (faith-based employer)", url: "https://www.career.com/job/crossroads-christian-academy-panama/upper-elementary-teacher-relocation-to-panama-international-christian-school-2026-2027/j202603172304188491418", urlType: "Job listing (March 2026)", opening: "Past listing; not verified as open", src: ["s61"] }
  ],
  property: { ownership: "Foreigners can generally own titled property; avoid 'rights of possession' land. Use a lawyer for title checks in the Public Registry.", immigration: "A property investment route to residence exists; the current threshold was not verified.", sites: ["Encuentra24", "Compreoalquile"] },
  health: "Good private hospitals in Panama City; insurance needed.",
  women: "Use registered taxis or apps at night; petty crime in some city areas."
},
{
  id: "ita", name: "Italy", short: "Italy", code: "IT", currency: "EUR",
  tagline: "Rich daily life, but work visas run through an annual quota and teacher pay is low. Realistic mainly with a sponsoring international school.",
  advisory: { level: 2, text: "Level 2, Exercise Increased Caution (terrorism), as listed March 2026.", src: ["s52"] },
  scores: {
    retire: { legal: 2, jobs: 1, income: 2, savings: 2, safety: 4, life: 4, housing: 2, longterm: 3 },
    job:   { legal: 1, jobs: 2, income: 2, savings: 1, safety: 4, life: 4, housing: 2, longterm: 3 },
    indep: { legal: 2, jobs: 1, income: 2, savings: 2, safety: 4, life: 4, housing: 2, longterm: 3 }
  },
  retireVisa: { name: "Elective Residence Visa", minUSD: 2884, test: "More than €31,000/year in passive income such as a pension", src: ["s10"] },
  retireTax: 18,
  teaching: {
    summary: "International schools exist in Milan, Rome and Florence, but non-EU hiring goes through the Decreto Flussi quota system (497,550 permits for 2026–2028; 164,850 for 2026) unless a highly qualified exemption applies.",
    credentials: "Employer must apply, often on set 'click days'. Many international schools prefer EU candidates. A U.S. license is respected by American schools.",
    src: ["s11"],
    tefl: "Language schools pay about $1,000–1,500/mo.",
    hiring: "January–April for September.",
    jobFirst: "Yes.",
    restrictions: "Quota limits; not an age restriction.",
    routes: [
      { role: "international", label: "International schools", req: "License + sponsorship within quota", pay: "Not verified for this guide", src: [], verdict: "Hard" },
      { role: "language", label: "Language schools", req: "Degree + TEFL + permit", pay: "$1,000–1,500/mo", src: ["s42"], verdict: "Hard to get permit" },
      { role: "online", label: "Remote foreign work", req: "Italy's digital nomad visa (about €28,000/yr, highly skilled)", pay: "—", src: [], verdict: "Check eligibility" }
    ]
  },
  salary: { gross: 2121, tax: 25, housing: false, insurance: false, label: "Milan/Rome international school, €1,900/mo gross (estimate; not verified)", src: [] },
  budget: { rent: 1250, utilities: 160, comms: 50, groceries: 330, dining: 180, transport: 45, insurance: 90, health: 30, visa: 25, leisure: 150, trips: 150 },
  budgetNote: "Rent figure is an estimate for a 1-bedroom outside the centre of Rome or Milan.",
  upfront: { flight: 900, temp: 1900, furnish: 500, credentials: 300, visaFees: 250, shipping: 400, legal: 400, note: "Elective Residence requires a lease or deed before you apply." },
  visas: [
    { name: "Work visa (Decreto Flussi)", track: "job", eligibility: "Employer nulla osta within quota", money: "None", fees: "Varies", where: "Employer in Italy; you at consulate", time: "3–8 months", duration: "Matches contract", presence: "Live in Italy", work: "Sponsoring employer", dependents: "Family reunification later", jobLoss: "Unemployment permit possible; seek advice", src: ["s11"] },
    { name: "Elective Residence Visa", track: "retire", eligibility: "Passive income only", money: "More than €31,000/yr passive income", fees: "Consular fee", where: "Italian consulate for your U.S. state", time: "Weeks to months", duration: "1 year, renewable", presence: "Must live in Italy", work: "No work of any kind", dependents: "Higher threshold", jobLoss: "—", src: ["s10"] }
  ],
  residency: { temp: "Permesso di soggiorno renewed with your visa basis.", pr: "EU long-term residence after 5 years.", cit: "10 years of residence plus B1 Italian.", dual: "Italy allows dual citizenship.", limited: false },
  cities: [
    { name: "Milan", schools: "International schools across the city and southern suburbs", hoods: "Porta Romana, Lodi, Navigli", commute: "Metro and trams", rent: "High", transit: "Excellent", health: "Excellent; MXP/LIN airports", climate: "Foggy winters, hot summers", language: "Italian", pros: "Most jobs", cons: "Most expensive" },
    { name: "Rome", schools: "Several American and British schools in the north-west", hoods: "Balduina, Monte Mario, Prati", commute: "Buses; car often needed", rent: "High in centre", transit: "Patchy", health: "Good; FCO airport with U.S. flights", climate: "Hot summers", language: "Italian", pros: "History, flights", cons: "Bureaucracy, transit" },
    { name: "Florence", schools: "One main international school plus smaller ones", hoods: "Campo di Marte, Gavinana", commute: "Bus or bike", rent: "Tourist-inflated", transit: "Compact, walkable", health: "Good; regional airport", climate: "Hot summers", language: "Italian", pros: "Walkable, cultural", cons: "Few jobs" }
  ],
  schools: [
    { name: "American Overseas School of Rome", city: "Rome", curriculum: "American / IB", why: "American curriculum", url: "https://www.aosr.org", urlType: "Official site (not verified)", opening: "No verified opening" },
    { name: "American School of Milan", city: "Milan", curriculum: "American / IB", why: "American curriculum", url: "https://www.asmilan.org", urlType: "Official site (not verified)", opening: "No verified opening" },
    { name: "International School of Florence", city: "Florence", curriculum: "IB", why: "Main Florence option", url: "https://www.isfitaly.org", urlType: "Official site (not verified)", opening: "No verified opening" }
  ],
  property: { ownership: "U.S. citizens can buy under reciprocity. Use a notaio; check cadastral compliance and condominium debts.", immigration: "Buying gives no residence.", sites: ["Idealista", "Immobiliare.it"] },
  health: "SSN registration once resident; private insurance needed for the visa.",
  women: "Generally safe; street harassment and pickpocketing in big-city centres."
},
{
  id: "grc", name: "Greece", short: "Greece", code: "GR", currency: "EUR",
  tagline: "Lowest U.S. advisory level and a lovely daily life, but the hardest legal teaching market on this list for an American.",
  advisory: { level: 1, text: "Level 1, Exercise Normal Precautions (listed March 2026).", src: ["s52"] },
  scores: {
    retire: { legal: 2, jobs: 1, income: 3, savings: 3, safety: 4, life: 4, housing: 3, longterm: 3 },
    job:   { legal: 1, jobs: 1, income: 2, savings: 1, safety: 4, life: 4, housing: 3, longterm: 3 },
    indep: { legal: 1, jobs: 2, income: 2, savings: 2, safety: 4, life: 4, housing: 3, longterm: 3 }
  },
  retireVisa: { name: "Financially Independent Person permit", minUSD: 3908, test: "€3,500/month net passive income", src: ["s8"] },
  retireTax: 8,
  teaching: {
    summary: "Most private and public schools prefer EU citizens or people who already hold work rights. A few American schools, notably ACS Athens and Pinewood in Thessaloniki, do recruit U.S. teachers.",
    credentials: "Non-EU teachers need a type D work visa sponsored by the employer, then a residence permit. The process takes at least two months and often longer.",
    src: ["s41", "s39"],
    tefl: "TEFL helps for language schools (frontistiria), but sponsorship there is rare.",
    hiring: "January–April for September.",
    jobFirst: "Yes.",
    restrictions: "Non-EU hiring is limited in practice.",
    routes: [
      { role: "international", label: "American international schools", req: "License + experience", pay: "Not verified", src: ["s39", "s40"], verdict: "Only realistic route" },
      { role: "language", label: "Language schools (frontistiria)", req: "Degree + TEFL + work rights", pay: "Low; not verified", src: ["s41"], verdict: "Rarely sponsored" }
    ]
  },
  salary: { gross: 1786, tax: 22, housing: false, insurance: false, label: "Athens international school, €1,600/mo gross (estimate; not verified)", src: [] },
  budget: { rent: 1000, utilities: 150, comms: 45, groceries: 320, dining: 150, transport: 35, insurance: 90, health: 30, visa: 20, leisure: 130, trips: 160 },
  budgetNote: "Central Athens averages about $1,180; northern suburbs near schools vary.",
  upfront: { flight: 950, temp: 1600, furnish: 500, credentials: 300, visaFees: 250, shipping: 400, legal: 400, note: "" },
  visas: [
    { name: "Employer work visa (type D)", track: "job", eligibility: "Sponsoring employer", money: "None", fees: "Varies", where: "Greek consulate, then residence permit in Greece", time: "2+ months", duration: "Matches contract", presence: "Live in Greece", work: "Sponsoring employer", dependents: "Family reunification", jobLoss: "Seek advice", src: ["s41"] },
    { name: "Financially Independent Person (FIP)", track: "retire", eligibility: "Passive income", money: "€3,500/mo net (+20% spouse, +15% per child)", fees: "Varies", where: "Consulate, then permit", time: "Months", duration: "3 years, renewable", presence: "183 days a year reported", work: "No work in Greece", dependents: "Yes", jobLoss: "—", src: ["s8"] },
    { name: "Digital Nomad Visa", track: "indep", eligibility: "Remote work outside Greece", money: "€3,500/mo after tax", fees: "Varies", where: "Consulate or in Greece", time: "Weeks to months", duration: "12 months, convertible to 2-year permit", presence: "Live in Greece", work: "Remote foreign work", dependents: "Yes", jobLoss: "—", src: ["s9"] }
  ],
  residency: { temp: "Permit renewals on your visa basis.", pr: "Long-term residence after 5 years (confirm).", cit: "About 7 years of residence plus a citizenship exam (confirm).", dual: "Greece generally allows dual citizenship (confirm).", limited: false },
  cities: [
    { name: "Athens (northern suburbs)", schools: "ACS Athens is in Halandri; other international schools in the north and east.", hoods: "Halandri, Marousi, Agia Paraskevi", commute: "Metro Line 3 and suburban rail", rent: "About $1,180 central; suburbs vary", transit: "Good metro", health: "Public and private hospitals; ATH airport", climate: "Hot dry summers, mild winters; heatwaves and wildfire smoke", language: "Greek; English widely spoken", pros: "Level 1 advisory, lifestyle", cons: "Very few legal jobs" },
    { name: "Thessaloniki", schools: "Pinewood American International School in the eastern suburbs", hoods: "Kalamaria, Pylaia", commute: "Buses, new metro", rent: "Lower than Athens (not sourced)", transit: "Improving", health: "Good; SKG airport", climate: "Colder winters than Athens", language: "Greek", pros: "Student city, cheaper", cons: "One main employer" }
  ],
  schools: [
    { name: "ACS Athens", city: "Athens (Halandri)", curriculum: "American / IB", why: "Recruits teachers from the U.S.", url: "https://www.acs.gr/faculty_staff_employment_opportunities", urlType: "Official careers page (verified page)", opening: "Openings appear there; none verified for 2027", src: ["s39"] },
    { name: "Pinewood American International School", city: "Thessaloniki", curriculum: "American (AERO), IB MYP, AP", why: "Advertised a Middle & High School English post for 2026–27", url: "https://www.careers-page.com/pinewood/job/X99V46VY", urlType: "Official careers listing", opening: "2026–27 listing; check if still open", src: ["s40"] }
  ],
  property: { ownership: "Generally open to U.S. buyers; border-area properties need permission. Use a lawyer and notary; check the Hellenic Cadastre.", immigration: "Greece's golden visa requires €250,000–€800,000 depending on area and type (confirm).", sites: ["Spitogatos", "XE.gr"] },
  health: "Public system (EOPYY) once insured through work; private care is affordable.",
  women: "Generally safe; normal big-city precautions."
}
];

/* ---------- Advertised pay ranges (local currency). per: "mo" or "yr". */
const PAY = [
  { c: "uae", type: "International school, Abu Dhabi (base)", cur: "AED", lo: 12300, hi: 20400, per: "mo", ben: "Housing or AED 5,000–10,000/mo allowance; annual flight; insurance; end-of-service gratuity", src: ["s23"] },
  { c: "uae", type: "Taaleem schools, Dubai (teachers)", cur: "AED", lo: 10000, hi: 18000, per: "mo", ben: "Packages typically add 30–50% in benefits", src: ["s25"] },
  { c: "tha", type: "Top-tier international school, Bangkok", cur: "THB", lo: 80000, hi: 150000, per: "mo", ben: "Housing allowance THB 20,000–50,000; flights and insurance common", src: ["s27"] },
  { c: "tha", type: "Thai private school (native-speaker post)", cur: "THB", lo: 35000, hi: 40000, per: "mo", ben: "Includes THB 3,000 housing allowance; ~2 months' holiday", src: ["s29"] },
  { c: "mex", type: "Overseas-hire international school, Mexico City", cur: "USD", lo: 25000, hi: 35000, per: "yr", ben: "Varies; ask about housing help and flights", src: ["s36"] },
  { c: "mex", type: "Local-hire bilingual school, Mexico City", cur: "MXN", lo: 20000, hi: 29000, per: "mo", ben: "Local benefits", src: ["s35"] },
  { c: "mex", type: "Regional American school (Chiapas)", cur: "USD", lo: 860, hi: 1050, per: "mo", ben: "Full tuition for dependent children", src: ["s37b"] },
  { c: "esp", type: "International school", cur: "EUR", lo: 1600, hi: 3000, per: "mo", ben: "Some help with accommodation; social security healthcare", src: ["s30"] },
  { c: "esp", type: "Auxiliar de Conversación (stipend, 14 hrs/wk)", cur: "EUR", lo: 800, hi: 1000, per: "mo", ben: "No travel or housing paid; up to €1,000 in Madrid for more hours", src: ["s3"] },
  { c: "prt", type: "International school", cur: "EUR", lo: 25000, hi: 40000, per: "yr", ben: "Social security healthcare", src: ["s32"] },
  { c: "prt", type: "Language school", cur: "USD", lo: 900, hi: 1400, per: "mo", ben: "Usually none", src: ["s42"] },
  { c: "pan", type: "International school (recruiter ad, 2025)", cur: "GBP", lo: null, hi: 38000, per: "yr", ben: "Not stated", src: ["s38b"] },
  { c: "pan", type: "Private / English-teaching posts", cur: "USD", lo: 1000, hi: 1300, per: "mo", ben: "Usually none", src: ["s37"] },
  { c: "ita", type: "Language school", cur: "USD", lo: 1000, hi: 1500, per: "mo", ben: "Usually none", src: ["s42"] },
  { c: "grc", type: "International school", cur: null, lo: null, hi: null, per: "mo", ben: "Not verified for this guide", src: [] }
];
FX.GBP = 0.7472; /* derived from the same Banque de France rates */

/* ---------- Teaching role filter labels */
const ROLES = [
  { id: "international", label: "International schools" },
  { id: "local", label: "Local / bilingual schools" },
  { id: "assistant", label: "Government assistant programmes" },
  { id: "language", label: "Language schools" },
  { id: "university", label: "Universities" },
  { id: "online", label: "Online / tutoring" }
];

/* ---------- Checklist (saved in the browser) */
const CHECKLIST = [
  { phase: "12–18 months before retiring", items: [
    "Answer the profile questionnaire so the guide can be re-ranked",
    "Ask the pension system for a written estimate of monthly pension and survivor options",
    "Get a Social Security benefit estimate at ssa.gov",
    "Ask whether the pension can be paid to a foreign bank or must go to a U.S. account",
    "Ask whether retiree health coverage works outside the U.S.",
    "Decide on a Medicare Part B strategy before age 65 (see Retirement income)",
    "Shortlist two countries and book a scouting trip"
  ]},
  { phase: "6–12 months before", items: [
    "Take the scouting trip and choose a city",
    "Order an FBI background check (allow for apostille time)",
    "Request pension and Social Security award letters for the visa file; apostille as required",
    "Buy international health insurance that meets the visa's rules",
    "Book a consulate appointment (Spain, Italy and Portugal fill up months ahead)",
    "If I want to keep teaching, check which visa allows it before applying"
  ]},
  { phase: "Final 30 days", items: [
    "Collect the visa and check every detail",
    "Set up a no-foreign-fee card and a regulated transfer service",
    "Get prescriptions and a doctor's letter for 3 months of medication",
    "Scan all documents to an encrypted cloud folder",
    "Keep a U.S. phone number for bank verification codes",
    "Arrange U.S. mail handling and update the pension and SSA address"
  ]},
  { phase: "First 30 days", items: [
    "Register residence and get the local ID card",
    "Open a local bank account",
    "Register with the U.S. embassy's STEP programme",
    "Find a doctor and the nearest hospital that takes your insurance",
    "Save local emergency numbers"
  ]},
  { phase: "First 90 days", items: [
    "Sign a long-term lease",
    "Start language classes",
    "Join a women's or expat group, church, choir or volunteer group",
    "Meet a cross-border tax preparer about the first U.S. and local returns"
  ]},
  { phase: "Every year", items: [
    "File U.S. taxes (automatic extension to June 15 when living abroad)",
    "File FBAR if foreign accounts exceed $10,000 at any point",
    "Renew residence permit or visa before expiry",
    "Return any 'proof of life' forms the pension system sends",
    "Review health insurance and emergency fund"
  ]}
];

/* ---------- Sources */
const SOURCES = {
  s1:  { t: "Spain Non-Lucrative Visa 2026 income (€28,800/yr)", u: "https://movingtospain.com/?p=10975", type: "Law-firm guide" },
  s2:  { t: "IPREM 2026 and Spain DNV threshold", u: "https://movingtospain.com/?p=1054", type: "Law-firm guide" },
  s3:  { t: "Spanish Ministry of Education: Language Assistants 2026–27", u: "https://www.educacionfpydeportes.gob.es/en/servicios-al-ciudadano/catalogo/general/99/998188/ficha/998188-2026-2027.html", type: "Official" },
  s4:  { t: "Spanish Ministry of Education: assistant eligibility and hours", u: "https://www.educacionfpydeportes.gob.es/polonia/ca/convocatorias-programas/ministerio/auxiliares-conversacion.html", type: "Official" },
  s5:  { t: "Portugal nationality law in force 19 May 2026", u: "https://nomadgate.com/portugal-nationality-law-takes-effect/", type: "Guide" },
  s6:  { t: "Portugal D7 2026 income thresholds", u: "https://www.imidaily.com/portugal-d7-visa/", type: "Guide" },
  s7:  { t: "Portugal D8 digital nomad visa 2026", u: "https://www.greenbacktaxservices.com/country-guide/portugal/portugal-digital-nomad-visa/", type: "Tax firm guide" },
  s8:  { t: "Greece Financially Independent Person visa", u: "https://www.globalcitizensolutions.com/fip-visa-greece/", type: "Guide" },
  s9:  { t: "Greece Digital Nomad Visa 2026", u: "https://www.almosthired.co/blog/greece-digital-nomad-visa-2026", type: "Guide" },
  s10: { t: "Italy Elective Residence income 2026", u: "https://hansgoldstein.com/moving-abroad/italy-elective-residence-visa-income-requirement/", type: "Guide" },
  s11: { t: "Italy Decreto Flussi 2026–2028 quotas", u: "https://www.globalcitizensolutions.com/?p=7853", type: "Guide" },
  s12: { t: "Mexico residency solvency by consulate (2026 UMA)", u: "https://mexicorelocationguide.com/visa-requirements-for-mexico", type: "Guide" },
  s12b:{ t: "Consulate of Mexico, Washington: Temporary resident visa (2026)", u: "https://consulmex.sre.gob.mx/washington/images/2026/visas/eng/Temporary_resident.pdf", type: "Official" },
  s13: { t: "Mexico temporary resident visa 2026 fees", u: "https://migaku.com/blog/language-fun/mexico-temporary-resident-visa-2026-requirements-and-walkthrough", type: "Guide" },
  s14: { t: "Panama professions reserved for nationals", u: "https://www.expatexchange.com/thread/270/3402912/Panama/Expats-Living-in-Panama/Professions-Reserved-Only-for-Panamanians", type: "Forum (lawyer reply)" },
  s15: { t: "Panama Friendly Nations Visa 2026 rules", u: "https://www.borderpilot.com/blog/panama-friendly-nations-visa-2026-investment-residency-guide", type: "Guide" },
  s16: { t: "Panama visas, Pensionado and work permits", u: "https://www.expatexchange.com/ctryguide/5624/87/Panama/Immigration-Panama-Panama-Visas--Residency", type: "Guide" },
  s17: { t: "Thailand teaching: Non-B, work permit, TCT license", u: "https://terms.law/Thai/employment/teaching-requirements.html", type: "Legal guide" },
  s18: { t: "Thai government: registration and licensing of foreign teachers", u: "https://www.thailand.go.th/event-detail/001_01_249", type: "Official" },
  s19: { t: "Teaching jobs in Thailand (2026 training requirement)", u: "https://thethaiger.com/guides/teaching-jobs-in-thailand-what-you-need-to-know", type: "News guide" },
  s20: { t: "Thailand DTV 2026 requirements", u: "https://thethaiger.com/visas/dtv/", type: "News guide" },
  s21: { t: "UAE Government: qualifications to be a teacher", u: "https://beta.government.ae/en/information-and-services/education/school-education-k-12/joining-k-12-education/qualifications-to-be-a-teacher", type: "Official" },
  s22: { t: "How to teach in the UAE in 2026", u: "https://www.teacherhorizons.com/advice/how-to-teach-in-the-uae-in-2026", type: "Recruiter" },
  s23: { t: "Abu Dhabi teaching salary and benefits", u: "https://www.teachaway.com/blog/abu-dhabi-teaching-salary-and-benefits", type: "Recruiter" },
  s24: { t: "Teach Away: Abu Dhabi jobs and ADEK requirements", u: "https://www.teachaway.com/teaching-public-schools-abu-dhabi", type: "Recruiter" },
  s25: { t: "Teacher salary in Dubai 2026", u: "https://www.suraasa.com/blog/teacher-salary-dubai-2026", type: "Training provider" },
  s26: { t: "U.S. State Dept: UAE travel advisory", u: "https://travel.state.gov/en/international-travel/travel-advisories/united-arab-emirates.html", type: "Official" },
  s27: { t: "International teacher pay in Bangkok by school type", u: "https://ipgce.com/?p=49245", type: "Training provider" },
  s28: { t: "Canadian International School of Thailand listing", u: "https://tesljobs.com/jobs/hllH1q3cVnZE", type: "Job listing" },
  s29: { t: "Sarasas School native English teacher listing", u: "https://tesljobs.com/jobs/native-english-teachers-at-sarasas-school-bangkok-thailand-YuAoVSEsRNOr", type: "Job listing" },
  s30: { t: "Average teaching salary in Spain", u: "https://www.theteflacademy.com/blog/what-is-the-average-salary-for-teaching-abroad-in-spain/", type: "Training provider" },
  s31: { t: "TES: international school jobs in Spain", u: "https://www.tes.com/jobs/browse/primary-early-years-practitioner-spain", type: "Job board" },
  s32: { t: "International school teacher pay in Portugal", u: "https://www.ipgce.com/?p=178604", type: "Training provider" },
  s33: { t: "Teach Away: American School Foundation profile", u: "https://www.teachaway.com/schools/american-school-foundation-ac", type: "Recruiter" },
  s34: { t: "Teach Away: ASF Monterrey (hiring season)", u: "https://teachaway.com/schools/american-school-foundation-monterrey", type: "Recruiter" },
  s35: { t: "TES: teaching jobs in Mexico", u: "https://www.tes.com/jobs/browse/teaching-and-lecturing-mexico", type: "Job board" },
  s36: { t: "International teacher pay in Mexico City", u: "https://www.ipgce.com/?p=90771", type: "Training provider" },
  s37: { t: "Teach Away: teaching in Panama", u: "https://www.teachaway.com/teach-in-panama", type: "Recruiter" },
  s37b:{ t: "ASF Chiapas listing (US$860–1,050/mo)", u: "https://teachaway.com/node/18250", type: "Job listing" },
  s38: { t: "International Schools Review: ISP", u: "https://www.internationalschoolsreview.com/international-schools/international-school-panama.htm", type: "Teacher reviews" },
  s38b:{ t: "ASQ: Primary teacher, Panama City (2025)", u: "https://jobs.asq-international.com/job/primary-teacher-–-panama-city,-panama-–-september-2025-start-4298.aspx", type: "Recruiter ad" },
  s39: { t: "ACS Athens employment", u: "https://www.acs.gr/faculty_staff_employment_opportunities", type: "Official school" },
  s40: { t: "Pinewood: Middle & High School English Teacher 2026–27", u: "https://www.careers-page.com/pinewood/job/X99V46VY", type: "Official school" },
  s41: { t: "Teaching in Greece as a non-EU citizen", u: "https://www.dotefl.com/?p=5539", type: "TEFL guide" },
  s42: { t: "Top TEFL destinations in Europe 2026", u: "https://premiertefl.com/gb/blog/top-tefl-destinations-in-europe-2026-premier-tefl/", type: "TEFL provider" },
  s42b:{ t: "Spain vs Italy TEFL 2026", u: "https://tefl.ie/spain-vs-italy-tefl/", type: "TEFL provider" },
  s43: { t: "IRS: Foreign Earned Income Exclusion", u: "https://www.irs.gov/individuals/international-taxpayers/foreign-earned-income-exclusion", type: "Official" },
  s43b:{ t: "2026 FEIE $132,900 and housing base $21,264", u: "https://www.cpapracticeadvisor.com/2026/04/29/irs-increases-foreign-earned-income-tax-breaks/182444/", type: "Trade press" },
  s44: { t: "Social Security Fairness Act FAQ (WEP/GPO repeal)", u: "https://www.rio.nd.gov/faq-social-security-fairness-act-and-repeal-wep-gpo", type: "State pension agency" },
  s45: { t: "SSA: Totalization agreements in force", u: "https://secure.ssa.gov/poms.nsf/lnx/0201701005", type: "Official" },
  s45b:{ t: "Countries without U.S. totalization (Mexico, UAE, Thailand)", u: "https://expat-tax-e9l.pages.dev/blog/totalization-agreements-explained/", type: "Guide" },
  s46: { t: "Banque de France daily exchange rates, 6 Nov 2026", u: "https://www.banque-france.fr/en/statistics/rates-and-prices/exchange-rates-daily-parities-2026-11-06", type: "Official" },
  s47: { t: "European city-centre rents (Numbeo, May 2026)", u: "https://www.tradingpedia.com/forex-brokers/europe-cities-rent/", type: "Data summary" },
  s48: { t: "1-bedroom rent benchmarks by city", u: "https://city-cost-compare.vercel.app/rankings/cheapest-rent-cities", type: "Data summary" },
  s49: { t: "Neighbourhood rents: Bangkok, Mexico City, Porto", u: "https://dev.to/expatcountdownhesr/rent-shock-where-1500month-gets-you-honest-2025-data-1i3g", type: "Blog (lower confidence)" },
  s50: { t: "Athens central rent comparison", u: "https://kvia.com/?p=1416524", type: "News" },
  s51: { t: "Mexico state-by-state advisory (June 2026)", u: "https://www.rivieramayanews.mx/us-issues-travel-advisory-for-mexico-ahead-of-2026-world-cup-classifies-states-by-risk-level/", type: "News" },
  s51b:{ t: "U.S. State Dept travel advisories", u: "https://travel.state.gov/en/international-travel/travel-advisories.html", type: "Official" },
  s52: { t: "State Dept advisory map, March 2026 (Greece L1; Spain, Italy L2)", u: "https://greekreporter.com/2026/03/27/us-state-department-map-dangerous-countries-americans/", type: "News" },
  s52b:{ t: "Thailand advisory update (Cambodia border)", u: "https://www.travelpulse.com/news/destinations/biggest-travel-advisory-updates-from-2025", type: "Trade press" },
  s52c:{ t: "Level 2 advisory list incl. Panama, Thailand (March 2026)", u: "https://awesomecapital.blogspot.com/2026/03/most-dangerous-countries-for-american.html", type: "Blog (lower confidence)" },
  s56: { t: "Spain: non-EU teacher hiring and labour-market test", u: "https://spill.org/el/guides/spain-expat-guide", type: "Guide (lower confidence)" },
  s61: { t: "Crossroads Christian Academy Panama listing", u: "https://www.career.com/job/crossroads-christian-academy-panama/upper-elementary-teacher-relocation-to-panama-international-christian-school-2026-2027/j202603172304188491418", type: "Job listing" },
  s62: { t: "Al Ain primary teacher listing (AED 14,790)", u: "https://app.qureos.com/jobs/primary-teacher-al-ain-uae-august-2026-1772370968108", type: "Job listing" },
  s70: { t: "Royal Thai MFA: Non-Immigrant O retirement visa requirements", u: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/NON-O_for_Retirement_visa.pdf", type: "Official" },
  s71: { t: "UAE retirement visa eligibility (Khaleej Times)", u: "https://www.khaleejtimes.com/life-and-living/visa-and-immigration-in-uae/retirement-visa-in-dubai-cost-eligibility-all-you-need-to-know", type: "News (updated July 2024)" },
  s72: { t: "Retiring to Mexico: residency and tax (Nov 2026)", u: "https://brighttax.com/blog/retire-to-mexico/", type: "Tax firm guide" },
  s73: { t: "Greece 7% foreign pensioner regime, deadline extended", u: "https://greekcitytimes.com/2026/09/26/greece-extends-special-tax-regime-deadline-for-foreign-pensioners/", type: "News" },
  s74: { t: "AARP: Medicare if living outside the U.S.", u: "https://www.aarp.org/medicare/faq/medicare-if-living-outside-united-states/", type: "Non-profit guide" },
  s75: { t: "International Living: Medicare overseas", u: "https://internationalliving.com/medicare-abroad-need-to-know", type: "Guide" },
  s135:{ t: "Non-B visa steps for teachers", u: "https://www.internationalteflacademy.com/blog/visas-teach-english-in-thailand", type: "TEFL provider" }
};

/* ---------- Recruitment platforms and checks */
const PLATFORMS = [
  { n: "Search Associates", u: "https://www.searchassociates.com", d: "Paid candidate membership; strong for licensed teachers; publishes school profiles incl. typical savings." },
  { n: "Teach Away", u: "https://www.teachaway.com", d: "Free; large UAE, Asia and Latin America listings." },
  { n: "TES Jobs", u: "https://www.tes.com/jobs", d: "Free; strongest for British-curriculum schools in Europe and the Gulf." },
  { n: "Schrole", u: "https://www.schrole.com", d: "Applicant platform used by many accredited schools." },
  { n: "Teacher Horizons", u: "https://www.teacherhorizons.com", d: "Free for teachers; advice and listings." },
  { n: "International Schools Review", u: "https://www.internationalschoolsreview.com", d: "Paid teacher reviews of school leadership, pay and housing." }
];

/* ---------- Resources for Agnes (shown in the Resources section) */
const RESOURCES = [
  { group: "Living abroad and relocation", items: [
    { n: "International Living", u: "https://internationalliving.com", d: "Country guides, cost-of-living reports and an annual retirement and relocation index. Written for Americans; read alongside official sources." },
    { n: "Expatica", u: "https://www.expatica.com", d: "Practical how-to guides for housing, healthcare, banking and visas in Spain, Portugal, Italy and more." },
    { n: "Expat Exchange", u: "https://www.expatexchange.com", d: "Country forums and reviews from Americans living in Mexico, Panama, Portugal and elsewhere." },
    { n: "InterNations", u: "https://www.internations.org", d: "City-based expat community with meetups, useful for building a network before arriving." },
    { n: "Numbeo", u: "https://www.numbeo.com/cost-of-living/", d: "Crowd-sourced rents and prices by city. Good for quick comparisons; check against local listings." }
  ]},
  { group: "Teaching jobs and school research", items: [
    { n: "Search Associates", u: "https://www.searchassociates.com", d: "Leading recruiter for licensed teachers; job fairs and school profiles with typical savings." },
    { n: "ISS (International Schools Services)", u: "https://www.iss.edu", d: "Non-profit recruiter with an educator database and recruitment events." },
    { n: "TES Jobs", u: "https://www.tes.com/jobs", d: "Large board for British and international schools in Europe and the Gulf." },
    { n: "Teach Away", u: "https://www.teachaway.com", d: "Free listings, especially the UAE, Asia and Latin America." },
    { n: "Schrole", u: "https://www.schrole.com", d: "Application platform used by many accredited schools." },
    { n: "TIE Online", u: "https://www.tieonline.com", d: "The International Educator: news and job listings for international schools." },
    { n: "International Schools Review", u: "https://www.internationalschoolsreview.com", d: "Teacher-written reviews of leadership, pay and housing (paid)." },
    { n: "Council of International Schools", u: "https://www.cois.org", d: "Check whether a school is CIS-accredited." },
    { n: "IB: Find an IB World School", u: "https://www.ibo.org/programmes/find-an-ib-school/", d: "Confirm a school's IB authorisation." },
    { n: "Go Overseas: Teach Abroad", u: "https://www.gooverseas.com/teach-abroad", d: "Programme reviews, useful for language-school and assistant routes." }
  ]},
  { group: "U.S. government", items: [
    { n: "Travel advisories (State Department)", u: "https://travel.state.gov/en/international-travel/travel-advisories.html", d: "Check the current level for each country before every decision." },
    { n: "STEP enrolment", u: "https://step.state.gov", d: "Register with the U.S. embassy so it can reach me in an emergency." },
    { n: "U.S. embassies", u: "https://www.usembassy.gov", d: "Embassy and consulate contacts for every country on this list." },
    { n: "FBI background check (eDO)", u: "https://www.edo.cjis.gov", d: "Order the Identity History Summary needed for most work visas." },
    { n: "IRS: U.S. citizens abroad", u: "https://www.irs.gov/individuals/international-taxpayers", d: "Filing rules, Foreign Earned Income Exclusion and Foreign Tax Credit." },
    { n: "Social Security: international", u: "https://www.ssa.gov/international/", d: "Totalization agreements and receiving benefits abroad." }
  ]},
  { group: "Official immigration sites by country", items: [
    { n: "Spain: Ministry of Foreign Affairs (visas)", u: "https://www.exteriores.gob.es", d: "Consulate pages list visa document rules by U.S. region." },
    { n: "Portugal: AIMA", u: "https://aima.gov.pt", d: "Residence permits and renewals." },
    { n: "Italy: Visto per l'Italia", u: "https://vistoperitalia.esteri.it", d: "Official visa wizard showing which visa applies." },
    { n: "Greece: Migration Ministry", u: "https://migration.gov.gr", d: "Residence permit categories and applications." },
    { n: "Thailand: e-Visa", u: "https://www.thaievisa.go.th", d: "Official online visa applications, including Non-B and DTV." },
    { n: "UAE: official government portal", u: "https://u.ae", d: "Residence visa and teacher-licensing information." },
    { n: "Dubai KHDA / Abu Dhabi ADEK", u: "https://www.khda.gov.ae", d: "School inspection ratings in Dubai. For Abu Dhabi see adek.gov.ae." },
    { n: "Mexico: National Migration Institute (INM)", u: "https://www.gob.mx/inm", d: "Residence cards, renewals and changes of status." },
    { n: "Panama: National Migration Service", u: "https://www.migracion.gob.pa", d: "Residence categories and requirements." }
  ]},
  { group: "Money, insurance and language", items: [
    { n: "Wise", u: "https://wise.com", d: "Low-cost currency transfers and a multi-currency account (example service)." },
    { n: "Cigna Global", u: "https://www.cignaglobal.com", d: "International health insurance for gaps between employer plans (example)." },
    { n: "GeoBlue", u: "https://www.geobluetravelinsurance.com", d: "U.S.-based international health plans for expats (example)." },
    { n: "italki", u: "https://www.italki.com", d: "One-to-one online tutors in Spanish, Portuguese, Italian, Greek, Thai and Arabic." }
  ]},
  { group: "Communities", items: [
    { n: "Travel Noire", u: "https://travelnoire.com", d: "Travel and expat stories from Black travellers; useful if I want that perspective." },
    { n: "Wanderful", u: "https://www.sheswanderful.com", d: "Community and city chapters for women who travel." },
    { n: "Dave's ESL Cafe", u: "https://www.eslcafe.com", d: "Long-running English-teaching job board and country forums." }
  ]}
];
