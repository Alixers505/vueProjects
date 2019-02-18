var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        seen: true,
        todos: [
            {text: 'Learn JavaScript'},
            {text: 'Learn Vue'},
            {text: 'Build something awesome'}
        ],
        groceryList: [
            { id: 0, text: 'Vegetables'},
            { id: 1, text: 'Cheese'},
            { id: 2, text: 'Beef'}
        ]
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
});


app.message = "I changed the message.";
app.seen = false;
app.todos.push({text: 'Build a second awesome project'});

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})