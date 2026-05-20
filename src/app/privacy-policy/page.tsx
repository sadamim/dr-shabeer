import type { Metadata } from 'next';
import BariatricBanner from '@/components/BreadcrumbBanner';

export const metadata: Metadata = {
  title: 'Privacy Policy | Dr. Shabeer Ahmed',
  description:
    'Read the privacy policy for drshabeerahmed.in, including how we collect, use, and protect personal information.',
  alternates: {
    canonical: 'https://drshabeerahmed.in/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | Dr. Shabeer Ahmed',
    description:
      'Read the privacy policy for drshabeerahmed.in, including how we collect, use, and protect personal information.',
    url: 'https://drshabeerahmed.in/privacy-policy',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <BariatricBanner title="Privacy Policy" imageSrc="/img/bannerslider/Bariatric Surgery 2.webp" />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: 980 }}>
            <p className="text-muted">
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
              our website. By using this website, you agree to the terms of this Privacy Policy.
            </p>

            <h2 className="mt-4 h4 fw-bold">Information We Collect</h2>
            <ul className="text-muted">
              <li>Personal information you provide (e.g., name, email, phone number) via forms or inquiries.</li>
              <li>Usage data (e.g., pages visited, time spent) collected automatically for analytics and performance.</li>
              <li>Technical data (e.g., device type, browser type, IP address) for security and troubleshooting.</li>
            </ul>

            <h2 className="mt-4 h4 fw-bold">How We Use Your Information</h2>
            <ul className="text-muted">
              <li>To respond to your requests, inquiries, and appointment-related messages.</li>
              <li>To improve website content, user experience, and service quality.</li>
              <li>To maintain the security and integrity of the website.</li>
            </ul>

            <h2 className="mt-4 h4 fw-bold">Cookies and Tracking</h2>
            <p className="text-muted">
              We may use cookies and similar tracking technologies to enhance your experience. You can control cookies
              through your browser settings. Disabling cookies may affect certain site features.
            </p>

            <h2 className="mt-4 h4 fw-bold">Sharing of Information</h2>
            <p className="text-muted">
              We do not sell your personal information. We may share information with service providers who assist with
              website operation (e.g., hosting, analytics, email delivery) under appropriate confidentiality and security
              obligations, or when required by law.
            </p>

            <h2 className="mt-4 h4 fw-bold">Data Security</h2>
            <p className="text-muted">
              We use reasonable administrative, technical, and physical safeguards to protect information. However, no
              method of transmission or storage is 100% secure.
            </p>

            <h2 className="mt-4 h4 fw-bold">Third-Party Links</h2>
            <p className="text-muted">
              Our website may contain links to third-party sites. We are not responsible for the privacy practices of
              those sites. Please review their policies.
            </p>

            <h2 className="mt-4 h4 fw-bold">Your Choices</h2>
            <p className="text-muted">
              You may contact us to request access, correction, or deletion of personal information you have provided,
              subject to applicable legal and operational requirements.
            </p>

            <h2 className="mt-4 h4 fw-bold">Updates to This Policy</h2>
            <p className="text-muted">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
              effective date.
            </p>

            <h2 className="mt-4 h4 fw-bold">Contact Us</h2>
            <p className="text-muted mb-0">
              If you have questions about this Privacy Policy, please contact us via the details on the{' '}
              <a href="/contact">Contact</a> page.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

