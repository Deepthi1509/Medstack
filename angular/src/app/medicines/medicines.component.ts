import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {

  constructor(private dsobj:UserService,private router:Router) { }
  meds:[];
  ngOnInit(): void {
  }
 
 onAyur()
 { 
   
  this.router.navigateByUrl(`/medicines/ayurvedic`)
    
 }
 onNutrition()
 {
  this.router.navigateByUrl(`/medicines/nutrition`)
 }
 onRegular(){
  this.router.navigateByUrl(`/medicines/regular`)
 }
 onVitamins(){
  this.router.navigateByUrl(`/medicines/vitamins`)
 }
 onHemeo(){
  this.router.navigateByUrl(`/medicines/homeo`)
 }

}
