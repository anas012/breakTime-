import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { LazyLoadEvent } from 'primeng/api';
import { AllOrders, homeaddress, ordersdetails } from '../../../Models/adminmodel';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {

  constructor(private adminser:AdminService,private spinner:NgxSpinnerService) { }
Details:ordersdetails[]
Allorders:AllOrders[];
array:any[]=[];
array2:any[]=[];
a:any;
date:string;
loading:boolean;

  ngOnInit(): void {
//this.getorders();
this.loadorders(); 

  }
async loadorders()
{
  //this.spinner.show();
  this.loading=true;
  try 
  {

  const res:AllOrders=await this.adminser.getAllorder();
    this.Allorders=res['Data']['data'];
    this.loading=false;
    console.log(this.Allorders);
     for (let i =0;i<this.Allorders.length;i++)
     {
       this.a =this.Allorders[i].Addresses[0].Details[0];
     this.array[i]=JSON.parse(this.a);
     //conversion of date
     this.date=this.Allorders[i].OrderDate;
     let date=moment.utc(this.date).local();
    let newdate=date.format(`DD/MM/YYYY HH:mm:ss`);
    this.Allorders[i].OrderDate=newdate;
  }

     // console.log(this.array);
     for (let i =0;i<this.array.length;i++)
     {
       this.Allorders[i].streetaddress=this.array[i].streetaddress;
     }
}

  catch(error)
  {
    this.loading=false;
    console.log(error);
  }
}
}
