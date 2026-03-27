import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent {
  private _cartService = inject(CartService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);

  cartItems = this._cartService.items;
  checkoutForm: FormGroup;

  private apiUrl = 'http://localhost:5000/api/orders';

  constructor() {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      gender: ['male']
    });
  }

  getTotal() {
    return this.cartItems().reduce((acc, item) => acc + (item.price || 0), 0);
  }

  confirmOrder() {
    if (this.checkoutForm.valid) {
      const orderData = {
        orderItems: this.cartItems().map(item => ({
          product: item._id,
          quantity: 1,
          price: item.price
        })),
        shippingAddress: {
          street: this.checkoutForm.value.street,
          city: this.checkoutForm.value.city,
          phone: this.checkoutForm.value.phone
        },
        totalPrice: this.getTotal()
      };

      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.post(this.apiUrl, orderData, { headers }).subscribe({
        next: (response) => {
          console.log('Order created successfully:', response);
          alert('Your request has been successfully');
          this._cartService.clearCart();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error creating order:', err);
          alert('An error occurred while registering the request: ' + (err.error.message || 'try again'));
        }
      });

    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}
