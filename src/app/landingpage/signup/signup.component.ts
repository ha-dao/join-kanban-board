import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { FeedbackServiceService } from '../../services/feedback.service';
import { Userdata } from '../../interfaces/userdata';
import { NgClass, CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
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
showPrivacy = false;

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

  
  constructor(public authService: AuthService, private router: Router) {}

  public async onRegister() {    
    if(this.password === this.passwordConfirm){
      try {
        await this.authService.register(this.email, this.password, this.name);
        this.feedbackService.show('Registration successfull')
        if(!this.checkIfMailinUseInContact()){
          this.contactService.addContact({name:this.name,email: this.email, phone: 'Not existing yet'})
        }
        this.authService.login(this.email, this.password )  
        this.authService.UserLoggedIn = this.authService.getUsername(this.email)     
        this.router.navigate(['/summary']);
        localStorage.setItem('loggedIn', this.authService.UserLoggedIn)
      } catch (err: any) {
        this.error = err.message;
      }
    }
  }

  checkIfMailinUseInContact():boolean{
    let include =false 
    this.contactService.contactList.forEach(c => {
      if(this.email == c.email){
        include = true
      }
    });
    return include
  }
  get isFormValid(): boolean {
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email);    
    return this.name.trim().length >= 2 && isEmailValid 
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
    this.validateName(addFieldIfInvalid)
  }
  if (field === 'email') {
    this.validateMail(addFieldIfInvalid)
  }
  if (field === 'password') {
    this.validatePassword(addFieldIfInvalid)
  }
  if (field === 'confirmPassword') {
    this.validateConfirmedPassword(addFieldIfInvalid)
  }
}



validateName(addFieldIfInvalid:Function){
  const isInvalid = !this.name || this.name.trim().length < 2;
addFieldIfInvalid(isInvalid, 'name');
}

validateMail(addFieldIfInvalid: Function) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const email = this.email?.trim().toLowerCase();      
  const isFormatInvalid = !email || !emailRegex.test(email);    
  const isInvalid = isFormatInvalid;
  addFieldIfInvalid(isInvalid, 'email');
}

validatePassword(addFieldIfInvalid:Function){
  const isInvalid = !this.password || this.password.length < 6;
  addFieldIfInvalid(isInvalid, 'password');

  if (this.newUserData.confirmPassword) {
    this.validateForm('confirmPassword');
  }
}

validateConfirmedPassword(addFieldIfInvalid:Function){
  const isInvalid = this.passwordConfirm !== this.password;
  addFieldIfInvalid(isInvalid, 'confirmPassword');
}

goToAnotherPage(target:string): void {
  this.router.navigate([target]);
}

onBackClick(): void {
  this.router.navigate(['/']);
}

closePrivacy() {
  this.showPrivacy = false;
}
  
}
