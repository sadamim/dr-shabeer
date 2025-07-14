
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Advanced Laparoscopic Specialist in Bangalore – Dr. Shabeer Ahmed',
  description:
    'Dr. Shabeer Ahmed is a leading Advanced Laparoscopic Specialist in Bangalore, offering expert care in GI, bariatric, and minimally invasive surgeries.',
  keywords:
    'Surgical Gastroenterologist Specialist in Bangalore, Laparoscopic Surgeon in Bangalore, Advanced Laparoscopic Specialist in Bangalore',
  alternates: {
    canonical: 'https://www.drshabeerahmed.in/specialities',
  },
  openGraph: {
    title: 'Advanced Laparoscopic Specialist in Bangalore – Dr. Shabeer Ahmed',
    description:
      'Dr. Shabeer Ahmed is a leading Advanced Laparoscopic Specialist in Bangalore, offering expert care in GI, bariatric, and minimally invasive surgeries.',
    url: 'https://www.drshabeerahmed.in/specialities',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};


// List of specialities
const specialities = [
  {
    title: "Gut Care",
    href: "/gut-health-specialis-in-bangalore",
    icon: "/img/icons/Gut Care.svg",
  },
  {
    title: "Gastroenterology",
    href: "/best-gastroenterologist-in-bangalore",
    icon: "/img/icons/Gastroenterology.svg",
  },
  {
    title: "Bariatric Surgery",
    href: "/bariatric-surgery-specialist-bangalore",
    icon: "/img/icons/Bariatric Surgery.svg",
  },
  {
    title: "Laparoscopic",
    href: "/laparoscopic-surgeon-in-bangalore",
    icon: "/img/icons/Laparoscopic.svg",
  },
  {
    title: "Proctology",
    href: "/proctology-specialist-in-bangalore",
    icon: "/img/icons/Proctology.svg",
  }
];

// Component definition
export default function AllSpecialitiesPage() {
  return (
    <div className="new-specialities-style">
      {/* Decorative SVG background */}
      <div className="specialities-bg-svg">
        <svg width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="100" r="80" fill="#eaf4fc" opacity="0.5"/>
          <circle cx="1300" cy="80" r="60" fill="#d0f5e8" opacity="0.4"/>
          <rect x="1100" y="400" width="120" height="120" rx="30" fill="#f9e7ef" opacity="0.3"/>
          <g opacity="0.10">
            <text x="100" y="550" fontSize="90" fontWeight="bold" fill="#1bbd7e">🩺</text>
            <text x="1200" y="580" fontSize="70" fontWeight="bold" fill="#007bff">💊</text>
            <text x="700" y="100" fontSize="60" fontWeight="bold" fill="#f9b115">🧬</text>
            <text x="400" y="400" fontSize="80" fontWeight="bold" fill="#e63946">❤️</text>
          </g>
        </svg>
      </div>
      <section className="all-specialities-page">
        <div className="container">
          <div className="text-center mb-5 mt-80">
            <h1 className="page-title mt-5">All Specialities</h1>
          </div>
          <div className="specialities-grid">
            {specialities.map((item, index) => (
              <Link href={item.href} key={index} className="speciality-card anim-card">
                <div className="card-content">
                  <div className="icon-wrapper">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={64}
                      height={64}
                    />
                  </div>
                  <h5 className="title">{item.title}</h5>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
