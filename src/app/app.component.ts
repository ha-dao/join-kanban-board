import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FeedbackServiceService } from './services/feedback.service';
import { OverlayService } from './services/overlay.service';
import { OverlayComponent } from './main-content/contact/overlay/overlay.component';
import { TaskComponent } from './main-content/task/task.component';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, OverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project';
  router = inject(Router)
  authService = inject(AuthService)

  constructor(public feedbackService: FeedbackServiceService,
              public overlayService: OverlayService

  ) {}

  getRouterPath(path:string){
    return this.router.url.includes(path)
  }

  getLocalStorage(){
    this.authService.UserLoggedIn = localStorage.getItem('loggedIn')
  }
}
