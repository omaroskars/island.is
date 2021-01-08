import { defineMessages, MessageDescriptor } from 'react-intl'

export const m = defineMessages({
  applicationName: {
    id: 'pl.application:application.name',
    defaultMessage: 'Umsókn um fæðingarorlof',
    description: 'Some description',
  },
  applicantSection: {
    id: 'pl.application:applicant.section',
    defaultMessage: 'Almennar upplýsingar',
    description: 'Applicant information',
  },
  externalDataSubSection: {
    id: 'pl.application:externalData.subSection',
    defaultMessage: 'Sækja gögn',
    description: 'External Data',
  },
  existingParentalLeavesTitle: {
    id: 'pl.application:existingParentalLeaves.title',
    defaultMessage: 'Núverandi umsóknir um fæðingarorlof',
    description: 'Existing parental leave applications',
  },
  existingParentalLeavesSubTitle: {
    id: 'pl.application:existingParentalLeaves.subtitle',
    defaultMessage:
      'Þessar umsóknir gætu verið fyrir önnur börnin þín, eða útistandandi fæðingarorlofsumsókn sem hitt foreldrið hefur gert fyrir ófætt barn ykkar.',
    description:
      'These applications could be for already born children, or an application made by you or the other parent for parental leave for your unborn child.',
  },
  otherParentSubSection: {
    id: 'pl.application:otherParent.subSection',
    defaultMessage: 'Hitt foreldrið',
    description: 'The other parent',
  },
  otherParentDescription: {
    id: 'pl.application:otherParent.description',
    defaultMessage:
      'Sjálfgefið er skráður maki. Ef það er ekkert annað foreldri í myndinni að þessu sinni, þá þarf ekki að fylla þetta út',
    description:
      'This person is by default your spouse or partner. If there is no other parent in the picture at this point in time, leave this empty.',
  },
  otherParentTitle: {
    id: 'pl.application:otherParent.title',
    defaultMessage: 'Vinsamlegast staðfestu hitt foreldrið (ef það á við)',
    description: 'Please confirm the other parent (if any)',
  },
  otherParentName: {
    id: 'pl.application:otherParent.name',
    defaultMessage: 'Nafn hins foreldrisins',
    description: 'Name of other parent',
  },
  otherParentID: {
    id: 'pl.application:otherParent.id',
    defaultMessage: 'Kennitala hins foreldrisins',
    description: 'National ID of other parent',
  },
  noOtherParent: {
    id: 'pl.application:otherParent.none',
    defaultMessage: 'Ég vil ekki staðfesta hitt foreldrið að svo stöddu',
    description: 'I do not want to confirm the other parent at this time.',
  },
  otherParentOption: {
    id: 'pl.application:otherParent.option',
    defaultMessage: 'Hitt foreldrið er:',
    description: 'The other parent is:',
  },
  otherParentSpouse: {
    id: 'pl.application:otherParent.spouse',
    defaultMessage: 'Hitt foreldrið er {spouseName} (kt. {spouseId})',
    description: `The other parent is {spouseName} (kt. {spouseId})`,
  },
  paymentInformationSubSection: {
    id: 'pl.application:payment.information.subsection',
    defaultMessage: 'Greiðsluupplýsingar',
    description: 'Payment Information',
  },
  paymentInformationName: {
    id: 'pl.application:payment.information.name',
    defaultMessage: 'Er allt eins og það á að vera?',
    description: 'Is everything how it is supposed to be?',
  },
  paymentInformationBank: {
    id: 'pl.application:payment.information.bank',
    defaultMessage: 'Banki',
    description: 'Bank',
  },
  pensionFund: {
    id: 'pl.application:payment.information.pensionfund',
    defaultMessage: 'Lífeyrissjóður',
    description: 'Pension fund (optional)',
  },
  union: {
    id: 'pl.application:payment.information.union',
    defaultMessage: 'Stéttarfélag (valfrjálst)',
    description: 'Union (optional)',
  },
  privatePensionFund: {
    id: 'pl.application:payment.information.privatePensionFund',
    defaultMessage: 'Séreignarsjóður',
    description: 'Private pension fund',
  },
  privatePensionFundName: {
    id: 'pl.application:payment.information.privatePensionFund.name',
    defaultMessage: 'Óskarðu eftir því að greiða í séreignarsjóð?',
    description: 'Do you wish to pay to a private pension fund?',
  },
  privatePensionFundRatio: {
    id: 'pl.application:payment.information.privatePensionFund.ratio',
    defaultMessage: 'Séreignarsjóður %',
    description: 'Private pension fund %',
  },
  privatePensionFundDescription: {
    id: 'pl.application:payment.information.privatePensionFund.description',
    defaultMessage:
      'Vinsamlegast athugaðu að Fæðingarorlofssjóður greiðir ekki mótframlag í séreignarsjóð.',
    description:
      'Note that Department of Parental Leave does not pay counter-contribution.',
  },
  yesOptionLabel: {
    id: 'pl.application:yes.option.label',
    defaultMessage: 'Já',
    description: 'Yes',
  },
  noOptionLabel: {
    id: 'pl.application:no.option.label',
    defaultMessage: 'Nei',
    description: 'No',
  },

  rightsSection: {
    id: 'pl.application:rights.section',
    defaultMessage: 'Réttindi til fæðingarorlofs',
    description: 'Parental leave rights',
  },
  yourRights: {
    id: 'pl.application:rights.section',
    defaultMessage: 'Réttindin þín',
    description: 'Your rights',
  },
  yourRightsInMonths: {
    id: 'pl.application:rights.months',
    defaultMessage: '{months} mánuðir sjálfstæður réttur',
    description: '{months} months individual rights',
  },
  yourRightsInMonthsAndDay: {
    id: 'pl.application:rights.months',
    defaultMessage: '{months} mánuðir og {day} dagur sjálfstæður réttur',
    description: '{months} months and {day} day individual rights',
  },
  yourRightsInMonthsAndDays: {
    id: 'pl.application:rights.months',
    defaultMessage: '{months} mánuðir og {day} dagar sjálfstæður réttur',
    description: '{months} months {day} days individual rights',
  },
  theseAreYourRights: {
    id: 'pl.application:these.are.your.rights',
    defaultMessage: 'Þetta eru réttindin þín',
    description: 'These are your rights',
  },
  rightsDescription: {
    id: 'pl.application:rights.description',
    defaultMessage:
      'Sjálfstæður réttur hvers foreldris er sex mánuðir í fæðingarorlof, en annað foreldrið má yfirfæra allt að einn mánuð af sínum réttindum yfir á hitt foreldrið.',
    description:
      'Both parents have 6 months, but can transfer to 1 month to the other parent.',
  },
  requestRightsName: {
    id: 'pl.application:request.rights.name',
    defaultMessage:
      'Óskarðu eftir að fá allt að einn mánuð af réttindum hins foreldrisins yfirfært yfir á þig?',
    description: 'Do you want to request extra time from the other parent?',
  },
  day: {
    id: 'pl.application:day',
    defaultMessage: 'dagur',
    description: 'day',
  },
  days: {
    id: 'pl.application:days',
    defaultMessage: 'dagar',
    description: 'days',
  },
  month: {
    id: 'pl.application:month',
    defaultMessage: 'mánuður',
    description: 'month',
  },
  months: {
    id: 'pl.application:months',
    defaultMessage: 'mánuðir',
    description: 'months',
  },
  requestRightsDaysTitle: {
    id: 'pl.application:request.rights.daysTitle',
    defaultMessage: 'Hversu marga daga viltu biðja um?',
    description: 'How many days would you like to request?',
  },
  requestRightsDay: {
    id: 'pl.application:request.rights.months',
    defaultMessage: '{day} dagur óskað eftir af rétti hins foreldrisins',
    description: "{day} day requested from the other parent's rights",
  },
  requestRightsDays: {
    id: 'pl.application:request.rights.months',
    defaultMessage: '{day} dagar óskað eftir af rétti hins foreldrisins',
    description: "{day} days requested from the other parent's rights",
  },
  requestRightsMonths: {
    id: 'pl.application:request.rights.months',
    defaultMessage: 'óskað eftir af rétti hins foreldrisins',
    description: "1 month requested from the other parent's rights",
  },
  monthsTotal: {
    id: 'pl.application:months.total',
    defaultMessage: 'Samtals: {months} mánuðir *',
    description: 'Total: {months} months *',
  },
  rangeStartDate: {
    id: 'pl.application:range.startDate',
    defaultMessage: 'Upphafsdagur þinn er:',
    description: 'Your start day is:',
  },
  rangeEndDate: {
    id: 'pl.application:range.endDate',
    defaultMessage: 'Lokadagur þinn er:',
    description: 'Your end day is:',
  },
  rightsTotalSmallPrint: {
    id: 'pl.application:months.total.smallprint',
    defaultMessage:
      '* Hitt foreldrið þarf að samþykkja beiðni þína ef þú óskaðir eftir\n' +
      '            yfirfærslu af réttindum þess til fæðingarorlofs. Ef hitt foreldrið\n' +
      '            neitar beiðni þinni, þá þarftu að breyta umsókn þinni aftur.',
    description:
      ' * The other parent has to approve if you requested extra month from\n' +
      '            their share. If they reject your request, you will have to change\n' +
      '            your application.',
  },
  requestRightsDescription: {
    id: 'pl.application:request.rights.description',
    defaultMessage:
      'Hitt foreldrið má yfirfæra allt að 45 dagar af réttindum þess yfir á þig. Kjósir þú að óska eftir þessu, þá þarf hitt foreldrið að samþykkja beiðni þína.',
    description: 'The other parent can transfer up to 45 days of their rights',
  },
  requestRightsYes: {
    id: 'pl.application:request.rights.yes',
    defaultMessage:
      'Já, ég óska eftir yfirfærslu á réttindum frá hinu foreldrinu',
    description: 'Yes, I want to request extra time from my partner',
  },
  requestRightsNo: {
    id: 'pl.application:request.rights.no',
    defaultMessage: 'Nei, ég mun einungis nota mín réttindi',
    description: 'No, I will only use my rights',
  },
  giveRightsName: {
    id: 'pl.application:give.rights.name',
    defaultMessage:
      'Viltu yfirfæra allt að mánuð af þínum réttindum yfir á hitt foreldrið?',
    description:
      'Do you want to transfer up to one month of your parental leave rights to the other parent?',
  },
  giveRightsDaysTitle: {
    id: 'pl.application:request.rights.daysTitle',
    defaultMessage: 'Hve marga daga viltu gefa?',
    description: 'How many days would you like to give?',
  },
  giveRightsDescription: {
    id: 'pl.application:give.rights.description',
    defaultMessage:
      'Þú getur yfirfært allt að 45 dagar af þínum réttindum yfir á hitt foreldrið',
    description: 'You can give the other parent up to 45 days of your rights',
  },
  giveRightsDay: {
    id: 'pl.application:request.rights.months',
    defaultMessage: '{day} dagur yfirfærður til hins foreldrisins',
    description: '{day} day given to the other parent',
  },
  giveRightsDays: {
    id: 'pl.application:request.rights.months',
    defaultMessage: '{day} dagar yfirfærður til hins foreldrisins',
    description: '{day} days given to the other parent',
  },
  giveRightsMonths: {
    id: 'pl.application:give.rights.months',
    defaultMessage: '1 mánuður yfirfærður til hins foreldrisins',
    description: '1 month given to the other parent',
  },
  giveRightsYes: {
    id: 'pl.application:give.rights.yes',
    defaultMessage:
      'Já, ég vil yfirfæra allt að 45 dagar af mínum réttindum til hins foreldrisins',
    description: 'Yes, I wish to give one of my months to the other parent',
  },
  giveRightsNo: {
    id: 'pl.application:give.rights.no',
    defaultMessage: 'Nei, ég vil fullnýta réttindin mín',
    description: 'No, I want to keep my rights to myself',
  },
  rightsSummarySubSection: {
    id: 'pl.application:rights.summary.subsection',
    defaultMessage: 'Réttindi - samantekt',
    description: 'Rights summary',
  },
  rightsSummaryName: {
    id: 'pl.application:rights.summary.name',
    defaultMessage: 'Áætluð mánaðarleg útborgun í fæðingarorlofinu þínu',
    description: 'Estimated monthly salary for your parental leave',
  },
  introductionProvider: {
    id: 'pl.application:introduction.provider',
    defaultMessage: 'Sækja gögn',
    description: 'Some description',
  },
  dateOfBirthTitle: {
    id: 'pl.application:dateOfBirth.title',
    defaultMessage: 'Fæðingardagur',
    description: 'Birth date',
  },
  userProfileInformationTitle: {
    id: 'pl.application:userprofile.title',
    defaultMessage: 'Netfang og símanúmer úr þínum stillingum',
    description: 'Your user profile information',
  },
  userProfileInformationSubTitle: {
    id: 'pl.application:userprofile.subtitle',
    defaultMessage:
      'Til þess að auðvelda umsóknarferlið er gott að hafa stillt netfang og símanúmer á mínum síðum',
    description:
      'In order to apply for this application we need your email and phone number',
  },
  expectedDateOfBirthTitle: {
    id: 'pl.application:expectedDateOfBirth.title',
    defaultMessage: 'Áætlaður fæðingardagur',
    description: 'Expected birth date',
  },
  expectedDateOfBirthSubtitle: {
    id: 'pl.application:expectedDateOfBirth.subtitle',
    defaultMessage: 'Staðfesting á að það sé yfir höfuð barn á leiðinni',
    description: 'Some description',
  },
  salaryTitle: {
    id: 'pl.application:salary.title',
    defaultMessage: 'Laungreiðendaskrá',
    description: 'Some description',
  },
  salaryLabelYear: {
    id: 'pl.application:salary.label.year',
    defaultMessage: 'Ár',
    description: 'Year',
  },
  salaryLabelMonth: {
    id: 'pl.application:salary.label.month',
    defaultMessage: 'Mánuður',
    description: 'Month',
  },
  salaryLabelPensionFund: {
    id: 'pl.application:salary.label.pensionfund',
    defaultMessage: 'Lífeyrissjóður',
    description: 'Pension fund',
  },
  salaryLabelTax: {
    id: 'pl.application:salary.label.tax',
    defaultMessage: 'Skattur',
    description: 'Tax',
  },
  salaryLabelPaidAmount: {
    id: 'pl.application:salary.label.paidamount',
    defaultMessage: 'Útborgun',
    description: 'Paid amount',
  },
  salaryLabelShowMore: {
    id: 'pl.application:salary.label.seeMore',
    defaultMessage: 'Sjá meira',
    description: 'See more',
  },
  salaryLabelShowLess: {
    id: 'pl.application:salary.label.seeLess',
    defaultMessage: 'Sjá minna',
    description: 'See less',
  },
  usageSubsection: {
    id: 'pl.application:usage.subsection',
    defaultMessage: 'Ráðstöfun',
    description: 'Some description',
  },
  usage: {
    id: 'pl.application:usage',
    defaultMessage: 'Hvað ætlar þú að nýta þér marga mánuði í fæðingarorlof?',
    description: 'Some description',
  },
  calculationsSubsection: {
    id: 'pl.application:calculations.subsection',
    defaultMessage: 'Útreikningur',
    description: 'Some description',
  },
  periods: {
    id: 'pl.application:periods',
    defaultMessage: 'Viltu breyta eða skipta upp tímabilinu?',
    description: 'Some description',
  },
  periodsSection: {
    id: 'pl.application:periods.section',
    defaultMessage: 'Tilhögun fæðingarorlofs',
    description: 'Leave periods',
  },
  periodsImageTitle: {
    id: 'pl.application:periods.image.title',
    defaultMessage: 'Nú skulum við skipuleggja tíma þinn með barninu þínu',
    description: "Let's plan your time with the baby",
  },
  firstPeriodName: {
    id: 'pl.application:first.period.name',
    defaultMessage: 'Fyrsta tímabil orlofsins',
    description: 'First leave period',
  },
  periodAllAtOnce: {
    id: 'pl.application:period.all.at.once',
    defaultMessage: 'Viltu taka fæðingarorlofið allt í einu lagi?',
    description: 'Do you plan to take your leave all at once?',
  },
  periodAllAtOnceDescription: {
    id: 'pl.application:period.all.at.once.description',
    defaultMessage:
      'Sumir óska þess að taka allt fæðingarorlofið í einu lagi, meðan aðrir kjósa að skipta því upp í nokkur tímabil.',
    description:
      'Some people choose to take the full leave all at once, while others choose to split their leave into separate periods.',
  },
  periodAllAtOnceYes: {
    id: 'pl.application:period.all.at.once.yes',
    defaultMessage: 'Já, ég vil taka fæðingarorlofið allt í einu lagi.',
    description: 'Yes, I plan to take my leave all at once',
  },
  periodAllAtOnceNo: {
    id: 'pl.application:period.all.at.once.no',
    defaultMessage:
      'Nei, ég vil skipta fæðingarorlofinu mínu upp í fleiri tímabil og/eða teygja það yfir lengra tímabil.',
    description:
      'I want to customize my leave into multiple periods and/or to stretch it out over time at less than 100% time off.',
  },
})

