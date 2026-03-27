import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {
  public cartCount: number = 0;

  public authService = inject(AuthService);
  private router = inject(Router);
  private productService = inject(ProductService);

  ngOnInit() {
    const saved = localStorage.getItem('vibeCart');
    if (saved) {
      const items = JSON.parse(saved);
      this.cartCount = items.reduce((acc: any, item: any) => acc + item.quantity, 0);
    }

    this.productService.cartCount$.subscribe({
      next: (count) => {
        this.cartCount = count;
        console.log('Header updated with count:', count);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSearch(value: string) {
    if (value) {
      this.router.navigate(['/products'], { queryParams: { search: value } });
    }
  }
}
