import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import CoreLink from './CoreLink';

const RelativeNavLink = props => (
  <CoreLink BaseComponent={NavLink} {...props} />
);

export default withRouter(RelativeNavLink);
