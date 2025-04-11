import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactOverlayComponent } from './contact-overlay/contact-overlay.component';
import { SingleContactComponent } from './single-contact/single-contact.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactOverlayComponent, SingleContactComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
