import {Item} from './item';

export class TodoList {
    activate(params) {
        this.filter = params.filter || 'all';
    }
    filter = 'all';
    items = [];
    newTask = '';
    appendItem() {
        if (this.newTask.trim()) {
            this.items.push(new Item(this.newTask, this.deleteItem));
        }
        this.newTask = '';
    }
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
    }
    get isItemsPopulated() {
        return this.items.length > 0;
    }
    clearCompletedItems() {
        this.items = this.activeItems;
    }
    deleteItem =
    item => {
        this.items.splice(this.items.indexOf(item),1);        
    };    
}