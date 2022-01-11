import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/main/dashboard",
    icon: "icon-speedometer",
    badge: {
      variant: "info",
      text: "NEW",
    },
  },
  {
    name: "Orders",
    url: "/main/orders",
    icon: "fas fa-industry",
  },

  {
    name: "Products",
    url: "/main/product",
    icon: "fas fa-sitemap",
  },

  {
    name: "Category",
    url: "/main/cat",
    icon: "icon-speedometer",
  },
  {
    name: "Manage Jumbotron",
    url: "/main/jumbotron",
    icon: "far fa-images",
  },
  {
    name: "Settings",
    url: "/settings",
    icon: "fas fa-cog",
    children: [
      {
        name: "Reset Password",
        url: "/main/resetpw",
        icon: "fas fa-cog",
      },
      {
        name: "Register Admin",
        url: "/main/register",
        icon: "fas fa-user",
      },
    ],
  },
];
