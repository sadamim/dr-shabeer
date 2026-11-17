import { SITE } from '@/lib/site';

export type FaqItem = { question: string; answer: string };

// Answers reflect how appointments actually work on this site:
// online via Fortis Hospital, a request via Eka Care, or phone / WhatsApp.
export const HOME_FAQS: FaqItem[] = [
  {
    question: 'How do I book an appointment with Dr. Shabeer Ahmed?',
    answer: `You can book online through Dr. Shabeer Ahmed's profile on the ${SITE.appointmentHospital} website, send an appointment request through Eka Care, or call / WhatsApp the clinic on ${SITE.phoneDisplay}.`,
  },
  {
    question: 'Where is the clinic located?',
    answer: `The clinic's address is ${SITE.address}. For hospital consultations, use the ${SITE.appointmentHospital} booking link.`,
  },
  {
    question: 'What should I do if I need to cancel or reschedule my appointment?',
    answer:
      'If you need to cancel or reschedule, contact the clinic as soon as possible so another available time slot can be arranged.',
  },
  {
    question: "What if I'm running late for my appointment?",
    answer:
      "If you know you'll be late, please call the clinic. Depending on the schedule, your visit may be accommodated or rescheduled.",
  },
  {
    question: 'Can I book appointments for family members or dependents?',
    answer:
      'Yes, you can book for family members or dependents. You may need to provide their details and consent.',
  },
  {
    question: 'How can I contact the clinic with a question?',
    answer: `Call or WhatsApp ${SITE.phoneDisplay}, email ${SITE.email}, or use the form on the Contact page.`,
  },
];
