import BlogPage from "./blogs";

export const metadata = {
  title: 'Latest Health Blogs And Medical Information | Dr Shabeer Ahmed',
  description:
    'Latest Health Blogs & Medical Info | Get expert insights and medical updates from Dr. Shabeer Ahmed to stay informed and improve your health and wellness effectively.',
  keywords:
    'Liver Cancer Surgery Specialist Bangalore, Liver Disease Specialist in Bangalore, Liver Surgery Specialist Bangalore',
  alternates: {
    canonical: 'https://www.drshabeerahmed.in/blogs',
  },
  openGraph: {
    title: 'Latest Health Blogs And Medical Information | Dr Shabeer Ahmed',
    description:
      'Latest Health Blogs & Medical Info | Get expert insights and medical updates from Dr. Shabeer Ahmed to stay informed and improve your health and wellness effectively.',
    url: 'https://www.drshabeerahmed.in/blogs',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function Page() {
  return <BlogPage />;
}
