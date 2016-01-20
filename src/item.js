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

    handleKeyup(event) {
        let enter = 13;
        let escape = 27;
        if (event.keyCode === enter) {
            this.save();
        }
        else if (event.keyCode === escape) {
            this.taskBuffer = this.task;
            this.isEditing = false;
        }
    }
}
