import { NgClass, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgForm, NgModel, FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { FeedbackServiceService } from '../../services/feedback.service';
import { Contact } from '../../interfaces/contact';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [NgClass, CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
contactService = inject(ContactService)
feedbackService = inject(FeedbackServiceService)
taskService= inject(TaskService)

dropdownOpen:boolean = false;


toggleDropdown(){
  this.dropdownOpen = !this.dropdownOpen;
}

setCheckedObj(event:Event ,contact:Contact){
  let checkbox= event.target as HTMLInputElement

}
}
