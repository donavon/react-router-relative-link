import React, { ComponentType } from 'react';
import resolvePathname from 'resolve-pathname';
import {
  LinkProps,
  NavLinkProps,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Location,
  LocationDescriptorObject,
  LocationDescriptor,
} from 'history';

const ensureLeadingAndTrailingSlashes = (path: string) =>
  path.replace(/^\/?/, '/').replace(/\/?$/, '/');
const removeTrailingSlash = (path: string) =>
  path.replace(/\/$/, '') || '/';
const removeQuery = (path: string) =>
  path.split('?')[0];
const resolvePathnameNoTrailingSlash = (path?: string, currentPath?: string) =>
  removeTrailingSlash(resolvePathname(`${path}`, currentPath));

const extractCurrentPath = (currentPath: string) => (
  ensureLeadingAndTrailingSlashes(removeQuery(currentPath))
);

const CoreLink = ({
  BaseComponent,
  match,
  to: relativeTo,
  staticContext,
  ...others
}: {
  BaseComponent: ComponentType<LinkProps> | ComponentType<NavLinkProps> | ((props: any) => any);
  to: string | LocationDescriptorObject | ((l: Location) => LocationDescriptor);
} & RouteComponentProps) => {
  const currentPath = extractCurrentPath(match.url);
  const to = typeof relativeTo == 'object'
    ? {
      ...relativeTo,
      pathname: resolvePathnameNoTrailingSlash(relativeTo.pathname, currentPath),
    }
    //  ??? relativto can be a function!!!!
    : resolvePathnameNoTrailingSlash(relativeTo as string, currentPath);

  return <BaseComponent
    to={to}
    {...others}
  />;
};

export default CoreLink;
