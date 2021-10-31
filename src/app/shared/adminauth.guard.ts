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
this.role=this.auth.getRole();
      if (this.role==="Admin")
      {
        return true;
      }
      else 
      {
        this.router.navigate(['startup/mainpage']);
        return false;
      }
  }
}
