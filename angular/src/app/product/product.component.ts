import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  med:any;
  id:any
  constructor(private dsobj:UserService,private ar:ActivatedRoute,private router:Router) { 
    }

  ngOnInit(): void {
    this.med=[]
    this.id=localStorage.getItem("medicineName");
    console.log("in product id=",this.id)
    this.dsobj.medicinesWithId(this.id).subscribe
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