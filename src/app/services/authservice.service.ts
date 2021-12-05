import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject, Observable, of } from "rxjs";
import { cart } from "../Models/usermodel";

@Injectable({
  providedIn: "root",
})
export class AuthserviceService {
  Allcat: any;
  ALLsubcat: any;
  Allprd: any;
  arrayitems: cart[] = [];
  userregister: any;
  items: any[] = [];
  custom$: any;
  arr: any[];
  data: any[];
  Allprod:any;
  popularprd:any;
  temparray: cart[];
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
  login(user: any) {
    return this.httpdata.post(this.BASE_URL + "v1/auth/login", user);
  }

  register(user: any) {
    return this.httpdata.post(this.BASE_URL + "v1/customer/register", user);
  }

  authcheck() 
  {
    return !!localStorage.getItem("token");
  }

  private _products: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public readonly products: Observable<any> = this._products.asObservable();

  storeitems(array: any) {
    localStorage.setItem("items array", JSON.stringify(array));

    this.data = JSON.parse(localStorage.getItem("items array"));
    this._products.next(this.data);
  }
  storetemitems(array: cart[]) {
    localStorage.setItem("items array temp", JSON.stringify(array));
  }
  getitems() {
    return localStorage.getItem("items array");
  }

  async getpopularproducts()
  {
    this.popularprd = await this.httpdata
    .get(this.BASE_URL + 'v1/Product/popular')
    .toPromise();
  return this.popularprd;
  }

  async getAllProducts() {
    this.Allprd = await this.httpdata
      .get(this.BASE_URL + 'v1/Product')
      .toPromise();
    return this.Allprd;
  }
 
}
