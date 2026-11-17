import AboutDoctor from '@/components/sections/AboutDoctor';
import Faq from '@/components/sections/Faq';
import AppointmentCta from '@/components/sections/AppointmentCta';
import WhyChooseSection from '@/components/WhyChooseSection';
import BariatricBanner from '@/components/BreadcrumbBanner';

export const metadata = {
  title: 'Dr. Shabeer Ahmed | About Us – Expert in Gastro & Bariatric Care.',
  description:
    'Learn about Dr. Shabeer Ahmed, a renowned specialist in gastrointestinal and bariatric surgery in Bangalore, committed to excellence and compassionate patient care.',
  keywords:
    'Top Gastroenterology Doctor in Bangalore, Gastrointestinal Surgery Specialist in Bangalore, Gastroesophageal Reflux Treatment Bangalore',
  alternates: {
    canonical: 'https://drshabeerahmed.in/aboutus',
  },
  openGraph: {
    title: 'Dr. Shabeer Ahmed | About Us – Expert in Gastro & Bariatric Care.',
    description:
      'Learn about Dr. Shabeer Ahmed, a renowned specialist in gastrointestinal and bariatric surgery in Bangalore, committed to excellence and compassionate patient care.',
    url: 'https://drshabeerahmed.in/aboutus',
    type: 'profile',
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function About() {
    return (
        <>
            {/* SEO Metadata */}
         
            {/* Banner Section */}
            <BariatricBanner title="About Us" imageSrc="/img/bannerslider/Bariatric Surgery 2.webp" />

            {/* Main Content */}
            <AboutDoctor showCta={false} />
            <WhyChooseSection />
            <AppointmentCta />
            <Faq />
        </>
    );
}