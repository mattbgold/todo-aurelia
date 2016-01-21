import {Item} from './item';

export class TodoList {
    constructor() {
        this.load();
    }
    activate(params) {
        this.filter = params.filter || 'all';
    }

    filter = 'all';
    items = [];
    newTask = '';
    
    //computeds
    get completedItems() {
        return this.items.filter(i => i.isComplete);
    }
    get activeItems() {
        return this.items.filter(i => !i.isComplete);
    }
    get filteredItems() {
        if (this.filter === 'completed') {
            return this.completedItems;
        } else if (this.filter === 'active') {
            return this.activeItems;
        } else { //all
            return this.items;
        }
    }
    get allItemsComplete() {
        return this.items.every(i => i.isComplete);
    }
    set allItemsComplete(value) {
        this.items.forEach(i => i.isComplete = value);
        this.save();
    }
    get isItemsPopulated() {
        return this.items.length > 0;
    }

    //methods
    appendItem() {
        if (this.newTask.trim()) {
            this.items.push(new Item(this.newTask, false));
        }
        this.newTask = '';
        this.save();
    }

    clearCompletedItems() {
        this.items = this.activeItems;
        this.save();
    }

    saveItem(item) {
        if (!item.isEditing) return;

        if (item.taskBuffer.trim()) {
            item.task = item.taskBuffer.trim();
            this.save();
        } else {
            this.deleteItem(item);
        }
        item.isEditing = false;
    }

    deleteItem(item) {
        this.items.splice(this.items.indexOf(item),1);   
        this.save();
    }
    
    handleKeyup(event, item) {
        let enter = 13;
        let escape = 27;
        if (event.keyCode === enter) {
            this.saveItem(item);
        }
        else if (event.keyCode === escape) {
            item.taskBuffer = item.task;
            item.isEditing = false;
        }
    }

    // storage
    save() {
        let itemsModel = this.items.map(item => {
            return {
                task: item.task,
                isComplete: item.isComplete
            };
        });
        localStorage.setItem('todos-aurelia', JSON.stringify(itemsModel));
    }

    load() {
        let itemsModel = JSON.parse(localStorage.getItem('todos-aurelia')) || [];
        this.items = itemsModel.map(item => new Item(item.task, item.isComplete));
    }
}