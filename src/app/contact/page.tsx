// components/ContactMeta.tsx

import ContactPages from "./Contactus";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Dr. Shabeer Ahmed - Gastrointestinal & Bariatric Surgeon | Bangalore',
  description: 'Get in touch with Dr. Shabeer Ahmed for expert consultation on gastrointestinal, laparoscopic, and bariatric surgery in Bangalore.',
  keywords: 'dr shabeer ahmed contact, contact bariatric surgeon, contact gi surgeon, contact weight loss doctor, contact Bangalore',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.drshabeerahmed.com/contact',
  },
  openGraph: {
    title: 'Contact Dr. Shabeer Ahmed - Gastrointestinal & Bariatric Surgeon | Bangalore',
    description: 'Reach out to Dr. Shabeer Ahmed for advanced GI, Laparoscopic, and Bariatric Surgery consultations in Bangalore.',
    url: 'https://www.drshabeerahmed.com/contact',
    type: 'website',
    siteName: 'Dr Shabeer Ahmed Clinic',
    images: [
      {
        url: '/img/seo/contact-dr-shabeer-ahmed.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Dr. Shabeer Ahmed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Dr. Shabeer Ahmed - Gastrointestinal & Bariatric Surgeon | Bangalore',
    description: 'Get in touch with Dr. Shabeer Ahmed for expert care in gastrointestinal and bariatric surgery in Bangalore.',
    images: ['/img/seo/contact-dr-shabeer-ahmed.jpg'],
  },
};

export default function Page() {
  return <ContactPages />;
}
