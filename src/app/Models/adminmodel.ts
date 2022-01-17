
import { Address, getAddress } from "./Adressdetails";
import { OrderDetails } from "./Orderdetails";
export interface cartdetails {
  productId: number;
  Name: string;
  image: string;
  price: number;
}

export interface ordersdetails {
  OrderNo: number;
}

export interface category {
  CategoryID: string;
  Name: string;
}
export interface ADDCat{
    Name:string;

}

export interface ADDSubcat{
    CategoryID:number;
    Name:string;
}
export interface subcat{
    CategoryID:string;
    SubCategoryID:string;
    Name:string;
}
export interface newprd
{
  Name:string;
  RetailPrice:string;
  PurcahsePrice:string;
  SubCategoryID:string;
  Quantity:string;
  InStock:boolean;
  Identifier:string;

}
export interface Allprdoducts
{
  ProductID:string;
  Name:string;
  RetailPrice:string;
  PurchasePrice:string;
  InStock:boolean;
  Quantity:string;
  SubCategory:
  {
    Category:{
      Name:string
    },
    Name:string,
    SubCategoryID:string;
  }
 
}
export interface createorder
{
  UserID:string;
  PaymentMethod:string;
  TotalBill:string;
  OrderDetails:any[],
  Addresses:
  {
    City:string;
    Details:Address[];
  }
}
export interface AllOrders
{
  Addresses:

    {
      City:string;
      Details:[];
    },
  OrderID: string;
  OrderDate: string;
  OrderDetails:OrderDetails[],
  PaymentMethod:string;
  TotalBill: string;
  streetaddress:string;
  CreatedBy:string;
  Status:any;

}

export interface homeaddress
{
  streetaddress:string;
}
export interface PageInfo
{
  hasNextPage:boolean;
  hasPreviousPage:boolean;
  lastPage:string;
  nextPage: string;
  previousPage:string;
  totalProducts:string;
}
