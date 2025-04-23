import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-bord',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BordComponent {
  columns = ['To Do', 'In Progress', 'Await Feedback', 'Done'];
  isActive = false; 
  searchQuery = ''; 


  isAddTaskHovered = false;
  isPlusButtonHovered: boolean[] = Array(this.columns.length).fill(false); 
  toggleActive() {
    this.isActive = false; 
    this.searchQuery = '';
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value; 

    this.isActive = this.searchQuery.length > 0;
  }
}
