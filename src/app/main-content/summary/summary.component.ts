import { Component, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  private taskService = inject(TaskService);

  isLoaded = computed(() => this.taskService.isTasksLoaded());

  urgentTask = computed(() => {
    if (!this.isLoaded()) return [];
    return this.taskService.tasksList
      .filter((task) => task.priority === 'Urgent')
      .filter((task) => new Date(task.date) > new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  urgentTasksCount = computed(() => this.urgentTask().length);

  nextUrgentDate = computed(() => {
    const next = this.urgentTask()[0];
    return next ? next.date : null;
  });

  nextUrgentText = computed(() => {
    return this.urgentTask().length > 0
      ? 'Upcoming Deadline'
      : 'No upcoming urgent tasks';
  });

  todoCount = computed(() => {
    if (!this.isLoaded()) return 0;
    return this.taskService.tasksList.filter((t) => t.status === 'ToDo').length;
  });
  doneCount = computed(() => {
    if (!this.isLoaded()) return 0;
    return this.taskService.tasksList.filter((t) => t.status === 'Done').length;
  });
  totalCount = computed(() => {
    if (!this.isLoaded()) return 0;
    return this.taskService.tasksList.length;
  });
  inProgressCount = computed(() => {
    if (!this.isLoaded()) return 0;
    return this.taskService.tasksList.filter((t) => t.status === 'In Progress')
      .length;
  });
  awaitFeedbackCount = computed(() => {
    if (!this.isLoaded()) return 0;
    return this.taskService.tasksList.filter(
      (t) => t.status === 'Await Feedback'
    ).length;
  });

  userName = signal('Sofia Müller');
  greeting = computed(() => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good morning,';
    if (hour < 18) return 'Good afternoon,';
    return 'Good evening,';
  });
}
