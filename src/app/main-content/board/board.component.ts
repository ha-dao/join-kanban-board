import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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