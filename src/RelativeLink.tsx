import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import CoreLink from './CoreLink';
import {
  LinkProps,
  RouteComponentProps
} from 'react-router-dom';

const RelativeLink = (props: LinkProps & RouteComponentProps) => (
  <CoreLink
    BaseComponent={Link}
    {...props}
  />
);

export default withRouter(RelativeLink);
