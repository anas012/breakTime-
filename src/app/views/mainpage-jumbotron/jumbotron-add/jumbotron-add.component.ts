import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-jumbotron-add',
  templateUrl: './jumbotron-add.component.html',
  styleUrls: ['./jumbotron-add.component.scss'],
  providers:[MessageService]
})
export class JumbotronAddComponent implements OnInit {
  selectedfile=null;
  url:any;
  uploadedFiles:File=null;
  filenotify=false;
  fd =new FormData();
  summary;
  message;
  constructor(private adminser:AdminService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.url="../../../../assets/icons/No image.png"
  }
  onfileselected(e)
  {
    if (e.target.files.length>0)
    {
      this.selectedfile=<File>e.target.files[0];
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>
      {
        this.url=event.target.result;
      }
    }
  }
  savechanges()
  {
    if (this.selectedfile==null)
    {
      this.filenotify=true;
    }
     else
     {
     this.filenotify=false;
     this.fd.append('Photo',this.selectedfile,this.selectedfile.name);
     //console.log("PHOTO",this.fd.get('Photo'));
     this.url="../../../../assets/icons/No image.png";
     this.message="Success";
     this.summary="Success"
     this.showSuccess()
     this.selectedfile=null;
  }
}
showSuccess() {
  this.messageService.add({
    severity: "success",
    summary: this.summary,
    detail: this.message,
  });
}
showerror() {
  this.messageService.add({
    severity: "error",
    summary: this.summary,
    detail: this.message,
  });
}
}
