import { Component, OnInit } from '@angular/core';
import { cartdetails } from '../../Models/usermodel';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
Details:cartdetails[]

  constructor() { }

  ngOnInit(): void {
 this.Details=[

  {
    Name:'Bread',
    image:'../../../assets/img/bread.jpg',
    price:100,
    total:100,
  },
  
  {
    Name:'Milk',
    image:'../../../assets/img/milk.jfif',
    price:100,
    total:100,
  },
  {
    Name:'Milk',
    image:'../../../assets/img/milk.jfif',
    price:100,
    total:100,
  },
  {
    Name:'Milk',
    image:'../../../assets/img/milk.jfif',
    price:100,
    total:100,
  }
 ]
    
    
      

     
    
  
  }

}
