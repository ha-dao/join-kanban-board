import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { FeedbackServiceService } from '../../services/feedback.service';
import { Userdata } from '../../interfaces/userdata';
import { NgClass, CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';

/**
 * Component responsible for user registration functionality.
 * Handles form validation, user registration, and redirects after successful signup.
 */
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  /** Service for managing contacts */
  contactService = inject(ContactService);
  
  /** Service for displaying feedback messages to users */
  feedbackService = inject(FeedbackServiceService);
  
  /** Tracks which form fields have validation errors */
  invalidFields: string[] = [];
  
  /** Indicates if the user has accepted the privacy policy */
  privacyAccepted: boolean = false;
  
  /** Controls visibility of the privacy policy */
  showPrivacy = false;

  /** Object containing all user registration data */
  newUserData: Userdata = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  /** User's full name */
  name: string = '';
  
  /** User's email address */
  email = '';
  
  /** User's password */
  password = '';
  
  /** Password confirmation for validation */
  passwordConfirm = '';
  
  /** Error message to display when registration fails */
  public error = '';

  /**
   * Creates an instance of SignupComponent.
   * @param authService - Service for authentication operations
   * @param router - Angular Router service for navigation
   */
  constructor(public authService: AuthService, private router: Router) {}

  /**
   * Handles the registration form submission.
   * Validates passwords match, registers the user, and redirects on success.
   */
  public async onRegister() {    
    if(this.password === this.passwordConfirm){
      try {
        await this.authService.register(this.email, this.password, this.name);
        this.feedbackService.show('Registration successfull');
        if(!this.checkIfMailinUseInContact()){
          this.contactService.addContact({name: this.name, email: this.email, phone: 'Not existing yet'});
        }
        this.authService.login(this.email, this.password);  
        this.authService.UserLoggedIn = this.authService.getUsername(this.email);     
        this.router.navigate(['/summary']);
        localStorage.setItem('loggedIn', this.authService.UserLoggedIn);
      } catch (err: any) {
        this.error = err.message;
      }
    }
  }

  /**
   * Checks if the email is already used in the contact list.
   * @returns Boolean indicating if the email is already in use
   */
  checkIfMailinUseInContact(): boolean {
    let include = false; 
    this.contactService.contactList.forEach(c => {
      if(this.email == c.email){
        include = true;
      }
    });
    return include;
  }

  /**
   * Validates if the form meets minimum requirements.
   * @returns Boolean indicating if the form is valid
   */
  get isFormValid(): boolean {
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email);    
    return this.name.trim().length >= 2 && isEmailValid;
  }
  
  /**
   * Validates specific form fields and updates the invalidFields array.
   * @param field - Name of the field to validate
   */
  validateForm(field: string) {
    const addFieldIfInvalid = (condition: boolean, fieldName: string) => {
      if (condition && !this.invalidFields.includes(fieldName)) {
        this.invalidFields.push(fieldName);
      } else if (!condition) {
        this.invalidFields = this.invalidFields.filter(f => f !== fieldName);
      }
    };
    if (field === 'name') {
      this.validateName(addFieldIfInvalid);
    }
    if (field === 'email') {
      this.validateMail(addFieldIfInvalid);
    }
    if (field === 'password') {
      this.validatePassword(addFieldIfInvalid);
    }
    if (field === 'confirmPassword') {
      this.validateConfirmedPassword(addFieldIfInvalid);
    }
  }

  /**
   * Validates the name field.
   * @param addFieldIfInvalid - Function to update invalidFields array
   */
  validateName(addFieldIfInvalid: Function) {
    const isInvalid = !this.name || this.name.trim().length < 2;
    addFieldIfInvalid(isInvalid, 'name');
  }

  /**
   * Validates the email field.
   * @param addFieldIfInvalid - Function to update invalidFields array
   */
  validateMail(addFieldIfInvalid: Function) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = this.email?.trim().toLowerCase();      
    const isFormatInvalid = !email || !emailRegex.test(email);    
    const isInvalid = isFormatInvalid;
    addFieldIfInvalid(isInvalid, 'email');
  }

  /**
   * Validates the password field and triggers confirmation validation.
   * @param addFieldIfInvalid - Function to update invalidFields array
   */
  validatePassword(addFieldIfInvalid: Function) {
    const isInvalid = !this.password || this.password.length < 6;
    addFieldIfInvalid(isInvalid, 'password');

    if (this.newUserData.confirmPassword) {
      this.validateForm('confirmPassword');
    }
  }

  /**
   * Validates the password confirmation field.
   * @param addFieldIfInvalid - Function to update invalidFields array
   */
  validateConfirmedPassword(addFieldIfInvalid: Function) {
    const isInvalid = this.passwordConfirm !== this.password;
    addFieldIfInvalid(isInvalid, 'confirmPassword');
  }

  /**
   * Navigates to the specified route.
   * @param target - Route path to navigate to
   */
  goToAnotherPage(target: string): void {
    this.router.navigate([target]);
  }

  /**
   * Navigates back to the home page.
   */
  onBackClick(): void {
    this.router.navigate(['/']);
  }

  /**
   * Closes the privacy policy dialog.
   */
  closePrivacy() {
    this.showPrivacy = false;
  }
}