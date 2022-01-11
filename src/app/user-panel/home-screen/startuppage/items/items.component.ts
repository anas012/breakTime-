import { templateJitUrl } from "@angular/compiler";
import {
  Component,
  forwardRef,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { MenuItem } from "primeng/api";
import { cart, item, Items } from "../../../../Models/usermodel";
import { AuthserviceService } from "../../../../services/authservice.service";
import { CommonserviceService } from "../../../../services/commonservice.service";
@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ItemsComponent implements OnInit {
  public items: MenuItem[];
  addtocart = true;
  cart: boolean;
  id: string;
  prditems: Items[] = [];
  array: cart[] = [];
  flag = false;
  loader = true;
  flag1 = false;
  addcart = true;
  temp2: cart[] = [];
  checkitemarray: cart[] = [];
  flagg = false;
  val1: number;
  val2: number;
  val3: number;
  qty: number;
  stat: boolean;
  sum: number;
  price: number;
  qtyy: number;
  localtemparray: cart[] = [];
  count;
  readonly = true;
  isitems = true;
  chkflg = false;
  productSubscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthserviceService,
    private commonserv: CommonserviceService
  ) {}

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
      this.isitems = true;
      //   console.log(this.id);
      this.getAllprd(this.id);
      this.OnItemsupdate();
    });

    this.items = [
      { label: "Home", routerLink: "/mainpage" },
      { label: "Items" },
    ];
  }

  async getAllprd(id: string) {
    try {
      this.loader = true;
      this.chkflg = false;
      this.flagg = false;
      const res: Items = await this.auth.getproducts(id);
      this.prditems = res["Data"]["data"]["Products"];
      console.log("Allitems", this.prditems);
      this.chkflg = true;
      if (this.prditems.length === 0) {
        this.isitems = false;
        this.loader = false;
      } else {
        this.isitems = true;
        //   console.log(this.prditems);
        this.temp2 = [];

        this.temp2 = JSON.parse(this.commonserv.getitems());

        // this.temp2=JSON.parse(data);
        // console.log("data",this.temp2);
        // console.log("Temp2 after copying data from locak storage", this.temp2);
        if (this.temp2 == null) {
          this.temp2 = [];
          // console.log("cleared array temp2",this.temp2)
        }
        //console.log("temp2 ",this.temp2);
        if (this.temp2 != null) {
          var a = this.prditems.length;
          var b = this.temp2.length;

          if (this.temp2.length != 0) {
            for (let i = 0; i < this.prditems.length; i++) {
              this.prditems[i].addcart = true;
              this.prditems[i].quantity = "1";
            }

            if (a == b) {
              //  console.log("temp2", this.temp2);
              for (let i = 0; i < this.prditems.length; i++) {
                this.val1 = this.temp2[i].ProductID;
                this.qty = this.temp2[i].TotalPieces;
                this.stat = this.temp2[i].status;
                for (let i = 0; i < this.prditems.length; i++) {
                  if (this.prditems[i].ProductID == this.val1) {
                    this.prditems[i].quantity = this.qty.toString();
                    this.prditems[i].addcart = this.stat;
                    this.flagg = true;
                  }
                }
              }
              if (this.flagg === false) {
                for (let i = 0; i < this.prditems.length; i++) {
                  // console.log("flagg is false", this.flagg);
                  this.prditems[i].addcart = true;
                  this.prditems[i].quantity = "1";
                }
              }
            }
            if (b != a) {
              //    console.log("length of prditmes",a);
              //    console.log("length of temp2 original",b);
              //    console.log("setting 0")
              let newitem: cart = {
                ProductID: 0,
                CurrentRate: "1",
                TotalPieces: parseInt("1"),
                TotalValue: "1",
                status: true,
              };
              for (let i = b; i < a; i++) {
                this.temp2[i] = newitem;
              }
              //    console.log("temp2 updated",this.temp2);
              // console.log("temp2", this.temp2);
              for (let i = 0; i < this.prditems.length; i++) {
                this.val2 = this.temp2[i].ProductID;

                this.qty = this.temp2[i].TotalPieces;
                this.stat = this.temp2[i].status;
                for (let i = 0; i < this.prditems.length; i++) {
                  if (this.prditems[i].ProductID == this.val2) {
                    this.prditems[i].quantity = this.qty.toString();
                    this.prditems[i].addcart = this.stat;
                    this.flagg = true;
                  }
                }
              }
              if (this.flagg === false) {
                for (let i = 0; i < this.prditems.length; i++) {
                  this.prditems[i].addcart = true;
                  this.prditems[i].quantity = "1";
                }
              }
            }
            if (a != b) {
              let newitem: Items = {
                ProductID: -1,
                Name: "x",
                RetailPrice: "-1",
                PurchasePrice: "-1",
                SubCategoryID: "-1",
                quantity: "-1",
                Instock: null,
                Quantity: null,
                addcart: true,
              };

              for (let i = a; i < b; i++) {
                this.prditems[i] = newitem;
              }
              //  console.log(' temp2',this.temp2);
              for (let i = 0; i < this.prditems.length; i++) {
                this.val3 = this.temp2[i].ProductID;
                this.qty = this.temp2[i].TotalPieces;
                this.stat = this.temp2[i].status;
                for (let i = 0; i < this.prditems.length; i++) {
                  if (this.prditems[i].ProductID == this.val3) {
                    this.prditems[i].quantity = this.qty.toString();
                    this.prditems[i].addcart = this.stat;
                    this.flagg = true;
                  }
                }
              }

              // console.log("Checking")

              for (let i = 0; i < this.prditems.length; i++) {
                let val = this.prditems[i].ProductID;
                if (val === -1) {
                  console.log(this.prditems[i].ProductID);
                  this.prditems.splice(i, b - a);
                }
              }
              //   console.log("poped value prditems",this.prditems)

              if (this.flagg === false) {
                for (let i = 0; i < this.prditems.length; i++) {
                  //    console.log("flagg is false",this.flagg)
                  this.prditems[i].addcart = true;
                  this.prditems[i].quantity = "1";
                }
              }
            }
          } else {
            for (let i = 0; i < this.prditems.length; i++) {
              //   console.log("false length not match")
              this.prditems[i].addcart = true;
              this.prditems[i].quantity = "1";
            }
          }
        }
      }
      this.loader = false;
    } catch (error) {
      this.loader = false;
      // console.log(error);
      if (error.status == 404) {
        this.isitems = false;
        this.loader = false;
      }
    }
  }
  onfocus() {
    this.flag1 = true;
    // console.log(this.flag1);
  }
  onblur() {
    this.flag1 = false;
    //console.log(this.flag1);
  }
  onproductadd(
    id: number,
    price: string,
    name: string,
    quantity: number,
    addcart: boolean
  ) {
    let newitem: cart = {
      ProductID: id,
      CurrentRate: price,
      TotalPieces: quantity,
      TotalValue: price,
      status: addcart,
    };
    this.array = [];

    var z = JSON.parse(this.commonserv.getitems());
    if (z != null) {
      this.array = z;
    }
    if (this.flag1 === true) {
      //console.log("current quantity",quantity);
      if (quantity == 0) {
        this.flag = false;
        for (let i = 0; i < this.prditems.length; i++) {
          if (this.prditems[i].ProductID == id) {
            this.prditems[i].addcart = true;
            this.prditems[i].quantity = "1";
          }
        }
        //  console.log("deleteing items from array");
        for (let i = 0; i < this.array.length; i++) {
          if (this.array[i].ProductID === id) {
            //    console.log("items matched");
            this.array.splice(i, 1);
            this.flag = true;
          }
        }
        this.commonserv.storeitems(this.array);
        this.array = [];
      } else {
        if (this.array.length != 0) {
          this.flag = false;
          //  console.log('array length not zero');
          for (let i = 0; i < this.array.length; i++) {
            if (id == this.array[i].ProductID) {
              this.sum = 0;
              this.array[i].TotalPieces = quantity;
              this.sum = quantity * parseInt(price);
              //console.log(this.sum);
              this.array[i].TotalValue = this.sum.toString();
              this.flag = true;
              this.commonserv.storeitems(this.array);
              this.array = [];
            }
          }
        }
        if (this.flag === false) {
          this.array.push(newitem);
          this.commonserv.storeitems(this.array);
          this.array = [];
        }
      }
    }
  }
  change(event) {
    console.log("chnage", event);
  }
  Addcart(name, id, price, quantity, status) {
    //  console.log(id);
    for (let i = 0; i < this.prditems.length; i++) {
      if (id === this.prditems[i].ProductID) this.prditems[i].addcart = false;
    }

    let newitem: cart = {
      Name: name,
      ProductID: id,
      CurrentRate: price,
      TotalPieces: 1,
      TotalValue: price,
      status: false,
    };

    this.array.push(newitem);
    if (!localStorage.getItem("items array")) {
      this.commonserv.storeitems(this.array);
      this.array = [];
    } else {
      this.localtemparray = JSON.parse(localStorage.getItem("items array"));
      // console.log("local storage array",this.localtemparray);
      //console.log("data array",this.array);
      var a: any = this.array[0];
      this.localtemparray.push(a);
      this.commonserv.storeitems(this.localtemparray);
      this.array = [];
    }
    // console.log(this.auth.getitems());
  }
  OnItemsupdate() {
    this.productSubscription = this.commonserv.products.subscribe((data) => {
      //  console.log("temp data first", data);
      this.temp2 = [];
      this.temp2 = data;
      if ((this.chkflg = true)) {
        if (this.temp2 != null) {
          //    console.log("PRD ITEMS second", this.prditems);

          var prditemslength = this.prditems.length;
          var temp2length = this.temp2.length;
          if (prditemslength != temp2length) {
            let newitem: Items = {
              ProductID: -1,
              Name: "x",
              RetailPrice: "-1",
              PurchasePrice: "-1",
              Instock: null,
              Quantity: null,
              SubCategoryID: "-1",
              quantity: "-1",
              addcart: true,
            };

            for (let i = prditemslength; i < temp2length; i++) {
              this.prditems[i] = newitem;
            }
          }
          if (temp2length != prditemslength) {
            let newitem: cart = {
              ProductID: 0,
              CurrentRate: "1",
              TotalPieces: parseInt("1"),
              TotalValue: "1",
              status: true,
            };
            for (let i = temp2length; i < prditemslength; i++) {
              this.temp2[i] = newitem;
            }
          }

          for (let i = 0; i < this.prditems.length; i++) {
            this.prditems[i].addcart = true;
            this.prditems[i].quantity = "1";
          }

          for (let i = 0; i < this.prditems.length; i++) {
            for (let i = 0; i < this.prditems.length; i++) {
              this.val2 = this.temp2[i].ProductID;
              this.qty = this.temp2[i].TotalPieces;
              this.stat = this.temp2[i].status;
              for (let i = 0; i < this.prditems.length; i++) {
                if (this.prditems[i].ProductID === this.val2) {
                  this.prditems[i].quantity = this.qty.toString();
                  this.prditems[i].addcart = this.stat;
                  // console.log("Condition run 3rd");
                }
              }
            }

            for (let i = 0; i < this.prditems.length; i++) {
              let val = this.prditems[i].ProductID;
              if (val === -1) {
                console.log(this.prditems[i].ProductID);
                this.prditems.splice(i, temp2length - prditemslength);
              }
            }
          }

          // console.log("data from observable after ",this.prditems);
        }
      }
    });
  }

  Repeatskeleton(n: number): Array<number> {
    return Array(n);
  }

  checkinginput(id, price, name, quantity, addcart, inputvalue) {
    console.log(inputvalue.value);

    var products: cart[] = JSON.parse(this.commonserv.getitems());
    if (products != null) {
      if (inputvalue.value >= 1 && inputvalue.value <= quantity) {
        // console.log("first run")
        for (let i = 0; i < products.length; i++) {
          if (id === products[i].ProductID) {
            products[i].TotalPieces = inputvalue.value;
            this.sum = 0;
            products[i].TotalPieces = inputvalue.value;
            this.sum = inputvalue.value * parseInt(price);
          }
        }
        this.commonserv.storeitems(products);
        products = [];
      } else {
        //  console.log("second run")
        for (let i = 0; i < this.prditems.length; i++) {
          if (this.prditems[i].ProductID == id) {
            this.prditems[i].addcart = true;
            this.prditems[i].quantity = "1";
          }
        }
        //  console.log("deleteing items from array");
        for (let i = 0; i < products.length; i++) {
          if (products[i].ProductID === id) {
            //    console.log("items matched");
            products.splice(i, 1);
          }
        }
        this.commonserv.storeitems(products);
        products = [];
      }
    }
  }
}
