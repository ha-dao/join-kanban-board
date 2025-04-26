import { Component, ViewChild, Input, Output, EventEmitter, HostListener, ElementRef  } from '@angular/core';
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
  @ViewChild('overlayRef') overlayRef!: ElementRef;
  contactData: {
    name: string;
    email: string;
    phone: string;
    letters?: string;
    color?: string;
  } = {
    name: '',
    email: '',
    phone: '',
    color: ''
  };
  invalidFields: string[] = [];
  showSuccessMessage:boolean = false;

  ngOnInit() {
    this.overlayService.contactData$.subscribe(data => {
      if (data) {
        this.contactData = { ...data }; 
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
    if (!this.contactData.name || this.contactData.name.length < 2) {
      this.invalidFields.push('name');
      
    }
  }
    if(field === 'email'){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.contactData.email || !emailRegex.test(this.contactData.email)) {
      this.invalidFields.push('email');
      
    }
  }
  if( field === 'phone'){
    const phoneRegex = /^(?:\+?\d{1,4}[ \-]?)?(\(?\d{1,4}\)?[ \-]?)?[\d\- ]{5,15}$/;
    if (!this.contactData.phone || !phoneRegex.test(this.contactData.phone)) {
      this.invalidFields.push('phone');
      
      
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
      this.contactService.addContact(this.contactData);
      this.clearForm();
           
      this.overlayService.closeOverlay()
      this.feedbackService.show('Contact added!');
      this.invalidFields = []
    }else if(this.overlayService.buttonRight == 'Save'){
      this.contactService.updateContact(this.contactData);
      this.feedbackService.show('Contact changed!');
      this.clearForm();
      this.overlayService.closeOverlay()
      this.invalidFields = []
    }
  }



  clearForm(){
    this.contactData.name= '';
    this.contactData.email = '';
    this.contactData.phone= '';
    this.invalidFields = []
  }

 



}