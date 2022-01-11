import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { cart } from "../Models/usermodel";
@Injectable({
  providedIn: "root",
})
export class CommonserviceService {
  data: any[];
  constructor() {}

  authcheck() {
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
}
