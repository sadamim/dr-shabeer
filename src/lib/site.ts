// Single source of truth for contact details, navigation and the
// speciality / treatment catalogue used by the redesigned site.
// Every value here is taken from content that already existed on the site.

export const SITE = {
  name: 'Dr. Shabeer Ahmed',
  url: 'https://drshabeerahmed.in',
  title: 'Gastrointestinal, Bariatric, Laparoscopic, General & Colorectal Surgeon',
  phoneDisplay: '+91 90712 46002',
  phoneHref: 'tel:+919071246002',
  whatsappHref: 'https://wa.me/919071246002',
  email: 'drshabeerahmed@gmail.com',
  address: '830 13 Main 3 Block Koramangala Bangalore 560034',
  addressLines: ['830 13 Main 3 Block Koramangala', 'Bangalore 560034'],
  // Existing appointment links (header side panel / footer)
  appointmentHref: 'https://www.fortishealthcare.com/doctors/dr-shabeer-ahmed-773?hospital=3514',
  appointmentHospital: 'Fortis Hospital',
  requestAppointmentHref: 'https://www.eka.care/doctor/dr-shabeer-gastroenterologist-bengaluru',
  portrait: '/img/ShabeerAhmed.png',
  logo: '/img/logo-ugh.png',
} as const;

export type Speciality = {
  title: string;
  href: string;
  icon: string;
  description: string;
};

// Core specialities (from the existing Specialities section / page)
export const SPECIALITIES: Speciality[] = [
  {
    title: 'Gastroenterology',
    href: '/best-gastroenterologist-in-bangalore',
    icon: '/img/icons/Gastroenterology.svg',
    description:
      'Diagnosis and treatment of disorders of the oesophagus, stomach, intestines, liver, pancreas and gallbladder.',
  },
  {
    title: 'Gut Care',
    href: '/gut-health-specialis-in-bangalore',
    icon: '/img/icons/Gut Care.svg',
    description:
      'Maintaining a healthy digestive system through dietary, lifestyle and, when needed, medical care.',
  },
  {
    title: 'Bariatric Surgery',
    href: '/bariatric-surgery-specialist-bangalore',
    icon: '/img/icons/Bariatric Surgery.svg',
    description:
      'Surgical procedures such as sleeve gastrectomy and gastric bypass for people living with obesity.',
  },
  {
    title: 'Laparoscopic Surgery',
    href: '/laparoscopic-surgeon-in-bangalore',
    icon: '/img/icons/Laparoscopic.svg',
    description:
      'Minimally invasive surgery through small incisions using a camera and specialised instruments.',
  },
  {
    title: 'Proctology',
    href: '/proctology-specialist-in-bangalore',
    icon: '/img/icons/Proctology.svg',
    description:
      'Care for disorders of the rectum, anus and colon, including piles, fissures, fistulas and abscesses.',
  },
  {
    title: 'Robotic Surgery',
    href: '/robotic-surgeries',
    icon: '/img/icons/Robotic Surgery.webp',
    description:
      'Robot-assisted gastrointestinal surgery offering enhanced precision, flexibility and control.',
  },
];

export type TreatmentCategory =
  | 'Digestive / GI'
  | 'Hernia & Laparoscopic'
  | 'Bariatric & Metabolic'
  | 'Colorectal & Proctology'
  | 'Advanced Surgical';

export const TREATMENT_CATEGORIES: TreatmentCategory[] = [
  'Digestive / GI',
  'Hernia & Laparoscopic',
  'Bariatric & Metabolic',
  'Colorectal & Proctology',
  'Advanced Surgical',
];

export type Treatment = {
  title: string;
  href: string;
  img: string;
  category: TreatmentCategory;
  description: string;
};

