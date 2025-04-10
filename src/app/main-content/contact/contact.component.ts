import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactListComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
