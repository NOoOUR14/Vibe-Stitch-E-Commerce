import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactComponent {
  onSubmit(form: any) {
    console.log('Message Sent:', form.value);
    alert('Thank you! Your vibe has been received.');
  }
}
