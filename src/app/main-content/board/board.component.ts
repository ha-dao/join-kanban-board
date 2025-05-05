import { Component, ElementRef, inject, ViewChild, OnInit, HostListener } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayService } from '../../services/overlay.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { TaskComponent } from '../task/task.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDragPreview } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule, CdkDrag, CdkDropList, CdkDragPreview],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  isActive = false;
  searchQuery = '';
  overlayService = inject(OverlayService)
  taskService = inject(TaskService);
  dropDownOpen:boolean = false

  @ViewChild('overlayRef') overlayRef!: ElementRef;
  @ViewChild('overlayRef') overlayRefDropDown!: ElementRef;

  ngOnInit(): void {

  } 

  setNewStatus(status:string, task:Task){  
    task.status = status;   
    task.dropDownOpen = false
    this.taskService.updateTask(task.id, task)   
  }
  

  toggleActive() {
    this.isActive = !this.isActive;
    if (!this.isActive) {
      this.searchQuery = '';
    }
  }
  openDropDown(task:Task){
    task.dropDownOpen = !task.dropDownOpen
    
  }

  onInputChange(event: Event, inputField: string) {
    this.taskService.searchAndFilter(event, inputField);

  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event:MouseEvent){
    this.taskService.boardColumns.forEach(taskList => {
      taskList.list.forEach(task =>{
        const dropdownElement= document.getElementById('dropdown' + task.id);
        if(task.dropDownOpen && dropdownElement && !dropdownElement.contains(event.target as Node)){
          task.dropDownOpen = false;
        }
      })
    })
  }

  handleBackdropClick(event: MouseEvent, task:Task) {
    const clickedInside = this.overlayRef.nativeElement.contains(event.target);    
    if (!clickedInside && this.overlayService.isOpen()) {
      this.overlayService.closeOverlay();
    }    
  }

  setNewTaskStatus(status:string){
    this.taskService.newTaskStatus = status;
  }

 

getCompletedSubtasks(task: Task): number {
  return task.subtasks?.filter(t => t.isDone).length || 0;
}

getProgressWidth(task: Task): number {
  if (!task.subtasks?.length) return 0;
  return (this.getCompletedSubtasks(task) / task.subtasks.length) * 100;
}

  openTaskDetail(task: Task) {
    this.taskService.setSelectedTask(task);
    this.overlayService.openOverlay('show-task');
  }

  connectedDropLists = ['todoList', 'inProgressList', 'awaitFeedbackList', 'doneList'];

  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    const task = event.previousContainer.data[event.previousIndex];

    if (event.previousContainer !== event.container) {
      // Statuswechsel
      task.status = newStatus;
      this.taskService.updateTask(task.id, task);
      // Element von einer Liste in die andere verschieben
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Sortieren in derselben Liste
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    // Optional: im Service oder Backend speichern

  }


}
