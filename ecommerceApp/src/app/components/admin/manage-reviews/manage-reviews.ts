import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-reviews.html',
  styleUrl: './manage-reviews.css'
})
export class ManageReviewsComponent implements OnInit {
  private http = inject(HttpClient);

  pendingReviews = signal<any[]>([]);

  ngOnInit() {
    this.loadPendingReviews();
  }

  loadPendingReviews() {
    this.http.get<any>('http://localhost:5000/api/reviews?status=pending').subscribe(res => {
      if (res.data && res.data.reviews) {
        this.pendingReviews.set(res.data.reviews);
      }
    });
  }

  approveReview(id: string) {
    this.http.patch(`http://localhost:5000/api/reviews/${id}`, { status: 'approved' }).subscribe(() => {
      this.pendingReviews.update(items => items.filter(r => r._id !== id));
      alert('Approved!');
    });
  }

  deleteReview(id: string) {
    if(confirm('Are you sure you want to delete this review?')) {
      this.http.delete(`http://localhost:5000/api/reviews/${id}`).subscribe(() => {
        this.pendingReviews.update(items => items.filter(r => r._id !== id));
      });
    }
  }
}
