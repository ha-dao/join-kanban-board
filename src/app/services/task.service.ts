import { Injectable, OnDestroy, signal } from '@angular/core';
import { inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Task } from '../interfaces/task';
import { query, orderBy, limit } from 'firebase/firestore';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  unsubTasksList: any;
  tasksList: Task[] = [];
  searchInputFieldValue: string= '';
  newTaskStatus: string= '';
  selectedTask = signal<Task | null>(null);
  currentEditedTask = signal<Task | null>(null);
  clickedButton= signal<string>('Medium') ;
  currentSubtasks:{
    title:string;
    status:string
  }[]=[];
  taskData: Task= {
    id:'',
    title: '',
    description: '',
    date: '',
    priority: '',
    assignedTo:[],
    category:'',
    subtasks:[],
    status: ''
  };

  constructor() {
    this.snap();
  }

  setEditedTask(task: Task) {   
    this.taskData.title = task.title;
    this.taskData.description = task.description;
    this.taskData.date = task.date;
    this.clickedButton.set(task.priority);
    this.taskData.category = task.category;
    this.currentSubtasks = task.subtasks;
    this.taskData.assignedTo = task.assignedTo;

    
  }

  snap() {
    let q = query(this.getTasksRef(), orderBy('title'));
    this.unsubTasksList = onSnapshot(q, (list) => {
      this.tasksList = [];
      list.forEach((element) => {
        this.tasksList.push(this.setTaskObj(element.data(), element.id));
      });
    });
  }

  async addTask(task: Task) {
    task.status = this.newTaskStatus;
    await addDoc(this.getTasksRef(), task)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {});
  }

  async updateTask(taskId: string, taskData: {}){
    await updateDoc(this.getSingleTask('tasks', taskId), taskData);
  }

  async deleteTask(id: string) {
    if (id) {
      await deleteDoc(this.getSingleTask('tasks', id));
    }
  }

  ngOnDestroy() {
    if (this.unsubTasksList()) {
      this.unsubTasksList();
    }
  }

  setTaskObj(obj: any, id: string): Task {
    return {
      id: id,
      title: obj.title || '',
      description: obj.description || '',
      date: obj.date || '',
      priority: obj.priority || '',
      assignedTo: obj.assignedTo || [],
      category: obj.category || '',
      subtasks: obj.subtasks || [],
      status: obj.status || '',
    };
  }

  getTasksRef() {
    return collection(this.firestore, 'tasks');
  }

  getSingleTask(collectionRef: string, docId: string) {
    return doc(collection(this.firestore, collectionRef), docId);
  }

  searchAndFilter(event:Event, value: string){
    this.searchInputFieldValue = value;
  }

  setSelectedTask(task: Task) {
    this.selectedTask.set(task);
  }  
  clearSelectedTask() {
    this.selectedTask.set(null);
  }
  
}
