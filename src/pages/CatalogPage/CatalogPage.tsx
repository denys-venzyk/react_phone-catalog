type Props = {
  type: 'phones' | 'tablets' | 'accessories';
};

export const CatalogPage: React.FC<Props> = ({ type }) => <h1>{type} page</h1>;
