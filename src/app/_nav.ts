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
  {
    name: "Add Items",
    url: "/main/Additems",
    icon: "icon-speedometer",
  },
  {
    name: "Category",
    url: "/main/cat",
    icon: "icon-speedometer",
  },
];
