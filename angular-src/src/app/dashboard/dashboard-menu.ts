import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'fa fa-home',
    link: '/dashboard',
    home: true
  },
  {
    title: 'Items',
    icon: 'fa fa-shopping-basket',
    link: '/dashboard/items'
  },
  {
    title: 'Store',
    icon: 'fa fa-shopping-cart',
    link: '/dashboard/store'
  },
  {
    title: 'Cart',
    icon: 'fa fa-cart-arrow-down',
    link: '/dashboard/cart'
  },
  {
    title: 'Team',
    icon: 'fa fa-users',
    link: '/dashboard/team'
  },
  {
    title: 'About',
    icon: 'fa fa-info',
    link: '/dashboard/about'
  }
];
