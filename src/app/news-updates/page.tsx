// src/app/news-updates/page.tsx

import Newsupdate from '../news-updates/Newsupdate'; // adjust path as needed

export const metadata = {
  title: 'Gastroenterology Specialist in Bangalore – Latest News & Updates',
  description:
    'Explore recent updates, medical insights, & GI health tips from the top Gastroenterology Specialist in Bangalore. Stay informed and prioritize your digestive health.',
  keywords: 'Gastroenterology Specialist in Bangalore',
  alternates: {
    canonical: 'https://www.drshabeerahmed.in/news-updates',
  },
  openGraph: {
    title: 'Gastroenterology Specialist in Bangalore – Latest News & Updates',
    description:
      'Explore recent updates, medical insights, & GI health tips from the top Gastroenterology Specialist in Bangalore. Stay informed and prioritize your digestive health.',
    url: 'https://www.drshabeerahmed.in/news-updates',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function Page() {
  return <Newsupdate />;
}
