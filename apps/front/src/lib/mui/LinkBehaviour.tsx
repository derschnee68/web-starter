import { forwardRef } from 'react';
import NextLink from 'next/link';

export const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
  return <NextLink ref={ref} {...props} />;
});
