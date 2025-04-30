import { Injectable, signal, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  isOpen = signal(false)
  setTemplate = signal<string>('');
  taskService= inject(TaskService)
  private contactDataSource = new BehaviorSubject<{ name: string; email: string; phone: string } | null>(null);
  contactData$ = this.contactDataSource.asObservable();

  buttonLeft = 'Cancel';
  buttonRight = 'Create';

  openOverlay(target:string) {
    this.setTemplate.set(target)    
    this.isOpen.set(true);
    
  }
  
  
  closeOverlay() {
    this.isOpen.set(false);  
    this.setTemplate.set('');
    this.taskService.clickedButton.set('Medium')
    this.taskService.taskData = {
      id:'',
      title: '',
      description: '',
      date: '',
      priority: '',
      assignedTo:[],
      category:'',
      subtasks:[],
      status: ''
    };
    
  }

  setOverlayButtons(left: string, right: string) {
    this.buttonLeft = left;
    this.buttonRight = right;
  }

  setContactData(data: { name: string; email: string; phone: string }) {
    this.contactDataSource.next(data);
  }
}
