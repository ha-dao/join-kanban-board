import { Component, Input, Output, EventEmitter, ViewChild, inject } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { CommonModule } from '@angular/common';
import { ContactOverlayComponent } from '../contact-overlay/contact-overlay.component';
import { ContactListComponent } from '../contact-list/contact-list.component';
@Component({
  selector: 'app-single-contact',
  standalone: true,
  imports: [CommonModule, ContactOverlayComponent, ContactListComponent],
  templateUrl: './single-contact.component.html',
  styleUrl: './single-contact.component.scss'
})
export class SingleContactComponent {

  contactService = inject(ContactService);
  @ViewChild('contactOverlay') contactOverlay!: ContactOverlayComponent;
  

  deleteContact(){
    if(this.contactService.currentContact.id){
      this.contactService.deleteContact(this.contactService.currentContact.id);
      this.contactService.selectItem(-1);
      this.contactService.overlayDisplay = 'none';
    }
  }

  editContact(){
    this.contactOverlay.toggleOverlay();
  }
}
