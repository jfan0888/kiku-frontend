import React from 'react';

import Header from '../Header';
import Navbar from '../NavBar';
import routes from '../../Routes';

import './styles.scss';

const LoggedComponent = ({
  title,
  children,
  hasMusic,
  statusText,
  audioUrl,
}) => (
  <>
    <Header
      title={title}
      hasMusic={hasMusic}
      statusText={statusText}
      audioUrl={audioUrl}
    />
    {children}
    <Navbar routes={routes} />
  </>
);

export default LoggedComponent;
