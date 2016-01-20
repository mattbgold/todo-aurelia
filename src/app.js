export class App {
    configureRouter(config, router) {
        config.title = 'Todo MVC - Aurelia';
        config.map([
            { route: ['', ':filter'], moduleId: './todoList', name: 'todoList' },           
        ]);

        this.router = router;
    }    
}