// Conditions & treatments — every href is an existing route on the site.
export const TREATMENTS: Treatment[] = [
  { title: 'Diarrhea', href: '/diarrhea', img: '/img/icons/Diarrhoea 1.webp', category: 'Digestive / GI', description: 'Assessment and treatment of acute and persistent diarrhoea.' },
  { title: 'Gastritis', href: '/gastritis-treatment-In-bangalore', img: '/img/icons/Gastritis 1.webp', category: 'Digestive / GI', description: 'Care for inflammation of the stomach lining.' },
  { title: 'Abdominal Pain (Acute & Chronic)', href: '/abdominal', img: '/img/icons/Abdominal Pain 1.webp', category: 'Digestive / GI', description: 'Evaluation of sudden and long-standing abdominal pain.' },
  { title: 'Irritable Bowel Syndrome', href: '/irritable', img: '/img/icons/Irritable Bowel 1.webp', category: 'Digestive / GI', description: 'A common functional disorder causing pain, bloating and changes in bowel habits.' },
  { title: 'Gastroesophageal Reflux Disease', href: '/gastroesophageal', img: '/img/icons/Reflux Disease.webp', category: 'Digestive / GI', description: 'Chronic backflow of stomach acid or bile into the oesophagus.' },
  { title: 'Surgery for Reflux Disease', href: '/reflux', img: '/img/icons/Surgery For 1.webp', category: 'Digestive / GI', description: 'Minimally invasive procedures that strengthen the lower oesophageal sphincter.' },
  { title: 'Endoscopic Surgery', href: '/best-doctors-for-endoscopy-in-bangalore', img: '/img/icons/Endoscopic 1.webp', category: 'Digestive / GI', description: 'Endoscopic diagnosis and treatment of digestive conditions.' },
  { title: 'Liver Disease', href: '/liver-disease-specialist-in-bangalore', img: '/img/icons/Gastroenterology.svg', category: 'Digestive / GI', description: 'Specialist care for conditions affecting the liver.' },
  { title: 'Stomach Ulcer Surgery', href: '/stomach-ulcer-surgery-in-bangalore', img: '/img/icons/Gut Care.svg', category: 'Digestive / GI', description: 'Surgical care for painful sores on the lining of the stomach.' },
  { title: 'Inguinal Hernia', href: '/inguinal-hernia', img: '/img/icons/Inguinal hernia 1.webp', category: 'Hernia & Laparoscopic', description: 'Tissue pushing through a weak spot in the groin’s inguinal canal.' },
  { title: 'Incisional Hernia', href: '/incisional-hernia', img: '/img/icons/Incisional hernia 1.webp', category: 'Hernia & Laparoscopic', description: 'A hernia at the site of a previous surgical scar.' },
  { title: 'Gallstones', href: '/Gallbladder-Surgery-Bangalore', img: '/img/icons/Gallstones.webp', category: 'Hernia & Laparoscopic', description: 'Solid particles that form in the gallbladder from imbalanced bile.' },
  { title: 'Laparoscopic Surgery', href: '/laparoscopic-surgeon-in-bangalore', img: '/img/icons/Laparoscopic.svg', category: 'Hernia & Laparoscopic', description: 'Small-incision surgery with a camera and specialised instruments.' },
  { title: 'Bariatric Surgery', href: '/bariatric-surgery-specialist-bangalore', img: '/img/icons/Bariatric Surgery 1.webp', category: 'Bariatric & Metabolic', description: 'Procedures that change the digestive system to support long-term weight loss.' },
  { title: 'Obesity & Weight Loss', href: '/weight-loss-surgeon-bangalore', img: '/img/icons/Obesity 1.webp', category: 'Bariatric & Metabolic', description: 'A multidisciplinary approach to obesity, including surgery when necessary.' },
  { title: 'Swallowable Gastric Balloon', href: '/swallowable-balloon', img: '/img/icons/Gastric Balloons 1.webp', category: 'Bariatric & Metabolic', description: 'A non-surgical intragastric balloon for managing obesity.' },
  { title: 'Piles (Hemorrhoids)', href: '/piles-treatment-in-bangalore', img: '/img/icons/piles.webp', category: 'Colorectal & Proctology', description: 'Swollen blood vessels in the rectum or anus that can cause pain and bleeding.' },
  { title: 'Anal Fissure & Fistula', href: '/fissure', img: '/img/icons/Anal fissure, anal fistula 1.webp', category: 'Colorectal & Proctology', description: 'Treatment options for fissures and fistulas, including laser procedures.' },
  { title: 'Rectal Bleeding', href: '/rectal-bleeding-treatment', img: '/img/icons/Rectal Bleeding 1.webp', category: 'Colorectal & Proctology', description: 'Evaluation of bright red blood passed through the anus.' },
  { title: 'Laser Surgery', href: '/laser-surgery-doctors-in-bangalore', img: '/img/icons/laser surgery 1.webp', category: 'Colorectal & Proctology', description: 'Laser treatment for anorectal conditions with minimal invasiveness.' },
  { title: 'Proctology', href: '/proctology-specialist-in-bangalore', img: '/img/icons/Proctology.svg', category: 'Colorectal & Proctology', description: 'Diagnosis and treatment of disorders of the rectum, anus and colon.' },
  { title: 'Surgery for Cancers', href: '/cancer-treatment-in-bangalore', img: '/img/icons/Surgery For 1.webp', category: 'Advanced Surgical', description: 'Surgical treatment for gastrointestinal cancers.' },
  { title: 'Robotic Surgery', href: '/robotic-surgeries', img: '/img/icons/Robotic Surgery.webp', category: 'Advanced Surgical', description: 'Robot-assisted GI surgery with enhanced precision and control.' },
  { title: 'Stem Cell Therapy', href: '/stemcell-therapy', img: '/img/icons/stem cell small size.webp', category: 'Advanced Surgical', description: 'Treatment that uses the body’s regenerative potential to repair tissue.' },
];

