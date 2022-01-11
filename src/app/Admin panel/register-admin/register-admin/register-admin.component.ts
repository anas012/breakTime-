import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { AdminService } from "../../../services/admin.service";

@Component({
  selector: "app-register-admin",
  templateUrl: "./register-admin.component.html",
  styleUrls: ["./register-admin.component.scss"],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterAdminComponent implements OnInit {
  confirmpw: any;
  summary;
  message;
  countrycode;
  public registeradmin: any = {
    Email: "",
    Password: "",
    Name: "",
    Phone: "",
    Identifier:""
  };
  constructor(
    private confirmationService: ConfirmationService,
    private messageservice: MessageService,
    private _adminserv:AdminService
  ) {}

  ngOnInit(): void {}

  confirmSubmit(form: NgForm) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.onSubmit();
      },
      reject: () => {},
    });
  }

  onSubmit() {
    if (
      this.registeradmin.Email &&
      this.registeradmin.Password &&
      this.registeradmin.Name &&
      this.registeradmin.Phone === null
    ) {
      return;
    } else {
      if (this.confirmpw === this.registeradmin.Password) {
        var phone = this.registeradmin.Phone;
        this.registeradmin.Identifier="Admin"
        this.registeradmin.Phone = this.countrycode + phone;
        var Data = this.registeradmin;
        var data: any = {
          Data,
        };
        this._adminserv.registeradmin(data).subscribe(res=>
          {
            this.summary = "Success";
            this.message = "Succcessfully Registerd a new admin";
            this.showSuccess();
            this.reset();
          },(errorMessage:HttpErrorResponse)=>
            {
              this.summary = "Error";
              this.message = errorMessage.error["Status"].message;
              this.showerror();
            })
       
      } else {
        this.message = "Error";
        this.message = "Password and Confirm password does not match";
        this.showerror();
      }
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
  reset() {
    this.countrycode = "";
    this.confirmpw = "";
    this.registeradmin = {
      Name: null,
      Phone: null,
      Password: null,
      Email: null,
    };
  }
}
