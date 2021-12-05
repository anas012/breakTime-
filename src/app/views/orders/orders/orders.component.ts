import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import * as moment from "moment";
import { NgxSpinnerService } from "ngx-spinner";
import { ConfirmationService, MessageService } from "primeng/api";
import {
  AllOrders,
  homeaddress,
  ordersdetails,
  PageInfo,
} from "../../../Models/adminmodel";
import { AdminService } from "../../../services/admin.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers:[MessageService]
})
export class OrdersComponent implements OnInit {
  constructor(
    private adminser: AdminService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private messageservice: MessageService
  ) {}
  Details: ordersdetails[];
  Allorders: AllOrders[];
  array: any[] = [];
  array2: any[] = [];
  detail: any;
  date: string;
  loading: boolean;
  pageno = 1;
  first = 0;
  lastpage;
  totalRecords;
  pageinfo: PageInfo;
  selectedRow;
  errmessage;
  summary;
  message;
  ngOnInit(): void {
    //this.getorders();
    this.loadorders();
  }
  async loadorders() {
   //  this.spinner.show();

    try {
      this.loading = true;
      const res: AllOrders = await this.adminser.getAllorder(this.pageno);
    //  console.log(res);
      this.Allorders = res["Data"]["data"];
      this.pageinfo = res["Data"]["info"];
      //console.log(this.pageinfo)
      this.loading = false;

      this.lastpage = this.pageinfo.lastPage;
      this.totalRecords = this.pageinfo.totalProducts;
      //  console.log(this.Allorders);
      for (let i = 0; i < this.Allorders.length; i++) {
        this.detail = this.Allorders[i].Addresses[0].Details[0];
        this.array[i] = JSON.parse(this.detail);
        //conversion of date
        this.date = this.Allorders[i].OrderDate;
        let date = moment.utc(this.date).local();
        let newdate = date.format(`DD/MM/YYYY HH:mm:ss`);
        this.Allorders[i].OrderDate = newdate;
      }
      // console.log(this.array);
      for (let i = 0; i < this.array.length; i++) {
        this.Allorders[i].streetaddress = this.array[i].streetaddress;
      }
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
    
  }
 
  confirmsubmitorder(id) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.OnconfirmOrder(id);
      },
      reject: () => {},
    });
  }
  confirmcancelorder(id) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
       this.OncancelOrder(id);
      },
      reject: () => {},
    });
  }

  OnconfirmOrder(id)
  {
    this.adminser.orderconfirmed(id).subscribe(res=>
      {
        console.log("order confirm res",res);
        this.summary="Success"
        this.message="Order Confirmed Successfully"
        this.showSuccess();
        this.loadorders();
      },
      (errorMessage: HttpErrorResponse) => {
        if (errorMessage) {
          this.errmessage = errorMessage.error["Status"].message;
          this.summary="Error"
          this.message=this.errmessage;
          this.showerror();
        }
      })

  }
  OncancelOrder(id)
  {
    this.adminser.ordercancel(id).subscribe(res=>
      {
        console.log("order cancel res",res);
        console.log("order confirm res",res);
        this.summary="Success"
        this.message="Order Cancled Successfully"
        this.showSuccess();
        this.loadorders();
      },
      (errorMessage: HttpErrorResponse) => {
        if (errorMessage) {
          this.errmessage = errorMessage.error["Status"].message;

          this.showerror();
        }
      })
  }
  onPageChange(pages) {
  //  console.log(pages);
    var page = pages["first"];
    if (page > this.first) {
      this.pageno++;
      this.first++;
      this.loadorders();
     // console.log(this.pageno);
    }
    if (page < this.first) {
      this.pageno--;
      this.first--;
      this.loadorders();
      //console.log(this.pageno);
    }
  }
  showSuccess() {
    this.messageservice.add({
      severity: "success",
      summary: this.summary,
      detail: this.message,
    });
  }
  showerror() {
    this.messageservice.add({
      severity: "error",
      summary: this.summary,
      detail: this.message,
    });
  }
}
