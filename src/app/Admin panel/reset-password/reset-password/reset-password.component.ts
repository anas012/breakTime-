import { HttpErrorResponse } from "@angular/common/http";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgxSpinner, NgxSpinnerService } from "ngx-spinner";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError } from "rxjs/operators";
import { AdminService } from "../../../services/admin.service";
import { AuthorizedService } from "../../../services/authorized.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent implements OnInit {
  public resetpassword: any = {
    OldPassword: "",
    NewPassword:"",
    ConfirmPassword: "",
  };
  confirmpw: any;
  summary;
  message;
  constructor(
    private confirmationService: ConfirmationService,
    private messageservice: MessageService,
    private adminserv: AdminService,
    private authorizedserv: AuthorizedService,
    private spineer: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  confirmSubmit(form: NgForm) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.onreset();
      },
      reject: () => {},
    });
  }
  onreset() {
    if (this.resetpassword.previouspw && this.resetpassword.newpw === null) {
      return;
    } else {
      if (this.resetpassword.NewPassword == this.resetpassword.ConfirmPassword) {
        var Data = this.resetpassword;
        var data: any = {
          Data,
        };
        var id = this.authorizedserv.getUserId();
        this.spineer.show();
        this.adminserv.resetpw(data, id).subscribe(
          (res) => {
            this.spineer.hide();
            console.log(res);
            this.summary = "Success";
            this.message = "Password update successfully";
            this.showSuccess();
          },
          (errorMessage: HttpErrorResponse) => {
            if (errorMessage) {
              var msg = errorMessage.error["Status"].message;
              this.spineer.hide();
              this.summary = "Error";
              this.message = msg;
              this.showerror();
            }
          }
        );
      } else {
        this.summary = "Error";
        this.message = "Password and Confrim password does not Matched";
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
}
