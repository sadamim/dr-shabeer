export const metadata = {
  title: 'Patient Login | Access Your Health Records – Dr. Shabeer Ahmed.',
  description:
    'Securely log in to manage your appointments, view medical records, and connect with Dr. Shabeer Ahmed’s team for expert gastrointestinal and surgical care.',
  keywords: 'Patient Login',
  alternates: {
    canonical: 'https://www.drshabeerahmed.in/login',
  },
  openGraph: {
    title: 'Patient Login | Access Your Health Records – Dr. Shabeer Ahmed.',
    description:
      'Securely log in to manage your appointments, view medical records, and connect with Dr. Shabeer Ahmed’s team for expert gastrointestinal and surgical care.',
    url: 'https://www.drshabeerahmed.in/login',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};


import LoginPage from "./Loginpage";
export default function Page() {
  return <LoginPage />;
}
