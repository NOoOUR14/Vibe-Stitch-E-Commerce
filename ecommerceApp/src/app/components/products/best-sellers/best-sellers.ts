
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
templateUrl: './best-sellers.html',
styleUrl: './best-sellers.css'})
export class BestSellersComponent {
  @Input() allProducts: any[] = [];
}
