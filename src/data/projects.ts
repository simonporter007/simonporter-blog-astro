export type Project = {
  title: string;
  description: string;
  link: string;
  isComingSoon?: boolean;
};

const projects: Project[] = [
  {
    title: 'CSS Glow Generator',
    description:
      'A CSS glow generator to create your own glow effect with box-shadows.',
    link: '/tools/css-glow-generator',
  },
  {
    title: 'Portfolio / Lina BLIDI',
    description: 'test',
    link: 'https://www.linablidi.fr/',
  },
  {
    title: 'Portfolio / Template',
    description: 'test',
    link: '/',
    isComingSoon: true,
  },
];

export default projects;
