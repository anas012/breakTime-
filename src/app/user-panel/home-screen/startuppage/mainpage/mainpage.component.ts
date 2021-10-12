import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../../services/authservice.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
value:number;
addtocart=true;
cart:boolean;
  constructor(private auth:AuthserviceService) { 
    this.getAllcategories();
  }

  ngOnInit(): void {
  }
  getAllcategories()
  {
    this.auth.getAllcategory().subscribe((res)=>
    {
      console.log(res);
    })
  }
  Addtocart()
  {

    this.value=1;
    this.addtocart=false;
    this.cart=true;
  }
  input(e)
  {
if(this.value==0)
{
  this.addtocart=true;
  this.cart=false;
}
  }
}
