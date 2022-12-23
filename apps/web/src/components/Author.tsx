import type { FC } from 'react';
import { useGetAuthorQuery } from '../graphql/operations/get_author.generated';

const Author: FC = () => {
  const { data } = useGetAuthorQuery({
    variables: {
      number: 234,
    },
  });
  return <div>{data?.getAuthor}</div>;
};
export default Author;
