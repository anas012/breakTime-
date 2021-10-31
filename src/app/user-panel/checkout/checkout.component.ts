import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { bilingdetails, cart, placeorder } from '../../Models/usermodel';
import {MessageService} from 'primeng/api';
import { AuthserviceService } from '../../services/authservice.service';
import { AuthorizedService } from '../../services/authorized.service';




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
  constructor(private messageService: MessageService,private auth:AuthserviceService,private authorized:AuthorizedService) {}

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
  console.log('fun called')
var c =this.bilingaddress(form)
console.log(c);
this.showbilladressAdd();
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
    return address
  }
  showbilladressAdd() {
    this.messageService.add({severity:'success', summary: 'Billing Address Added', detail: 'Billing address Added Succesfully! Click to place Order'});
}
getitems()
{
  this.itemsarray=this.auth.getitemsarray();
  this.totalitems=this.itemsarray.length;
  this.calculatetotal();
  console.log(this.itemsarray);
}

calculatetotal()
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

onplaceorder()
{
  if (this.addrflag===false)
  {
    this.showadressError()
  }
  else 
  {
    
  }
}


showadressError() {
  this.messageService.add({severity:'error', summary: 'Biling Address not Added', detail: 'Please add the biling address'});
}

Userorder()
{
  this.userid=this.authorized.getuserid();
//   const order:placeorder=
// {
// UserID:this.userid,
// TotalAmount:this.Subtotal.toString(),
// OrderDetails:
// {
  
// }

// }
}
}
