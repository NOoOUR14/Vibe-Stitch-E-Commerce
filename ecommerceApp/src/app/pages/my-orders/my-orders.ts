import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css'
})
export class MyOrdersComponent implements OnInit {
  private http = inject(HttpClient);
  orders = signal<any[]>([]);

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:5000/api/orders', { headers }).subscribe({
      next: (res) => {
        this.orders.set(res.data); 
      },
      error: (err) => console.error('Error fetching orders:', err)
    });
  }
}
