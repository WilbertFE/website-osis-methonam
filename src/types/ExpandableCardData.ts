export type ExpandableCardData = {
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => React.JSX.Element;
};
