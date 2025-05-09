import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FeedbackServiceService } from '../../services/feedback.service';
import { ContactService } from '../../services/contact.service';
import { NgClass, CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  feedbackService= inject(FeedbackServiceService)
  contactService= inject(ContactService)
  emailOrUsername = '';
  password = '';
  error = '';
  invalidFields:string[]=[]
  constructor(private routerModule: RouterModule, private router: Router, private authService: AuthService) {}

  goToAnotherPage(target:string): void {
    this.router.navigate([target]);
  }

  get isFormValid(){     
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.emailOrUsername);
    return isEmailValid && this.password.length >=6
  }

  guestLogin() {
    this.goToAnotherPage('/summary')
  }

  validateMail(field:string){    
      const addFieldIfInvalid = (condition: boolean, fieldName: string) => {
        if (condition && !this.invalidFields.includes(fieldName)) {
          this.invalidFields.push(fieldName);
        } else if (!condition) {
          this.invalidFields = this.invalidFields.filter(f => f !== fieldName);
        }
      }    
      if (field === 'email') {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const email = this.emailOrUsername;    
        const isInvalid = !email || !emailRegex.test(email) ;
        addFieldIfInvalid(isInvalid, 'email');
      }    
  }
  
    public async onLogin() {
      try {
        await this.authService.login(this.emailOrUsername, this.password);
        this.goToAnotherPage('/summary')
      } catch (err: any) {
        this.error = err.message;
      }
    }
}
