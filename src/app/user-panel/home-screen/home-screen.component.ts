import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HomeScreenComponent implements OnInit {
  badgevalue:number;
  badgealert=false;
  constructor() { }

  ngOnInit(): void
   {
    this.badgealert=true;
    this.badgevalue=1;
  }

}
