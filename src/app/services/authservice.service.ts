import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  Allcat:any;
  BASE_URL='https://breaktime1.herokuapp.com/'
  constructor(private httpdata:HttpClient) { }

  getAllcategory()
  {
    this.Allcat=this.httpdata.get(this.BASE_URL+'v1/category');
    return this.Allcat
  }


}
