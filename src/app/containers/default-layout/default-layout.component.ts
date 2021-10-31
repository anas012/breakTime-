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
  constructor(private auth:AdminService,private router:Router){}
  ngOnInit(): void 
  {
    
    this.adminname=this.auth.getadminname();

  }
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  onlogout()
  {
    localStorage.clear();
    this.router.navigate(['startup/mainpage'])
  }
}
