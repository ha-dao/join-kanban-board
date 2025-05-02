import { Component, inject } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';
import { TaskService } from '../../services/task.service';
import { ContactService } from '../../services/contact.service';
import { NgClass, NgStyle } from '@angular/common';
import { FeedbackServiceService } from '../../services/feedback.service';
import { Task } from '../../interfaces/task';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgStyle, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
overlayService = inject(OverlayService)
taskService = inject(TaskService)
contactService = inject(ContactService)
feedbackService = inject(FeedbackServiceService)

task = this.taskService.selectedTask();


deleteTask(id : string){    
  this.taskService.deleteTask(id)
  this.overlayService.closeOverlay()
  
  
}


editTask(task:Task) {
  this.taskService.setEditedTask(task); 
  this.overlayService.openOverlay('edit-task'); 
  this.taskService.setTempAssignedTo(task.assignedTo!);  
}

updateSubtasks(task:Task, subtask:{title:string, isDone:boolean}){
  console.log(task);
  subtask['isDone'] = !subtask['isDone']
  this.taskService.updateTask(task.id, task)
  
  
}






}