// Grouped links for the header "Specialities" dropdown
export const NAV_GROUPS = TREATMENT_CATEGORIES.map((category) => ({
  label: category,
  links: TREATMENTS.filter((t) => t.category === category).map(({ title, href }) => ({ title, href })),
}));

export const PRIMARY_NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/aboutus' },
  { label: 'Conditions', href: '/providers' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
];

// Patient testimonials already published on the site (unchanged wording).
export const TESTIMONIALS = [
  {
    name: 'Arati Sethy',
    content:
      'Amidst of covid pandemic, my aunt got diagnosed with colon tumor. Local doctors diagnosed it as cancer stage-1. As they stay in my native place Odisha, we were clueless what to do. I live in bangalore. One of my colleague referred Dr. Shabeer. With no delay, i took his appointment and rushed to him. After going through the reports without even checking the patient, he said chemo may not be required. He helped a lot to get my aunt here and directly get admitted to Fortis for surgery. Post surgery, biopsy report revealed that its stage 0 and no need for chemo therapy. Everything just happened ontime and perfectly. When i thanked Dr. Sir, he was humble enough to give the credit to Allaha. Sir, you were a blessing to our family in this crisis. My uncle aunt were so happy and pleased by your interaction in entire process. May God always bless you and help you in serving mankind. Thank you very much.',
  },
  {
    name: 'Inayathulla Khan Lavani',
    content:
      "Before visiting Dr. Shabeer Ahmed for my dad's surgery, I had visited other doctors and wasn't satisfied enough, and I must say Dr is very humble person who shows compassion towards patients and also authority in field of laparoscopy, which is rare combination to find in this mundane world. Moreover my dad's surgery was successful and he is recovering. I would definately recommend anyone to visit Dr once before taking final call",
  },
  {
    name: 'Mir Nasair Hussain',
    content:
      'Best ever Dr.I have seen in Bangalore God has given shiffa in his hand Excellent treatment centre in Bangalore I was suffering piles from 11years He did my operation successful Dr. Shabeer Ahmed has 30 years Excellent Experience God give him Good Health / wealth I salute you sir',
  },
];

// Figures shown in the existing "Driven by a Commitment to Excellence" counter.
export const TRUST_STATS = [
  { value: 38, suffix: ' yrs', label: 'Surgical experience', icon: '/img/icons/count-02.svg' },
  { value: 15000, suffix: '+', label: 'Laparoscopic surgeries', icon: '/img/icons/count-01.svg' },
  { value: 50000, suffix: '+', label: 'Patients treated', icon: '/img/icons/count-03.svg' },
  { value: 50000, suffix: '+', label: 'Successful treatments', icon: '/img/icons/count-04.svg' },
  { value: 20, suffix: '+', label: 'Nations — international experience', icon: '/img/icons/Nationion.svg' },
  { value: 20, suffix: '+', label: 'Research analysts', icon: '/img/icons/research.svg' },
];
