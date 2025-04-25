import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { OverlayService } from '../../services/overlay.service';

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
  overlayService = inject(OverlayService)
  @ViewChild('overlayRef') overlayRef!: ElementRef;

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
  handleBackdropClick(event: MouseEvent) {
    const clickedInside = this.overlayRef.nativeElement.contains(event.target);
    if (!clickedInside && this.overlayService.isOpen) {     
      this.overlayService.closeOverlay();
      
    }
  }
}
