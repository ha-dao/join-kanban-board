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
import { Contact } from '../interfaces/contact';
import { FeedbackServiceService } from './feedback.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  feedbackService = inject(FeedbackServiceService)
  unsubTasksList: any;
  tasksList: Task[] = [];
  boardTasksListToDo: Task[] = [];
  boardTasksListDone: Task[] = [];
  boardTasksListProgress: Task[] = [];
  boardTasksListFeedback: Task[] = [];
  isBoardListFull: boolean = false;
  searchInputFieldValue: string= '';
  newTaskStatus: string= '';
  selectedTask = signal<Task | null>(null);
  currentEditedTask = signal<Task | null>(null);
  clickedButton= signal<string>('Medium') ;
  currentSubtasks:{
    title:string;
    isDone:boolean
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
  tempAssignedTo:Contact[]=[]

  constructor() {
    this.snap();

  }

  fillBoardTaskLists(){
  this.boardTasksListToDo = [];
  this.boardTasksListDone = [];
  this.boardTasksListProgress = [];
  this.boardTasksListFeedback = [];
    this.tasksList.forEach((task)=>{
      if(task.status == 'ToDo'){
        this.boardTasksListToDo.push(task);
      }else if(task.status == 'In Progress'){
        this.boardTasksListProgress.push(task);
      }else if(task.status == 'Await Feedback'){
        this.boardTasksListFeedback.push(task);
      }else if(task.status == 'Done'){
        this.boardTasksListDone.push(task);
      }
    })
  }

  setTempAssignedTo(contacts:Contact[]){
    this.tempAssignedTo = contacts;
  }

  setEditedTask(task: Task) {
    this.taskData.title = task.title;
    this.taskData.description = task.description;
    this.taskData.date = task.date;
    this.clickedButton.set(task.priority);
    this.taskData.category = task.category;
    this.currentSubtasks = task.subtasks;
    this.taskData.assignedTo = task.assignedTo;
    this.taskData.id = task.id
    this.taskData.status = task.status


  }

  snap() {
    let q = query(this.getTasksRef(), orderBy('title'));
    this.unsubTasksList = onSnapshot(q, (list) => {
      this.tasksList = [];
      list.forEach((element) => {
        this.tasksList.push(this.setTaskObj(element.data(), element.id));
      });
      if(!this.isBoardListFull){
        this.fillBoardTaskLists();
        this.isBoardListFull = true;
      }
    });

  }

  async addTask(task: Task) {
    task.status = this.newTaskStatus;
    await addDoc(this.getTasksRef(), task)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {});
      this.fillBoardTaskLists();
      this.feedbackService.show('Task Created')
  }

  async updateTask(taskId: string, taskData: {}){
    await updateDoc(this.getSingleTask('tasks', taskId), taskData);
    this.fillBoardTaskLists();
    this.feedbackService.show('Task Updated')
  }

 
  async deleteTask(id: string) {
    if (id) {
      await deleteDoc(this.getSingleTask('tasks', id));
    }
    this.fillBoardTaskLists();
    this.feedbackService.show('Task Deleted')    
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
