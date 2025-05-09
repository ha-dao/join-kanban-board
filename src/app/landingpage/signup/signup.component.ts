import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { FeedbackServiceService } from '../../services/feedback.service';
import { Userdata } from '../../interfaces/userdata';
import { NgClass, CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
contactService = inject(ContactService)
feedbackService = inject(FeedbackServiceService)
invalidFields:string[]=[]
privacyAccepted:boolean = false;

newUserData:Userdata={
  name: '',
  email: '',
  password:'',
  confirmPassword:''
}

name: string = '';
  email = '';
  password = '';
  passwordConfirm = '';
  public error = '';

  test(){
    console.log('klappt');
    
  }
  constructor(private authService: AuthService) {}

  public async onRegister() {    
    if(this.password === this.passwordConfirm){
      try {
        await this.authService.register(this.email, this.password, this.name);
        this.feedbackService.show('Registration successfull')
      } catch (err: any) {
        this.error = err.message;
      }
    }
  }

  get isFormValid(): boolean {
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email);
    const isEmailUnique = !this.contactService.contactList.some(
      contact => contact.email === this.email
    );
    return this.name.trim().length >= 2 && isEmailValid && isEmailUnique;
  }
  




validateForm(field: string) {
  const addFieldIfInvalid = (condition: boolean, fieldName: string) => {
    if (condition && !this.invalidFields.includes(fieldName)) {
      this.invalidFields.push(fieldName);
    } else if (!condition) {
      this.invalidFields = this.invalidFields.filter(f => f !== fieldName);
    }
  };

  if (field === 'name') {
    const isInvalid = !this.name || this.name.trim().length < 2;
    addFieldIfInvalid(isInvalid, 'name');
  }

  if (field === 'email') {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = this.email;    
    const isInvalid = !email || !emailRegex.test(email) ;
    addFieldIfInvalid(isInvalid, 'email');
  }

  if (field === 'password') {
    const isInvalid = !this.password || this.password.length < 6;
    addFieldIfInvalid(isInvalid, 'password');

    if (this.newUserData.confirmPassword) {
      this.validateForm('confirmPassword');
    }
  }

  if (field === 'confirmPassword') {
    const isInvalid = this.passwordConfirm !== this.password;
    addFieldIfInvalid(isInvalid, 'confirmPassword');
  }
}
  
}
