// pages/best-gastroenterologist-in-bangalore.js

import Head from 'next/head';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import BreadcrumbBanner from '@/components/BreadcrumbBanner';
import FaqSection from '@/components/FaqSection';

export const metadata = {
  title: 'Meet the Best Gastroenterologist in Bangalore – Dr. Shabeer Ahmed.',
  description:
    'Meet the Best Gastroenterologist in Bangalore, Dr. Shabeer Ahmed. Expert in GI, bariatric & laparoscopic care, delivering trusted treatment for your digestive health.',
  keywords: 'Best Gastroenterologist in Bangalore',
  alternates: {
    canonical: 'https://www.drshabeerahmed.in/best-gastroenterologist-in-bangalore',
  },
  openGraph: {
    title: 'Meet the Best Gastroenterologist in Bangalore – Dr. Shabeer Ahmed.',
    description:
      'Meet the Best Gastroenterologist in Bangalore, Dr. Shabeer Ahmed. Expert in GI, bariatric & laparoscopic care, delivering trusted treatment for your digestive health.',
    url: 'https://www.drshabeerahmed.in/best-gastroenterologist-in-bangalore',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function BestGastroPage() {
  return (
    <>
     

      {/* Banner Section */}
      <BreadcrumbBanner
        title="Best Gastroenterologist in Bangalore"
        imageSrc="/img/bannerslider/Abdominal Pain 2.webp"
      />

      {/* Main Content */}
      <Container className="my-5">
        <Row className="align-items-center">
          <Col lg={4} md={4} className="mb-4 d-flex justify-content-center">
            <Image
              src="/img/bannerslider/Gastroenterology.jpg"
              alt="Gastroenterology"
              width={400}
              height={300}
              className="img-fluid rounded"
            />
          </Col>
          <Col lg={8} md={8} className="mb-4">
            <p className="text-justify">
              Gastroenterology specializes in the diagnosis and treatment of digestive system
              disorders, including conditions of the esophagus, stomach, intestines, liver,
              pancreas, and gallbladder. At our Bangalore clinic, Dr. Shabeer Ahmed offers expert
              care for managing everything from common digestive issues to complex surgical
              gastroenterology procedures.
            </p>
          </Col>
        </Row>

        {/* Services Section */}
        <Row className="mt-4">
          <Col>
            <h4>Services Offered</h4>
            <ul>
              <li>Liver Function Test</li>
              <li>Digestive Health Consultation</li>
              <li>Pancreatic Health Screening</li>
            </ul>
          </Col>
        </Row>

        {/* Procedures Section */}
        <Row className="mt-4">
          <Col>
            <h4>Common Procedures</h4>
            <ul>
              <li>Esophagogastroduodenoscopy (EGD)</li>
              <li>Liver Biopsy</li>
              <li>ERCP (Endoscopic Retrograde Cholangiopancreatography)</li>
            </ul>
          </Col>
        </Row>

        {/* Conditions Section */}
        <Row className="mt-4">
          <Col>
            <h4>Related Conditions Treated</h4>
            <ul>
              <li>Gastroesophageal Reflux Disease (GERD)</li>
              <li>Peptic Ulcer</li>
              <li>Liver Cirrhosis</li>
            </ul>
          </Col>
        </Row>

        {/* Doctors Section */}
        <Row className="mt-4">
          <Col>
            <h4>Our Specialists</h4>
            <ul>
              <li>Dr. Michael Smith</li>
              <li>Dr. Laura Chen</li>
            </ul>
          </Col>
        </Row>
      </Container>

      {/* FAQ Section */}
      <FaqSection
        faqs={[
          {
            question: '1. Should I call a doctor if I have diarrhoea?',
            answer:
              'Yes, you should seek medical advice if diarrhoea lasts more than two to three weeks. Additionally, contact a physician if you notice changes in bowel habits after starting a new medication, or if you experience severe cramping, a fever lasting more than 24 hours, or symptoms of dehydration such as vomiting.',
          },
          {
            question: '2. What is the best treatment for diarrhoea?',
            answer:
              'To alleviate diarrhoea symptoms, start by consuming only liquids and avoiding solid foods and dairy products. You can also use over-the-counter treatments such as Pepto-Bismol®, Kaopectate®, or Imodium® to help manage the condition.',
          },
          {
            question: '3. What types of diagnosis are used to determine the exact cause of rectal bleeding?',
            answer: 'There are four ways your doctor typically can identify the cause:',
          },
        ]}
      />
    </>
  );
}
