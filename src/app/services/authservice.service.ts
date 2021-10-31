import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { cart } from "../Models/usermodel";

@Injectable({
  providedIn: "root",
})
export class AuthserviceService {
  Allcat: any;
  ALLsubcat: any;
  Allprd: any;
  arrayitems:cart[]=[];
  userregister:any;
  BASE_URL = "https://breaktime1.herokuapp.com/";
  constructor(private httpdata: HttpClient) {}

  async getAllCategories() {
    this.Allcat = await this.httpdata
      .get(this.BASE_URL + "v1/category")
      .toPromise();
    return this.Allcat;
  }
  async getproducts(id: string) {
    this.Allprd = await this.httpdata
      .get(this.BASE_URL + `v1/subcategory/${id}`)
      .toPromise();
    return this.Allprd;
  }
  login(user:any)
  {
    return this.httpdata.post(this.BASE_URL + 'v1/auth/login',user);
  }

  register(user:any)
  {
    return this.httpdata.post(this.BASE_URL + 'v1/auth/register',user);
  }
  storeitemsarray(array:cart[])
  {   
    for(let i=0;i<array.length;i++)
    {
      this.arrayitems[i]=array[i];
    }
     
  }
  getitemsarray()
  {
    return this.arrayitems;
  }
  authcheck() {
    return !!localStorage.getItem('token');
  }
  
}
