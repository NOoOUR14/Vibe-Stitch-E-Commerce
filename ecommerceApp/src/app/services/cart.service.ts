import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // مصفوفة المنتجات (Private عشان محدش يعدل عليها غير من داخل السيرفس)
  private cartItems = signal<any[]>([]);

  // العداد اللي بيظهر في الهيدر (Computed بيتحدث تلقائياً)
  cartCount = computed(() => this.cartItems().length);

  // قائمة المنتجات لصفحة السلة
  items = computed(() => this.cartItems());

  // دالة إضافة منتج للسلة
  addToCart(product: any) {
    this.cartItems.update(prev => [...prev, product]);
    console.log('Product added to cart:', product);
  }

  clearCart() {
    this.cartItems.set([]);
  }

  getCartItems() {
    return this.cartItems();
  }
removeFromCart(index: number) {
  this.cartItems.update(prev => {
    const newItems = [...prev];
    newItems.splice(index, 1);
    return newItems;
  });
}

}
