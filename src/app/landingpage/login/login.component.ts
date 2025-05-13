import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FeedbackServiceService } from '../../services/feedback.service';
import { ContactService } from '../../services/contact.service';
import { NgClass, CommonModule } from '@angular/common';

/**
 * Component responsible for handling user login functionality.
 * This component manages authentication, form validation, and navigation after login.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  /** Service for handling user feedback notifications */
  feedbackService = inject(FeedbackServiceService);
  
  /** Service for handling contact-related operations */
  contactService = inject(ContactService);
  
  /** Stores user input for email or username */
  emailOrUsername = '';
  
  /** Stores user password input */
  password = '';
  
  /** Error message to display when authentication fails */
  error = '';
  
  /** Tracks which form fields have validation errors */
  invalidFields: string[] = [];
  
  /** Flag indicating whether login was successful */
  loginSuccessfull: boolean = true;

  /**
   * Creates an instance of LoginComponent.
   * @param routerModule - Angular RouterModule for navigation
   * @param router - Angular Router service for navigation
   * @param authService - Service for authentication operations
   */
  constructor(private routerModule: RouterModule, private router: Router, private authService: AuthService) {}

  /**
   * Navigates to the specified route.
   * @param target - Route path to navigate to
   */
  goToAnotherPage(target: string): void {
    this.router.navigate([target]);
  }

  /**
   * Checks if the form inputs are valid.
   * @returns boolean indicating whether form is valid
   */
  get isFormValid() {     
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.emailOrUsername);
    return isEmailValid && this.password.length >= 6;
  }

  /**
   * Performs login with guest credentials.
   * Automatically navigates to summary page upon successful login.
   */
  async guestLogin() {
    await this.authService.login('guest@guest.de', '123456');
    this.authService.UserLoggedIn = 'Guest';
    this.router.navigate(['/summary']);
    localStorage.setItem('loggedIn', 'Guest');
  }

  /**
   * Validates the email field and updates invalidFields array.
   * @param field - Field name to validate
   */
  validateMail(field: string) {    
    const addFieldIfInvalid = (condition: boolean, fieldName: string) => {
      if (condition && !this.invalidFields.includes(fieldName)) {
        this.invalidFields.push(fieldName);
      } else if (!condition) {
        this.invalidFields = this.invalidFields.filter(f => f !== fieldName);
      }
    };
    
    if (field === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const email = this.emailOrUsername;    
      const isInvalid = !email || !emailRegex.test(email);
      addFieldIfInvalid(isInvalid, 'email');
    }    
  }
  
  /**
   * Handles the login form submission.
   * Attempts to authenticate user and navigates to summary page on success.
   * Updates loginSuccessful flag on failure.
   */
  public async onLogin() {
    try {
      await this.authService.login(this.emailOrUsername, this.password);
      this.authService.UserLoggedIn = this.authService.getUsername(this.emailOrUsername);
      this.goToAnotherPage('/summary');
      localStorage.setItem('loggedIn', this.authService.UserLoggedIn);
    } catch (err: any) {
      this.loginSuccessfull = false;
    }
  }
}