type MessageDir = Record<string, Record<string, MessageDescriptor>>

export const mm: MessageDir = {
  applicant: defineMessages({
    subSection: {
      id: 'pl.application:applicant.subSection',
      defaultMessage: 'Netfang og símanúmer',
      description: 'Email and phone number',
    },
    title: {
      id: 'pl.application:applicant.title',
      defaultMessage: 'Er þetta réttur sími og netfang?',
      description: 'What is your email and phone number?',
    },
    description: {
      id: 'pl.application:applicant.description',
      defaultMessage: 'Vinsamlegast breyttu ef þetta er ekki rétt.',
      description: 'Please make changes if this is invalid.',
    },
    email: {
      id: 'pl.application:applicant.email',
      defaultMessage: 'Netfang',
      description: 'Email',
    },
    phoneNumber: {
      id: 'pl.application:applicant.phoneNumber',
      defaultMessage: 'Símanúmer',
      description: 'Phone number',
    },
  }),
  errors: defineMessages({
    loading: {
      id: 'pl.application:errors.loading',
      defaultMessage: 'Úps! Eitthvað fór úrskeiðis',
      description: 'Oops! Something went wrong',
    },
    requiredAnswer: {
      id: 'pl.application:errors.required.answer',
      defaultMessage:
        'Þú verður að svara þessari spurningu til að halda áfram.',
      description: 'You need to answer this question to continue.',
    },
  }),
  personalAllowance: defineMessages({
    useYours: {
      id: 'pl.application:use.personal.allowance',
      defaultMessage: 'Viltu nýta persónuafsláttinn þinn?',
      description: 'Do you wish to use your personal allowance',
    },
    useFromSpouse: {
      id: 'pl.application:use.personal.allowance.spouse',
      defaultMessage: 'Viltu nýta persónuafsláttinn maka þíns?',
      description:
        'Do you wish to use the personal allowance from your spouse?',
    },
    title: {
      id: 'pl.application:personal.allowance.title',
      defaultMessage: 'Persónuafsláttur',
      description: 'Personal Discount',
    },
    description: {
      id: 'pl.application:personal.allowance.description',
      defaultMessage:
        'Hægt er að biðja um að nýta eins mikinn persónuafslátt og þú mögulega átt rétt á, eða stimpla inn ákveðið hlutfall.',
      description: 'Translation needed',
    },
    spouseTitle: {
      id: 'pl.application:personal.allowance.from.spouse.title',
      defaultMessage: 'Beiðni um persónuafslátt frá maka',
      description: 'Personal Discount from spouse',
    },
    spouseDescription: {
      id: 'pl.application:personal.allowance.from.spouse.description',
      defaultMessage:
        'Makinn þinn fær tilkynningu og þarf að samþykkja þessa beiðni. Hægt er að biðja um að nýta eins mikinn persónuafslátt og þú mögulega átt rétt á, eða stimpla inn ákveðið hlutfall.',
      description: 'Translation needed',
    },
    useAsMuchAsPossible: {
      id: 'pl.application:personal.allowance.useAsMuchAsPossible',
      defaultMessage:
        'Viltu nota eins mikið af persónuafslættinum og þú hefur rétt á?',
      description: 'Do you wish to use as much personal allowance as possible?',
    },
    manual: {
      id: 'pl.application:personal.allowance.manual',
      defaultMessage: 'Hvað viltu nota hátt hlutfall af persónuafslættinum?',
      description: 'What percentage do you want to use?',
    },
    zeroToHundred: {
      id: 'pl.application:personal.allowance.zeroToHundred',
      defaultMessage: 'Stimplaðu inn tölu á bilinu 0-100',
      description: 'Type a number from 0 to 100',
    },
  }),
  leavePlan: defineMessages({
    subSection: {
      id: 'pl.application:periods.subsection',
      defaultMessage: 'Bættu við fleiri tímabilum',
      description: 'Add more periods',
    },
    title: {
      id: 'pl.application:leave.plan.title',
      defaultMessage: 'Hér er tilhögun fæðingarorlofsins þíns',
      description: 'Here is your current leave plan',
    },
    description: {
      id: 'pl.application:leave.plan.description',
      defaultMessage:
        'Þetta eru þau tímabil sem þú hefur nú þegar valið til að haga fæðingarorlofinu þínu. Ef hitt foreldrið hefur samþykkt að deila upplýsingum um tilhögun fæðingarorlofsins síns með þér, þá sjást þau tímabil einnig.',
      description:
        'These are your already selected parental leave periods. If the other parent has agreed to share their period leave information, then those period leaves are visible below.',
    },
    addAnother: {
      id: 'pl.application:periods.add.another',
      defaultMessage: 'Bættu við öðru tímabili',
      description: 'Add another period',
    },
    change: {
      id: 'pl.application:periods.change',
      defaultMessage: 'Breyta tilhögun fæðingarorlofs',
      description: 'Change the periods',
    },
  }),
  firstPeriodStart: defineMessages({
    title: {
      id: 'pl.application:periods.first.period.title',
      defaultMessage: 'Hvenær viltu hefja fæðingarorlofið?',
      description: 'When do you want to start your parental leave',
    },
    description: {
      id: 'pl.application:periods.first.period.description',
      defaultMessage:
        'Þú mátt kjósa að byrja á áætluðum fæðingardegi, eða ákveðinni dagsetningu. Athugaðu að ekki er hægt að nýta réttindi til fæðingarorlofs 18 mánuðum eftir fæðingu barnsins.',
      description:
        'You can choose to start on the date of birth, or on a specific date. Please note, that your rights end 18 months after the date of birth.',
    },
    dateOfBirthOption: {
      id: 'pl.application:periods.first.period.dateOfBirth',
      defaultMessage: 'Ég vil byrja á áætluðum fæðingardegi',
      description: 'I will start from the date of birth',
    },
    dateOfBirthOptionTooltip: {
      id: 'pl.application:periods.first.period.dateOfBirth.tooltip',
      defaultMessage:
        'Ef barnið fæðist á annarri dagsetningu en áætlað er, þá mun fæðingarorlofið og lengd þess aðlagast raunverulegum fæðingardegi barnsins.',
      description:
        'If the child is born on another date than the expected date of birth, the parental leave and its duration will adjust to the real date of birth',
    },
    specificDateOption: {
      id: 'pl.application:periods.first.period.specificDate',
      defaultMessage: 'Ég vil byrja á ákveðinni dagsetningu',
      description: 'I will start on a specific date',
    },
    specificDateOptionTooltip: {
      id: 'pl.application:periods.first.period.specificDate.tooltip',
      defaultMessage:
        'Ef barnið fæðist á annarri dagsetningu en áætlað er, þá mun fæðingarorlofið og lengd þess EKKI aðlagast út frá raunverulegum fæðingardegi barnsins ef þessi valmöguleiki er valinn.',
      description:
        'If the child is born on another date than the expected date of birth, the parental leave and its duration will !!!!NOT!!!! adjust to the real date of birth',
    },
  }),
  endDate: defineMessages({
    title: {
      id: 'pl.application:end.date.title',
      defaultMessage: 'Vinsamlegast veldu lokadag tímabilsins',
      description: 'Please pick the end date',
    },
    description: {
      id: 'pl.application:end.date.description',
      defaultMessage:
        'Athugaðu að ekki er hægt að nýta réttindi til fæðingarorlofs 18 mánuðum eftir fæðingu barnsins. Fæðingarorlof getur styst verið tvær vikur.',
      description:
        'Please note, that your parental leave rights end 18 months after the date of birth. A parental leave period can be no shorter than two weeks.',
    },
    label: {
      id: 'pl.application:end.date.label',
      defaultMessage: 'Lokadagur',
      description: 'End date',
    },
    placeholder: {
      id: 'pl.application:end.date.placeholder',
      defaultMessage: 'Veldu lokadag tímabilsins',
      description: 'Pick the end date',
    },
  }),
  startDate: defineMessages({
    title: {
      id: 'pl.application:start.date.title',
      defaultMessage: 'Vinsamlegast veldu upphafsdag tímabilsins',
      description: 'Please pick the start date',
    },
    description: {
      id: 'pl.application:start.date.description',
      defaultMessage:
        'Athugaðu að ekki er hægt að nýta réttindi til fæðingarorlofs 18 mánuðum eftir fæðingu barnsins.',
      description:
        'Please note, that your parental leave rights end 18 months after the date of birth',
    },
    label: {
      id: 'pl.application:start.date.label',
      defaultMessage: 'Upphafsdagur',
      description: 'Start date',
    },
    placeholder: {
      id: 'pl.application:start.date.placeholder',
      defaultMessage: 'Veldu upphafsdaginn',
      description: 'Pick the start date',
    },
  }),
  duration: defineMessages({
    title: {
      id: 'pl.application:duration.title',
      defaultMessage: 'Vinsamlegast staðfestu lengd tímabilsins',
      description: 'Please confirm your leave duration',
    },
    description: {
      id: 'pl.application:duration.description',
      defaultMessage:
        'Hægt er að velja lengd tímabilsins í fjölda mánaða, eða velja ákveðna endadagsetningu. Fæðingarorlof getur styst verið tvær vikur í senn',
      description: 'Add translation',
    },
    monthsOption: {
      id: 'pl.application:duration.months.option',
      defaultMessage: 'Í fjölda mánaða',
      description: 'A certain duration in months',
    },
    specificDateOption: {
      id: 'pl.application:duration.specific.date.option',
      defaultMessage: 'Fram að ákveðinni dagsetningu',
      description: 'Until a specific date',
    },
    monthsDescription: {
      id: 'pl.application:duration.months.description',
      defaultMessage:
        'Hægt er að dreifa rétti sínum yfir lengra tímabil en það hefur bein áhrif á greiðslur til þín úr fæðingarorlofssjóði. Dragðu stikuna til að stilla lengd tímabilsins ímánuðum.',
      description: 'Add translation',
    },
    paymentsRatio: {
      id: 'pl.application:duration.payments.ratio',
      defaultMessage:
        'Fyrir svona langt tímabil fást greiðslur að hlutfalli af hámarksréttindum þínum: ',
      description: 'For this length of time you will get payments up to',
    },
  }),
  employer: defineMessages({
    subSection: {
      id: 'pl.application:employer.subsection',
      defaultMessage: 'Vinnuveitandi',
      description: 'Employer',
    },
    title: {
      id: 'pl.application:employer.title',
      defaultMessage: 'Hver er vinnuveitandi þinn?',
      description: 'Who is your employer?',
    },
    description: {
      id: 'pl.application:employer.description',
      defaultMessage:
        'Vinnuveitandinn þinn þarf að samþykkja tilhögun fæðingarorlofsins þíns. ' +
        'Þegar þú hefur sent umsóknina inn mun verða sendur vefpóstur á þetta netfang hér fyrir neðan. ' +
        'Viðtakandi vefpóstsins mun fá aðgang að umsókninni, en einungis sjá upplýsingar sem varða tilhögun fæðingarorlofs.' +
        'Ef vinnuveitandinn þinn hafnar umsókninni, þá fer umsóknin aftur á ákveðinn byrjunarreit, þar sem þú getur sótt um aftur.',
      description: 'Add translation',
    },
    email: {
      id: 'pl.application:employer.email',
      defaultMessage: 'Netfang vinnuveitanda',
      description: 'Employer email',
    },
    emailConfirm: {
      id: 'pl.application:employer.email.confirm',
      defaultMessage: 'Staðfestu netfang vinnuveitanda',
      description: 'Confirm employer email',
    },
  }),
  selfEmployed: defineMessages({
    title: {
      id: 'pl.application:selfEmployed.title',
      defaultMessage: 'Ertu sjálfstætt starfandi?',
      description: 'Are you self employed?',
    },
    description: {
      id: 'pl.application:selfEmployed.description',
      defaultMessage:
        'Sjáflstætt starfandi einstaklingar þurfa að skila staðfestingu á lækkun á reiknuðu endurgjaldi ef við á.',
      description: 'Add translation',
    },
  }),
  ratio: defineMessages({
    title: {
      id: 'pl.application:ratio.title',
      defaultMessage:
        'Hversu hátt hlutfall viltu að fæðingarorlofið sé af starfshlutfalli þínu?',
      description: 'What percent off will you take for this period?',
    },
    description: {
      id: 'pl.application:ratio.description',
      defaultMessage:
        '100% þýðir að þú sért í fullu fæðingarorlofi. Lægra hlutfall hefur bein áhrif á greiðslur til þín úr fæðingarorlofssjóði. Sumir velja 50% fæðingarorlof á móti 50% starfi.',
      description:
        'For example, you could work 50% of the time, and have 50% paid leave.',
    },
    label: {
      id: 'pl.application:ratio.label',
      defaultMessage: 'Hlutfall fæðingarorlofs',
      description: 'Percent leave',
    },
    placeholder: {
      id: 'pl.application:ratio.placeholder',
      defaultMessage: 'Veldu þitt hlutfall',
      description: 'Pick your percent',
    },
  }),
  paymentPlan: defineMessages({
    subSection: {
      id: 'pl.application:paymentPlan.subSection',
      defaultMessage: 'Greiðsluáætlun',
      description: 'Payment Plan',
    },
    title: {
      id: 'pl.application:paymentPlan.title',
      defaultMessage: 'Hér er núverandi greiðsluáætlunin þín',
      description: 'Here is your current payment plan',
    },
    description: {
      id: 'pl.application:paymentPlan.description',
      defaultMessage:
        'Heildargreiðslur á mánuði reiknast að hámarki 80% af meðallaunum umsækjanda á ákveðnu tímabili fyrir fæðingu barnsins, en þó ekki hærri en 600.000 kr.',
      description:
        'Payments amount to 80% of the average of the parent’s total wages during a specific period before the birth of the child.',
    },
  }),
  shareInformation: defineMessages({
    subSection: {
      id: 'pl.application:shareInformation.subSection',
      defaultMessage: 'Deila upplýsingum með hinu foreldrinu',
      description: 'Share information with the other parent',
    },
    title: {
      id: 'pl.application:shareInformation.title',
      defaultMessage:
        'Viltu deila upplýsingum um tilhögun fæðingarorlofsins þíns með hinu foreldrinu',
      description:
        'Do you want to share your leave information with the other parent?',
    },
    description: {
      id: 'pl.application:shareInformation.description',
      defaultMessage:
        'Það einfaldar fólki að skipuleggja fæðingarorlofið sitt þar sem þá fær það að sjá þau tímabil sem hitt foreldrið valdi.',
      description:
        'Some people share their information to coordinate their parental leaves.',
    },
    yesOption: {
      id: 'pl.application:shareInformation.yes',
      defaultMessage:
        'Já, ég vil deila þessum upplýsingum með hinu foreldrinu.',
      description:
        'Yes, I want to share my leave information with the other parent',
    },
    noOption: {
      id: 'pl.application:shareInformation.no',
      defaultMessage:
        'Nei, ég vil ekki deila þessum upplýsingum að svo stöddu.',
      description: 'No, I do not want to share my information',
    },
  }),
  rightOfAccess: defineMessages({
    title: {
      id: 'pl.application:rightOfAccess.title',
      defaultMessage: 'Staðfesting á umgengnisrétti forsjárlauss foreldris',
      description: 'Add translation',
    },
    description: {
      id: 'pl.application:rightOfAccess.description',
      defaultMessage:
        'Þar sem valið foreldri er ekki skráð/ur í sambúð með þér þá þarf að staðfesta umgengnisrétt þess sem forsjárlaust foreldri.',
      description: 'Add translation',
    },
    yesOption: {
      id: 'pl.application:rightOfAccess.yesOption',
      defaultMessage:
        'Ég innsrkáður umsækjandi veiti forsjárlausu foreldri samþykki mitt fyrir umgengni í þessu fæðingarorlofi',
      description: 'Add translation',
    },
  }),
  reviewScreen: defineMessages({
    titleInReview: {
      id: 'pl.application:review.titleInReview',
      defaultMessage: 'Your application is in review',
      description: 'Your application is in review',
    },
    titleApproved: {
      id: 'pl.application:review.titleApproved',
      defaultMessage: 'Your application is in approved',
      description: 'Your application is in approved',
    },
    desc: {
      id: 'pl.application:review.desc',
      defaultMessage: 'Below are the steps that will happen next.',
      description: 'Below are the steps that will happen next.',
    },
    buttonsView: {
      id: 'pl.application:review.desc',
      defaultMessage: 'View application',
      description: 'View application',
    },
    buttonsEdit: {
      id: 'pl.application:review.desc',
      defaultMessage: 'Edit application',
      description: 'Edit application',
    },
    otherParentTitle: {
      id: 'pl.application:review.otherParent.title',
      defaultMessage: 'Other parent approves extra time',
      description: 'Other parent approves extra time',
    },
    otherParentDesc: {
      id: 'pl.application:review.otherParent.description',
      defaultMessage:
        'The other parent will need to approve the extra days you’ve requested.',
      description:
        'The other parent will need to approve the extra days you’ve requested.',
    },
    employerTitle: {
      id: 'pl.application:review.employer.title',
      defaultMessage: 'Employer approves your leave',
      description: 'Employer approves your leave',
    },
    employerDesc: {
      id: 'pl.application:review.employer.description',
      defaultMessage:
        'Your employer will confirm the dates of your parental leave.',
      description:
        'Your employer will confirm the dates of your parental leave.',
    },
    deptTitle: {
      id: 'pl.application:review.employer.title',
      defaultMessage: 'Vinnumálastofnun approves application',
      description: 'Vinnumálastofnun approves application',
    },
    deptDesc: {
      id: 'pl.application:review.employer.description',
      defaultMessage:
        'Vinnumálastofnun will review and approve your application.',
      description: 'Vinnumálastofnun will review and approve your application.',
    },
  }),
  confirmation: defineMessages({
    epxandAll: {
      id: 'pl.application:confirmation.buttons.expandAll',
      defaultMessage: 'Sýna allt',
      description: 'Expand all',
    },
    collapseAll: {
      id: 'pl.application:confirmation.buttons.collapseAll',
      defaultMessage: 'Fela allt',
      description: 'Collapse all',
    },
    section: {
      id: 'pl.application:confirmation.section',
      defaultMessage: 'Samþykkja',
      description: 'Confirmation',
    },
    title: {
      id: 'pl.application:confirmation.title',
      defaultMessage: 'Senda inn umsókn',
      description: 'Review and submit',
    },
    description: {
      id: 'pl.application:confirmation.description',
      defaultMessage:
        'Vinsamlegast farðu yfir umsóknina áður en þú sendir hana inn.',
      description:
        'Please review your information before submitting the application.',
    },
  }),
  finalScreen: defineMessages({
    title: {
      id: 'pl.application:finalscreen.title',
      defaultMessage: 'Næstu skref:',
      description: 'All done, here are the next steps:',
    },
    description: {
      id: 'pl.application:finalscreen.description',
      defaultMessage:
        'Hitt foreldrið þarf að samþykkja umsókn þína ef þú óskaðir eftir yfirfærslu á hluta réttinda þess til þín, eða nýtingu á persónuafslætti þess. Síðan þarf vinnuveitandinn þinn að samþykkja tilhögun þína til fæðingarorlofs. Að lokum fer umsóknin á borð Fæðingarorlofssjóðs þar sem lokaúrvinnsla hennar fer fram.',
      description:
        'The other parent will need to approve your request to use their shared month (if you did so). Then, ' +
        'your employer will approve your parental leave dates.' +
        'And finally Vinnumálastofnun will review your application.',
    },
  }),
}
