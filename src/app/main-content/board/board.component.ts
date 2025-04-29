import { Component, ElementRef, inject, ViewChild, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayService } from '../../services/overlay.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  isActive = false;
  searchQuery = '';
  overlayService = inject(OverlayService)
  taskService = inject(TaskService);
  
  
  @ViewChild('overlayRef') overlayRef!: ElementRef;  

  ngOnInit(): void {
    
  }
  
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  awaitFeedbackTasks: Task[] = [];
  doneTasks: Task[] = [];

  toggleActive() {
    this.isActive = !this.isActive;
    if (!this.isActive) {
      this.searchQuery = '';
    }
  }

  onInputChange(event: Event, inputField: string) {
    this.taskService.searchAndFilter(event, inputField);
    
  }
  handleBackdropClick(event: MouseEvent) {
    const clickedInside = this.overlayRef.nativeElement.contains(event.target);
    if (!clickedInside && this.overlayService.isOpen()) {     
      this.overlayService.closeOverlay();
      
    }
  }
  
  setNewTaskStatus(status:string){
    this.taskService.newTaskStatus = status;
  }

  addTodoTask(task: Task) {
    this.todoTasks.push(task);
  }
  
  addInProgressTask(task: Task) {
    this.inProgressTasks.push(task);
  }
  
  addAwaitFeedbackTask(task: Task) {
    this.awaitFeedbackTasks.push(task);
  }
  
  addDoneTask(task: Task) {
    this.doneTasks.push(task);
  }

getCompletedSubtasks(task: Task): number {
  return task.subtasks?.filter(t => t.completed).length || 0;
}

getProgressWidth(task: Task): number {
  if (!task.subtasks?.length) return 0;
  return (this.getCompletedSubtasks(task) / task.subtasks.length) * 100;
}
}