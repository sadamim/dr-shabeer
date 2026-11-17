
import BariatricBanner from "@/components/BreadcrumbBanner";
import ConditionsExplorer from "@/components/sections/ConditionsExplorer";
import AppointmentCta from "@/components/sections/AppointmentCta";

export const metadata = {
  title: 'Providers – Meet Our Expert Team at United Gut Healthcare.',
  description:
    'Explore our expert team of gastrointestinal, bariatric & laparoscopic specialists at United Gut Healthcare. Compassionate care for all your advanced gut health needs.',
  keywords: 'Providers, Gastrointestinal Specialists, Bariatric Experts, Laparoscopic Surgeons in Bangalore',
  alternates: {
    canonical: 'https://drshabeerahmed.in/providers',
  },
  openGraph: {
    title: 'Providers – Meet Our Expert Team at United Gut Healthcare.',
    description:
      'Explore our expert team of gastrointestinal, bariatric & laparoscopic specialists at United Gut Healthcare. Compassionate care for all your advanced gut health needs.',
    url: 'https://drshabeerahmed.in/providers',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function ProvidersPage() {
  return (
    <>
      <BariatricBanner title="Conditions & Treatments" imageSrc="/img/bannerslider/gut care banners.jpg" />
      <ConditionsExplorer
        title="Explore a wide range of medical treatments and services"
        intro="Search or filter by speciality to find information on the conditions Dr. Shabeer Ahmed treats."
      />
      <AppointmentCta />
    </>
  );
}
