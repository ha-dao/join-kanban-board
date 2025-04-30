import { NgClass, CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, ViewChild, effect, signal } from '@angular/core';
import { NgForm, NgModel, FormsModule, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { FeedbackServiceService } from '../../services/feedback.service';
import { Contact } from '../../interfaces/contact';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { OverlayService } from '../../services/overlay.service';
import { OverlayComponent } from '../contact/overlay/overlay.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [NgClass, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  constructor() {
    let initialized = false;
    effect(() => {
      const isOpen = this.overlayService.isOpen();
      if (!initialized) {
        initialized = true;
        return;
      }
      if (!isOpen) {
        this.resetForm();
      }
    });

  
  }


contactService = inject(ContactService);
feedbackService = inject(FeedbackServiceService);
overlayService = inject(OverlayService)
taskService= inject(TaskService);

@ViewChild('taskTitle') taskTitle: NgModel | undefined;
@ViewChild('taskDate') taskDate: NgModel | undefined;
@ViewChild('categoryField') categoryField: NgModel | undefined;
@ViewChild('overlayRef', {static: false}) overlayRef!: ElementRef;
searchTerm: string=''


newSubtask:{title:string;
  status:string
}= {
  title:'',
  status: 'unfinished'
};
editableSubtask= 
  {title: '',
    status: 'unfinished'
  }
;
editedIndex:number | null = null;
dropdownOpen:boolean = false;
isSelectOpen:boolean = false;




editableTask:any
ngOnInit() {
  const taskToEdit = this.taskService.currentEditedTask();
  if (taskToEdit) {
    this.taskService.taskData = structuredClone(taskToEdit);
  }
}

toggleSelectOpen() {
  this.isSelectOpen = !this.isSelectOpen;
}

toggleDropdown(){
  this.dropdownOpen = !this.dropdownOpen;
}

@HostListener('document:click', ['$event'])
handleBackdropClick(event: MouseEvent){
  if(!this.overlayRef?.nativeElement)return;

  const clickedInside= this.overlayRef.nativeElement.contains(event.target);
  if(!clickedInside && this.dropdownOpen){
    this.toggleDropdown()
  }
}

setPrority(priority:string){
this.taskService.taskData.priority = priority
this.setClickedButton(priority)
}

setClickedButton(button:string){
this.taskService.clickedButton.set(button)  
}



toggleContactSelection(item:Contact){
  this.contactService.setSelection(item);
  this.setAssignedTo(item)
}
setAssignedTo(item: Contact) {
  const index = this.taskService.taskData.assignedTo!.findIndex(c => c.id === item.id);

  if (item.selected) {
    if (index === -1) {
      this.taskService.taskData.assignedTo!.push(item);
    }
  } else {
    if (index !== -1) {
      this.taskService.taskData.assignedTo!.splice(index, 1);
    }
  }
}

addSubtask() {
  if (this.newSubtask.title){
    let subTask ={title:this.newSubtask.title, status:'unfinished'}
    this.taskService.currentSubtasks.push(subTask);
    this.newSubtask.title = '';
    
  
}
}
editSubtask(index: number) {   
  this.editedIndex = index;
  this.editableSubtask = this.taskService.currentSubtasks[index];

}

saveEditedSubtask(index: number) { 
  this.taskService.currentSubtasks[index] ={title:this.editableSubtask.title, status:'unfinished'}   
  this.editedIndex = null;
  this.editableSubtask.title = '';
}

getCompletedSubtasks(task: Task): number {
  if (!task.subtasks) return 0;
  return task.subtasks.filter(t => t.status).length;
}

deleteSubtask(index: number) {
  this.taskService.currentSubtasks.splice(index, 1);
  if (this.editedIndex === index) {
    this.editedIndex = null;
    this.editableSubtask.title = '';
  }
}

resetSubtasks(){
  this.taskService.currentSubtasks= []
  this.resetForm()
}

submitTask(){  
  this.taskService.tasksList.push(this.taskService.taskData)
  this.taskService.taskData.subtasks =(this.taskService.currentSubtasks)
  this.taskService.addTask(this.taskService.taskData)
  this.resetSubtasks()
  this.setInputsUntouched()
  this.overlayService.closeOverlay()
  this.toggleFeedbackMsg('Task created!')
  


}

setInputsUntouched(){
  if(this.taskTitle)
  this.taskTitle.control.markAsUntouched()
if(this.taskDate)
  this.taskDate.control.markAsUntouched()
if(this.categoryField)
  this.categoryField.control.markAsUntouched()
}
resetForm(){
  this.resetContacts()
  this.setInputsUntouched()
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

resetContacts(){
  this.contactService.contactList.forEach( contact =>{
    contact.selected = false
  })
}

isFormValid(){
  return this.taskService.taskData.title !== '' &&
  this.taskService.taskData.date !== '' &&
  this.taskService.taskData.category !== '';
}

filterContacts(){
  if(!this.searchTerm)return this.contactService.contactList;
  return this.contactService.contactList.filter( c =>
  c.name.toLowerCase().includes(this.searchTerm.toLocaleLowerCase())
  );
}

toggleFeedbackMsg(msg:string){
this.feedbackService.show(msg)
}

}
