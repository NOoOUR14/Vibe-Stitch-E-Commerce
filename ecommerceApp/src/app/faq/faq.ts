import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class FaqComponent implements OnInit {
  private http = inject(HttpClient);

  faqs = signal<any[]>([]);

  ngOnInit() {
    this.fetchFaqs();
  }

  fetchFaqs() {
    this.http.get<any>('http://localhost:5000/api/faqs').subscribe({
      next: (res) => {
        this.faqs.set(res.data);
      },
      error: (err) => {
        console.error('Error fetching FAQs:', err);
        this.faqs.set([
          { question: 'Loading Question...', answer: 'Our team is working on it.' }
        ]);
      }
    });
  }
}
