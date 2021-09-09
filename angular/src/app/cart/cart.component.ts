import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cart:any
cartStatus:any=false
name:string;
products:[]
  constructor(private dsobj:UserService) { 
    
}


  ngOnInit(): void {
    this.name=localStorage.getItem("name")
    this.dsobj.getCartProducts(localStorage.getItem("name")).subscribe(
      res=>{this.cart=res.message;
        console.log(res)
        if(this.cart!="Cart empty")
          this.cartStatus=true
        console.log("in cart",this.cart)
      console.log(this.cart.cartProducts)
   },
      err=>{console.log("error in library",err)}

    )
  }
updateCart:any;
  ondelete(ind)
  { console.log(this.cart.cartProducts,ind)
    this.products=this.cart.cartProducts
    console.log(this.products.splice(ind, 1));
    this.updateCart={"email":localStorage.getItem("email"),
    "name":localStorage.getItem("name"),
    "cartProducts":this.products
  }
    this.dsobj.updateCart(localStorage.getItem("name"),this.updateCart).subscribe
    (
      res=>{console.log(res.message)},
      err=>{console.log("error in deleting",err)}
    )
    console.log("ind deleting",this.products[ind])
  }

email:string
orderProducts:any;
username:string
  //order confirmation
  onOrder()
  { this.dsobj.order=true
    //alert("order confirmed go to your profile to see latest order")
    this.email=localStorage.getItem("email")
    this.username=localStorage.getItem("name")
    this.orderProducts={"email":this.email,"products":this.cart.cartProducts,name:this.username}
    console.log("in order function in cart",this.orderProducts)
    this.dsobj.mailSent(this.orderProducts).subscribe(
      res=>{
        alert(res.message)
        console.log(res.message)},
      err=>{console.log("error in order=",err)}
    )
  }
}