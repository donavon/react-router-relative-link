import React from 'react';
import {
  NavLink,
  withRouter,
  NavLinkProps,
  RouteComponentProps,
} from 'react-router-dom';
import CoreLink from './CoreLink';

const RelativeNavLink = (props: NavLinkProps & RouteComponentProps) => (
  <CoreLink
    BaseComponent={NavLink}
    {...props}
  />
);

export default withRouter(RelativeNavLink);
