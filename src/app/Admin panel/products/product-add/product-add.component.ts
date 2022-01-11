import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { newprd, subcat } from "../../../Models/adminmodel";
import { catgories } from "../../../Models/usermodel";
import { AdminService } from "../../../services/admin.service";
import { NgForm } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.scss"],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class ProductAddComponent implements OnInit {
  Allcat: catgories[];
  summary: string;
  message: string;
  Allsubcat: subcat[];
  disable: boolean;
  testsubcategory: subcat[] = [];
  selectedCat: catgories;
  selectedsubCat: subcat;
  selectedfile = null;
  url: any;
  uploadedFiles: File = null;
  filenotify = false;
  fd;
  checked:boolean=true;
  constructor(
    private adminserv: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllcat();
    this.getAllSubcat();
    this.url = "../../../../assets/icons/No image.png";
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
  confirmAddProduct(form:NgForm) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.oncreateproduct(form);
      },
      reject: () => {},
    });
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

  createProduct(form: NgForm) {
    //   console.log(this.fd);
    console.log("fun",this.checked);
    const Data: newprd = {
      Name: form.value.Name,
      RetailPrice: form.value.RetailPrice,
      PurcahsePrice: form.value.PurchasePrice,
      SubCategoryID: this.selectedsubCat.SubCategoryID,
      Quantity:form.value.Quantity,
      InStock:this.checked,
      Identifier: "Product",
    };
    //  var data=
    //   {
    //      Data,
    //      Photo:this.fd.get('image')
    //   }
    return Data;
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
  handleChange(e) {
    this.checked = e.checked;
    console.log(this.checked);
}
  oncreateproduct(form: NgForm) {
    if (this.selectedfile == null) {
      this.filenotify = true;
    } else {
      this.filenotify = false;
      this.fd=new FormData();
      this.fd.append("Photo", this.selectedfile, this.selectedfile.name);
      this.fd.append("Data", JSON.stringify(this.createProduct(form)));
      let Data = JSON.parse(JSON.stringify(this.fd.get("Data")));
      let Photo = this.fd.get("Photo");
      if (this.fd == null) {
        return;
      } else {
        console.log(this.fd.get('Data'));
        // this.adminserv.createPrd(this.fd).subscribe(
        //   (res) => {
        //     console.log(res);
        //     this.summary = "Success";
        //     this.message = "Product Added Successfully";
        //     this.showSuccess();
        //     form.reset();
        //     this.url = "../../../../assets/icons/No image.png";
        //   },
        //   (error: HttpErrorResponse) => {
        //     console.log(error);
        //     this.summary = "Error";
        //     this.message = error.error["Status"].message;
        //     this.showError();
        //   }
        // );
      }
    }
    this.resetform(form);
  }

  resetform(form:NgForm)
  {
    this.checked=true;
    form.reset();
    this.url = "../../../../assets/icons/No image.png";
  }
}
