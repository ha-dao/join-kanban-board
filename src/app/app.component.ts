import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContactComponent } from './main-content/contact/contact.component';
import { ContactOverlayComponent } from './main-content/contact/contact-overlay/contact-overlay.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FeedbackServiceService } from './services/feedback.service';
import { ContactOverlayService } from './services/overlay.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ContactComponent, HeaderComponent, SidebarComponent, ContactOverlayComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project';
  
  constructor(public feedbackService: FeedbackServiceService,
              public overlayService: ContactOverlayService
  ) {}
}
