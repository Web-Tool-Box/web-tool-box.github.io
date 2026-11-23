import { ToolDefinition } from '@/types/tool';

export const calculatorTools: ToolDefinition[] = [
  {
    slug: 'emi-calculator',
    title: 'Loan & Home EMI Calculator',
    description: 'Calculate monthly EMI, total interest payable, and amortization schedule for home loans, car loans, and personal loans. Interactive charts & breakdown.',
    category: 'calculators',
    primaryKeyword: 'loan emi calculator online',
    keywords: ['emi calculator', 'loan calculator', 'home loan emi', 'car loan calculator', 'mortgage calculator', 'amortization schedule'],
    icon: 'Landmark',
    isPopular: true,
    content: {
      whatItIs: 'The Loan & Home EMI Calculator calculates your exact Equated Monthly Installment (EMI), total interest payable, and complete repayment trajectory. Designed for mortgages, car loans, and personal financing, it displays an interactive visual principal-vs-interest breakdown.',
      howToUse: [
        'Enter your Principal Loan Amount.',
        'Enter the annual Interest Rate (%).',
        'Enter the Loan Tenure in Years or Months.',
        'Instantly view your Monthly EMI, Total Interest, Total Payment, and amortization schedule.',
      ],
      useCases: [
        'Budgeting monthly mortgage installments when buying a new home or real estate property.',
        'Comparing auto loan terms across different dealerships and banks.',
        'Planning prepayments to eliminate debt years early and save on compound interest.',
      ],
      tips: [
        'Even a 0.5% reduction in interest rate on a 20-year mortgage saves thousands in total interest.',
        'Making one extra EMI payment per year can shorten a 20-year loan tenure by over 3 years.',
        'Check that the tenure is calculated in months correctly if opting for short-term financing.',
      ],
    },
    faq: [
      {
        question: 'What is EMI and how is it calculated?',
        answer: 'EMI stands for Equated Monthly Installment. It is computed using the mathematical formula: `E = P * r * (1 + r)^n / ((1 + r)^n - 1)`, where P is principal, r is monthly interest, and n is total months.',
      },
      {
        question: 'What is the difference between fixed and reducing rate loans?',
        answer: 'In a reducing rate loan, interest is calculated only on the remaining unpaid principal balance, which saves you substantial money compared to flat-rate loans.',
      },
      {
        question: 'Can I view the monthly amortization breakdown?',
        answer: 'Yes! The tool provides a detailed year-by-year and month-by-month repayment schedule showing principal and interest allocations.',
      },
      {
        question: 'Does this calculator include loan processing fees?',
        answer: 'The primary calculation focuses on principal and interest; you can factor in processing fees by adding them to the principal amount.',
      },
      {
        question: 'Are my financial calculations saved or shared?',
        answer: 'No. All calculations are executed completely inside your browser with 100% privacy.',
      },
    ],
    relatedTools: ['sip-calculator', 'compound-interest-calculator', 'percentage-calculator', 'currency-formatter'],
  },
  {
    slug: 'sip-calculator',
    title: 'SIP & Mutual Fund Investment Calculator',
    description: 'Calculate expected returns on Systematic Investment Plans (SIP) and mutual funds. Visualize wealth growth, invested amount, and compounding gains.',
    category: 'calculators',
    primaryKeyword: 'sip calculator online',
    keywords: ['sip calculator', 'mutual fund calculator', 'systematic investment plan', 'sip returns calculator', 'investment wealth calculator'],
    icon: 'TrendingUp',
    isPopular: true,
    content: {
      whatItIs: 'The SIP Investment Calculator projects future wealth accumulated through disciplined Systematic Investment Plans (SIP) in mutual funds, index funds, and equity portfolios. Visualize the exponential power of compounding over time.',
      howToUse: [
        'Enter your Monthly Investment amount.',
        'Specify the Expected Annual Return Rate (e.g. 12% for equity index funds).',
        'Set your Investment Time Period in Years.',
        'Review the breakdown of Total Invested Amount, Estimated Returns, and Total Maturity Value.',
      ],
      useCases: [
        'Planning retirement portfolios and long-term financial independence (FIRE).',
        'Setting up college education funds for children over 10 to 15-year horizons.',
        'Comparing SIP dollar-cost averaging versus one-time lumpsum investments.',
      ],
      tips: [
        'Starting early makes a massive difference: investing at age 25 vs 35 can double or triple final maturity value due to compounding.',
        'Historically, diversified equity index funds have delivered 10%–14% annualized long-term returns.',
        'Increase your monthly contribution by 5-10% annually (Step-Up SIP) to drastically accelerate wealth creation.',
      ],
    },
    faq: [
      {
        question: 'What is a Systematic Investment Plan (SIP)?',
        answer: 'A SIP is an investment method where an investor commits a fixed amount at regular intervals (usually monthly) into a mutual fund scheme, benefiting from dollar-cost averaging.',
      },
      {
        question: 'What formula is used to calculate SIP returns?',
        answer: 'The maturity value is calculated using the future value of an annuity formula: `M = P * [((1 + i)^n - 1) / i] * (1 + i)`, where P is monthly deposit, i is periodic interest rate, and n is total months.',
      },
      {
        question: 'Are SIP returns guaranteed?',
        answer: 'Mutual fund market returns fluctuate with market conditions; the calculator uses your projected annualized CAGR for estimation purposes.',
      },
      {
        question: 'Can I calculate both monthly and lumpsum investments?',
        answer: 'Yes, you can toggle between Systematic Monthly Investment (SIP) and One-Time Lumpsum investment modes.',
      },
      {
        question: 'Does the calculator account for capital gains taxes?',
        answer: 'The output reflects gross pre-tax maturity; actual tax liabilities depend on local capital gains laws (e.g. LTCG/STCG).',
      },
    ],
    relatedTools: ['compound-interest-calculator', 'emi-calculator', 'percentage-calculator', 'currency-formatter'],
  },
  {
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest on savings, deposits, and investments. Choose compounding frequencies (Daily, Monthly, Quarterly, Annually) with graphs.',
    category: 'calculators',
    primaryKeyword: 'compound interest calculator',
    keywords: ['compound interest calculator', 'calculate interest', 'daily compound interest', 'savings interest calculator', 'future value calculator'],
    icon: 'Coins',
    isPopular: true,
    content: {
      whatItIs: 'The Compound Interest Calculator computes the growth of your investments and savings over time. It demonstrates how interest earned on both initial principal and accumulated interest creates exponential capital growth across various compounding intervals (Daily, Monthly, Quarterly, Annually).',
      howToUse: [
        'Enter your Initial Principal deposit.',
        'Enter optional Monthly or Annual Contributions.',
        'Specify the Annual Interest Rate (%) and Investment Duration (years).',
        'Select the Compounding Frequency (Daily, Monthly, Quarterly, or Annually).',
        'Analyze your growth chart and annual balance breakdown table.',
      ],
      useCases: [
        'Forecasting growth of high-yield savings accounts (HYSA) and certificates of deposit (CD).',
        'Evaluating dividend reinvestment strategies (DRIP) over multiple decades.',
        'Comparing simple interest vs compound interest for commercial borrowing or lending.',
      ],
      tips: [
        'The Rule of 72: divide 72 by your annual interest rate to find the approximate number of years to double your money.',
        'Higher compounding frequency (Daily vs Annually) yields slightly higher effective annual percentage yields (APY).',
        'Consistent monthly contributions matter far more in the early years than the interest rate alone.',
      ],
    },
    faq: [
      {
        question: 'What is the formula for compound interest?',
        answer: 'The standard formula is `A = P * (1 + r/n)^(n*t)`, where A is the future balance, P is the principal, r is the annual rate, n is compounding frequency per year, and t is time in years.',
      },
      {
        question: 'What is the difference between APR and APY?',
        answer: 'APR (Annual Percentage Rate) does not account for compounding within the year, whereas APY (Annual Percentage Yield) reflects the true return with compounding included.',
      },
      {
        question: 'How does daily compounding compare to monthly compounding?',
        answer: 'Daily compounding applies interest 365 times per year, generating slightly higher returns than 12 monthly cycles, though the difference is modest on moderate sums.',
      },
      {
        question: 'Can I add regular monthly deposits to the calculation?',
        answer: 'Yes! You can specify continuous monthly or annual contributions to see real-world savings trajectory.',
      },
      {
        question: 'Is my data secure?',
        answer: 'Yes, all calculations run in your local web browser without network transmission.',
      },
    ],
    relatedTools: ['sip-calculator', 'emi-calculator', 'percentage-calculator', 'currency-formatter'],
  },
  {
    slug: 'gst-calculator',
    title: 'GST & Sales Tax Calculator',
    description: 'Calculate GST (Goods and Services Tax) and VAT amounts instantly. Toggle Inclusive and Exclusive tax rates (3%, 5%, 12%, 18%, 28%) with CGST/SGST split.',
    category: 'calculators',
    primaryKeyword: 'gst calculator online',
    keywords: ['gst calculator', 'sales tax calculator', 'calculate gst', 'gst inclusive exclusive', 'vat calculator', 'cgst sgst calculator'],
    icon: 'Receipt',
    isPopular: true,
    content: {
      whatItIs: 'The GST & Sales Tax Calculator computes net price, tax amount, and gross price for any commercial transaction. Seamlessly calculate Tax Inclusive (reverse GST) or Tax Exclusive prices, and view the CGST + SGST split for standard tax slabs (0.25%, 3%, 5%, 12%, 18%, 28%).',
      howToUse: [
        'Enter the Base Amount or Total Price.',
        'Select the GST rate slab (5%, 12%, 18%, 28%, or enter a Custom %).',
        'Choose whether the price is GST Exclusive (Add GST) or GST Inclusive (Extract GST).',
        'View the exact Net Price, CGST, SGST/IGST, and Total Invoice Value.',
      ],
      useCases: [
        'Invoicing freelance clients and creating tax-compliant business billing.',
        'Extracting underlying pre-tax product costs from retail consumer prices.',
        'Filing quarterly GST / VAT returns and verifying merchant expense receipts.',
      ],
      tips: [
        'For intra-state transactions in India, GST is split equally into CGST (Central) and SGST (State).',
        'To extract GST from an inclusive price: `GST Amount = Total - (Total * (100 / (100 + Rate)))`.',
        'Always double-check HSN/SAC codes for the correct legal tax slab before issuing commercial invoices.',
      ],
    },
    faq: [
      {
        question: 'What is the difference between GST Inclusive and Exclusive?',
        answer: 'GST Exclusive means tax is added on top of the base cost; GST Inclusive means the listed retail price already contains the tax component.',
      },
      {
        question: 'How is CGST and SGST calculated?',
        answer: 'For transactions within the same state, total GST is divided 50/50 between Central GST (CGST) and State GST (SGST).',
      },
      {
        question: 'Can I enter a custom tax rate for other countries (e.g., VAT or Sales Tax)?',
        answer: 'Yes! Select the "Custom" option to enter any VAT or regional sales tax percentage (e.g. 7%, 19%, 20%).',
      },
      {
        question: 'Can I copy the invoice line-item breakdown?',
        answer: 'Yes, one-click copy is available to paste directly into Excel or your billing software.',
      },
      {
        question: 'Does this tool save my invoice figures?',
        answer: 'No. Everything is calculated in memory for maximum financial privacy.',
      },
    ],
    relatedTools: ['percentage-calculator', 'currency-formatter', 'tip-calculator', 'emi-calculator'],
  },
  {
    slug: 'percentage-calculator',
    title: 'Percentage Calculator (All-in-One)',
    description: 'Solve common percentage calculations: What is X% of Y? X is what % of Y? Percentage increase/decrease, discount calculator, and percentage difference.',
    category: 'calculators',
    primaryKeyword: 'percentage calculator online',
    keywords: ['percentage calculator', 'percent calculator', 'percentage increase', 'percent decrease', 'calculate percentage', 'discount calculator'],
    icon: 'Percent',
    isPopular: true,
    content: {
      whatItIs: 'The All-in-One Percentage Calculator handles all common percentage mathematical equations: calculating percentages of values, finding percentage proportions, computing percentage increases or decreases, calculating shopping discounts, and determining percentage differences.',
      howToUse: [
        'Choose the calculation card that fits your problem (e.g., "What is X% of Y?", "% Increase/Decrease", or "Discount").',
        'Enter the known values into the input fields.',
        'The calculated solution and step-by-step mathematical formula appear instantly.',
        'Copy the result with a single click.',
      ],
      useCases: [
        'Calculating sale markdowns and promotional discounts while shopping.',
        'Analyzing quarterly business revenue growth and employee salary raises.',
        'Grading exams, calculating test scores, and analyzing academic performance metrics.',
      ],
      tips: [
        'To find percentage increase: `((New - Old) / Old) * 100`.',
        'To calculate a 20% tip quickly in your head, find 10% (move decimal left once) and multiply by 2.',
        'A 50% discount followed by an additional 20% off equals a 60% total discount, not 70%!',
      ],
    },
    faq: [
      {
        question: 'How do you calculate percentage increase?',
        answer: 'Subtract the original value from the new value, divide the difference by the original value, and multiply by 100.',
      },
      {
        question: 'What is the formula for calculating discounts?',
        answer: 'Discount Amount = Original Price * (Discount % / 100). The final sale price is Original Price minus Discount Amount.',
      },
      {
        question: 'Can percentages be greater than 100%?',
        answer: 'Yes! A percentage above 100% signifies that the value is larger than the comparison base (e.g., 200% of 50 is 100).',
      },
      {
        question: 'Does the calculator show the mathematical steps?',
        answer: 'Yes, each calculation card displays the clear mathematical formula and working steps.',
      },
      {
        question: 'Does this calculator run offline?',
        answer: 'Yes, all arithmetic operations are processed in your browser.',
      },
    ],
    relatedTools: ['gst-calculator', 'tip-calculator', 'emi-calculator', 'sip-calculator'],
  },
  {
    slug: 'age-calculator',
    title: 'Exact Age Calculator (Years, Months, Days)',
    description: 'Calculate your exact age in years, months, weeks, days, hours, and minutes. Find days until your next birthday, zodiac sign, and milestones.',
    category: 'calculators',
    primaryKeyword: 'age calculator online',
    keywords: ['age calculator', 'calculate age', 'how old am i', 'exact age in days', 'birthday countdown', 'chronological age calculator'],
    icon: 'Cake',
    isPopular: true,
    content: {
      whatItIs: 'The Exact Age Calculator computes your chronological age down to the exact day, hour, and minute based on your date of birth. Discover your total days lived, hours passed, exact countdown to your next birthday, and day of the week you were born.',
      howToUse: [
        'Select your Date of Birth in the date picker.',
        'Optionally customize the "Age at Date" (defaults to today).',
        'View your precise age in years, months, and days.',
        'Explore your life milestones: total days lived, hours, and next birthday countdown.',
      ],
      useCases: [
        'Verifying eligibility criteria for age-restricted exams, government jobs, and licenses.',
        'Planning milestone birthday parties (18th, 21st, 30th, 50th) and anniversaries.',
        'Calculating exact pet age and pediatric developmental milestone intervals.',
      ],
      tips: [
        'Leap years (366 days) are automatically accounted for with 100% astronomical accuracy.',
        'Your total days on Earth is a fascinating metric to celebrate (e.g. reaching 10,000 days lived at age ~27.4 years).',
        'Use the "Age at Date of" field to calculate historical ages or future milestone dates.',
      ],
    },
    faq: [
      {
        question: 'How does the calculator handle leap years?',
        answer: 'It uses standard calendar day-by-day date math that accurately counts February 29th in all leap years.',
      },
      {
        question: 'Can I find out what day of the week I was born?',
        answer: 'Yes! The calculator displays the day of the week (e.g. Friday, Sunday) for your birth date.',
      },
      {
        question: 'How is the next birthday countdown calculated?',
        answer: 'It calculates the exact number of months and days remaining until your upcoming birth anniversary.',
      },
      {
        question: 'Can I calculate age as of a specific date in the past or future?',
        answer: 'Yes, simply change the "Age at the Date of" field to any date you wish to inspect.',
      },
      {
        question: 'Is my birth date stored on a server?',
        answer: 'No. Your birth date is processed solely within your browser and never logged or stored.',
      },
    ],
    relatedTools: ['date-difference-calculator', 'timestamp-converter', 'stopwatch-timer', 'percentage-calculator'],
  },
  {
    slug: 'bmi-calculator',
    title: 'BMI Calculator (Body Mass Index)',
    description: 'Calculate your Body Mass Index (BMI) for adults. Supports Metric (kg/cm) and Imperial (lbs/feet/inches) units with WHO health category breakdown.',
    category: 'calculators',
    primaryKeyword: 'bmi calculator online',
    keywords: ['bmi calculator', 'body mass index', 'calculate bmi', 'healthy weight calculator', 'bmi formula', 'bmi chart'],
    icon: 'Activity',
    isPopular: true,
    content: {
      whatItIs: 'The BMI Calculator assesses Body Mass Index based on your weight and height according to World Health Organization (WHO) classifications. Check whether you fall into the Underweight, Normal weight, Overweight, or Obese categories, and view your ideal healthy weight range.',
      howToUse: [
        'Choose your preferred measurement system: Metric (cm, kg) or Imperial (ft/in, lbs).',
        'Enter your Height and Weight.',
        'View your calculated BMI score along with the color-coded WHO health classification.',
        'Inspect your target healthy weight range based on standard normal BMI (18.5 – 24.9).',
      ],
      useCases: [
        'Tracking general health, fitness, and weight management goals.',
        'Estimating healthy baseline target weights before starting fitness routines.',
        'Standard medical screening benchmark for clinical fitness assessments.',
      ],
      tips: [
        'BMI is a general screening indicator; it does not directly distinguish between body fat and lean muscle mass.',
        'Athletes and bodybuilders with high muscle mass may show an elevated BMI while having low body fat.',
        'For comprehensive health assessment, pair BMI with waist circumference and body fat percentage.',
      ],
    },
    faq: [
      {
        question: 'What is the standard BMI formula?',
        answer: 'Metric: `BMI = weight (kg) / (height (m))^2`. Imperial: `BMI = 703 * weight (lbs) / (height (in))^2`.',
      },
      {
        question: 'What are the WHO BMI weight categories?',
        answer: 'Underweight: < 18.5; Normal weight: 18.5–24.9; Overweight: 25.0–29.9; Obesity: ≥ 30.0.',
      },
      {
        question: 'Does BMI apply equally to men and women?',
        answer: 'The WHO BMI categories apply to adult men and women aged 20 and older regardless of gender.',
      },
      {
        question: 'What is considered a healthy weight for my height?',
        answer: 'A healthy weight corresponds to a BMI between 18.5 and 24.9, which the calculator displays automatically.',
      },
      {
        question: 'Is my health data private?',
        answer: 'Yes. No personal height or weight information is ever transmitted or logged.',
      },
    ],
    relatedTools: ['age-calculator', 'unit-converter', 'percentage-calculator', 'date-difference-calculator'],
  },
  {
    slug: 'date-difference-calculator',
    title: 'Date Difference & Duration Calculator',
    description: 'Calculate days between dates. Get exact duration in days, weeks, months, business days (working days), and weekends with holiday exclusion.',
    category: 'calculators',
    primaryKeyword: 'date difference calculator',
    keywords: ['date difference calculator', 'days between dates', 'calculate days between two dates', 'business days calculator', 'working days calculator'],
    icon: 'Calendar',
    isPopular: true,
    content: {
      whatItIs: 'The Date Difference & Duration Calculator computes the precise elapsed time between any two calendar dates. It provides total days, business working days (excluding Saturdays and Sundays), total weekends, weeks, and month-day combinations.',
      howToUse: [
        'Select your Start Date and End Date.',
        'Optionally check "Include end date in calculation" or "Exclude weekends (Business days only)".',
        'Review the detailed duration breakdown in days, weeks, months, and hours.',
        'Copy the result or use quick preset buttons (Next Week, Next Month, Year to Date).',
      ],
      useCases: [
        'Calculating project deadlines, sprint durations, and milestone timelines in business management.',
        'Determining exact legal statutory notice periods and contract validity dates.',
        'Counting down the number of days until vacations, weddings, or exams.',
      ],
      tips: [
        'Standard business days count Monday through Friday, skipping Saturday and Sunday.',
        'Leap years are automatically calculated to give 100% calendar accuracy.',
        'Check "Include End Date" if you want to count the final day as a full working day.',
      ],
    },
    faq: [
      {
        question: 'How do you calculate business days between two dates?',
        answer: 'The calculator iterates through each day in the date range and excludes Saturdays and Sundays, returning only Monday through Friday.',
      },
      {
        question: 'Does it support leap years?',
        answer: 'Yes, February 29th in leap years is properly accounted for in all calculations.',
      },
      {
        question: 'Can I calculate negative date ranges (going backwards)?',
        answer: 'Yes! If the end date is earlier than the start date, the calculator indicates that the date has already passed.',
      },
      {
        question: 'Can I convert the difference into weeks and hours?',
        answer: 'Yes, the results card provides the duration converted into total days, weeks, months, hours, and minutes.',
      },
      {
        question: 'Is any date information saved?',
        answer: 'No, all date arithmetic is handled strictly in your browser runtime.',
      },
    ],
    relatedTools: ['age-calculator', 'timestamp-converter', 'stopwatch-timer', 'cron-expression-explainer'],
  },
  {
    slug: 'unit-converter',
    title: 'Universal Unit Converter',
    description: 'Convert units of Length, Weight/Mass, Temperature, Speed, Volume, Area, Time, and Digital Data Storage. Real-time multi-unit conversion.',
    category: 'calculators',
    primaryKeyword: 'universal unit converter online',
    keywords: ['unit converter', 'convert units', 'length converter', 'temperature converter', 'weight converter', 'data storage converter'],
    icon: 'Scale',
    isPopular: true,
    content: {
      whatItIs: 'The Universal Unit Converter converts measurements across Length, Mass/Weight, Temperature, Speed, Volume, Area, Time, and Digital Storage. Enter a value in any unit to see instant conversions across all equivalent units simultaneously.',
      howToUse: [
        'Select the measurement category (e.g. Length, Weight, Temperature, Data Storage).',
        'Enter your number and choose the "From" unit.',
        'Select your "To" unit or view the synchronized table of all equivalent units.',
        'Copy the converted value with one click.',
      ],
      useCases: [
        'Translating recipes between Metric (grams, milliliters) and US Imperial (ounces, cups).',
        'Converting architectural dimensions (meters, feet, inches) for engineering and DIY projects.',
        'Translating digital file sizes (megabytes, gigabytes, terabytes, mebibytes) for cloud storage.',
      ],
      tips: [
        'Remember that temperature conversion uses scaling formulas (F = C * 9/5 + 32), not simple multiplicative factors.',
        'In computing: 1 GB (decimal) = 1,000 MB, whereas 1 GiB (binary) = 1,024 MiB.',
        'Use the copy button to copy full-precision results to prevent rounding errors in scientific calculations.',
      ],
    },
    faq: [
      {
        question: 'Which categories are supported by the unit converter?',
        answer: 'Length, Mass/Weight, Temperature, Digital Data Storage, Speed, Area, Volume, and Time.',
      },
      {
        question: 'How accurate are the conversion constants?',
        answer: 'All conversions utilize official NIST and international standard definitions with floating-point precision up to 12 decimal places.',
      },
      {
        question: 'Does it convert Celsius to Fahrenheit and Kelvin?',
        answer: 'Yes! Instant two-way conversions between Celsius (°C), Fahrenheit (°F), and Kelvin (K) are supported.',
      },
      {
        question: 'Can I convert Megabytes to Gigabytes?',
        answer: 'Yes, both decimal (KB, MB, GB, TB) and binary (KiB, MiB, GiB, TiB) storage standards are available.',
      },
      {
        question: 'Does the converter require an internet connection?',
        answer: 'No, all conversion formulas execute client-side in your web browser.',
      },
    ],
    relatedTools: ['bmi-calculator', 'percentage-calculator', 'currency-formatter', 'date-difference-calculator'],
  },
  {
    slug: 'currency-formatter',
    title: 'Currency Format & Number Helper',
    description: 'Format monetary numbers into international currency strings (USD, EUR, GBP, INR, JPY) with symbols, abbreviations, and word transliteration.',
    category: 'calculators',
    primaryKeyword: 'currency format helper',
    keywords: ['currency formatter', 'format money', 'currency format online', 'number to currency', 'currency symbol converter', 'inr lakh crore formatter'],
    icon: 'DollarSign',
    isPopular: false,
    content: {
      whatItIs: 'The Currency Format & Number Helper converts raw numerical amounts into beautifully localized currency representations adhering to international standards (Intl.NumberFormat). Format across USD ($), EUR (€), GBP (£), INR (₹), JPY (¥), AUD, CAD, and view compact suffixes ($1.5M).',
      howToUse: [
        'Enter a numerical amount into the input field.',
        'Select the target currency and locale formatting style.',
        'Toggle options: Decimals, Compact Notation (K, M, B), or Indian Lakh/Crore grouping.',
        'Copy the formatted string or view the number written out in words.',
      ],
      useCases: [
        'Formatting pricing tables and financial reports for international e-commerce platforms.',
        'Formatting Indian Rupee amounts using Lakh and Crore separator rules.',
        'Verifying correct localized decimal commas and thousand dots for European currencies.',
      ],
      tips: [
        'In the US and UK, commas separate thousands and dots separate decimals ($1,234.56).',
        'In many European countries, dots separate thousands and commas separate decimals (1.234,56 €).',
        'In India, the first three digits are grouped, followed by groups of two digits (₹1,00,000).',
      ],
    },
    faq: [
      {
        question: 'Does this tool fetch live exchange rates?',
        answer: 'This is a formatting utility focused on typography, locale standards, and symbol placement; it does not perform real-time FX trading conversions.',
      },
      {
        question: 'Does it support compact notation like $1.2M?',
        answer: 'Yes! You can toggle compact display to view amounts formatted with standard suffixes (K, M, B).',
      },
      {
        question: 'How does it handle Indian Lakhs and Crores?',
        answer: 'When selecting INR or the Indian numbering system, digits are grouped according to the traditional 3,2,2 format (e.g. ₹12,34,567.89).',
      },
      {
        question: 'Can I copy formatted strings directly into JavaScript or CSS?',
        answer: 'Yes, copy buttons are provided for each formatted locale string.',
      },
      {
        question: 'Is any financial data transmitted to servers?',
        answer: 'No. The JavaScript Intl API processes everything in your browser memory.',
      },
    ],
    relatedTools: ['number-to-words', 'gst-calculator', 'emi-calculator', 'percentage-calculator'],
  },
  {
    slug: 'tip-calculator',
    title: 'Tip Calculator & Bill Splitter',
    description: 'Calculate restaurant tips and split bills evenly among multiple people. Customize tip percentage (15%, 18%, 20%), tax handling, and round totals.',
    category: 'calculators',
    primaryKeyword: 'tip calculator and bill splitter',
    keywords: ['tip calculator', 'bill splitter', 'split bill', 'calculate tip', 'restaurant tip calculator', 'gratuity calculator'],
    icon: 'Utensils',
    isPopular: false,
    content: {
      whatItIs: 'The Tip Calculator & Bill Splitter calculates gratuities and divides restaurant or event bills evenly among party members. Configure standard tip percentages (10%, 15%, 18%, 20%, 25%), calculate tips before or after tax, and round up totals for simple cash settlement.',
      howToUse: [
        'Enter the total Bill Amount.',
        'Select or enter a custom Tip Percentage (e.g. 15%, 18%, 20%).',
        'Enter the number of people splitting the bill.',
        'View the Tip Amount, Total Bill with Tip, and exact Share Per Person.',
      ],
      useCases: [
        'Splitting restaurant checks, dining bills, and bar tabs with friends.',
        'Calculating gratuities for personal services (taxis, barbers, delivery couriers).',
        'Rounding totals to the nearest whole dollar for effortless cash payment.',
      ],
      tips: [
        'Standard US dining tipping etiquette is typically 15%–20% for good table service.',
        'Tipping on the pre-tax bill amount is standard practice to avoid paying a tip on taxes.',
        'Use the "Round Up" feature to make cash splits clean and eliminate loose change.',
      ],
    },
    faq: [
      {
        question: 'Should I tip on the pre-tax or post-tax bill?',
        answer: 'Standard etiquette recommends tipping on the pre-tax subtotal, as taxes are government fees rather than part of the hospitality service.',
      },
      {
        question: 'Can I round the total bill to the nearest dollar?',
        answer: 'Yes, toggle the "Round Up" option to round the grand total or individual splits to whole dollar increments.',
      },
      {
        question: 'How do you calculate tip per person?',
        answer: 'The total bill with tip is divided by the number of paying guests, ensuring an exact equal contribution.',
      },
      {
        question: 'What is a customary tip for food delivery?',
        answer: 'In the US, $3 to $5 or 15%–20% (whichever is greater) is standard for delivery drivers.',
      },
      {
        question: 'Does the calculator save our bill amounts?',
        answer: 'No. The arithmetic runs client-side on your device and is discarded when you leave the page.',
      },
    ],
    relatedTools: ['percentage-calculator', 'gst-calculator', 'currency-formatter', 'emi-calculator'],
  },
];
