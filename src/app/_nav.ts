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
    url: "/main/products",
    icon: "icon-speedometer",
  children:[
    {
      name:'Add products',
      url:"/main/products/addprd",
      icon: "icon-speedometer"
    },
    {
      name:'All products',
      url:"/main/products/allprd",
      icon: "icon-speedometer"
    }
  ]
  
  },

  {
    name: "Category",
    url: "/main/cat",
    icon: "icon-speedometer",
  },
];
