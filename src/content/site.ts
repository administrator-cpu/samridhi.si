// All page copy and settings in one place.
// Leave a contact value empty ('') and every block that uses it stays hidden.

export const contact = {
  email: 'info@fab5network.com',
  missedCall: '', // 10 digits, no +91
  whatsapp: '', // 10 digits, no +91
  phone: '', // 10 digits, no +91
  csrNumber: '' // e.g. CSR00012345
};

export const org = {
  name: 'Fab Five Network Private Limited',
  short: 'FAB5',
  address: 'A-60, Sector 2, Noida, Uttar Pradesh 201301'
};

export const agency = {
  name: 'DIV',
  legalName: 'Development Innovation Vector Private Limited',
  url: 'https://thediv.in/',
  // The footer credit links here. Publish the case study on thediv.in before launch,
  // or point this at 'https://thediv.in/' until it is live, so the credit never 404s.
  creditUrl: 'https://thediv.in/case-studies/samridhi',
  creditText: 'Website by DIV, a software development company in Noida'
};

export const site = {
  url: 'https://samridhi.si',
  name: 'Samridhi.si',
  launched: false // true once programmes open; until then copy says "launching soon"
};

const img = (name: string) => `/images/v2/${name}.webp`;

export const hero = {
  image: img('schoolgirls-laptop'),
  alt: 'Two schoolgirls sharing a laptop, shown inside a Wi-Fi signal shape'
};

// The five programmes. Renaming one updates the API's allowed list too.
export const programmes: {
  name: string;
  line: string;
  text: string;
  card: { image: string; alt: string };
  slide: { image: string; alt: string };
}[] = [
  {
    name: 'Samridhi Beti',
    line: 'Her dreams. Her future.',
    text: 'Education, digital skills and confidence for girls to dream without limits.',
    card: { image: img('schoolgirls-laptop'), alt: 'Two schoolgirls sharing a laptop' },
    slide: { image: img('girls-class'), alt: 'Girls learning on computers with a teacher' }
  },
  {
    name: 'Samridhi Senior',
    line: 'Age is no limit',
    text: 'Helping senior citizens use the digital world with confidence.',
    card: { image: img('senior-phone'), alt: 'A grandfather learning to use a phone with his granddaughter' },
    slide: { image: img('senior-couple'), alt: 'An older couple using a laptop together' }
  },
  {
    name: 'Samridhi Gaon',
    line: 'Every village holds potential',
    text: 'Digital knowledge and new paths for rural communities.',
    card: { image: img('gaon-laptop'), alt: 'A girl in a village using a laptop outdoors' },
    slide: { image: img('rural-lab'), alt: 'Children in a village computer lab' }
  },
  {
    name: 'Samridhi Shakti',
    line: 'When women rise',
    text: 'Skills and confidence for women to work, earn and build businesses.',
    card: { image: img('block-printing'), alt: 'Women block-printing fabric together' },
    slide: { image: img('sewing-women'), alt: 'Two women working at a sewing machine' }
  },
  {
    name: 'Samridhi Rozgar',
    line: 'Skills today, work tomorrow',
    text: 'Practical skills that prepare young people for a livelihood.',
    card: { image: img('youth'), alt: 'A smiling young man giving a thumbs-up' },
    slide: { image: img('trainer-lab'), alt: 'A trainer helping a young student at a computer' }
  }
];

export const about: Record<'left' | 'right', { image: string; size: number; alt: string }[]> = {
  left: [
    { image: img('beti-keyboard'), size: 96, alt: 'A girl typing at a computer' },
    { image: img('village-class'), size: 230, alt: 'Children smiling at their desks in a village classroom' },
    { image: img('women-laptop'), size: 140, alt: 'Two women in a village using a laptop' }
  ],
  right: [
    { image: img('women-computer'), size: 200, alt: 'Women learning computer skills together' },
    { image: img('student'), size: 130, alt: 'A young woman student with a backpack' },
    { image: img('girl-smile'), size: 100, alt: 'A girl smiling at her computer' }
  ]
};

// What each programme is working towards. Not testimonials: Samridhi has not launched yet.
// After launch, replace these with real, consent-based stories.
export const aims = [
  { text: 'A girl discovering what she can become.', programme: 'Samridhi Beti', image: img('girls-lab'), alt: 'Young women gathered round a computer trainer' },
  { text: 'A grandfather video-calling his family on his own for the first time.', programme: 'Samridhi Senior', image: img('senior-phone'), alt: 'A grandfather learning to use a phone with his granddaughter' },
  { text: 'A village with its own digital learning centre.', programme: 'Samridhi Gaon', image: img('village-family'), alt: 'A village family gathered round a laptop' },
  { text: 'A woman earning from a skill she learned close to home.', programme: 'Samridhi Shakti', image: img('women-lab'), alt: 'Women learning in a computer lab' },
  { text: 'A young person walking into a first job interview with confidence.', programme: 'Samridhi Rozgar', image: img('trainer-lab'), alt: 'A trainer helping a young student at a computer' }
];

