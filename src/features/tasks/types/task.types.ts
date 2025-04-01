export type Priority = 'urgent' | 'high' | 'medium' | 'low' | 'none';
export type Status = 'completed' | 'in_progress' | 'not_started';

export interface Task {
    id: number;
    title: string;
    priority: Priority;
    status: Status;
    [key: string]: any;
} 