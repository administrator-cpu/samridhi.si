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
  url: 'https://thediv.in/'
};

// Impact numbers. The section shows only when at least one value is filled in.
export const stats: { value: string; label: string }[] = [
  // { value: '1,200', label: 'learners trained' },
  // { value: '40', label: 'villages reached' },
  // { value: '85', label: 'Saathis at work' },
];

export type Stage = 'Start here' | 'Build skills' | 'Support track';

export const programmes: {
  name: string;
  hi: string;
  stage: Stage;
  headline: string;
  desc: string;
  image: string;
  alt: string;
  pos: string;
}[] = [
  {
    name: 'Digital Basics',
    hi: 'डिजिटल शुरुआत',
    stage: 'Start here',
    headline: 'Phones, the internet and UPI with confidence',
    desc: 'Using a smartphone, UPI payments, DigiLocker, government services and spotting online fraud. For anyone, at any age.',
    image: '/images/learning-laptop.webp',
    alt: 'Two women learning on a laptop outside their home',
    pos: '50% 40%'
  },
  {
    name: 'Senior',
    hi: 'वरिष्ठ',
    stage: 'Start here',
    headline: 'Smartphones made easy for elders',
    desc: 'Video calls with family, pension and health services online, and how to recognise scam calls. Slow-paced and patient.',
    image: '/images/senior-video-call.webp',
    alt: 'A young volunteer showing her grandmother a video call on a phone',
    pos: '50% 40%'
  },
  {
    name: 'Computer',
    hi: 'कंप्यूटर',
    stage: 'Build skills',
    headline: 'Computer skills for everyday work',
    desc: 'Typing, email, documents, spreadsheets and online forms. The base for every support track.',
    image: '/images/computer-class.webp',
    alt: 'A volunteer teacher helping learners at computers in a village class',
    pos: '60% center'
  },
  {
    name: 'Network Saathi',
    hi: 'नेटवर्क साथी',
    stage: 'Support track',
    headline: 'Install and fix broadband and Wi-Fi',
    desc: 'Routers and Wi-Fi set-up, fibre basics, finding and fixing connection faults, and working safely on site.',
    image: '/images/fibre-technicians.webp',
    alt: 'Two technicians splicing fibre at a BharatNet cabinet on a village road at dusk',
    pos: '62% center'
  },
  {
    name: 'Help Desk Saathi',
    hi: 'हेल्पडेस्क साथी',
    stage: 'Support track',
    headline: 'Help customers on calls and chat',
    desc: 'Handling calls and WhatsApp chats, using a ticket system and CRM, and explaining problems simply in Hindi or English.',
    image: '/images/help-desk-training.webp',
    alt: 'A trainer guiding a learner at a computer in a skills class',
    pos: '65% center'
  },
  {
    name: 'Tech Saathi',
    hi: 'टेक साथी',
    stage: 'Support track',
    headline: 'Set up and repair computers',
    desc: 'Setting up PCs and printers, installing software, fixing common faults and keeping devices safe from viruses.',
    image: '/images/tech-training.webp',
    alt: 'A trainer showing a group of learners how to use a computer',
    pos: '40% center'
  }
];

export const steps = [
  { title: 'Register', desc: 'Fill in the form on this page, or sign up at a camp near you. It takes one minute.' },
  { title: 'Learn the basics', desc: 'We call you back in Hindi or English and find a batch near you. Phones, the internet and computers first.' },
  { title: 'Train for a support track', desc: 'Hands-on practice with real routers, computers and a practice help desk. Finish with a Samridhi certificate.' },
  { title: 'Become a Saathi', desc: 'Take on support work in your area, at times that suit you. We keep training you as technology changes.' }
];

export const saathiPoints = [
  { title: 'Work close to home', desc: 'Requests come from homes, shops, schools and offices in and around your own area. No moving to the city.' },
  { title: 'Choose your hours', desc: 'Take on as much or as little as suits you, alongside study, farming or family.' },
  { title: 'Work reaches your phone', desc: 'New support requests near you arrive on your phone. You pick the ones you can do.' },
  { title: 'Trained and trusted', desc: 'You carry Samridhi training and a FAB5-backed certificate, so customers know they can rely on you.' }
];

// Stories show only when at least one has a real quote, shared with consent.
export const stories: { image: string; alt: string; pos: string; quote: string; caption: string }[] = [
  // { image: '/images/training-lab.webp', alt: '…', pos: '55% center', quote: '…', caption: 'Name, Help Desk Saathi, Village' },
];

export const roles = ['Join a class', 'Volunteer', 'Partner as an organisation'] as const;
export type Role = (typeof roles)[number];

export const involve: { who: string; title: string; desc: string; cta: string; role: Role }[] = [
  { who: 'Learners', title: 'Start learning', desc: 'Free training near you, from your first smartphone to a support track. All we need is your name, phone number and village.', cta: 'Register now', role: 'Join a class' },
  { who: 'Individuals', title: 'Volunteer', desc: 'Teach a weekend class or help at a camp near you.', cta: 'Sign up to volunteer', role: 'Volunteer' },
  { who: 'NGOs & institutions', title: 'Partner with us', desc: 'Host classes, bring learners, or offer expertise, venues and resources.', cta: 'Send a partner enquiry', role: 'Partner as an organisation' }
];

export const faqs = [
  { q: 'Is the training really free?', a: 'Yes. Every Samridhi programme, including the support tracks, is free. It is funded by FAB5 as part of its corporate social responsibility (CSR) work.' },
  { q: 'Who can join?', a: 'Anyone who wants to learn: young people, adults and senior citizens, in villages and small towns. There is no minimum education and no age limit.' },
  { q: 'I have never used a computer. Can I still become a Saathi?', a: 'Yes. Start with Digital Basics and Computer, then move to a support track. Trainers go at your pace.' },
  { q: 'What happens after I finish a support track?', a: 'You get a Samridhi certificate and can become a Samridhi Saathi. You take on support work in your area, at times that suit you, and keep training as you go.' },
  { q: 'Do I need my own smartphone or internet?', a: 'No. Classes use devices at the centre. If you have no phone of your own, a family member can register for you using the form on this page.' },
  { q: 'Which language are classes taught in?', a: 'Hindi or English, whichever you are comfortable with. Trainers are from the local area.' },
  { q: 'Where do classes happen?', a: 'At community centres, schools and partner NGO venues. When you register, we tell you the centre nearest to you.' },
  { q: 'How can my NGO, college or panchayat partner with Samridhi?', a: 'Send a partner enquiry using the form on this page. We work with organisations that can host classes, bring learners or share expertise.' }
];

export const nav = [
  { label: 'About', id: 'about' },
  { label: 'Programmes', id: 'programmes' },
  { label: 'How it works', id: 'how' },
  { label: 'Become a Saathi', id: 'saathi' },
  { label: 'Stories', id: 'stories', needsStories: true },
  { label: 'FAQ', id: 'faq' }
];

export const pretty10 = (n: string) => (n ? `+91 ${n.slice(0, 5)} ${n.slice(5)}` : '');
