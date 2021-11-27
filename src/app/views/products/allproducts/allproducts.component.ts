import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Allprdoducts, cartdetails, subcat } from '../../../Models/adminmodel';
import { catgories } from '../../../Models/usermodel';
import { AdminService } from '../../../services/admin.service';

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
  constructor(private adminserv:AdminService,private messageService: MessageService) { }

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
        const res:catgories=await this.adminserv.getAllprd();
     //console.log(res);
     this.loading=false;
         this.Allprd=res['Data']['data'];
        
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
      showError() {
        this.messageService.add({severity:'error', summary: this.summary, detail:this.message });
      }
      showSuccess() {
        this.messageService.add({severity:'success', summary:this.summary, detail: this.message});
      }
}
