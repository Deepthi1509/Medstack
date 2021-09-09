import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  pass=false
  constructor(private usobj:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(ref:NgForm)
  {
    console.log("form submitted")
    let temp=ref.value;

    if(temp.password!=temp.confirm)
    {
      this.pass=true
    }
    else if(temp.username==""||temp.email==""||temp.password==""||temp.confirm==""){
      alert("enter required fields")
    }
    else
    {
      this.pass=false
      this.usobj.registerUser(temp).subscribe(
        res=>{
          if(res.message=="user created")
          {
            alert("user created")
            this.router.navigateByUrl("/login")
          }
          else{
            alert(res.message)
          }
        },
        err=>{
          alert("something went wrong")
          console.log(err)
        }
      )
    }
    

  }
}
