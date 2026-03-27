import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { RouterModule } from '@angular/router';
import { CartComponent } from '../../cart/cart';
import { CartService } from '../../../services/cart.service';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {

  @Input() product: any;

  private productService = inject(CartService);

  addToCart(product: any) {
    if (product.quantity > 0) {
      this.productService.addToCart(product);
      product.quantity--;

      // this.productService.updateProduct(product._id, { quantity: product.quantity }).subscribe({
      //   next: () => console.log('Server updated'),
      //   error: (err) => {
      //     console.error('Server update failed (401), but cart updated locally', err);
      //   }
      // });

    } else {
      alert('Out of Stock!');
    }
  }
}
