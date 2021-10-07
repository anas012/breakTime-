import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { cartdetails } from '../../../Models/adminmodel';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ItemsComponent implements OnInit {

  constructor() { }
  Details:cartdetails[];
  ngOnInit(): void {
    this.Details=[

      {
        productId:1,
        Name:'Bread',
        image:'../../../assets/img/bread.jpg',
        price:100,
   
      },
      
      {
        productId:2,
        Name:'Milk',
        image:'../../../assets/img/milk.jfif',
        price:100,
      },
      {
        productId:3,
        Name:'Milk',
        image:'../../../assets/img/milk.jfif',
        price:100,
       
      },
      {
        productId:4,
        Name:'Milk',
        image:'../../../assets/img/milk.jfif',
        price:100,

      }
     ]

     console.log(this.Details);
  }

}
