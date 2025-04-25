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
  tasks: Task[] = [];
  
  @ViewChild('overlayRef') overlayRef!: ElementRef;  

  ngOnInit(): void {
    // Recupera le task al caricamento del componente
    this.tasks = this.taskService.tasksList;
  }
  
  todoTasks: string[] = [];
  inProgressTasks: string[] = [];
  awaitFeedbackTasks: string[] = [];
  doneTasks: string[] = [];

  toggleActive() {
    this.isActive = !this.isActive;
    if (!this.isActive) {
      this.searchQuery = '';
    }
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;

    this.isActive = this.searchQuery.length > 0;
  }
  handleBackdropClick(event: MouseEvent) {
    const clickedInside = this.overlayRef.nativeElement.contains(event.target);
    if (!clickedInside && this.overlayService.isOpen()) {     
      this.overlayService.closeOverlay();
      
    }
  }
  
  addTodoTask(task: string) {
    this.todoTasks.push(task);
  }
  
  addInProgressTask(task: string) {
    this.inProgressTasks.push(task);
  }
  
  addAwaitFeedbackTask(task: string) {
    this.awaitFeedbackTasks.push(task);
  }
  
  addDoneTask(task: string) {
    this.doneTasks.push(task);
  }
}