import { Component, inject, ViewChild } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { CommonModule } from '@angular/common';
import { ContactOverlayComponent } from '../contact-overlay/contact-overlay.component';
import { FeedbackServiceService } from '../../../services/feedback.service';
import { ContactOverlayService } from '../../../services/overlay.service'; 

@Component({
  selector: 'app-single-contact',
  standalone: true,
  imports: [CommonModule, ContactOverlayComponent],
  templateUrl: './single-contact.component.html',
  styleUrl: './single-contact.component.scss'
})
export class SingleContactComponent {
  constructor(
    public feedbackService: FeedbackServiceService,
    private overlayService: ContactOverlayService
  ) {}

  contactService = inject(ContactService);
  @ViewChild('editContactOverlay') contactOverlay!: ContactOverlayComponent;  deleteContact() {
    this.contactService.deleteContact();
    this.feedbackService.show('Contact successfully deleted!');
  }

  editContact() {
    this.overlayService.setOverlayButtons('Delete', 'Save');
  
    this.overlayService.setContactData({
      name: this.contactService.currentContact.name,
      email: this.contactService.currentContact.email,
      phone: this.contactService.currentContact.phone
    });
  
    this.overlayService.openOverlay();
  }
}
