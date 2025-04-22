import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../services/contact.service';
import { ContactOverlayService } from '../../../services/overlay.service';
import { ContactOverlayComponent } from '../contact-overlay/contact-overlay.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactOverlayComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  constructor(
    public contactService: ContactService,
    private overlayService: ContactOverlayService
  ) {}
   
    @Output() singleContactTransform = new EventEmitter<string>()
  setOverlayButtonsFromList(leftButton:string, rightButton: string) {
    this.overlayService.setOverlayButtons(leftButton, rightButton)
    this.overlayService.openOverlay();
  }

  toggleSingleContact(){
    this.singleContactTransform.emit('translateX(0%)')
  }
}
