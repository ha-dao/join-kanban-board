import { NgClass, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
contactService = inject(ContactService)
feedbackService = inject(FeedbackServiceService)
taskService= inject(TaskService)
clickedButton= '';
currentSubtasks:string[]=[];
newSubtask: string = '';
editableSubtask:string= '';
editedIndex:number | null = null;

dropdownOpen:boolean = false;
taskData: {
  title: string;
  description: string;
  date: string;
  priority: string;
  assignedTo?:Contact[];
  category:string;
  subtasks:string[];
} = {
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
}


}
