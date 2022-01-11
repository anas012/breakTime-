import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
Allcat:any;
Allsubcat:any;
Role:string;
Allprd:any;
Allorder:any;
BASE_URL = "https://breaktime1.herokuapp.com/";
//BASE_URL="http://192.168.31.142:3000/";
  constructor(private httpdata:HttpClient) { }


  async getAllCategories() {
    this.Allcat = await this.httpdata
      .get(this.BASE_URL + "v1/category")
      .toPromise();
    return this.Allcat;
  }
  async getAllSubCategories() {
    this.Allsubcat = await this.httpdata
      .get(this.BASE_URL + "v1/subcategory")
      .toPromise();
    return this.Allsubcat;
  }
  authadmincheck() {
    return localStorage.getItem("rolename");
  }

createcat(data:any)
{
  return this.httpdata.post(this.BASE_URL+"v1/category",data)
}
createsubcat(data:any)
{
  return this.httpdata.post(this.BASE_URL+"v1/subcategory",data)
}

deletecat(id:string)
{
  return this.httpdata.patch(this.BASE_URL+`v1/category/${id}`,null);
}
deletesubcat(id:string)
{
  return this.httpdata.patch(this.BASE_URL+`v1/subcategory/${id}`,null);
}

createPrd(data)
{
  return this.httpdata.post(this.BASE_URL +'v1/Product',data);
}

async getAllprd(pageno)
{
this.Allprd=await this.httpdata.get(this.BASE_URL+`v1/Product/${pageno}`).toPromise();
return this.Allprd;
}
deletePrd(id:string)
{
  return this.httpdata.patch(this.BASE_URL +`v1/Product/${id}`,null);
}
createorder(data:any)
{
  return this.httpdata.post(this.BASE_URL +"v1/order",data);
}
 async getAllorder(Url,pageno,count)
{
if(Url=="Allorder")
{
  this.Allorder= await this.httpdata.get(this.BASE_URL +`v1/order/all/${pageno}?count=${count}`).toPromise();
 return this.Allorder;
}
else if (Url=="listdelivered")
{
  this.Allorder= await this.httpdata.get(this.BASE_URL +`v1/order/listdelivered/${pageno}?count=${count}`).toPromise();
  return this.Allorder;
}
else if(Url=='listcancelled')
{
  {
    this.Allorder=await this.httpdata.get(this.BASE_URL +`v1/order/listcancelled/${pageno}?count=${count}`).toPromise();
    return this.Allorder;
  }
}
}


orderconfirmed(id)
{
  return this.httpdata.patch(this.BASE_URL +`v1/order/delivered/${id}`,null);
}

ordercancel(id)
{
  return this.httpdata.patch(this.BASE_URL +`v1/order/${id}`,null);
}
resetpw(data,id)
{
  return this.httpdata.post(this.BASE_URL +`v1/auth/resetpassword/${id}`,data);
}

registeradmin(data)
{
  return this.httpdata.post(this.BASE_URL+'v1/auth/register',data);
}
}