export const promises = [
  { title: 'Real dates and places', desc: 'Every activity recorded when and where it happened.' },
  { title: 'Results we can prove', desc: "A number goes up here only when there's a report behind it." },
  { title: 'Open to everyone', desc: 'Progress updates published on this site, free to read.' }
];

export const roles = ['Join a programme', 'Volunteer my time', 'Partner with Samridhi', 'Bring it to my village'] as const;
export type Role = (typeof roles)[number];

export const involve: { title: string; desc: string; cta: string; role: Role; image: string; alt: string }[] = [
  { title: 'Volunteer your time', desc: 'Teach a skill, mentor a learner or help at a centre near you.', cta: 'Volunteer with us', role: 'Volunteer my time', image: img('volunteer'), alt: 'A volunteer laughing with young children in a classroom' },
  { title: 'Partner with us', desc: 'NGOs, schools and companies can run programmes with Samridhi.', cta: 'Start a partnership', role: 'Partner with Samridhi', image: img('partners'), alt: 'Partners shaking hands across a meeting table' },
  { title: 'Bring Samridhi to your village', desc: 'Tell us about your community and what it needs most.', cta: 'Start a conversation', role: 'Bring it to my village', image: img('village-family'), alt: 'A village family gathered round a laptop' }
];

export const registerImage = { image: img('women-laptop'), alt: 'Two women in a village using a laptop together' };

export const faqs = [
  { q: 'Who can join a Samridhi programme?', a: 'Each programme will list who it is for, where it runs and how to apply. Leave your details and we will tell you when one opens near you.' },
  { q: 'Does it cost anything?', a: 'If a programme has any fee, it will be shown clearly on its page before you apply.' },
  { q: 'How do I volunteer?', a: 'Use the form on this page, choose “Volunteer my time”, and tell us where you are. The team will match you with a programme.' },
  { q: 'Can my organisation partner with Samridhi?', a: 'Yes. NGOs, schools and institutions can write to us. We explain how partners are chosen and what we bring.' },
  { q: 'When does Samridhi launch?', a: 'Very soon. Leave your details in the form and you will be the first to hear when programmes open.' },
  { q: 'Is my information safe?', a: 'We use your details only to tell you about Samridhi, never share them for marketing, and delete them on request. Our privacy notice has the details.' },
  { q: 'Why does FAB5 run Samridhi?', a: 'At FAB5 we believe the value of technology lies in what people can achieve with it. Samridhi is how we act on that belief.' }
];

export const nav = [
  { label: 'About', id: 'about' },
  { label: 'Programmes', id: 'programmes' },
  { label: 'Our promise', id: 'promise' },
  { label: 'Get involved', id: 'involved' },
  { label: 'FAQ', id: 'faq' }
];

// Image credits page. Fill in "source" for each photo (photographer, stock library or AI tool);
// until then the page lists it as an illustrative image.
export const credits: { file: string; description: string; source: string }[] = [
  ['schoolgirls-laptop', 'Two schoolgirls sharing a laptop (hero)'],
  ['girls-class', 'Girls learning on computers with a teacher'],
  ['senior-phone', 'A grandfather learning to use a phone'],
  ['senior-couple', 'An older couple using a laptop'],
  ['gaon-laptop', 'A girl in a village using a laptop'],
  ['rural-lab', 'Children in a village computer lab'],
  ['block-printing', 'Women block-printing fabric'],
  ['sewing-women', 'Two women at a sewing machine'],
  ['youth', 'A young man giving a thumbs-up'],
  ['trainer-lab', 'A trainer helping a student at a computer'],
  ['girls-lab', 'Young women gathered round a computer trainer'],
  ['women-lab', 'Women learning in a computer lab'],
  ['women-computer', 'Women learning computer skills together'],
  ['women-laptop', 'Two women in a village using a laptop'],
  ['village-class', 'Children in a village classroom'],
  ['village-family', 'A village family gathered round a laptop'],
  ['beti-keyboard', 'A girl typing at a computer'],
  ['student', 'A young woman student'],
  ['girl-smile', 'A girl smiling at her computer'],
  ['volunteer', 'A volunteer with young children'],
  ['partners', 'Partners at a meeting table']
].map(([file, description]) => ({ file: img(file), description, source: '' }));

export const pretty10 = (n: string) => (n ? `+91 ${n.slice(0, 5)} ${n.slice(5)}` : '');
