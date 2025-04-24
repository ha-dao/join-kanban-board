import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bord',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BordComponent {
  columns = ['To Do', 'In Progress', 'Await Feedback', 'Done'];
  isActive = false; 
  searchQuery = ''; 
  taskService= inject(TaskService);


  isAddTaskHovered = false;
  isPlusButtonHovered: boolean[] = Array(this.columns.length).fill(false); 
  toggleActive() {
    this.isActive = false; 
    this.searchQuery = '';
  }

  onInputChange(event: Event, value: string) {
    this.taskService.searchAndFilter(event, value);
  }
}
