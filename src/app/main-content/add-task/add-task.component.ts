import { NgClass, CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { NgForm, NgModel, FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { FeedbackServiceService } from '../../services/feedback.service';
import { Contact } from '../../interfaces/contact';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [NgClass, CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
contactService = inject(ContactService);
feedbackService = inject(FeedbackServiceService);
taskService= inject(TaskService);
@ViewChild('taskTitle') taskTitle: NgModel | undefined;
@ViewChild('taskDate') taskDate: NgModel | undefined;
@ViewChild('categoryField') categoryField: NgModel | undefined;

clickedButton= 'Medium';
currentSubtasks:string[]=[];
newSubtask: string = '';
editableSubtask:string= '';
editedIndex:number | null = null;
dropdownOpen:boolean = false;
taskData: Task= {
  title: '',
  description: '',
  date: '',
  priority: '',
  assignedTo:[],
  category:'',
  subtasks:[]
};

toggleDropdown(){
  this.dropdownOpen = !this.dropdownOpen;
}



setPrority(priority:string){
this.taskData.priority = priority
this.setClickedButton(priority)
}
setClickedButton(button:string){
this.clickedButton = button
}

onSubmit(){
  this.taskService.tasksList.push(this.taskData)


}

setAssignedTo(item: Contact) {
  const index = this.taskData.assignedTo!.findIndex(c => c.id === item.id);

  if (item.selected) {
    if (index === -1) {
      this.taskData.assignedTo!.push(item);
    }
  } else {
    if (index !== -1) {
      this.taskData.assignedTo!.splice(index, 1);
    }
  }
}

addSubtask() {
  if (this.newSubtask.trim()) {
    this.currentSubtasks.push(this.newSubtask.trim());
    this.newSubtask = '';
  }
}
editSubtask(index: number) {
  this.editedIndex = index;
  this.editableSubtask = this.currentSubtasks[index];
  console.log(this.editableSubtask);
  
}

saveEditedSubtask(index: number) {
  if (this.editableSubtask.trim()) {
    this.currentSubtasks[index] = this.editableSubtask.trim();
  }
  this.editedIndex = null;
  this.editableSubtask = '';
}

deleteSubtask(index: number) {
  this.currentSubtasks.splice(index, 1);
  if (this.editedIndex === index) {
    this.editedIndex = null;
    this.editableSubtask = '';
  }
}

resetSubtasks(){
  this.currentSubtasks= []
  this.resetForm()
}

submitTask(){
  this.taskData.subtasks = (this.currentSubtasks)
  console.log(this.taskData);
  this.taskService.addTask(this.taskData)
  this.resetSubtasks()
  this.setInputsUntouched()
  
  
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
  this.clickedButton = 'Medium'
  this.taskData = {
    title: '',
    description: '',
    date: '',
    priority: '',
    assignedTo:[],
    category:'',
    subtasks:[]
  };


}

resetContacts(){
  this.contactService.contactList.forEach( contact =>{
    contact.selected = false
  })
}

isFormValid(){  
  return this.taskData.title !== '' &&
  this.taskData.date !== '' &&
  this.taskData.category !== '';  
}

}
