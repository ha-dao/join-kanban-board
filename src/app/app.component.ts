import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FeedbackServiceService } from './services/feedback.service';
import { OverlayService } from './services/overlay.service';
import { OverlayComponent } from './main-content/contact/overlay/overlay.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, OverlayComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project';

  constructor(public feedbackService: FeedbackServiceService,
              public overlayService: OverlayService
  ) {}
}
