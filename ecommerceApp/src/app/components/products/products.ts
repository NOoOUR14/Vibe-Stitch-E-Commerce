import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

import { NewArrivalsComponent } from './new-arrivals/new-arrivals';
import { BestSellersComponent } from './best-sellers/best-sellers';
import { ExploreCollectionComponent } from './explore-collection/explore-collection';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, NewArrivalsComponent, BestSellersComponent, ExploreCollectionComponent],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  allProducts = signal<any[]>([]);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.loadData(params);
    });
  }

 loadData(filters: any) {
  const params: any = {};
  if (filters.keyword) params.keyword = filters.keyword;
  if (filters.gender) params.gender = filters.gender;
  if (filters.category) params.category = filters.category;

  this.productService.getAllProducts(params).subscribe({
    next: (res: any) => {
      const data = res.data || res;
      this.allProducts.set(data);
      console.log('done :', data);
    },
    error: (err) => console.error('API Error:', err)
  });
}
}
