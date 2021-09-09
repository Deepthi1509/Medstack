import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.css']
})
export class ProfileOrdersComponent implements OnInit {
  cart:any
  orderStatus:any=false
  ordersArray:any
  totalPrice:any=0
  name:any
  mail:any
  constructor(public dsobj:UserService) {
   
  
   }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")
    this.mail = localStorage.getItem("email")
    this.dsobj.orders(localStorage.getItem("email")).subscribe(
      res=>{
        this.cart=res.message
        if(this.cart!="Order empty")
          this.orderStatus=true
        console.log(res.message)
      },
      err=>{console.log("error in profile orders=",err)}
    )

    this.dsobj.onlyOrders(localStorage.getItem("email")).subscribe(
      res=>{
        this.ordersArray=res.message
        console.log("in onlyorders",this.ordersArray)
        for(let i of this.ordersArray)
      {
        console.log(i.price)
        this.totalPrice=this.totalPrice+i.price
      }
      console.log(this.totalPrice)
      },
      err=>{console.log("error in only orders",err)}
    )
  
    
  }

}
