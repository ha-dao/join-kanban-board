import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { FeedbackServiceService } from '../../services/feedback.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  feedbackService= inject(FeedbackServiceService)
  contactService= inject(ContactService)
  email = '';
  password = '';

  login() {
    alert(`E-Mail: ${this.email}\nPasswort: ${this.password}`);
  }

  guestLogin() {
    alert('Guest login erfolgreich!');
  }
}
