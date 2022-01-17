import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { subcat } from '../../../Models/adminmodel';
import { catgories } from '../../../Models/usermodel';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  providers: [MessageService],
})
export class ProductEditComponent implements OnInit {
  Allcat: catgories[];
  summary: string;
  message: string;
  Allsubcat: subcat[];
  disable: boolean;
  testsubcategory: subcat[] = [];
  selectedCat: catgories;
  selectedsubCat: subcat;
  Product:any={
    ProductID:"",
    Name:"",
    RetailPrice:"",
    PurchasePrice:"",
    SubCategoryID:"",
    Photo:"",
    Quantity:"",
    InStock:"",
    Rating:"",
    SubCategory:
    {
      Category:{
        Name:""
      },
      Name:""
    }
  }
  constructor(private adminserv:AdminService,private route: ActivatedRoute, private messageService: MessageService,
  private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   let id= params.get("rowData.ProductID");
    //      console.log(id);
    // });
    let id = this.route.snapshot.paramMap.get('id');
    this.getProduct(id);
    this.getAllcat();
    this.getAllSubcat();
  }

  getProduct(id)
  {
    this.adminserv.productById(id).subscribe((res=>
  {
    //console.log(res);
    this.Product=res['Data']['data'];
    console.log(res);
  }))
  }
  async getAllcat() {
    try {
      const res: catgories = await this.adminserv.getAllCategories();
      this.Allcat = res["Data"]["data"];
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
    } catch (error) {
      // console.log(error)

      this.summary = "Error";
      this.message = error.error["Status"].message;
      this.showError();
    }
  }
  onchangeCat() {
    this.disable = false;
    this.testsubcategory = [];
    //  console.log(this.selectedCat3);

    var a = this.selectedCat.CategoryID;
    for (let i = 0; i < this.Allsubcat.length; i++) {
      if (this.Allsubcat[i].CategoryID == a) {
        this.testsubcategory.push(this.Allsubcat[i]);
        //  console.log(this.testsubcategory);
      }
    }
  }
  confirmAddProduct(form:NgForm)
  {

  }
  handleChange(e) {
    this.Product.InStock= e.checked;
    console.log(this.Product.InStock);
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
