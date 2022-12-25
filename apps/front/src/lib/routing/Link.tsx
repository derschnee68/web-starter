import omit from 'lodash/omit';
import pick from 'lodash/pick';
import type { LinkProps as NextLinkProps } from 'next/link';
import NextLint from 'next/link';
import type { FC } from 'react';
import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
import MuiLink from '@mui/material/Link';

interface LinkProps extends Omit<NextLinkProps, 'onMouseEnter' | 'onClick'>, Omit<MuiLinkProps, 'href'> {}

const NEXT_PROPS = ['href', 'as', 'replace', 'scroll', 'shallow', 'prefetch', 'locale', 'legacyBehavior'] as const;

const Link: FC<LinkProps> = ({ children, ...props }) => {
  const nextProps = pick(props, NEXT_PROPS);
  const muiProps = omit(props, NEXT_PROPS);

  return (
    <NextLint passHref {...nextProps}>
      <MuiLink {...muiProps}>{children}</MuiLink>
    </NextLint>
  );
};

export default Link;
