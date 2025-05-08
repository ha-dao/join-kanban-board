import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private routerModule: RouterModule, private router: Router) {}

  goToAnotherPage(target:string): void {
    this.router.navigate([target]);
  }

  login() {
    alert(`E-Mail: ${this.email}\nPasswort: ${this.password}`);
  }

  guestLogin() {
    alert('Guest login erfolgreich!');
  }
}
