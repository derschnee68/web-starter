import React, { forwardRef } from 'react';
import NextLink from 'next/link';

export const LinkBehaviour = forwardRef<HTMLAnchorElement, { href: string }>(function LinkBehaviour(
  { href, ...props },
  ref,
) {
  return <NextLink href={href} ref={ref} {...props} />;
});
