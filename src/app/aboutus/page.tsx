import AboutSection from '@/components/Home/AboutSection';
import FAQSection from '@/components/Home/FAQSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import BariatricBanner from '@/components/BreadcrumbBanner';

export const metadata = {
  title: 'Dr. Shabeer Ahmed | About Us – Expert in Gastro & Bariatric Care.',
  description:
    'Learn about Dr. Shabeer Ahmed, a renowned specialist in gastrointestinal and bariatric surgery in Bangalore, committed to excellence and compassionate patient care.',
  keywords:
    'Top Gastroenterology Doctor in Bangalore, Gastrointestinal Surgery Specialist in Bangalore, Gastroesophageal Reflux Treatment Bangalore',
  alternates: {
    canonical: 'https://www.drshabeerahmed.in/aboutus',
  },
  openGraph: {
    title: 'Dr. Shabeer Ahmed | About Us – Expert in Gastro & Bariatric Care.',
    description:
      'Learn about Dr. Shabeer Ahmed, a renowned specialist in gastrointestinal and bariatric surgery in Bangalore, committed to excellence and compassionate patient care.',
    url: 'https://www.drshabeerahmed.in/aboutus',
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
            <AboutSection />
            <WhyChooseSection />
            <FAQSection />
        </>
    );
}