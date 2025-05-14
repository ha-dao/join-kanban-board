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

/**
 * @component
 * The AppComponent is the root component of the application.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, OverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /**
   * The title of the application.
   */
  title = 'project';

  /**
   * Injected Angular Router instance.
   */
  router = inject(Router);

  /**
   * Injected authentication service.
   */
  authService = inject(AuthService);

  /**
   * Initializes the AppComponent with injected feedback and overlay services.
   * @param feedbackService The service for showing feedback messages.
   * @param overlayService The service for managing overlays.
   */
  constructor(public feedbackService: FeedbackServiceService, public overlayService: OverlayService) {}

  /**
   * Checks if the current router URL contains the given path.
   * @param path The route path to check.
   * @returns True if the current URL includes the path, otherwise false.
   */
  getRouterPath(path: string) {
    return this.router.url.includes(path);
  }

  /**
   * Loads the user's login state from local storage and updates the AuthService.
   */
  getLocalStorage() {
    this.authService.UserLoggedIn = localStorage.getItem('loggedIn');
  }
  
/**
 * Checks if the current route is an authentication route.
 *
 * @returns {boolean} True if the current URL is '/', '/login', or '/sign-up', false otherwise
 * @memberof AppComponent
 */
  isAuthRoute() {
    return this.router.url === '/' || this.router.url === '/login' || this.router.url === '/sign-up';
  }

  isAuthRoute() {
    return this.router.url === '/' || this.router.url === '/login' || this.router.url === '/sign-up';
  }
}
