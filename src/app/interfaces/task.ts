import { Contact } from "./contact";

export interface Task {
    id: string,
    title:string,
    description:string,
    date: string,
    priority: 'Urgent' | 'Medium' | 'Low' | '',
    assignedTo?:Contact[],
    category:string,
    subtasks: { title: string, isDone: boolean }[];
    status: string;
    dropDownOpen:boolean;
}
