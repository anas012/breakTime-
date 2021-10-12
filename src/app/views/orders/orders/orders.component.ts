import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ordersdetails } from '../../../Models/adminmodel';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {

  constructor() { }
Details:ordersdetails[]
  ngOnInit(): void {


    this.Details=[
    ]
     
     

  }

}
