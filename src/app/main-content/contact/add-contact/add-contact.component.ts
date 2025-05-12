import { Component, ViewChild, Input, Output, EventEmitter, HostListener, ElementRef, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NgForm, NgModel } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { FeedbackServiceService } from '../../../services/feedback.service';
import { OverlayService } from '../../../services/overlay.service';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
})
export class addContactComponent {
 
  constructor(public contactService: ContactService, public feedbackService: FeedbackServiceService, public overlayService: OverlayService){


  }

  h2Text: string = 'Add Contact'
  @ViewChild('overlayRef') overlayRef!: ElementRef;
  
  invalidFields: string[] = [];
  showSuccessMessage:boolean = false;

  ngOnInit() {
    this.overlayService.contactData$.subscribe(data => {
      if (data) {
        this.contactService.contactData = { ...data }; 
      }
    });
  }

  handleBackdropClick(event: MouseEvent) {
    const clickedInside = this.overlayRef.nativeElement.contains(event.target);
    if (!clickedInside && this.overlayService.isOpen()) {
      this.clearForm();
      this.overlayService.closeOverlay();
      this.invalidFields = []
    }
  }
  

  validateForm(field: string) {
    this.invalidFields = this.invalidFields.filter(f => f !== field);
    if(field === 'name'){
    this.validateName()
  }
    if(field === 'email'){
    this.validateEmail()
  }
  if( field === 'phone'){
    this.validatePhone()
  }
  }

  validateName(){
    if (!this.contactService.contactData.name || this.contactService.contactData.name.length < 2) {
      this.invalidFields.push('name');      
    }
  }

  validateEmail(){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      !this.contactService.contactData.email || 
      !emailRegex.test(this.contactService.contactData.email) || 
      (emailRegex.test(this.contactService.contactData.email) &&
       this.contactService.contactList.some(
         contact => contact.email === this.contactService.contactData.email
       ))
    ) {
      this.invalidFields.push('email');
    }
  }
  
  validatePhone(){
    const phoneRegex = /^(?:\+?\d{1,4}[ \-]?)?(\(?\d{1,4}\)?[ \-]?)?[\d\- ]{5,15}$/;
    if (!this.contactService.contactData.phone || !phoneRegex.test(this.contactService.contactData.phone)) {
      this.invalidFields.push('phone');
      
      
    }
  }

  isFormValid(): boolean {
    return (
      this.contactService.contactData.name.length >= 2 &&
      (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.contactService.contactData.email) && !this.contactService.contactList.some(
        contact => contact.email === this.contactService.contactData.email
      )) &&
      /^(?:\+?\d{1,4}[ \-]?)?(\(?\d{1,4}\)?[ \-]?)?[\d\- ]{5,15}$/.test(this.contactService.contactData.phone)
      
    );
  }

  


  cancelOrDelete(){
    if(this.overlayService.buttonLeft == 'Delete'){
      this.contactService.deleteContact();
      this.feedbackService.show('Contact successfully deleted!');
    }
    this.overlayService.closeOverlay();
    this.invalidFields = []
    this.clearForm();
    
  }

  addOrSave(){
    if(this.overlayService.buttonRight == 'Create Contact'){
      this.addContact()
    }else if(this.overlayService.buttonRight == 'Save'){
     this.saveContact()
    }
  }

  addContact(){
      this.contactService.addContact(this.contactService.contactData);
      this.clearForm();           
      this.overlayService.closeOverlay()
      this.feedbackService.show('Contact added!');
      this.invalidFields = []
  }

  saveContact(){
      this.contactService.updateContact(this.contactService.contactData);
      this.feedbackService.show('Contact changed!');
      this.clearForm();
      this.overlayService.closeOverlay()
      this.invalidFields = []
  }

  clearForm(){
    this.contactService.contactData.name= '';
    this.contactService.contactData.email = '';
    this.contactService.contactData.phone= '';
    this.invalidFields = []
  }

 



}