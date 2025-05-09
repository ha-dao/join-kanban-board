import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { FeedbackServiceService } from '../../services/feedback.service';
import { Userdata } from '../../interfaces/userdata';
import { NgClass } from '@angular/common';

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

createUser(){
  this.checkForExistingUser()

this.feedbackService.show('You Signed up!')
}

checkForExistingUser(){

}

// validateForm(field: string) {  
//   this.invalidFields = this.invalidFields.filter(f => f !== field);
//   if(field === 'name'){
//     this.validateName()  
// }
//   if(field === 'email'){
//   this.validateMail()
// }
//   if(field === 'password' || 'confirmPassword'){
//     this.validatePassword()
//   }
// }

// validateName(){
//   if (!this.newUserData.name || this.newUserData.name.length < 2) {
//     this.invalidFields.push('name');    
//   }
// }

// validateMail(){
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   if (
//     !this.newUserData.email || 
//     !emailRegex.test(this.newUserData.email) || 
//     (emailRegex.test(this.newUserData.email) &&
//      this.contactService.contactList.some(
//        contact => contact.email === this.contactService.contactData.email
//      ))
//   ) {
//     this.invalidFields.push('email');
//   }
// }

// validatePassword(){
//   if (!this.newUserData.password || this.newUserData.password.length < 6) {
//     this.invalidFields.push('password');
//   }
//   if (
//     !this.newUserData.confirmPassword ||
//     this.newUserData.confirmPassword !== this.newUserData.password
//   ) {
//     this.invalidFields.push('confirmPassword');
// }
// }

validateForm(field: string) {
  const addFieldIfInvalid = (condition: boolean, fieldName: string) => {
    if (condition && !this.invalidFields.includes(fieldName)) {
      this.invalidFields.push(fieldName);
    } else if (!condition) {
      this.invalidFields = this.invalidFields.filter(f => f !== fieldName);
    }
  };

  if (field === 'name') {
    const isInvalid = !this.newUserData.name || this.newUserData.name.trim().length < 2;
    addFieldIfInvalid(isInvalid, 'name');
  }

  if (field === 'email') {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = this.newUserData.email;    
    const isInvalid = !email || !emailRegex.test(email) ;
    addFieldIfInvalid(isInvalid, 'email');
  }

  if (field === 'password') {
    const isInvalid = !this.newUserData.password || this.newUserData.password.length < 6;
    addFieldIfInvalid(isInvalid, 'password');

    if (this.newUserData.confirmPassword) {
      this.validateForm('confirmPassword');
    }
  }

  if (field === 'confirmPassword') {
    const isInvalid = this.newUserData.confirmPassword !== this.newUserData.password;
    addFieldIfInvalid(isInvalid, 'confirmPassword');
  }
}

}
