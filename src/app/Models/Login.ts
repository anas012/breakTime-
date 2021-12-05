export interface login
{
    Email:string;
    Password:string;
}
export interface logedin
{

    UserID:number;
    Name:string;
    Email:string;
    Phone:string;
    
    token:{
        access_token:string;
        exp?:number;
        iat?:number;
    }
    Role:{
        Name:string;
        RoleID:number;
    }
}