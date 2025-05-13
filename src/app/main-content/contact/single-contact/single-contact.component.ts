import { Component, inject, ViewChild } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from '../overlay/overlay.component';
import { FeedbackServiceService } from '../../../services/feedback.service';
import { OverlayService } from '../../../services/overlay.service'; 

/**
 * Component responsible for displaying and managing a single contact's details.
 */
@Component({
  selector: 'app-single-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-contact.component.html',
  styleUrl: './single-contact.component.scss'
})
export class SingleContactComponent {
  constructor(
    public feedbackService: FeedbackServiceService,
    private overlayService: OverlayService
  ) {}

  /**
   * Injected ContactService instance used to manage contact data.
   */
  contactService = inject(ContactService);

  /**
   * Deletes the current contact and shows a success message.
   */
  deleteContact() {
    this.contactService.deleteContact();
    this.feedbackService.show('Contact successfully deleted!');
  }

  /**
   * Prepares and opens the overlay to edit the current contact.
   * Sets up the overlay buttons and fills in contact data.
   */
  editContact() {
    this.overlayService.setOverlayButtons('Delete', 'Save');
  
    this.overlayService.setContactData({
      name: this.contactService.currentContact.name,
      email: this.contactService.currentContact.email,
      phone: this.contactService.currentContact.phone
    });
    this.overlayService.openOverlay('add-contact');
  }
}
