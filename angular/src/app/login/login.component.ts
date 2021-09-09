import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private dsobj:UserService) { }

  ngOnInit(): void {
  }

  onCreate(){
    console.log("working")
    this.router.navigateByUrl('/register')
  }

  onLogin(ref:NgForm)
  {
    console.log(ref.value)
    this.dsobj.onlogin(ref.value).subscribe(
      res=>{
        if(res.message=="success")
        {
          console.log(res)
          this.router.navigateByUrl(`profile`) 
        this.dsobj.status=true
        localStorage.setItem("email",ref.value.email)
        localStorage.setItem("name",res.username)
      }
      else if(res.message=="no account with this mail id register to login")
      { alert("register to login")
        this.router.navigateByUrl("/register")
      }
        else{alert(res.message)}
      },
      err=>{
        console.log("error in login=",err)
      }
    )
  }
}