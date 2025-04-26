import { Contact } from "./contact";

export interface Task {
    id?: string,
    title:string,
    description:string,
    date: string,
    priority:string,
    assignedTo?:Contact[],
    category:string,
    subtasks: string[];
    status: string;
}
