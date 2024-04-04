type Social = {
  label: string;
  link: string;
};

type Presentation = {
  socials: Social[];
};

const presentation: Presentation = {
  socials: [
    {
      label: 'X',
      link: 'https://twitter.com/simonporterdev',
    },
    {
      label: 'Github',
      link: 'https://github.com/simonporter007',
    },
  ],
};

export default presentation;
