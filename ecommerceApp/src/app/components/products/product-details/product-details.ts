import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product = signal<any>(null);
  loading = signal<boolean>(true);
  error = signal<boolean>(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (res: any) => {
          this.product.set(res.data);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Fetch Error:', err);
          this.error.set(true);
          this.loading.set(false);
        }
      });
    }
  }

  addToCart() {
    const currentProduct = this.product();

    if (currentProduct && currentProduct.stock > 0) {
      this.cartService.addToCart(currentProduct);

      const newStock = currentProduct.stock - 1;
      this.productService.updateProduct(currentProduct._id, { stock: newStock }).subscribe({
        next: () => {
          this.product.set({ ...currentProduct, stock: newStock });
        },
        error: (err) => console.error('Stock Update Failed:', err)
      });
    }
  }
}
