import {
  SignIn,
  Profile,
  Ideas,
  InProgress,
  Complete,
  Song,
} from './containers';

const Routes = [
  // {
  //   title: 'signin',
  //   pageLink: '/',
  //   component: SignIn,
  // },
  {
    title: 'profile',
    pageLink: '/',
    component: Profile,
    bottomNavItem: true,
  },
  {
    title: 'ideas',
    pageLink: '/ideas',
    component: Ideas,
    bottomNavItem: true,
  },
  {
    title: 'idea detail',
    pageLink: '/ideas/:songId',
    component: Song,
  },
  {
    title: 'in progress',
    pageLink: '/in-progress',
    component: InProgress,
    bottomNavItem: true,
  },
  {
    title: 'in progress detail',
    pageLink: '/in-progress/:songId',
    component: Song,
  },
  {
    title: 'complete',
    pageLink: '/completed',
    component: Complete,
    bottomNavItem: true,
  },
  {
    title: 'completed detail',
    pageLink: '/completed/:songId',
    component: Song,
  },
  {
    title: 'log out',
    pageLink: '/',
    component: SignIn,
    bottomNavItem: true,
  },
];

export default Routes;
