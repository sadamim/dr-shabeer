
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

// SEO metadata for the page
export const metadata = {
  title: "Advanced Laparoscopic Specialist in Bangalore – Dr. Shabeer Ahmed",
  description:
    "Dr. Shabeer Ahmed is a leading Advanced Laparoscopic Specialist in Bangalore, offering expert care in GI, bariatric, and minimally invasive surgeries.",
  keywords:
    "Surgical Gastroenterologist Specialist in Bangalore, Laparoscopic Surgeon in Bangalore, Advanced Laparoscopic Specialist in Bangalore",
  canonical: "https://www.drshabeerahmed.in/specialities"
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
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={metadata.canonical} />
        <meta name="robots" content="index, follow"/>
      </Head>

      <section className="all-specialities-page">
        <div className="container">
          <div className="text-center mb-5 mt-80">
            <h1 className="page-title mt-5">All Specialities</h1>
          </div>

          <div className="specialities-grid">
            {specialities.map((item, index) => (
              <Link href={item.href} key={index} className="speciality-card">
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
    </>
  );
}
