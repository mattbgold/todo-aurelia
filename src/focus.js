import {customAttribute, inject, bindingMode} from 'aurelia-framework';

@customAttribute('focus', bindingMode.twoWay)
@inject(Element)
export class Focus {  
    constructor(element) {
        this.element = element;
    }

    valueChanged(newValue) {
        if (newValue) {
            this.element.focus();
        } else {
            this.element.blur();
        }
    }    

    attached() {  
        this.element.addEventListener('focus', e => this.value = true);
        this.element.addEventListener('blur', e => this.value = false);
    }
}