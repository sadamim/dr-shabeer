import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import AboutDoctor, { EXPERTISE, QUALIFICATIONS } from "@/components/sections/AboutDoctor";
import Specialities from "@/components/sections/Specialities";
import WhyChoose from "@/components/sections/WhyChoose";
import ConditionsExplorer from "@/components/sections/ConditionsExplorer";
import GutHealthLibrary from "@/components/sections/GutHealthLibrary";
import PatientJourney from "@/components/sections/PatientJourney";
import Testimonials from "@/components/sections/Testimonials";
import AppointmentCta from "@/components/sections/AppointmentCta";
import Faq from "@/components/sections/Faq";
import { HOME_FAQS } from "@/lib/faqs";
import { getFeaturedPosts } from "@/lib/getFeaturedPosts";
import { SITE, SPECIALITIES } from "@/lib/site";

// Re-fetch the featured articles at most once an hour (ISR)
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Dr Shabeer Ahmed | Gastrointestinal & Laparoscopic Surgeon",
  description: "Dr. Shabeer Ahmed is a renowned Gastrointestinal and Laparoscopic Surgeon, specializing in advanced minimally invasive procedures with exceptional patient care.",
  keywords: "Dr Shabeer Ahmed, Gastrointestinal Surgeon, Laparoscopic Surgeon, Colorectal Surgeon, Metabolic Surgery",
  alternates: {
    canonical: 'https://drshabeerahmed.in/',
  },
  openGraph: {
    title: 'Dr. Shabeer Ahmed is a renowned Gastrointestinal and Laparoscopic Surgeon, specializing in advanced minimally invasive procedures with exceptional patient care.',
    description:
      'Consult Dr. Shabeer Ahmed is a renowned Gastrointestinal and Laparoscopic Surgeon, specializing in advanced minimally invasive procedures with exceptional patient care.',
    url: 'https://drshabeerahmed.in/',
    type: 'website',
    images: [{ url: '/img/ShabeerAhmed.png', width: 2144, height: 1920, alt: 'Dr. Shabeer Ahmed' }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured data built only from details published on the site
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Physician',
      '@id': `${SITE.url}/#physician`,
      name: SITE.name,
      url: `${SITE.url}/`,
      image: `${SITE.url}${SITE.portrait}`,
      description:
        'Gastrointestinal, Bariatric, Laparoscopic, General & Colorectal Surgeon with expertise in advanced laparoscopic surgery for gastrointestinal cancer.',
      telephone: '+91-9071246002',
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '830 13 Main 3 Block Koramangala',
        addressLocality: 'Bangalore',
        postalCode: '560034',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
      medicalSpecialty: ['Gastroenterologic', 'Surgical'],
      knowsAbout: [...EXPERTISE, ...SPECIALITIES.map((s) => s.title)],
      hasCredential: QUALIFICATIONS.filter((q) => !q.title.includes('pursuing')).map((q) => ({
        '@type': 'EducationalOccupationalCredential',
        name: q.title,
        description: q.meta,
      })),
      sameAs: [SITE.appointmentHref, SITE.requestAppointmentHref],
    },
    {
      '@type': 'MedicalWebPage',
      '@id': `${SITE.url}/#webpage`,
      url: `${SITE.url}/`,
      name: 'Dr Shabeer Ahmed | Gastrointestinal & Laparoscopic Surgeon',
      about: { '@id': `${SITE.url}/#physician` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'FAQPage',
      mainEntity: HOME_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ],
};

export default async function Home() {
  const posts = await getFeaturedPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Hero />
      <TrustStrip />
      <AboutDoctor />
      <Specialities />
      <WhyChoose />
      <ConditionsExplorer initialLimit={9} />
      <GutHealthLibrary posts={posts} />
      <PatientJourney />
      <Testimonials />
      <AppointmentCta />
      <Faq />
    </>
  );
}
