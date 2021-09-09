import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { HealthcareProductsComponent } from './healthcare-products/healthcare-products.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CategoryComponent } from './category/category.component';
import { CardComponent } from './card/card.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from './search.pipe';
import { ProductComponent } from './product/product.component';
import { ProfileOrdersComponent } from './profile-orders/profile-orders.component';
import { ProductHealthComponent } from './product-health/product-health.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = []
@NgModule({
  declarations: [
    AppComponent,
    
    HomeComponent,
    FooterComponent,
    MedicinesComponent,
    HealthcareProductsComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    CategoryComponent,
    CardComponent,
    SearchPipe,
    ProductComponent,
    ProfileOrdersComponent,
    ProductHealthComponent,
    NotFoundComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes,{useHash:true})
  ],
  providers: [],
  bootstrap: [AppComponent,CategoryComponent]
})
export class AppModule { }
