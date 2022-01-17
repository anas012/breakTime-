import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import * as moment from "moment";
import { NgxSpinnerService } from "ngx-spinner";
import { ConfirmationService, MenuItem, MessageService } from "primeng/api";
import { AllOrders, ordersdetails, PageInfo } from "../../../Models/adminmodel";
import { AdminService } from "../../../services/admin.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
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
  initialpage = 1;
  pageno = this.initialpage;
  lastpage;
  totalRecords;
  pageinfo: PageInfo;
  selectedRow;
  errmessage;
  summary;
  message;
  searchtext: any;
  cols: any[];
  Rows = 50;
  activeItem: MenuItem;
  menuList: MenuItem[] = [
    {
      id: "1",
      label: "All orders",
      //  icon: 'fas fa-sign-out-alt',
      badge: "Allorder",
    },
    {
      id: "2",
      label: "Delivered orders",
      //   icon: 'fas fa-sign-in-alt',
      badge: "listdelivered",
    },
    {
      id: "3",
      label: "Canceled orders",
      //   icon: 'fas fa-sign-in-alt',
      badge: "listcancelled",
    },
  ];
  ngOnInit(): void {
    this.activeItem = this.menuList[0];
    this.loadorders();

    this.cols = [
      { field: "OrderID", header: "OrderID" },
      { field: "CreatedBy", header: "Customer Name" },
      { field: "PaymentMethod", header: "Payment Method" },
      { field: "OrderDate", header: "Order Date" },
      { field: "Addresses.City", header: "City" },
      // { field: "Addresses.Details.streetaddress", header: "Biling Address" },
      { field: "TotalBill", header: "Total Bill" },
      { field: "Status", header: "Status" },
    ];
  }
  async loadorders() {
    //  this.spinner.show();
    try {
      this.loading = true;
      const res: AllOrders = await this.adminser.getAllorder(
        this.activeItem.badge,
        this.pageno,
        this.Rows
      );
      console.log(res);
      this.Allorders = res["Data"]["data"];
      this.pageinfo = res["Data"]["info"];
      //console.log(this.pageinfo)
      this.loading = false;
      this.lastpage = this.pageinfo.lastPage;
      this.totalRecords = this.pageinfo.totalProducts;
    } catch (error) {
      this.loading = false;
      console.log(error);
      this.summary = "Error";
      this.message = error.statusText;

      this.showerror();
    }
  }
  manipulateOutput(rowData, field) {
    if (field === "Addresses.City") {
      return rowData.Addresses[0].City;
    }
    //  else if (field === "Addresses.Details.streetaddress") {
    //   let value = JSON.parse(rowData.Addresses[0].Details);
    //   return value.streetaddress;
    //}
    else if (field == "Status") {
      return rowData.Status === true ? "Open" : "Settled ";
    } else if (field == "OrderDate") {
      let value = rowData.OrderDate;
      let date = moment.utc(value).local();
      let newdate = date.format(`MM/DD/YYYY HH:mm:ss`);
      return newdate;
    }
    return rowData[field];
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

  OnconfirmOrder(id) {
    this.adminser.orderconfirmed(id).subscribe(
      (res) => {
        console.log("order confirm res", res);
        this.summary = "Success";
        this.message = "Order Confirmed Successfully";
        this.showSuccess();
        this.loadorders();
        console.log("Order canceled");
      },
      (errorMessage: HttpErrorResponse) => {
        if (errorMessage) {
          this.errmessage = errorMessage.error["Status"].message;
          this.summary = "Error";
          this.message = this.errmessage;
          this.showerror();
        }
      }
    );
  }
  OncancelOrder(id) {
    this.adminser.ordercancel(id).subscribe(
      (res) => {
        console.log("order cancel res", res);
        console.log("order confirm res", res);
        this.summary = "Success";
        this.message = "Order Cancled Successfully";
        this.showSuccess();
        this.loadorders();
      },
      (errorMessage: HttpErrorResponse) => {
        if (errorMessage) {
          this.errmessage = errorMessage.error["Status"].message;

          this.showerror();
        }
      }
    );
  }
  onPageChange(pages) {
    console.log(pages);
    var page = pages["page"];
    var pagee = page + 1;
    var rows = pages["rows"];
    this.Rows = rows;

    if (pagee == this.initialpage) {
      this.loadorders();
    }

    // console.log("rows in fun",this.Rows);
    if (pagee > this.initialpage) {
      this.pageno = pagee;
      this.loadorders();
      this.initialpage = pagee;
      //console.log(this.pageno);
    }
    if (pagee < this.initialpage) {
      this.pageno = pagee;
      this.loadorders();
      this.initialpage = pagee;
      //  console.log(this.pageno);
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

  onMenuChange(tab) {
    this.Allorders = [];
    //console.log(tab);
    this.activeItem = tab.activeItem;
    // console.log(this.activeItem.badge);
    this.initialpage = 1;
    this.Rows = 50;
    this.lastpage = null;
    this.totalRecords = null;
    this.loadorders();
  }
}
