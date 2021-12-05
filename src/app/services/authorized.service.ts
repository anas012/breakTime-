import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as SecureLS from "secure-ls";
@Injectable({
  providedIn: "root",
})
export class AuthorizedService {
  BASE_URL = "https://breaktime1.herokuapp.com/";
  private ls;
  constructor(private httpdata: HttpClient) {}

  gettoken() {
    return localStorage.getItem("$$#@_&*&");
  }

  getUserName() {
    let ls = new SecureLS({ encodingType: "rc4", isCompression: false });
    let userData = ls.get("&*@#$$");
    return this.ucfirst(userData.Name);
  }
  getUserPhone() {
    let ls = new SecureLS({ encodingType: "rc4", isCompression: false });
    let userData = ls.get("&*@#$$");
    return this.ucfirst(userData.Phone);
  }
  getUserId() {
    let ls = new SecureLS({ encodingType: "rc4", isCompression: false });
    let userData = ls.get("&*@#$$");
    return userData.UserID;
  }
  getUserRole() {
    let ls = new SecureLS({ encodingType: "rc4", isCompression: false });
    let userData = ls.get("^&%$*");
    return this.ucfirst(userData);
  }

  ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // #region authorized api
  placeorder(data: any) {
    return this.httpdata.post(this.BASE_URL + "v1/order/", data);
  }
//#endregion
}
