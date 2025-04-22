import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { FeedbackServiceService } from '../../services/feedback.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [NgClass],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
contactService = inject(ContactService)
feedbackService = inject(FeedbackServiceService)
}
