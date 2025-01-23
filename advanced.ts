// Types and Interfaces
type Priority = 'low' | 'medium' | 'high';
type Status = 'todo' | 'inProgress' | 'underReview' | 'done';

interface BaseTask {
    id: string;
    title: string;
    description?: string;
    assignee?: string;
    priority: Priority;
    status: Status;
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
}

interface DevelopmentTask extends BaseTask {
    type: 'development';
    repoLink: string;
    branch?: string;
}

interface DesignTask extends BaseTask {
    type: 'design';
    assetUrl: string;
    revision: number;
}

interface DocumentationTask extends BaseTask {
    type: 'documentation';
    documentRef: string;
    targetAudience: string[];
}

type Task = DevelopmentTask | DesignTask | DocumentationTask;

// Type guards
function isDevelopmentTask(task: Task): task is DevelopmentTask {
    return task.type === 'development';
}

function isDesignTask(task: Task): task is DesignTask {
    return task.type === 'design';
}

function isDocumentationTask(task: Task): task is DocumentationTask {
    return task.type === 'documentation';
}

// Task creation types
type CreateDevelopmentTask = Omit<DevelopmentTask, 'id' | 'status' | 'createdAt' | 'updatedAt'>;
type CreateDesignTask = Omit<DesignTask, 'id' | 'status' | 'createdAt' | 'updatedAt'>;
type CreateDocumentationTask = Omit<DocumentationTask, 'id' | 'status' | 'createdAt' | 'updatedAt'>;
type CreateTaskInput = CreateDevelopmentTask | CreateDesignTask | CreateDocumentationTask;

// Task filter types
type TaskFilter = Partial<{
    type: Task['type'];
    priority: Priority;
    status: Status;
    assignee: string;
}>;

// Error types
class TaskError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TaskError';
    }
}

// Task Manager Implementation
class TaskManager {
    private tasks: Map<string, Task> = new Map();

    // Create task
    createTask(input: CreateTaskInput): Task {
        const baseTask = {
            id: this.generateId(),
            status: 'todo' as const,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const task: Task = {
            ...input,
            ...baseTask,
        };

        this.tasks.set(task.id, task);
        return task;
    }

    // Assign task
    assignTask(taskId: string, assignee: string): Task {
        const task = this.getTask(taskId);
        const updatedTask = {
            ...task,
            assignee,
            updatedAt: new Date(),
        };
        this.tasks.set(taskId, updatedTask);
        return updatedTask;
    }

    // Update task status
    updateTaskStatus(taskId: string, status: Status): Task {
        const task = this.getTask(taskId);
        const updatedTask = {
            ...task,
            status,
            updatedAt: new Date(),
        };
        this.tasks.set(taskId, updatedTask);
        return updatedTask;
    }

    // Get overdue tasks
    getOverdueTasks(): Task[] {
        const now = new Date();
        return Array.from(this.tasks.values()).filter(
            task => task.status !== 'done' && task.deadline < now
        );
    }

    // Filter tasks
    filterTasks(filter: TaskFilter): Task[] {
        return Array.from(this.tasks.values()).filter(task => {
            return Object.entries(filter).every(([key, value]) => {
                return task[key as keyof Task] === value;
            });
        });
    }

    // Helper methods
    private getTask(taskId: string): Task {
        const task = this.tasks.get(taskId);
        if (!task) {
            throw new TaskError(`Task with ID ${taskId} not found`);
        }
        return task;
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}

// Example usage with error handling
try {
    const taskManager = new TaskManager();

    // Create tasks
    const devTask = taskManager.createTask({
        type: 'development',
        title: 'Implement Authentication',
        repoLink: 'github.com/project/auth',
        priority: 'high',
        deadline: new Date('2024-02-01'),
    });

    const designTask = taskManager.createTask({
        type: 'design',
        title: 'Create Login Page Mockup',
        assetUrl: 'figma.com/file/login-design',
        priority: 'medium',
        deadline: new Date('2024-01-30'),
        revision: 1,
    });

    // Assign and update tasks
    taskManager.assignTask(devTask.id, 'john.doe');
    taskManager.updateTaskStatus(devTask.id, 'inProgress');

    // Filter tasks
    const highPriorityTasks = taskManager.filterTasks({ priority: 'high' });
    const overdueTasks = taskManager.getOverdueTasks();
} catch (error) {
    if (error instanceof TaskError) {
        console.error('Task operation failed:', error.message);
    } else {
        console.error('Unexpected error:', error);
    }
}