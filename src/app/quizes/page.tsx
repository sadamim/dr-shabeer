export const metadata = {
  title: 'Dr Shabeer Ahmed Quizzes – Test Your Knowledge Online Today! Free',
  description:
    'Explore quizzes by Dr. Shabeer Ahmed. Boost your knowledge with interactive, expert-designed tests—ideal for self-assessment and learning across key health topics.',
  keywords:
    'Dr Shabeer Ahmed Quizzes, Health Knowledge Quiz, Medical Self-Assessment, Interactive Health Tests, Free Online Quizzes',
  alternates: {
    canonical: 'https://www.drshabeerahmed.in/quizes',
  },
  openGraph: {
    title: 'Dr Shabeer Ahmed Quizzes – Test Your Knowledge Online Today! Free',
    description:
      'Explore quizzes by Dr. Shabeer Ahmed. Boost your knowledge with interactive, expert-designed tests—ideal for self-assessment and learning across key health topics.',
    url: 'https://www.drshabeerahmed.in/quizes',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};


import HealthQuizPage from "./Quizes";
export default function Page() {
  return <HealthQuizPage />;
}
