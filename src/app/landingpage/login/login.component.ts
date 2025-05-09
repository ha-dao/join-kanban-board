import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FeedbackServiceService } from '../../services/feedback.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  feedbackService= inject(FeedbackServiceService)
  contactService= inject(ContactService)
  emailOrUsername = '';
  password = '';
  error = '';

  constructor(private routerModule: RouterModule, private router: Router, private authService: AuthService) {}

  goToAnotherPage(target:string): void {
    this.router.navigate([target]);
  }

  login() {
    alert(`E-Mail: ${this.emailOrUsername}\nPasswort: ${this.password}`);
  }

  guestLogin() {
    alert('Guest login erfolgreich!');
  }

  
    public async onLogin(emailOrUsername:string, password:string) {
      try {
        await this.authService.login(emailOrUsername, password);
        console.log('Login erfolgreich');
      } catch (err: any) {
        this.error = err.message;
      }
    }
}
