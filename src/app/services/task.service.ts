import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
singleTask:Task= 
  {
    id : '',
    title : '',
    description : '',
    date: '',
    priority: '',
    assignedTo: [],
    category: '',
    subtasks:[]
  };
  



}
