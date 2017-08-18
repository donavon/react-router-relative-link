import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import CoreLink from './CoreLink';

const RelativeLink = props => (
  <CoreLink BaseComponent={Link} {...props} />
);

export default withRouter(RelativeLink);
