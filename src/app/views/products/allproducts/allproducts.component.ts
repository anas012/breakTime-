import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Allprdoducts, cartdetails, PageInfo, subcat } from '../../../Models/adminmodel';
import { catgories } from '../../../Models/usermodel';
import { AdminService } from '../../../services/admin.service';
import { ConfirmationService } from "primeng/api";
@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.scss'],
  providers:[MessageService],
  encapsulation:ViewEncapsulation.None
})
export class AllproductsComponent implements OnInit {
  Allcat: catgories[];
  summary: string;
  message: string;
  Allsubcat: subcat[];
  testsubcategory: subcat[]=[];
  selectedCat: catgories;
  selectedsubCat:subcat;
  Allprd:Allprdoducts[];
disable:boolean;
loading:boolean;
pageno=1;
first=0;
lastpage;
totalRecords;
pageinfo:PageInfo;
  constructor(private adminserv:AdminService,private messageService: MessageService,private confirmationService: ConfirmationService,) { }

  Details:cartdetails[];
  ngOnInit(): void {
   this.getAllcat();
   this.getAllSubcat();
this.loadproducts();
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

      async loadproducts()
      {
        try {
          this.loading=true;
        const res:Allprdoducts=await this.adminserv.getAllprd(this.pageno);
        // console.log(res);
         this.loading=false;
         this.Allprd=res['Data']['data'];
         this.pageinfo=res['Data']['Info'];
         this.lastpage=this.pageinfo.lastPage;  
         this.totalRecords=this.pageinfo.totalProducts;
        // console.log(this.pageinfo)
      }
        catch(error)
        {

          this.loading=false;
          this.summary="Error";
          this.message=error.error['Status'].message;
          this.showError();
          
        }
      }
      Onupdateprd(id:string)
      {
          console.log(id);
      }
      Ondeleteprd(id:string)
      {
        this.adminserv.deletePrd(id).subscribe(res=>
        {
            console.log(res);
            this.summary='Success';
            this.message="Successfully Deleted Product";
            this.showSuccess();
            this.loadproducts();
        },(error:HttpErrorResponse)=>
        
        {
          if(error)
          {
            this.summary="Error";
            this.message=error.error['Status'].message;
            this.showError();
          }
        })
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
      confirmSubmit(id) {
        this.confirmationService.confirm({
          message: "Are you sure that you want to proceed?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.Ondeleteprd(id);
          },
          reject: () => {},
        });
      }
onPageChange(pages)
{
  console.log(pages);
  var page=pages['first'];
 
  if(page>this.first)
  {
    this.pageno++;
    this.first++;
    this.loadproducts();
   // console.log(this.pageno);
  }
  if(page<this.first)
  {
    this.pageno--;
    this.first--;
    this.loadproducts();
    //console.log(this.pageno);
  }
}
      showError() {
        this.messageService.add({severity:'error', summary: this.summary, detail:this.message });
      }
      showSuccess() {
        this.messageService.add({severity:'success', summary:this.summary, detail: this.message});
      }
}
