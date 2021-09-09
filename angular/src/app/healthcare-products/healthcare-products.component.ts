import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-healthcare-products',
  templateUrl: './healthcare-products.component.html',
  styleUrls: ['./healthcare-products.component.css']
})
export class HealthcareProductsComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  onRegular()
  {
    this.route.navigateByUrl('/healthCare-products/regular')
  }
  onBaby()
  {
    this.route.navigateByUrl('/healthCare-products/babycare')
  }
  onCosmetics()
  {
    this.route.navigateByUrl('/healthCare-products/cosmetics')
  }
  onCovid()
  {
    this.route.navigateByUrl('/healthCare-products/covid')
  }


}
