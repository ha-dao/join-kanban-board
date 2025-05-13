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

  get contactService(): ContactService {
    if (!this._contactService) {
      this._contactService = this.injector.get(ContactService);
    }
    return this._contactService;
  }

  openOverlay(target:string) {
    this.setTemplate.set(target)    
    this.isOpen.set(true);
    if(this.buttonRight == 'Save'){
      this.ContactOverlayH2Text = 'Edit Contact';
    }else{
      this.ContactOverlayH2Text = 'Add Contact';

    }
  }
  
  
  closeOverlay() {
    this.isOpen.set(false); 
    if(this.setTemplate() == 'add-task'|| this.setTemplate()== 'edit-task'){
    this.closeOverlayFromAddTask() 
    }else if(this.setTemplate()== 'add-contact' ){
      this.closeOverlayFromContact()
    }
    
    
  }

  closeOverlayFromContact(){
    this.contactService.contactData =  {
      name: '',
      email: '',
      phone: '',
      color: ''
    };
    this.setTemplate.set('');


  }

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

  setOverlayButtons(left: string, right: string) {
    this.buttonLeft = left;
    this.buttonRight = right;
  }

  
}
