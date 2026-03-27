import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs'; // ضفنا BehaviorSubject هنا

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/products';

  private cartItems: any[] = [];

  // 1. تعريف الـ Subject لمراقبة عدد منتجات السلة
  private cartCount = new BehaviorSubject<number>(this.getInitialCartCount());
  cartCount$ = this.cartCount.asObservable(); // ده اللي الـ Navbar هيعمل فيه Subscribe

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // وظيفة لجلب العدد المبدئي من الـ LocalStorage عند تحميل التطبيق
  private getInitialCartCount(): number {
    const savedCart = localStorage.getItem('vibeCart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      return items.reduce((acc: number, item: any) => acc + item.quantity, 0);
    }
    return 0;
  }

  // --- منطق السلة (Cart Logic) ---
  addToCart(product: any) {
    const savedCart = localStorage.getItem('vibeCart');
    this.cartItems = savedCart ? JSON.parse(savedCart) : [];

    const existingItem = this.cartItems.find(item => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        _id: product._id,
        title: product.title,
        price: product.price,
        imageCover: product.imageCover,
        quantity: 1
      });
    }

    localStorage.setItem('vibeCart', JSON.stringify(this.cartItems));

    // 2. تحديث الـ Subject بالعدد الجديد فوراً
    const total = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    this.cartCount.next(total);

    console.log('Product added to cart, total items:', total);
  }

  // --- جلب المنتجات ---
  getAllProducts(category?: any): Observable<any> {
    let params = new HttpParams();

    if (category && typeof category === 'string') {
      params = params.set('category', category);
    }

    return this.http.get(this.apiUrl, { params });
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addProduct(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.getHeaders() });
  }

  updateProduct(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
