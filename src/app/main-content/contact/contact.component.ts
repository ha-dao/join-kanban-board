import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SingleContactComponent } from './single-contact/single-contact.component';
import { ContactOverlayComponent } from './contact-overlay/contact-overlay.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactListComponent, SingleContactComponent, ContactOverlayComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  menuDisplay: string = 'none';
  addOverlayDisplay: string = 'none';
  @ViewChild('singleContact') singleContact!: SingleContactComponent;
  @ViewChild('addContactOverlay') contactOverlay!: ContactOverlayComponent;
  menuImageSrc: string = "assets/img/4-contacts/person-add-icon.svg";
  singleContactTransform: string = 'translateX(200%)';
  backBtnDisplay: string = 'none';
  addOrOpenMenu(){
    if(this.menuImageSrc == 'assets/img/4-contacts/person-add-icon.svg'){
      this.contactOverlay.toggleOverlay('Cancel', 'Create Contact');
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
    this.contactOverlay.toggleOverlay('Cancel', 'Create Contact');
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
