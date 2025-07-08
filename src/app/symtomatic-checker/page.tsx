// src/app/symtomatic-checker/page.tsx (Server Component)
export const metadata = {
  title: "Symptomatic Checker | Identify Digestive Issues Instantly Online",
  description: "Use our Symptomatic Checker to evaluate your digestive health. Get quick insights and consult a specialist for expert care in gastrointestinal conditions.",
  keywords: "Surgical Gastroenterologist Specialist in Bangalore, Laparoscopic Surgeon in Bangalore, Advanced Laparoscopic Specialist in Bangalore",
  robots: "index, follow"
};

import SymptomCheckerPage from './symptomsList'; // Client Component

export default function Page() {
  return <SymptomCheckerPage />;
}
