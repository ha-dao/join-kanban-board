import { Injectable, OnDestroy } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  unsubTasksList: any;
  tasksList: Task[] = [];
  constructor() {
    this.snap();
  }

  snap() {
    let q = query(this.getTasksRef(), orderBy('title'));
    this.unsubTasksList = onSnapshot(q, (list) => {
      this.tasksList = [];
      list.forEach((element) => {
        this.tasksList.push(this.setTaskObj(element.data(), element.id));
        // console.log(this.tasksList);
      });
    });
  }

  async addTask(item: Task) {
    await addDoc(this.getTasksRef(), item)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {});
  }

  async deleteTask(id: string) {
    if (id) {
      await deleteDoc(this.getSingleTask('contacts', id));
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
    };
  }

  getTasksRef() {
    return collection(this.firestore, 'tasks');
  }

  getSingleTask(collectionRef: string, docId: string) {
    return doc(collection(this.firestore, collectionRef), docId);
  }
}
