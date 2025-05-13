import { Contact } from "./contact";

/**
 * Interface representing a task in the system.
 * Defines the structure and required properties for task objects.
 */
export interface Task {
    /** Unique identifier for the task */
    id: string;
    
    /** Title or name of the task */
    title: string;
    
    /** Detailed description of the task */
    description: string;
    
    /** Due date for the task in string format */
    date: string;
    
    /** Priority level of the task, with predefined options */
    priority: 'Urgent' | 'Medium' | 'Low' | '';
    
    /** Array of contacts assigned to this task, optional */
    assignedTo?: Contact[];
    
    /** Category or label for organizing tasks */
    category: string;
    
    /** List of subtasks with title and completion status */
    subtasks: { title: string, isDone: boolean }[];
    
    /** Current status of the task (e.g., 'To Do', 'In Progress', 'Done') */
    status: string;
    
    /** UI state flag indicating whether the task's dropdown menu is open */
    dropDownOpen: boolean;
}