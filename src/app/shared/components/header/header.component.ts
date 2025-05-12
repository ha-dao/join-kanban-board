import { Component, ViewChild, ElementRef, HostListener,inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService = inject(AuthService)
  contactService = inject(ContactService)
  showMenu = false;
  @ViewChild('menuRef') menuRef!: ElementRef;

  handleBackdropClick(event: MouseEvent) {
    if (this.menuRef && !this.menuRef.nativeElement.contains(event.target)) {
      this.showMenu = false;
    }
  }
  

  @HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  this.handleBackdropClick(event);
}

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }

  constructor() {}
}
