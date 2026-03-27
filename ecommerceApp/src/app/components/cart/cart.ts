import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  private _cartService = inject(CartService);
  private router = inject(Router);

  cartItems = this._cartService.items;

  getTotal() {
    return this.cartItems().reduce((acc, item) => acc + (item.price || 0), 0);
  }

  handleCheckout() {
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['/checkout']);
    } else {
      alert('You need to hurry and enter first, Noor, so you can complete the purchase process');
      this.router.navigate(['/login']);
    }
  }

removeItem(index: number) {
  this._cartService.removeFromCart(index);
}
}
