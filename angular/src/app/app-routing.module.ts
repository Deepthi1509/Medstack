import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { HealthcareProductsComponent } from './healthcare-products/healthcare-products.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CategoryComponent } from './category/category.component';
import { CardComponent } from './card/card.component';
import { ProductComponent } from './product/product.component';
import { ProfileOrdersComponent } from './profile-orders/profile-orders.component';
import { ProductHealthComponent } from './product-health/product-health.component';
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"cart",component:CartComponent},
  {path:"login",component:LoginComponent},
  {path:'user-profile/:name',component:UserProfileComponent},
  {path:"medicines",component:MedicinesComponent},
  {path:"register",component:RegisterComponent},
  {path:"medicines/:type",component:CategoryComponent },
  {path:"product/:name",component:ProductComponent},
  {path:"healthcare/:name",component:ProductHealthComponent},
  {path:"profile",component:ProfileOrdersComponent},
  {path:"healthCare-products/:type",component:CardComponent},
  {path:"healthCare-products/:type/:name",component:ProductComponent},
  {path:"healthcare-products",component:HealthcareProductsComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:"**",component:NotFoundComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
