import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SingleContactComponent } from './single-contact/single-contact.component';
import { OverlayComponent } from './overlay/overlay.component';
import { OverlayService } from '../../services/overlay.service';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactListComponent, SingleContactComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(public overlayService: OverlayService){

  }
  menuDisplay: string = 'none';
  addOverlayDisplay: string = 'none';
  @ViewChild('singleContact') singleContact!: SingleContactComponent;

  menuImageSrc: string = "assets/img/4-contacts/person-add-icon.svg";
  singleContactTransform: string = window.innerWidth < 1280? 'translateX(200%)' : 'translateX(0%)';
  backBtnDisplay: string = 'none';
  windowWidth = window.addEventListener('resize', () => {
    if(window.innerWidth < 1280){
      this.getEvent('translateX(200%)');
    }else if(window.innerWidth > 1280){
      this.getEvent('translateX(0%)');
      this.singleContactTransform = 'translateX(0%)';
    }

  });

  addOrOpenMenu(){
    if(this.menuImageSrc == 'assets/img/4-contacts/person-add-icon.svg'){
      this.overlayService.setOverlayButtons('Cancel', 'Create Contact');
      this.overlayService.openOverlay('add-contact')
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
    if(window.innerWidth < 1280){
    this.getEvent('translateX(200%)');
    }
  }

  openAddOverlay(){
    this.overlayService.setOverlayButtons('Cancel', 'Create Contact');
    this.overlayService.openOverlay('add-contact')
  }

  getEvent(event: string) {
    if(window.innerWidth < 1280){
      this.singleContactTransform = event;
      if(event == 'translateX(0%)'){
        this.menuImageSrc = 'assets/img/4-contacts/more-vert-icon.svg';
        this.backBtnDisplay = 'flex';
      }else if(event == 'translateX(200%)'){
        this.menuImageSrc = 'assets/img/4-contacts/person-add-icon.svg';
        this.backBtnDisplay = 'none';
      }
    }
  }

  backToContactList(){
    this.getEvent('translateX(200%)');
    this.backBtnDisplay = 'none';
  }
}
