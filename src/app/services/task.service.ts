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
  boardColumns = [
      { title: 'To Do', status: 'ToDo', list: this.boardTasksListToDo, dropListName:'todoList', epmtyText: 'No tasks To do' },
      { title: 'In Progress', status: 'In Progress', list: this.boardTasksListProgress, dropListName:'inProgressList', epmtyText: 'No tasks in progress' },
      { title: 'Await Feedback', status: 'Await Feedback', list: this.boardTasksListFeedback, dropListName:'awaitFeedbackList', epmtyText: 'No tasks awaiting feedback' },
      { title: 'Done', status: 'Done', list: this.boardTasksListDone, dropListName:'doneList', epmtyText: 'No completed tasks' }
    ];
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
  this.boardColumns.forEach(column =>{
    column.list = [];
  })
    this.tasksList.forEach((task)=>{
      if(task.status == 'ToDo'){
        this.boardColumns[0].list.push(task);
      }else if(task.status == 'In Progress'){
        this.boardColumns[1].list.push(task);
      }else if(task.status == 'Await Feedback'){
        this.boardColumns[2].list.push(task);
      }else if(task.status == 'Done'){
        this.boardColumns[3].list.push(task);
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

  getCategoryClass(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'User Story': 'user-story',
      'Technical Task': 'technical-task',
      'Design': 'design'
    };
    return categoryMap[category] || '';
  }
}
