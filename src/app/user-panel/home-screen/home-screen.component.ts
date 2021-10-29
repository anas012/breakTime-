import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MegaMenuItem, MenuItem } from "primeng/api";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { login } from "../../Models/Login";
import { register } from "../../Models/signup";
import { AuthserviceService } from "../../services/authservice.service";
import { cart, userregister } from "../../Models/usermodel";


@Component({
  selector: "app-home-screen",
  templateUrl: "./home-screen.component.html",
  styleUrls: ["./home-screen.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeScreenComponent implements OnInit {
  loginmodal: boolean;
  signupmodal: boolean;
  items: MenuItem[];
  country: string;
  islogin:boolean;
  isguest:boolean;
  cat:any[];
  arrayofitems:cart[]=[];
  subtotal:number;
  itemcount:number;
  constructor(private router: Router, private route: ActivatedRoute,private auth:AuthserviceService) {}

  ngOnInit(): void 
  {
      this.islogin=false;
    
     this.router.navigate(["startup"], { relativeTo: this.route });
  
  }
  
  showloginmodal() {
    this.loginmodal = true;
  }

  opensignup() {
    this.loginmodal = false;
    this.signupmodal = true;
  }
  onLogin(form: NgForm) {
    if (!form.valid) return;
    else {
      var c = this.userlogin(form);
      this.auth.login(c).subscribe((res)=>
      
      {
        console.log(res);
      })

    
      this.islogin=true;
      
    }
  }
  onRegister(form: NgForm) {

    if (!form.valid)
    return;
    else 
    {
        var c=this.userRegister(form);
        console.log(c);
        this.auth.register(c).subscribe((res:userregister)=>
        {
          console.log(res);
        })
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
     Email:form.value.email,
      Password: form.value.password,
    };
    return user;
  }
  cart()
  {
    this.arrayofitems=this.auth.getitemsarray();
    this.itemcount=this.arrayofitems.length;
    this.calculatetotal();
    
  }
  calculatetotal()
  {
    let sum=0;
    for (let i=0;i<this.arrayofitems.length;i++)
    {
     
      this.subtotal=parseInt(this.arrayofitems[i].Totalprice)
      sum=sum+this.subtotal;
    }
    this.subtotal=sum;
  }
  proccedtocheckout()
  {
    this.router.navigate(['checkout']);
  }
}
