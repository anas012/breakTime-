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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthserviceService,
    private authorized: AuthorizedService,
    private messageservice: MessageService
  ) {}

  ngOnInit(): void {
    let activeroute = this.router.url;
    console.log(activeroute);
    if (activeroute != "/startup/mainpage") {
      this.router.navigate([activeroute], { relativeTo: this.route });
    }
    if (activeroute == "/") {
      this.router.navigate(["/startup/mainpage"], { relativeTo: this.route });
    }

    this.checkcartcount();
    if (localStorage.getItem("rolename") === "User") {
      this.username = this.authorized.getusername();
      this.userphone = this.authorized.getuserphone();
      this.islogin = true;
    } else {
      this.islogin = false;
    }
    this.productSubscription = this.auth.products.subscribe((data) => {
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
    let value: any[] = JSON.parse(this.auth.getitems());
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
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("roleID");
    localStorage.removeItem("name");
    localStorage.removeItem("phone");
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
      this.auth.login(c).subscribe(
        (res: logedin) => {
          this.userdata = res["Data"]["data"];
          this.userdata.token = res["Data"]["token"];
          this.userdata.Role = res["Data"]["data"]["Role"];

          this.authorized.settoken(
            this.userdata.token.access_token,
            this.userdata.UserID,
            this.userdata.Role.RoleID,
            this.userdata.Name,
            this.userdata.Phone,
            this.userdata.Role.Name
          );
          this.username = this.authorized.getusername();
          this.userphone = this.authorized.getuserphone();
          this.islogin = true;
          //  this.authorized.storeRole(this.userdata.Role.Name);
          var role = localStorage.getItem("rolename");
          console.log("role", role);
          this.summary = "Suceess";
          this.message = "Successfully Logedin";
          this.showSuccess();
          if (role === "User") {
            console.log("userroute");
          } else {
            console.log("adminroute");
            this.router.navigate(["main/dashboard"]);
          }
        },

        (errorMessage: HttpErrorResponse) => {
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
    this.arrayofitems = JSON.parse(this.auth.getitems());
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
    this.productsubscription = this.auth.products.subscribe((data) => {
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
    this.auth.storeitems(this.arrayofitems);
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

    this.auth.storeitems(this.arrayofitems);
    this.calculatetotal();
  }

  onSearch(form: NgForm) {
    var searchitem = form.value.search;
    this.router.navigate(["startup/searcheditem", searchitem]);
  }
}
