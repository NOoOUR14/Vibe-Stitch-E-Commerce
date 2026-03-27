import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-products.html',
  styleUrl: './manage-products.css'
})
export class ManageProductsComponent implements OnInit {
  private _productService = inject(ProductService);

  products = signal<any[]>([]);
  isEditMode = signal<boolean>(false);
  currentProductId = signal<string | null>(null);
  selectedProduct: any = { name: '', price: 0, image: '', gender: '' };

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this._productService.getAllProducts().subscribe({
      next: (res: any) => this.products.set(res.data || res),
      error: (err) => console.error('Error loading inventory:', err)
    });
  }

  openAddModal(): void {
    this.isEditMode.set(false);
    this.currentProductId.set(null);
    this.selectedProduct = { name: '', price: 0, image: '', gender: '' };
    this.toggleModal('show');
  }

  openEditModal(product: any): void {
    this.isEditMode.set(true);
    this.currentProductId.set(product._id);
    this.selectedProduct = { ...product };
    this.toggleModal('show');
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    const action = this.isEditMode() 
      ? this._productService.updateProduct(this.currentProductId()!, form.value)
      : this._productService.addProduct(form.value);

    action.subscribe({
      next: () => {
        alert(this.isEditMode() ? 'Product updated!' : 'Product added!');
        this.toggleModal('hide');
        this.loadProducts();
        form.reset();
      },
      error: (err) => {
        console.error('Submission failed:', err);
        alert(err.status === 401 ? 'Unauthorized: Please login again.' : 'Action failed.');
      }
    });
  }

  deleteProduct(id: string): void {
    if (confirm('Delete this item?')) {
      this._productService.deleteProduct(id).subscribe({
        next: () => this.products.update(prev => prev.filter(p => p._id !== id)),
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }

  private toggleModal(state: 'show' | 'hide'): void {
    const el = document.getElementById('addProductModal');
    if (el) {
      const modal = (window as any).bootstrap.Modal.getOrCreateInstance(el);
      state === 'show' ? modal.show() : modal.hide();
    }
  }
}