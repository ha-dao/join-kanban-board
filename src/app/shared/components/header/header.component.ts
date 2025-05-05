import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
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
