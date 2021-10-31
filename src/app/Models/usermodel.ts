import { StringLiteralLike } from "typescript";

export interface cartdetails {
  Name: string;
  image: string;
  price: number;
  total: number;
}

export interface order {
  UserID: number;
  OrderDetails: {
    ProductID: number;
    TotalPieces: number;
    CurrentRate: number;
    TotalValue: number;
  };
  Addresses: {
    City: string;
    Details: {
      Fname: string;
      lname: string;
      companyname: string;
      streetaddress: string;
      postalcode: string;
      state: string;
      phone: string;
      email: string;
    };
  };
}
export interface bilingdetails {
  city: string;
  fname: string;
  lname: string;
  companyname: string;
  streetaddress: string;
  postalcode: string;
  state: string;
  phone: string;
  email: string;
}

export interface catgories {
  CategoryID: string;
  Name: string;
  SubCategories: [
    {
      CategoryID: string;
      Name: string;
      SubCategoryID;
    }
  ];
}
export interface subcatgories {
  CategoryID: string;
  Name: string;
  SubCategoryID;
}

export interface Items {
  
  
    Name: string;
  ProductID: number;
  PurchasePrice: string;
  RetailPrice: string;
  SubCategoryID: string;
    
}
export interface cart 
{
    Name?:string;
    ProductID: number;
    CurrentRate:string;
    TotalPieces:number;
    TotalValue?:string;
}

export interface userregister{
  code:number;
  message:string;
}
export interface placeorder
{

  UserID:string,
  TotalAmount:string;
  OrderDetails:[{
  ProductID:number,
  TotalPieces:number,
  CurrentRate:number,
  TotalValue:number
  }],
  Addresses:[{
      City:string,
      Details:
      {

      }

  }]
  
}