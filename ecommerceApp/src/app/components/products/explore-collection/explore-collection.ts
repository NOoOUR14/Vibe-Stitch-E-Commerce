import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-explore-collection',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './explore-collection.html'
})
export class ExploreCollectionComponent {
  @Input() allProducts: any[] = [];
}
