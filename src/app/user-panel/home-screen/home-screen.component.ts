import {
  Component,
  Injectable,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { MegaMenuItem, MenuItem, MessageService } from "primeng/api";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm } from "@angular/forms";
import { logedin, login } from "../../Models/Login";
import { register } from "../../Models/signup";
import { AuthserviceService } from "../../services/authservice.service";
import { cart, userregister } from "../../Models/usermodel";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthorizedService } from "../../services/authorized.service";
import * as SecureLS from "secure-ls";
import { NgxSpinnerService } from "ngx-spinner";
import { CommonserviceService } from "../../services/commonservice.service";
@Component({
  selector: "app-home-screen",
  templateUrl: "./home-screen.component.html",
  styleUrls: ["./home-screen.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class HomeScreenComponent implements OnInit {
  loginmodal: boolean;
  message: string;
  summary: string;
  signupmodal: boolean;
  items: MenuItem[];
  country: string;
  islogin: boolean;
  isguest: boolean;
  cat: any[];
  arrayofitems: cart[] = [];
  subtotal: number;
  itemcount: number;
  userdata: logedin;
  errmessage: string;
  position: string;
  errordialoguemodal: boolean;
  username: string;
  userphone: string;
  array: cart[] = [];
  carthasitem = false;
  disable = true;
  productSubscription;
  sourceProduct: any;
  data1: any[];
  cartvalue: number;
  badgealert = false;
  productsubscription;
  data2;
  cartsidebar: boolean;
  private ls;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthserviceService,
    private authorized: AuthorizedService,
    private messageservice: MessageService,
    private spinner: NgxSpinnerService,
    private commonserv:CommonserviceService

  ) {}

  ngOnInit(): void {
    let activeroute = this.router.url;
    //console.log(activeroute);
    if (activeroute != "/startup/mainpage") {
      this.router.navigate([activeroute], { relativeTo: this.route });
    }
    if (activeroute == "/") {
      this.router.navigate(["/startup/mainpage"], { relativeTo: this.route });
    }

    this.checkcartcount();
    let rolename = this.authorized.getUserRole();
    if (rolename === "User") {
      this.username = this.authorized.getUserName();
      this.userphone = this.authorized.getUserPhone();
      this.islogin = true;
    } else {
      this.islogin = false;
    }
    this.productSubscription = this.commonserv.products.subscribe((data) => {
      this.data1 = data;
      //  console.log("Home screen data from obser");
      if (this.data1 != null) {
        //   console.log("obseravable array",this.data1.length);
        if (this.data1.length != 0) {
          // localStorage.setItem('cartcount',this.data1.length.toString());
          this.badgealert = true;
          this.checkcartcount();
          // console.log("length",this.data1.length)
        } else {
          //  localStorage.setItem('cartcount',"0");
          this.badgealert = false;
        }
      }
    });
    this.checkitemscount();
  }

  checkcartcount() {
    let value: any[] = JSON.parse(this.commonserv.getitems());
    //console.log("carrt values array ",value);
    if (value) {
      if (value.length != 0) {
        //  console.log(value);
        this.badgealert = true;
        this.cartvalue = value.length;
        //  console.log("cart value",value.length);
      } else {
        this.badgealert = false;
      }
    } else {
      this.badgealert = false;
    }
  }

  showloginmodal() {
    this.loginmodal = true;
  }
  onlogout() {
    localStorage.removeItem("^&%$*");
    localStorage.removeItem("$$#@_&*&");
    localStorage.removeItem("&*@#$$");
    this.islogin = false;
    this.summary = "Success";
    this.message = "Successfully Logout";
    this.showSuccess();
    // var a=this.router.url;
    // if(a!="startup/mainpage")
    // {
    this.router.navigate(["startup/mainpage"]);
    // }
  }
  opensignup() {
    this.loginmodal = false;
    this.signupmodal = true;
  }
  onLogin(form: NgForm) {
    if (!form.valid) return;
    else {
      this.loginmodal = false;
      var c = this.userlogin(form);
      console.log(c);
     this.spinner.show();
      this.auth.login(c).subscribe(
        (res: logedin) => {
          this.spinner.hide();
          console.log("after login res", res);
          this.userdata = res["Data"]["data"];
          this.userdata.token = res["Data"]["token"];
          this.userdata.Role = res["Data"]["data"]["Role"];
        
          localStorage.setItem("$$#@_&*&", this.userdata.token.access_token);
          var ls = new SecureLS({ encodingType: "rc4", isCompression: false });
          ls.set("&*@#$$", this.userdata);
          ls.set("^&%$*", this.userdata.Role.Name);

          this.username = this.authorized.getUserName();
          this.userphone = this.authorized.getUserPhone();

          // console.log("username",this.username);
          // console.log("userphone",this.userphone);
          let rolename = this.authorized.getUserRole();
          // console.log('rolenameee',rolename);
          this.islogin = true;

          this.summary = "Suceess";
          this.message = "Successfully Logedin";
          this.showSuccess();
          if (rolename === "User") {
            //  console.log("userroute in homescree");
          } else {
            //    console.log("adminroute in homescreen");
            this.router.navigate(["main/dashboard"]);
          }
        },

        (errorMessage: HttpErrorResponse) => {
          this.spinner.hide();
          if (errorMessage) {
            this.errmessage = errorMessage.error["Status"].message;

            this.showerror();
          }
        }
      );
    }
  }
  showerror() {
    this.position = "top";
    this.errordialoguemodal = true;
  }
  onOK() {
    this.errordialoguemodal = false;
  }
  onRegister(form: NgForm) {
    if (!form.valid) return;
    else {
      this.signupmodal = false;
      var c = this.userRegister(form);
      // console.log(c);

      this.auth.register(c).subscribe(
        (res: userregister) => {
          // console.log(res);
          this.summary = "Success";
          this.message = "Registered Successfully";
          this.showSuccess();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.errmessage = error.error["Status"].message;
          this.showerror();
        }
      );
    }
  }

  userRegister(form: NgForm) {
    const Data: register = {
      Phone: this.country + form.value.phone,
      Password: form.value.password,
      Email: form.value.email,
      Name: form.value.name,
    };

    var user = {
      Data,
    };
    return user;
  }

  userlogin(form: NgForm) {
    const Data: login = {
      Email: form.value.email,
      Password: form.value.password,
    };

    var user = {
      Data,
    };

    return user;
  }
  cart() {
    this.cartsidebar = true;
    this.arrayofitems = JSON.parse(this.commonserv.getitems());
    //console.log("cart fun called")
    if (this.arrayofitems != null) {
      this.calculatetotal();
      this.itemcount = this.arrayofitems.length;
      // console.log("items count in cart",this.itemcount)
    } else {
      this.carthasitem = false;
      // console.log("cart item flag",this.carthasitem);
      this.itemcount = 0;
      this.subtotal = 0;
      this.disable = true;
    }
  }
  cartsidebarclose() {
    this.cartsidebar = false;
  }
  checkitemscount() {
    this.productsubscription = this.commonserv.products.subscribe((data) => {
      var array: any[] = [];
      array = data;
      if (array != null) {
        // console.log("items count",array.length);
        this.itemcount = array.length;
      }
    });
  }
  calculatetotal() {
    // console.log("fun called")
    let sum = 0;
    console.log(this.arrayofitems.length);
    if (this.arrayofitems.length != 0) {
      //   console.log('if called')
      for (let i = 0; i < this.arrayofitems.length; i++) {
        this.subtotal = parseInt(this.arrayofitems[i].TotalValue);
        sum = sum + this.subtotal;
        this.carthasitem = true;
        //     console.log("cart item flag",this.carthasitem);
        this.disable = false;
      }

      this.subtotal = sum;
    } else {
      //  console.log('else called')
      this.carthasitem = false;
      console.log("cart item flag", this.carthasitem);
      this.itemcount = 0;
      this.subtotal = 0;
      this.disable = true;
    }
  }
  ondeleteitem(id) {
    for (let i = 0; i < this.arrayofitems.length; i++) {
      if (id == this.arrayofitems[i].ProductID) {
        this.arrayofitems.splice(i, 1);
      }
    }
    this.commonserv.storeitems(this.arrayofitems);
    this.calculatetotal();
  }
  proccedtocheckout() {
    this.router.navigate(["checkout"]);
  }

  showSuccess() {
    this.messageservice.add({
      severity: "success",
      summary: this.summary,
      detail: this.message,
    });
  }
  oneditcart(id, name, qty, price) {
    for (let i = 0; i < this.arrayofitems.length; i++) {
      if (this.arrayofitems[i].ProductID == id) {
        this.arrayofitems[i].TotalPieces = qty;
        var totalvalue = qty * price;
        this.arrayofitems[i].TotalValue = totalvalue.toString();
      }
    }

    this.commonserv.storeitems(this.arrayofitems);
    this.calculatetotal();
  }

  onSearch(form: NgForm) {
    var searchitem = form.value.search;
    this.router.navigate(["startup/searcheditem", searchitem]);
  }
  checkinginput(id, price, name, quantity, addcart, inputvalue) {
    console.log(inputvalue.value);

    var products: cart[] = JSON.parse(this.commonserv.getitems());
    if (products != null) {
      if (inputvalue.value >= 1 && inputvalue.value <= 10) {
        // console.log("first run")
        for (let i = 0; i < products.length; i++) {
          if (id === products[i].ProductID) {
            products[i].TotalPieces = inputvalue.value;
            var sum = 0;
            products[i].TotalPieces = inputvalue.value;
            sum = inputvalue.value * parseInt(price);
          }
        }
        this.commonserv.storeitems(products);
        products = [];
      } else {
        //  console.log("second run")
        for (let i = 0; i < this.arrayofitems.length; i++) {
          if (id == this.arrayofitems[i].ProductID) {
            this.arrayofitems.splice(i, 1);
          }
        }
        this.commonserv.storeitems(this.arrayofitems);
        this.calculatetotal();
      }
    }
  }
}
