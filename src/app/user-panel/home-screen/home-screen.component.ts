import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MegaMenuItem, MenuItem } from "primeng/api";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { login } from "../../Models/Login";
import { register } from "../../Models/signup";
import { AuthserviceService } from "../../services/authservice.service";

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
  countrycode: string;
  islogin:boolean;
  isguest:boolean;
  cat:any[];
  constructor(private router: Router, private route: ActivatedRoute,private auth:AuthserviceService) {}

  ngOnInit(): void {
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
      console.log(c);
      this.islogin=true;
      console.log("login"+''+ this.islogin);
    }
  }
  onRegister(form: NgForm) {

    if (!form.valid)
    return;
    else 
    {
        var c=this.userRegister(form);
        console.log(c);
    }
  }

  userRegister(form: NgForm) {
    const user: register = {
      phone: this.countrycode + form.value.phone,
      password: form.value.password,
      email: form.value.email,
      name: form.value.name,
    };
    return user;
  }

  userlogin(form: NgForm) {
    const user: login = {
      phone: this.countrycode + form.value.phone,

      password: form.value.password,
    };
    return user;
  }
}
