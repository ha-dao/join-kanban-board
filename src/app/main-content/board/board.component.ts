import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  isActive = false;
  searchQuery = '';
  overlayService = inject(OverlayService)
  @ViewChild('overlayRef') overlayRef!: ElementRef;  
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
    if (!clickedInside && this.overlayService.isOpen) {     
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