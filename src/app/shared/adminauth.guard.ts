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
  rolename:string;

  canActivate():boolean
  {
    this.rolename=this.auth.getUserRole();
   // console.log('rolename in admin guard',this.rolename);
    if(localStorage.getItem('$$#@_&*&'))
    {
      if (this.rolename=="Admin")
      {
       // console.log('admin route true')
        return true;
      }
      else 
      {
     //   console.log('admin route false')
        this.router.navigate(['startup/mainpage']);
        return false;
      }
  }
}
}
