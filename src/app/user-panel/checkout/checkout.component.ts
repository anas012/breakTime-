import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { bilingdetails, cart, placeorder } from '../../Models/usermodel';
import {MessageService} from 'primeng/api';
import { AuthserviceService } from '../../services/authservice.service';
import { AuthorizedService } from '../../services/authorized.service';
import { createorder } from '../../Models/adminmodel';
import { cilAddressBook } from '@coreui/icons';
import { AdminService } from '../../services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderDetails } from '../../Models/Orderdetails';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class CheckoutComponent implements OnInit {
itemsarray:cart[]=[];
totalitems:number;
Subtotal:number;
ShipChrges:number;
addrflag=false;
order:placeorder;
userid:string;
paymentsmethod = ['Cash on Delivery'];
array:any[]=[];
productdetails:any[]=[];
city:string;
summary:string;
message:string;
orderconfirmmodal=false;
messagee:string;
header:string;
temp:[]=[];
  constructor(private messageService: MessageService,private auth:AuthserviceService,private authorized:AuthorizedService,private adminser:AdminService) {}

  ngOnInit(): void {
    this.getitems();
  }
  onaddAddress(form:NgForm)
  {
if (!form.valid)
{
  return
}
else
{
 // console.log('fun called')
var c =this.bilingaddress(form)
//console.log(c);
this.summary="Success";
this.message="Biling Address Added Successfully.Click To Place Order"
this.showSuccess();
this.addrflag=true;
}
  }

  bilingaddress(form:NgForm)
  {
    const address:bilingdetails=
    {
      fname:form.value.fname,
      lname:form.value.lname,
      companyname:form.value.cmpname,
      streetaddress:form.value.staddress,
      postalcode:form.value.postalcode,
      state:form.value.state,
      phone:form.value.phone,
      email:form.value.email,
      city:form.value.city
    }
   this.city=address.city;
    this.array.push(address);
    
    return address
  }
 
getitems()
{
  this.itemsarray=JSON.parse(this.auth.getitems());
 // console.log("item array",this.itemsarray);
 
  if(this.itemsarray!=null)
  {
   this.totalitems=this.itemsarray.length;
  this.calculatetotal();
  }
  else 
  {
    this.ShipChrges=0;
    this.Subtotal=0;

  }
  //console.log(this.itemsarray);
}

calculatetotal()
{
  if(this.itemsarray.length!=null)
  {
  let sum=0;
  for (let i=0;i<this.itemsarray.length;i++)
  {
   
    this.Subtotal=parseInt(this.itemsarray[i].TotalValue)
    sum=sum+this.Subtotal;
  }
  this.Subtotal=sum;
  this.ShipChrges=0;
}
else 
{
  this.Subtotal=0;
  this.ShipChrges=0;

}
}

onplaceorder(form:NgForm)
{
  if (this.addrflag===false)
  {
    this.summary='Error';
    this.message="Add a Biling Address";
    this.showError()
  }

  else 
  {
    if(this.Subtotal==0)
    {
      this.orderconfirmmodal=true;
      this.messagee="Nothing In Cart To Place Order!! Shop To Place Order"
      this.header="Error";
    }
    if(this.Subtotal!=0) 
    {
    var a =this.Userorder(form);
    
    this.adminser.createorder(a).subscribe(res=>
      {

        this.header="Order Confirmed";
         this.messagee="Order Submitted Successfully.Thankyou For shopping!!";
         this.orderconfirmmodal=true;
        // localStorage.setItem('items array',null);
      // localStorage.removeItem('items array');
       localStorage.setItem('cartcount',"0");
      this.temp=[] 
      this.auth.storeitems(this.temp);
       // localStorage.setItem('cartcount',null);
      },(error:HttpErrorResponse)=>
      {
        console.log(error);
        this.summary="Error";
        this.message=error.error['Status'].message;
        this.showError();
      })
    }
  }
}


showError() {
  this.messageService.add({severity:'error', summary: this.summary, detail: this.message});
}
showSuccess() {
  this.messageService.add({severity:'success', summary: this.summary, detail: this.message});
}

Userorder(form:NgForm)
{
 const user:createorder=
 {
  UserID:this.authorized.getuserid().toString(),
  PaymentMethod:form.value.paymentsmethod,
  TotalBill:this.Subtotal.toString(),
  OrderDetails:this.itemsarray,
  Addresses:
  {
    City:this.city,
    Details:this.array
  }
 }
 return user;
}


}
