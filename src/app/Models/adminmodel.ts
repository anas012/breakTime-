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