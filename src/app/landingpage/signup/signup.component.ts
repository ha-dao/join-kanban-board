import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  name: string = '';
  email = '';
  password = '';
  passwordConfirm = '';
  public error = '';
  constructor(private authService: AuthService) {}
  public async onRegister(email:string, password:string, name:string) {
    console.log(this.email);
    if(this.password === this.passwordConfirm){
      try {
        await this.authService.register(email, password, name);
        console.log('Registrierung erfolgreich');
      } catch (err: any) {
        this.error = err.message;
      }
    }
  }
}
