import { Component, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  private taskService = inject(TaskService);
  private tasks = signal<Task[]>([]);
  constructor() {
    effect(() => {
      this.tasks.set(this.taskService.tasksList);
    });
  }

  todoCount = computed(
    () => this.taskService.tasksList.filter((t) => t.status === 'ToDo').length
  );
  doneCount = computed(
    () => this.taskService.tasksList.filter((t) => t.status === 'Done').length
  );
  totalCount = computed(() => this.tasks().length);
  inProgressCount = computed(
    () =>
      this.taskService.tasksList.filter((t) => t.status === 'In Progress')
        .length
  );
  awaitFeedbackCount = computed(
    () =>
      this.taskService.tasksList.filter((t) => t.status === 'Await Feedback')
        .length
  );

  userName = signal('Sofia Müller');
  greeting = computed(() => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good morning,';
    if (hour < 18) return 'Good afternoon,';
    return 'Good evening,';
  });
}
