import React from 'react';
import PropTypes from 'prop-types';

import NavItem from './NavItem';
import './styles.scss';

const NavBar = ({ routes }) => (
  <div className="bottom-navbar-container">
    {routes
      .filter(item => item.bottomNavItem === true)
      .map(({ title, pageLink }) => (
        <NavItem key={title} title={title} pageLink={pageLink} />
      ))}
  </div>
);

NavBar.propTypes = {
  routes: PropTypes.array,
};

NavBar.defaultProps = {
  routes: [],
};

export default NavBar;
