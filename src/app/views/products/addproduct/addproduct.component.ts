import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { newprd, subcat } from '../../../Models/adminmodel';
import { catgories } from '../../../Models/usermodel';
import { AdminService } from '../../../services/admin.service';
import { NgForm } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
  providers:[MessageService],
  encapsulation:ViewEncapsulation.None
})

export class AddproductComponent implements OnInit {
  Allcat: catgories[];
  summary: string;
  message: string;
  Allsubcat: subcat[];
  disable: boolean;
  testsubcategory: subcat[]=[];
  selectedCat: catgories;
  selectedsubCat:subcat;

  constructor(private adminserv:AdminService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllcat();
    this.getAllSubcat();
  }
  async getAllcat()
  {
    try {
    const res:catgories=await this.adminserv.getAllCategories();
  this.Allcat=res['Data']['data'];
  }
    catch(error)
    {
      this.summary="Error";
      this.message=error.error['Status'].message;
      this.showError();
      
    }
  }
  async getAllSubcat()
  {
    try {
    const res=await this.adminserv.getAllSubCategories();
  // console.log(res);
     this.Allsubcat=res['Data']['data'];
  }
    catch(error)
    {
      // console.log(error)
      
      this.summary="Error";
      this.message=error.error['Status'].message;
      this.showError();
    }
  }
  onCreateproduct(form:NgForm)
  {
if (!form.valid)
{
  return 
}
else 
{
  var c=this.createProduct(form);
 this.adminserv.createPrd(c).subscribe(res=>
  {
    console.log(res);
    this.summary="Success"
    this.message="Product Added Successfully"
    this.showSuccess();
    form.reset()
  },(error:HttpErrorResponse)=>
  {
    console.log(error);
    this.summary="Error"
    this.message=error.error['Status'].message;
    this.showError();
  }
  )
}
  }
  onchangeCat()
  {
    this.disable = false;
  this.testsubcategory=[];
    //  console.log(this.selectedCat3);
  
    var a = this.selectedCat.CategoryID;
    for (let i= 0; i < this.Allsubcat.length; i++) {
      if (this.Allsubcat[i].CategoryID == a) {
        this.testsubcategory.push(this.Allsubcat[i]);
        //  console.log(this.testsubcategory);
      }
    
    
  }
  }
  showError() {
    this.messageService.add({severity:'error', summary: this.summary, detail:this.message });
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary:this.summary, detail: this.message});
  }

  createProduct(form:NgForm)
  {
    const Data:newprd=
    {
Name:form.value.Name,
RetailPrice:form.value.RetailPrice,
PurcahsePrice:form.value.PurchasePrice,
SubCategoryID:this.selectedsubCat.SubCategoryID
    }
  //  var data=
  //   {
  //      Data
  //   }
    return Data;
  }
  
}
