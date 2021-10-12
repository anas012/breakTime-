import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { bilingdetails } from '../../Models/usermodel';
import {MessageService} from 'primeng/api';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class CheckoutComponent implements OnInit {

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
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

}
