const videoData = [
  {
    title: 'Robotic Surgery Explained',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'Laparoscopy in Action',
    url: 'https://www.youtube.com/embed/tgbNymZ7vqY',
  },
  {
    title: 'What is Bariatric Surgery?',
    url: 'https://www.youtube.com/embed/zH-c99R2tMU',
  },
  {
    title: 'Post-Op Recovery Advice',
    url: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
  },
  {
    title: 'Inside the Operation Theater',
    url: 'https://www.youtube.com/embed/M7lc1UVf-VE',
  },
  {
    title: 'Live GI Surgery Webinar',
    url: 'https://www.youtube.com/embed/vbF5QIwUPJg',
  },
  {
    title: 'Meet Dr. Shabeer',
    url: 'https://www.youtube.com/embed/oHg5SJYRHA0',
  },
  {
    title: 'How We Handle Emergencies',
    url: 'https://www.youtube.com/embed/kJQP7kiw5Fk',
  },
  {
    title: 'Nutrition After Surgery',
    url: 'https://www.youtube.com/embed/jfKfPfyJRdk',
  },
  {
    title: 'Common Myths About GI Surgery',
    url: 'https://www.youtube.com/embed/RgKAFK5djSk',
  }
];

const reelData = [
  {
    title: '1-Minute Robotic Clip',
    videoSrc: '/videos/reel1.mp4',
  },
  {
    title: 'Patient Recovery Reel',
    videoSrc: '/videos/reel2.mp4',
  },
  {
    title: 'Behind the Scenes',
    videoSrc: '/videos/reel3.mp4',
  },
  {
    title: 'Staff Introduction',
    videoSrc: '/videos/reel4.mp4',
  },
  {
    title: 'Sanitation Protocols',
    videoSrc: '/videos/reel5.mp4',
  },
  {
    title: 'Quick Tips: GI Health',
    videoSrc: '/videos/reel6.mp4',
  },
  {
    title: 'Smile of Recovery',
    videoSrc: '/videos/reel7.mp4',
  },
  {
    title: 'Diabetic Surgery Insight',
    videoSrc: '/videos/reel8.mp4',
  },
  {
    title: 'Outreach Camp Moments',
    videoSrc: '/videos/reel9.mp4',
  },
  {
    title: 'Daily Routine in Clinic',
    videoSrc: '/videos/reel10.mp4',
  }
];

const testimonials = [
    {
        name: 'Arati Sethy',
        content: `Amidst of covid pandemic, my aunt got diagnosed with
      colon tumor. Local doctors diagnosed it as cancer
      stage-1. As they stay in my native place Odisha, we
      were clueless what to do. I live in bangalore. One
      of my colleague referred Dr. Shabeer. With no delay,
      i took his appointment and rushed to him. After
      going through the reports without even checking the
      patient, he said chemo may not be required. He
      helped a lot to get my aunt here and directly get
      admitted to Fortis for surgery. Post surgery, biopsy
      report revealed that its stage 0 and no need for
      chemo therapy. Everything just happened ontime and
      perfectly. When i thanked Dr. Sir, he was humble
      enough to give the credit to Allaha. Sir, you were a
      blessing to our family in this crisis. My uncle aunt
      were so happy and pleased by your interaction in
      entire process. May God always bless you and help
      you in serving mankind. Thank you very much.`,
    },
    {
        name: 'Inayathulla Khan Lavani',
        content: `Before visiting Dr. Shabeer Ahmed for my dad's
      surgery, I had visited other doctors and wasn't
      satisfied enough, and I must say Dr is very humble
      person who shows compassion towards patients and
      also authority in field of laparoscopy, which is
      rare combination to find in this mundane world.
      Moreover my dad's surgery was successful and he is
      recovering. I would definately recommend anyone to
      visit Dr once before taking final call`,
    },
    {
        name: 'Mir Nasair Hussain',
        content: `Best ever Dr.I have seen in Bangalore God has given
      shiffa in his hand Excellent treatment centre in
      Bangalore I was suffering piles from 11years He did
      my operation successful Dr. Shabeer Ahmed has 30
      years Excellent Experience God give him Good Health
      / wealth I salute you sir`,
    },
];
export const metadata = {
  title: 'Dr Shabeer Ahmed – Inspiring Patient Testimonials & Video Reels.',
  description:
    'Watch video testimonials and reels of Dr Shabeer Ahmed highlighting patient stories, surgical success, and expert care in gastrointestinal and laparoscopic treatment.',
  keywords:
    'Patient Testimonials, Dr Shabeer Ahmed Reels, Surgical Success Videos, Gastrointestinal Treatment Stories, Laparoscopic Care Bangalore',
  alternates: {
    canonical: 'https://www.drshabeerahmed.in/videos-reels-testimonial',
  },
  openGraph: {
    title: 'Dr Shabeer Ahmed – Inspiring Patient Testimonials & Video Reels.',
    description:
      'Watch video testimonials and reels of Dr Shabeer Ahmed highlighting patient stories, surgical success, and expert care in gastrointestinal and laparoscopic treatment.',
    url: 'https://www.drshabeerahmed.in/videos-reels-testimonial',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MediaShowcasePage() {
  return (
    <div className="media-showcase-wrapper">
      <div className="container">
                <h1 className="page-title d-none">Patient Testimonials & Video Reels</h1>

        <h2 className="page-title">Media & Testimonials</h2>
{/* 
        <section className="media-section">
          <h3 className="section-heading">Videos</h3>
          <div className="media-grid">
            {videoData.map((video, index) => (
              <div className="media-card" key={index}>
                <iframe
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                  className="media-video"
                ></iframe>
                <p className="media-title">{video.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="media-section">
          <h3 className="section-heading">Reels</h3>
          <div className="media-grid">
            {reelData.map((reel, index) => (
              <div className="media-card" key={index}>
                <video
                  className="media-video"
                  controls
                  src={reel.videoSrc}
                ></video>
                <p className="media-title">{reel.title}</p>
              </div>
            ))}
          </div>
        </section> */}

        {/* Testimonials Section */}
        <section className="testimonial-section">
          <h3 className="section-heading">Patient Testimonials</h3>
          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <div className="testimonial-card" key={index}>
                <p className="testimonial-feedback">"{item.name}"</p>
                <p className="testimonial-name">- {item.name}, {item.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
