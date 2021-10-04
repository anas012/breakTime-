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
    name: "Items",
    url: "/main/items",
    icon: "icon-speedometer",
  },
 
  
];
