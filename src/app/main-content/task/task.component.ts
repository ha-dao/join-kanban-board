import { Component, inject } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';
import { TaskService } from '../../services/task.service';
import { ContactService } from '../../services/contact.service';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
overlayService = inject(OverlayService)
taskService = inject(TaskService)
contactService = inject(ContactService)

task = this.taskService.selectedTask();

















}
