import { FC } from 'react';
import { useGetAuthorQuery } from '../graphql/operations/get_author.generated';

const Author: FC = () => {
  const { data } = useGetAuthorQuery({
    variables: {
      number: 234,
    },
  });
  console.log(data);
  return <div>AAA</div>;
};
export default Author;
