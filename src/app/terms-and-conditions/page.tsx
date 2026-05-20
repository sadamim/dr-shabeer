import type { Metadata } from 'next';
import BariatricBanner from '@/components/BreadcrumbBanner';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Dr. Shabeer Ahmed',
  description:
    'Read the terms and conditions for using drshabeerahmed.in, including acceptable use, disclaimers, and limitations.',
  alternates: {
    canonical: 'https://drshabeerahmed.in/terms-and-conditions',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms and Conditions | Dr. Shabeer Ahmed',
    description:
      'Read the terms and conditions for using drshabeerahmed.in, including acceptable use, disclaimers, and limitations.',
    url: 'https://drshabeerahmed.in/terms-and-conditions',
    type: 'website',
  },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <BariatricBanner title="Terms and Conditions" imageSrc="/img/bannerslider/Bariatric Surgery 2.webp" />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: 980 }}>
            <p className="text-muted">
              These Terms and Conditions govern your use of this website. By accessing or using this website, you agree
              to be bound by these terms.
            </p>

            <h2 className="mt-4 h4 fw-bold">Use of the Website</h2>
            <ul className="text-muted">
              <li>You may use this website for lawful purposes and in accordance with these Terms.</li>
              <li>You agree not to misuse the website or attempt to disrupt its security or availability.</li>
              <li>Content is provided for general informational purposes and may change without notice.</li>
            </ul>

            <h2 className="mt-4 h4 fw-bold">Medical Disclaimer</h2>
            <p className="text-muted">
              Website content is not a substitute for professional medical advice, diagnosis, or treatment. Always seek
              the advice of a qualified healthcare provider with any questions regarding a medical condition.
            </p>

            <h2 className="mt-4 h4 fw-bold">Appointments and Communications</h2>
            <p className="text-muted">
              If you contact us through this website, we will make reasonable efforts to respond. Submission of a form
              does not guarantee an appointment. In emergencies, contact local emergency services immediately.
            </p>

            <h2 className="mt-4 h4 fw-bold">Intellectual Property</h2>
            <p className="text-muted">
              All website content, including text, graphics, logos, images, and design elements, is owned by or licensed
              to us and protected by applicable intellectual property laws. You may not reproduce or redistribute content
              without permission.
            </p>

            <h2 className="mt-4 h4 fw-bold">Third-Party Links</h2>
            <p className="text-muted">
              This website may include links to third-party websites. We do not control these websites and are not
              responsible for their content or policies.
            </p>

            <h2 className="mt-4 h4 fw-bold">Limitation of Liability</h2>
            <p className="text-muted">
              To the maximum extent permitted by law, we will not be liable for any indirect, incidental, special, or
              consequential damages arising from the use of this website.
            </p>

            <h2 className="mt-4 h4 fw-bold">Changes to These Terms</h2>
            <p className="text-muted">
              We may update these Terms from time to time. Updates will be posted on this page and are effective when
              published.
            </p>

            <h2 className="mt-4 h4 fw-bold">Contact</h2>
            <p className="text-muted mb-0">
              For questions about these Terms, please contact us via the details on the <a href="/contact">Contact</a>{' '}
              page.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

