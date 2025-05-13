import { Injectable, signal, inject, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskService } from './task.service';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private injector = inject(Injector)
  private _contactService?:ContactService;

  isOpen = signal(false)
  setTemplate = signal<string>('');
  taskService= inject(TaskService)  
  ContactOverlayH2Text: string = 'Add Contact';
  buttonLeft = 'Cancel';
  buttonRight = 'Create';

  /**
   * Gets the ContactService instance using the injector if not already set.
   * @returns {ContactService} The ContactService instance.
   */
  get contactService(): ContactService {
    if (!this._contactService) {
      this._contactService = this.injector.get(ContactService);
    }
    return this._contactService;
  }

  /**
   * Opens the overlay and sets the template.
   * Also updates the overlay header text depending on the button state.
   * @param {string} target - The template to be set for the overlay.
   */
  openOverlay(target:string) {
    this.setTemplate.set(target)
    this.isOpen.set(true);
    if(this.buttonRight == 'Save'){
      this.ContactOverlayH2Text = 'Edit Contact';
    }else{
      this.ContactOverlayH2Text = 'Add Contact';
    }
  }

  /**
   * Closes the overlay and calls the appropriate close handler based on the template.
   */
  closeOverlay() {
    this.isOpen.set(false);
    if(this.setTemplate() == 'add-task'|| this.setTemplate()== 'edit-task'){
      this.closeOverlayFromAddTask()
    }else if(this.setTemplate()== 'add-contact' ){
      this.closeOverlayFromContact()
    }
  }

  /**
   * Resets the contact data and clears the template when closing the contact overlay.
   */
  closeOverlayFromContact(){
    this.contactService.contactData =  {
      name: '',
      email: '',
      phone: '',
      color: ''
    };
    this.setTemplate.set('');
  }

  /**
   * Resets the task data and related properties when closing the add/edit task overlay.
   */
  closeOverlayFromAddTask(){
    this.setTemplate.set('');
    this.taskService.clickedButton.set('Medium')
    this.taskService.taskData = {
      id:'',
      title: '',
      description: '',
      date: '',
      priority: 'Medium',
      assignedTo:[],
      category:'',
      subtasks:[],
      status: '',
      dropDownOpen: false
    };
    this.taskService.currentSubtasks = [];
  }

  /**
   * Sets the labels for the left and right buttons in the overlay.
   * @param {string} left - Label for the left button.
   * @param {string} right - Label for the right button.
   */
  setOverlayButtons(left: string, right: string) {
    this.buttonLeft = left;
    this.buttonRight = right;
  }

  /**
   * Updates the contact data observable with new data.
   * @param {{ name: string; email: string; phone: string }} data - The contact data to set.
   */
  setContactData(data: { name: string; email: string; phone: string }) {
    this.contactDataSource.next(data);
  }
  
}
