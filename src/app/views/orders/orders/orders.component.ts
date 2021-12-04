import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllOrders, homeaddress, ordersdetails, PageInfo } from '../../../Models/adminmodel';
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
pageno=1;
first=0;
lastpage;
totalRecords;
pageinfo:PageInfo;
ngOnInit(): void {
//this.getorders();
this.loadorders(); 

  }
async loadorders()
{
  //this.spinner.show();
  
  try 
  {
    this.loading=true;
  const res:AllOrders=await this.adminser.getAllorder(this.pageno);
  console.log(res);
   this.Allorders=res['Data']['data'];
   this.pageinfo=res['Data']['info'];
  //console.log(this.pageinfo)
    this.loading=false;
    
this.lastpage=this.pageinfo.lastPage;
this.totalRecords=this.pageinfo.totalProducts;
  //  console.log(this.Allorders);
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

onPageChange(pages)
{
  console.log(pages);
  var page=pages['first'];
  if(page>this.first)
  {
    this.pageno++;
    this.first++;
    this.loadorders();
    console.log(this.pageno);
  }
  if(page<this.first)
  {
    this.pageno--;
    this.first--;
    this.loadorders();
    console.log(this.pageno);
  }
}
}
