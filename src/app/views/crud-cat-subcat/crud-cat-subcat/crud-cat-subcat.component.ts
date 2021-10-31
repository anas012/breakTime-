import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ADDCat, ADDSubcat, category, subcat } from '../../../Models/adminmodel';
import { catgories } from '../../../Models/usermodel';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-crud-cat-subcat',
  templateUrl: './crud-cat-subcat.component.html',
  styleUrls: ['./crud-cat-subcat.component.scss'],
  providers:[MessageService],
 encapsulation:ViewEncapsulation.None
})
export class CrudCatSubcatComponent implements OnInit {
Allcat:category[];
Allsubcat:subcat[];
selectedCat1:category;
selectedCat2:category;
selectedCat3:category;
selectedsubCat:subcat;
disable=true;
message:string;
summary:string;
  testsubcategory: subcat[]=[];
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

onADDCat(form:NgForm)
{
    if(!form.valid)
    {
      return
    }
    else
    {
      
        var c=this.ADDCat(form);
        console.log(c);
        this.adminserv.createcat(c).subscribe(res=>
        {
          this.summary='Success'
          this.message='Category Added Successfully';
          this.showSuccess()
          // console.log(res);
         form.reset()
          this.getAllcat();
        },(err:HttpErrorResponse)=>
        {
          // console.log(err)
          this.summary='Error'
          this.message=err.error['Status'].message;
          this.showError();
        }
        );
     }
}
onADDSubcat(form:NgForm)
{
if(!form.valid)
{
  return
}
else
{
  var a =this.Addsubcat(form);
  console.log(a);
  this.adminserv.createsubcat(a).subscribe(res=>
    {
      this.summary='Success'
          this.message='SubCategory Added Successfully';
      this.showSuccess()
      form.reset()
      // console.log(res);
      this.getAllSubcat();
    },(err:HttpErrorResponse)=>
    {
      this.summary='Error';
      this.message=err.error['Status'].message;
      this.showError();
    }
    )
}
}
onDeleteCat(form:NgForm)
{
  console.log(this.selectedCat2);
  this.adminserv.deletecat(this.selectedCat2.CategoryID).subscribe(res=>
    {
      this.summary='Success'
          this.message='Category Deleted Successfully';
      this.showSuccess();
      // console.log(res);
      form.reset();
      this.getAllcat();
    },(err:HttpErrorResponse)=>
    {
      this.summary='Error';
      this.message=err.error['Status'].message;
      this.showError();
    }
    
    )
}
onDeleteSubCat(form:NgForm)
{
  this.adminserv.deletesubcat(this.selectedsubCat.SubCategoryID).subscribe(res=>
    {
      this.summary='Success'
      this.message='SubCategory Deleted Successfully';
      this.showSuccess();
      form.reset();
      this.getAllSubcat();
    },(error:HttpErrorResponse)=>
    {
      this.summary='Error';
      this.message=error.error['Status'].message;
      this.showError();
     
    }
    )

}
ADDCat(form:NgForm)
{
const cat:ADDCat=
{
Name:form.value.Category
}
return cat;
}
Addsubcat(form:NgForm)
{
  const subcat:ADDSubcat=
  {
    Name:form.value.SubCategory,
    CategoryID:parseInt(this.selectedCat1.CategoryID)
  }
return subcat;
}
onchangeCat()
{
  this.disable = false;
this.testsubcategory=[];
  //  console.log(this.selectedCat3);

  var a = this.selectedCat3.CategoryID;
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
}


