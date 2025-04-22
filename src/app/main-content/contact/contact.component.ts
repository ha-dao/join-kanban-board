import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SingleContactComponent } from './single-contact/single-contact.component';
import { ContactOverlayComponent } from './contact-overlay/contact-overlay.component';
import { ContactOverlayService } from '../../services/overlay.service'; 


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactListComponent, SingleContactComponent, ContactOverlayComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(public overlayService: ContactOverlayService){
    
  }
  menuDisplay: string = 'none';
  addOverlayDisplay: string = 'none';
  @ViewChild('singleContact') singleContact!: SingleContactComponent;
 
  menuImageSrc: string = "assets/img/4-contacts/person-add-icon.svg";
  singleContactTransform: string = 'translateX(200%)';
  backBtnDisplay: string = 'none';
  addOrOpenMenu(){
    if(this.menuImageSrc == 'assets/img/4-contacts/person-add-icon.svg'){
      this.overlayService.setOverlayButtons('Cancel', 'Create Contact');
      this.overlayService.openOverlay()
    }else{
      if(this.menuDisplay == 'none'){
        this.menuDisplay = 'flex';
      }else{
        this.menuDisplay = 'none';
      }
    }
  }

  openEditOverlay(){
    this.singleContact.editContact();
  }

  deleteContact(){
    this.singleContact.deleteContact();
    this.getEvent('translateX(200%)');
  }

  openAddOverlay(){
    this.overlayService.setOverlayButtons('Cancel', 'Create Contact');
    this.overlayService.openOverlay()
  }

  getEvent(event: string) {
    this.singleContactTransform = event;
    if(event == 'translateX(0%)'){
      this.menuImageSrc = 'assets/img/4-contacts/more-vert-icon.svg';
      this.backBtnDisplay = 'flex';
    }else if(event == 'translateX(200%)'){
      this.menuImageSrc = 'assets/img/4-contacts/person-add-icon.svg';
      this.backBtnDisplay = 'none';
    }
  }

  backToContactList(){
    this.getEvent('translateX(200%)');
    this.backBtnDisplay = 'none';
  }
}
