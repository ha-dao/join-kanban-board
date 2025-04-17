import { Component, Input, Output, EventEmitter, ViewChild, inject } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { CommonModule } from '@angular/common';
import { ContactOverlayComponent } from '../contact-overlay/contact-overlay.component';
import { FeedbackServiceService } from '../../../services/feedback.service';
@Component({
  selector: 'app-single-contact',
  standalone: true,
  imports: [CommonModule, ContactOverlayComponent],
  templateUrl: './single-contact.component.html',
  styleUrl: './single-contact.component.scss'
})
export class SingleContactComponent {
  constructor(public feedbackService : FeedbackServiceService){

  }
  contactService = inject(ContactService);
  @ViewChild('editContactOverlay') contactOverlay!: ContactOverlayComponent;
  

  deleteContact(){
      this.contactService.deleteContact();
      this.feedbackService.show('Kontakt erfolgreich gelöscht!');
  }

  editContact(){
    this.contactOverlay.toggleOverlay('Delete', 'Save');
    this.contactOverlay.contactData.name = this.contactService.currentContact.name;
    this.contactOverlay.contactData.email = this.contactService.currentContact.email;
    this.contactOverlay.contactData.phone = this.contactService.currentContact.phone;
  }
  
  backToContactList(){
    
  }
}
