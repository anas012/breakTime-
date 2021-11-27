import { ClassField } from "@angular/compiler";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { cart, catgories, Items, subcatgories } from "../../../Models/usermodel";
import { AuthserviceService } from "../../../services/authservice.service";
@Component({
  selector: "app-startuppage",
  templateUrl: "./startuppage.component.html",
  styleUrls: ["./startuppage.component.scss"],
  encapsulation:ViewEncapsulation.None
})
export class StartuppageComponent implements OnInit {
  items: MenuItem[];
  category: catgories[];
  subcategory: subcatgories[];
  subarray: subcatgories[];
  length: number;
  sign = false;
  selectedsubID: string;
  value:number;
addtocart=true;
cart:boolean;

  constructor(
    private auth: AuthserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
     this.router.navigate(["mainpage"], { relativeTo: this.route });
    this.getAllcategories();
  }

  async getAllcategories() {
    try {
      this.items = [];
      const res:catgories = await this.auth.getAllCategories();
      //console.log(res);
      this.category = res["Data"]["data"];
     // console.log(this.category);
      for (let i = 0; i < this.category.length; i++) {
        this.items.push({ label: this.category[i].Name, items: [] });

        for (let j = 0; j < this.category[i].SubCategories.length; j++) {
          this.items[i].items.push({
            label: this.category[i].SubCategories[j].Name,
            command: () => {
              this.selectedsubID =
                this.category[i].SubCategories[j].SubCategoryID;
             this.router.navigate(['items',this.selectedsubID],{relativeTo:this.route});
            },
          });
        }
      }

      this.sign = true;
    } catch (error) {
      console.log(error);
    }
  }
 getitems(id:string)
 {
   this.router.navigate(['items',id],{relativeTo:this.route})
 }


  input(e)
  {
if(this.value==0)
{
  this.addtocart=true;
  this.cart=false;
}
  }
  
  // onQuntityadd(id:number)
  // {

    
  // for (let i=0;i<this.array.length;i++)
  // {
  //   if (id==this.array[i].ProductID)
  //   {
  //     if (this.value>this.array[i].quantity)
  //     {
  //     this.array[i].quantity++;
  //     let a=this.array[i].Price;
  //     let total=parseInt(a)*this.array[i].quantity;
  //     this.array[i].Totalprice=total.toString();
  //   }
  //   else 
  //   {
  //     this.array[i].quantity--;
  //     if(this.array[i].quantity==0)
  //     {
  //       this.array.pop();
  //     }
  //     else 
  //     {
  //     let a=this.array[i].Price;
  //     let total=parseInt(a)*this.array[i].quantity;
  //     this.array[i].Totalprice=total;
  //     }
  //   }
  // }
  //   }
  //  console.log(this.array);
  // }
}
