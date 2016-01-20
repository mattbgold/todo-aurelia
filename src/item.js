export class Item {    
    
    constructor(initTask, deleteCallback) {
        this.task = initTask;
        this.taskBuffer = initTask;

        this.deleteCallback = deleteCallback;

    }

    taskBuffer = '';
    task = '';
    isEditing = false;
    isComplete = false;

    deleteCallback = null;
    

    edit() {
        this.isEditing = true;
    }

    save() {
        if (this.taskBuffer.trim()) {
            this.task = this.taskBuffer;
        } else {
            this.delete();
        }
        this.isEditing = false;
    }

    delete() {
        this.deleteCallback(this);
    }

    handleEscape(event) {
        if (event.keyCode === 27) {
            this.taskBuffer = this.task;
            this.isEditing = false;
        }
    }
}
