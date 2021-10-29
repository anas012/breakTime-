import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { cart, Items } from '../../../../Models/usermodel';
import { AuthserviceService } from '../../../../services/authservice.service';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ItemsComponent implements OnInit {
  private items: MenuItem[];
  badgevalue:number;
  badgealert=false;
  value=0;
  addtocart=true;
  cart:boolean;
  id:string;
  ID:string;
  prditems:Items[]=[];
  array:cart[]=[];
  flag:boolean;
  loader=true;
  constructor(private router:Router,private route:ActivatedRoute,private auth:AuthserviceService) {
   
   }

  ngOnInit(): void {
   // this.id = this.route.snapshot.params['id'];
    this.route.paramMap.subscribe(params=>{
      this.id=params.get('id');
      console.log(this.id)
      this.getAllprd(this.id);
    })
  
  
    
    this.items = [
      {label:'Home',routerLink:'/mainpage'},
      {label:'Items'}
  ];
  }
 

  input(e)
  {
if(this.value==0)
{
  this.addtocart=true;
  this.cart=false;
 
}
  }

  async getAllprd(id:string)
  {
    try 
    {
    const res:Items= await this.auth.getproducts(id);
      this.prditems=res['Data']['data']['Products'];
      console.log(this.prditems);
      this.loader=false;
  }
    catch(error)
    {
      console.log(error)
    }
  }
  Addtocart(id:number,price:string,name:string)
  {
    this.flag=false;
    let newitem:cart=
    {
    Name:name,
    ProductID: id,
    Price:price,
    quantity:1,
    Totalprice:price
    }

    if(this.array.length!=0)
    {

      for(let i=0;i<this.array.length;i++)
      {
        if (id==this.array[i].ProductID)
        {
          this.array[i].quantity++;
          let a=this.array[i].Price;
          let total=parseInt(a)*this.array[i].quantity;
          this.array[i].Totalprice=total.toString();
          console.log(this.array);
          this.flag=true;
        }
       
      }
      if (this.flag === false)
      {
        this.array.push(newitem);
        console.log(this.array);
        
      }

    }
    else 
    {
    this.array.push(newitem);
    console.log(this.array);
    }
    // this.addtocart=false;
    // this.cart=true;

      this.auth.storeitemsarray(this.array);
  
  }

}
