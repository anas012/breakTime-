import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { AuthorizedService } from '../services/authorized.service';

@Injectable({
  providedIn: 'root'
})
export class AdminauthGuard implements CanActivate {
  constructor(private auth:AuthorizedService,private router:Router){}
  role:string;

  canActivate():boolean
  {
    if(localStorage.getItem('token'))
    {

    
this.role=this.auth.getRole();
      if (localStorage.getItem('rolename')==="Admin")
      {
       // console.log('admin true')
        return true;
      }
      else 
      {
        //console.log('admin false')
        this.router.navigate(['startup/mainpage']);
        return false;
      }
  }
}
}
