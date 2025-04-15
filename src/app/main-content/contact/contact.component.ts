import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactOverlayComponent } from './contact-overlay/contact-overlay.component';
import { SingleContactComponent } from './single-contact/single-contact.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactOverlayComponent, SingleContactComponent, HeaderComponent, SidebarComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
