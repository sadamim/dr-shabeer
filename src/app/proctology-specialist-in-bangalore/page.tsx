// pages/proctology-specialist.js

import BariatricBanner from '@/components/BreadcrumbBanner';
import FaqSection from '@/components/FaqSection';
import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head';
import Image from 'next/image';

export const metadata = {
  title: 'Expert Proctology Care in Bangalore | Dr. Shabeer Ahmed',
  description:
    'Dr. Shabeer Ahmed offers expert proctology care in Bangalore, specializing in advanced treatments for piles, fissures, and fistulas with precision and compassionate care.',
  keywords:
    'Best Proctologist in Bangalore, Piles Treatment Bangalore, Fissure Specialist, Fistula Surgeon Bangalore',
  alternates: {
    canonical: 'https://drshabeerahmed.in/proctology-specialist-in-bangalore.html',
  },
  openGraph: {
    title: 'Proctology Specialist in Bangalore – Dr. Shabeer Ahmed',
    description:
      'Consult Dr. Shabeer Ahmed, Bangalore’s leading Proctology Specialist, for advanced treatment of piles, fissures, and fistulas using minimally invasive techniques.',
    url: 'https://drshabeerahmed.in/proctology-specialist-in-bangalore.html',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProctologySpecialistPage() {
  return (
    <>
      <h1 className='d-none'>Proctology Specialist in Bangalore</h1>

      <BariatricBanner
        title="Proctology"
        imageSrc="/img/bannerslider/Obesity 2.webp"
      />

      <Container className="my-5">
        <Row className="align-items-center">
          <Col lg={4} md={4} className="mb-4 d-flex justify-content-center">
            <Image
              src="/img/bannerslider/Obesity.webp"
              alt="Proctology Specialist"
              width={400}
              height={300}
              className="img-fluid rounded"
            />
          </Col>

          <Col lg={8} md={8} className="mb-4">
            <h3>What is Proctology?</h3>
            <p className="text-justify">
              Proctology is a medical specialty focusing on the diagnosis and treatment of disorders of the rectum, anus, and colon. Common conditions include hemorrhoids (piles), anal fissures, fistulas, and abscesses. With minimally invasive techniques and laser-assisted procedures, patients can experience faster recovery and minimal discomfort. Dr. Shabeer Ahmed is a renowned proctologist in Bangalore, offering expert care for both acute and chronic conditions with compassion and precision.
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <h4>Common Proctology Conditions Treated</h4>

            <h6>1. Hemorrhoids (Piles)</h6>
            <ul>
              <li>Swollen veins in the rectal or anal region causing pain, itching, and bleeding.</li>
              <li>Laser hemorrhoidectomy offers quick relief with minimal bleeding.</li>
            </ul>

            <h6>2. Anal Fissures</h6>
            <ul>
              <li>Small tears in the anal lining, often due to constipation or hard stools.</li>
              <li>Laser surgery and dietary changes can promote rapid healing.</li>
            </ul>

            <h6>3. Fistulas</h6>
            <ul>
              <li>Abnormal tract between the rectum and skin, causing recurrent infections and pus discharge.</li>
              <li>Advanced techniques like VAAFT and laser fistula surgery ensure better healing.</li>
            </ul>

            <h6>4. Anal Abscesses</h6>
            <ul>
              <li>Painful collections of pus near the anus, often requiring drainage.</li>
              <li>Early intervention prevents complications like fistula formation.</li>
            </ul>

            <h6>5. Pilonidal Sinus</h6>
            <ul>
              <li>Cyst near the tailbone that may become infected and filled with pus.</li>
              <li>Laser treatment offers a scar-free and quick recovery solution.</li>
            </ul>

            <h4 className="mt-4">Treatment Approaches</h4>

            <h6>1. Conservative Management</h6>
            <ul>
              <li>Dietary modifications: high-fiber intake and increased fluid consumption.</li>
              <li>Topical ointments and stool softeners for fissures and piles.</li>
              <li>Sitz baths and warm compresses to reduce inflammation and pain.</li>
            </ul>

            <h6>2. Laser Proctology</h6>
            <ul>
              <li>Minimally invasive technique using laser energy for piles, fissures, and fistulas.</li>
              <li>Benefits: minimal pain, no stitches, same-day discharge, and faster healing.</li>
            </ul>

            <h6>3. Surgical Options</h6>
            <ul>
              <li>For complex or recurrent conditions, traditional or laparoscopic surgeries may be recommended.</li>
              <li>Dr. Shabeer uses advanced tools and protocols to ensure safety and optimal results.</li>
            </ul>

            <h4 className="mt-4">Why Choose Dr. Shabeer Ahmed?</h4>
            <ul>
              <li><strong>Experience:</strong> Over 36 years in GI and proctology surgery.</li>
              <li><strong>Laser Expertise:</strong> Performs advanced laser treatments for quicker recovery.</li>
              <li><strong>Patient-Centric Approach:</strong> Detailed consultation and custom treatment plans.</li>
              <li><strong>International Patient Support:</strong> Especially for Arab nationals and overseas patients.</li>
            </ul>

            <h5 className="mt-4">Conclusion</h5>
            <p className="text-justify">
              Proctological conditions can be painful and embarrassing, but timely expert care can restore your comfort and confidence. Dr. Shabeer Ahmed offers compassionate, cutting-edge treatments for all types of anorectal disorders. Don’t delay—consult a specialist and experience lasting relief.
            </p>

            <p className="text-justify mt-3">
              <strong>Contact Us:</strong> Schedule your consultation today. We also assist with international travel and lodging for patients from Arab countries.
            </p>
          </Col>
        </Row>
      </Container>

      <FaqSection />
    </>
  );
}
