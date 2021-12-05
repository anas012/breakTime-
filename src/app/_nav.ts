import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/main/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: "Orders",
    url: "/main/orders",
    icon: "icon-speedometer",
  },
 
  {
    name: "Products",
    url: "/main/product",
    icon: "icon-speedometer",
  },

  {
    name: "Category",
    url: "/main/cat",
    icon: "icon-speedometer",
  },
  {
    name: "Manage Jumbotron",
    url: "/main/jumbotron",
    icon: "icon-speedometer",
  },
];
