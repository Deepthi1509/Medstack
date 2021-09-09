import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-product-health',
  templateUrl: './product-health.component.html',
  styleUrls: ['./product-health.component.css']
})
export class ProductHealthComponent implements OnInit {

  constructor(private dsobj:UserService,private ar:ActivatedRoute,private router:Router) { }
  healthWithId
  med:any;
  id:any
  ngOnInit(): void {
    this.med=[]
    this.id=localStorage.getItem("medicineName");
    console.log("in product id=",this.id)
    this.dsobj.healthWithId(this.id).subscribe
    (
      res=>{this.med.push(res)
      console.log("in product res=",res)},
      err=>{console.log("error in product=",err)}
    )
  console.log("in product",this.med)
  }

  cartObj:any;
  onCart(product){
    if(localStorage.getItem("email")==null)
    {alert("Signin to add to cart")
    this.router.navigateByUrl("login");
  }
  else
  {  this.cartObj={"name":localStorage.getItem("name"),
                    "email":localStorage.getItem("email"),
                    "productObj":product[0]}
      console.log("in card ts",this.cartObj)
    this.dsobj.pushToCart(this.cartObj).subscribe(
      res=>{alert(res.message)
      },
      err=>{console.log("error in pushing to cart",err)}
    )
  }
  }

}
