import { Component, OnInit } from '@angular/core';
import { cart, Items } from '../../../../Models/usermodel';
import { AuthserviceService } from '../../../../services/authservice.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  popularprd: Items[] = [];
  addtocart = true;
  cart: boolean;
  id: string;
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
  readonly=true;
  isitems = true;
  chkflg = false;
  productSubscription;
  constructor(private auth:AuthserviceService) { 
    
  }

  ngOnInit(): void {
    this.loadpopularproducts();
    this.OnItemsupdate();
  }
  async loadpopularproducts() {
    try {
      this.loader=true;
      this.chkflg = false;
      this.flagg = false;
      const res: Items = await this.auth.getpopularproducts();
      this.popularprd= res["Data"]["data"];
     
      this.chkflg = true;
      if (this.popularprd.length === 0) {
        this.isitems = false;
        this.loader = false;
      } else {
        this.isitems = true;
        //   console.log(this.prditems);
        this.temp2 = [];

        this.temp2 = JSON.parse(this.auth.getitems());

        // this.temp2=JSON.parse(data);
        // console.log("data",this.temp2);
        // console.log("Temp2 after copying data from locak storage", this.temp2);
        if (this.temp2 == null) {
          this.temp2 = [];
          // console.log("cleared array temp2",this.temp2)
        }
        //console.log("temp2 ",this.temp2);
        if (this.temp2 != null) {
          var a = this.popularprd.length;
          var b = this.temp2.length;

          if (this.temp2.length != 0) {
            for (let i = 0; i < this.popularprd.length; i++) {
              this.popularprd[i].addcart = true;
              this.popularprd[i].quantity = "1";
            }

            if (a == b) {
              //  console.log("temp2", this.temp2);
              for (let i = 0; i < this.popularprd.length; i++) {
                this.val1 = this.temp2[i].ProductID;
                this.qty = this.temp2[i].TotalPieces;
                this.stat = this.temp2[i].status;
                for (let i = 0; i < this.popularprd.length; i++) {
                  if (this.popularprd[i].ProductID == this.val1) {
                    this.popularprd[i].quantity = this.qty.toString();
                    this.popularprd[i].addcart = this.stat;
                    this.flagg = true;
                  }
                }
              }
              if (this.flagg === false) {
                for (let i = 0; i < this.popularprd.length; i++) {
                  // console.log("flagg is false", this.flagg);
                  this.popularprd[i].addcart = true;
                  this.popularprd[i].quantity = "1";
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
              for (let i = 0; i < this.popularprd.length; i++) {
                this.val2 = this.temp2[i].ProductID;

                this.qty = this.temp2[i].TotalPieces;
                this.stat = this.temp2[i].status;
                for (let i = 0; i < this.popularprd.length; i++) {
                  if (this.popularprd[i].ProductID == this.val2) {
                    this.popularprd[i].quantity = this.qty.toString();
                    this.popularprd[i].addcart = this.stat;
                    this.flagg = true;
                  }
                }
              }
              if (this.flagg === false) {
                for (let i = 0; i < this.popularprd.length; i++) {
                  this.popularprd[i].addcart = true;
                  this.popularprd[i].quantity = "1";
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
                addcart: true,
              };

              for (let i = a; i < b; i++) {
                this.popularprd[i] = newitem;
              }
              //  console.log(' temp2',this.temp2);
              for (let i = 0; i < this.popularprd.length; i++) {
                this.val3 = this.temp2[i].ProductID;
                this.qty = this.temp2[i].TotalPieces;
                this.stat = this.temp2[i].status;
                for (let i = 0; i < this.popularprd.length; i++) {
                  if (this.popularprd[i].ProductID == this.val3) {
                    this.popularprd[i].quantity = this.qty.toString();
                    this.popularprd[i].addcart = this.stat;
                    this.flagg = true;
                  }
                }
              }

              // console.log("Checking")

              for (let i = 0; i < this.popularprd.length; i++) {
                let val = this.popularprd[i].ProductID;
                if (val === -1) {
                  console.log(this.popularprd[i].ProductID);
                  this.popularprd.splice(i, b - a);
                }
              }
              //   console.log("poped value prditems",this.prditems)

              if (this.flagg === false) {
                for (let i = 0; i < this.popularprd.length; i++) {
                  //    console.log("flagg is false",this.flagg)
                  this.popularprd[i].addcart = true;
                  this.popularprd[i].quantity = "1";
                }
              }
            }
          } else {
            for (let i = 0; i < this.popularprd.length; i++) {
              //   console.log("false length not match")
              this.popularprd[i].addcart = true;
              this.popularprd[i].quantity = "1";
            }
          }
        }
      }
      this.loader = false;
    } catch (error) {
      this.loader=false;
      console.log(error);
    }
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

    var z = JSON.parse(this.auth.getitems());
    if (z != null) {
      this.array = z;
    }
    if (this.flag1 === true) {
      //console.log("current quantity",quantity);
      if (quantity == 0) {
        this.flag = false;
        for (let i = 0; i < this.popularprd.length; i++) {
          if (this.popularprd[i].ProductID == id) {
            this.popularprd[i].addcart = true;
            this.popularprd[i].quantity = "1";
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
        this.auth.storeitems(this.array);
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
              this.auth.storeitems(this.array);
              this.array = [];
            }
          }
        }
        if (this.flag === false) {
          this.array.push(newitem);
          this.auth.storeitems(this.array);
          this.array = [];
        }
      }
    }
  }
  Addcart(name, id, price, quantity, status) {
    //  console.log(id);
    for (let i = 0; i < this.popularprd.length; i++) {
      if (id === this.popularprd[i].ProductID) this.popularprd[i].addcart = false;
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
      this.auth.storeitems(this.array);
      this.array = [];
    } else {
      this.localtemparray = JSON.parse(localStorage.getItem("items array"));
      // console.log("local storage array",this.localtemparray);
      //console.log("data array",this.array);
      var a: any = this.array[0];
      this.localtemparray.push(a);
      this.auth.storeitems(this.localtemparray);
      this.array = [];
    }
    // console.log(this.auth.getitems());
  }
  onfocus() {
    this.flag1 = true;
    // console.log(this.flag1);
  }
  onblur() {
    this.flag1 = false;
    //console.log(this.flag1);
  }
  OnItemsupdate() {
    this.productSubscription = this.auth.products.subscribe((data) => {
    //  console.log("temp data first", data);
      this.temp2 = [];
      this.temp2 = data;
      if (this.chkflg = true) {
        if (this.temp2 != null) {
      //    console.log("PRD ITEMS second", this.prditems);

          var prditemslength = this.popularprd.length;
          var temp2length = this.temp2.length;
          if (prditemslength != temp2length) {
            let newitem: Items = {
              ProductID: -1,
              Name: "x",
              RetailPrice: "-1",
              PurchasePrice: "-1",

              SubCategoryID: "-1",
              quantity: "-1",
              addcart: true,
            };

            for (let i = prditemslength; i < temp2length; i++) {
              this.popularprd[i] = newitem;
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

            for (let i = 0; i < this.popularprd.length; i++) {
              this.popularprd[i].addcart = true;
              this.popularprd[i].quantity = "1";
            }

            for (let i = 0; i < this.popularprd.length; i++) {
              for (let i = 0; i < this.popularprd.length; i++) {
                this.val2 = this.temp2[i].ProductID;
                this.qty = this.temp2[i].TotalPieces;
                this.stat = this.temp2[i].status;
                for (let i = 0; i < this.popularprd.length; i++) {
                  if (this.popularprd[i].ProductID === this.val2) {
                    this.popularprd[i].quantity = this.qty.toString();
                    this.popularprd[i].addcart = this.stat;
                   // console.log("Condition run 3rd");
                  }
                }
              }

              for (let i = 0; i < this.popularprd.length; i++) {
                let val = this.popularprd[i].ProductID;
                if (val === -1) {
                  console.log(this.popularprd[i].ProductID);
                  this.popularprd.splice(i, temp2length - prditemslength);
                }
              }
            }

            // console.log("data from observable after ",this.prditems);
          }
        }
      
    });
  }
}
