import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { AuthorizedService } from '../../services/authorized.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  adminname:string;
  constructor(private auth:AdminService,private router:Router,private _auth:AuthorizedService){}
  ngOnInit(): void 
  {
    
      this.adminname=this._auth.getUserName();

  }
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  onlogout()
  {
    localStorage.removeItem("^&%$*");
    localStorage.removeItem("$$#@_&*&");
    localStorage.removeItem("&*@#$$");
    this.router.navigate(['startup/mainpage'])
  }
}
