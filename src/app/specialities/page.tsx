
import BariatricBanner from "@/components/BreadcrumbBanner";
import Specialities from "@/components/sections/Specialities";
import ConditionsExplorer from "@/components/sections/ConditionsExplorer";
import AppointmentCta from "@/components/sections/AppointmentCta";

export const metadata = {
  title: 'Advanced Laparoscopic Specialist in Bangalore – Dr. Shabeer Ahmed',
  description:
    'Dr. Shabeer Ahmed is a leading Advanced Laparoscopic Specialist in Bangalore, offering expert care in GI, bariatric, and minimally invasive surgeries.',
  keywords:
    'Surgical Gastroenterologist Specialist in Bangalore, Laparoscopic Surgeon in Bangalore, Advanced Laparoscopic Specialist in Bangalore',
  alternates: {
    canonical: 'https://drshabeerahmed.in/specialities',
  },
  openGraph: {
    title: 'Advanced Laparoscopic Specialist in Bangalore – Dr. Shabeer Ahmed',
    description:
      'Dr. Shabeer Ahmed is a leading Advanced Laparoscopic Specialist in Bangalore, offering expert care in GI, bariatric, and minimally invasive surgeries.',
    url: 'https://drshabeerahmed.in/specialities',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};


// Component definition
export default function AllSpecialitiesPage() {
  return (
    <>
      <BariatricBanner title="All Specialities" imageSrc="/img/bannerslider/Laparoscopic Surgery banner.png" />
      <Specialities showViewAll={false} />
      <ConditionsExplorer title="Conditions & treatments by speciality" />
      <AppointmentCta />
    </>
  );
}
