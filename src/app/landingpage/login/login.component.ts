import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { AuthService } from '../../services/auth.service'; 
=======
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
>>>>>>> 13fd2b2717f969d6c19fba3158825bc3a2249f09

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  emailOrUsername = '';
  password = '';
<<<<<<< HEAD
  public error = '';
=======

  constructor(private routerModule: RouterModule, private router: Router) {}

  goToAnotherPage(target:string): void {
    this.router.navigate([target]);
  }

>>>>>>> 13fd2b2717f969d6c19fba3158825bc3a2249f09
  login() {
    alert(`E-Mail: ${this.emailOrUsername}\nPasswort: ${this.password}`);
  }

  guestLogin() {
    alert('Guest login erfolgreich!');
  }

    constructor(private authService: AuthService) {}
  
    public async onLogin(emailOrUsername:string, password:string) {
      try {
        await this.authService.login(emailOrUsername, password);
        console.log('Login erfolgreich');
      } catch (err: any) {
        this.error = err.message;
      }
    }
}
