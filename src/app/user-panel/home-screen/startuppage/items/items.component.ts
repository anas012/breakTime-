import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ItemsComponent implements OnInit {
  private items: MenuItem[];
  badgevalue:number;
  badgealert=false;
  value=0;
  addtocart=true;
  cart:boolean;
  constructor() { }

  ngOnInit(): void {

    this.items = [
      {label:'Home',routerLink:'/mainpage'},
      {label:'Items'},

  ];
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
