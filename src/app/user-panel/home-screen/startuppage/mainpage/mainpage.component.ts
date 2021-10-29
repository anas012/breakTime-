import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../../services/authservice.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
value:number;
addtocart=true;
cart:boolean;
  constructor(private auth:AuthserviceService) { 
    
  }

  ngOnInit(): void {
  }
 
  
}
