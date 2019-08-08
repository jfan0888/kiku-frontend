import React from 'react';

import Header from '../Header';
import Navbar from '../NavBar';
import routes from '../../Routes';

import './styles.scss';

const LoggedComponent = ({ title, children, hasMusic, statusText }) => (
  <>
    <Header title={title} hasMusic={hasMusic} statusText={statusText} />
    {children}
    <Navbar routes={routes} />
  </>
);

export default LoggedComponent;
