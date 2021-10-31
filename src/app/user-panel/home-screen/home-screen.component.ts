import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MegaMenuItem, MenuItem, MessageService } from "primeng/api";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
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
  providers:[MessageService]
})
export class HomeScreenComponent implements OnInit {
  loginmodal: boolean;
  message:string;
  summary:string;
  signupmodal: boolean;
  items: MenuItem[];
  country: string;
  islogin: boolean;
  isguest: boolean;
  cat: any[];
  arrayofitems: cart[] = [];
  subtotal: number;
  itemcount: number;
userdata:logedin;
errmessage:string;
position:string;
errordialoguemodal:boolean;
username:string;
userphone:string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthserviceService,
    private authorized:AuthorizedService,
    private messageservice:MessageService
  ) {}

  ngOnInit(): void {
   if (this.authorized.getRole()==="User")
   {
    this.username=this.authorized.getusername();
    this.userphone=this.authorized.getuserphone();
     this.islogin=true;
   }
   else 
   {
     this.islogin=false;
   }

    this.router.navigate(["startup"], { relativeTo: this.route });
  }

  showloginmodal() {
    this.loginmodal = true;
  }
  onlogout()
  {
    localStorage.clear();
    this.islogin=false;
    this.summary='Success'
    this.message='Successfully Logout'
    this.showSuccess();
  }

  opensignup() {
    this.loginmodal = false;
    this.signupmodal = true;
  }
  onLogin(form: NgForm) {
    if (!form.valid) return;
    else {
      this.loginmodal=false;
      var c = this.userlogin(form);
    
      this.auth.login(c).subscribe((res:logedin) => {
        this.userdata=res['Data']['data'];
        this.userdata.token=res['Data']['token'];
        this.userdata.Role=res['Data']['data']['Role']
        this.authorized.settoken(this.userdata.token.access_token,this.userdata.UserID,this.userdata.Role.RoleID,this.userdata.Name,this.userdata.Phone)
        this.username=this.authorized.getusername();
        this.userphone=this.authorized.getuserphone();
        this.islogin=true;
        this.authorized.storeRole(this.userdata.Role.Name);
        var a=this.authorized.getRole();
        this.summary='Suceess';
        this.message='Successfully Logedin'
        this.showSuccess();
        if(a==="User")
        {
          console.log('hello')
        }
        else
        {
        
          this.router.navigate(['main/dashboard']);
        }
      },
      
      (errorMessage:HttpErrorResponse)=>
      {
          if(errorMessage)
          {         
            
            this.errmessage=errorMessage.error['Status'].message;
    
             this.showerror();
          }
      });  
    }
  }
  showerror()
  {
    this.position='top';
    this.errordialoguemodal=true;
  }
  onOK()
{
  this.errordialoguemodal=false;
  

}

  onRegister(form: NgForm) {
    if (!form.valid) return;
    else {
      this.signupmodal=false;
      var c = this.userRegister(form);
      // console.log(c);

      
      
        this.auth.register(c).subscribe((res: userregister) => {
          // console.log(res);
          this.summary='Success'
          this.message='Registered Successfully'
          this.showSuccess();
        },
      (error:HttpErrorResponse)=> {
        console.log(error);
        this.errmessage=error.error['Status'].message;
        this.showerror();
      });
    }
  }

  userRegister(form: NgForm) {
    const user: register = {
      Phone: this.country + form.value.phone,
      Password: form.value.password,
      Email: form.value.email,
      Name: form.value.name,
    };
    return user;
  }

  userlogin(form: NgForm) {
    const user: login = {
      Email: form.value.email,
      Password: form.value.password,
    };
    return user;
  }
  cart() {
    this.arrayofitems = this.auth.getitemsarray();
    this.itemcount = this.arrayofitems.length;
    this.calculatetotal();
  }
  calculatetotal() {
    let sum = 0;
    for (let i = 0; i < this.arrayofitems.length; i++) {
      this.subtotal = parseInt(this.arrayofitems[i].TotalValue);
      sum = sum + this.subtotal;
    }
    this.subtotal = sum;
  }
  proccedtocheckout() {
    this.router.navigate(["checkout"]);
  }


  showSuccess() {
    this.messageservice.add({severity:'success', summary: this.summary, detail: this.message});
  }
}
