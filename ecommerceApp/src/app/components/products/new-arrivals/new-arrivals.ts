
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
selector: 'app-new-arrivals',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './new-arrivals.html',
  styleUrl: './new-arrivals.css'})
export class NewArrivalsComponent {
  @Input() allProducts: any[] = [];
}
