import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  health=[]
  type:string
  totitems:number;
  searchTerm:string="";
  constructor(private dsobj:UserService,private route: ActivatedRoute,private router:Router) { 
    this.type=this.route.snapshot.params.type
    console.log(this.type)
    this.dsobj.onHealth(this.type).subscribe(
      res=>{
        this.health=res.message;
        this.totitems=this.health.length;
        console.log(this.health,this.totitems)
    
        //this.dsobj.medsData(this.health)
        //console.log(res.type)
       
      },
      err=>{console.log("error in ayurvedic",err)}
    )
  } p: number = 1;
  collection: any[] = this.health;

  ngOnInit(): void {
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
                    "productObj":product}
      console.log("in card ts",this.cartObj)
    this.dsobj.pushToCart(this.cartObj).subscribe(
      res=>{alert(res.message)
      },
      err=>{console.log("error in pushing to cart",err)}
    )
  }
  }


  medName:string
  onImg(id,med)
  { console.log(id,med)
    this.dsobj.medByName=med
    localStorage.setItem("medicineName",med.name)
    this.router.navigateByUrl("healthcare/"+id)
  }
}
