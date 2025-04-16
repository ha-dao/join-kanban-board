import { Component, ViewChild, Input, Output, EventEmitter, HostListener, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NgForm, NgModel } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { FeedbackServiceService } from '../../../services/feedback.service';

@Component({
  selector: 'app-contact-overlay',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-overlay.component.html',
  styleUrl: './contact-overlay.component.scss',
})
export class ContactOverlayComponent {
  @Input() isOpen: boolean = false;
  @Output() closeOverlay = new EventEmitter<void>();
  constructor(public contactService: ContactService, public feedbackService: FeedbackServiceService){


  }
  buttonLeft: string = 'Cancel';
  buttonRight: string = 'Create Contact';
  contactData: {
    name: string;
    email: string;
    phone: string;
  } = {
    name: '',
    email: '',
    phone: '',
  };
  invalidFields: string[] = [];
  showSuccessMessage:boolean = false;

  validateForm(field: string) {
    this.invalidFields = this.invalidFields.filter(f => f !== field);
    if(field === 'name'){
    if (!this.contactData.name || this.contactData.name.length < 2) {
      this.invalidFields.push('name');
      this.contactData.name = '';
    }
  }
    if(field === 'email'){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.contactData.email || !emailRegex.test(this.contactData.email)) {
      this.invalidFields.push('email');
      this.contactData.email = '';
    }
  }
  if( field === 'phone'){
    const phoneRegex = /^(?:\+?\d{1,4}[ \-]?)?(\(?\d{1,4}\)?[ \-]?)?[\d\- ]{5,15}$/;
    if (!this.contactData.phone || !phoneRegex.test(this.contactData.phone)) {
      this.invalidFields.push('phone');
      this.contactData.phone = '';
    }
  }
  }

  isFormValid(): boolean {
    return (
      this.contactData.name.length >= 2 &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.contactData.email) &&
      /^(?:\+?\d{1,4}[ \-]?)?(\(?\d{1,4}\)?[ \-]?)?[\d\- ]{5,15}$/.test(this.contactData.phone)
    );
  }

  toggleOverlay(buttonLeft: string, buttonRight: string) {
    this.isOpen = !this.isOpen;
    this.toggleBodyScroll(this.isOpen);
    this.buttonLeft = buttonLeft;
    this.buttonRight = buttonRight;

  }


  cancelOrDelete(){
    if(this.buttonLeft == 'Delete'){
      this.contactService.deleteContact();
      
    }
    this.toggleOverlay('', '');
    this.clearForm();
    
  }

  addOrSave(){
    if(this.buttonRight == 'Create Contact'){
      this.contactService.addContact(this.contactData);
      this.clearForm();
           
      this.toggleOverlay('', '')
      this.feedbackService.show('Kontakt erfolgreich angelegt!');
    }else if(this.buttonRight == 'Save'){
      this.contactService.updateContact(this.contactData);
      this.feedbackService.show('Kontakt erfolgreich geändert!');
      this.clearForm();
      this.toggleOverlay('','')
    }
  }

  toggleBodyScroll(disable: boolean) {
    if (disable) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  clearForm(){
    this.contactData.name= '';
    this.contactData.email = '';
    this.contactData.phone= '';
  }

 



}
