export class Item {        
    constructor(initTask, isComplete) {
        this.task = initTask;
        this.taskBuffer = initTask;
        this.isComplete = isComplete;
    }

    taskBuffer = '';
    task = '';
    isEditing = false;
    isComplete = false;

    editTask() {
        this.isEditing = true;
    }
}
