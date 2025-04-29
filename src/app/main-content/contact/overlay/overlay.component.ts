import { Component, ViewChild, Input, Output, EventEmitter, HostListener, ElementRef, signal, effect  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NgForm, NgModel } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { FeedbackServiceService } from '../../../services/feedback.service';
import { OverlayService } from '../../../services/overlay.service';
import { addContactComponent } from '../add-contact/add-contact.component';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { TaskComponent } from '../../task/task.component';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [CommonModule, FormsModule, addContactComponent, AddTaskComponent, TaskComponent],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
})
export class OverlayComponent {
 
  constructor(public contactService: ContactService, public feedbackService: FeedbackServiceService, public overlayService: OverlayService){


  }
  @ViewChild('overlayRef') overlayRef!: ElementRef;
  

  

  handleBackdropClick(event: MouseEvent) {
    const clickedInside = this.overlayRef.nativeElement.contains(event.target);
    if (!clickedInside && this.overlayService.isOpen()) {      
      this.overlayService.closeOverlay();     
    }
  }
  

  

 



}