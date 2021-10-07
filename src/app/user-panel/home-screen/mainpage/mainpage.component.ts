import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  badgevalue:number;
  badgealert=false;
  value=0;
  addtocart=true;
  cart:boolean;
  constructor() { }

  ngOnInit(): void {

    this.badgealert=true;
    this.badgevalue=1;
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
