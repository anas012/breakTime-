import { StringLiteralLike } from "typescript";

export interface cartdetails
{
    Name:string;
    image:string;
    price:number;
    total:number;
}


export interface order
{
    UserID:number;
    OrderDetails:
    {
        ProductID:number;
        TotalPieces:number;
        CurrentRate:number;
        TotalValue:number;
    }
    Addresses:
    {
        City:string;
        Details:
        {
            Fname:string;
            lname:string;
            companyname:string;
            streetaddress:string;
            postalcode:string;
            state:string;
            phone:string;
            email:string;
        }
    }

}
export interface bilingdetails
{
    city:string;
    fname:string;
    lname:string;
    companyname:string;
    streetaddress:string;
    postalcode:string;
    state:string;
    phone:string;
    email:string;
}