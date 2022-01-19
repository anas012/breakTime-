import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { subcat } from "../../../Models/adminmodel";
import { catgories } from "../../../Models/usermodel";
import { AdminService } from "../../../services/admin.service";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.scss"],
  providers: [MessageService],
})
export class ProductEditComponent implements OnInit {
  Allcat: catgories[];
  summary: string;
  message: string;
  Allsubcat: subcat[];
  disable: boolean;
  testsubcategory: subcat[] = [];
  selectedCat: catgories=null;
  selectedSubCat: subcat=null;
  selectedfile = null;
  url: any;
  uploadedFiles: File = null;
  filenotify = false;
  fd;
PrdID;
  Product: any = {
    ProductID: "",
    Name: "",
    RetailPrice: "",
    PurchasePrice: "",
    SubCategoryID: null,
    Photo: "",
    Quantity: "",
    InStock: "",
    Rating: "",
    SubCategory: {
      Category: {
        Name: "",
        CategoryID: "",
      },
      Name: "",
    },
  };
  constructor(
    private adminserv: AdminService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.url = "../../../../assets/icons/No image.png";
    // this.route.paramMap.subscribe((params) => {
    //   let id= params.get("rowData.ProductID");
    //      console.log(id);
    // });
    this.PrdID = this.route.snapshot.paramMap.get("id");
    this.getProduct(this.PrdID);
  }

  getProduct(id) {
    this.adminserv.productById(id).subscribe((res) => {
      //console.log(res);
      this.Product = res["Data"]["data"];
      //console.log(res);
      this.getAllcat();
      this.getAllSubcat();
    });
  }
  async getAllcat() {
    try {
      const res: catgories = await this.adminserv.getAllCategories();
      this.Allcat = res["Data"]["data"];
      if(this.Allcat)
      {
      for (let i = 0; i < this.Allcat.length; i++) {
        if (
          this.Product.SubCategory.Category.CategoryID ==
          this.Allcat[i].CategoryID
        ) {

          this.selectedCat = this.Allcat[i];
        }
      }
      }
    } catch (error) {
      this.summary = "Error";
      this.message = error.error["Status"].message;
      this.showError();
    }
  }
  async getAllSubcat() {
    try {
      const res = await this.adminserv.getAllSubCategories();
      // console.log(res);
      this.Allsubcat = res["Data"]["data"];
      this.testsubcategory = [];
      for (let i = 0; i < this.Allsubcat.length; i++) {
        if (this.Allsubcat[i].CategoryID==this.Product.SubCategory.Category.CategoryID ) {
          this.testsubcategory.push(this.Allsubcat[i]);
        }
      }
     for(let i=0;i<this.testsubcategory.length;i++)
     {
        if(this.Product.SubCategoryID==this.testsubcategory[i].SubCategoryID)
        {
          this.selectedSubCat=this.testsubcategory[i];
        }
     }
    } catch (error) {
       console.log(error)

      this.summary = "Error";
      this.message = error.error["Status"].message;
      this.showError();
    }
  }
  onchangeCat() {
    this.testsubcategory = [];
    if(this.selectedCat)
    {
    var categoryid = this.selectedCat.CategoryID;
  
    for (let i = 0; i < this.Allsubcat.length; i++) {
      if (this.Allsubcat[i].CategoryID == categoryid) {
        this.testsubcategory.push(this.Allsubcat[i]);
        
      }
  
    }
  }
    else 
    {
      this.selectedCat=null;
      this.summary="Error"
      this.message="Please select category"
      this.showError();
    }
  }
  onfileselected(e) {
    if (e.target.files.length > 0) {
      this.selectedfile = <File>e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
  confirmUpdateProduct(form: NgForm) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.OnUpdateProduct();
      },
      reject: () => {},
    });

  }
  OnUpdateProduct()
  {
    this.Product.SubCategoryID=this.selectedSubCat.SubCategoryID;
    this.Product.SubCategory.SubCategoryID=this.selectedSubCat.SubCategoryID;
    this.adminserv.updateProduct(this.PrdID,this.Product).subscribe((res)=>
      {
        this.summary="Success";
        this.message="Product Updated Successfully";
        this.showSuccess();
      //  const navigationExtras: NavigationExtras = {state: {data: 'Product Updated Successfully'}};
        this.router.navigate(['main/product'],{ state: { example: 'bar' } });
        
      },(error:HttpErrorResponse)=>
      {
          console.log(error);
      })   
  }
  handleChange(e) {
    this.Product.InStock = e.checked;

  }
  showError() {
    this.messageService.add({
      severity: "error",
      summary: this.summary,
      detail: this.message,
    });
  }
  showSuccess() {
    this.messageService.add({
      severity: "success",
      summary: this.summary,
      detail: this.message,
    });
  }
}
