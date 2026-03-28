import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products';
import { BestSellersComponent } from '../products/best-sellers/best-sellers';
import { NewArrivalsComponent } from '../products/new-arrivals/new-arrivals';
import { ExploreCollectionComponent } from '../products/explore-collection/explore-collection';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent, BestSellersComponent, NewArrivalsComponent, ExploreCollectionComponent],

  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {



}
