import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";

=======
import { RouterOutlet } from '@angular/router';
import { ContactComponent } from './main-content/contact/contact.component';
import { ContactOverlayComponent } from './main-content/contact/contact-overlay/contact-overlay.component';
import { HeaderComponent } from './shared/components/header/header.component';
>>>>>>> f0a99a92187d683d864fd668e3d51f59941c043f

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, SidebarComponent],
=======
  imports: [CommonModule, RouterOutlet, ContactOverlayComponent, ContactComponent, HeaderComponent],
>>>>>>> f0a99a92187d683d864fd668e3d51f59941c043f
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project';
}
