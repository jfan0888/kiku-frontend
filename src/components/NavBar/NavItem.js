import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const profileIcon = require('../../assets/images/avatar.png');
const ideasIcon = require('../../assets/images/warning.png');
const inProgressIcon = require('../../assets/images/edit.png');
const completeIcon = require('../../assets/images/check.png');
const logoutIcon = require('../../assets/images/logout-circle.png');

const NavItemIcon = ({ title }) => {
  let itemIcon = null;
  switch (title) {
    case 'profile':
      itemIcon = profileIcon;
      break;
    case 'ideas':
      itemIcon = ideasIcon;
      break;
    case 'in progress':
      itemIcon = inProgressIcon;
      break;
    case 'complete':
      itemIcon = completeIcon;
      break;
    case 'log out':
      itemIcon = logoutIcon;
      break;
    default:
      break;
  }

  return <img alt="nav icon" src={itemIcon} className="nav-item-icon" />;
};

const NavItem = ({ title, pageLink }) => (
  <Link className="bottom-navbar--nav-item" to={pageLink}>
    <NavItemIcon title={title} />
    <span className="nav-item-text">{title}</span>
  </Link>
);

NavItem.propTypes = {
  title: PropTypes.string,
  pageLink: PropTypes.string,
};

NavItem.defaultProps = {
  title: 'Nav Item',
  pageLink: '/',
};

export default NavItem;
