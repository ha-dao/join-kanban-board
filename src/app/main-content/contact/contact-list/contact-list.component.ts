import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../services/contact.service';
import { ContactOverlayComponent } from '../contact-overlay/contact-overlay.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactOverlayComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {


  constructor(public contactService: ContactService){

  }
  @ViewChild('contactOverlay') contactOverlay!: ContactOverlayComponent;
  @Output() singleContactTransform = new EventEmitter<string>();

  toggleOverlayFromList() {
      this.contactOverlay.toggleOverlay('Cancel', 'Create Contact');
    }

    toggleSingleContact(){
      this.singleContactTransform.emit('translateX(0%)')
    }

}
