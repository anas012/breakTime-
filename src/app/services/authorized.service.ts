import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthorizedService {
  BASE_URL = "https://breaktime1.herokuapp.com/";
  Role: string;
  constructor(private httpdata: HttpClient) {}
 
  settoken(token: string, userid: number, roleID:number,name:string,phone:string,rolename:string) {
    localStorage.setItem("token", token);
    localStorage.setItem("userid", userid.toString());
    localStorage.setItem("roleID", roleID.toString()),
    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);
    localStorage.setItem("rolename", rolename);
  }
  gettoken() {
    return localStorage.getItem("token");
  }
getuserid()
{
  return localStorage.getItem("userid")
}
getusername()
{
  return localStorage.getItem("name");
}
getuserphone()
{
  return localStorage.getItem("phone");
}

  placeorder(data:any)
  {
  return this.httpdata.post(this.BASE_URL+ 'v1/order/',data);
  }


  storeRole(role:string)
{
this.Role=role;
}

getRole()
{
  return this.Role;
}
}
