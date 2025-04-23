export interface Task {
    id?: string;
    title: string;
    description: string;
    date: string;
    priority: string;
    assignedTo: string[];
    category: string;
    subtasks: string[];
}
